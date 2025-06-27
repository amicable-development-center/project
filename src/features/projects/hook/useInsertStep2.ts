import { useState } from "react";

import type { Step2Type } from "@features/projects/type/project-update";

import { ExpectedPeriod } from "@shared/types/schedule";

interface ApplyFormResult {
  formStep2: Step2Type;
  onChangeForm: (field: keyof Step2Type, value: any) => void;
}

const useInsertStep2 = ({ state }: { state?: Step2Type }): ApplyFormResult => {
  const isModify = !!state; // 추후에 수정을 위해서

  const [formStep2, setFormStep2] = useState(isModify ? state : initForm2);

  const handleChangeStep2 = (field: keyof Step2Type, value: any): void => {
    setFormStep2((prev) => ({ ...prev, [field]: value }));
  };

  return {
    formStep2,
    onChangeForm: handleChangeStep2,
  };
};

export default useInsertStep2;

const initForm2 = {
  teamSize: 0,
  techStack: [],
  positions: [],
  expectedPeriod: ExpectedPeriod.oneMonth,
};
