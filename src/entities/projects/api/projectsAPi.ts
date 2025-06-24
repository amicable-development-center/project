import {
  getCountFromServer,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  QueryDocumentSnapshot,
  startAfter,
  type DocumentData,
} from "firebase/firestore";

import type { ProjectListRes } from "@entities/projects/types/projects";

import { db } from "@shared/firebase/firebase";

/** projects의 total 수 */
export const getProjectsTotalCount = async (): Promise<number> => {
  try {
    const q = query(collection(db, "projects"));
    const querySnapshot = await getCountFromServer(q);
    return querySnapshot.data().count;
  } catch (err) {
    console.log(err);
    return 0;
  }
};

/** firebase project 목록 불러오기 */
export const getProjectList = async ({
  pageSize = 6,
  lastDoc = null,
}: {
  pageSize?: number;
  lastDoc: QueryDocumentSnapshot<DocumentData> | null;
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
