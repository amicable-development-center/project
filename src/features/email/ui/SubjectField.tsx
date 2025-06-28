import { TextField } from "@mui/material";
import { memo, type JSX, type ChangeEvent } from "react";

interface SubjectFieldProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SubjectFieldComponent = ({
  value,
  onChange,
}: SubjectFieldProps): JSX.Element => (
  <TextField
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
