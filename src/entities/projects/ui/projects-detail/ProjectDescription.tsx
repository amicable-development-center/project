import AdjustIcon from "@mui/icons-material/Adjust";
import { Box, Typography } from "@mui/material";
import type { JSX } from "react";

import type { ProjectListRes } from "@shared/types/project";

type ProjectDescriptionType = Pick<ProjectListRes, "description">;

const ProjectDescription = ({
  description,
}: ProjectDescriptionType): JSX.Element => {
  return (
    <>
      <Box display={"flex"} alignItems={"center"} gap={1}>
        <AdjustIcon fontSize="large" color="primary" />
        <Typography variant="h3">프로젝트 상세</Typography>
      </Box>

      <Box marginY={2}>{description}</Box>
    </>
  );
};

export default ProjectDescription;
