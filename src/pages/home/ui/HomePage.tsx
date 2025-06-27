import { Box, Container, styled } from "@mui/material";
import type { JSX } from "react";

import Hero from "@widgets/hero/ui/Hero";

import useGetProjects from "@entities/projects/hook/useGetProjects";
import ProjectCard from "@entities/projects/ui/projects-card/ProjectCard";
import ProjectsStats from "@entities/projects/ui/projects-stats/ProjectsStats";

const HomePage = (): JSX.Element => {
  const { data: projects } = useGetProjects({ pageSize: 3 });

  return (
    <MainContainer>
      <HeroContainer>
        <Hero />
      </HeroContainer>
      <ProjectStatsContainer>
        <ProjectsStats />
      </ProjectStatsContainer>
      <ProjectCardContainer>
        {projects?.projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
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
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "1.6rem",
  padding: "2rem 0rem",
  [theme.breakpoints.up("sm")]: {
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    padding: "4rem 2rem",
  },
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    padding: "6rem 2.4rem",
  },
}));
