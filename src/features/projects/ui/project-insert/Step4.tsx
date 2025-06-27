import { Box, styled, useMediaQuery, useTheme } from "@mui/material";
import type { JSX } from "react";

import type { Step4Type } from "@features/projects/hook/useProjectInsertForm";

import ProjectPreferentialCard from "@entities/projects/ui/project-insert/ProjectPreferentialCard";
import ProjectRequirementsCard from "@entities/projects/ui/project-insert/ProjectRequirementsCard";
import ProjectWorkflowCard from "@entities/projects/ui/project-insert/ProjectWorkflowCard";

import { Workflow } from "@shared/types/project";

interface Step4Props {
  form: Step4Type;
  onChangeForm: (
    field: keyof Step4Type,
    value: Step4Type[keyof Step4Type]
  ) => void;
}

const Step4 = ({ form, onChangeForm }: Step4Props): JSX.Element => {
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));

  // 안전 장치: form이 없으면 로딩 상태 표시
  if (!form) {
    return <div>Loading...</div>;
  }

  return (
    <StepBox>
      {/* 진행 방식 - 전체 너비 */}
      <ProjectWorkflowCard
        value={form.workflow}
        onChange={(value: Workflow) => onChangeForm("workflow", value)}
        large
        style={{ gridColumn: isMdDown ? "span 1" : "1 / -1" }}
      />

      {/* 지원 요구사항 - 전체 너비 */}
      <ProjectRequirementsCard
        value={form.requirements}
        onChange={(value: string[]) => onChangeForm("requirements", value)}
        large
        style={{ gridColumn: isMdDown ? "span 1" : "1 / -1" }}
      />

      {/* 우대사항 - 전체 너비 */}
      <ProjectPreferentialCard
        value={form.preferentialTreatment}
        onChange={(value: string[]) =>
          onChangeForm("preferentialTreatment", value)
        }
        large
        style={{ gridColumn: isMdDown ? "span 1" : "1 / -1" }}
      />
    </StepBox>
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
