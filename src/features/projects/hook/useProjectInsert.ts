import { insertProjectItem } from "@features/projects/api/projdectsApi";

import type { ProjectItemInsertReq } from "@entities/projects/types/projects";

const useProjectInsert = (): { submit: () => Promise<void> } => {
  const submit = async (): Promise<void> => {
    const res = await insertProjectItem(TestData);

    if (res.success) {
      alert(res.message);
    } else {
      alert(res.message);
    }
  };

  return { submit };
};

export default useProjectInsert;

// 테스트용 form 입니다.
const TestData: ProjectItemInsertReq = {
  userId: "user1234",
  userName: "홍길동",
  userRole: "frontend",
  avatar: "https://via.placeholder.com/150",
  applicants: [],
  status: "모집중",
  title: "AI 기반 음악 추천 서비스 개발",
  oneLineInfo: "AI로 사용자 취향을 분석하는 음악 추천 프로젝트입니다.",
  simpleInfo: "음악 취향 데이터를 기반으로 개인화 추천 시스템을 구현합니다.",
  techStack: ["React", "Node.js", "Python", "TensorFlow", "MongoDB"],
  teamSize: 5,
  expectedPeriod: "3개월",
  description:
    "이 프로젝트는 사용자의 음악 청취 데이터를 수집하여, AI 알고리즘을 통해 개인화된 추천 서비스를 제공하는 웹 앱을 개발하는 것이 목표입니다.",
  workflow: "온라인 협업 (Zoom, GitHub, Notion 사용)",
  requirements: [
    "주 2회 이상 정기 미팅 참석 가능",
    "기본적인 Git 사용 경험",
    "성실한 커뮤니케이션",
  ],
  preferentialTreatment: [
    "음악 도메인에 관심 있는 분",
    "TensorFlow 사용 경험",
    "UX/UI에 관심 있는 프론트엔드 개발자",
  ],
  positions: [
    {
      position: "Frontend Developer",
      count: 2,
      experience: "1년 이상",
    },
    {
      position: "Backend Developer",
      count: 1,
      experience: "3년 이상",
    },
    {
      position: "AI Engineer",
      count: 1,
      experience: "1년 이상",
    },
  ],
};
