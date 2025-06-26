import { Box, styled } from "@mui/material";
import type { JSX } from "react";
import { useNavigate } from "react-router-dom";

import LoginButton from "@features/auth/ui/LoginButton";
import LogoutButton from "@features/auth/ui/LogoutButton";

import { useAuthStore } from "@shared/stores/authStore";

const Header = (): JSX.Element => {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  return (
    <HeaderContainer>
      <h1>Project Jam</h1>
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        {user && (
          <button type="button" onClick={() => navigate("/profile")}>
            내 프로필
          </button>
        )}
        {user ? <LogoutButton /> : <LoginButton />}
      </div>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 2rem",
  backgroundColor: "#f5f5f5",
});
