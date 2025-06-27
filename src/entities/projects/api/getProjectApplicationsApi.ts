import type { User } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";

import { getProjectsByIds } from "@entities/projects/api/projectsAPi";

import { db } from "@shared/firebase/firebase";
import type { ProjectListRes } from "@shared/types/project";

/**
 * 유저 프로젝트 지원 상태 조회
 * @param userId - 조회할 사용자 UID
 * @param projectId - 조회할 프로젝트 ID
 * @returns Promise<boolean> - 지원 여부 (true: 지원함, false: 지원 안함)
 */
export const getProjectApplicationStatus = async (
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
    collection(db, "applications"),
    where("userId", "==", userId),
    where("projectId", "==", projectId)
  );

  try {
    const snapshot = await getDocs(q);
    return snapshot.docs.length > 0;
  } catch {
    throw new Error("지원 상태를 가져오는데 실패했습니다.");
  }
};

/**
 * 프로젝트 지원 유저 조회
 * @param projectId - 조회할 프로젝트 ID
 * @returns Promise<string[]> - 해당 프로젝트에 지원한 사용자 UID 배열
 */
export const getProjectApplicationUsers = async (
  projectId: string
): Promise<string[]> => {
  if (!projectId) {
    throw new Error("유효하지 않은 프로젝트 정보입니다.");
  }

  const q = query(
    collection(db, "applications"),
    where("projectId", "==", projectId)
  );

  try {
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => doc.data().userId);
  } catch {
    throw new Error("지원 유저 정보를 가져오는데 실패했습니다.");
  }
};

/**
 * 내가 지원한 프로젝트 IDs 조회
 * @param userId - 조회할 사용자 UID
 * @returns Promise<string[]> - 사용자가 지원한 프로젝트 ID 배열
 */
export const getMyAppliedProjectsIds = async (
  userId: User["uid"] | undefined
): Promise<string[]> => {
  if (!userId) {
    throw new Error("유저 정보가 없습니다 로그인 해주세요.");
  }

  const q = query(
    collection(db, "applications"),
    where("userId", "==", userId)
  );

  try {
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => doc.data().projectId);
  } catch {
    throw new Error("내가 지원한 프로젝트 ID를 가져오는데 실패했습니다.");
  }
};

/**
 * 내가 지원한 프로젝트 상세 조회
 * @param userId - 조회할 사용자 UID
 * @returns Promise<ProjectListRes[]> - 사용자가 지원한 프로젝트 상세 정보 배열
 */
export const getMyAppliedProjectsWithDetails = async (
  userId: User["uid"] | undefined
): Promise<ProjectListRes[]> => {
  if (!userId) {
    throw new Error("유저 정보가 없습니다 로그인 해주세요.");
  }

  try {
    const projectIds = await getMyAppliedProjectsIds(userId);
    const projects = await getProjectsByIds(projectIds);

    return projects;
  } catch (error) {
    console.error("내가 지원한 프로젝트 조회 에러:", error);
    throw new Error("내가 지원한 프로젝트 정보를 가져오는데 실패했습니다.");
  }
};
