import { Box, Paper, styled, Typography } from "@mui/material";
import type { JSX } from "react";
import { useEffect, useState } from "react";
import { useLocation, Navigate } from "react-router-dom";

import BackToHome from "@widgets/BackToHome/BackToHome";

import UserInfoForm from "@entities/user/ui/UserInfoForm";

import { useSnackbarStore } from "@shared/stores/snackbarStore";
import LogoBox from "@shared/ui/LogoBox";

const SignUpPage = (): JSX.Element => {
  const location = useLocation();
  const fromSocial = location.state?.fromSocial;
  const showError = useSnackbarStore((s) => s.showError);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    if (!fromSocial) {
      showError("잘못된 접근입니다.");
      const timer = setTimeout(() => setShouldRedirect(true), 800);
      return () => clearTimeout(timer);
    }
  }, [fromSocial, showError]);

  if (!fromSocial && shouldRedirect) {
    return <Navigate to="/" replace />;
  }

  if (!fromSocial) {
    return <></>;
  }

  return (
    <PageContainer>
      <LogoBox size="large" text="회원가입" />
      <Typography variant="body1" mb={3}>
        정보를 입력하고 새로운 여정을 시작해보세요! 🚀
      </Typography>
      <FormCard elevation={3}>
        <UserInfoForm />
      </FormCard>
      <BackToHome />
    </PageContainer>
  );
};

export default SignUpPage;

const PageContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  backgroundColor: "#f5f5f5",
});

const FormCard = styled(Paper)({
  padding: "32px",
  width: "400px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});
