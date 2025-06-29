import { FormControl, Select, MenuItem } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import type { CSSProperties, JSX } from "react";

import { ExpectedPeriod } from "@shared/types/schedule";
import SimpleFormCard from "@shared/ui/project-insert/SimpleFormCard";

interface ProjectScheduleCardProps {
  value: ExpectedPeriod | "";
  onChange: (event: SelectChangeEvent<ExpectedPeriod>) => void;
  large?: boolean;
  style?: CSSProperties;
}

export default function ProjectScheduleCard({
  value,
  onChange,
  large = false,
  style,
}: ProjectScheduleCardProps): JSX.Element {
  const theme = useTheme();

  return (
    <SimpleFormCard
      title="예상 일정"
      description="프로젝트를 얼마나 걸릴 것으로 예상하나요?"
      large={large}
      style={style}
    >
      <FormControl fullWidth>
        <Select<ExpectedPeriod>
          value={value || ("" as ExpectedPeriod)}
          onChange={onChange}
          size="small"
          displayEmpty
          sx={{
            height: { xs: 40, sm: 48 },
            "& .MuiOutlinedInput-root": {
              height: { xs: "40px !important", sm: "48px !important" },
              fontSize: {
                xs: "16px",
                sm: "17px",
                md: "18px",
              },
              fontFamily: theme.typography.fontFamily,
              background: "none",
              border: "none",
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: theme.palette.text.primary,
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: theme.palette.primary.main,
                borderWidth: "2px",
              },
            },
            "& .MuiSelect-select": {
              padding: large ? theme.spacing(2.2) : theme.spacing(1.7),
              height: "auto !important",
              minHeight: "unset !important",
              display: "flex",
              alignItems: "center",
              fontSize: {
                xs: "16px",
                sm: "17px",
                md: "18px",
              },
              "&[aria-expanded='false']": {
                color: value ? "inherit" : "#999",
              },
            },
          }}
        >
          <MenuItem value="" disabled hidden>
            일정 기간을 선택해주세요
          </MenuItem>
          <MenuItem value={ExpectedPeriod.oneMonth}>
            {ExpectedPeriod.oneMonth}
          </MenuItem>
          <MenuItem value={ExpectedPeriod.twoMonths}>
            {ExpectedPeriod.twoMonths}
          </MenuItem>
          <MenuItem value={ExpectedPeriod.threeMonths}>
            {ExpectedPeriod.threeMonths}
          </MenuItem>
          <MenuItem value={ExpectedPeriod.fourMonths}>
            {ExpectedPeriod.fourMonths}
          </MenuItem>
          <MenuItem value={ExpectedPeriod.sixMonths}>
            {ExpectedPeriod.sixMonths}
          </MenuItem>
          <MenuItem value={ExpectedPeriod.moreThanSixMonths}>
            {ExpectedPeriod.moreThanSixMonths}
          </MenuItem>
        </Select>
      </FormControl>
    </SimpleFormCard>
  );
}
