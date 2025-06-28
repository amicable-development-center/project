import { TextField } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import type { ChangeEvent, CSSProperties, JSX } from "react";

import SimpleFormCard from "@shared/ui/project-insert/SimpleFormCard";

interface ProjectDetailDescriptionCardProps {
  value: string;
  onChange: (value: string) => void;
  large?: boolean;
  style?: CSSProperties;
}

const ProjectDetailDescriptionCard = ({
  value,
  onChange,
  large,
  style,
}: ProjectDetailDescriptionCardProps): JSX.Element => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    onChange(e.target.value);
  };

  return (
    <SimpleFormCard
      title="프로젝트 상세 설명"
      description="프로젝트에 대해 자세히 설명해주세요. 목표, 주요 기능, 기대 효과 등을 포함해주세요!"
      helpText="마크다운 형식으로 작성하면 더 보기 좋아요!"
      large={large}
      style={style}
    >
      <TextField
        value={value}
        onChange={handleChange}
        placeholder={`## 🎯 프로젝트 목표
AI 기술을 활용하여 개인별 학습 패턴을 분석하고, 최적화된 학습 계획을 제공하는 모바일 애플리케이션을 개발합니다.

## ✨ 주요 기능
- 개인 맞춤형 학습 계획 생성
- 학습 진도 및 성취도 추적
- AI 기반 문제 추천 시스템

## 🚀 기대 효과
- 개인화된 학습으로 학습 효율성 30% 향상
- 학습 동기 부여 및 지속성 증대`}
        multiline // 여러 줄 입력 가능
        minRows={large ? 12 : 8}
        maxRows={large ? 20 : 15}
        fullWidth
        variant="outlined"
        sx={{
          "& .MuiOutlinedInput-root": {
            fontSize: isMobile
              ? theme.typography.body2.fontSize
              : large
                ? theme.typography.h5.fontSize
                : theme.typography.body1.fontSize,
            fontFamily: "monospace",
            lineHeight: 1.6,
            padding: 0,
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.text.primary,
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.primary.main,
              borderWidth: "2px",
            },
          },
          "& .MuiOutlinedInput-input": {
            padding: large ? theme.spacing(2.5) : theme.spacing(2),
            resize: "vertical",
          },
        }}
      />
    </SimpleFormCard>
  );
};

export default ProjectDetailDescriptionCard;
