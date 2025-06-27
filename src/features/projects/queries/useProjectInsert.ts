import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { insertProjectItem } from "@features/projects/api/projectsApi";
import { updateUserMyProject } from "@features/projects/api/userAPi";

import type { ApiResMessage } from "@entities/projects/types/firebase";

import { useAuthStore } from "@shared/stores/authStore";
import type { ProjectItemInsertReq } from "@shared/types/project";

const useProjectInsert = (): UseMutationResult<
  ApiResMessage,
  Error,
  ProjectItemInsertReq
> => {
  const Navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  return useMutation({
    mutationFn: (projectItem: ProjectItemInsertReq) => {
      if (!user) {
        throw new Error("로그인을 해주세요.");
      }
      return insertProjectItem(projectItem);
    },
    onSuccess: async (data) => {
      // 게시글 등록 후 본인 게시글로 이동
      if (data.success && data.id) {
        try {
          await updateUserMyProject(user?.uid || "", data.id);

          alert("게시글이 등록 되었습니다.");
          Navigate(`/project/${data.id}`);
        } catch (err) {
          console.log("users 업데이트 실패: ", err);
        }
      }
    },
    onError: (err) => {
      alert(err || "게시글이 정상적으로 등록되지 않았습니다.");
      console.log(err);
    },
  });
};
export default useProjectInsert;
