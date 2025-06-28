import {
  useMutation,
  useQueryClient,
  type UseMutationResult,
} from "@tanstack/react-query";

import { toggleProjectLike } from "@features/projects/api/createProjectLikeApi";

import queryKeys from "@shared/react-query/queryKey";
import { useAuthStore } from "@shared/stores/authStore";
import type { ToggleProjectLikeResponse } from "@shared/types/like";

export const useToggleProjectLikeSync = (): UseMutationResult<
  ToggleProjectLikeResponse,
  Error,
  string
> => {
  const user = useAuthStore((state) => state.user);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (projectId: string) => toggleProjectLike(user?.uid, projectId),

    onSettled: (_data, _error, projectId) => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.projectLike],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.projectLikedUser],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.projects, projectId],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.myLikedProjects, "ids"],
      });
    },
  });
};
