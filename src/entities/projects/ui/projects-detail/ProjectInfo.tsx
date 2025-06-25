import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import GroupIcon from "@mui/icons-material/Group";
import ShareIcon from "@mui/icons-material/Share";
import { Box, styled, Typography } from "@mui/material";
import type { JSX } from "react";

import type { ProjectListRes } from "@entities/projects/types/projects";

import {
  formatDate,
  getStatusClassname,
} from "@shared/libs/utils/projectDetail";

type ProjectInfoType = Pick<
  ProjectListRes,
  | "title"
  | "status"
  | "teamSize"
  | "workflow"
  | "simpleInfo"
  | "closedDate"
  | "oneLineInfo"
  | "expectedPeriod"
>;

const ProjectInfo = ({
  values,
}: {
  values: ProjectInfoType | null;
}): JSX.Element | null => {
  if (!values) return null;

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <StatusBox className={getStatusClassname(values.status)}>
          {values.status}
        </StatusBox>

        <Box display="flex">
          <HeadIconBox>
            <FavoriteBorderIcon />
          </HeadIconBox>
          <HeadIconBox>
            <ShareIcon />
          </HeadIconBox>
        </Box>
      </Box>

      <Typography variant="h2">{values.title}</Typography>
      <OneLineInfo>{values.oneLineInfo}</OneLineInfo>
      <Typography>{values.simpleInfo}</Typography>

      <InfoBox>
        <Box display="flex" alignItems="center" flex={1}>
          <GroupIcon fontSize="large" color="primary" />
          <div>
            <Typography variant="body2" color="gray">
              팀 규모
            </Typography>
            <Typography variant="h6">{values.teamSize}명</Typography>
          </div>
        </Box>
        <Box display="flex" alignItems="center" flex={1}>
          <GroupIcon fontSize="large" color="primary" />
          <div>
            <Typography variant="body2" color="gray">
              예상 기간
            </Typography>
            <Typography variant="h6">{values.expectedPeriod}</Typography>
          </div>
        </Box>
        <Box display="flex" alignItems="center" flex={1}>
          <GroupIcon fontSize="large" color="primary" />
          <div>
            <Typography color="gray">모집 마감</Typography>
            <Typography variant="h6">
              {formatDate(values.closedDate)}
            </Typography>
          </div>
        </Box>
        <Box display="flex" alignItems="center" flex={1}>
          <GroupIcon fontSize="large" color="primary" />
          <div>
            <Typography color="gray">진행 방식</Typography>
            <Typography variant="h6">{values.workflow}</Typography>
          </div>
        </Box>
      </InfoBox>
    </>
  );
};

export default ProjectInfo;

const HeadIconBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.5rem;
  height: 3rem;
  padding: 0.5rem 1rem;
  margin-left: 10px;
  border: 1px solid #dddddd;
  border-radius: 4px;
  transition: background-color 0.3s;
  cursor: pointer;

  &:hover {
    background-color: #f4f4f4;
  }
`;

const StatusBox = styled("div")`
  padding: 0.5rem 1.2rem;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.025em;
  color: white;
  border-radius: 50px;

  &.ing {
    background-color: black;
  }
  &.done {
    background-color: ${({ theme }) => theme.palette.primary.main};
  }
`;

const OneLineInfo = styled("div")`
  margin: 1rem 0 1.5rem 0;
  font-size: 18px;
`;

const InfoBox = styled(Box)`
  display: flex;
  align-items: flex-start;
  margin-top: 2rem;
  svg {
    margin-right: 1rem;
  }
`;
