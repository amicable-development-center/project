import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import { Box, styled, Typography } from "@mui/material";
import type { JSX } from "react";

import type { ProjectListRes } from "@entities/projects/types/projects";

import TitleWithIcon from "@shared/ui/project-detail/TitleWithIcon";

type ProjectScheduleType = Pick<ProjectListRes, "schedules">;

const ProjectSchedule = ({ schedules }: ProjectScheduleType): JSX.Element => {
  return (
    <>
      <TitleWithIcon Icon={RocketLaunchIcon} title="프로젝트 일정" />

      {schedules.map((item, i) => (
        <Box key={i} display="flex" alignItems="flex-start" marginTop={2}>
          <IndexBox>{i + 1}</IndexBox>
          <div>
            <Box display="flex" alignItems="center">
              <Typography variant="h5">{item.stageName}</Typography>
              <PeriodBox variant="body2" fontWeight={600}>
                {item.period}
              </PeriodBox>
            </Box>
            <Typography variant="body1" color="#858585">
              {item.description}
            </Typography>
          </div>
        </Box>
      ))}
    </>
  );
};

export default ProjectSchedule;

const IndexBox = styled(Typography)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.5rem;
  height: 3.5rem;
  margin-right: 2rem;
  color: ${({ theme }) => theme.palette.primary.main};
  background-color: #d7e4ff;
  border-radius: 50px;
`;
const PeriodBox = styled(Typography)`
  border: 1px solid #ededed;
  padding: 0.3rem 1rem;
  margin-left: 1rem;
  border-radius: 50px;
`;
