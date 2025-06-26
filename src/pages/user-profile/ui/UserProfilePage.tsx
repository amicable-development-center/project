import { Box, Container, Chip as MuiChip } from "@mui/material";
import { styled as muiStyled } from "@mui/material/styles";
import type { JSX } from "react";
import { useState, useEffect } from "react";

import { useUserProfile } from "@features/auth/hooks/useUserProfile";
import { removeProjectsFromUser } from "@features/projects/api/projectsApi";

import { useProjectsByIds } from "@entities/projects/hook/useProjectsByIds";
import UserProfileCard from "@entities/user/ui/user-profile/UserProfileCard";
import UserProfileHeader from "@entities/user/ui/user-profile/UserProfileHeader";
import UserProfileProjectList from "@entities/user/ui/user-profile/UserProfileProjectList";

import { useAuthStore } from "@shared/stores/authStore";
import { useProjectStore } from "@shared/stores/projectStore";
import LoadingSpinner from "@shared/ui/loading-spinner/LoadingSpinner";

// 탭 이름 상수 배열
const PROFILE_TABS = [
  { label: "관심있는 프로젝트", color: "primary" },
  { label: "지원한 프로젝트", color: "secondary" },
];

const UserProfilePage = (): JSX.Element => {
  const { user } = useAuthStore();
  const uid = user?.uid;
  const { data: userProfile } = useUserProfile(uid ?? "");

  // zustand store 사용
  const { setLikeProjects, setAppliedProjects } = useProjectStore();

  // 관심있는/지원한 프로젝트 id 배열
  const likeIds = userProfile?.likeProjects ?? [];
  const appliedIds = userProfile?.appliedProjects ?? [];

  // 프로젝트 데이터 가져오기
  const { data: likeProjectsData } = useProjectsByIds(likeIds);
  const { data: appliedProjectsData } = useProjectsByIds(appliedIds);

  // zustand store에 동기화
  useEffect(() => {
    if (likeProjectsData) setLikeProjects(likeProjectsData);
  }, [likeProjectsData, setLikeProjects]);
  useEffect(() => {
    if (appliedProjectsData) setAppliedProjects(appliedProjectsData);
  }, [appliedProjectsData, setAppliedProjects]);

  const [tab, setTab] = useState(0);
  const handleDeleteProjects = async (
    type: "likeProjects" | "appliedProjects",
    ids: string[]
  ): Promise<void> => {
    if (!user) return;
    await removeProjectsFromUser(user.uid, type, ids);
  };

  if (!userProfile) {
    return <LoadingSpinner />;
  }

  return (
    <MainContainer maxWidth="lg">
      <UserProfileHeader />
      <Box
        display="flex"
        gap={4}
        flexDirection={{ xs: "column", sm: "row" }}
        position="relative"
      >
        {/* 왼쪽 프로필 사이드바 */}
        <UserProfileCard
          userProfile={userProfile}
          PROFILE_TABS={PROFILE_TABS}
          tab={tab}
          setTab={setTab}
          ProfileTabChip={ProfileTabChip}
        />
        {/* 오른쪽 메인: 탭 + 프로젝트 카드 */}
        <UserProfileProjectList
          PROFILE_TABS={PROFILE_TABS}
          tab={tab}
          setTab={setTab}
          onDeleteProjects={handleDeleteProjects}
        />
      </Box>
    </MainContainer>
  );
};

export default UserProfilePage;

const MainContainer = muiStyled(Container)(({ theme }) => ({
  paddingBottom: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    paddingBottom: theme.spacing(4),
  },
  [theme.breakpoints.up("md")]: {
    paddingBottom: theme.spacing(6),
  },
  backgroundColor: theme.palette.background.default,
  minHeight: "100dvh",
}));

// 커스텀 Chip: 액티브일 때만 border, 글씨색 파란색, 배경은 그대로
const ProfileTabChip = muiStyled(MuiChip, {
  shouldForwardProp: (prop) => prop !== "active",
})<{
  active?: boolean;
}>(({ theme, active }) => ({
  borderColor: active ? theme.palette.primary.main : theme.palette.divider,
  color: active ? theme.palette.primary.main : theme.palette.text.secondary,
  backgroundColor: theme.palette.background.paper,
  fontWeight: 600,
  fontSize: "0.98rem",
  borderWidth: 1,
  borderStyle: "solid",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));
