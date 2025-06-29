import { Box, styled, alpha } from "@mui/material";
import type { SxProps, Theme } from "@mui/material";
import type { JSX } from "react";
import { useNavigate } from "react-router-dom";

import Logo from "./icons/logo.svg";

interface LogoBoxProps {
  size?: "small" | "medium" | "large";
  onClick?: () => void;
  showText?: boolean;
  text?: string;
  className?: string;
  disableHover?: boolean;
  sx?: SxProps<Theme>;
}

const LogoBox = ({
  size = "medium",
  onClick,
  showText = true,
  text = "프로젝트 잼",
  className,
  disableHover = false,
  sx,
}: LogoBoxProps): JSX.Element => {
  const navigate = useNavigate();

  const handleClick = (): void => {
    if (onClick) {
      onClick();
    } else {
      navigate("/");
    }
  };

  return (
    <StyledLogoBox
      onClick={handleClick}
      $size={size}
      className={className}
      $disableHover={disableHover}
      sx={sx}
    >
      <LogoImage src={Logo} alt="프로젝트 잼" $size={size} />
      {showText && <LogoText $size={size}>{text}</LogoText>}
    </StyledLogoBox>
  );
};

export default LogoBox;

const StyledLogoBox = styled(Box)<{
  $size: "small" | "medium" | "large";
  $disableHover?: boolean;
}>(({ theme, $size, $disableHover }) => ({
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  padding:
    $size === "small"
      ? "0.3rem 0.8rem"
      : $size === "medium"
        ? "0.5rem 1rem"
        : "0.8rem 1.5rem",
  borderRadius: theme.spacing(1.5),
  transition: "all 0.2s ease-in-out",
  ...(!!$disableHover
    ? {}
    : {
        "&:hover": {
          backgroundColor: alpha(theme.palette.primary.main, 0.08),
          transform: "translateY(-1px)",
        },
      }),
}));

const LogoImage = styled("img")<{ $size: "small" | "medium" | "large" }>(
  ({ theme, $size }) => ({
    height:
      $size === "small" ? "2.4rem" : $size === "medium" ? "3.2rem" : "4rem",
    width:
      $size === "small" ? "2.4rem" : $size === "medium" ? "3.2rem" : "4rem",
    marginRight:
      $size === "small"
        ? theme.spacing(0.8)
        : $size === "medium"
          ? theme.spacing(1)
          : theme.spacing(1.5),
    filter: "drop-shadow(0 0.2rem 0.4rem rgba(0,0,0,0.1))",
    transition: "transform 0.2s ease-in-out",

    [theme.breakpoints.down("md")]: {
      height:
        $size === "small" ? "2rem" : $size === "medium" ? "2.8rem" : "3.2rem",
      width:
        $size === "small" ? "2rem" : $size === "medium" ? "2.8rem" : "3.2rem",
      marginRight:
        $size === "small"
          ? theme.spacing(0.6)
          : $size === "medium"
            ? theme.spacing(0.8)
            : theme.spacing(1),
    },
  })
);

const LogoText = styled("span")<{ $size: "small" | "medium" | "large" }>(
  ({ theme, $size }) => ({
    fontWeight: 700,
    fontSize:
      $size === "small" ? "1.2rem" : $size === "medium" ? "1.5rem" : "1.875rem",
    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    letterSpacing: "-0.5px",

    [theme.breakpoints.down("md")]: {
      fontSize:
        $size === "small" ? "1.4rem" : $size === "medium" ? "1.6rem" : "1.8rem",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize:
        $size === "small" ? "1.2rem" : $size === "medium" ? "1.4rem" : "1.6rem",
    },
  })
);
