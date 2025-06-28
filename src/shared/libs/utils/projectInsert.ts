import { Timestamp } from "firebase/firestore";

import {
  ProjectCategory,
  RecruitmentStatus,
  Workflow,
  type ProjectItemInsertReq,
} from "@shared/types/project";
import { ExpectedPeriod, NewSchedulePeriod } from "@shared/types/schedule";
import type { User } from "@shared/types/user";

export const projectOwnerData = (
  user: User
): {
  projectOwnerID: string;
  projectOwner: User;
} => ({
  projectOwnerID: user.id,
  projectOwner: {
    id: user.id,
    name: user.name,
    userRole: user.userRole,
    email: user.email,
    experience: user.experience,
    avatar: user.avatar,
    introduceMyself: user.introduceMyself,
  },
});

// 테스트용 form 입니다.
export const TestData = (user: User): ProjectItemInsertReq => ({
  projectOwnerID: user.id,
  projectOwner: {
    id: user.id,
    name: user.name,
    userRole: user.userRole,
    email: user.email,
    experience: user.experience,
    avatar: user.avatar,
    introduceMyself: user.introduceMyself,
  },
  applicants: [],
  status: RecruitmentStatus.recruiting,
  title: "AI 기반 음악 추천 서비스 개발",
  oneLineInfo: "AI로 사용자 취향을 분석하는 음악 추천 프로젝트입니다.",
  simpleInfo: "음악 취향 데이터를 기반으로 개인화 추천 시스템을 구현합니다.",
  techStack: ["React", "Node.js", "Python", "TensorFlow", "MongoDB"],
  teamSize: 5,
  expectedPeriod: ExpectedPeriod.threeMonths,
  description:
    "이 프로젝트는 사용자의 음악 청취 데이터를 수집하여, AI 알고리즘을 통해 개인화된 추천 서비스를 제공하는 웹 앱을 개발하는 것이 목표입니다.",
  workflow: Workflow.online,
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
      position: "frontend",
      count: 2,
      experience: ExpectedPeriod.oneMonth,
      applicants: [],
    },
    {
      position: "frontend",
      count: 5,
      experience: ExpectedPeriod.threeMonths,
      applicants: [],
    },
    {
      position: "frontend",
      count: 6,
      experience: ExpectedPeriod.fourMonths,
      applicants: [],
    },
  ],
  schedules: [
    {
      stageName: "기획",
      period: NewSchedulePeriod.oneWeek,
      description: "기획 단계",
    },
  ],
  likedUsers: [],
  category: ProjectCategory.webDevelopment,
  closedDate: Timestamp.now(),
});
