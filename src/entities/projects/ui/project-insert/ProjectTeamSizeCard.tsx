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
        <Select
          value={value || 0}
          onChange={onChange}
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
          <MenuItem value={0} disabled hidden>
            팀 규모를 선택하세요
          </MenuItem>
          <MenuItem value={2}>2명 (나 + 1명)</MenuItem>
          <MenuItem value={3}>3명 (소규모 팀)</MenuItem>
          <MenuItem value={4}>4명 (적당한 팀)</MenuItem>
          <MenuItem value={5}>5명 (큰 팀)</MenuItem>
          <MenuItem value={6}>6명 이상 (대규모)</MenuItem>
        </Select>
      </FormControl>
    </SimpleFormCard>
  );
};

export default ProjectTeamSizeCard;
