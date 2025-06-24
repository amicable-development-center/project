import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import { Card, CardContent, Stack, styled, Typography } from "@mui/material";
import type { JSX } from "react";

const ProjectsStats = (): JSX.Element => {
  const mock = [
    {
      id: "a",
      title: "진행중인 프로젝트",
      value: 110,
      icon: <RocketLaunchIcon sx={{ fontSize: "4.8rem" }} />,
      color: "#2563eb",
    },
    {
      id: "b",
      title: "활성 사용자",
      value: 120,
      icon: <PeopleAltIcon sx={{ fontSize: "4.8rem" }} />,
      color: "#16a34a",
    },
    {
      id: "c",
      title: "완성된 프로젝트",
      value: 130,
      icon: <EmojiEventsIcon sx={{ fontSize: "4.8rem" }} />,
      color: "#eab308",
    },
  ];

  return (
    <>
      {mock.map((stat) => {
        return (
          <ProjectStatsCard key={stat.id}>
            <CardContent>
              <ProjectStatsStack>
                <ProjectStatsIcon color={stat.color}>
                  {stat.icon}
                </ProjectStatsIcon>
                <ProjectStatsCount variant="subtitle2">
                  {`${stat.value}+`}
                </ProjectStatsCount>
                <ProjectStatsTitle variant="body1">
                  {stat.title}
                </ProjectStatsTitle>
              </ProjectStatsStack>
            </CardContent>
          </ProjectStatsCard>
        );
      })}
    </>
  );
};

export default ProjectsStats;

interface ProjectStatsIconProps {
  color: string;
}

const ProjectStatsCard = styled(Card)(() => ({
  flex: 1,
}));

const ProjectStatsIcon = styled("span")<ProjectStatsIconProps>(({ color }) => ({
  color: color,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "12px",
  padding: "1.6rem",
  backgroundColor: `${color}10`,
}));

const ProjectStatsStack = styled(Stack)(() => ({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  gap: "0.8rem",
}));

const ProjectStatsCount = styled(Typography)(() => ({
  fontSize: "2.4rem",
  fontWeight: "bold",
}));

const ProjectStatsTitle = styled(Typography)(() => ({
  fontSize: "1.6rem",
}));
