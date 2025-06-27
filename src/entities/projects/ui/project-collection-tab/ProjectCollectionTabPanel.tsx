import { Box, styled } from "@mui/material";
import type { JSX } from "react";

import LikedProjectsList from "@entities/projects/ui/liked-projects/LikedProjectsList";
import EmptyProjectCard from "@entities/projects/ui/projects-card/EmptyProjectCard";

import type { ProjectListRes } from "@shared/types/project";
import { ProjectCollectionTabType } from "@shared/types/project";

interface ProjectCollectionTabPanelProps {
  value: ProjectCollectionTabType;
  index: ProjectCollectionTabType;
  projects: ProjectListRes[];
  loading?: boolean;
  editMode?: boolean;
  selectedIds?: string[];
  onSelectProject?: (id: string) => void;
  children?: React.ReactNode;
  type: ProjectCollectionTabType;
  itemsPerPage?: number;
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
  type,
  itemsPerPage,
}: ProjectCollectionTabPanelProps): JSX.Element => {
  const isActive = value === index;

  if (!isActive) {
    return <></>;
  }
  // console.log("projects: ", projects);
  if (projects.length === 0) {
    return <EmptyProjectCard type={type} />;
  }
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
          itemsPerPage={itemsPerPage}
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
