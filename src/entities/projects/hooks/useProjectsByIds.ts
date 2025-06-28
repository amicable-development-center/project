import { useQuery, type UseQueryResult } from "@tanstack/react-query";

import { getProjectsByIds } from "@entities/projects/api/projectsApi";

import type { ProjectListRes } from "@shared/types/project";

export function useProjectsByIds(
  ids: string[]
): UseQueryResult<ProjectListRes[]> {
  return useQuery<ProjectListRes[]>({
    queryKey: ["projectsByIds", ids],
    queryFn: () => getProjectsByIds(ids),
    enabled: ids.length > 0,
  });
}
