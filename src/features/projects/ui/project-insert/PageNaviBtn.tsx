import { Box, Button, styled } from "@mui/material";
import type { JSX } from "react";

const PageNaviBtn = ({
  currentStep,
  handlePrev,
  handleNext,
  handleSubmit, // type=submit 버튼이 노출될 때 submit이 실행되는 오류가 있어서 임시로 ..
}: {
  currentStep: number;
  handlePrev: () => void;
  handleNext: () => void;
  handleSubmit: () => void;
}): JSX.Element => {
  return (
    <Box display="flex" justifyContent="space-between" mt={4}>
      {currentStep === 1 ? (
        <div />
      ) : (
        <PrevBtn variant="outlined" onClick={handlePrev}>
          이전 단계
        </PrevBtn>
      )}

      {currentStep < 4 ? (
        <Button variant="contained" onClick={handleNext}>
          다음 단계 →
        </Button>
      ) : (
        <Button onClick={handleSubmit} variant="contained">
          프로젝트 등록하기
        </Button>
      )}
    </Box>
  );
};

export default PageNaviBtn;

const PrevBtn = styled(Button)`
  color: black;
  background-color: white;
  border: 1px solid #dddddd;

  &:hover {
    background-color: #f4f4f4;
  }
`;
