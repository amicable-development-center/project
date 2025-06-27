import { Button, styled } from "@mui/material";
import type { JSX } from "react";

interface SubmitButtonProps {
  onClick: () => void;
  text?: string;
}

const SubmitButton = ({
  onClick,
  text = "회원가입 완료",
}: SubmitButtonProps): JSX.Element => {
  return <SignupButton onClick={onClick}>{text}</SignupButton>;
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
