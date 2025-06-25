import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type { QueryDocumentSnapshot, DocumentData } from "firebase/firestore";

import getFilteredProjectLists, {
  getFilteredProjectListsSimple,
  getFilteredProjectCount,
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

const useGetFilteredProjectLists = (
  filter: ProjectSearchFilterOption,
  enabled: boolean = true
): UseQueryResult<ProjectListRes[], Error> => {
  return useQuery({
    queryKey: ["filteredProjects", filter],
    queryFn: () => getFilteredProjectListsSimple("projects", filter),
    enabled,
    staleTime: 5 * 60 * 1000, // 5분간 신선한 데이터로 간주
    gcTime: 10 * 60 * 1000, // 10분간 캐시 유지
  });
};

export const useGetFilteredProjectListsWithPagination = (
  options: PaginatedSearchOptions,
  enabled: boolean = true
): UseQueryResult<PaginatedSearchResult, Error> => {
  return useQuery({
    queryKey: [
      "filteredProjectsPaginated",
      options.filter,
      options.cursor,
      options.pageSize,
    ],
    queryFn: () =>
      getFilteredProjectLists("projects", options.filter, {
        cursor: options.cursor,
        pageSize: options.pageSize,
      }),
    enabled,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const useGetFilteredProjectsCount = (
  filter: ProjectSearchFilterOption,
  enabled: boolean = true
): UseQueryResult<number, Error> => {
  return useQuery({
    queryKey: ["filteredProjectsCount", filter],
    queryFn: () => getFilteredProjectCount("projects", filter),
    enabled,
    staleTime: 10 * 60 * 1000, // 카운트는 더 오래 캐시 (10분)
    gcTime: 15 * 60 * 1000, // 15분간 캐시 유지
  });
};

export const useGetFilteredProjectsByPage = (
  filter: ProjectSearchFilterOption,
  page: number,
  pageSize: number = 6,
  enabled: boolean = true
): UseQueryResult<ProjectListRes[], Error> => {
  return useQuery({
    queryKey: ["filteredProjectsByPage", filter, page, pageSize],
    queryFn: () =>
      getFilteredProjectsByPage("projects", filter, page, pageSize),
    enabled,
    staleTime: 3 * 60 * 1000, // 3분간 신선한 데이터로 간주
    gcTime: 10 * 60 * 1000, // 10분간 캐시 유지
    refetchOnWindowFocus: false, // 윈도우 포커스 시 자동 리페치 방지
    retry: 1, // 재시도 횟수 제한
  });
};

export default useGetFilteredProjectLists;
