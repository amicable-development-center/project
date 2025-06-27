import { Avatar, Box, styled } from "@mui/material";
import type { CSSProperties, JSX } from "react";
import { useState, useCallback, useMemo, memo } from "react";

import type { User } from "@shared/types/user";
import UserProfileWithNamePosition from "@shared/ui/user/UserProfileWithNamePosition";

interface UserProfileAvatarProps {
  name?: string;
  userRole: User["userRole"];
  avatar?: User["avatar"];
  flexDirection?: CSSProperties["flexDirection"];
}

const UserProfileAvatar = ({
  name,
  userRole,
  avatar,
  flexDirection = "row",
}: UserProfileAvatarProps): JSX.Element => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = useCallback((): void => {
    setImageError(true);
  }, []);

  const avatarProps = useMemo(() => {
    const fallbackText =
      name && name.length > 0 ? name.charAt(0).toUpperCase() : "?";
    return imageError || !avatar
      ? { children: fallbackText }
      : { src: avatar, onError: handleImageError };
  }, [imageError, avatar, name, handleImageError]);

  return (
    <UserProfileAvatarContainer>
      <Avatar {...avatarProps} />
      <UserProfileWithNamePosition
        name={name || ""}
        userRole={userRole}
        flexDirection={flexDirection}
      />
    </UserProfileAvatarContainer>
  );
};

export default memo(UserProfileAvatar);

const UserProfileAvatarContainer = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.8rem",
}));
