import type { SelectChangeEvent } from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/material";
import type { JSX } from "react";

import useInsertStep2 from "@features/projects/hook/useInsertStep2";
import type { UpdateAllFormType } from "@features/projects/type/project-update";

import ProjectExpectedPeriodCard from "@entities/projects/ui/project-insert/ProjectExpectedPeriodCard";
import ProjectPositionsCard from "@entities/projects/ui/project-insert/ProjectPositionsCard";
import ProjectTeamSizeCard from "@entities/projects/ui/project-insert/ProjectTeamSizeCard";
import ProjectTechStackCard from "@entities/projects/ui/project-insert/ProjectTechStackCard";

import StepWhiteBox from "@shared/ui/project-insert/StepWhiteBox";

const Step2 = ({
  updateForm,
}: {
  updateForm: UpdateAllFormType;
}): JSX.Element => {
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));

  const { formStep2, onChangeForm, validateForm } = useInsertStep2({});

  const settingSetForm = (): void => {
    if (validateForm()) {
      updateForm("form2", formStep2);
    }
  };

  return (
    <StepWhiteBox stepNum={2} onClick={settingSetForm}>
      <ProjectTeamSizeCard
        value={formStep2.teamSize}
        onChange={(e: SelectChangeEvent) =>
          onChangeForm("teamSize", Number(e.target.value))
        }
        large
        style={{ gridColumn: "span 1" }}
      />
      <ProjectExpectedPeriodCard
        value={formStep2.expectedPeriod}
        onChange={(e: SelectChangeEvent) =>
          onChangeForm("expectedPeriod", e.target.value)
        }
        large
        style={{ gridColumn: "span 1" }}
      />
      <ProjectTechStackCard
        value={formStep2.techStack}
        onChange={(value) => onChangeForm("techStack", value)}
        large
        style={{ gridColumn: isMdDown ? "span 1" : "1 / -1" }}
      />
      <ProjectPositionsCard
        value={formStep2.positions}
        onChange={(value) => onChangeForm("positions", value)}
        large
        style={{ gridColumn: isMdDown ? "span 1" : "1 / -1" }}
      />
    </StepWhiteBox>
  );
};

export default Step2;
