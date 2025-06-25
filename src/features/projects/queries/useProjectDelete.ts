import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { deleteProjectItem } from "@features/projects/api/projectsApi";

import type { ApiResMessage } from "@entities/projects/types/firebase";

import { useAuthStore } from "@shared/stores/authStore";

const useProjectDelete = (): UseMutationResult<
  ApiResMessage,
  Error,
  string
> => {
  const Navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  return useMutation({
    mutationFn: (id: string) => {
      if (user?.uid !== id) {
        throw new Error("삭제 권한이 없습니다.");
      }
      return deleteProjectItem(id);
    },
    onSuccess: (data) => {
      if (data.message) {
        alert(data.message);
      }
      // 게시글 삭제 후 목록페이지로 이동
      if (data.success) {
        Navigate("/project");
      }
    },
    onError: (err) => {
      alert(err || "정상적으로 삭제되지 않았습니다.");
      console.log(err);
    },
  });
};
export default useProjectDelete;
