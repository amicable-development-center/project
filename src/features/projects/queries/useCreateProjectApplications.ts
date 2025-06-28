import {
  useMutation,
  useQueryClient,
  type UseMutationResult,
} from "@tanstack/react-query";

import { createProjectApplication } from "@features/projects/api/createProjectApplicationsApi";

import queryKeys from "@shared/react-query/queryKey";
import { useApplicationsStore } from "@shared/stores/applicationsStore";
import type { CreateProjectApplicationInput } from "@shared/types/project";

/**
 * 프로젝트 지원 생성 훅
 * @returns UseMutationResult<void, Error, CreateProjectApplicationInput> - 프로젝트 지원 생성 결과
 */
export const useCreateProjectApplications = (): UseMutationResult<
  void,
  Error,
  CreateProjectApplicationInput
> => {
  const queryClient = useQueryClient();
  const { addAppliedProject } = useApplicationsStore();

  return useMutation({
    mutationFn: (input: CreateProjectApplicationInput) => {
      return createProjectApplication(input);
    },

    onSuccess: (_data, input) => {
      addAppliedProject(input.projectId);
    },

    onSettled: (_data, _error, input) => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.projectApply, input.projectId],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.projectAppliedUser, input.projectId],
      });
    },
  });
};
