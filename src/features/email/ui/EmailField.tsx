import { TextField } from "@mui/material";
import { memo, type JSX } from "react";

interface EmailFieldProps {
  label: string;
  value: string;
}

const EmailFieldComponent = ({
  label,
  value,
}: EmailFieldProps): JSX.Element => (
  <TextField
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
