import { Box, Typography, styled } from "@mui/material";
import type { JSX } from "react";

import BackToHome from "@widgets/BackToHome/BackToHome";

import { LoginForm } from "@features/auth/ui/LoginForm";

import LogoBox from "@shared/ui/LogoBox";

const LoginPage = (): JSX.Element => {
  return (
    <PageWrapper>
      <LogoBox size="large" showText={true} />
      <Typography variant="body1" mb={6} color="textSecondary">
        함께 만들어가는 사이드 프로젝트
      </Typography>

      <LoginBox>
        <LoginForm />
      </LoginBox>
      <BackToHome />
    </PageWrapper>
  );
};

export default LoginPage;

const PageWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  backgroundColor: "#f5f7fb",
});

const LoginBox = styled(Box)({
  width: "100%",
  maxWidth: "400px",
  padding: "32px",
  borderRadius: "12px",
  backgroundColor: "#fff",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  textAlign: "center",
});
