import { useQuery, type UseQueryResult } from "@tanstack/react-query";

import { getProjectItem } from "@entities/projects/api/projectsAPi";

import type { ProjectListRes } from "@shared/types/project";

const useProjectsItem = ({
  id, // projectID
}: {
  id: string | null;
}): UseQueryResult<ProjectListRes | null, Error> => {
  return useQuery({
    queryKey: ["project-detail", id],
    queryFn: () => {
      if (!id) return null;
      return getProjectItem(id);
    },
    enabled: !!id,
  });
};

export default useProjectsItem;
