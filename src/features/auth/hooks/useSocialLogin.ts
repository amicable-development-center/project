import {
  signInWithPopup,
  fetchSignInMethodsForEmail,
  getAdditionalUserInfo,
} from "firebase/auth";
import type { AuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { auth } from "@shared/firebase/firebase";

export const useSocialLogin = (): {
  socialLogin: (provider: AuthProvider) => Promise<void>;
} => {
  const navigate = useNavigate();

  const socialLogin = async (provider: AuthProvider): Promise<void> => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      console.log("소셜 로그인 성공: ", user);

      // Firebase 신규 유저 여부 확인
      const additionalInfo = getAdditionalUserInfo(result);
      const isNewUser = additionalInfo?.isNewUser;

      if (isNewUser) {
        navigate("/signup");
      } else {
        navigate("/");
      }
    } catch (error: any) {
      console.error("소셜 로그인 실패: ", error);

      if (error.code !== "auth/account-exists-with-different-credential")
        return;

      const email = error.customData?.email;
      if (!email) {
        alert("이메일 정보를 가져올 수 없습니다.");
        return;
      }

      const methods = await fetchSignInMethodsForEmail(auth, email);
      if (methods.length === 0) {
        alert("이미 다른 로그인 방법으로 가입된 이메일입니다.");
        return;
      }

      if (methods.includes("google.com")) {
        alert(
          "이미 Google 계정으로 가입된 이메일입니다. Google 로그인을 이용해주세요."
        );
      } else {
        alert(`이미 가입된 로그인 방법: ${methods.join(", ")}`);
      }
    }
  };

  return { socialLogin };
};
