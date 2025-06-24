import { Divider } from "@mui/material";
import type { JSX } from "react";

import { useGithubLogin } from "@features/auth/hooks/useGithubLogin";
import { useGoogleLogin } from "@features/auth/hooks/useGoogleLogin";
import { LoginTitle } from "@features/auth/ui/LoginTitle";
import { SignupGuide } from "@features/auth/ui/SignupGuide";
import { SocialLoginButton } from "@features/auth/ui/SocialLoginButton";

const LoginForm = (): JSX.Element => {
  const { googleLogin } = useGoogleLogin();
  const { githubLogin } = useGithubLogin();

  return (
    <>
      <LoginTitle />

      <SocialLoginButton
        label="Google로 로그인"
        logo="https://developers.google.com/identity/images/g-logo.png"
        onClick={googleLogin}
      />
      <SocialLoginButton
        label="GitHub로 로그인"
        logo="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
        onClick={githubLogin}
      />

      <Divider sx={{ mb: 3 }}>또는</Divider>

      <SignupGuide />
    </>
  );
};

export { LoginForm };
