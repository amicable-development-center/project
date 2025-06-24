import { Button, styled } from "@mui/material";
import type { JSX } from "react";

interface SocialLoginButtonProps {
  label: string;
  logo: string;
  onClick: () => void;
}

const SocialButton = styled(Button)({
  width: "100%",
  marginBottom: "16px",
  textTransform: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const SocialLoginButton = ({
  label,
  logo,
  onClick,
}: SocialLoginButtonProps): JSX.Element => {
  return (
    <SocialButton variant="outlined" onClick={onClick}>
      <img
        src={logo}
        alt="Social Logo"
        style={{ width: "18px", marginRight: "8px" }}
      />
      {label}
    </SocialButton>
  );
};

export { SocialLoginButton };
