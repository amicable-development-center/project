import { Button, styled } from "@mui/material";
import type { JSX } from "react";

const SubmitButton = ({ onClick }: { onClick: () => void }): JSX.Element => {
  return <SignupButton onClick={onClick}>회원가입 완료</SignupButton>;
};

export default SubmitButton;

const SignupButton = styled(Button)({
  width: "100%",
  marginBottom: "16px",
  textTransform: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
