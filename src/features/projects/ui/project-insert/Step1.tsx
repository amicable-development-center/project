import { useMediaQuery, useTheme } from "@mui/material";
import { Timestamp } from "firebase/firestore";
import type { JSX } from "react";

import useInsertStep1 from "@features/projects/hooks/useInsertStep1";
import type { UpdateAllFormType } from "@features/projects/types/project-update";

import ProjectCategoryCard from "@entities/projects/ui/project-insert/ProjectCategoryCard";
import ProjectDeadlineCard from "@entities/projects/ui/project-insert/ProjectDeadlineCard";
import ProjectOneLineCard from "@entities/projects/ui/project-insert/ProjectOneLineCard";
import ProjectSimpleDescCard from "@entities/projects/ui/project-insert/ProjectSimpleDescCard";
import ProjectTitleCard from "@entities/projects/ui/project-insert/ProjectTitleCard";

import StepWhiteBox from "@shared/ui/project-insert/StepWhiteBox";

// 모집 마감일 형식 변환
const timestampToInputDate = (timestamp: Timestamp | null): string => {
  if (!timestamp) return "";
  return timestamp.toDate().toISOString().split("T")[0];
};

const Step1 = ({
  updateForm,
}: {
  updateForm: UpdateAllFormType;
}): JSX.Element => {
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));

  const { form1, update, validateForm } = useInsertStep1({});

  const settingSetForm = (): void => {
    if (validateForm()) {
      updateForm("form1", form1);
    }
  };

  return (
    <StepWhiteBox stepNum={1} onClick={settingSetForm}>
      <ProjectTitleCard
        value={form1.title}
        onChange={update.title}
        large
        style={{ gridColumn: "span 1" }}
      />
      <ProjectOneLineCard
        value={form1.oneLineInfo}
        onChange={update.oneLineInfo}
        large
        style={{ gridColumn: "span 1" }}
      />
      <ProjectCategoryCard
        value={form1.category}
        onChange={update.category}
        large
        style={{ gridColumn: "span 1" }}
      />
      <ProjectDeadlineCard
        value={timestampToInputDate(form1.closedDate)}
        onChange={update.closedDate}
        large
        style={{ gridColumn: "span 1" }}
      />
      <ProjectSimpleDescCard
        value={form1.simpleInfo}
        onChange={update.simpleInfo}
        large
        style={{ gridColumn: isMdDown ? "span 1" : "1 / -1" }}
      />
    </StepWhiteBox>
  );
};

export default Step1;
