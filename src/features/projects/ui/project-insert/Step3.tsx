import { Box, styled, useMediaQuery, useTheme } from "@mui/material";
import type { JSX } from "react";

import useInsertStep3 from "@features/projects/hook/useInsertStep3";
import type { UpdateAllFormType } from "@features/projects/type/project-update";

import ProjectDetailDescriptionCard from "@entities/projects/ui/project-insert/ProjectDetailDescriptionCard";
import ProjectScheduleManagementCard from "@entities/projects/ui/project-insert/ProjectScheduleManagementCard";

import type { ExpectedPeriod } from "@shared/types/schedule";

interface Schedule {
  stageName: string;
  period: ExpectedPeriod; // ExpectedPeriod enum 값
  description: string;
}

const Step3 = ({
  updateForm,
}: {
  updateForm: UpdateAllFormType;
}): JSX.Element => {
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));

  const { formStep3, onChangeForm } = useInsertStep3({});

  const settingSetForm = (): void => {
    // 검사식 추가해주세요~~
    // ex) alert('요구사항을 채워주세요')
    updateForm("form3", formStep3);
  };

  return (
    <>
      <StepBox>
        <ProjectDetailDescriptionCard
          value={formStep3.description}
          onChange={(value: string) => onChangeForm("description", value)}
          large
          style={{ gridColumn: isMdDown ? "span 1" : "1 / -1" }}
        />

        <ProjectScheduleManagementCard
          value={formStep3.schedules}
          onChange={(value: Schedule[]) => onChangeForm("schedules", value)}
          large
          style={{ gridColumn: isMdDown ? "span 1" : "1 / -1" }}
        />
      </StepBox>

      <button onClick={settingSetForm}>전체폼에 3번스탭데이터 넣기</button>
    </>
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
