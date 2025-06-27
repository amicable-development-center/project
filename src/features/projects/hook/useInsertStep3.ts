import { useState, type ChangeEvent } from "react";

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
  form3: Step3Type;
  setting: {
    // 내부 Input 셋팅용
    scheduleItem: <K extends keyof Schedule>(
      index: number,
      field: K,
      value: Schedule[K]
    ) => void;
  };
  update: {
    // form 업데이트용
    description: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    newSchedule: () => void;
    removeSchedule: (idx: number) => void;
  };
}

const useInsertStep3 = ({ state }: { state?: Step3Type }): ApplyFormResult => {
  const isModify = !!state; // 추후에 수정을 위해서

  const [form3, setForm3] = useState(isModify ? state : initForm3);

  // 프로젝트 설명
  const updateDescription = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setForm3((prev) => ({
      ...prev,
      description: e.target.value,
    }));
  };

  // 일정 수정
  const updateScheduleField = <K extends keyof Schedule>(
    index: number,
    field: K,
    value: Schedule[K]
  ): void => {
    setForm3((prev) => ({
      ...prev,
      schedules: prev.schedules.map((schedule, i) =>
        i === index ? { ...schedule, [field]: value } : schedule
      ),
    }));
  };

  // 새 일정 추가
  const insertNewSchedule = (): void => {
    setForm3((prev) => ({
      ...prev,
      schedules: [...prev.schedules, initSchedule],
    }));
  };

  // 일정 삭제
  const removeSchedule = (idx: number): void => {
    setForm3((prev) => ({
      ...prev,
      schedules: prev.schedules.filter((_, i) => i !== idx),
    }));
  };

  return {
    form3,
    setting: {
      scheduleItem: updateScheduleField,
    },
    update: {
      description: updateDescription,
      newSchedule: insertNewSchedule,
      removeSchedule: removeSchedule,
    },
  };
};

export default useInsertStep3;

const initForm3: Step3Type = {
  description: "",
  schedules: [],
};

const initSchedule: Schedule = {
  stageName: "",
  period: ExpectedPeriod.oneMonth,
  description: "",
};
