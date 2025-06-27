import { Box, Typography, Container, styled, keyframes } from "@mui/material";
import { type JSX } from "react";

import ProjectCard from "@entities/projects/ui/projects-card/ProjectCard";
import useProjectSearch from "@entities/search/hooks/useProjectSearch";
import SearchForm from "@entities/search/ui/SearchForm";
import SearchListResultHandler from "@entities/search/ui/SearchListResultHandler";

import type { ProjectListRes } from "@shared/types/project";

const ProjectListPage = (): JSX.Element => {
  const {
    projects,
    totalCount,
    currentPage,
    totalPages,
    isLoading,
    isError,
    handleSearch,
    handlePageChange,
  } = useProjectSearch();

  const isEmpty = !isLoading && !isError && projects.length === 0;

  return (
    <MainContainer>
      <SearchContainer>
        <SearchForm onSearch={handleSearch} isLoading={isLoading} />
      </SearchContainer>

      <ResultsContainer>
        <ResultsHeader variant="h4">
          {isLoading ? "검색 중..." : `총 ${totalCount}개의 프로젝트가 있어요`}
        </ResultsHeader>

        <ProjectListContainer>
          {projects.map((project: ProjectListRes, index: number) => (
            <AnimatedProjectCard
              key={project.id}
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <ProjectCard project={project} />
            </AnimatedProjectCard>
          ))}
        </ProjectListContainer>

        <SearchListResultHandler
          isLoading={isLoading}
          isEmpty={isEmpty}
          isError={isError}
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </ResultsContainer>
    </MainContainer>
  );
};

export default ProjectListPage;

const MainContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  minHeight: "100vh",
  backgroundColor: theme.palette.background.default,
  paddingTop: "3rem",
}));

const SearchContainer = styled(Box)(({ theme }) => ({
  padding: "0rem 0rem 2rem",
  [theme.breakpoints.up("sm")]: {
    padding: "0rem 2rem 3rem",
  },
  [theme.breakpoints.up("md")]: {
    padding: "0rem 2.4rem 4rem",
  },
}));

const ResultsContainer = styled(Box)(({ theme }) => ({
  padding: "1rem 0rem",
  [theme.breakpoints.up("sm")]: {
    padding: "2rem 2rem",
  },
  [theme.breakpoints.up("md")]: {
    padding: "3rem 2.4rem",
  },
}));

const ResultsHeader = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  color: theme.palette.text.primary,
  marginBottom: "2rem",
}));

const ProjectListContainer = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
  gap: "1.6rem",
  [theme.breakpoints.up("sm")]: {
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
  },
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
  },
  [theme.breakpoints.up("lg")]: {
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
  },
}));

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const AnimatedProjectCard = styled(Box)(() => ({
  animation: `${fadeInUp} 0.6s ease-out forwards`,
  opacity: 0,
}));
