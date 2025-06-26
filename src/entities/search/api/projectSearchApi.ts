import { getDocs, getCountFromServer } from "firebase/firestore";

import { SearchQueryBuilder } from "@entities/search/model/searchQueryBuilder";

import type { ProjectListRes } from "@shared/types/project";
import type { ProjectSearchFilterOption } from "@shared/types/search";

const DEFAULT_PAGE_SIZE = 6;
const MEMORY_FETCH_MULTIPLIER = 10;
const PREFETCH_BUFFER_SIZE = 2;

const createBaseQuery = (
  collectionName: string,
  filter: ProjectSearchFilterOption
): SearchQueryBuilder => {
  return new SearchQueryBuilder(collectionName)
    .setCategory(filter.category === "all" ? undefined : filter.category)
    .setStatus(filter.status === "all" ? undefined : filter.status)
    .setWorkflow(filter.workflow === "all" ? undefined : filter.workflow);
};

const needsInMemoryFiltering = (filter: ProjectSearchFilterOption): boolean => {
  const hasTitle = filter.title && filter.title.trim();
  const hasPosition = filter.position && filter.position !== "all";
  return !!(hasTitle || hasPosition);
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

  if (needsInMemoryFiltering(filter)) {
    queryBuilder.addLimit(pageSize * MEMORY_FETCH_MULTIPLIER);
  } else {
    const offset = (page - 1) * pageSize;
    queryBuilder.addLimit(offset + pageSize * PREFETCH_BUFFER_SIZE);
  }

  const projects = await fetchAndTransformProjects(queryBuilder);
  const filteredProjects = applyInMemoryFilters(projects, filter);

  return applyPagination(filteredProjects, page, pageSize);
};
