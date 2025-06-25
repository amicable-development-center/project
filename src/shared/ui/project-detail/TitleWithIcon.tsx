import { Box, Typography, type SvgIconProps } from "@mui/material";
import type { JSX } from "react";

const TitleWithIcon = ({
  Icon,
  title,
}: {
  Icon: React.ElementType<SvgIconProps>;
  title: string;
}): JSX.Element => {
  return (
    <Box display={"flex"} alignItems={"center"} gap={1}>
      <Icon fontSize="large" color="primary" />
      <Typography variant="h3">{title}</Typography>
    </Box>
  );
};

export default TitleWithIcon;
