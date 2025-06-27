import { useState, type ChangeEvent } from "react";

import {
  RecruitmentStatus,
  type Positions,
  type ProjectItemInsertReq,
} from "@shared/types/project";
import { ExpectedPeriod } from "@shared/types/schedule";

type Setp2Type = Pick<
  ProjectItemInsertReq,
  "techStack" | "teamSize" | "expectedPeriod" | "positions"
>;

interface ApplyFormResult {
  form2: Setp2Type;
  setting: {
    // 내부 Input 셋팅용
    tehckStackItem: (e: ChangeEvent<HTMLInputElement>) => void;
    positionItem: <K extends keyof Positions>(
      index: number,
      field: K,
      value: Positions[K]
    ) => void;
  };
  update: {
    // form 업데이트용
    teamSize: (e: ChangeEvent<HTMLInputElement>) => void;
    expectedPeriod: (e: ChangeEvent<HTMLInputElement>) => void;
    techStack: () => void;
    newPosition: () => void;
    removePosition: (idx: number) => void;
  };
}

const useInsertStep2 = ({ state }: { state?: Setp2Type }): ApplyFormResult => {
  const isModify = !!state; // 추후에 수정을 위해서

  const [form2, setForm2] = useState(isModify ? state : initForm2);
  const [techSteckItem, setTechStackItem] = useState("");

  // 팀 규모
  const updateTeamSize = (e: ChangeEvent<HTMLInputElement>): void => {
    const formateNumber = parseInt(e.target.value) || 0;

    setForm2((prev) => ({
      ...prev,
      teamSize: formateNumber,
    }));
  };

  // 예상 기간
  const updateExpectedPeriod = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value as keyof typeof ExpectedPeriod;

    if (value in ExpectedPeriod) {
      setForm2((prev) => ({
        ...prev,
        expectedPeriod: ExpectedPeriod[value],
      }));
    }
  };

  // 기술 스택 input box 용
  const settingTechStackItem = (e: ChangeEvent<HTMLInputElement>): void => {
    setTechStackItem(e.target.value);
  };

  // 기술 스택 + 버튼 시 list에 추가
  const updateTechStack = (): void => {
    setForm2((prev) => ({
      ...prev,
      techStack: [...prev.techStack, techSteckItem],
    }));
  };

  // 모집 포지션 수정
  const updatePositionField = <K extends keyof Positions>(
    index: number,
    field: K,
    value: Positions[K]
  ): void => {
    setForm2((prev) => ({
      ...prev,
      positions: prev.positions.map((pos, i) =>
        i === index ? { ...pos, [field]: value } : pos
      ),
    }));
  };

  // 모집 포지션 추가
  const insertNewPositions = (): void => {
    setForm2((prev) => ({
      ...prev,
      positions: [initPosition],
    }));
  };

  // 포지션 삭제
  const removePosition = (idx: number): void => {
    setForm2((prev) => ({
      ...prev,
      positions: prev.positions.filter((_, i) => i !== idx),
    }));
  };

  return {
    form2,
    setting: {
      tehckStackItem: settingTechStackItem,
      positionItem: updatePositionField,
    },
    update: {
      teamSize: updateTeamSize,
      techStack: updateTechStack,
      expectedPeriod: updateExpectedPeriod,
      newPosition: insertNewPositions,
      removePosition: removePosition,
    },
  };
};

export default useInsertStep2;

const initForm2 = {
  teamSize: 0,
  techStack: [],
  positions: [],
  expectedPeriod: ExpectedPeriod.oneMonth,
};

const initPosition: Positions = {
  position: "frontend",
  count: 0,
  experience: "",
  status: RecruitmentStatus.recruiting,
  applicants: [],
};
