import { Box, useTheme } from "@mui/material";
import type { CSSProperties, JSX, ReactNode } from "react";

interface SimpleFormCardProps {
  icon?: string;
  title: string;
  description: string;
  children?: ReactNode;
  helpText?: string;
  large?: boolean;
  style?: CSSProperties;
}

const SimpleFormCard = ({
  icon,
  title,
  description,
  children,
  helpText,
  large,
  style,
}: SimpleFormCardProps): JSX.Element => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        background: theme.palette.background.paper,
        borderRadius: "8px",
        border: `1px solid ${theme.palette.divider}`,
        padding: {
          xs: large ? theme.spacing(2) : theme.spacing(1.5),
          sm: large ? theme.spacing(2.5) : theme.spacing(2),
          md: large ? theme.spacing(3) : theme.spacing(2),
        },
        minHeight: {
          xs: large ? 180 : 140,
          md: large ? 220 : 180,
        },
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
        overflow: "visible",
        fontFamily: theme.typography.fontFamily,
        transition: "all 0.2s ease-in-out",
        ...style,
      }}
    >
      {/* Title */}
      <Box
        sx={{
          fontWeight: theme.typography.h3.fontWeight,
          fontSize: {
            xs: "1.8rem",
            sm: "1.9rem",
            md: theme.typography.h3.fontSize,
          },
          marginBottom: "14px",
          color: theme.palette.text.primary,
          display: "flex",
          alignItems: "center",
        }}
      >
        {icon && (
          <span role="img" aria-label={title}>
            {icon}
          </span>
        )}
        {title}
      </Box>

      {/* Description */}
      <Box
        sx={{
          color: "#6f6f72",
          fontSize: {
            xs: "1.4rem",
            sm: "1.5rem",
            md: "1.6rem",
          },
          marginBottom: "18px",
          lineHeight: 1.5,
        }}
      >
        {description}
      </Box>

      {/* Content */}
      <Box
        sx={{
          marginBottom: helpText ? "8px" : 0,
        }}
      >
        {children}
      </Box>

      {/* Help Text */}
      {helpText && (
        <Box
          sx={{
            color: "#bbb",
            fontSize: {
              xs: "1.3rem",
              sm: "1.4rem",
              md: "1.5rem",
            },
            marginTop: "8px",
          }}
        >
          {helpText}
        </Box>
      )}
    </Box>
  );
};

export default SimpleFormCard;
