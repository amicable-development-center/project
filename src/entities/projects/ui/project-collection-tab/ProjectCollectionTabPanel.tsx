import { Box, styled } from "@mui/material";
import type { JSX } from "react";

import LikedProjectsList from "@entities/projects/ui/liked-projects/LikedProjectsList";

import type { ProjectListRes } from "@shared/types/project";

interface ProjectCollectionTabPanelProps {
  value: number;
  index: number;
  projects: ProjectListRes[];
  loading?: boolean;
  editMode?: boolean;
  selectedIds?: string[];
  onSelectProject?: (id: string) => void;
  children?: React.ReactNode;
}

const ProjectCollectionTabPanel = ({
  value,
  index,
  projects,
  loading = false,
  editMode = false,
  selectedIds = [],
  onSelectProject,
  children,
}: ProjectCollectionTabPanelProps): JSX.Element => {
  const isActive = value === index;

  if (!isActive) {
    return <></>;
  }
  // console.log("projects: ", projects);
  return (
    <TabPanelContainer
      role="tabpanel"
      id={`project-tabpanel-${index}`}
      aria-labelledby={`project-tab-${index}`}
    >
      {children || (
        <LikedProjectsList
          projects={projects}
          loading={loading}
          editMode={editMode}
          selectedIds={selectedIds}
          onSelectProject={onSelectProject}
        />
      )}
    </TabPanelContainer>
  );
};

export default ProjectCollectionTabPanel;

const TabPanelContainer = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(3),
  minHeight: "400px",
}));
