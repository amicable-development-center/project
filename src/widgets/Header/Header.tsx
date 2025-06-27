import { Box, styled, Avatar, Button, alpha } from "@mui/material";
import type { JSX } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import LoginButton from "@features/auth/ui/LoginButton";
import LogoutButton from "@features/auth/ui/LogoutButton";

import { useAuthStore } from "@shared/stores/authStore";
import LogoBox from "@shared/ui/LogoBox";

const Header = (): JSX.Element => {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string): boolean => location.pathname === path;

  return (
    <HeaderContainer>
      <HeaderContent>
        <LeftSection>
          <LogoBox size="large" />
        </LeftSection>

        <CenterSection>
          <NavButton
            onClick={() => navigate("/project")}
            $isActive={isActive("/project")}
          >
            프로젝트 찾기
          </NavButton>
          <NavButton
            onClick={() => navigate("/project/insert")}
            $isActive={isActive("/project/insert")}
          >
            프로젝트 등록
          </NavButton>
        </CenterSection>

        <RightSection>
          {user ? (
            <UserSection>
              <StyledAvatar
                src={user.photoURL || ""}
                alt={user.displayName || "profile"}
                onClick={() => navigate("/profile")}
              />
              <LogoutButton />
            </UserSection>
          ) : (
            <LoginButton />
          )}
        </RightSection>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "0 2rem",
  backgroundColor: theme.palette.background.paper,
  borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
  height: "8rem",
  boxShadow: `0 0.2rem 1.2rem ${alpha(theme.palette.common.black, 0.04)}`,
  backdropFilter: "blur(0.8rem)",
  position: "sticky",
  top: 0,
  zIndex: 8000,

  [theme.breakpoints.down("md")]: {
    height: "6.4rem",
    padding: "0 1rem",
  },
}));

const HeaderContent = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  maxWidth: "1280px",
  margin: "0 auto",
}));

const LeftSection = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  flex: "0 0 auto",
}));

const CenterSection = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: "2rem",
  flex: "1 1 auto",
  justifyContent: "center",
}));

const RightSection = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  flex: "0 0 auto",
}));

const NavButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "$isActive",
})<{ $isActive?: boolean }>(({ theme, $isActive }) => ({
  background: "none",
  color: $isActive ? theme.palette.primary.main : theme.palette.text.primary,
  fontWeight: $isActive ? 700 : 600,
  fontSize: "1rem",
  boxShadow: "none",
  padding: "0.75rem 1.5rem",
  borderRadius: theme.spacing(2),
  position: "relative",
  transition: "all 0.2s ease-in-out",

  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.08),
    transform: "translateY(-1px)",
    color: theme.palette.primary.main,
  },

  "&:active": {
    transform: "translateY(0)",
  },

  "&::after": {
    content: '""',
    position: "absolute",
    bottom: "-0.8rem", // -8px = -0.8rem
    left: "50%",
    transform: "translateX(-50%)",
    width: $isActive ? "60%" : "0%",
    height: "0.3rem", // 3px = 0.3rem
    backgroundColor: theme.palette.primary.main,
    borderRadius: "0.2rem", // 2px = 0.2rem
    transition: "width 0.3s ease-in-out",
  },
}));

const UserSection = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1.5),
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: "4rem", // 40px = 4rem
  height: "4rem", // 40px = 4rem
  cursor: "pointer",
  border: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
  transition: "all 0.2s ease-in-out",

  "&:hover": {
    borderColor: theme.palette.primary.main,
    transform: "scale(1.05)",
  },

  [theme.breakpoints.down("md")]: {
    width: "3.2rem", // 32px = 3.2rem
    height: "3.2rem", // 32px = 3.2rem
  },
}));
