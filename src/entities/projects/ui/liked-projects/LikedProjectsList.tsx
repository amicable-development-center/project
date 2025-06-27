import { Box, styled, Typography } from "@mui/material";
import type { JSX } from "react";

import LikedProjectsEmpty from "@entities/projects/ui/liked-projects/LikedProjectsEmpty";

import { useArrayPagination } from "@shared/hooks/usePagination";
import { scrollToTopSafe } from "@shared/libs/utils/scrollUtils";
import type { ProjectListRes } from "@shared/types/project";
import LoadingSpinner from "@shared/ui/loading-spinner/LoadingSpinner";
import Pagination from "@shared/ui/pagination/Pagination";
import ProjectCard from "@shared/ui/ProjectCard";

interface LikedProjectsListProps {
  projects: ProjectListRes[];
  loading?: boolean;
  itemsPerPage?: number;
  editMode?: boolean;
  selectedIds?: string[];
  onSelectProject?: (id: string) => void;
}

const LikedProjectsList = ({
  projects,
  loading = false,
  itemsPerPage = 6,
  editMode = false,
  selectedIds = [],
  onSelectProject,
}: LikedProjectsListProps): JSX.Element => {
  const {
    currentPage,
    totalPages,
    paginatedData: paginatedProjects,
    isEmpty,
    setPage,
  } = useArrayPagination({
    data: projects,
    itemsPerPage,
  });

  // 페이지네이션 시 스크롤 처리
  const handlePageChange = (page: number): void => {
    setPage(page);
    scrollToTopSafe();
  };

  if (loading) {
    return (
      <Container>
        <LoadingSpinner />
        <Typography>좋아요한 프로젝트를 불러오는 중...</Typography>
      </Container>
    );
  }

  if (isEmpty) {
    return <LikedProjectsEmpty />;
  }

  return (
    <Container>
      <ProjectGrid>
        {paginatedProjects.map((project, index) => (
          <ProjectCard
            key={`${project.id}-${index}`}
            project={project}
            simple
            editMode={editMode}
            selected={selectedIds.includes(project.id)}
            onSelect={() => onSelectProject && onSelectProject(project.id)}
          />
        ))}
      </ProjectGrid>

      {projects.length > itemsPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </Container>
  );
};

export default LikedProjectsList;

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(3),
}));

const ProjectGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    gridTemplateColumns: "repeat(2, 1fr)",
  },
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "repeat(3, 1fr)",
  },
}));
