import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { memo, type JSX, type ChangeEvent } from "react";

interface MessageFieldProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const MessageFieldComponent = ({
  value,
  onChange,
}: MessageFieldProps): JSX.Element => (
  <EditableMultilineTextField
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

const EditableMultilineTextField = styled(TextField)(({ theme }) => ({
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
    lineHeight: 1.6,

    "&::placeholder": {
      color: theme.palette.text.secondary,
      opacity: 0.7,
    },
  },
}));
