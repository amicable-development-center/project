import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

import { getProjectList } from "@entities/projects/api/projectsAPi";
import type { ProjectListRes } from "@entities/projects/types/projects";

const useProjectList = (
  lastDoc: QueryDocumentSnapshot<DocumentData> | null
): UseQueryResult<{
  projects: ProjectListRes[];
  lastVisible: QueryDocumentSnapshot<DocumentData> | null;
}> => {
  return useQuery({
    queryKey: ["project-list", lastDoc?.id ?? "none"],
    queryFn: () => getProjectList({ pageSize: 6, lastDoc }),
  });
};

export default useProjectList;
