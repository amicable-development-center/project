import type { User } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";

import { db } from "@shared/firebase/firebase";

export const getProjectLikeStatus = async (
  userId: User["uid"] | undefined,
  projectId: string | undefined
): Promise<boolean> => {
  if (!userId) {
    throw new Error("유저 정보가 없습니다 로그인 해주세요.");
  }

  if (!projectId) {
    throw new Error("유효하지 않은 프로젝트 정보입니다.");
  }

  const q = query(
    collection(db, "likes"),
    where("userId", "==", userId),
    where("projectId", "==", projectId)
  );

  try {
    const snapshot = await getDocs(q);
    return snapshot.docs.length > 0;
  } catch {
    throw new Error("좋아요 상태를 가져오는데 실패했습니다.");
  }
};

export const getProjectLikedUsers = async (
  projectId: string
): Promise<string[]> => {
  if (!projectId) {
    throw new Error("유효하지 않은 프로젝트 정보입니다.");
  }

  const q = query(collection(db, "likes"), where("projectId", "==", projectId));

  try {
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => doc.data().userId);
  } catch {
    throw new Error("좋아요 유저 정보를 가져오는데 실패했습니다.");
  }
};

export const getMyLikedProjects = async (
  userId: User["uid"] | undefined
): Promise<string[]> => {
  if (!userId) {
    throw new Error("유저 정보가 없습니다 로그인 해주세요.");
  }

  const q = query(collection(db, "likes"), where("userId", "==", userId));

  try {
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => doc.data().projectId);
  } catch {
    throw new Error("내가 좋아요한 프로젝트 정보를 가져오는데 실패했습니다.");
  }
};
