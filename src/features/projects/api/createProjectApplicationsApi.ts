import type { User } from "firebase/auth";
import {
  deleteDoc,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

import { db } from "@shared/firebase/firebase";
import type {
  CreateProjectApplicationInput,
  ToggleProjectApplicationResponse,
} from "@shared/types/project";

/**
 * 프로젝트 지원 상태 토글 (지원/지원취소)
 * @param userId - 지원할 사용자 UID
 * @param projectId - 지원할 프로젝트 ID
 * @returns Promise<ToggleProjectApplicationResponse> - 지원 처리 결과 (성공 여부, 메시지, 지원 상태)
 */
export const toggleProjectApplication = async (
  userId: User["uid"] | undefined,
  projectId: string | undefined
): Promise<ToggleProjectApplicationResponse> => {
  if (!userId) {
    throw new Error("유저 정보가 없습니다 로그인 해주세요.");
  }

  if (!projectId) {
    throw new Error("유효하지 않은 프로젝트 정보입니다.");
  }

  const APPLY_ID = `${userId}_${projectId}`;

  const applyRef = doc(db, "applications", APPLY_ID);
  const snapshot = await getDoc(applyRef);

  if (snapshot.exists()) {
    await deleteDoc(applyRef);

    return {
      success: true,
      message: "지원 취소 완료",
      applied: false,
    };
  }

  await setDoc(applyRef, {
    userId,
    projectId,
  });

  return {
    success: true,
    message: "지원 완료",
    applied: true,
  };
};

/**
 * 프로젝트 지원 생성
 * @param userId - 지원할 사용자 UID
 * @param projectId - 지원할 프로젝트 ID
 * @param message - 지원 메시지
 * @returns Promise<void> - 지원 생성 결과
 */
export const createProjectApplication = async ({
  userId,
  projectId,
  message,
}: CreateProjectApplicationInput): Promise<void> => {
  if (!userId) {
    throw new Error("유저 정보가 없습니다 로그인 해주세요.");
  }

  if (!projectId) {
    throw new Error("유효하지 않은 프로젝트 정보입니다.");
  }

  const APPLY_ID = `${userId}_${projectId}`;
  const applyRef = doc(db, "applications", APPLY_ID);

  const dataToSave = {
    userId,
    projectId,
    message,
    createdAt: serverTimestamp(),
    status: "pending" as const,
  };

  await setDoc(applyRef, dataToSave);
};

/**
 * 프로젝트 지원 취소
 * @param userId - 지원 취소할 사용자 UID
 * @param projectId - 지원 취소할 프로젝트 ID
 * @returns Promise<void> - 지원 취소 결과
 */
export const cancelProjectApplications = async (
  userId: User["uid"] | undefined,
  projectId: string | undefined
): Promise<void> => {
  if (!userId) {
    throw new Error("유저 정보가 없습니다 로그인 해주세요.");
  }

  if (!projectId) {
    throw new Error("유효하지 않은 프로젝트 정보입니다.");
  }

  const APPLY_ID = `${userId}_${projectId}`;
  const applyRef = doc(db, "applications", APPLY_ID);

  await deleteDoc(applyRef);
};
