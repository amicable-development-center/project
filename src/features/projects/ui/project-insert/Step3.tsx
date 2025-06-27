import { Box, styled, useMediaQuery, useTheme } from "@mui/material";
import type { JSX } from "react";

import type { Step3Type } from "@features/projects/hook/useProjectInsertForm";

import ProjectDetailDescriptionCard from "@entities/projects/ui/project-insert/ProjectDetailDescriptionCard";
import ProjectScheduleManagementCard from "@entities/projects/ui/project-insert/ProjectScheduleManagementCard";

import type { ExpectedPeriod } from "@shared/types/schedule";

interface Schedule {
  stageName: string;
  period: ExpectedPeriod; // ExpectedPeriod enum 값
  description: string;
}

interface Step3Props {
  form: Step3Type;
  onChangeForm: (
    field: keyof Step3Type,
    value: Step3Type[keyof Step3Type]
  ) => void;
}

const Step3 = ({ form, onChangeForm }: Step3Props): JSX.Element => {
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <StepBox>
      <ProjectDetailDescriptionCard
        value={form.description}
        onChange={(value: string) => onChangeForm("description", value)}
        large
        style={{ gridColumn: isMdDown ? "span 1" : "1 / -1" }}
      />

      <ProjectScheduleManagementCard
        value={form.schedules}
        onChange={(value: Schedule[]) => onChangeForm("schedules", value)}
        large
        style={{ gridColumn: isMdDown ? "span 1" : "1 / -1" }}
      />
    </StepBox>
  );
};

export default Step3;

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
