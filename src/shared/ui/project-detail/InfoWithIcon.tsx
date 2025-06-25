import { Box, Typography, type SvgIconProps } from "@mui/material";
import type { JSX } from "react";

const InfoWithIcon = ({
  item,
  Icon,
  content,
}: {
  item: string;
  Icon: React.ElementType<SvgIconProps>;
  content: string;
}): JSX.Element => {
  return (
    <Box display="flex" alignItems="center" flex={1}>
      <Icon fontSize="large" color="primary" />
      <div>
        <Typography variant="body2" color="gray">
          {item}
        </Typography>
        <Typography variant="h6">{content}</Typography>
      </div>
    </Box>
  );
};

export default InfoWithIcon;
