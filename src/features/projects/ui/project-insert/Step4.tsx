import { Box, styled } from "@mui/material";
import type { JSX } from "react";

const Step4 = (): JSX.Element => {
  return <StepBox>Step4</StepBox>;
};

export default Step4;

export const StepBox = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr", // 기본값(xs)
  gap: theme.spacing(2), // 기본값(sm 이하)
  marginBottom: 0,

  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "1fr 1fr",
    gap: theme.spacing(4),
  },
}));
