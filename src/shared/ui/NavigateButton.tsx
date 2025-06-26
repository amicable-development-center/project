import { Button, styled } from "@mui/material";
import type { JSX } from "react";
import { useNavigate } from "react-router-dom";

interface NavigateButtonProps {
  to: string;
  children: React.ReactNode;
  sx?: any;
}

const NavigateButton = ({
  to,
  children,
  sx,
}: NavigateButtonProps): JSX.Element => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(to);
  };
  return (
    <StyledButton
      variant="contained"
      color="primary"
      onClick={handleClick}
      sx={sx}
    >
      {children}
    </StyledButton>
  );
};

export default NavigateButton;

const StyledButton = styled(Button)(({ theme }) => ({
  fontWeight: 600,
  letterSpacing: "0.025em",
  borderRadius: theme.spacing(0.8),
  boxShadow: "none",
  transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
  "&:hover": {
    transform: "translateY(-0.1rem)",
    boxShadow: "0 4px 8px -2px rgba(37, 99, 235, 0.3)",
  },
  "&:active": {
    transform: "translateY(0)",
  },
}));
