import { getDocs, getCountFromServer } from "firebase/firestore";

import { getApplicantsCountMap } from "@entities/projects/api/getProjectApplicationsApi";
import { SearchQueryBuilder } from "@entities/search/model/searchQueryBuilder";

import { db } from "@shared/firebase/firebase";
import type { ProjectListRes } from "@shared/types/project";
import type { ProjectSearchFilterOption, SortBy } from "@shared/types/search";

const DEFAULT_PAGE_SIZE = 6;
const MEMORY_FETCH_MULTIPLIER = 10;
const PREFETCH_BUFFER_SIZE = 2;

const shouldApplyFilter = <T>(value: T | "all" | undefined): value is T => {
  return value !== undefined && value !== "all";
};

const getFilteredValue = <T>(value: T | "all" | undefined): T | undefined => {
  return shouldApplyFilter(value) ? value : undefined;
};

const createBaseQuery = (
  collectionName: string,
  filter: ProjectSearchFilterOption
): SearchQueryBuilder => {
  return new SearchQueryBuilder(collectionName)
    .setCategory(getFilteredValue(filter.category))
    .setStatus(getFilteredValue(filter.status))
    .setWorkflow(getFilteredValue(filter.workflow));
};

const needsInMemoryFiltering = (filter: ProjectSearchFilterOption): boolean => {
  const hasTitle = filter.title && filter.title.trim();
  const hasPosition = filter.position && filter.position !== "all";
  return !!(hasTitle || hasPosition);
};

const needsClientSideSorting = (sortBy: SortBy | undefined): boolean => {
  return sortBy === "applicants" || sortBy === "popularity";
};

const filterByTitle = (
  projects: ProjectListRes[],
  searchTitle: string
): ProjectListRes[] => {
  const normalizedSearchTitle = searchTitle.toLowerCase().trim();
  return projects.filter((project) =>
    project.title.toLowerCase().includes(normalizedSearchTitle)
  );
};

const filterByPosition = (
  projects: ProjectListRes[],
  position: string
): ProjectListRes[] => {
  return projects.filter((project) =>
    project.positions.some((pos) => pos.position === position)
  );
};

const applyInMemoryFilters = (
  projects: ProjectListRes[],
  filter: ProjectSearchFilterOption
): ProjectListRes[] => {
  let filteredProjects = projects;

  if (filter.title && filter.title.trim()) {
    filteredProjects = filterByTitle(filteredProjects, filter.title);
  }

  if (filter.position && filter.position !== "all") {
    filteredProjects = filterByPosition(filteredProjects, filter.position);
  }

  return filteredProjects;
};

const getLikesCountMap = async (
  projectIds: string[]
): Promise<Record<string, number>> => {
  const { query, collection, where, getCountFromServer } = await import(
    "firebase/firestore"
  );

  if (!projectIds.length) return {};

  const results: Record<string, number> = {};
  await Promise.all(
    projectIds.map(async (projectId) => {
      try {
        const q = query(
          collection(db, "likes"),
          where("projectId", "==", projectId)
        );
        const snapshot = await getCountFromServer(q);
        results[projectId] = snapshot.data().count as number;
      } catch {
        results[projectId] = 0;
      }
    })
  );

  return results;
};

const applyClientSideSorting = async (
  projects: ProjectListRes[],
  sortBy: SortBy | undefined
): Promise<ProjectListRes[]> => {
  if (!sortBy || !needsClientSideSorting(sortBy)) {
    return projects;
  }

  const projectIds = projects.map((p) => p.id);

  if (sortBy === "applicants") {
    const applicantsCountMap = await getApplicantsCountMap(projectIds);
    return projects
      .map((project) => ({
        ...project,
        applicationsCount: applicantsCountMap[project.id] ?? 0,
      }))
      .sort((a, b) => (b.applicationsCount ?? 0) - (a.applicationsCount ?? 0));
  }

  if (sortBy === "popularity") {
    const likesCountMap = await getLikesCountMap(projectIds);
    return projects
      .map((project) => ({
        ...project,
        likesCount: likesCountMap[project.id] ?? 0,
      }))
      .sort((a, b) => (b.likesCount ?? 0) - (a.likesCount ?? 0));
  }

  return projects;
};

const fetchAndTransformProjects = async (
  queryBuilder: SearchQueryBuilder
): Promise<ProjectListRes[]> => {
  const query = queryBuilder.build();
  const snapshot = await getDocs(query);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as ProjectListRes[];
};

const applyPagination = (
  projects: ProjectListRes[],
  page: number,
  pageSize: number
): ProjectListRes[] => {
  const offset = (page - 1) * pageSize;
  const startIndex = offset;
  const endIndex = startIndex + pageSize;

  return projects.slice(startIndex, endIndex);
};

export const getProjectsCount = async (
  collectionName: string,
  filter: ProjectSearchFilterOption
): Promise<number> => {
  const queryBuilder = createBaseQuery(collectionName, filter);

  if (needsInMemoryFiltering(filter)) {
    const projects = await fetchAndTransformProjects(queryBuilder);
    const filteredProjects = applyInMemoryFilters(projects, filter);
    return filteredProjects.length;
  }

  const query = queryBuilder.build();
  const snapshot = await getCountFromServer(query);
  return snapshot.data().count;
};

export const getProjectsByPage = async (
  collectionName: string,
  filter: ProjectSearchFilterOption,
  page: number = 1,
  pageSize: number = DEFAULT_PAGE_SIZE
): Promise<ProjectListRes[]> => {
  const queryBuilder = createBaseQuery(collectionName, filter).setSortBy(
    filter.sortBy || "latest"
  );

  const needsMemoryFiltering = needsInMemoryFiltering(filter);
  const needsClientSorting = needsClientSideSorting(filter.sortBy);

  if (needsMemoryFiltering || needsClientSorting) {
    queryBuilder.addLimit(pageSize * MEMORY_FETCH_MULTIPLIER);
  } else {
    const offset = (page - 1) * pageSize;
    queryBuilder.addLimit(offset + pageSize * PREFETCH_BUFFER_SIZE);
  }

  let projects = await fetchAndTransformProjects(queryBuilder);

  projects = applyInMemoryFilters(projects, filter);

  projects = await applyClientSideSorting(projects, filter.sortBy);

  return applyPagination(projects, page, pageSize);
};
