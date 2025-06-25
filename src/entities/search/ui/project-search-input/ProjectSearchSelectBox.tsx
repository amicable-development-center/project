import { Select, InputLabel, FormControl, MenuItem } from "@mui/material";
import type { JSX } from "react";
import { memo } from "react";

import type { SelectFieldConfig } from "@entities/search/model/selectFieldConfigs";

interface ProjectSearchSelectBoxProps {
  config: SelectFieldConfig;
  value: string;
  onChange: (value: string) => void;
}

const ProjectSearchSelectBox = memo(
  ({ config, value, onChange }: ProjectSearchSelectBoxProps): JSX.Element => {
    return (
      <FormControl fullWidth>
        <InputLabel>{config.label}</InputLabel>
        <Select
          value={value || "all"}
          label={config.label}
          onChange={(e) => onChange(e.target.value)}
        >
          {config.options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }
);

export default ProjectSearchSelectBox;
