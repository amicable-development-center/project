import { useMutation, type UseMutationResult } from "@tanstack/react-query";

import { doneProjectItem } from "@features/projects/api/projectsApi";

import type { ApiResMessage } from "@entities/projects/types/firebase";

import queryClient from "@shared/react-query/queryClient";
import { useAuthStore } from "@shared/stores/authStore";

interface IDsType {
  projectID: string;
  projectOwnerID: string;
}

const useProjectDone = (): UseMutationResult<ApiResMessage, Error, IDsType> => {
  const user = useAuthStore((state) => state.user);

  return useMutation({
    mutationFn: ({ projectID, projectOwnerID }: IDsType) => {
      if (user?.uid !== projectOwnerID) {
        throw new Error("삭제 권한이 없습니다.");
      }
      return doneProjectItem(projectID);
    },
    onSuccess: (data, { projectID }) => {
      if (data.message) {
        alert(data.message);
      }
      if (data.success) {
        queryClient.invalidateQueries({
          queryKey: ["project-detail", projectID],
        });
        return;
      }
    },
    onError: (err) => {
      alert(err || "정상적으로 마감되지 않았습니다.");
      console.log(err);
    },
  });
};
export default useProjectDone;
