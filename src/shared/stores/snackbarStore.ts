import { create } from "zustand";

interface SnackbarState {
  open: boolean;
  message: string;
  severity: "success" | "error" | "warning" | "info";
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
  showWarning: (message: string) => void;
  showInfo: (message: string) => void;
  close: () => void;
}

export const useSnackbarStore = create<SnackbarState>((set) => ({
  open: false,
  message: "",
  severity: "success",
  showSuccess: (message: string) =>
    set({ open: true, message, severity: "success" }),
  showError: (message: string) =>
    set({ open: true, message, severity: "error" }),
  showWarning: (message: string) =>
    set({ open: true, message, severity: "warning" }),
  showInfo: (message: string) => set({ open: true, message, severity: "info" }),
  close: () => set({ open: false }),
}));
