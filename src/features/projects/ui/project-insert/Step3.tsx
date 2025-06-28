import { useMediaQuery, useTheme } from "@mui/material";
import type { JSX } from "react";

import useInsertStep3 from "@features/projects/hooks/useInsertStep3";
import type { UpdateAllFormType } from "@features/projects/types/project-update";

import ProjectDetailDescriptionCard from "@entities/projects/ui/project-insert/ProjectDetailDescriptionCard";
import ProjectScheduleManagementCard from "@entities/projects/ui/project-insert/ProjectScheduleManagementCard";

import type { ProjectSchedule } from "@shared/types/schedule";
import StepWhiteBox from "@shared/ui/project-insert/StepWhiteBox";

const Step3 = ({
  updateForm,
}: {
  updateForm: UpdateAllFormType;
}): JSX.Element => {
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));

  const { formStep3, onChangeForm, validateForm } = useInsertStep3({});

  const settingSetForm = (): void => {
    if (validateForm()) {
      updateForm("form3", formStep3);
    }
  };

  return (
    <StepWhiteBox stepNum={3} onClick={settingSetForm}>
      <ProjectDetailDescriptionCard
        value={formStep3.description}
        onChange={(value: string) => onChangeForm("description", value)}
        large
        style={{ gridColumn: isMdDown ? "span 1" : "1 / -1" }}
      />

      <ProjectScheduleManagementCard
        value={formStep3.schedules}
        onChange={(value: ProjectSchedule[]) =>
          onChangeForm("schedules", value)
        }
        large
        style={{ gridColumn: isMdDown ? "span 1" : "1 / -1" }}
      />
    </StepWhiteBox>
  );
};

export default Step3;
