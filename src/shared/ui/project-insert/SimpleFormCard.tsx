import { useTheme } from "@mui/material/styles";
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

  const cardStyles = {
    container: {
      background: theme.palette.background.paper,
      borderRadius: theme.shape.borderRadius,
      border: `1px solid ${theme.palette.divider}`,
      padding: large ? theme.spacing(3) : theme.spacing(2),
      minHeight: large ? 220 : 180,
      display: "flex",
      flexDirection: "column" as const,
      justifyContent: "center",
      width: "100%",
      overflow: "visible",
      fontFamily: theme.typography.fontFamily,
      transition: "all 0.2s ease-in-out",
      ...style,
    } as CSSProperties,

    title: {
      fontWeight: theme.typography.h3.fontWeight,
      fontSize: large
        ? theme.typography.h3.fontSize
        : theme.typography.h4.fontSize,
      marginBottom: 14,
      color: theme.palette.text.primary,
      display: "flex",
      alignItems: "center",
    } as CSSProperties,

    description: {
      color: "#6f6f72",
      fontSize: large
        ? theme.typography.h5.fontSize
        : theme.typography.body1.fontSize,
      marginBottom: 18,
      lineHeight: 1.5,
    } as CSSProperties,

    helpText: {
      color: "#bbb",
      fontSize: large ? theme.typography.body1.fontSize : "1.2rem",
      marginTop: 8,
    } as CSSProperties,

    // children을 위한 컨테이너 스타일
    content: {
      marginBottom: helpText ? 8 : 0,
    } as CSSProperties,
  };

  return (
    <div style={cardStyles.container}>
      <div style={cardStyles.title}>
        <span role="img" aria-label={title}>
          {icon}
        </span>
        {title}
      </div>

      <div style={cardStyles.description}>{description}</div>

      <div style={cardStyles.content}>{children}</div>

      {helpText && <div style={cardStyles.helpText}>{helpText}</div>}
    </div>
  );
};

export default SimpleFormCard;
