import type { SelectChangeEvent } from "@mui/material";
import { Box, styled, useMediaQuery, useTheme } from "@mui/material";
import type { JSX } from "react";

import useInsertStep2 from "@features/projects/hook/useInsertStep2";
import type { Step2Type } from "@features/projects/type/project-update";

import ProjectExpectedPeriodCard from "@entities/projects/ui/project-insert/ProjectExpectedPeriodCard";
import ProjectPositionsCard from "@entities/projects/ui/project-insert/ProjectPositionsCard";
import ProjectTeamSizeCard from "@entities/projects/ui/project-insert/ProjectTeamSizeCard";
import ProjectTechStackCard from "@entities/projects/ui/project-insert/ProjectTechStackCard";

const Step2 = ({
  setForm,
}: {
  setForm: (data: Step2Type) => void;
}): JSX.Element => {
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));

  const { formStep2, onChangeForm } = useInsertStep2({});

  const settingSetForm = (): void => {
    // 검사식 추가해주세요~~
    // ex) alert('요구사항을 채워주세요')
    setForm(formStep2);
  };

  return (
    <>
      <StepBox>
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
      </StepBox>

      <button onClick={settingSetForm}>전체폼에 2번스탭데이터 넣기</button>
    </>
  );
};

export default Step2;

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
