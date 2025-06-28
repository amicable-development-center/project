import { useState } from "react";

import { type ProjectItemInsertReq } from "@shared/types/project";
import { ExpectedPeriod } from "@shared/types/schedule";

// Schedule 타입 정의 (원본 코드 참고)
interface Schedule {
  stageName: string;
  period: ExpectedPeriod;
  description: string;
}

type Step3Type = Pick<ProjectItemInsertReq, "description" | "schedules">;

interface ApplyFormResult {
  formStep3: Step3Type;
  onChangeForm: (
    field: keyof Step3Type,
    value: Step3Type[keyof Step3Type]
  ) => void;
  validateForm: () => boolean;
}

const useInsertStep3 = ({ state }: { state?: Step3Type }): ApplyFormResult => {
  const isModify = !!state; // 추후에 수정을 위해서

  const [formStep3, setFormStep3] = useState(isModify ? state : initForm3);

  const handleChangeStep3 = (
    field: keyof Step3Type,
    value: Step3Type[keyof Step3Type]
  ): void => {
    setFormStep3((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = (): boolean => {
    //여기에 검사식을 넣어주세요.
    // 아래는 예시 입니다.
    if (!formStep3.description.trim()) {
      alert("프로젝트 상세 설명을 적어주세욧요.");
      return false;
    }
    return true;
  };

  return {
    formStep3,
    onChangeForm: handleChangeStep3,
    validateForm,
  };
};

export default useInsertStep3;

const initSchedule: Schedule = {
  stageName: "",
  period: ExpectedPeriod.oneMonth,
  description: "",
};

const initForm3: Step3Type = {
  description: "",
  schedules: [initSchedule],
};
