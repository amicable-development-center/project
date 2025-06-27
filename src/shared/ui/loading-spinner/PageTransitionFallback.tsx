import { Box, Typography, styled, keyframes } from "@mui/material";
import type { JSX } from "react";

interface PageTransitionFallbackProps {
  message?: string;
  variant?: "minimal" | "standard";
}

const PageTransitionFallback = ({
  message = "페이지 이동 중...",
  variant = "standard",
}: PageTransitionFallbackProps): JSX.Element => {
  if (variant === "minimal") {
    return (
      <MinimalContainer>
        <MinimalSpinner />
      </MinimalContainer>
    );
  }

  return (
    <TransitionContainer>
      <ContentWrapper>
        <SpinnerWrapper>
          <OuterRing />
          <MiddleRing />
          <InnerRing />
        </SpinnerWrapper>

        <TransitionMessage variant="body1">{message}</TransitionMessage>

        <PulseEffect />
      </ContentWrapper>
    </TransitionContainer>
  );
};

export default PageTransitionFallback;

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ripple = keyframes`
  0% {
    transform: scale(0.8);
    opacity: 1;
  }
  100% {
    transform: scale(2.4);
    opacity: 0;
  }
`;

const TransitionContainer = styled(Box)(() => ({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  backdropFilter: "blur(8px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9998,
}));

const MinimalContainer = styled(Box)(() => ({
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: 9998,
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: theme.spacing(2),
  position: "relative",
  animation: `${fadeIn} 0.3s ease-out`,
}));

const SpinnerWrapper = styled(Box)(() => ({
  position: "relative",
  width: "60px",
  height: "60px",
}));

const Ring = styled(Box)(() => ({
  position: "absolute",
  borderRadius: "50%",
  border: "2px solid transparent",
}));

const OuterRing = styled(Ring)(({ theme }) => ({
  width: "60px",
  height: "60px",
  borderTopColor: theme.palette.primary.main,
  borderRightColor: theme.palette.primary.main,
  animation: `${spin} 1.2s linear infinite`,
  opacity: 0.8,
}));

const MiddleRing = styled(Ring)(({ theme }) => ({
  width: "45px",
  height: "45px",
  top: "7.5px",
  left: "7.5px",
  borderTopColor: theme.palette.secondary.main,
  borderLeftColor: theme.palette.secondary.main,
  animation: `${spin} 1s linear infinite reverse`,
  opacity: 0.6,
}));

const InnerRing = styled(Ring)(({ theme }) => ({
  width: "30px",
  height: "30px",
  top: "15px",
  left: "15px",
  borderTopColor: theme.palette.primary.light,
  borderBottomColor: theme.palette.primary.light,
  animation: `${spin} 0.8s linear infinite`,
  opacity: 0.4,
}));

const MinimalSpinner = styled(Box)(({ theme }) => ({
  width: "24px",
  height: "24px",
  border: `2px solid ${theme.palette.grey[300]}`,
  borderTop: `2px solid ${theme.palette.primary.main}`,
  borderRadius: "50%",
  animation: `${spin} 1s linear infinite`,
}));

const TransitionMessage = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontWeight: 500,
  textAlign: "center",
  animation: `${fadeIn} 0.5s ease-out 0.1s both`,
}));

const PulseEffect = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "60px",
  height: "60px",
  transform: "translate(-50%, -50%)",
  border: `1px solid ${theme.palette.primary.main}`,
  borderRadius: "50%",
  animation: `${ripple} 2s ease-out infinite`,
  pointerEvents: "none",
}));
