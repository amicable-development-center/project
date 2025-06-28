import type { JSX } from "react";

import { useSnackbarStore } from "@shared/stores/snackbarStore";

import SnackbarAlert from "./SnackbarAlert";

const GlobalSnackbar = (): JSX.Element => {
  const { open, message, severity, close } = useSnackbarStore();

  return (
    <SnackbarAlert
      open={open}
      onClose={close}
      message={message}
      severity={severity}
      duration={4000}
    />
  );
};

export default GlobalSnackbar;
