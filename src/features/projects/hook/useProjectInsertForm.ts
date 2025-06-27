import { Timestamp } from "firebase/firestore";
import { useState } from "react";

import useProjectInsert from "@features/projects/queries/useProjectInsert";
import type {
  Step1Type,
  Step2Type,
  Step3Type,
  Step4Type,
} from "@features/projects/type/project-update";

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

interface InsertFormResult {
  page: {
    currentStep: number;
    goPrev: () => void;
    goNext: () => void;
  };
  setForm: {
    form1: (data: Step1Type) => void;
    form2: (data: Step2Type) => void;
    form3: (data: Step3Type) => void;
    form4: (data: Step4Type) => void;
  };
  submit: () => Promise<void>;
}

const useProjectInsertForm = (): InsertFormResult => {
  const user = useAuthStore((state) => state.user);
  const { data: userProfile } = useUserProfile(user?.uid || "");
  const { mutate: insertProject, isPending } = useProjectInsert();

  const [currentStep, setCurrentStep] = useState(1);

  const [allForm, setAllForm] = useState({
    form1: {} as Step1Type,
    form2: {} as Step2Type,
    form3: {} as Step3Type,
    form4: {} as Step4Type,
  });

  const updateForm1 = (data: Step1Type): void => {
    setAllForm((prev) => ({ ...prev, form1: data }));
  };

  const updateForm2 = (data: Step2Type): void => {
    setAllForm((prev) => ({ ...prev, form2: data }));
  };

  const updateForm3 = (data: Step3Type): void => {
    setAllForm((prev) => ({ ...prev, form3: data }));
  };

  const updateForm4 = (data: Step4Type): void => {
    setAllForm((prev) => ({ ...prev, form4: data }));
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

    // form 검사 추가 바람
    console.log({
      ...allForm.form1,
      ...allForm.form2,
      ...allForm.form3,
      ...allForm.form4,
    });

    // projects에 insert
    insertProject(TestData(userProfile));
  };

  return {
    page: {
      currentStep: currentStep,
      goPrev: handlePrev,
      goNext: handleNext,
    },
    setForm: {
      form1: updateForm1,
      form2: updateForm2,
      form3: updateForm3,
      form4: updateForm4,
    },
    submit,
  };
};

export default useProjectInsertForm;

// 테스트용 form 입니다.
const TestData = (user: User): ProjectItemInsertReq => ({
  projectOwnerID: user.id, // 요거 추가!!
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
