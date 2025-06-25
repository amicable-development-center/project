import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { Box, Typography } from "@mui/material";
import type { JSX } from "react";

import type { ProjectListRes } from "@entities/projects/types/projects";

type ProjectRequirementsType = Pick<ProjectListRes, "requirements">;

const ProjectRequirements = ({
  requirements,
}: ProjectRequirementsType): JSX.Element => {
  return (
    <>
      <Box display="flex" alignItems="center" gap={1} marginBottom={2}>
        <TaskAltIcon fontSize="large" color="primary" />
        <Typography variant="h3">지원 요구사항</Typography>
      </Box>

      {requirements.map((item, i) => (
        <Box key={i} display="flex" alignItems="center" marginTop={1} gap={1}>
          <TaskAltIcon fontSize="large" color="success" />
          <Box fontSize={18} color="#2b2b2b">
            {item}
          </Box>
        </Box>
      ))}
    </>
  );
};

export default ProjectRequirements;
