import {
  Box,
  styled,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import type { JSX } from "react";

import LikedProjectsEmpty from "@entities/projects/ui/liked-projects/LikedProjectsEmpty";
import ProjectCard from "@entities/projects/ui/profile-page-projects-card/ProjectCard";

import { useArrayPagination } from "@shared/hooks/usePagination";
import type { ProjectListRes } from "@shared/types/project";
import LoadingSpinner from "@shared/ui/loading-spinner/LoadingSpinner";
import Pagination from "@shared/ui/pagination/Pagination";

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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
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
      <ProjectGrid isMobile={isMobile}>
        {paginatedProjects.map((project, index) => (
          <ProjectCard
            key={`${project.id}-${index}`}
            project={project}
            simple
            editMode={editMode}
            selected={selectedIds.includes(project.id)}
            onSelect={() => onSelectProject && onSelectProject(project.id)}
            applicantsCount={(project as any).applicantsCount}
          />
        ))}
      </ProjectGrid>

      {projects.length > itemsPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setPage}
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
  width: "100%",
}));

const ProjectGrid = styled(Box)<{ isMobile: boolean }>(
  ({ theme, isMobile }) => ({
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: theme.spacing(2),
    ...(isMobile && {
      justifyItems: "center",
      maxWidth: "100%",
    }),
    [theme.breakpoints.up("sm")]: {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
    [theme.breakpoints.up("md")]: {
      gridTemplateColumns: "repeat(3, 1fr)",
    },
  })
);
