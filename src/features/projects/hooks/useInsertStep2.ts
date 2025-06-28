import { useState } from "react";

import type { Step2Type } from "@features/projects/types/project-update";

import { ExpectedPeriod } from "@shared/types/schedule";

interface ApplyFormResult {
  formStep2: Step2Type;
  onChangeForm: (field: keyof Step2Type, value: any) => void;
  validateForm: () => boolean;
}

const useInsertStep2 = ({ state }: { state?: Step2Type }): ApplyFormResult => {
  const isModify = !!state; // 추후에 수정을 위해서

  const [formStep2, setFormStep2] = useState(isModify ? state : initForm2);

  const handleChangeStep2 = (field: keyof Step2Type, value: any): void => {
    setFormStep2((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = (): boolean => {
    //여기에 검사식을 넣어주세요.
    // 아래는 예시 입니다.
    if (formStep2.techStack.length === 0) {
      alert("기술 스택을 적어주세욧요.");
      return false;
    }
    return true;
  };

  return {
    formStep2,
    onChangeForm: handleChangeStep2,
    validateForm,
  };
};

export default useInsertStep2;

const initForm2 = {
  teamSize: 0,
  techStack: [],
  positions: [],
  expectedPeriod: ExpectedPeriod.oneMonth,
};
