import type { User } from "firebase/auth";
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
  getCountFromServer,
} from "firebase/firestore";

import { getProjectsByIds } from "@entities/projects/api/projectsApi";

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
 * @returns Promise<(ProjectListRes & { applicantsCount: number })[]> - 사용자가 지원한 프로젝트 상세 정보 배열
 */
export const getMyAppliedProjectsWithDetails = async (
  userId: User["uid"] | undefined
): Promise<(ProjectListRes & { applicantsCount: number })[]> => {
  if (!userId) {
    throw new Error("유저 정보가 없습니다 로그인 해주세요.");
  }

  try {
    const projectIds = await getMyAppliedProjectsIds(userId);
    const projects = await getProjectsByIds(projectIds);
    const countMap = await getApplicantsCountMap(projectIds);
    return projects.map((project: ProjectListRes) => ({
      ...project,
      applicantsCount: countMap[project.id] ?? 0,
    }));
  } catch (error) {
    console.error("내가 지원한 프로젝트 조회 에러:", error);
    throw new Error("내가 지원한 프로젝트 정보를 가져오는데 실패했습니다.");
  }
};

/**
 * 지원 취소(삭제)
 * @param userId - 사용자 UID
 * @param projectId - 프로젝트 ID
 */
export const deleteApplication = async (
  userId: string,
  projectId: string
): Promise<void> => {
  const q = query(
    collection(db, "applications"),
    where("userId", "==", userId),
    where("projectId", "==", projectId)
  );
  const snapshot = await getDocs(q);
  for (const d of snapshot.docs) {
    await deleteDoc(doc(db, "applications", d.id));
  }
};

/**
 * 특정 프로젝트의 지원자 수를 applications 컬렉션에서 count로 가져온다.
 * @param projectId - 프로젝트 ID
 * @returns 지원자 수 (number)
 */
export const getProjectApplicantsCount = async (
  projectId: string
): Promise<number> => {
  const q = query(
    collection(db, "applications"),
    where("projectId", "==", projectId)
  );
  const snapshot = await getCountFromServer(q);
  return snapshot.data().count as number;
};

/**
 * 여러 프로젝트 id에 대해 지원자 수를 한 번에 가져오는 함수
 * @param projectIds - 프로젝트 ID 배열
 * @returns Promise<Record<string, number>> - { [projectId]: count }
 */
export const getApplicantsCountMap = async (
  projectIds: string[]
): Promise<Record<string, number>> => {
  if (!projectIds.length) return {};
  const results: Record<string, number> = {};
  await Promise.all(
    projectIds.map(async (projectId) => {
      try {
        results[projectId] = await getProjectApplicantsCount(projectId);
      } catch {
        results[projectId] = 0;
      }
    })
  );
  return results;
};
