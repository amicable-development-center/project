import { Box, CircularProgress, Typography, styled } from "@mui/material";
import type { JSX } from "react";

interface LoadingSpinnerProps {
  size?: number;
  message?: string;
  variant?: "default" | "overlay" | "minimal";
}

const LoadingSpinner = ({
  size = 40,
  message = "로딩 중...",
  variant = "default",
}: LoadingSpinnerProps): JSX.Element => {
  if (variant === "minimal") {
    return (
      <MinimalContainer>
        <StyledCircularProgress size={size} />
      </MinimalContainer>
    );
  }

  if (variant === "overlay") {
    return (
      <OverlayContainer>
        <SpinnerContainer>
          <StyledCircularProgress size={size} />
          <LoadingText variant="body2">{message}</LoadingText>
        </SpinnerContainer>
      </OverlayContainer>
    );
  }

  return (
    <DefaultContainer>
      <StyledCircularProgress size={size} />
      <LoadingText variant="body2">{message}</LoadingText>
    </DefaultContainer>
  );
};

export default LoadingSpinner;

const DefaultContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: theme.spacing(2),
  padding: theme.spacing(4),
}));

const MinimalContainer = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const OverlayContainer = styled(Box)(() => ({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  backdropFilter: "blur(2px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999,
}));

const SpinnerContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: theme.spacing(2),
  padding: theme.spacing(3),
  backgroundColor: "white",
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[8],
}));

const StyledCircularProgress = styled(CircularProgress)(({ theme }) => ({
  color: theme.palette.primary.main,
  animationDuration: "1s",
  "& .MuiCircularProgress-circle": {
    strokeLinecap: "round",
  },
}));

const LoadingText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontWeight: 500,
  userSelect: "none",
}));
