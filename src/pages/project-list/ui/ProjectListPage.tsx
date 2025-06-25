import { Box, Typography, Container, styled } from "@mui/material";
import type { JSX } from "react";
import { useState } from "react";

import ProjectCard from "@entities/projects/ui/projects-card/ProjectCard";
import getFilteredProjectLists from "@entities/search/api/getFilteredProjectLists";
import type { ProjectSearchFilterOption } from "@entities/search/types";
import ProjectSearchForm from "@entities/search/ui/ProjectSearchForm";

import type { ProjectListRes } from "@shared/types/project";

const ProjectListPage = (): JSX.Element => {
  const [projects, setProjects] = useState<ProjectListRes[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (
    filter: ProjectSearchFilterOption
  ): Promise<void> => {
    setIsLoading(true);
    setHasSearched(true);

    try {
      console.log("🔍 검색 조건:", filter);

      const results = await getFilteredProjectLists("projects", filter);
      setProjects(results);

      console.log("✅ 검색 결과:", results);
    } catch (error) {
      console.error("❌ 검색 에러:", error);
      alert(`검색 실패: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainContainer>
      <SearchContainer>
        <ProjectSearchForm onSearch={handleSearch} isLoading={isLoading} />
      </SearchContainer>

      {hasSearched && (
        <ResultsContainer>
          <ResultsHeader variant="h6">
            📊 검색 결과: {projects.length}개
          </ResultsHeader>

          {projects.length > 0 ? (
            <ProjectListContainer>
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </ProjectListContainer>
          ) : (
            <EmptyState variant="body1">
              검색 결과가 없습니다. 다른 조건으로 검색해보세요.
            </EmptyState>
          )}
        </ResultsContainer>
      )}

      {!hasSearched && (
        <WelcomeContainer>
          <WelcomeText variant="body1">
            위의 검색 폼을 사용해서 프로젝트를 검색해보세요! 🔍
          </WelcomeText>
        </WelcomeContainer>
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

const WelcomeContainer = styled(Box)(({ theme }) => ({
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

const WelcomeText = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  color: theme.palette.text.secondary,
  fontWeight: 500,
}));
