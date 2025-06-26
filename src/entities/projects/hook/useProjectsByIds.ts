import { useQuery, type UseQueryResult } from "@tanstack/react-query";

import type { ProjectListRes } from "@shared/types/project";

import { getProjectsByIds } from "../api/projectsAPi";

export function useProjectsByIds(
  ids: string[]
): UseQueryResult<ProjectListRes[]> {
  return useQuery<ProjectListRes[]>({
    queryKey: ["projectsByIds", ids],
    queryFn: () => getProjectsByIds(ids),
    enabled: ids.length > 0,
  });
}
