import { Divider } from "@mui/material";
import type { JSX } from "react";

import { useSocialLogin } from "@features/auth/hooks/useSocialLogin";
import { LoginTitle } from "@features/auth/ui/LoginTitle";
import { SignupGuide } from "@features/auth/ui/SignupGuide";
import { SocialLoginButton } from "@features/auth/ui/SocialLoginButton";

import { githubProvider, googleProvider } from "@shared/firebase/firebase";

const LoginForm = (): JSX.Element => {
  const { socialLogin } = useSocialLogin();

  return (
    <>
      <LoginTitle />

      <SocialLoginButton
        label="Google로 로그인"
        logo="https://developers.google.com/identity/images/g-logo.png"
        onClick={() => socialLogin(googleProvider)}
      />
      <SocialLoginButton
        label="GitHub로 로그인"
        logo="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
        onClick={() => socialLogin(githubProvider)}
      />

      <Divider sx={{ mb: 3 }}>또는</Divider>

      <SignupGuide />
    </>
  );
};

export { LoginForm };
