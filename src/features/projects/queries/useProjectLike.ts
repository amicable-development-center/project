import { useMutation, type UseMutationResult } from "@tanstack/react-query";

import { updateApplyOrLike } from "@features/projects/api/projectsApi";

import type { ApiResMessage } from "@entities/projects/types/firebase";

import queryClient from "@shared/react-query/queryClient";
import { useAuthStore } from "@shared/stores/authStore";

const useProjectLike = (): UseMutationResult<ApiResMessage, Error, string> => {
  const user = useAuthStore((state) => state.user);

  return useMutation({
    mutationFn: (projectID: string) => {
      if (!user) {
        throw new Error("로그인을 해주세요.");
      }
      return updateApplyOrLike(user.uid, projectID, "like");
    },
    onSuccess: (data, projectID) => {
      if (data.success) {
        queryClient.invalidateQueries({
          queryKey: ["project-detail", projectID],
        });
        return;
      }
    },
    onError: (err) => {
      alert(err);
      console.log(err);
    },
  });
};
export default useProjectLike;
