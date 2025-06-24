import { signInWithPopup, fetchSignInMethodsForEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { auth, githubProvider } from "@shared/firebase/firebase";

const useGithubLogin = () => {
  const navigate = useNavigate();

  const githubLogin = async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider);
      const user = result.user;

      console.log("GitHub 로그인 성공: ", user);
      navigate("/");
    } catch (error: any) {
      console.error("GitHub 로그인 실패: ", error);

      if (error.code === "auth/account-exists-with-different-credential") {
        const email = error.customData?.email;

        if (email) {
          const methods = await fetchSignInMethodsForEmail(auth, email);
          console.warn("이미 가입된 로그인 방법:", methods);

          if (methods.length > 0) {
            if (methods.includes("google.com")) {
              alert(
                "이미 Google 계정으로 가입된 이메일입니다. Google 로그인을 이용해주세요."
              );
            } else {
              alert(`이미 가입된 로그인 방법: ${methods.join(", ")}`);
            }
          } else {
            alert(
              "이미 다른 로그인 방법으로 가입된 이메일입니다. 다른 로그인 방법을 사용해주세요."
            );
          }
        } else {
          alert(
            "이미 다른 로그인 방법으로 가입된 계정입니다. 이메일 정보를 가져올 수 없습니다."
          );
        }
      }
    }
  };

  return { githubLogin };
};

export { useGithubLogin };
