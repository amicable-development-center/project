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
    //여기에 검사식을 넣어주세요.
    // 아래는 예시 입니다.
    if (formStep4.requirements[0] === "") {
      alert("지원 요구사항을 적어주세욧요.");
      return false;
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
