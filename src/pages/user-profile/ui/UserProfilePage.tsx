import { Box, Container, Chip as MuiChip } from "@mui/material";
import { styled as muiStyled } from "@mui/material/styles";
import type { JSX } from "react";
import { useState, useEffect, useCallback } from "react";

import { useUserProfile } from "@features/auth/hooks/useUserProfile";

import { useProjectsByIds } from "@entities/projects/hook/useProjectsByIds";
import { useGetMyLikedProjectsWithDetails } from "@entities/projects/queries/useGetProjectLike";
import ProjectCollectionContainer from "@entities/projects/ui/project-collection-tab/ProjectCollectionContainer";
import UserProfileCard from "@entities/user/ui/user-profile/UserProfileCard";
import UserProfileHeader from "@entities/user/ui/user-profile/UserProfileHeader";

import { useUserProfile } from "@shared/queries/useUserProfile";
import { useAuthStore } from "@shared/stores/authStore";
import { useLikeStore } from "@shared/stores/likeStore";
import { useProjectStore } from "@shared/stores/projectStore";
import LoadingSpinner from "@shared/ui/loading-spinner/LoadingSpinner";

import UserNotFound from "./UserNotFound";

// 탭 이름 상수 배열 (UserProfileCard용으로 유지)
const PROFILE_TABS = [
  { label: "관심있는 프로젝트", color: "primary" },
  { label: "지원한 프로젝트", color: "secondary" },
];

const UserProfilePage = (): JSX.Element => {
  const { user } = useAuthStore();
  const uid = user?.uid;
  const { data: userProfile, isLoading: userProfileLoading } = useUserProfile(
    uid ?? ""
  );

  // zustand store 사용
  const { setLikeProjects, setAppliedProjects } = useProjectStore();
  const { setLikedProjectIds } = useLikeStore();

  // 관심있는/지원한 프로젝트 id 배열
  const appliedIds = userProfile?.appliedProjects ?? [];

  // 프로젝트 데이터 가져오기
  const { data: appliedProjectsData, isLoading: appliedProjectsLoading } =
    useProjectsByIds(appliedIds);

  const { data: myLikedProjectsData, isLoading: myLikedProjectsLoading } =
    useGetMyLikedProjectsWithDetails();
  // zustand store에 동기화
  useEffect(() => {
    if (myLikedProjectsData) {
      setLikeProjects(myLikedProjectsData);
      // 좋아요 프로젝트 ID들도 likeStore에 동기화
      const likedIds = myLikedProjectsData.map((project) => project.id);
      setLikedProjectIds(likedIds);
    }
  }, [myLikedProjectsData, setLikeProjects, setLikedProjectIds]);
  useEffect(() => {
    if (appliedProjectsData) setAppliedProjects(appliedProjectsData);
  }, [appliedProjectsData, setAppliedProjects]);

  const [tab, setTab] = useState(0);

  // 프로젝트 삭제 핸들러
  const handleDeleteProjects = useCallback(
    async (type: "liked" | "applied" | "created", ids: string[]) => {
      // TODO: 실제 삭제 API 호출
      console.log(`Deleting ${type} projects:`, ids);

      // 임시로 store에서 제거
      if (type === "liked") {
        // removeLikeProjects 호출 또는 API 후 refetch
      } else if (type === "applied") {
        // removeAppliedProjects 호출 또는 API 후 refetch
      }
    },
    []
  );

  // 사용자 프로필이 로딩 중이거나 없으면 early return
  if (userProfileLoading) {
    return <LoadingSpinner />;
  }
  if (!userProfile) {
    return <UserNotFound />;
  }

  return (
    <MainContainer maxWidth="lg">
      <UserProfileHeader />
      <Box
        display="flex"
        gap={4}
        flexDirection={{ xs: "column", sm: "row" }}
        position="relative"
        alignItems="flex-start"
      >
        {/* 왼쪽 프로필 사이드바 */}
        <UserProfileCard
          userProfile={userProfile}
          PROFILE_TABS={PROFILE_TABS}
          tab={tab}
          setTab={setTab}
          ProfileTabChip={ProfileTabChip}
        />

        {/* 오른쪽 메인: 프로젝트 컬렉션 탭 */}
        <ProjectCollectionContainer
          likedProjects={myLikedProjectsData || []}
          appliedProjects={appliedProjectsData || []} // TODO: 지원한 프로젝트 데이터 추가
          createdProjects={[]} // TODO: 만든 프로젝트 데이터 추가
          loading={myLikedProjectsLoading || appliedProjectsLoading}
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
