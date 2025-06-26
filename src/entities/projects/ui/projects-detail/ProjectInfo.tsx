import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import GroupIcon from "@mui/icons-material/Group";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import { Box, styled, Typography } from "@mui/material";
import type { JSX } from "react";

import { formatDate } from "@shared/libs/utils/projectDetail";
import type { ProjectListRes } from "@shared/types/project";
import InfoWithIcon from "@shared/ui/project-detail/InfoWithIcon";

type ProjectInfoType = Pick<
  ProjectListRes,
  | "title"
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
      <Typography variant="h2">{values.title}</Typography>
      <OneLineInfo>{values.oneLineInfo}</OneLineInfo>
      <Typography>{values.simpleInfo}</Typography>

      <Box display="flex" marginTop={2} gap={1}>
        <InfoWithIcon
          item="팀 규모"
          Icon={GroupIcon}
          content={`${values.teamSize}명`}
        />
        <InfoWithIcon
          item="예상 기간"
          Icon={AccessTimeOutlinedIcon}
          content={values.expectedPeriod}
        />
        <InfoWithIcon
          item="모집 마감"
          Icon={CalendarTodayOutlinedIcon}
          content={formatDate(values.closedDate)}
        />
        <InfoWithIcon
          item="진행 방식"
          Icon={RoomOutlinedIcon}
          content={values.workflow}
        />
      </Box>
    </>
  );
};

export default ProjectInfo;

const OneLineInfo = styled("div")`
  margin: 1rem 0 1.5rem 0;
  font-size: 18px;
`;
