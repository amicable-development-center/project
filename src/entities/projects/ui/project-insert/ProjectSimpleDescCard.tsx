import { useTheme } from "@mui/material/styles";
import type { ChangeEvent, CSSProperties, JSX } from "react";

interface ProjectSimpleDescCardProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  large?: boolean;
  style?: CSSProperties;
}

const ProjectSimpleDescCard = ({
  value,
  onChange,
  large,
  style,
}: ProjectSimpleDescCardProps): JSX.Element => {
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
        width: "100%",
        gridColumn: "1 / -1",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        marginTop: 0,
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
        <span role="img" aria-label="소개">
          📝
        </span>{" "}
        프로젝트 간단 소개
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
        프로젝트에 대해 간단히 설명해주세요! (상세 설명은 다음 단계에서
        작성합니다)
      </div>
      <textarea
        name="description"
        value={value}
        onChange={onChange}
        placeholder="예: 사용자의 학습 패턴을 분석하여 최적의 학습 방법을 제안하는 모바일 앱을 개발합니다."
        rows={3}
        style={{
          width: "100%",
          padding: large ? theme.spacing(2.2) : theme.spacing(1.7),
          borderRadius: theme.shape.borderRadius,
          border: `1px solid ${theme.palette.divider}`,
          fontSize: large
            ? theme.typography.h5.fontSize
            : theme.typography.body1.fontSize,
          marginBottom: 8,
          resize: "vertical",
          minHeight: 40,
          overflow: "visible",
          fontFamily: theme.typography.fontFamily,
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
        2-3줄 정도로 핵심만 간단히 써주세요!
      </div>
    </div>
  );
};

export default ProjectSimpleDescCard;
