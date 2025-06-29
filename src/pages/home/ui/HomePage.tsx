import { Box, Container, styled, Typography } from "@mui/material";
import type { JSX } from "react";

import Hero from "@widgets/hero/ui/Hero";
import HowToStartTitle from "@widgets/hero/ui/HowToStartTitle";

import useGetProjects from "@entities/projects/hooks/useGetProjects";
import ProjectCard from "@entities/projects/ui/projects-card/ProjectCard";
import HowToStart from "@entities/projects/ui/projects-stats/HowToStart";
import LetsGo from "@entities/projects/ui/projects-stats/LetsGoBox";
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
        <SectionTitleContainer>
          <FadeInUpOnView delay={0.2}>
            <SectionTitle variant="h2">새로 올라온 프로젝트</SectionTitle>
          </FadeInUpOnView>
          <FadeInUpOnView delay={0.4}>
            <SectionSubtitle variant="h6">
              따끈따끈한 신규 프로젝트들을 만나보세요
            </SectionSubtitle>
          </FadeInUpOnView>
        </SectionTitleContainer>

        <ProjectCardContainer>
          {projects?.projects.map((project, index) => (
            <FadeInUpOnView key={project.id} delay={index + 1}>
              <ProjectCard project={project} />
            </FadeInUpOnView>
          ))}
        </ProjectCardContainer>
      </ProjectSectionContainer>

      <HeroContainer>
        <HowToStartTitle />
        <HowToStart />
      </HeroContainer>

      <ProjectStatsContainer>
        <LetsGo />
      </ProjectStatsContainer>
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

const SectionTitleContainer = styled(Box)(({ theme }) => ({
  textAlign: "center",
  marginBottom: theme.spacing(5),
  position: "relative",
  "&::after": {
    content: '""',
    display: "block",
    width: "80px",
    height: "3px",
    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
    margin: "16px auto 0",
    borderRadius: "2px",
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: "2.5rem",
  fontWeight: 700,
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 50%, ${theme.palette.primary.dark} 100%)`,
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  marginBottom: theme.spacing(1),
  letterSpacing: "-0.02em",
  [theme.breakpoints.down("md")]: {
    fontSize: "2rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.75rem",
  },
}));

const SectionSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: "1.1rem",
  fontWeight: 400,
  color: theme.palette.text.secondary,
  opacity: 0.8,
  lineHeight: 1.6,
  [theme.breakpoints.down("sm")]: {
    fontSize: "1rem",
  },
}));
