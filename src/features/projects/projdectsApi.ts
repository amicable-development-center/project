import { addDoc, collection, doc, setDoc } from "firebase/firestore/lite";

import type { ProjectItemInsertReq } from "@entities/projects/types/projects";

import { db } from "@shared/firebase/firebase";

/** firebase projects에 item 등록 */
export async function insertProjectItem(
  projectItem: ProjectItemInsertReq
): Promise<{ success: boolean; message: string; id?: string }> {
  try {
    const postsRef = collection(db, "projects");
    const docRef = await addDoc(postsRef, projectItem);

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
}

/** firebase projects에 item 수정 */
export async function updateProjectItem(): Promise<void> {
  return;
  const docRef = doc(db, "coments", "test");
  await setDoc(docRef, { title: "" }, { merge: true });
}
