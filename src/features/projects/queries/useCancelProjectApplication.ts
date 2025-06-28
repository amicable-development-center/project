import {
  useMutation,
  useQueryClient,
  type UseMutationResult,
} from "@tanstack/react-query";

import queryKeys from "@shared/react-query/queryKey";
import { useApplicationsStore } from "@shared/stores/applicationsStore";
import { useAuthStore } from "@shared/stores/authStore";
import { useSnackbarStore } from "@shared/stores/snackbarStore";

import { cancelProjectApplications } from "../api/createProjectApplicationsApi";

/**
 * 프로젝트 지원 취소 훅
 * @returns UseMutationResult - 지원 취소 mutation 객체
 */
export const useCancelProjectApplication = (): UseMutationResult<
  void,
  Error,
  string
> => {
  const { user } = useAuthStore();
  const { removeAppliedProject } = useApplicationsStore();
  const { showError, showSuccess } = useSnackbarStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (projectId: string) => {
      await cancelProjectApplications(user?.uid, projectId);
    },
    onSuccess: (_, projectId) => {
      removeAppliedProject(projectId);
      showSuccess("지원이 취소되었습니다.");

      queryClient.invalidateQueries({
        queryKey: [queryKeys.myAppliedProjects],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.projectApply],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.projectAppliedUser],
      });
    },
    onError: (error) => {
      console.error("지원 취소 실패:", error);
      showError(`지원 취소 실패: ${error.message}`);
    },
  });
};
