import { Box, styled } from "@mui/material";
import type { JSX } from "react";

import BackToHome from "@widgets/BackToHome/BackToHome";
import JoinForm from "@widgets/Join/JoinForm";

const JoinPage = (): JSX.Element => {
  return (
    <JoinPageContainer>
      <JoinForm />
      <BackToHome />
    </JoinPageContainer>
  );
};

export default JoinPage;

const JoinPageContainer = styled(Box)({
  display: "flex",
  width: "100%",
  height: "100dvh",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#f5f7fd",
});
