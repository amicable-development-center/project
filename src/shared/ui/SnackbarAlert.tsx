import {
  Snackbar,
  Alert,
  type AlertColor,
  type SnackbarOrigin,
} from "@mui/material";
import type { JSX } from "react";

interface SnackbarAlertProps {
  open: boolean;
  onClose: () => void;
  message: string;
  severity?: AlertColor;
  duration?: number;
  anchorOrigin?: SnackbarOrigin;
}

const SnackbarAlert = ({
  open,
  onClose,
  message,
  severity = "success",
  duration = 2500,
  anchorOrigin = { vertical: "top", horizontal: "center" },
}: SnackbarAlertProps): JSX.Element => (
  <Snackbar
    open={open}
    autoHideDuration={duration}
    onClose={onClose}
    anchorOrigin={anchorOrigin}
  >
    <Alert severity={severity} sx={{ width: "100%" }}>
      {message}
    </Alert>
  </Snackbar>
);

export default SnackbarAlert;
