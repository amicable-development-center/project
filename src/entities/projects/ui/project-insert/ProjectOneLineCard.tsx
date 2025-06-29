import { TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import type { ChangeEvent, CSSProperties, JSX } from "react";

import SimpleFormCard from "@shared/ui/project-insert/SimpleFormCard";

interface ProjectOneLineCardProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  large?: boolean;
  style?: CSSProperties;
}

const ProjectOneLineCard = ({
  value,
  onChange,
  large,
  style,
}: ProjectOneLineCardProps): JSX.Element => {
  const theme = useTheme();

  return (
    <SimpleFormCard
      title="한 줄 소개"
      description="프로젝트를 한 줄로 매력적으로 소개해주세요!"
      helpText="이모지를 활용하면 더 눈에 띄어요!"
      large={large}
      style={style}
    >
      <TextField
        type="text"
        name="subtitle"
        value={value}
        onChange={onChange}
        placeholder="예: 개인 맞춤형 학습으로 공부 효율을 높여보세요!"
        fullWidth
        variant="outlined"
        size="small"
        sx={{
          "& .MuiOutlinedInput-root": {
            height: 40,
            fontSize: {
              xs: "16px",
              sm: "17px",
              md: "18px",
            },
            fontFamily: theme.typography.fontFamily,
            background: "none",
            border: "none",

            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.text.primary,
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.primary.main,
              borderWidth: "2px",
            },
          },
          "& .MuiOutlinedInput-input": {
            padding: large ? theme.spacing(2.2) : theme.spacing(1.7),
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

export default ProjectOneLineCard;
