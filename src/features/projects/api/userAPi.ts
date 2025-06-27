import { arrayUnion, doc, updateDoc } from "firebase/firestore";

import type { ApiResMessage } from "@entities/projects/types/firebase";

import { db } from "@shared/firebase/firebase";

/**
 * 내가 등록한 프로젝트 등록
 * users - myProjects에 ProjectID 넣기
 *  */
export const updateUserMyProject = async (
  uid: string,
  projectID: string
): Promise<ApiResMessage> => {
  const usersRef = doc(db, "users", uid);

  try {
    await updateDoc(usersRef, {
      myProjects: arrayUnion(projectID),
    });

    return {
      success: true,
      message: "",
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "profile update실패. 동작이 반복 될 시 관리자에게 문의 주세요.",
    };
  }
};
