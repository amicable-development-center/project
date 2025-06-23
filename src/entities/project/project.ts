import {
  addDoc,
  collection,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore/lite";

import { db } from "@shared/firebase/firebase";

export async function getComments(): Promise<null | {}> {
  const docRef = doc(db, "coments", "test");
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    console.log("No such document!");
    return null;
  }

  return docSnap.data();
}

export async function updateTitle(newTitle: string): Promise<void> {
  const docRef = doc(db, "coments", "test");
  await setDoc(docRef, { title: newTitle }, { merge: true });
  console.log("문서가 새로 작성되거나 덮어쓰기 됐어요.");
}

export async function addPost(title: string): Promise<string> {
  const postsRef = collection(db, "posts");
  const docRef = await addDoc(postsRef, {
    title,
  });
  return docRef.id;
}
