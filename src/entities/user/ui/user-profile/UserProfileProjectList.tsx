import { Box, Tabs, Tab } from "@mui/material";
import type { JSX } from "react";

import ProjectTabPanel from "@entities/user/ui/user-profile/ProjectTabPanel";

import type { ProjectListRes } from "@shared/types/project";

interface UserProfileProjectListProps {
  PROFILE_TABS: { label: string; color: string }[];
  tab: number;
  setTab: (idx: number) => void;
  likeProjects: ProjectListRes[];
  appliedProjects: ProjectListRes[];
}

const UserProfileProjectList = ({
  PROFILE_TABS,
  tab,
  setTab,
  likeProjects,
  appliedProjects,
}: UserProfileProjectListProps): JSX.Element => {
  return (
    <Box flex={1}>
      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 3 }}>
        {PROFILE_TABS.map((tabInfo, _idx) => (
          <Tab key={tabInfo.label} label={tabInfo.label} />
        ))}
      </Tabs>
      {tab === 0 && (
        <ProjectTabPanel
          projects={likeProjects}
          emptyMessage="아직 관심 프로젝트가 없습니다."
        />
      )}
      {tab === 1 && (
        <ProjectTabPanel
          projects={appliedProjects}
          emptyMessage="아직 지원한 프로젝트가 없습니다."
        />
      )}
    </Box>
  );
};

export default UserProfileProjectList;
