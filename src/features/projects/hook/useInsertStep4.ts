import { useState, type ChangeEvent } from "react";

import { type ProjectItemInsertReq, Workflow } from "@shared/types/project";

type Step4Type = Pick<
  ProjectItemInsertReq,
  "workflow" | "requirements" | "preferentialTreatment"
>;

interface ApplyFormResult {
  form4: Step4Type;
  setting: {
    // 내부 Input 셋팅용
    requirementItem: (e: ChangeEvent<HTMLInputElement>) => void;
    preferentialItem: (e: ChangeEvent<HTMLInputElement>) => void;
  };
  update: {
    // form 업데이트용
    workflow: (e: ChangeEvent<HTMLInputElement>) => void;
    requirements: () => void;
    removeRequirement: (idx: number) => void;
    preferentialTreatment: () => void;
    removePreferentialTreatment: (idx: number) => void;
  };
}

const useInsertStep4 = ({ state }: { state?: Step4Type }): ApplyFormResult => {
  const isModify = !!state; // 추후에 수정을 위해서

  const [form4, setForm4] = useState(isModify ? state : initForm4);
  const [requirementItem, setRequirementItem] = useState("");
  const [preferentialItem, setPreferentialItem] = useState("");

  // 진행 방식
  const updateWorkflow = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value as keyof typeof Workflow;

    if (value in Workflow) {
      setForm4((prev) => ({
        ...prev,
        workflow: Workflow[value],
      }));
    }
  };

  // 지원 요건 input box 용
  const settingRequirementItem = (e: ChangeEvent<HTMLInputElement>): void => {
    setRequirementItem(e.target.value);
  };

  // 지원 요건 + 버튼 시 list에 추가
  const updateRequirements = (): void => {
    if (requirementItem.trim()) {
      setForm4((prev) => ({
        ...prev,
        requirements: [...prev.requirements, requirementItem.trim()],
      }));
      setRequirementItem(""); // 입력 필드 초기화
    }
  };

  // 지원 요건 삭제
  const removeRequirement = (idx: number): void => {
    setForm4((prev) => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== idx),
    }));
  };

  // 우대 사항 input box 용
  const settingPreferentialItem = (e: ChangeEvent<HTMLInputElement>): void => {
    setPreferentialItem(e.target.value);
  };

  // 우대 사항 + 버튼 시 list에 추가
  const updatePreferentialTreatment = (): void => {
    if (preferentialItem.trim()) {
      setForm4((prev) => ({
        ...prev,
        preferentialTreatment: [
          ...prev.preferentialTreatment,
          preferentialItem.trim(),
        ],
      }));
      setPreferentialItem(""); // 입력 필드 초기화
    }
  };

  // 우대 사항 삭제
  const removePreferentialTreatment = (idx: number): void => {
    setForm4((prev) => ({
      ...prev,
      preferentialTreatment: prev.preferentialTreatment.filter(
        (_, i) => i !== idx
      ),
    }));
  };

  return {
    form4,
    setting: {
      requirementItem: settingRequirementItem,
      preferentialItem: settingPreferentialItem,
    },
    update: {
      workflow: updateWorkflow,
      requirements: updateRequirements,
      removeRequirement: removeRequirement,
      preferentialTreatment: updatePreferentialTreatment,
      removePreferentialTreatment: removePreferentialTreatment,
    },
  };
};

export default useInsertStep4;

const initForm4: Step4Type = {
  workflow: Workflow.online,
  requirements: [],
  preferentialTreatment: [],
};
