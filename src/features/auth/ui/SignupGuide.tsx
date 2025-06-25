import { Typography } from "@mui/material";
import type { JSX } from "react";
import { useNavigate } from "react-router-dom";

const SignupGuide = (): JSX.Element => {
  const navigate = useNavigate();

  const handleNavigateToJoin = (): void => {
    navigate("/join"); // 신규 회원가입 유도 페이지로 이동
  };

  return (
    <Typography variant="body2" color="textSecondary">
      계정이 없으신가요?{" "}
      <Typography
        component="span"
        color="primary"
        sx={{ cursor: "pointer", fontWeight: 600 }}
        onClick={handleNavigateToJoin} // 클릭 시 이동
      >
        회원가입하기 →
      </Typography>
    </Typography>
  );
};

export { SignupGuide };
