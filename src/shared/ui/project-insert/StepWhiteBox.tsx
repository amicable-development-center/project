import { Box, Button, styled } from "@mui/material";
import type { JSX, ReactNode } from "react";

const StepWhiteBox = ({
  children,
  stepNum,
  ...props
}: {
  stepNum: number;
  onClick: () => void;
  children: ReactNode;
}): JSX.Element => {
  return (
    <>
      <StepBox>{children}</StepBox>

      <Box display="flex" justifyContent="flex-end" mt={4}>
        <Button variant="contained" {...props}>
          {stepNum < 4 ? "다음 단계 →" : " 프로젝트 등록하기"}
        </Button>
      </Box>
    </>
  );
};

export default StepWhiteBox;

export const StepBox = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: theme.spacing(2),

  marginBottom: 0,

  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "1fr 1fr",
    gap: theme.spacing(4),
  },
}));
