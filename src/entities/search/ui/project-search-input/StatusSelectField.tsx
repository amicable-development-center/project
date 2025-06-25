import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import type { JSX } from "react";

import { RecruitmentStatus } from "@shared/types/project";

import {
  SEARCH_FORM_LABELS,
  DROPDOWN_DEFAULTS,
} from "../../model/searchOptions";

interface StatusSelectFieldProps {
  value: RecruitmentStatus | "all";
  onChange: (status: RecruitmentStatus | "all") => void;
}

const StatusSelectField = ({
  value,
  onChange,
}: StatusSelectFieldProps): JSX.Element => {
  return (
    <FormControl fullWidth>
      <InputLabel>{SEARCH_FORM_LABELS.STATUS}</InputLabel>
      <Select
        value={value}
        label={SEARCH_FORM_LABELS.STATUS}
        onChange={(e) =>
          onChange(
            e.target.value === "all"
              ? "all"
              : (e.target.value as RecruitmentStatus)
          )
        }
      >
        <MenuItem value="all">{DROPDOWN_DEFAULTS.ALL_STATUS}</MenuItem>
        {Object.values(RecruitmentStatus).map((status) => (
          <MenuItem key={status} value={status}>
            {status}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default StatusSelectField;
