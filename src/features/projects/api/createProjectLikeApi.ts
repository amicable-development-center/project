import type { User } from "firebase/auth";
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";

import { db } from "@shared/firebase/firebase";
import type { ToggleProjectLikeResponse } from "@shared/types/like";

export const toggleProjectLike = async (
  userId: User["uid"] | undefined,
  projectId: string | undefined
): Promise<ToggleProjectLikeResponse> => {
  if (!userId) {
    throw new Error("유저 정보가 없습니다 로그인 해주세요.");
  }

  if (!projectId) {
    throw new Error("유효하지 않은 프로젝트 정보입니다.");
  }

  const LIKE_ID = `${userId}_${projectId}`;

  const likeRef = doc(db, "likes", LIKE_ID);
  const snapshot = await getDoc(likeRef);

  if (snapshot.exists()) {
    await deleteDoc(likeRef);

    return {
      success: true,
      message: "좋아요 취소 완료",
      liked: false,
    };
  }

  await setDoc(likeRef, {
    userId,
    projectId,
  });

  return {
    success: true,
    message: "좋아요 완료",
    liked: true,
  };
};
