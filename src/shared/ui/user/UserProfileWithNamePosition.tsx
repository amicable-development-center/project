import { Stack, Typography } from "@mui/material";
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
  return (
    <Stack flexDirection={flexDirection} gap={"0.4rem"} alignItems={"center"}>
      <Typography variant="h6">{name || "이름 없음"}</Typography>
      <Typography variant="body1">{userRole}</Typography>
    </Stack>
  );
};

export default UserProfileWithNamePosition;
