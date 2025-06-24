import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type {
  DocumentData,
  QueryDocumentSnapshot,
} from "firebase/firestore/lite";

import { getProjectList } from "@entities/projects/api/projectsAPi";
import type { ProjectListRes } from "@entities/projects/types/projects";

const useProjectList = (): UseQueryResult<{
  projects: ProjectListRes[];
  lastVisible: QueryDocumentSnapshot<DocumentData> | null;
}> => {
  return useQuery({
    queryKey: ["project-list"],
    queryFn: () => getProjectList({ pageSize: 3 }),
  });
};

export default useProjectList;
