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
  doc,
  getDoc,
  where,
} from "firebase/firestore";

import { db } from "@shared/firebase/firebase";
import type { ProjectListRes } from "@shared/types/project";

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

/** firebase project item 상세 조회 */
export const getProjectItem = async (
  id: string
): Promise<ProjectListRes | null> => {
  try {
    const docRef = doc(db, "projects", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return null;
    }

    return docSnap.data() as ProjectListRes;
  } catch (err) {
    console.log(err);
    return null;
  }
};

/** 여러 id로 프로젝트 리스트 한 번에 가져오기 */
export const getProjectsByIds = async (
  ids: string[]
): Promise<ProjectListRes[]> => {
  if (ids.length === 0) return [];
  // 10개씩 쪼개서 여러 번 쿼리
  const chunks = [];
  for (let i = 0; i < ids.length; i += 10) {
    chunks.push(ids.slice(i, i + 10));
  }
  const results: ProjectListRes[] = [];
  for (const chunk of chunks) {
    const q = query(collection(db, "projects"), where("__name__", "in", chunk));
    const querySnapshot = await getDocs(q);
    results.push(
      ...querySnapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          }) as ProjectListRes
      )
    );
  }
  return results;
};
