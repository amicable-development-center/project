import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
  deleteDoc,
} from "firebase/firestore";

import type { ApiResMessage } from "@entities/projects/types/firebase";
import type { ProjectItemInsertReq } from "@entities/projects/types/projects";

import { db } from "@shared/firebase/firebase";

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

/** firebase projectsItem 삭제 */
export const deleteProjectItem = async (id: string): Promise<ApiResMessage> => {
  if (!window.confirm("정말로 삭제하시겠습니까?")) {
    return { success: false, message: "" };
  }

  try {
    const docRef = doc(db, "projects", id);
    await deleteDoc(docRef);

    return {
      success: true,
      message: "프로젝트를 정상적으로 삭제하였습니다.",
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "프로젝트 삭제에 실패하였습니다.",
    };
  }
};

/** firebase projectsItem 수정 */
export const updateProjectItem = async (): Promise<void> => {
  return;
  const docRef = doc(db, "coments", "test");
  await setDoc(docRef, { title: "" }, { merge: true });
};
