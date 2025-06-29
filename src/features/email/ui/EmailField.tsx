import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { memo, type JSX } from "react";

interface EmailFieldProps {
  label: string;
  value: string;
}

const EmailFieldComponent = ({
  label,
  value,
}: EmailFieldProps): JSX.Element => (
  <ReadOnlyTextField
    label={label}
    value={value}
    disabled
    fullWidth
    variant="outlined"
    InputLabelProps={{ shrink: true }}
  />
);

const EmailField = memo(EmailFieldComponent);

export default EmailField;

const ReadOnlyTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    backgroundColor: theme.palette.grey[50],
    borderStyle: "dashed",

    "& fieldset": {
      borderColor: theme.palette.grey[300],
      borderStyle: "dashed",
      borderWidth: "1px",
    },

    "&:hover fieldset": {
      borderColor: theme.palette.grey[400],
      borderStyle: "dashed",
    },

    "&.Mui-disabled": {
      "& fieldset": {
        borderStyle: "dashed",
        borderColor: theme.palette.grey[300],
      },
    },
  },

  "& .MuiInputBase-input.Mui-disabled": {
    color: theme.palette.text.secondary,
    WebkitTextFillColor: theme.palette.text.secondary,
    opacity: 0.8,
  },

  "& .MuiInputLabel-root.Mui-disabled": {
    color: theme.palette.text.secondary,
    opacity: 0.7,
  },
}));
