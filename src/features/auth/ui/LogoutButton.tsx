import { Button } from "@mui/material";
import { signOut } from "firebase/auth";
import type { JSX } from "react";

import { auth } from "@shared/firebase/firebase";
import { useAuthStore } from "@shared/stores/authStore";

const LogoutButton = (): JSX.Element => {
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async (): Promise<void> => {
    await signOut(auth);
    logout();
  };

  return (
    <Button variant="outlined" onClick={handleLogout}>
      로그아웃
    </Button>
  );
};

export default LogoutButton;
