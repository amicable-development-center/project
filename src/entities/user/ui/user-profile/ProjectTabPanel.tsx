import { Box, styled } from "@mui/material";
import type { JSX } from "react";
import { useMemo } from "react";

import EmptyProjectCard from "@entities/user/ui/user-profile/EmptyProjectCard";

import { useLocalPagination } from "@shared/hooks/usePagination";
import { paginateArray } from "@shared/libs/utils/pagination";
import type { ProjectListRes } from "@shared/types/project";
import Pagination from "@shared/ui/pagination/Pagination";
import ProjectCard from "@shared/ui/ProjectCard";

interface ProjectTabPanelProps {
  projects: ProjectListRes[];
  emptyMessage: string;
  editMode?: boolean;
  selectedIds?: string[];
  onSelectProject?: (id: string) => void;
  itemsPerPage?: number;
}

const ProjectTabPanel = ({
  projects,
  emptyMessage,
  editMode = false,
  selectedIds = [],
  onSelectProject,
  itemsPerPage = 6,
}: ProjectTabPanelProps): JSX.Element => {
  const isEmpty = !projects.length;

  const pagination = useLocalPagination({
    totalCount: projects.length,
    perPage: itemsPerPage,
  });

  const paginatedProjects = useMemo(() => {
    return paginateArray(projects, pagination.currentPage, itemsPerPage);
  }, [projects, pagination.currentPage, itemsPerPage]);

  if (isEmpty) {
    return <EmptyProjectCard message={emptyMessage} />;
  }

  return (
    <Container>
      <StyledGridContainer>
        {paginatedProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            simple
            editMode={editMode}
            selected={selectedIds.includes(project.id)}
            onSelect={() => onSelectProject && onSelectProject(project.id)}
          />
        ))}
      </StyledGridContainer>

      {projects.length > itemsPerPage && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={pagination.setPage}
        />
      )}
    </Container>
  );
};

export default ProjectTabPanel;

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(3),
}));

const StyledGridContainer = styled(Box)(({ theme }) => ({
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
