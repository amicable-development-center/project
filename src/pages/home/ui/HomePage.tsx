import { Container, styled } from "@mui/material";
import type { JSX } from "react";

import Hero from "@widgets/hero/ui/Hero";

import useProjectList from "@entities/projects/queries/useProjectList";
import ProjectsStats from "@entities/projects/ui/projects-stats/ProjectsStats";

const HomePage = (): JSX.Element => {
  const { data } = useProjectList();

  console.log(data);
  console.log("API_KEY: ", import.meta.env.VITE_API_KEY);

  return (
    <MainContainer>
      <Hero />
      <ProjectsStats />
    </MainContainer>
  );
};

export default HomePage;

const MainContainer = styled(Container)(({ theme }) => ({
  flexGrow: 1,
  minHeight: "100vh",
  backgroundColor: theme.palette.background.default,
}));
