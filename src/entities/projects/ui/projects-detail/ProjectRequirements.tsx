import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { Box, styled, Typography } from "@mui/material";
import type { JSX } from "react";

import type { ProjectListRes } from "@entities/projects/types/projects";

import TitleWithIcon from "@shared/ui/project-detail/TitleWithIcon";

type ProjectRequirementsType = Pick<
  ProjectListRes,
  "requirements" | "preferentialTreatment"
>;

const ProjectRequirements = ({
  requirements,
  preferentialTreatment,
}: ProjectRequirementsType): JSX.Element => {
  return (
    <>
      <TitleWithIcon Icon={TaskAltIcon} title="지원 요구사항" />

      {requirements.map((content, i) => (
        <Box key={i} display="flex" alignItems="center" marginTop={1} gap={1}>
          <TaskAltIcon fontSize="large" color="success" />
          <Box fontSize={18} color="#2b2b2b">
            {content}
          </Box>
        </Box>
      ))}

      <Box height={"1px"} marginY={2} bgcolor="#ededed" />

      <Typography variant="h6">우대사항</Typography>
      <Box display="flex" flexWrap="wrap">
        {preferentialTreatment.map((content, i) => (
          <PeriodBox key={i} variant="body2" fontWeight={600}>
            {content}
          </PeriodBox>
        ))}
      </Box>
    </>
  );
};

export default ProjectRequirements;

const PeriodBox = styled(Typography)`
  border: 1px solid #dddddd;
  padding: 0.3rem 1rem;
  margin: 1rem 1rem 0 0;
  border-radius: 50px;
`;
