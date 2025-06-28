import { Box, Container, Chip as MuiChip } from "@mui/material";
import { styled as muiStyled } from "@mui/material/styles";
import type { JSX } from "react";
import { useState, useEffect } from "react";

import { useDeleteProjectsMutation } from "@entities/projects/hooks/useDeleteProjectsMutation";
import { useGetMyAppliedProjectsWithDetails } from "@entities/projects/queries/useGetProjectApplications";
import {
  useGetMyLikedProjectsWithDetails,
  useGetMyCreatedProjectsWithDetails,
} from "@entities/projects/queries/useGetProjectLike";
import ProjectCollectionContainer from "@entities/projects/ui/project-collection-tab/ProjectCollectionContainer";
import UserProfileCard from "@entities/user/ui/user-profile/UserProfileCard";
import UserProfileHeader from "@entities/user/ui/user-profile/UserProfileHeader";

import { useUserProfile } from "@shared/queries/useUserProfile";
import { useAuthStore } from "@shared/stores/authStore";
import { useProjectStore } from "@shared/stores/projectStore";
import { ProjectCollectionTabType } from "@shared/types/project";
import LoadingSpinner from "@shared/ui/loading-spinner/LoadingSpinner";

import UserNotFound from "./UserNotFound";

// 탭 이름 상수 배열 (UserProfileCard용으로 유지)
const PROFILE_TABS = [
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
];

const UserProfilePage = (): JSX.Element => {
  const { user } = useAuthStore();
  const uid = user?.uid;
  const { data: userProfile, isLoading: userProfileLoading } = useUserProfile(
    uid ?? ""
  );

  // 지원한 프로젝트 데이터 가져오기 (applications 컬렉션 기반)
  const { data: appliedProjectsData, isLoading: appliedProjectsLoading } =
    useGetMyAppliedProjectsWithDetails();

  const { data: myLikedProjectsData, isLoading: myLikedProjectsLoading } =
    useGetMyLikedProjectsWithDetails();

  // 만든 프로젝트 데이터 가져오기 (userProfile.myProjects 기반)
  const { data: myCreatedProjectsData, isLoading: myCreatedProjectsLoading } =
    useGetMyCreatedProjectsWithDetails(userProfile?.myProjects);

  const [tab, setTab] = useState<ProjectCollectionTabType>(
    ProjectCollectionTabType.Likes
  );

  const deleteProjectsMutation = useDeleteProjectsMutation();

  // projectStore 동기화
  const { setAppliedProjects, setLikeProjects } = useProjectStore();

  // 지원한 프로젝트 데이터를 store에 동기화
  useEffect(() => {
    if (appliedProjectsData) {
      setAppliedProjects(appliedProjectsData);
    }
  }, [appliedProjectsData, setAppliedProjects]);

  // 좋아요한 프로젝트 데이터를 store에 동기화
  useEffect(() => {
    if (myLikedProjectsData) {
      setLikeProjects(myLikedProjectsData);
    }
  }, [myLikedProjectsData, setLikeProjects]);

  const handleDeleteProjects = async (
    type: ProjectCollectionTabType,
    ids: string[]
  ): Promise<void> => {
    await deleteProjectsMutation.mutateAsync({
      type,
      ids,
      user,
      appliedProjectsData,
      myLikedProjectsData,
    });
  };

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
          appliedProjects={appliedProjectsData || []}
          createdProjects={myCreatedProjectsData || []}
          loading={
            myLikedProjectsLoading ||
            appliedProjectsLoading ||
            myCreatedProjectsLoading
          }
          onDeleteProjects={handleDeleteProjects}
          currentTab={tab}
          onTabChange={setTab}
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
