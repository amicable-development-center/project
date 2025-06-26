import { Box, Tabs, Tab } from "@mui/material";
import type { JSX } from "react";

import type { ProjectListRes } from "@shared/types/project";
import ProjectCard from "@shared/ui/ProjectCard";

import EmptyProjectCard from "./EmptyProjectCard";

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
      {tab === 0 &&
        (likeProjects && likeProjects.length > 0 ? (
          <Box
            display="grid"
            gridTemplateColumns={{
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            }}
            gap={2}
          >
            {likeProjects.slice(0, 3).map((project) => (
              <ProjectCard key={project.id} project={project} simple />
            ))}
          </Box>
        ) : (
          <EmptyProjectCard message="아직 관심 프로젝트가 없습니다." />
        ))}
      {tab === 1 &&
        (appliedProjects && appliedProjects.length > 0 ? (
          <Box
            display="grid"
            gridTemplateColumns={{
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            }}
            gap={2}
          >
            {appliedProjects.slice(0, 3).map((project) => (
              <ProjectCard key={project.id} project={project} simple />
            ))}
          </Box>
        ) : (
          <EmptyProjectCard message="아직 지원한 프로젝트가 없습니다." />
        ))}
    </Box>
  );
};

export default UserProfileProjectList;
