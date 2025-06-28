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
  deleteDoc,
  updateDoc,
  arrayRemove,
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

/** 여러 프로젝트를 완전히 삭제 (likes, applications, projects, users 컬렉션 모두) */
export const deleteProjectsEverywhere = async (
  projectIds: string[],
  userId: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    // 모든 삭제 작업을 병렬로 실행하기 위한 함수들

    // 좋아요 삭제 - 프로젝트 ID로 모든 좋아요 찾아서 삭제
    const deleteLikesForProject = async (
      projectId: string
    ): Promise<void[]> => {
      const likesSnap = await getDocs(
        query(collection(db, "likes"), where("projectId", "==", projectId))
      );
      return Promise.all(likesSnap.docs.map((doc) => deleteDoc(doc.ref)));
    };

    const deleteApplicationsForProject = async (
      projectId: string
    ): Promise<void[]> => {
      const appsSnap = await getDocs(
        query(
          collection(db, "applications"),
          where("projectId", "==", projectId)
        )
      );
      return Promise.all(appsSnap.docs.map((doc) => deleteDoc(doc.ref)));
    };

    const deleteProject = async (projectId: string): Promise<void> => {
      return deleteDoc(doc(db, "projects", projectId));
    };

    // 모든 작업을 병렬로 실행
    await Promise.all([
      // 1. likes 컬렉션에서 모든 프로젝트의 likes 삭제 (병렬)
      ...projectIds.map(deleteLikesForProject),

      // 2. applications 컬렉션에서 모든 프로젝트의 applications 삭제 (병렬)
      ...projectIds.map(deleteApplicationsForProject),

      // 3. projects 컬렉션에서 모든 프로젝트 삭제 (병렬)
      ...projectIds.map(deleteProject),

      // 4. users 컬렉션에서 myProjects, likeProjects, appliedProjects에서 제거
      updateDoc(doc(db, "users", userId), {
        myProjects: arrayRemove(...projectIds),
        likeProjects: arrayRemove(...projectIds),
        appliedProjects: arrayRemove(...projectIds),
      }),
    ]);

    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false, error: "프로젝트 완전 삭제 실패" };
  }
};
