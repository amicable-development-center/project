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

  return {
    formStep4,
    onChangeForm: handleChangeStep4,
  };
};

export default useInsertStep4;

const initForm4: Step4Type = {
  workflow: Workflow.online,
  requirements: [""],
  preferentialTreatment: [""],
};
