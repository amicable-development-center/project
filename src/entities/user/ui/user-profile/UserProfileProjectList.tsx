import { Box, Tabs, Tab } from "@mui/material";
import type { JSX } from "react";

import ProjectCard from "@shared/ui/ProjectCard";

interface UserProfileProjectListProps {
  PROFILE_TABS: { label: string; color: string }[];
  tab: number;
  setTab: (idx: number) => void;
  likeProjects: any[];
  appliedProjects: any[];
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
        <Box
          display="grid"
          gridTemplateColumns={{
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          }}
          gap={2}
        >
          {likeProjects?.slice(0, 3).map((project) => (
            <ProjectCard key={project.id} project={project} simple />
          ))}
        </Box>
      )}
      {tab === 1 && (
        <Box
          display="grid"
          gridTemplateColumns={{
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          }}
          gap={2}
        >
          {appliedProjects?.slice(0, 3).map((project) => (
            <ProjectCard key={project.id} project={project} simple />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default UserProfileProjectList;
