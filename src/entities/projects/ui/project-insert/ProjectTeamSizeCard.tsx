import { FormControl, Select, MenuItem } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import type { CSSProperties, JSX } from "react";

import SimpleFormCard from "@shared/ui/project-insert/SimpleFormCard";

interface ProjectTeamSizeCardProps {
  value: number; // 받을 때는 number
  onChange: (e: SelectChangeEvent<string>) => void; // 변경할 때는 string으로 받기
  large?: boolean;
  style?: CSSProperties;
}

const ProjectTeamSizeCard = ({
  value,
  onChange,
  large,
  style,
}: ProjectTeamSizeCardProps): JSX.Element => {
  const theme = useTheme();

  return (
    <SimpleFormCard
      title="팀 규모"
      description="몇 명이서 함께 할까요?"
      large={large}
      style={style}
    >
      <FormControl fullWidth>
        <Select<string>
          value={value ? value.toString() : ""}
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
            팀 규모를 선택하세요
          </MenuItem>
          <MenuItem value="2">2명 (나 + 1명)</MenuItem>
          <MenuItem value="3">3명 (소규모 팀)</MenuItem>
          <MenuItem value="4">4명 (적당한 팀)</MenuItem>
          <MenuItem value="5">5명 (큰 팀)</MenuItem>
          <MenuItem value="6">6명 이상 (대규모)</MenuItem>
        </Select>
      </FormControl>
    </SimpleFormCard>
  );
};

export default ProjectTeamSizeCard;
