import GroupIcon from "@mui/icons-material/Group";
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
      <Head>
        <StatusBox className={getStatusClassname(values.status)}>
          {values.status}
        </StatusBox>

        <Box display={"flex"}>
          <div>좋아요</div>
          <div>공유</div>
        </Box>
      </Head>

      <Typography variant="h1">{values.title}</Typography>
      <OneLineInfo>{values.oneLineInfo}</OneLineInfo>
      <Typography>{values.simpleInfo}</Typography>

      <InfoBox>
        <Box display={"flex"} alignItems={"center"} flex={1}>
          <GroupIcon fontSize="large" color="primary" />
          <div>
            <div>팀 규모</div>
            <Typography variant="h6">{values.teamSize}</Typography>
          </div>
        </Box>
        <Box display={"flex"} alignItems={"center"} flex={1}>
          <GroupIcon fontSize="large" color="primary" />
          <div>
            <div>예상 기간</div>
            <Typography variant="h6">{values.expectedPeriod}</Typography>
          </div>
        </Box>
        <Box display={"flex"} alignItems={"center"} flex={1}>
          <GroupIcon fontSize="large" color="primary" />
          <div>
            <div>모집 마감</div>
            <Typography variant="h6">
              {formatDate(values.closedDate)}
            </Typography>
          </div>
        </Box>
        <Box display={"flex"} alignItems={"center"} flex={1}>
          <GroupIcon fontSize="large" color="primary" />
          <div>
            <div>진행 방식</div>
            <Typography variant="h6">{values.workflow}</Typography>
          </div>
        </Box>
      </InfoBox>
    </>
  );
};

export default ProjectInfo;

const Head = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
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
