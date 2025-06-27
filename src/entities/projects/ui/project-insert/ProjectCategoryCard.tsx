import { FormControl, Select, MenuItem } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import type { CSSProperties, JSX } from "react";

import SimpleFormCard from "@shared/ui/project-insert/SimpleFormCard";

interface ProjectCategoryCardProps {
  value: string;
  onChange: (event: SelectChangeEvent) => void;
  large?: boolean;
  style?: CSSProperties;
}

const ProjectCategoryCard = ({
  value,
  onChange,
  large,
  style,
}: ProjectCategoryCardProps): JSX.Element => {
  const theme = useTheme();
  return (
    <SimpleFormCard
      title="프로젝트 분야"
      description="어떤 분야의 프로젝트인지 선택해주세요"
      helpText="가장 가까운 분야를 선택해주세요"
      large={large}
      style={style}
    >
      <FormControl fullWidth>
        <Select
          value={value || ""}
          onChange={onChange}
          size={large ? "medium" : "small"}
          displayEmpty
          sx={{
            fontSize: large
              ? theme.typography.h5.fontSize
              : theme.typography.body1.fontSize,
            fontFamily: theme.typography.fontFamily,
            height: 40,
            border: `1px solid ${theme.palette.divider}`,
            boxSizing: "border-box",
            padding: large ? theme.spacing(2.2) : theme.spacing(1.7),
            "& .MuiSelect-select": {
              height: "40px",
              display: "flex",
              alignItems: "center",
              padding: 0,
            },
          }}
        >
          <MenuItem value="" disabled hidden>
            분야를 선택하세요
          </MenuItem>
          <MenuItem value="web">웹 서비스</MenuItem>
          <MenuItem value="mobile">모바일 앱</MenuItem>
          <MenuItem value="ai">AI/머신러닝</MenuItem>
          <MenuItem value="blockchain">블록체인</MenuItem>
          <MenuItem value="game">게임</MenuItem>
          <MenuItem value="design">디자인</MenuItem>
          <MenuItem value="iot">IoT/하드웨어</MenuItem>
          <MenuItem value="other">기타</MenuItem>
        </Select>
      </FormControl>
    </SimpleFormCard>
  );
};

export default ProjectCategoryCard;
