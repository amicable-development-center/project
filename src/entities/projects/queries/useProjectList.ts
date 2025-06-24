import { useQuery, type UseQueryResult } from "@tanstack/react-query";

import { getProjectList } from "@entities/projects/api/projectsAPi";
import type { ProjectListRes } from "@entities/projects/types/projects";

const useProjectList = (): UseQueryResult<ProjectListRes[]> => {
  return useQuery({
    queryKey: ["project-list"],
    queryFn: getProjectList,
  });
};

export default useProjectList;
