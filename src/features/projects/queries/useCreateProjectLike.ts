import {
  useMutation,
  useQueryClient,
  type UseMutationResult,
} from "@tanstack/react-query";
import { useCallback, useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { toggleProjectLike } from "@features/projects/api/createProjectLikeApi";

import { useGetProjectLike } from "@entities/projects/queries/useGetProjectLike";

import queryKeys from "@shared/react-query/queryKey";
import { useAuthStore } from "@shared/stores/authStore";
import { useLikeStore } from "@shared/stores/likeStore";
import type { ToggleProjectLikeResponse } from "@shared/types/like";

const DEBOUNCE_DELAY_MS = 100;

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
        queryKey: [queryKeys.projectLike, projectId],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.projectLikedUser, projectId],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.projects],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.project, projectId],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.myLikedProjects, "ids"],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.myLikedProjects, "details"],
      });
    },
  });
};

interface UseOptimisticProjectLikeProps {
  isLiked: boolean;
  isLoading: boolean;
  toggleLike: () => void;
}

export const useOptimisticProjectLike = (): UseOptimisticProjectLikeProps => {
  const { id: projectId } = useParams();
  const { data: serverLikeStatus, isLoading } = useGetProjectLike();
  const { mutate: syncToServer } = useToggleProjectLikeSync();
  const { addLikedProject, removeLikedProject } = useLikeStore();

  const [optimisticLikeStatus, setOptimisticLikeStatus] = useState<
    boolean | undefined
  >(serverLikeStatus);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const pendingServerSync = useRef<boolean>(false);

  useEffect(() => {
    if (serverLikeStatus !== undefined && !pendingServerSync.current) {
      setOptimisticLikeStatus(serverLikeStatus);
    }
  }, [serverLikeStatus]);

  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      pendingServerSync.current = false;
    };
  }, [projectId]);

  const toggleLike = useCallback(() => {
    if (!projectId || isLoading) return;

    const newLikeStatus = !optimisticLikeStatus;
    setOptimisticLikeStatus(newLikeStatus);

    // 전역 상태도 업데이트
    if (newLikeStatus) {
      addLikedProject(projectId);
    } else {
      removeLikedProject(projectId);
    }

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    pendingServerSync.current = true;
    debounceTimerRef.current = setTimeout(() => {
      syncToServer(projectId, {
        onSettled: () => {
          pendingServerSync.current = false;
        },
      });
    }, DEBOUNCE_DELAY_MS);
  }, [
    projectId,
    isLoading,
    optimisticLikeStatus,
    addLikedProject,
    removeLikedProject,
    syncToServer,
  ]);

  const displayLikeStatus = optimisticLikeStatus ?? serverLikeStatus ?? false;

  return {
    isLiked: displayLikeStatus,
    isLoading,
    toggleLike,
  };
};
