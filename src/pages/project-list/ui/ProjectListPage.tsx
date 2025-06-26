import { Box, Typography, Container, styled } from "@mui/material";
import { type JSX } from "react";

import ProjectCard from "@entities/projects/ui/projects-card/ProjectCard";
import useProjectListPage from "@entities/search/hooks/useProjectListPage";
import ProjectSearchForm from "@entities/search/ui/ProjectSearchForm";

import LoadingSpinner from "@shared/ui/loading-spinner/LoadingSpinner";
import Pagination from "@shared/ui/pagination";

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

  return (
    <MainContainer>
      <SearchContainer>
        <ProjectSearchForm onSearch={handleSearch} isLoading={isLoading} />
      </SearchContainer>

      {isLoading && (
        <LoadingContainer>
          <LoadingSpinner />
        </LoadingContainer>
      )}

      {!isLoading && (
        <ResultsContainer>
          <ResultsHeader variant="h6">
            📊 전체 프로젝트: 총 {totalCount}개{" "}
            {totalPages > 1 && `(${currentPage}/${totalPages} 페이지)`}
          </ResultsHeader>

          {projects.length > 0 ? (
            <>
              <ProjectListContainer>
                {projects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </ProjectListContainer>

              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  disabled={isLoading}
                />
              )}
            </>
          ) : (
            <EmptyState variant="body1">
              조건에 맞는 프로젝트가 없습니다. 다른 조건으로 검색해보세요.
            </EmptyState>
          )}
        </ResultsContainer>
      )}

      {isError && (
        <ErrorContainer>
          <ErrorText variant="body1">
            데이터를 불러오는 중 오류가 발생했습니다. 다시 시도해주세요.
          </ErrorText>
        </ErrorContainer>
      )}
    </MainContainer>
  );
};

export default ProjectListPage;

const MainContainer = styled(Container)(({ theme }) => ({
  flexGrow: 1,
  minHeight: "100vh",
  backgroundColor: theme.palette.background.default,
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

const LoadingContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "4rem 0rem",
  [theme.breakpoints.up("sm")]: {
    padding: "6rem 2rem",
  },
  [theme.breakpoints.up("md")]: {
    padding: "8rem 2.4rem",
  },
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

const ErrorText = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  color: theme.palette.error.main,
  fontWeight: 500,
}));
