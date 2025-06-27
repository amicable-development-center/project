import { FormControl, Select, MenuItem } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import type { CSSProperties, JSX } from "react";

import { Workflow } from "@shared/types/project";
import SimpleFormCard from "@shared/ui/project-insert/SimpleFormCard";

interface ProjectWorkflowCardProps {
  value: Workflow | "";
  onChange: (value: Workflow) => void;
  large?: boolean;
  style?: CSSProperties;
}

const WORKFLOW_OPTIONS = [
  {
    value: Workflow.online,
    label: "온라인 (원격)",
  },
  {
    value: Workflow.offlineInSeoul,
    label: "오프라인 (서울)",
  },
  {
    value: Workflow.offlineInBusan,
    label: "오프라인 (부산)",
  },
  {
    value: Workflow.offlineInAnywhere,
    label: "오프라인 (자유)",
  },
  {
    value: Workflow.hybrid,
    label: "하이브리드 (온라인 + 오프라인)",
  },
];

export default function ProjectWorkflowCard({
  value,
  onChange,
  large = false,
  style,
}: ProjectWorkflowCardProps): JSX.Element {
  const theme = useTheme();

  const handleChange = (event: SelectChangeEvent<Workflow>): void => {
    onChange(event.target.value as Workflow);
  };

  return (
    <SimpleFormCard
      title="진행 방식"
      description="어떻게 진행할 예정인가요?"
      large={large}
      style={style}
    >
      <FormControl fullWidth>
        <Select<Workflow>
          value={value || ("" as Workflow)}
          onChange={handleChange}
          size={large ? "medium" : "small"}
          displayEmpty
          sx={{
            fontSize: large
              ? theme.typography.h5.fontSize
              : theme.typography.body1.fontSize,
            fontFamily: theme.typography.fontFamily,
            padding: large ? theme.spacing(2.2) : theme.spacing(1.7),

            height: 40,
            "& .MuiSelect-select": {
              height: "40px",
              display: "flex",
              alignItems: "center",
              padding: 0,
            },
          }}
        >
          <MenuItem value="" disabled hidden>
            진행 방식을 선택해주세요
          </MenuItem>
          {WORKFLOW_OPTIONS.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              <div>{option.label}</div>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </SimpleFormCard>
  );
}
