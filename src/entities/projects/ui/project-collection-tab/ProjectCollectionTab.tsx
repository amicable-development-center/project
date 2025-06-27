import { Tabs, Tab, Box } from "@mui/material";
import type { JSX } from "react";
import { useState } from "react";

import { ProjectCollectionTabType } from "@shared/types/project";

const PROJECT_COLLECTION_TABS = [
  {
    label: "관심있는 프로젝트",
    color: "primary",
    type: ProjectCollectionTabType.Likes,
  },
  {
    label: "지원한 프로젝트",
    color: "secondary",
    type: ProjectCollectionTabType.Applied,
  },
  {
    label: "만든 프로젝트",
    color: "success",
    type: ProjectCollectionTabType.Created,
  },
] as const;

interface ProjectCollectionTabProps {
  currentTab?: number;
  onTabChange?: (tabIndex: number) => void;
}

const ProjectCollectionTab = ({
  currentTab = 0,
  onTabChange,
}: ProjectCollectionTabProps): JSX.Element => {
  const [tab, setTab] = useState(currentTab);

  const handleTabChange = (newValue: number): void => {
    setTab(newValue);
    onTabChange?.(newValue);
  };

  return (
    <Box>
      <Tabs
        value={tab}
        onChange={(_, newValue) => handleTabChange(newValue)}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
        sx={{ whiteSpace: "nowrap" }}
      >
        {PROJECT_COLLECTION_TABS.map((tabInfo, index) => (
          <Tab
            key={tabInfo.label}
            label={
              <span style={{ whiteSpace: "nowrap" }}>{tabInfo.label}</span>
            }
            id={`project-tab-${index}`}
            aria-controls={`project-tabpanel-${index}`}
            sx={{ minWidth: 0, maxWidth: "none" }}
          />
        ))}
      </Tabs>
    </Box>
  );
};

export default ProjectCollectionTab;
export { PROJECT_COLLECTION_TABS };
