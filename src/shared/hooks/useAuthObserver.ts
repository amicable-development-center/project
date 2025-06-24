import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";

import { auth } from "@shared/firebase/firebase";
import { useAuthStore } from "@shared/stores/authStore";

export const useAuthObserver = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const setLoading = useAuthStore((state) => state.setLoading);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [setUser, setLoading]);
};
