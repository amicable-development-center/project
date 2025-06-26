import { Box } from "@mui/material";
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
    <Box
      display="grid"
      gridTemplateColumns={{
        xs: "1fr",
        sm: "repeat(2, 1fr)",
        md: "repeat(3, 1fr)",
      }}
      gap={2}
    >
      {projects.slice(0, 3).map((project) => (
        <ProjectCard key={project.id} project={project} simple />
      ))}
    </Box>
  ) : (
    <EmptyProjectCard message={emptyMessage} />
  );

export default ProjectTabPanel;
