import { useState } from "react";
import { useParams } from "react-router-dom";

import useProjectLike from "@features/projects/queries/useProjectLike";
import useProjectUnLike from "@features/projects/queries/useProjectUnLike";

import { useAuthStore } from "@shared/stores/authStore";

interface LikeResult {
  isLike: boolean;
  likeFn: () => void;
}

const useLike = ({ likedUsers }: { likedUsers: string[] }): LikeResult => {
  const { id: projectID } = useParams();
  const user = useAuthStore((state) => state.user);
  const { mutate: updateLike, isPending: likePending } = useProjectLike();
  const { mutate: updateUnLike, isPending: unLikePending } = useProjectUnLike();

  const initLike = user && likedUsers.includes(user.uid);
  const [isLike, setIsLike] = useState(initLike || false);

  const updateLikeStatus = (): void => {
    if (!projectID) return;

    if (!user) {
      alert("로그인 해주세요.");
      return;
    }

    if (likePending || unLikePending) {
      alert("동작이 너무 빠릅니다. 잠시 후에 시도해주십시오.");
      return;
    }

    if (!isLike) {
      setIsLike(true);
      updateLike(projectID);
    } else {
      setIsLike(false);
      updateUnLike(projectID);
    }
  };

  return {
    isLike,
    likeFn: updateLikeStatus,
  };
};

export default useLike;
