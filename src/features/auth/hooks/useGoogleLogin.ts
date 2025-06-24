import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { auth, googleProvider } from "@shared/firebase/firebase";

const useGoogleLogin = () => {
  const navigate = useNavigate();

  const googleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      console.log("Google 로그인 성공: ", user);

      // TODO: 필요 시 Firestore에 유저 정보 저장

      navigate("/"); // 로그인 성공 시 메인 페이지로 이동
    } catch (error) {
      console.error("Google 로그인 실패: ", error);
    }
  };

  return { googleLogin };
};

export { useGoogleLogin };
