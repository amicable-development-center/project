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

  return {
    formStep3,
    onChangeForm: handleChangeStep3,
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
