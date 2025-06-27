import { Box, styled, useMediaQuery, useTheme } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import type { JSX } from "react";

import type { Step2Type } from "@features/projects/hook/useProjectInsertForm";

import ProjectExpectedPeriodCard from "@entities/projects/ui/project-insert/ProjectExpectedPeriodCard";
import ProjectPositionsCard from "@entities/projects/ui/project-insert/ProjectPositionsCard";
import ProjectTeamSizeCard from "@entities/projects/ui/project-insert/ProjectTeamSizeCard";
import ProjectTechStackCard from "@entities/projects/ui/project-insert/ProjectTechStackCard";

interface Step2Props {
  form: Step2Type;
  onChangeForm: (field: keyof Step2Type, value: any) => void;
}

const Step2 = ({ form, onChangeForm }: Step2Props): JSX.Element => {
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <StepBox>
      <ProjectTeamSizeCard
        value={form.teamSize}
        onChange={(e: SelectChangeEvent) =>
          onChangeForm("teamSize", Number(e.target.value))
        }
        large
        style={{ gridColumn: "span 1" }}
      />
      <ProjectExpectedPeriodCard
        value={form.expectedPeriod}
        onChange={(e: SelectChangeEvent) =>
          onChangeForm("expectedPeriod", e.target.value)
        }
        large
        style={{ gridColumn: "span 1" }}
      />
      <ProjectTechStackCard
        value={form.techStack}
        onChange={(value) => onChangeForm("techStack", value)}
        large
        style={{ gridColumn: isMdDown ? "span 1" : "1 / -1" }}
      />
      <ProjectPositionsCard
        value={form.positions}
        onChange={(value) => onChangeForm("positions", value)}
        large
        style={{ gridColumn: isMdDown ? "span 1" : "1 / -1" }}
      />
    </StepBox>
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
