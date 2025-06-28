import { Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import type { CSSProperties, JSX } from "react";

import type { User } from "@shared/types/user";

interface UserProfileWithNamePositionProps {
  name?: string;
  userRole: User["userRole"];
  flexDirection?: CSSProperties["flexDirection"];
}

const UserProfileWithNamePosition = ({
  name,
  userRole,
  flexDirection = "column",
}: UserProfileWithNamePositionProps): JSX.Element => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Stack flexDirection={flexDirection} gap={"0.4rem"} alignItems={"flex-end"}>
      <Typography variant="h6" sx={isMobile ? { fontSize: "1.4rem" } : {}}>
        {name || "이름 없음"}
      </Typography>
      <Typography variant="body1" sx={isMobile ? { fontSize: "1.2rem" } : {}}>
        {userRole}
      </Typography>
    </Stack>
  );
};

export default UserProfileWithNamePosition;
