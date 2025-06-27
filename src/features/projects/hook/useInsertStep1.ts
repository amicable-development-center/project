import { Timestamp } from "firebase/firestore";
import { useState, type ChangeEvent } from "react";

import {
  ProjectCategory,
  type ProjectItemInsertReq,
} from "@shared/types/project";

type Setp1Type = Pick<
  ProjectItemInsertReq,
  "title" | "oneLineInfo" | "category" | "closedDate" | "simpleInfo"
>;

interface ApplyFormResult {
  form1: Setp1Type;
  update: {
    title: (e: ChangeEvent<HTMLInputElement>) => void;
    oneLineInfo: (e: ChangeEvent<HTMLInputElement>) => void;
    simpleInfo: (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    category: (category: ProjectCategory) => void;
    closedDate: (date: string) => void;
  };
}

const useInsertStep1 = ({ state }: { state?: Setp1Type }): ApplyFormResult => {
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

  const updateCategory = (category: ProjectCategory): void => {
    setForm1((prev) => ({
      ...prev,
      category,
    }));
  };

  const updateClosedDate = (closedDate: string): void => {
    const formateTimeStamp = Timestamp.fromDate(new Date(closedDate));
    setForm1((prev) => ({
      ...prev,
      closedDate: formateTimeStamp,
    }));
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
