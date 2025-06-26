import { Box, Typography } from "@mui/material";
import type { JSX } from "react";

const InfoRow = ({
  title,
  content,
  color,
}: {
  title: string;
  content: string;
  color?: "primary" | "error";
}): JSX.Element => {
  return (
    <Box display="flex" justifyContent="space-between" marginBottom={1}>
      <Typography>{title}</Typography>
      <Typography fontWeight={500} color={color || "textPrimary"}>
        {content}
      </Typography>
    </Box>
  );
};

export default InfoRow;
