import { useTheme } from "@mui/material/styles";
import type { ChangeEvent, CSSProperties } from "react";

interface ProjectDeadlineCardProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  large?: boolean;
  style?: CSSProperties;
}

const ProjectDeadlineCard = ({
  value,
  onChange,
  large,
  style,
}: ProjectDeadlineCardProps) => {
  const theme = useTheme();
  return (
    <div
      style={{
        background: theme.palette.background.paper,
        borderRadius: theme.shape.borderRadius,
        border: `1px solid ${theme.palette.divider}`,
        boxShadow:
          "0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)",
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
        <span role="img" aria-label="마감">
          📅
        </span>{" "}
        모집 마감일
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
        언제까지 팀원을 모집할까요?
      </div>
      <input
        type="date"
        name="deadline"
        value={value}
        onChange={onChange}
        style={{
          width: "100%",
          padding: large ? theme.spacing(2.2) : theme.spacing(1.7),
          borderRadius: theme.shape.borderRadius,
          border: `1px solid ${theme.palette.divider}`,
          fontSize: large
            ? theme.typography.h5.fontSize
            : theme.typography.body1.fontSize,
          marginBottom: 8,
          fontFamily: theme.typography.fontFamily,
          height: 40,
          boxSizing: "border-box",
          background: theme.palette.background.paper,
        }}
        required
      />
      <div
        style={{
          color: "#bbb",
          fontSize: large ? theme.typography.body1.fontSize : "1.2rem",
        }}
      >
        충분한 시간을 두고 설정하세요!
      </div>
    </div>
  );
};

export default ProjectDeadlineCard;
