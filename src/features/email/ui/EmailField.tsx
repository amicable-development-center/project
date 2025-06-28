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
  <StyledTextField
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
    "&.Mui-disabled": {
      backgroundColor: "#f5f5f5",
    },
  },
  "& .MuiInputLabel-root": {
    fontSize: "1.4rem",
  },
});
