import { useTheme } from "@mui/material/styles";
import type { ChangeEvent, CSSProperties, JSX } from "react";

interface ProjectTitleCardProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  large?: boolean;
  style?: CSSProperties;
}

const CARD_SHADOW =
  "0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)";

const ProjectTitleCard = ({
  value,
  onChange,
  large,
  style,
}: ProjectTitleCardProps): JSX.Element => {
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
        <span role="img" aria-label="이름">
          🍑
        </span>{" "}
        프로젝트 이름
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
        언제 프로젝트인지 한 눈에 알 수 있는 이름을 지어주세요!
      </div>
      <input
        type="text"
        name="title"
        value={value}
        onChange={onChange}
        placeholder="예: 우리 동네 맛집 찾기 앱"
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
        간단하게 기억하기 쉬운 이름이 좋아요!
      </div>
    </div>
  );
};

export default ProjectTitleCard;
