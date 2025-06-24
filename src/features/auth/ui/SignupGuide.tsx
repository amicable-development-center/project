import { Typography } from "@mui/material";
import type { JSX } from "react";

const SignupGuide = (): JSX.Element => {
  return (
    <Typography variant="body2" color="textSecondary">
      계정이 없으신가요?{" "}
      <Typography
        component="span"
        color="primary"
        sx={{ cursor: "pointer", fontWeight: 600 }}
      >
        회원가입하기 →
      </Typography>
    </Typography>
  );
};

export { SignupGuide };
