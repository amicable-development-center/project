import { Timestamp } from "firebase/firestore";
import { useState } from "react";

import useProjectInsert from "@features/projects/queries/useProjectInsert";

import {
  ProjectCategory,
  RecruitmentStatus,
  Workflow,
  type ProjectItemInsertReq,
} from "@shared/types/project";
import { ExpectedPeriod } from "@shared/types/schedule";
import { UserExperience } from "@shared/types/user";

// 이하 InitData 개선 예정
type Setp1Type = Pick<
  ProjectItemInsertReq,
  "title" | "oneLineInfo" | "category" | "closedDate" | "simpleInfo"
>;
type Step2Type = Pick<
  ProjectItemInsertReq,
  "teamSize" | "expectedPeriod" | "techStack" | "positions"
>;

interface InsertFormResult {
  form: {
    step1: Setp1Type;
    step2: Step2Type;
  };
  page: {
    currentStep: number;
    goPrev: () => void;
    goNext: () => void;
  };
  submit: () => Promise<void>;
  onChange: {
    step2: (field: keyof Step2Type, value: any) => void;
  };
}

const useProjectInsertForm = (): InsertFormResult => {
  const { mutate: insertItem, isPending } = useProjectInsert();

  const [currentStep, setCurrentStep] = useState(1);
  // Step1 상태
  // const [formStep1, setFormStep1] = useState<Setp1Type>(initForm1);
  // Step2 상태
  const [formStep2, setFormStep2] = useState<Step2Type>({
    teamSize: 0,
    expectedPeriod: "",
    techStack: [],
    positions: [],
  });
  const handleChangeStep2 = (field: keyof Step2Type, value: any): void => {
    setFormStep2((prev) => ({ ...prev, [field]: value }));
  };

  const handlePrev = (): void => {
    setCurrentStep((prev) => prev - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleNext = (): void => {
    setCurrentStep((prev) => prev + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const submit = async (): Promise<void> => {
    if (!window.confirm("등록을 완료 하시겠습니까?")) return;
    if (isPending) return;
    // form 검사 추가 바람
    insertItem(TestData);
  };

  return {
    form: {
      step1: initForm1,
      step2: formStep2,
    },
    page: {
      currentStep: currentStep,
      goPrev: handlePrev,
      goNext: handleNext,
    },
    submit,
    onChange: {
      step2: handleChangeStep2,
    },
  };
};

export default useProjectInsertForm;

const initForm1 = {
  title: "",
  oneLineInfo: "",
  category: ProjectCategory.webDevelopment,
  closedDate: Timestamp.now(),
  simpleInfo: "",
};

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
