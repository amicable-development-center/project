import { Box, Typography, type SvgIconProps } from "@mui/material";
import type { JSX } from "react";

const TitleWithIcon = ({
  title,
  Icon,
  color = "primary",
  marginBottom = 2,
}: {
  title: string;
  Icon: React.ElementType<SvgIconProps>;
  color?: "primary" | "success" | "warning";
  marginBottom?: number;
}): JSX.Element => {
  return (
    <Box
      gap={1}
      display={"flex"}
      alignItems={"center"}
      marginBottom={marginBottom}
    >
      <Icon fontSize="large" color={color} />
      <Typography variant="h3">{title}</Typography>
    </Box>
  );
};

export default TitleWithIcon;
