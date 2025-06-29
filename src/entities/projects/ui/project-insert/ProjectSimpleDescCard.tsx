import { TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import type { ChangeEvent, CSSProperties, JSX } from "react";

import SimpleFormCard from "@shared/ui/project-insert/SimpleFormCard";

interface ProjectSimpleDescCardProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
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
    <SimpleFormCard
      title="프로젝트 간단 소개"
      description="프로젝트에 대해 간단히 설명해주세요! (상세 설명은 다음 단계에서 작성합니다)"
      helpText="2~3줄 정도로 핵심만 간단히 써주세요!"
      large={large}
      style={style}
    >
      <TextField
        multiline
        minRows={2}
        name="simpleInfo"
        value={value}
        onChange={onChange}
        placeholder="예: 사용자의 학습 패턴을 분석하여 최적의 학습 방법을 제안하는 모바일 앱을 개발합니다."
        fullWidth
        variant="outlined"
        size="small"
        sx={{
          "& .MuiOutlinedInput-root": {
            fontSize: {
              xs: "16px",
              sm: "17px",
              md: "18px",
            },
            fontFamily: theme.typography.fontFamily,
            background: "none",
            border: "none",
            minHeight: { md: 46, sm: 43, xs: 40 },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.text.primary,
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.primary.main,
              borderWidth: "2px",
            },
          },
          "& .MuiOutlinedInput-input": {
            padding: large ? theme.spacing(1.5) : theme.spacing(1.2),
            minHeight: { md: "46px", sm: "43px", xs: "40px" },
            "&::placeholder": {
              fontSize: {
                xs: "16px",
                sm: "17px",
                md: "18px",
              },
              color: "#999",
            },
          },
        }}
        required
      />
    </SimpleFormCard>
  );
};

export default ProjectSimpleDescCard;
