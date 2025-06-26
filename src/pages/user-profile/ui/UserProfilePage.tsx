import { Box, Avatar, Typography, Paper, Container } from "@mui/material";
import type { JSX } from "react";

import { useUserProfile } from "@features/auth/hooks/useUserProfile";

import { useProjectsByIds } from "@entities/projects/hook/useProjectsByIds";
import ProjectCard from "@entities/projects/ui/projects-card/ProjectCard";

import { useAuthStore } from "@shared/stores/authStore";

const UserProfilePage = (): JSX.Element => {
  const { user } = useAuthStore();
  const uid = user?.uid;
  const { data: userProfile } = useUserProfile(uid ?? "");

  // 좋아요/지원한 프로젝트 id 배열
  const likeIds = userProfile?.likeProjects ?? [];
  const appliedIds = userProfile?.appliedProjects ?? [];

  // 프로젝트 데이터 가져오기
  const { data: likeProjects } = useProjectsByIds(likeIds);
  const { data: appliedProjects } = useProjectsByIds(appliedIds);
  console.log(likeProjects);
  console.log(appliedProjects);

  if (!userProfile) {
    return <div>UserProfilePage</div>;
  }

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: { xs: 2, sm: 4, md: 6 },
        backgroundColor: (theme) => theme.palette.background.default,
        height: "100dvh",
      }}
    >
      {/* 프로필 헤더 + 자기소개 */}
      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        gap={3}
        mb={3}
      >
        <Paper elevation={2} sx={{ p: 3, flex: 1 }}>
          <Box display="flex" alignItems="center" gap={3}>
            <Avatar src={userProfile.avatar} sx={{ width: 80, height: 80 }} />
            <Box>
              <Typography variant="h5" fontWeight={700}>
                {userProfile.name}
              </Typography>
              <Typography color="text.secondary">
                {userProfile.email}
              </Typography>
              <Typography>역할: {userProfile.userRole}</Typography>
              <Typography>경력: {userProfile.experience}</Typography>
            </Box>
          </Box>
        </Paper>
        <Paper elevation={1} sx={{ p: 2, flex: 1 }}>
          <Typography variant="subtitle1" fontWeight={600} mb={1}>
            자기소개
          </Typography>
          <Typography>{userProfile.introduceMyself}</Typography>
        </Paper>
      </Box>

      {/* 좋아요한 프로젝트 */}
      <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={4}>
        <Box flex={1}>
          <Typography variant="h6" mb={2}>
            좋아요한 프로젝트
          </Typography>
          <Box
            sx={{
              maxHeight: 580,
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 2,
              backgroundColor: (theme) => theme.palette.background.default,
              borderRadius: 2,
              p: 2,
            }}
          >
            {likeProjects?.map((project) => (
              <ProjectCard key={project.id} project={project} simple />
            ))}
          </Box>
        </Box>

        {/* 지원한 프로젝트 */}
        <Box flex={1}>
          <Typography variant="h6" mb={2}>
            지원한 프로젝트
          </Typography>
          <Box
            sx={{
              maxHeight: 580,
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 2,
              backgroundColor: (theme) => theme.palette.background.default,
              borderRadius: 2,
              p: 2,
            }}
          >
            {appliedProjects?.map((project) => (
              <ProjectCard key={project.id} project={project} simple />
            ))}
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default UserProfilePage;
