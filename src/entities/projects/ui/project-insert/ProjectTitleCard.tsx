import { TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import type { ChangeEvent, CSSProperties, JSX } from "react";

import SimpleFormCard from "@shared/ui/project-insert/SimpleFormCard";

interface ProjectTitleCardProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  large?: boolean;
  style?: CSSProperties;
}

const ProjectTitleCard = ({
  value,
  onChange,
  large,
  style,
}: ProjectTitleCardProps): JSX.Element => {
  const theme = useTheme();

  return (
    <SimpleFormCard
      title="프로젝트 이름"
      description="언제 프로젝트인지 한 눈에 알 수 있는 이름을 지어주세요!"
      helpText="간단하게 기억하기 쉬운 이름이 좋아요!"
      large={large}
      style={style}
    >
      <TextField
        type="text"
        name="title"
        value={value}
        onChange={onChange}
        placeholder="예: 우리 동네 맛집 찾기 앱"
        fullWidth
        variant="outlined"
        size="small"
        sx={{
          "& .MuiOutlinedInput-root": {
            height: 40,
            fontSize: large
              ? theme.typography.h5.fontSize
              : theme.typography.body1.fontSize,
            fontFamily: theme.typography.fontFamily,
            background: "none",
            border: "none",

            // 호버 시 테두리 검정색
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.text.primary,
            },
            // 포커스 시 테두리 primary 색상
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.primary.main,
              borderWidth: "2px",
            },
          },
          "& .MuiOutlinedInput-input": {
            padding: large ? theme.spacing(2.2) : theme.spacing(1.7),
          },
        }}
        required
      />
    </SimpleFormCard>
  );
};

export default ProjectTitleCard;
