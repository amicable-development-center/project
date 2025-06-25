import { Box } from "@mui/material";
import type { JSX } from "react";
import { useNavigate } from "react-router-dom";

const BackToHome = (): JSX.Element => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        mt: 2,
        color: "text.secondary",
      }}
      onClick={() => navigate("/")}
    >
      ← 홈으로 돌아가기
    </Box>
  );
};

export default BackToHome;
