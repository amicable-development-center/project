import { Timestamp } from "firebase/firestore";
import { useState } from "react";

import useProjectInsert from "@features/projects/queries/useProjectInsert";

import { useUserProfile } from "@shared/queries/useUserProfile";
import { useAuthStore } from "@shared/stores/authStore";
import {
  ProjectCategory,
  RecruitmentStatus,
  Workflow,
  type ProjectItemInsertReq,
} from "@shared/types/project";
import { ExpectedPeriod } from "@shared/types/schedule";
import { type User } from "@shared/types/user";

// 이하 InitData 개선 예정
type Setp1Type = Pick<
  ProjectItemInsertReq,
  "title" | "oneLineInfo" | "category" | "closedDate" | "simpleInfo"
>;
export type Step2Type = Pick<
  ProjectItemInsertReq,
  "teamSize" | "techStack" | "positions"
> & {
  expectedPeriod: ExpectedPeriod | "";
};

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
  const user = useAuthStore((state) => state.user);
  const { data: userProfile } = useUserProfile(user?.uid || "");
  const { mutate: insertProject, isPending } = useProjectInsert();

  const [currentStep, setCurrentStep] = useState(1);
  // const [formStep1, setFormStep1] = useState<Setp1Type>(initForm1);
  const [formStep2, setFormStep2] = useState<Step2Type>(initForm2);

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
    if (!userProfile) return;
    if (!window.confirm("등록을 완료 하시겠습니까?")) return;
    if (isPending) return;

    // lint에러를 피하기 위한...
    // 추후에 step3, step4 훅 만들 때 가져다 쓰시라고 미리 만들어놨습니다!
    console.log(initForm2, initForm3, initForm4);

    // form 검사 추가 바람

    // projects에 insert
    insertProject(TestData(userProfile));
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
  category: ProjectCategory.webDevelopment,
  simpleInfo: "",
  closedDate: Timestamp.now(),
  oneLineInfo: "",
};
const initForm2 = {
  teamSize: 0,
  techStack: [],
  positions: [],
  expectedPeriod: ExpectedPeriod.oneMonth,
};
const initForm3 = {
  description: "",
  schedules: [],
};
const initForm4 = {
  workflow: Workflow.online,
  requirements: [],
  preferentialTreatment: [],
};

// 테스트용 form 입니다.
const TestData = (user: User): ProjectItemInsertReq => ({
  projectOwner: {
    id: user.id,
    name: user.name,
    userRole: user.userRole,
    email: user.email,
    experience: user.experience,
    avatar: user.avatar,
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
});
