import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { memo, type JSX, type ChangeEvent } from "react";

interface SubjectFieldProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SubjectFieldComponent = ({
  value,
  onChange,
}: SubjectFieldProps): JSX.Element => (
  <StyledTextField
    label="✉️ 제목"
    value={value}
    onChange={onChange}
    placeholder="이메일 제목을 입력해주세요"
    fullWidth
    variant="outlined"
    required
    InputLabelProps={{ shrink: true }}
  />
);

const SubjectField = memo(SubjectFieldComponent);

export default SubjectField;

const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    fontSize: "1.4rem",
    fontFamily: "inherit",
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#222",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#1976d2",
      borderWidth: "2px",
    },
  },
  "& .MuiInputLabel-root": {
    fontSize: "1.4rem",
  },
});
