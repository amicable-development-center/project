import { Tabs, Tab, Box, styled, useMediaQuery, useTheme } from "@mui/material";
import type { JSX } from "react";

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
  currentTab: ProjectCollectionTabType;
  onTabChange: (tab: ProjectCollectionTabType) => void;
}

const ProjectCollectionTab = ({
  currentTab,
  onTabChange,
}: ProjectCollectionTabProps): JSX.Element => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // enum <-> index 매핑
  const tabIndex = PROJECT_COLLECTION_TABS.findIndex(
    (tab) => tab.type === currentTab
  );
  const handleTabChange = (_: any, newIndex: number): void => {
    const newTab = PROJECT_COLLECTION_TABS[newIndex].type;
    onTabChange(newTab);
  };

  return (
    <TabContainer isMobile={isMobile}>
      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
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
    </TabContainer>
  );
};

export default ProjectCollectionTab;
export { PROJECT_COLLECTION_TABS };

const TabContainer = styled(Box)<{ isMobile: boolean }>(({ isMobile }) => ({
  display: "flex",
  justifyContent: isMobile ? "space-around" : "flex-start",
  width: "100%",
}));
