import { TextField } from "@mui/material";
import { memo, type JSX, type ChangeEvent } from "react";

interface MessageFieldProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const MessageFieldComponent = ({
  value,
  onChange,
}: MessageFieldProps): JSX.Element => (
  <TextField
    label="💬 메시지"
    value={value}
    onChange={onChange}
    placeholder="프로젝트에 대한 관심이나 자기소개, 경험 등을 자유롭게 작성해주세요."
    multiline
    minRows={5}
    maxRows={10}
    fullWidth
    variant="outlined"
    required
    name="message"
    InputLabelProps={{ shrink: true }}
  />
);

const MessageField = memo(MessageFieldComponent);

export default MessageField;
