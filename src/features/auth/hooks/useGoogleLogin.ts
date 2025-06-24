import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { auth, googleProvider } from "@shared/firebase/firebase";

const useGoogleLogin = (): { googleLogin: () => Promise<void> } => {
  const navigate = useNavigate();

  const googleLogin = async (): Promise<void> => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      console.log("Google 로그인 성공: ", user);
      navigate("/");
    } catch (error) {
      console.error("Google 로그인 실패: ", error);
    }
  };

  return { googleLogin };
};

export { useGoogleLogin };
