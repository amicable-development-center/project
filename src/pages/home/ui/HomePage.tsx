import { Container, styled } from "@mui/material";
import type { JSX } from "react";

import Hero from "@widgets/hero/ui/Hero";

import ProjectStats from "@entities/project/ui/project-stats/ProjectStats";

const HomePage = (): JSX.Element => {
  console.log("API_KEY: ", import.meta.env.VITE_API_KEY);

  return (
    <MainContainer>
      <Hero />
      <ProjectStats />
    </MainContainer>
  );
};

export default HomePage;

const MainContainer = styled(Container)(({ theme }) => ({
  flexGrow: 1,
  minHeight: "100vh",
  backgroundColor: theme.palette.background.default,
}));
