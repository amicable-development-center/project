import { Box, styled, useMediaQuery, useTheme } from "@mui/material";
import type { JSX } from "react";

import useInsertStep4 from "@features/projects/hook/useInsertStep4";
import type { UpdateAllFormType } from "@features/projects/type/project-update";

import ProjectPreferentialCard from "@entities/projects/ui/project-insert/ProjectPreferentialCard";
import ProjectRequirementsCard from "@entities/projects/ui/project-insert/ProjectRequirementsCard";
import ProjectWorkflowCard from "@entities/projects/ui/project-insert/ProjectWorkflowCard";

import type { Workflow } from "@shared/types/project";

const Step4 = ({
  updateForm,
}: {
  updateForm: UpdateAllFormType;
}): JSX.Element => {
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));
  const { formStep4, onChangeForm } = useInsertStep4({});

  const finalData = (): void => {
    // 검사식 추가해주세요~~
    // ex) alert('요구사항을 채워주세요')
    updateForm("form4", formStep4);
  };

  return (
    <>
      <StepBox>
        {/* 진행 방식 - 전체 너비 */}
        <ProjectWorkflowCard
          value={formStep4.workflow}
          onChange={(value: Workflow) => onChangeForm("workflow", value)}
          large
          style={{ gridColumn: isMdDown ? "span 1" : "1 / -1" }}
        />

        {/* 지원 요구사항 - 전체 너비 */}
        <ProjectRequirementsCard
          value={formStep4.requirements}
          onChange={(value: string[]) => onChangeForm("requirements", value)}
          large
          style={{ gridColumn: isMdDown ? "span 1" : "1 / -1" }}
        />

        {/* 우대사항 - 전체 너비 */}
        <ProjectPreferentialCard
          value={formStep4.preferentialTreatment}
          onChange={(value: string[]) =>
            onChangeForm("preferentialTreatment", value)
          }
          large
          style={{ gridColumn: isMdDown ? "span 1" : "1 / -1" }}
        />
      </StepBox>

      <button onClick={finalData}>스탭 4번 버튼</button>
    </>
  );
};

export default Step4;

export const StepBox = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: theme.spacing(2),
  marginBottom: 0,

  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "1fr 1fr",
    gap: theme.spacing(3),
  },
}));
