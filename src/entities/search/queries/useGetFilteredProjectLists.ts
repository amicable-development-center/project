import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type { QueryDocumentSnapshot, DocumentData } from "firebase/firestore";

import getFilteredProjectLists, {
  getFilteredProjectListsSimple,
  getFilteredProjectsCount,
  getFilteredProjectsByPage,
} from "@entities/search/api/getFilteredProjectLists";
import type { ProjectSearchFilterOption } from "@entities/search/types";

import type { ProjectListRes } from "@shared/types/project";

interface PaginatedSearchOptions {
  filter: ProjectSearchFilterOption;
  cursor?: QueryDocumentSnapshot<DocumentData> | null;
  pageSize?: number;
}

interface PaginatedSearchResult {
  projects: ProjectListRes[];
  lastVisible: QueryDocumentSnapshot<DocumentData> | null;
  hasMore: boolean;
}

const useGetFilteredProjectLists = (): UseMutationResult<
  ProjectListRes[],
  Error,
  ProjectSearchFilterOption
> => {
  return useMutation({
    mutationFn: (filter: ProjectSearchFilterOption) => {
      return getFilteredProjectListsSimple("projects", filter);
    },
  });
};

export const useGetFilteredProjectListsWithPagination = (): UseMutationResult<
  PaginatedSearchResult,
  Error,
  PaginatedSearchOptions
> => {
  return useMutation({
    mutationFn: ({ filter, cursor, pageSize }: PaginatedSearchOptions) => {
      return getFilteredProjectLists("projects", filter, { cursor, pageSize });
    },
  });
};

export const useGetFilteredProjectsCount = (): UseMutationResult<
  number,
  Error,
  ProjectSearchFilterOption
> => {
  return useMutation({
    mutationFn: (filter: ProjectSearchFilterOption) => {
      return getFilteredProjectsCount("projects", filter);
    },
  });
};

// 페이지 번호 기반 검색 훅
export const useGetFilteredProjectsByPage = (): UseMutationResult<
  ProjectListRes[],
  Error,
  { filter: ProjectSearchFilterOption; page: number; pageSize?: number }
> => {
  return useMutation({
    mutationFn: ({ filter, page, pageSize = 6 }) => {
      return getFilteredProjectsByPage("projects", filter, page, pageSize);
    },
  });
};

export default useGetFilteredProjectLists;
