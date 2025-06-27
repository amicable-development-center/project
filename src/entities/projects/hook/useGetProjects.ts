import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

import { getProjectList } from "@entities/projects/api/projectsAPi";

import queryKeys from "@shared/react-query/queryKey";
import type { ProjectListRes } from "@shared/types/project";

const useGetProjects = ({
  pageSize = 6,
}: {
  pageSize?: number;
}): UseQueryResult<{
  projects: ProjectListRes[];
  lastVisible: QueryDocumentSnapshot<DocumentData> | null;
}> => {
  return useQuery({
    queryKey: [queryKeys.projects],
    queryFn: () => getProjectList({ pageSize, lastDoc: null }),
  });
};

export default useGetProjects;
