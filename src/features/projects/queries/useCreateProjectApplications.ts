import {
  useMutation,
  useQueryClient,
  type UseMutationResult,
} from "@tanstack/react-query";
import type { User } from "firebase/auth";
import { useParams } from "react-router-dom";

import { createProjectApplication } from "@features/projects/api/createProjectApplicationsApi";

import queryKeys from "@shared/react-query/queryKey";
import { useApplicationsStore } from "@shared/stores/applicationsStore";
import { useAuthStore } from "@shared/stores/authStore";
import { useSnackbarStore } from "@shared/stores/snackbarStore";

/**
 * 프로젝트 지원 생성 훅
 * @returns UseMutationResult<void, Error, string> - 프로젝트 지원 생성 결과
 */
export const useCreateProjectApplications = (): UseMutationResult<
  void,
  Error,
  string
> => {
  const { id: projectId } = useParams();
  const { user } = useAuthStore();
  const { addAppliedProject } = useApplicationsStore();
  const { showError, showSuccess } = useSnackbarStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (message: string) => {
      if (!projectId) {
        return Promise.reject(new Error("projectId가 없서요."));
      }

      return createProjectApplication({
        userId: user?.uid as User["uid"],
        projectId,
        message,
      });
    },

    onSuccess: (_data) => {
      if (!projectId) return;
      addAppliedProject(projectId);
      showSuccess("지원이 완료되었습니다! 🎉");
    },
    onSettled: (_data, _error) => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.projectApply, projectId],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.projectAppliedUser, projectId],
      });
    },
    onError: (error) => {
      console.error("지원 실패:", error);
      showError(`지원 실패: ${error.message}`);
    },
  });
};
