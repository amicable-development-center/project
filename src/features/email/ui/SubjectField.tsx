import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { memo, type ChangeEvent, forwardRef } from "react";

interface SubjectFieldProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SubjectFieldComponent = forwardRef<HTMLInputElement, SubjectFieldProps>(
  ({ value, onChange }, ref) => (
    <EditableTextField
      ref={ref}
      label="✉️ 제목"
      value={value}
      onChange={onChange}
      placeholder="이메일 제목을 입력해주세요"
      fullWidth
      variant="outlined"
      required
      InputLabelProps={{ shrink: true }}
    />
  )
);

SubjectFieldComponent.displayName = "SubjectFieldComponent";

const SubjectField = memo(SubjectFieldComponent);

export default SubjectField;

const EditableTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    backgroundColor: theme.palette.background.paper,
    transition: "all 0.2s ease-in-out",

    "& fieldset": {
      borderColor: theme.palette.grey[400],
      borderWidth: "2px",
    },

    "&:hover fieldset": {
      borderColor: theme.palette.primary.main,
    },

    "&.Mui-focused": {
      backgroundColor: theme.palette.primary.light + "08",

      "& fieldset": {
        borderColor: theme.palette.primary.main,
        borderWidth: "2px",
      },
    },
  },

  "& .MuiInputLabel-root": {
    fontWeight: 500,

    "&.Mui-focused": {
      color: theme.palette.primary.main,
      fontWeight: 600,
    },

    "&.Mui-error": {
      color: theme.palette.error.main,
    },
  },

  "& .MuiInputBase-input": {
    fontSize: "1.4rem",

    "&::placeholder": {
      color: theme.palette.text.secondary,
      opacity: 0.7,
    },
  },
}));
