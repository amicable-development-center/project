import { useState } from "react";

import { Workflow, type ProjectItemInsertReq } from "@shared/types/project";

type Step4Type = Pick<
  ProjectItemInsertReq,
  "workflow" | "requirements" | "preferentialTreatment"
>;

interface ApplyFormResult {
  formStep4: Step4Type;
  onChangeForm: (
    field: keyof Step4Type,
    value: Step4Type[keyof Step4Type]
  ) => void;
  validateForm: () => boolean;
}

const useInsertStep4 = ({ state }: { state?: Step4Type }): ApplyFormResult => {
  const isModify = !!state; // 추후에 수정을 위해서

  const [formStep4, setFormStep4] = useState(isModify ? state : initForm4);

  const handleChangeStep4 = (
    field: keyof Step4Type,
    value: Step4Type[keyof Step4Type]
  ): void => {
    setFormStep4((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = (): boolean => {
    if (!formStep4.workflow) {
      alert("진행 방식을 선택해주세요.");
      return false;
    }
    if (formStep4.requirements.length === 0) {
      alert("최소 1개 이상의 지원 요구사항을 입력해주세요.");
      return false;
    }
    for (let i = 0; i < formStep4.requirements.length; i++) {
      if (!formStep4.requirements[i].trim()) {
        alert(`${i + 1}번째 지원 요구사항을 입력해주세요.`);
        return false;
      }
    }
    if (formStep4.preferentialTreatment.length === 0) {
      alert("최소 1개 이상의 우대사항을 입력해주세요.");
      return false;
    }
    for (let i = 0; i < formStep4.preferentialTreatment.length; i++) {
      if (!formStep4.preferentialTreatment[i].trim()) {
        alert(`${i + 1}번째 우대사항을 입력해주세요.`);
        return false;
      }
    }

    return true;
  };

  return {
    formStep4,
    onChangeForm: handleChangeStep4,
    validateForm,
  };
};

export default useInsertStep4;

const initForm4: Step4Type = {
  workflow: Workflow.online,
  requirements: [""],
  preferentialTreatment: [],
};
