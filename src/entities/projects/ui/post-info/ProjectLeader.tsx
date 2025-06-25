import FreeBreakfastIcon from "@mui/icons-material/FreeBreakfast";
import { Box, Typography } from "@mui/material";
import type { JSX } from "react";

const ProjectLeader = (): JSX.Element => {
  return (
    <>
      <Box display={"flex"} alignItems={"center"} gap={1}>
        <FreeBreakfastIcon fontSize="large" color="primary" />
        <Typography variant="h3">프로젝트 상세</Typography>
      </Box>
    </>
  );
};

export default ProjectLeader;
