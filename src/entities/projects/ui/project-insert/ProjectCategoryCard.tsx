import { FormControl, Select, MenuItem } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import type { CSSProperties } from "react";

interface ProjectCategoryCardProps {
  value: string;
  onChange: (event: SelectChangeEvent) => void;
  large?: boolean;
  style?: CSSProperties;
}

const CARD_SHADOW =
  "0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)";

const ProjectCategoryCard = ({
  value,
  onChange,
  large,
  style,
}: ProjectCategoryCardProps) => {
  const theme = useTheme();
  return (
    <div
      style={{
        background: theme.palette.background.paper,
        borderRadius: theme.shape.borderRadius,
        border: `1px solid ${theme.palette.divider}`,
        boxShadow: CARD_SHADOW,
        padding: large ? theme.spacing(4) : theme.spacing(3),
        minHeight: large ? 220 : 180,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
        overflow: "visible",
        fontFamily: theme.typography.fontFamily,
        ...style,
      }}
    >
      <div
        style={{
          fontWeight: theme.typography.h3.fontWeight,
          fontSize: large
            ? theme.typography.h3.fontSize
            : theme.typography.h4.fontSize,
          marginBottom: 14,
          color: theme.palette.text.primary,
        }}
      >
        <span role="img" aria-label="분야">
          🏷️
        </span>{" "}
        프로젝트 분야
      </div>
      <div
        style={{
          color: theme.palette.text.secondary,
          fontSize: large
            ? theme.typography.h6.fontSize
            : theme.typography.body1.fontSize,
          marginBottom: 18,
        }}
      >
        어떤 분야의 프로젝트인지 선택해주세요
      </div>
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
      <div
        style={{
          color: theme.palette.text.disabled,
          fontSize: large ? theme.typography.body1.fontSize : "1.2rem",
          marginTop: 10,
        }}
      >
        가장 가까운 분야를 선택해주세요
      </div>
    </div>
  );
};

export default ProjectCategoryCard;
