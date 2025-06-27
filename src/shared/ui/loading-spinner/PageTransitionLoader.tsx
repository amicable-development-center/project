import {
  Box,
  CircularProgress,
  Typography,
  styled,
  keyframes,
} from "@mui/material";
import type { JSX } from "react";

const PageTransitionLoader = (): JSX.Element => {
  return (
    <PageLoadingContainer>
      <AnimatedSpinnerWrapper>
        <StyledCircularProgress size={50} />
        <AnimatedLoadingText variant="h6">
          페이지로 이동 중입니다...
        </AnimatedLoadingText>
      </AnimatedSpinnerWrapper>
    </PageLoadingContainer>
  );
};

export default PageTransitionLoader;

// 애니메이션 키프레임
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const textPulse = keyframes`
  0%, 100% {
    opacity: 0.7;
  }
  50% {
    opacity: 1;
  }
`;

// 페이지 로딩용 풀스크린 컨테이너
const PageLoadingContainer = styled(Box)(() => ({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  backdropFilter: "blur(8px)",
  zIndex: 9999,
}));

// 애니메이션이 적용된 스피너 래퍼
const AnimatedSpinnerWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: theme.spacing(3),
  animation: `${fadeInUp} 0.5s ease-out`,
}));

// 애니메이션이 적용된 텍스트
const AnimatedLoadingText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 600,
  userSelect: "none",
  animation: `${textPulse} 1.5s ease-in-out infinite`,
}));

// 스타일드 CircularProgress
const StyledCircularProgress = styled(CircularProgress)(({ theme }) => ({
  color: theme.palette.primary.main,
  animationDuration: "1s",
  "& .MuiCircularProgress-circle": {
    strokeLinecap: "round",
  },
}));
