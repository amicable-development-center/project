import type { SelectChangeEvent } from "@mui/material";
import { Timestamp } from "firebase/firestore";
import type { ChangeEvent } from "react";
import { useState } from "react";

import type { Step1Type } from "@features/projects/types/project-update";

import { ProjectCategory } from "@shared/types/project";

interface ApplyFormResult {
  form1: Step1Type;
  update: {
    title: (e: ChangeEvent<HTMLInputElement>) => void;
    oneLineInfo: (e: ChangeEvent<HTMLInputElement>) => void;
    simpleInfo: (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    category: (event: SelectChangeEvent) => void;
    closedDate: (e: ChangeEvent<HTMLInputElement>) => void;
  };
  validateForm: () => boolean;
}

const useInsertStep1 = ({ state }: { state?: Step1Type }): ApplyFormResult => {
  const isModify = !!state; // 추후에 수정을 위해서

  const [form1, setForm1] = useState(isModify ? state : initForm1);

  const updateTitle = (e: ChangeEvent<HTMLInputElement>): void => {
    setForm1((prev) => ({
      ...prev,
      title: e.target.value,
    }));
  };

  const updateOneLineInfo = (e: ChangeEvent<HTMLInputElement>): void => {
    setForm1((prev) => ({
      ...prev,
      oneLineInfo: e.target.value,
    }));
  };

  const updateSimpleInfo = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setForm1((prev) => ({
      ...prev,
      simpleInfo: e.target.value,
    }));
  };

  const updateCategory = (event: SelectChangeEvent): void => {
    setForm1((prev) => ({
      ...prev,
      category: event.target.value as ProjectCategory,
    }));
  };

  const updateClosedDate = (e: ChangeEvent<HTMLInputElement>): void => {
    const formateTimeStamp = Timestamp.fromDate(new Date(e.target.value));
    setForm1((prev) => ({
      ...prev,
      closedDate: formateTimeStamp,
    }));
  };

  const validateForm = (): boolean => {
    //여기에 검사식을 넣어주세요.
    // 아래는 예시 입니다.
    if (!form1.title.trim()) {
      alert("프로젝트 이름을 적어주세욧요.");
      return false;
    }
    return true;
  };

  return {
    form1,
    update: {
      title: updateTitle,
      oneLineInfo: updateOneLineInfo,
      simpleInfo: updateSimpleInfo,
      category: updateCategory,
      closedDate: updateClosedDate,
    },
    validateForm,
  };
};

export default useInsertStep1;

const initForm1 = {
  title: "",
  category: ProjectCategory.webDevelopment,
  simpleInfo: "",
  closedDate: Timestamp.now(),
  oneLineInfo: "",
};
