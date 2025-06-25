import { Box, Typography, Container, styled, Card } from "@mui/material";
import type { JSX } from "react";
import { useState } from "react";

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
                <ProjectItem key={project.id}>
                  <ProjectTitle variant="h6">{project.title}</ProjectTitle>
                  <ProjectMeta variant="body2">
                    {project.category} | {project.status} | {project.workflow}
                  </ProjectMeta>
                  <ProjectDescription variant="body2">
                    {project.oneLineInfo}
                  </ProjectDescription>
                </ProjectItem>
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

const ProjectListContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "1.6rem",
}));

const ProjectItem = styled(Card)(({ theme }) => ({
  padding: "2rem",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 0,
  backgroundColor: theme.palette.background.paper,
  transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
  cursor: "pointer",

  "&:hover": {
    backgroundColor: theme.palette.background.default,
    borderColor: theme.palette.primary.light,
    transform: "translateY(-2px)",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  },

  [theme.breakpoints.up("sm")]: {
    borderRadius: 0,
  },
  [theme.breakpoints.up("md")]: {
    borderRadius: 0,
  },
}));

const ProjectTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  color: theme.palette.text.primary,
  marginBottom: "0.8rem",
}));

const ProjectMeta = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginBottom: "1rem",
  fontWeight: 500,
}));

const ProjectDescription = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  lineHeight: 1.6,
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
