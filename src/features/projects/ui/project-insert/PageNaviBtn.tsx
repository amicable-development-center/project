import { Box, Button, styled } from "@mui/material";
import type { JSX } from "react";

const PageNaviBtn = ({
  currentStep,
  handlePrev,
  handleNext,
}: {
  currentStep: number;
  handlePrev: () => void;
  handleNext: () => void;
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

      <Button variant="contained" onClick={handleNext}>
        {currentStep < 4 ? "다음 단계 →" : " 프로젝트 등록하기"}
      </Button>
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
