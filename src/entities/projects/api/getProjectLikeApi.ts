import type { User } from "firebase/auth";
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "@shared/firebase/firebase";
import type { ProjectListRes } from "@shared/types/project";

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

export const getMyLikedProjectsIds = async (
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
    throw new Error("내가 좋아요한 프로젝트 ID를 가져오는데 실패했습니다.");
  }
};

export const getProjectsByIds = async (
  projectIds: string[]
): Promise<ProjectListRes[]> => {
  if (!projectIds || projectIds.length === 0) {
    return [];
  }

  try {
    const projects: ProjectListRes[] = [];

    const BATCH_SIZE = 10;
    const batches = [];

    for (let i = 0; i < projectIds.length; i += BATCH_SIZE) {
      const batch = projectIds.slice(i, i + BATCH_SIZE);
      batches.push(batch);
    }

    const batchPromises = batches.map(async (batch) => {
      const q = query(
        collection(db, "projects"),
        where("__name__", "in", batch)
      );

      const snapshot = await getDocs(q);
      return snapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          }) as ProjectListRes
      );
    });

    const batchResults = await Promise.all(batchPromises);

    batchResults.forEach((batch) => {
      projects.push(...batch);
    });

    return projects;
  } catch (error) {
    console.error("프로젝트 정보 조회 에러:", error);
    throw new Error("프로젝트 정보를 가져오는데 실패했습니다.");
  }
};

export const getMyLikedProjectsWithDetails = async (
  userId: User["uid"] | undefined
): Promise<ProjectListRes[]> => {
  if (!userId) {
    throw new Error("유저 정보가 없습니다 로그인 해주세요.");
  }

  try {
    const projectIds = await getMyLikedProjectsIds(userId);
    const projects = await getProjectsByIds(projectIds);

    return projects;
  } catch (error) {
    console.error("내가 좋아요한 프로젝트 조회 에러:", error);
    throw new Error("내가 좋아요한 프로젝트 정보를 가져오는데 실패했습니다.");
  }
};

// 여러 프로젝트의 좋아요(Like) 삭제
export const deleteUserLikes = async (
  userId: string,
  projectIds: string[]
): Promise<void> => {
  if (!userId || !projectIds.length) return;

  const q = query(
    collection(db, "likes"),
    where("userId", "==", userId),
    where("projectId", "in", projectIds)
  );
  const snapshot = await getDocs(q);
  const deletePromises = snapshot.docs.map((docSnap) =>
    deleteDoc(doc(db, "likes", docSnap.id))
  );
  await Promise.all(deletePromises);
};
