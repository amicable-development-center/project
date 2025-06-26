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
  // 10개씩 쪼개서 여러 번 쿼리 (Array.from 사용)
  const chunkCount = Math.ceil(ids.length / 10);
  const chunks = Array.from({ length: chunkCount }, (_, i) =>
    ids.slice(i * 10, (i + 1) * 10)
  );

  // 여러 쿼리를 병렬로 실행 (Promise.all 사용)
  const promises = chunks.map((chunk) => {
    const q = query(collection(db, "projects"), where("__name__", "in", chunk));
    return getDocs(q);
  });
  const snapshots = await Promise.all(promises);
  const results: ProjectListRes[] = snapshots.flatMap((querySnapshot) =>
    querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        }) as ProjectListRes
    )
  );
  return results;
};
