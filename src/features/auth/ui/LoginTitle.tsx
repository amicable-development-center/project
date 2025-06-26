import { Typography } from "@mui/material";
import type { JSX } from "react";

const LoginTitle = (): JSX.Element => {
  return (
    <>
      <Typography variant="h5" fontWeight={700} mb={3}>
        로그인
      </Typography>
      <Typography variant="body2" mb={3} color="textSecondary">
        소셜 계정으로 간편하게 시작하세요 ✨
      </Typography>
    </>
  );
};

export { LoginTitle };
