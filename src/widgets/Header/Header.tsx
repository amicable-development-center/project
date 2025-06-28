import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  styled,
  Avatar,
  Button,
  alpha,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import type { JSX } from "react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import LoginButton from "@features/auth/ui/LoginButton";
import LogoutButton from "@features/auth/ui/LogoutButton";

import { auth } from "@shared/firebase/firebase";
import { useAuthStore } from "@shared/stores/authStore";
import { useSnackbarStore } from "@shared/stores/snackbarStore";
import LogoBox from "@shared/ui/LogoBox";

const Header = (): JSX.Element => {
  const user = useAuthStore((state) => state.user);
  const isLoggedIn = useAuthStore((state) => !!state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { showWarning } = useSnackbarStore();

  const isActive = (path: string): boolean => location.pathname === path;

  // Drawer 메뉴 항목
  const drawerMenu = [
    {
      label: "마이페이지",
      onClick: () => {
        if (!user) {
          showWarning("로그인 후 이용해 주세요");
        } else {
          navigate("/profile");
        }
      },
    },
    { label: "프로젝트 찾기", onClick: () => navigate("/project") },
    { label: "프로젝트 등록", onClick: () => navigate("/project/insert") },
  ];

  console.log("Header user:", user);

  return (
    <HeaderContainer>
      <HeaderContent>
        {/* 모바일 헤더 */}
        {isMobile ? (
          <>
            <Box sx={{ flex: 1, display: "flex", alignItems: "center" }}>
              <LogoBox size="medium" />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {!isLoggedIn && <LoginButton />}
              <IconButton
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={() => setDrawerOpen(true)}
                sx={{ ml: 1, mr: 1, p: 1.5 }}
              >
                <MenuIcon sx={{ fontSize: 32 }} />
              </IconButton>
            </Box>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={() => setDrawerOpen(false)}
              sx={{ zIndex: 13000 }}
              PaperProps={{ sx: { top: 0, height: "100%" } }}
            >
              <Box sx={{ width: 220, pt: 2 }} role="presentation">
                <List>
                  {drawerMenu.map((item) => (
                    <ListItem key={item.label} disablePadding>
                      <ListItemButton
                        onClick={() => {
                          item.onClick();
                          setDrawerOpen(false);
                        }}
                        selected={isActive(
                          item.label === "마이페이지"
                            ? "/profile"
                            : item.label === "프로젝트 찾기"
                              ? "/project"
                              : "/project/insert"
                        )}
                      >
                        <ListItemText primary={item.label} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                  {user && (
                    <>
                      <Divider sx={{ my: 1 }} />
                      <ListItem disablePadding>
                        <ListItemButton
                          onClick={async () => {
                            await auth.signOut();
                            setDrawerOpen(false);
                            navigate("/");
                          }}
                        >
                          <ListItemText primary="로그아웃" />
                        </ListItemButton>
                      </ListItem>
                    </>
                  )}
                </List>
              </Box>
            </Drawer>
          </>
        ) : (
          // 데스크탑 헤더 기존 구조 유지
          <>
            <LogoBox size="large" />
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
          </>
        )}
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

const CenterSection = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: "2rem",
  justifyContent: "center",
}));

const RightSection = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  paddingRight: 16,
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
