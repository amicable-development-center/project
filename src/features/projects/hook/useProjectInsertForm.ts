import { Timestamp } from "firebase/firestore";

import useProjectInsert from "@features/projects/queries/useProjectInsert";

import {
  ProjectCategory,
  RecruitmentStatus,
  Workflow,
  type ProjectItemInsertReq,
} from "@shared/types/project";
import { ExpectedPeriod } from "@shared/types/schedule";
import { UserExperience } from "@shared/types/user";

const useProjectInsertForm = (): { submit: () => Promise<void> } => {
  const { mutate: insertItem, isPending } = useProjectInsert();

  const submit = async (): Promise<void> => {
    if (isPending) return;
    // form 검사 추가 바람
    insertItem(TestData);
  };

  return { submit };
};

export default useProjectInsertForm;

// 테스트용 form 입니다.
const TestData: ProjectItemInsertReq = {
  projectOwner: {
    id: "user1234",
    name: "홍길동",
    userRole: "frontend",
    email: "test@test.com",
    experience: UserExperience.junior,
    avatar: "https://via.placeholder.com/150",
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
      period: ExpectedPeriod.oneMonth,
      description: "기획 단계",
    },
  ],
  likedUsers: [],
  category: ProjectCategory.webDevelopment,
  closedDate: Timestamp.now(),
};
