import { Typography } from "@mui/material";
import type { JSX } from "react";

const TextWithEmoji = ({
  emoji,
  emoji_label,
  mainText,
  subText,
}: {
  emoji: string;
  emoji_label: string;
  mainText: string;
  subText?: string;
}): JSX.Element => {
  return (
    <>
      <Typography
        variant="h5"
        mb={0.5}
        color="#222"
        display="flex"
        alignItems="center"
        gap={1}
      >
        <span role="img" aria-label={emoji_label}>
          {emoji}
        </span>{" "}
        {mainText}
      </Typography>
      {subText && (
        <Typography color="#555" mb={2}>
          {subText}
        </Typography>
      )}
    </>
  );
};

export default TextWithEmoji;
