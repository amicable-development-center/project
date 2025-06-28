import { useMediaQuery, useTheme } from "@mui/material";
import type { JSX } from "react";

import useInsertStep4 from "@features/projects/hooks/useInsertStep4";
import type { UpdateAllFormType } from "@features/projects/types/project-update";

import ProjectPreferentialCard from "@entities/projects/ui/project-insert/ProjectPreferentialCard";
import ProjectRequirementsCard from "@entities/projects/ui/project-insert/ProjectRequirementsCard";
import ProjectWorkflowCard from "@entities/projects/ui/project-insert/ProjectWorkflowCard";

import type { Workflow } from "@shared/types/project";
import StepWhiteBox from "@shared/ui/project-insert/StepWhiteBox";

const Step4 = ({
  updateForm,
}: {
  updateForm: UpdateAllFormType;
}): JSX.Element => {
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));
  const { formStep4, onChangeForm, validateForm } = useInsertStep4({});

  const finalData = (): void => {
    if (validateForm()) {
      updateForm("form4", formStep4);
    }
  };

  return (
    <StepWhiteBox stepNum={4} onClick={finalData}>
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
    </StepWhiteBox>
  );
};

export default Step4;
