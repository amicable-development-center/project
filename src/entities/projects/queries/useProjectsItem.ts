import { useQuery, type UseQueryResult } from "@tanstack/react-query";

import { getProjectItem } from "@entities/projects/api/projectsAPi";
import type { ProjectListRes } from "@entities/projects/types/projects";

const useProjectsItem = ({
  id,
}: {
  id: string | null;
}): UseQueryResult<ProjectListRes | null, Error> => {
  return useQuery({
    queryKey: ["projects-total-count"],
    queryFn: () => {
      if (!id) return null;
      return getProjectItem(id);
    },
    enabled: !!id,
  });
};

export default useProjectsItem;
