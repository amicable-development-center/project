import { useQuery, type UseQueryResult } from "@tanstack/react-query";

import {
  getProjectsCount,
  getProjectsByPage,
} from "@entities/search/api/projectSearchApi";

import type { ProjectListRes } from "@shared/types/project";
import type { ProjectSearchFilterOption } from "@shared/types/search";

const STALE_TIME_MINUTES = 5;

export const useProjectsCount = (
  filter: ProjectSearchFilterOption
): UseQueryResult<number, Error> => {
  return useQuery({
    queryKey: ["projects", "count", filter],
    queryFn: () => getProjectsCount("projects", filter),
    staleTime: 1000 * 60 * STALE_TIME_MINUTES,
  });
};

export const useProjectsByPage = (
  filter: ProjectSearchFilterOption,
  page: number,
  pageSize: number
): UseQueryResult<ProjectListRes[], Error> => {
  return useQuery({
    queryKey: ["projects", "page", filter, page, pageSize],
    queryFn: () => getProjectsByPage("projects", filter, page, pageSize),
    staleTime: 1000 * 60 * STALE_TIME_MINUTES,
  });
};
