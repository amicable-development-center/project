import { signInWithPopup, fetchSignInMethodsForEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { auth, githubProvider } from "@shared/firebase/firebase";

// ✅ 반환 타입 명시
const useGithubLogin = (): { githubLogin: () => Promise<void> } => {
  const navigate = useNavigate();

  // ✅ 함수 타입 명시
  const githubLogin = async (): Promise<void> => {
    try {
      const result = await signInWithPopup(auth, githubProvider);
      const user = result.user;

      console.log("GitHub 로그인 성공: ", user);
      navigate("/");
    } catch (error: any) {
      console.error("GitHub 로그인 실패: ", error);

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
        alert("이미 Google 계정으로 가입된 이메일입니다.");
      } else {
        alert(`이미 가입된 로그인 방법: ${methods.join(", ")}`);
      }
    }
  };

  return { githubLogin };
};

export { useGithubLogin };
