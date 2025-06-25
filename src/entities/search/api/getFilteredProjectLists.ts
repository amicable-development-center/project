import { getDocs, getCountFromServer } from "firebase/firestore";
import type { QueryDocumentSnapshot, DocumentData } from "firebase/firestore";

import { SearchFilterBuilder } from "@entities/search/model/searchFilterBuilder";
import type { ProjectSearchFilterOption } from "@entities/search/types";

import type { ProjectListRes } from "@shared/types/project";

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

export const getFilteredProjectsCount = async (
  collectionName: string,
  filter: ProjectSearchFilterOption
): Promise<number> => {
  const queryBuilder = new SearchFilterBuilder(collectionName)
    .setTitle(filter.title || undefined)
    .setCategory(filter.category === "all" ? undefined : filter.category)
    .setStatus(filter.status === "all" ? undefined : filter.status)
    .setWorkflow(filter.workflow === "all" ? undefined : filter.workflow);

  const query = queryBuilder.build();
  const snapshot = await getCountFromServer(query);

  // Position 필터가 있는 경우 클라이언트 사이드에서 계산해야 함
  if (filter.position && filter.position !== "all") {
    const allDocs = await getDocs(query);
    const filteredProjects = allDocs.docs.filter((doc) => {
      const data = doc.data() as ProjectListRes;
      return data.positions.some(
        (position) => position.position === filter.position
      );
    });
    return filteredProjects.length;
  }

  return snapshot.data().count;
};

export const getFilteredProjectsByPage = async (
  collectionName: string,
  filter: ProjectSearchFilterOption,
  page: number = 1,
  pageSize: number = 6
): Promise<ProjectListRes[]> => {
  const queryBuilder = new SearchFilterBuilder(collectionName)
    .setTitle(filter.title || undefined)
    .setCategory(filter.category === "all" ? undefined : filter.category)
    .setStatus(filter.status === "all" ? undefined : filter.status)
    .setWorkflow(filter.workflow === "all" ? undefined : filter.workflow)
    .setSortBy(filter.sortBy || "latest");

  const query = queryBuilder.build();
  const snapshot = await getDocs(query);

  let projects = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as ProjectListRes[];

  if (filter.position && filter.position !== "all") {
    projects = projects.filter((project) =>
      project.positions.some(
        (position) => position.position === filter.position
      )
    );
  }

  // 페이지네이션 적용
  const offset = (page - 1) * pageSize;
  const startIndex = offset;
  const endIndex = startIndex + pageSize;

  return projects.slice(startIndex, endIndex);
};

const getFilteredProjectLists = async (
  collectionName: string,
  filter: ProjectSearchFilterOption,
  options: GetFilteredProjectListsOptions = {}
): Promise<ProjectListWithPagination> => {
  const { cursor, pageSize = 6 } = options;

  let queryBuilder = new SearchFilterBuilder(collectionName)
    .setTitle(filter.title || undefined)
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
