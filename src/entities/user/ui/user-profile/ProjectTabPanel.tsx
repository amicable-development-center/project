import { Box, styled } from "@mui/material";
import type { JSX } from "react";

import type { ProjectListRes } from "@shared/types/project";
import ProjectCard from "@shared/ui/ProjectCard";

import EmptyProjectCard from "./EmptyProjectCard";

interface ProjectTabPanelProps {
  projects: ProjectListRes[];
  emptyMessage: string;
}

const ProjectTabPanel = ({
  projects,
  emptyMessage,
}: ProjectTabPanelProps): JSX.Element =>
  projects && projects.length > 0 ? (
    <StyledGridContainer>
      {projects.slice(0, 3).map((project) => (
        <ProjectCard key={project.id} project={project} simple />
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
