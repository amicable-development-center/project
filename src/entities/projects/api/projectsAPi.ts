import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  QueryDocumentSnapshot,
  startAfter,
  type DocumentData,
} from "firebase/firestore/lite";

import type { ProjectListRes } from "@entities/projects/types/projects";

import { db } from "@shared/firebase/firebase";

/** firebase project 목록 불러오기 */
export const getProjectList = async ({
  pageSize = 6,
  lastDoc = null,
}: {
  pageSize?: number;
  lastDoc?: QueryDocumentSnapshot<DocumentData> | null;
}): Promise<{
  projects: ProjectListRes[];
  lastVisible: QueryDocumentSnapshot<DocumentData> | null;
}> => {
  try {
    const baseQuery = query(
      collection(db, "projects"),
      orderBy("createdAt", "desc"),
      limit(pageSize)
    );
    const q = lastDoc ? query(baseQuery, startAfter(lastDoc)) : baseQuery;

    const querySnapshot = await getDocs(q);

    const projects = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as ProjectListRes[];

    return {
      projects: projects,
      lastVisible: querySnapshot.docs[querySnapshot.docs.length - 1] || null,
    };
  } catch (err) {
    console.log(err);
    return { projects: [], lastVisible: null };
  }
};
