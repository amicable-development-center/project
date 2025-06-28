import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import { Card, CardContent, Stack, styled, Typography } from "@mui/material";
import type { JSX } from "react";

import { useCountUp } from "@shared/hooks/useCountUp";
import FadeInUpOnView from "@shared/ui/animations/FadeInUpOnView";

interface StatCardProps {
  stat: {
    id: string;
    title: string;
    value: number;
    icon: JSX.Element;
    color: string;
  };
  delay: number;
}

const StatCard = ({ stat, delay }: StatCardProps): JSX.Element => {
  const { count } = useCountUp({
    end: stat.value,
    duration: 1500,
    delay: delay * 1000,
  });

  return (
    <FadeInUpOnView delay={delay * 0.5}>
      <ProjectStatsCard>
        <CardContent>
          <ProjectStatsStack>
            <ProjectStatsIcon color={stat.color}>{stat.icon}</ProjectStatsIcon>
            <ProjectStatsCount variant="subtitle2">
              {`${count}+`}
            </ProjectStatsCount>
            <ProjectStatsTitle variant="body1">{stat.title}</ProjectStatsTitle>
          </ProjectStatsStack>
        </CardContent>
      </ProjectStatsCard>
    </FadeInUpOnView>
  );
};

const ProjectsStats = (): JSX.Element => {
  const mock = [
    {
      id: "a",
      title: "진행중인 프로젝트",
      value: 110,
      icon: <RocketLaunchIcon />,
      color: "#2563eb",
    },
    {
      id: "b",
      title: "활성 사용자",
      value: 360,
      icon: <PeopleAltIcon />,
      color: "#16a34a",
    },
    {
      id: "c",
      title: "완성된 프로젝트",
      value: 130,
      icon: <EmojiEventsIcon />,
      color: "#eab308",
    },
  ];

  return (
    <ProjectStatsContainer>
      {mock.map((stat, index) => (
        <StatCard key={stat.id} stat={stat} delay={index} />
      ))}
    </ProjectStatsContainer>
  );
};

export default ProjectsStats;

interface ProjectStatsIconProps {
  color: string;
}

const ProjectStatsContainer = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  gap: "3.2rem",
  alignItems: "stretch",
  width: "100%",
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr",
    gap: "2rem",
  },
}));

const ProjectStatsCard = styled(Card)(() => ({
  display: "flex",
  justifyContent: "center",
  flex: 1,
  width: "100%",
}));

const ProjectStatsIcon = styled("span")<ProjectStatsIconProps>(
  ({ theme, color }) => ({
    color: color,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "12px",
    padding: "1.2rem",
    backgroundColor: `${color}10`,

    "& svg": {
      fontSize: "3.2rem",
    },

    [theme.breakpoints.up("sm")]: {
      padding: "1.6rem",
      "& svg": {
        fontSize: "4.8rem",
      },
    },
  })
);

const ProjectStatsStack = styled(Stack)(() => ({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  gap: "0.8rem",
}));

const ProjectStatsCount = styled(Typography)(({ theme }) => ({
  fontSize: "2rem",
  fontWeight: "bold",

  [theme.breakpoints.up("sm")]: {
    fontSize: "3.2rem",
  },
}));

const ProjectStatsTitle = styled(Typography)(({ theme }) => ({
  fontSize: "1.4rem",

  [theme.breakpoints.up("sm")]: {
    fontSize: "1.6rem",
  },
}));
