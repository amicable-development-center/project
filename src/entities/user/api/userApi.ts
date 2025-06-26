import { doc, setDoc, getDoc } from "firebase/firestore";

import { db } from "@shared/firebase/firebase";
import type { User } from "@shared/types/user";

export const saveUser = async (uid: string, userInfo: User): Promise<void> => {
  const userDoc = doc(db, "users", uid);
  await setDoc(userDoc, userInfo);
};

export const getUser = async (uid: string): Promise<User | null> => {
  const userDoc = doc(db, "users", uid);
  const userSnap = await getDoc(userDoc);
  if (userSnap.exists()) {
    return userSnap.data() as User;
  }
  return null;
};
