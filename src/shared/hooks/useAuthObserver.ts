import { onAuthStateChanged, onIdTokenChanged } from "firebase/auth";
import { useEffect } from "react";

import { auth } from "@shared/firebase/firebase";
import { useAuthStore } from "@shared/stores/authStore";
import { useSnackbarStore } from "@shared/stores/snackbarStore";

export const useAuthObserver = (): void => {
  const setUser = useAuthStore((state) => state.setUser);
  const setLoading = useAuthStore((state) => state.setLoading);
  const { showError } = useSnackbarStore();

  useEffect(() => {
    // 인증 상태 변경 감지
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    // 토큰 변경 감지 (갱신, 만료 등)
    const unsubscribeToken = onIdTokenChanged(auth, async (user) => {
      if (user) {
        try {
          // 토큰이 갱신되면 새로운 토큰을 가져옴
          await user.getIdToken(true);
        } catch (error) {
          console.error("토큰 갱신 실패:", error);
          showError("인증이 만료되었습니다. 다시 로그인해주세요.");
          // 토큰 갱신 실패 시 로그아웃 처리
          await auth.signOut();
        }
      }
    });

    return () => {
      unsubscribeAuth();
      unsubscribeToken();
    };
  }, [setUser, setLoading, showError]);
};
