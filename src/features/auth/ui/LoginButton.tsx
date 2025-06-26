import { Button } from "@mui/material";
import type { JSX } from "react";
import { useNavigate } from "react-router-dom";

const LoginButton = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <Button variant="outlined" onClick={() => navigate("/login")}>
      로그인
    </Button>
  );
};

export default LoginButton;
