import { Box, Container, styled } from "@mui/material";
import type { JSX } from "react";

import Hero from "@widgets/hero/ui/Hero";

import ProjectCard from "@entities/projects/ui/projects-card/ProjectCard";
import ProjectsStats from "@entities/projects/ui/projects-stats/ProjectsStats";

const HomePage = (): JSX.Element => {
  return (
    <MainContainer>
      <HeroContainer>
        <Hero />
      </HeroContainer>
      <ProjectStatsContainer>
        <ProjectsStats />
      </ProjectStatsContainer>
      <ProjectCardContainer>
        <ProjectCard />
      </ProjectCardContainer>
    </MainContainer>
  );
};

export default HomePage;

const MainContainer = styled(Container)(({ theme }) => ({
  flexGrow: 1,
  minHeight: "100vh",
  backgroundColor: theme.palette.background.default,
}));

const HeroContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: theme.palette.background.default,
  padding: "2rem 0rem",
  [theme.breakpoints.up("sm")]: {
    padding: "4rem 2rem",
  },
  [theme.breakpoints.up("md")]: {
    padding: "6rem 2.4rem",
  },
}));

const ProjectStatsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "3.2rem",
  justifyContent: "center",
  padding: "2rem 0rem",
  [theme.breakpoints.up("sm")]: {
    flexDirection: "row",
    padding: "4rem 2rem",
  },
  [theme.breakpoints.up("md")]: {
    padding: "6rem 2.4rem",
  },
}));

const ProjectCardContainer = styled(Box)(({ theme }) => ({
  padding: "2rem 0rem",
  [theme.breakpoints.up("sm")]: {
    flexDirection: "row",
    padding: "4rem 2rem",
  },
  [theme.breakpoints.up("md")]: {
    padding: "6rem 2.4rem",
  },
}));
