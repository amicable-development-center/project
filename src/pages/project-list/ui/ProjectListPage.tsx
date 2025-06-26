import { Box, Typography, Container, styled, keyframes } from "@mui/material";
import { type JSX } from "react";

import ProjectCard from "@entities/projects/ui/projects-card/ProjectCard";
import useProjectListPage from "@entities/search/hooks/useProjectListPage";
import SearchForm from "@entities/search/ui/SearchForm";

import LoadingSpinner from "@shared/ui/loading-spinner/LoadingSpinner";
import Pagination from "@shared/ui/pagination/Pagination";

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
  } = useProjectListPage();

  const renderLoadingState = (): JSX.Element => {
    return (
      <LoadingContainer>
        <LoadingSpinner size={60} />
        <Typography variant="h6" color="text.secondary" mt={2}>
          프로젝트를 불러오는 중...
        </Typography>
      </LoadingContainer>
    );
  };

  return (
    <MainContainer>
      <SearchContainer>
        <SearchForm onSearch={handleSearch} isLoading={isLoading} />
      </SearchContainer>

      <ResultsContainer>
        <ResultsHeader variant="h4">
          {isLoading
            ? "검색 중..."
            : `총 ${totalCount}개의 프로젝트를 찾았습니다`}
        </ResultsHeader>

        {isLoading ? (
          renderLoadingState()
        ) : (
          <ProjectListContainer>
            {projects.map((project, index) => (
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
        )}

        {!isLoading && !isError && projects.length === 0 && (
          <EmptyState variant="h6">
            검색 조건에 맞는 프로젝트가 없습니다. 다른 조건으로 검색해보세요.
          </EmptyState>
        )}

        {isError && (
          <ErrorContainer>
            <Typography variant="h6" color="error">
              프로젝트를 불러오는 중 오류가 발생했습니다.
            </Typography>
          </ErrorContainer>
        )}

        {!isError && totalPages > 0 && (
          <Box display="flex" justifyContent="center" mt={4}>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </Box>
        )}
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

const EmptyState = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  color: theme.palette.text.secondary,
  padding: "4rem 0",
  fontWeight: 500,
}));

const ErrorContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "4rem 0rem",
  [theme.breakpoints.up("sm")]: {
    padding: "6rem 2rem",
  },
}));

const LoadingContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "4rem 0rem",
  minHeight: "400px",
  [theme.breakpoints.up("sm")]: {
    padding: "6rem 2rem",
  },
}));

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
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
