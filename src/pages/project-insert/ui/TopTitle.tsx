import { Box, Typography } from "@mui/material";
import type { JSX } from "react";

const TopTitle = (): JSX.Element => {
  return (
    <Box py={4} textAlign="center">
      <Typography
        variant="h2"
        fontWeight={700}
        mb={1}
        sx={{
          background: "linear-gradient(135deg, #2563EB 0%, #1d4ed8 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        프로젝트, 함께 시작해요
      </Typography>
      <Typography variant="h6" color="text.secondary" fontWeight={400}>
        혼자서는 힘든 프로젝트도 팀과 함께라면 가능해요
        <br />
        프로젝트잼에서 완벽한 팀원을 찾아보세요
      </Typography>
    </Box>
  );
};

export default TopTitle;
