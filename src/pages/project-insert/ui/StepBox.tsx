import { Box, styled, Typography } from "@mui/material";
import type { JSX } from "react";

// TODO: JS로 탐색 후 뿌려주는 방법 -> 공통 스타일 컴포넌트 생성하여 구성 처리 예정

const steps = [
  { id: 1, title: "기본 정보" },
  { id: 2, title: "팀 구성" },
  { id: 3, title: "프로젝트 계획" },
  { id: 4, title: "모집 조건" },
];

const StepBox = ({ currentStep }: { currentStep: number }): JSX.Element => {
  return (
    <StepContainer>
      <StepWrapper>
        {steps.map((step, idx) => (
          <StepItem key={idx}>
            <StepCircleContainer>
              <StepNumber active={currentStep >= step.id}>{step.id}</StepNumber>
              {idx !== steps.length - 1 && (
                <ConnectingLine active={currentStep > step.id} />
              )}
            </StepCircleContainer>
            <StepName active={currentStep === step.id}>{step.title}</StepName>
          </StepItem>
        ))}
      </StepWrapper>
    </StepContainer>
  );
};

export default StepBox;

const StepContainer = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  marginBottom: 40,
}));

const StepWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  maxWidth: 480,
  width: "100%",

  [theme.breakpoints.up("sm")]: {
    maxWidth: 540,
  },

  [theme.breakpoints.up("md")]: {
    maxWidth: 600,
  },
}));

const StepItem = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  flex: 1,
  position: "relative",
}));

const StepCircleContainer = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  position: "relative",
}));

const StepNumber = styled(Box, {
  shouldForwardProp: (prop) => prop !== "active",
})<{ active: boolean }>(({ active, theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 40,
  height: 40,
  fontSize: 16,
  fontWeight: 700,
  color: active ? "#fff" : "#888",
  background: active ? theme.palette.primary.main : "#fff",
  borderRadius: "50%",
  border: `2px solid ${active ? theme.palette.primary.main : theme.palette.divider}`,
  position: "relative",
  zIndex: 2,

  [theme.breakpoints.up("sm")]: {
    width: 45,
    height: 45,
    fontSize: 17,
  },

  [theme.breakpoints.up("md")]: {
    width: 50,
    height: 50,
    fontSize: 18,
  },
}));

const ConnectingLine = styled(Box, {
  shouldForwardProp: (prop) => prop !== "active",
})<{ active: boolean }>(({ active, theme }) => ({
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translateY(-50%)",
  width: "calc(100% - 20px)",
  height: 2,
  backgroundColor: active ? theme.palette.primary.main : theme.palette.divider,
  zIndex: 1,

  [theme.breakpoints.up("sm")]: {
    width: "calc(100% - 22px)",
  },

  [theme.breakpoints.up("md")]: {
    width: "calc(100% - 25px)",
  },
}));

const StepName = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "active",
})<{ active: boolean }>(({ active, theme }) => ({
  marginTop: theme.spacing(0.8),
  fontWeight: active ? 700 : 500,
  color: active ? theme.palette.primary.main : "#888",
  textAlign: "center",
  whiteSpace: "nowrap",
  fontSize: "12px",

  [theme.breakpoints.up("sm")]: {
    marginTop: theme.spacing(1),
    fontSize: "13px",
  },

  [theme.breakpoints.up("md")]: {
    fontSize: "14px",
  },
}));
