import type { SelectChangeEvent } from "@mui/material";
import { Timestamp } from "firebase/firestore";
import type { ChangeEvent } from "react";
import { useState } from "react";

import type { Step1Type } from "@features/projects/type/project-update";

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
  const [hasUserSelected, setHasUserSelected] = useState(false);

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
    setHasUserSelected(true);
    setForm1((prev) => ({
      ...prev,
      category: event.target.value as ProjectCategory,
    }));
  };

  const updateClosedDate = (e: ChangeEvent<HTMLInputElement>): void => {
    if (!e.target.value) {
      // 빈 값일 때 상태를 null로 설정 (날짜 삭제)
      setForm1((prev) => ({
        ...prev,
        closedDate: null as any,
      }));
      return;
    }

    const formateTimeStamp = Timestamp.fromDate(new Date(e.target.value));
    setForm1((prev) => ({
      ...prev,
      closedDate: formateTimeStamp,
    }));
  };

  const validateForm = (): boolean => {
    if (!form1.title.trim()) {
      alert("프로젝트 이름을 입력해주세요");
      return false;
    }
    if (!form1.oneLineInfo.trim()) {
      alert("한 줄 소개를 입력해주세요.");
      return false;
    }
    if (!form1.simpleInfo.trim()) {
      alert("프로젝트 간단 설명을 입력해주세요.");
      return false;
    }
    if (!hasUserSelected) {
      alert("프로젝트 분야를 선택해주세요.");
      return false;
    }
    if (!form1.closedDate) {
      alert("모집 마감일을 선택해주세요.");
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
