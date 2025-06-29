import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import GroupIcon from "@mui/icons-material/Group";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import { styled, Typography } from "@mui/material";
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
    <TextContainer>
      <Title variant="h2">{values.title}</Title>
      <OneLineInfo>{values.oneLineInfo}</OneLineInfo>
      <Description>{values.simpleInfo}</Description>
      <InfoContainer>
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
      </InfoContainer>
    </TextContainer>
  );
};

export default ProjectInfo;

const TextContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",
  marginTop: "1rem",
});

const Title = styled(Typography)({
  marginBottom: "0.5rem",
});

const Description = styled(Typography)({
  lineHeight: 1.7,
  fontSize: "1rem",
});

const OneLineInfo = styled("div")`
  font-size: 18px;
  color: #666;
  font-weight: 500;
`;

const InfoContainer = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(4, auto)",
  gap: "4rem",
  marginTop: "1rem",
  justifyContent: "flex-start",
  alignItems: "start",

  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "1rem",
  },

  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr",
    gap: "0.75rem",
  },
}));
