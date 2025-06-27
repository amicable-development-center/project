import { Box, styled, useMediaQuery, useTheme } from "@mui/material";
import type { JSX } from "react";

import useInsertStep1 from "@features/projects/hook/useInsertStep1";
import type { UpdateAllFormType } from "@features/projects/type/project-update";

import ProjectCategoryCard from "@entities/projects/ui/project-insert/ProjectCategoryCard";
import ProjectDeadlineCard from "@entities/projects/ui/project-insert/ProjectDeadlineCard";
import ProjectOneLineCard from "@entities/projects/ui/project-insert/ProjectOneLineCard";
import ProjectSimpleDescCard from "@entities/projects/ui/project-insert/ProjectSimpleDescCard";
import ProjectTitleCard from "@entities/projects/ui/project-insert/ProjectTitleCard";

import { formatDate } from "@shared/libs/utils/projectDetail";

const Step1 = ({
  updateForm,
}: {
  updateForm: UpdateAllFormType;
}): JSX.Element => {
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));

  const { form1, update } = useInsertStep1({});

  const settingSetForm = (): void => {
    // 검사식 추가해주세요~~
    // ex) alert('요구사항을 채워주세요')
    updateForm("form1", form1);
  };

  return (
    <>
      <StepBox>
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
          value={formatDate(form1.closedDate)}
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
      </StepBox>

      <button onClick={settingSetForm}>전체폼에 2번스탭데이터 넣기</button>
    </>
  );
};

export default Step1;

export const StepBox = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: theme.spacing(2),

  marginBottom: 0,

  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "1fr 1fr",
    gap: theme.spacing(4),
  },
}));
