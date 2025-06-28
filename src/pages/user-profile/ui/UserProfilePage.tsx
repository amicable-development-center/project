import { Box, Container, Chip as MuiChip } from "@mui/material";
import { styled as muiStyled } from "@mui/material/styles";
import { useQueryClient } from "@tanstack/react-query";
import type { JSX } from "react";
import { useState, useEffect, useCallback } from "react";

import { deleteProjectsEverywhere } from "@features/projects/api/projectsApi";

import { deleteApplication } from "@entities/projects/api/getProjectApplicationsApi";
import { deleteUserLikes } from "@entities/projects/api/getProjectLikeApi";
import { useProjectsByIds } from "@entities/projects/hooks/useProjectsByIds";
import { useGetMyAppliedProjectsWithDetails } from "@entities/projects/queries/useGetProjectApplications";
import { useGetMyLikedProjectsWithDetails } from "@entities/projects/queries/useGetProjectLike";
import ProjectCollectionContainer from "@entities/projects/ui/project-collection-tab/ProjectCollectionContainer";
import UserProfileCard from "@entities/user/ui/user-profile/UserProfileCard";
import UserProfileHeader from "@entities/user/ui/user-profile/UserProfileHeader";

import { useUserProfile } from "@shared/queries/useUserProfile";
import queryKeys from "@shared/react-query/queryKey";
import { useAuthStore } from "@shared/stores/authStore";
import { useLikeStore } from "@shared/stores/likeStore";
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

  // zustand store 사용
  const { setLikeProjects, setAppliedProjects } = useProjectStore();
  const { setLikedProjectIds, removeLikeProjects } = useLikeStore();
  const queryClient = useQueryClient();

  // 만든 프로젝트 id 배열
  const createdIds = userProfile?.myProjects ?? [];

  // 지원한 프로젝트 데이터 가져오기 (applications 컬렉션 기반)
  const { data: appliedProjectsData, isLoading: appliedProjectsLoading } =
    useGetMyAppliedProjectsWithDetails();
  // 만든 프로젝트는 기존대로 id 배열로 fetch
  const { data: createdProjectsData, isLoading: createdProjectsLoading } =
    useProjectsByIds(createdIds);

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

  const [tab, setTab] = useState<ProjectCollectionTabType>(
    ProjectCollectionTabType.Likes
  );

  // 프로젝트 삭제 핸들러
  const handleDeleteProjects = useCallback(
    async (type: ProjectCollectionTabType, ids: string[]) => {
      if (type === ProjectCollectionTabType.Likes && user) {
        await deleteUserLikes(user.uid, ids);
        removeLikeProjects(ids);
        await queryClient.invalidateQueries({
          queryKey: [queryKeys.myLikedProjects, "details"],
        });
      }
      if (type === ProjectCollectionTabType.Applied && user) {
        for (const projectId of ids) {
          await deleteApplication(user.uid, projectId);
        }
        await queryClient.invalidateQueries({
          queryKey: [queryKeys.myAppliedProjects, "details"],
        });
      }
      if (type === ProjectCollectionTabType.Created && user) {
        // 만든 프로젝트 완전 삭제
        const res = await deleteProjectsEverywhere(ids, user.uid);
        if (res.success) {
          // zustand store 동기화
          setAppliedProjects(
            appliedProjectsData
              ? appliedProjectsData.filter((p) => !ids.includes(p.id))
              : []
          );
          setLikeProjects(
            myLikedProjectsData
              ? myLikedProjectsData.filter((p) => !ids.includes(p.id))
              : []
          );
          // 쿼리 invalidate
          await queryClient.invalidateQueries({
            queryKey: [queryKeys.myLikedProjects, "details"],
          });
          await queryClient.invalidateQueries({
            queryKey: [queryKeys.myAppliedProjects, "details"],
          });
          await queryClient.invalidateQueries({
            queryKey: [queryKeys.projects],
          });
          await queryClient.invalidateQueries({
            queryKey: ["userProfile", user.uid],
          });
        } else {
          alert(res.error || "프로젝트 삭제에 실패했습니다.");
        }
      }
    },
    [
      user,
      removeLikeProjects,
      queryClient,
      setAppliedProjects,
      setLikeProjects,
      appliedProjectsData,
      myLikedProjectsData,
    ]
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
          appliedProjects={appliedProjectsData || []}
          createdProjects={createdProjectsData || []}
          loading={
            myLikedProjectsLoading ||
            appliedProjectsLoading ||
            createdProjectsLoading
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
