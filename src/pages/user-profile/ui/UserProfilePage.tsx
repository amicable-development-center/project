import type { JSX } from "react";

import { useUserProfile } from "@features/auth/hooks/useUserProfile";

import { useProjectsByIds } from "@entities/projects/hook/useProjectsByIds";

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
    <div>
      <h2>이름: {userProfile.name}</h2>
      <img src={userProfile.avatar} alt="프로필 이미지" />
      <p>역할: {userProfile.userRole}</p>
      <p>경력: {userProfile.experience}</p>
      <p>자기소개: {userProfile.introduceMyself}</p>

      <h2>좋아요한 프로젝트</h2>
      {likeProjects?.map((project) => (
        <div key={project.id}>{project.title}</div>
      ))}

      <h2>지원한 프로젝트</h2>
      {appliedProjects?.map((project) => (
        <div key={project.id}>{project.title}</div>
      ))}
    </div>
  );
};

export default UserProfilePage;
