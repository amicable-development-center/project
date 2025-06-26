import { Box, styled, Typography } from "@mui/material";
import type { JSX } from "react";

// 현재는 setps를 객체로 된 배열로 관리하지만 단순한 스타일의 반복이니
// JS로 탐색 후 뿌려주는 것 보단 공통 스타일 컴포넌트를 생성하여 구성하는 것이 더 좋아보입니다!
// 추후에 여유가 될 때 리팩토링 해주시면 좋을거같습니다 ~
const steps = [
  { id: 1, title: "기본 정보" },
  { id: 2, title: "팀 구성" },
  { id: 3, title: "프로젝트 계획" },
  { id: 4, title: "모집 조건" },
];

// 스타일이 많아 코드 가독성 + 추후 재사용성을 고려하여 styled 컴포넌트로 빼내었습니다.
// 이렇게 하면 굳이 PRIMARY를 변수로 선언하지 않아도 theme에 저장된 색상을 불러올 수 있씁니다!
// key는 배열의 idx로 설정해 두었으며(가장 간단)
// '->'를 표시하기위한 삼항연산자도 간결하게 수정하였습니다
// 여기 또한 Typography에 fontSize={number} 설정은 적용되지 않으므로 삭제하엿습니다

const StepBox = ({ currentStep }: { currentStep: number }): JSX.Element => {
  return (
    <Box display="flex" justifyContent="center" gap={4} mb={5}>
      {steps.map((step, idx) => (
        <Box key={idx} display="flex" alignItems="center">
          <StepNumber active={currentStep === step.id}>{step.id}</StepNumber>
          <StepName active={currentStep === step.id}>{step.title}</StepName>
          {idx !== 3 && (
            <Box color="#bbb" fontSize={22}>
              →
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default StepBox;

const StepNumber = styled(Box, {
  //  active prop은 DOM에 전달되지 않도록 shouldForwardProp 필수
  shouldForwardProp: (prop) => prop !== "active",
})<{ active: boolean }>(({ active, theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 38,
  height: 38,
  fontSize: 18,
  fontWeight: 700,
  color: active ? "#fff" : "#888",
  background: active ? theme.palette.primary.main : "#e0e7ef",
  borderRadius: "50%",
  border: `2px solid ${active ? theme.palette.primary.main : "#e0e7ef"}`,
}));

const StepName = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "active",
})<{ active: boolean }>(({ active, theme }) => ({
  marginLeft: theme.spacing(1),
  marginRight: theme.spacing(1),
  fontWeight: active ? 700 : 500,
  color: active ? theme.palette.primary.main : "#888",
}));
