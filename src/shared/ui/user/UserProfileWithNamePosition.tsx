import { Box, Stack, useMediaQuery, useTheme } from "@mui/material";
import type { JSX } from "react";

import type { User } from "@shared/types/user";

interface UserProfileWithNamePositionProps {
  name?: string;
  userRole: User["userRole"];
  flexDirection?: "row" | "column";
}

const UserProfileWithNamePosition = ({
  name,
  userRole,
  flexDirection = "column",
}: UserProfileWithNamePositionProps): JSX.Element => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Stack
      gap={"0.4rem"}
      alignItems={"flex-start"}
      sx={
        flexDirection === "column"
          ? { direction: "column" }
          : { direction: "row" }
      }
    >
      <Box fontWeight={600} fontSize={isMobile ? "1.4rem" : 16}>
        {name || "이름 없음"}
      </Box>
      <Box fontSize={isMobile ? "1.2rem" : 14} color={"#858585"}>
        {userRole}
      </Box>
    </Stack>
  );
};

export default UserProfileWithNamePosition;
