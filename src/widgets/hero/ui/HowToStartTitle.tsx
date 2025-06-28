import { styled, Typography } from "@mui/material";
import type { JSX } from "react";

import FadeInUpOnView from "@shared/ui/animations/FadeInUpOnView";

const HowToStartTitle = (): JSX.Element => {
  return (
    <>
      <FadeInUpOnView delay={1}>
        <MainTitle variant="h1">💬 어떻게 시작하나요?</MainTitle>
      </FadeInUpOnView>

      <FadeInUpOnView delay={2}>
        <Description>간단한 3단계로 프로젝트를 시작해보세요! 🚀</Description>
      </FadeInUpOnView>
    </>
  );
};

export default HowToStartTitle;

const MainTitle = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  marginBottom: "2.4rem",

  [theme.breakpoints.down("sm")]: {
    marginTop: "5rem",
  },
}));

const Description = styled("div")`
  margin-bottom: 1.6rem;
  font-size: 20px;
  text-align: center;
  color: gray;
`;
