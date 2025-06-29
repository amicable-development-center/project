import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { useToggleProjectLikeSync } from "@features/projects/queries/useCreateProjectLike";

import { useGetProjectLike } from "@entities/projects/queries/useGetProjectLike";

import { useLikeStore } from "@shared/stores/likeStore";
import { useSnackbarStore } from "@shared/stores/snackbarStore";

interface UseOptimisticProjectLikeProps {
  isLiked: boolean;
  toggleLike: () => void;
}

const DEBOUNCE_DELAY_MS = 100;

export const useOptimisticProjectLike = (): UseOptimisticProjectLikeProps => {
  const { id: projectId } = useParams();
  const { data: serverLikeStatus, isLoading } = useGetProjectLike();
  const { mutate: syncToServer } = useToggleProjectLikeSync();
  const { addLikedProject, removeLikedProject } = useLikeStore();
  const { showSuccess } = useSnackbarStore();

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
    // projectId을 바꾸려면 사실상 Url을 직접 바쒀서 진입할 수 밖에 없긴한데
    // 이 경우 해당 훅을 불러오는 컴포넌트가 언마운트 되었다가 다시 마운트 되는 구조라
    // if문이 실행되는 경우를 알 수가 없지만
    //  pendingServerSync.current = false;를 꼭 해야한다면
    // 의존성 [] 이어도 될 같습니다 ... 만 나중에 천천히 알아보며 리팩토링 하기로하고 남겨두겟습니다
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      pendingServerSync.current = false;
    };
  }, [projectId]);

  const toggleLike = (): void => {
    if (!projectId || isLoading) return;

    const newLikeStatus = !optimisticLikeStatus;
    setOptimisticLikeStatus(newLikeStatus);

    // 전역 상태도 업데이트
    if (newLikeStatus) {
      addLikedProject(projectId);
      showSuccess("좋아요 되었습니다.");
    } else {
      removeLikedProject(projectId);
      showSuccess("좋아요가 취소 되었습니다.");
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
  };

  const displayLikeStatus = optimisticLikeStatus ?? serverLikeStatus ?? false;

  return {
    isLiked: displayLikeStatus,
    toggleLike,
  };
};
