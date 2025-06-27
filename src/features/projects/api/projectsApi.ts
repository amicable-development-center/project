import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import type { ApiResMessage } from "@entities/projects/types/firebase";

import { db } from "@shared/firebase/firebase";
import {
  RecruitmentStatus,
  type ProjectItemInsertReq,
} from "@shared/types/project";

/** firebase projects에 item 등록 */
export const insertProjectItem = async (
  projectItem: ProjectItemInsertReq
): Promise<ApiResMessage> => {
  try {
    const postsRef = collection(db, "projects");
    const docRef = await addDoc(postsRef, {
      ...projectItem,
      createdAt: serverTimestamp(),
    });

    return {
      success: true,
      message: "프로젝트가 성공적으로 등록되었습니다.",
      id: docRef.id,
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "프로젝트 등록에 실패하였습니다.",
    };
  }
};

/** project 모집 마감  */
export const doneProjectItem = async (id: string): Promise<ApiResMessage> => {
  if (!window.confirm("이대로 프로젝트를 모집을 마감 하시겠습니까?")) {
    return { success: false, message: "" };
  }

  try {
    const docRef = doc(db, "projects", id);
    await updateDoc(docRef, {
      status: RecruitmentStatus.completed,
    });

    return {
      success: true,
      message: "프로젝트가 정상적으로 마감 되었습니다.",
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "프로젝트가 마감되지 않았습니다.",
    };
  }
};

/** firebase projectsItem(게시글) 수정 */
export const updateProjectItem = async (): Promise<void> => {
  return;
};

/**
 *  프로젝트 지원하기
 * projects - applicants에 uid 넣기
 * user - appliedProjects에 projectID 넣기
 *
 *  프로젝트 좋아요
 * projects - likedUsers uid 넣기
 * user - likeProjects projectID 넣기
 */
const fleidMap = {
  apply: {
    projectField: "applicants",
    userField: "appliedProjects",
    successMessage: "지원이 완료되었습니다. 행운을 빌어요 🚀",
  },
  like: {
    projectField: "likedUsers",
    userField: "likeProjects",
    successMessage: "",
  },
};

export const updateApplyOrLike = async (
  uid: string,
  projectID: string,
  type: "apply" | "like"
): Promise<ApiResMessage> => {
  const projecstRef = doc(db, "projects", projectID);
  const usersRef = doc(db, "users", uid);

  const { projectField, userField, successMessage } = fleidMap[type];

  try {
    const updateProject = updateDoc(projecstRef, {
      [projectField]: arrayUnion(uid),
    });
    const updateUser = updateDoc(usersRef, {
      [userField]: arrayUnion(projectID),
    });

    await Promise.all([updateProject, updateUser]);

    return {
      success: true,
      message: successMessage,
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "실패하였습니다. 동작이 반복 될 시 관리자에게 문의 주세요.",
    };
  }
};

/**
 * 프로젝트 좋아요 취소
 * projects - likedUsers uid 빼기
 * user - likeProjects projectID 빼기
 */
export const updateUnLike = async (
  uid: string,
  projectID: string
): Promise<ApiResMessage> => {
  const projecstRef = doc(db, "projects", projectID);
  const usersRef = doc(db, "users", uid);

  try {
    const updateProject = updateDoc(projecstRef, {
      likedUsers: arrayRemove(uid),
    });
    const updateUser = updateDoc(usersRef, {
      likeProjects: arrayRemove(projectID),
    });

    await Promise.all([updateProject, updateUser]);

    return {
      success: true,
      message: "",
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "실패하였습니다. 동작이 반복 될 시 관리자에게 문의 주세요.",
    };
  }
};

export type UserProjectField = "likeProjects" | "appliedProjects";

export const removeProjectsFromUser = async (
  uid: string,
  type: UserProjectField,
  projectIds: string[]
): Promise<{ success: boolean; error?: string }> => {
  if (!uid || projectIds.length === 0) {
    return {
      success: false,
      error: "유저 ID 또는 삭제할 프로젝트가 없습니다.",
    };
  }
  try {
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, {
      [type]: arrayRemove(...projectIds),
    });
    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false, error: "파이어베이스 업데이트 실패" };
  }
};
