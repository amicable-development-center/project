import { Box, Container, styled } from "@mui/material";
import type { JSX } from "react";

import Hero from "@widgets/hero/ui/Hero";

import useGetProjects from "@entities/projects/hooks/useGetProjects";
import ProjectCard from "@entities/projects/ui/projects-card/ProjectCard";
import ProjectsStats from "@entities/projects/ui/projects-stats/ProjectsStats";

import FadeInUpOnView from "@shared/ui/animations/FadeInUpOnView";

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

      <ProjectSectionContainer>
        <ProjectCardContainer>
          {projects?.projects.map((project, index) => (
            <FadeInUpOnView key={project.id} delay={index + 1}>
              <ProjectCard project={project} />
            </FadeInUpOnView>
          ))}
        </ProjectCardContainer>
      </ProjectSectionContainer>
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
  padding: "2rem 0",
  [theme.breakpoints.up("sm")]: {
    padding: "4rem 0",
  },
  [theme.breakpoints.up("md")]: {
    padding: "6rem 0",
  },
}));

const ProjectStatsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "100%",
  padding: "2rem 0",
  [theme.breakpoints.up("sm")]: {
    padding: "4rem 0",
  },
  [theme.breakpoints.up("md")]: {
    padding: "6rem 0",
  },
}));

const ProjectCardContainer = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr",
  gridAutoRows: "1fr",
  gap: "1.6rem",
  alignItems: "stretch",

  [theme.breakpoints.up("sm")]: {
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  },

  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
  },

  "& > div": {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
  },
}));

const ProjectSectionContainer = styled(Box)(({ theme }) => ({
  padding: "2rem 0",
  [theme.breakpoints.up("sm")]: {
    padding: "4rem 0",
  },
  [theme.breakpoints.up("md")]: {
    padding: "6rem 0",
  },
}));
