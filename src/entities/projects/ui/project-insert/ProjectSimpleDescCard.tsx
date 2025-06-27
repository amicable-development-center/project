import { TextField } from "@mui/material";
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
        InputProps={{
          sx: {
            fontSize: 16,
            fontFamily: "inherit",
            background: "none",
            border: "none",
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#222",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#1976d2",
              borderWidth: "2px",
            },
          },
        }}
        inputProps={{
          style: {
            padding: large ? 5 : 5,
            fontSize: 16,
            color: "#222",
          },
        }}
        required
      />
    </SimpleFormCard>
  );
};

export default ProjectSimpleDescCard;
