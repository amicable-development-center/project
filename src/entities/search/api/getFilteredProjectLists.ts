import { getDocs, getCountFromServer } from "firebase/firestore";
import type { QueryDocumentSnapshot, DocumentData } from "firebase/firestore";

import { SearchFilterBuilder } from "@entities/search/model/searchFilterBuilder";

import type { ProjectListRes } from "@shared/types/project";
import type { ProjectSearchFilterOption } from "@shared/types/search";

interface GetFilteredProjectListsOptions {
  cursor?: QueryDocumentSnapshot<DocumentData> | null;
  pageSize?: number;
}

interface ProjectListWithPagination {
  projects: ProjectListRes[];
  lastVisible: QueryDocumentSnapshot<DocumentData> | null;
  hasMore: boolean;
  totalCount?: number;
}

export const getFilteredProjectCount = async (
  collectionName: string,
  filter: ProjectSearchFilterOption
): Promise<number> => {
  const queryBuilder = new SearchFilterBuilder(collectionName)
    .setCategory(filter.category === "all" ? undefined : filter.category)
    .setStatus(filter.status === "all" ? undefined : filter.status)
    .setWorkflow(filter.workflow === "all" ? undefined : filter.workflow);

  const query = queryBuilder.build();

  if (filter.title || (filter.position && filter.position !== "all")) {
    const allDocs = await getDocs(query);

    let projects = allDocs.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as ProjectListRes[];

    if (filter.title && filter.title.trim()) {
      const searchTitle = filter.title.toLowerCase().trim();
      projects = projects.filter((project) =>
        project.title.toLowerCase().includes(searchTitle)
      );
    }

    if (filter.position && filter.position !== "all") {
      projects = projects.filter((project) =>
        project.positions.some(
          (position) => position.position === filter.position
        )
      );
    }

    return projects.length;
  }

  const snapshot = await getCountFromServer(query);
  return snapshot.data().count;
};

export const getFilteredProjectsByPage = async (
  collectionName: string,
  filter: ProjectSearchFilterOption,
  page: number = 1,
  pageSize: number = 6
): Promise<ProjectListRes[]> => {
  const queryBuilder = new SearchFilterBuilder(collectionName)
    .setCategory(filter.category === "all" ? undefined : filter.category)
    .setStatus(filter.status === "all" ? undefined : filter.status)
    .setWorkflow(filter.workflow === "all" ? undefined : filter.workflow)
    .setSortBy(filter.sortBy || "latest");

  if (filter.title || (filter.position && filter.position !== "all")) {
    queryBuilder.addLimit(pageSize * 10);
  } else {
    const offset = (page - 1) * pageSize;
    queryBuilder.addLimit(offset + pageSize * 2);
  }

  const query = queryBuilder.build();
  const snapshot = await getDocs(query);

  let projects = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as ProjectListRes[];

  if (filter.title && filter.title.trim()) {
    const searchTitle = filter.title.toLowerCase().trim();

    projects = projects.filter((project) =>
      project.title.toLowerCase().includes(searchTitle)
    );
  }

  if (filter.position && filter.position !== "all") {
    projects = projects.filter((project) =>
      project.positions.some(
        (position) => position.position === filter.position
      )
    );
  }

  const offset = (page - 1) * pageSize;
  const startIndex = offset;
  const endIndex = startIndex + pageSize;

  const result = projects.slice(startIndex, endIndex);

  return result;
};

const getFilteredProjectLists = async (
  collectionName: string,
  filter: ProjectSearchFilterOption,
  options: GetFilteredProjectListsOptions = {}
): Promise<ProjectListWithPagination> => {
  const { cursor, pageSize = 6 } = options;

  let queryBuilder = new SearchFilterBuilder(collectionName)
    .setCategory(filter.category === "all" ? undefined : filter.category)
    .setStatus(filter.status === "all" ? undefined : filter.status)
    .setWorkflow(filter.workflow === "all" ? undefined : filter.workflow)
    .setSortBy(filter.sortBy || "latest");

  if (cursor) {
    queryBuilder.addStartAfter(cursor);
  }

  queryBuilder.addLimit(pageSize + 1);

  const query = queryBuilder.build();

  const snapshot = await getDocs(query);
  let projects = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as ProjectListRes[];

  if (filter.title && filter.title.trim()) {
    const searchTitle = filter.title.toLowerCase().trim();
    projects = projects.filter((project) =>
      project.title.toLowerCase().includes(searchTitle)
    );
  }

  if (filter.position && filter.position !== "all") {
    projects = projects.filter((project) =>
      project.positions.some(
        (position) => position.position === filter.position
      )
    );
  }

  const hasMore = projects.length > pageSize;
  if (hasMore) {
    projects = projects.slice(0, pageSize);
  }

  const lastVisible =
    projects.length > 0 ? snapshot.docs[projects.length - 1] : null;

  return {
    projects,
    lastVisible,
    hasMore,
  };
};

export const getFilteredProjectListsSimple = async (
  collectionName: string,
  filter: ProjectSearchFilterOption
): Promise<ProjectListRes[]> => {
  const result = await getFilteredProjectLists(collectionName, filter);
  return result.projects;
};

export default getFilteredProjectLists;
