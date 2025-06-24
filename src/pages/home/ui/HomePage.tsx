import { Box, Container, styled } from "@mui/material";
import type { JSX } from "react";

import Hero from "@widgets/hero/ui/Hero";

import useProjectList from "@entities/projects/queries/useProjectList";
import ProjectCard from "@entities/projects/ui/projects-card/ProjectCard";
import ProjectsStats from "@entities/projects/ui/projects-stats/ProjectsStats";

const HomePage = (): JSX.Element => {
  const { data } = useProjectList();

  console.log(data);
  console.log("API_KEY: ", import.meta.env.VITE_API_KEY);

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
  "@media (min-width:600px)": {
    padding: "4rem 2rem",
  },
  "@media (min-width:960px)": {
    padding: "6rem 2.4rem",
  },
}));

const ProjectStatsContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "3.2rem",
  justifyContent: "center",
  padding: "2rem 0rem",
  "@media (min-width:600px)": {
    flexDirection: "row",
    padding: "4rem 2rem",
  },
  "@media (min-width:960px)": {
    padding: "6rem 2.4rem",
  },
}));

const ProjectCardContainer = styled(Box)(() => ({
  padding: "2rem 0rem",
  "@media (min-width:600px)": {
    flexDirection: "row",
    padding: "4rem 2rem",
  },
  "@media (min-width:960px)": {
    padding: "6rem 2.4rem",
  },
}));
