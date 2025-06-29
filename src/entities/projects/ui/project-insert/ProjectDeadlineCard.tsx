import { TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import type { ChangeEvent, CSSProperties, JSX } from "react";

import SimpleFormCard from "@shared/ui/project-insert/SimpleFormCard";

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
}: ProjectDeadlineCardProps): JSX.Element => {
  const theme = useTheme();

  return (
    <SimpleFormCard
      title="모집 마감일"
      description="언제까지 팀원을 모집할까요?"
      helpText="충분한 시간을 두고 설정하세요!"
      large={large}
      style={style}
    >
      <TextField
        type="date"
        name="deadline"
        value={value}
        onChange={onChange}
        fullWidth
        variant="outlined"
        size="small"
        slotProps={{
          inputLabel: {
            shrink: true,
          },
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            height: { xs: 40, sm: 48 },
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
          },
        }}
        required
      />
    </SimpleFormCard>
  );
};

export default ProjectDeadlineCard;
