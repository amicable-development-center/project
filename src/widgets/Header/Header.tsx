import { Box, styled } from "@mui/material";
import type { JSX } from "react";

import LoginButton from "@features/auth/ui/LoginButton";
import LogoutButton from "@features/auth/ui/LogoutButton";

import { useAuthStore } from "@shared/stores/authStore";

const Header = (): JSX.Element => {
  const user = useAuthStore((state) => state.user);

  return (
    <HeaderContainer
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p={2}
      bgcolor="#f5f5f5"
    >
      <h1>🔥 Project Jam</h1>
      {user ? <LogoutButton /> : <LoginButton />}
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  p: 2,
  backgroundColor: "f5f5f5",
});
