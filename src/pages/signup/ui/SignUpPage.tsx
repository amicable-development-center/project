import { Box, Paper, styled, Typography } from "@mui/material";
import type { JSX } from "react";

import UserInfoForm from "@features/user/ui/UserInfoForm";

const SignUpPage = (): JSX.Element => {
  return (
    <PageContainer>
      <Typography variant="h4" mb={2}>
        회원가입
      </Typography>
      <Typography variant="body1" mb={3}>
        정보를 입력하고 새로운 여정을 시작해보세요! 🚀
      </Typography>
      <FormCard elevation={3}>
        <UserInfoForm />
      </FormCard>
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
