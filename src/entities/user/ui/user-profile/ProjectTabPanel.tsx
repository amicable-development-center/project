import { Box, styled } from "@mui/material";
import type { JSX } from "react";

import type { ProjectListRes } from "@shared/types/project";
import ProjectCard from "@shared/ui/ProjectCard";

import EmptyProjectCard from "./EmptyProjectCard";

interface ProjectTabPanelProps {
  projects: ProjectListRes[];
  emptyMessage: string;
  editMode?: boolean;
  selectedIds?: string[];
  onSelectProject?: (id: string) => void;
}

const ProjectTabPanel = ({
  projects,
  emptyMessage,
  editMode = false,
  selectedIds = [],
  onSelectProject,
}: ProjectTabPanelProps): JSX.Element =>
  projects && projects.length > 0 ? (
    <StyledGridContainer>
      {projects.map((project) => (
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
  ) : (
    <EmptyProjectCard message={emptyMessage} />
  );

export default ProjectTabPanel;

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
