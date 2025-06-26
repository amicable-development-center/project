import { Box, styled, Avatar, Button } from "@mui/material";
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
      <LogoBox onClick={() => navigate("/")}>
        {/* 로고 이미지가 있으면 아래 img src 수정 */}
        {/* <img src="/logo.svg" alt="로고" style={{ height: 32, marginRight: 8 }} /> */}
        <span style={{ fontWeight: 700, fontSize: "2rem" }}>프로젝트 잼</span>
      </LogoBox>
      <NavBox>
        <NavButton onClick={() => navigate("/project")}>
          프로젝트 찾기
        </NavButton>
        <NavButton onClick={() => navigate("/project/insert")}>
          프로젝트 등록
        </NavButton>
        {user ? (
          <>
            <Avatar
              src={user.photoURL || ""}
              alt={user.displayName || "profile"}
              sx={{ width: 36, height: 36, cursor: "pointer", ml: 2 }}
              onClick={() => navigate("/profile")}
            />
            <LogoutButton />
          </>
        ) : (
          <LoginButton />
        )}
      </NavBox>
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
  height: "64px",
});

const LogoBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
});

const NavBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "1.5rem",
});

const NavButton = styled(Button)({
  background: "none",
  color: "#3b36f4",
  fontWeight: 600,
  fontSize: "1.1rem",
  boxShadow: "none",
  "&:hover": {
    background: "rgba(59,54,244,0.08)",
  },
});
