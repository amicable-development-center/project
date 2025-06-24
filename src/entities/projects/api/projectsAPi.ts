import { collection, getDocs } from "firebase/firestore/lite";

import type { ProjectListRes } from "@entities/projects/types/projects";

import { db } from "@shared/firebase/firebase";

/** firebase project 목록 불러오기 */
export async function getProjectList(): Promise<ProjectListRes[]> {
  try {
    const listRef = collection(db, "projects");
    const querySnapshot = await getDocs(listRef);

    const posts = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return posts as ProjectListRes[];
  } catch (err) {
    console.log(err);
    return [];
  }
}
