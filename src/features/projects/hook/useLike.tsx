import { useState } from "react";

import useProjectLike from "@features/projects/queries/useProjectLike";
import useProjectUnLike from "@features/projects/queries/useProjectUnLike";

import { useAuthStore } from "@shared/stores/authStore";

interface LikeResult {
  isLike: boolean;
  like: () => void;
  unlike: () => void;
}

const useLike = ({
  projectID,
  likedUsers,
}: {
  projectID: string;
  likedUsers: string[];
}): LikeResult => {
  const user = useAuthStore((state) => state.user);
  const { mutate: updateLike, isPending: likePending } = useProjectLike();
  const { mutate: updateUnLike, isPending: unLikePending } = useProjectUnLike();

  const initLike = user && likedUsers.includes(user.uid);
  const [isLike, setIsLike] = useState(initLike || false);

  const like = (): void => {
    if (!projectID) return;
    if (likePending || unLikePending) {
      alert("동작이 너무 빠릅니다. 잠시 후에 시도해주십시오.");
      return;
    }
    setIsLike(true);
    updateLike(projectID);
  };

  const unlike = (): void => {
    if (!projectID) return;
    if (likePending || unLikePending) {
      alert("동작이 너무 빠릅니다. 잠시 후에 시도해주십시오.");
      return;
    }
    setIsLike(false);
    updateUnLike(projectID);
  };

  return {
    isLike,
    like,
    unlike,
  };
};

export default useLike;
