import { useQuery, type UseQueryResult } from "@tanstack/react-query";

import { getProjectsTotalCount } from "@entities/projects/api/projectsAPi";

const useProjectsTotalCount = (): UseQueryResult<number, Error> => {
  return useQuery({
    queryKey: ["projects-total-count"],
    queryFn: getProjectsTotalCount,
  });
};

export default useProjectsTotalCount;
