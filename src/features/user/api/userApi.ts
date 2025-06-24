import { doc, setDoc } from "firebase/firestore";

import { db } from "@shared/firebase/firebase";
import type { User } from "@shared/user/types/user";

export const saveUser = async (uid: string, userInfo: User): Promise<void> => {
  const userDoc = doc(db, "users", uid);
  await setDoc(userDoc, userInfo);
};
