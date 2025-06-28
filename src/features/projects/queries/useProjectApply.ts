import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { updateApplyOrLike } from "@features/projects/api/projectsApi";

import type { ApiResMessage } from "@entities/projects/types/firebase";

import { useAuthStore } from "@shared/stores/authStore";

const useProjectApply = (): UseMutationResult<ApiResMessage, Error, string> => {
  const Navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  return useMutation({
    mutationFn: (projectID: string) => {
      if (!user) {
        throw new Error("로그인을 해주세요.");
      }
      return updateApplyOrLike(user.uid, projectID);
    },
    onSuccess: (data) => {
      // 지원 완료 후 프로필로 이동
      alert(data.message);
      if (data.success) {
        Navigate("/profile");
      }
    },
    onError: (err) => {
      alert(err);
      console.log(err);
    },
  });
};
export default useProjectApply;
