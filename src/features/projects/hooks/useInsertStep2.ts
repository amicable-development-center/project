import { useState } from "react";

import type { Step2Type } from "@features/projects/types/project-update";

import { useSnackbarStore } from "@shared/stores/snackbarStore";
import { ExpectedPeriod } from "@shared/types/schedule";

interface ApplyFormResult {
  formStep2: Step2Type;
  onChangeForm: (field: keyof Step2Type, value: any) => void;
  validateForm: () => boolean;
}

const useInsertStep2 = ({ state }: { state?: Step2Type }): ApplyFormResult => {
  const isModify = !!state; // 추후에 수정을 위해서
  const { showError } = useSnackbarStore();

  const [formStep2, setFormStep2] = useState(isModify ? state : initForm2);

  const handleChangeStep2 = (field: keyof Step2Type, value: any): void => {
    setFormStep2((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = (): boolean => {
    if (formStep2.teamSize === 0) {
      showError("팀 규모를 선택해주세요");
      return false;
    }
    if (!formStep2.expectedPeriod) {
      showError("예상 일정을 선택해주세요");
      return false;
    }

    if (formStep2.techStack.length === 0) {
      showError("기술 스택을 추가해주세요");
      return false;
    }
    if (formStep2.positions.length === 0) {
      showError("최소 1개 이상의 모집 포지션을 추가해주세요");
      return false;
    }
    for (let i = 0; i < formStep2.positions.length; i++) {
      const position = formStep2.positions[i];

      if (!position.position) {
        showError(`${i + 1}번째 포지션을 선택해주세요`);
        return false;
      }

      if (!position.count || position.count === 0) {
        showError(`${i + 1}번째 포지션의 모집 인원을 선택해주세요`);
        return false;
      }

      if (!position.experience) {
        showError(`${i + 1}번째 포지션의 경력 요구사항을 선택해주세요`);
        return false;
      }
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
