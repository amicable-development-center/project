import { Avatar, Box, styled } from "@mui/material";
import type { CSSProperties, JSX } from "react";

import type { User } from "@shared/types/user";
import UserProfileWithNamePosition from "@shared/ui/user/UserProfileWithNamePosition";

interface UserProfileAvatarProps
  extends Pick<User, "name" | "userRole" | "avatar"> {
  flexDirection?: CSSProperties["flexDirection"];
}

const UserProfileAvatar = ({
  name,
  userRole,
  avatar,
  flexDirection = "row",
}: UserProfileAvatarProps): JSX.Element => {
  return (
    <UserProfileAvatarContainer>
      <Avatar src={avatar} />
      <UserProfileWithNamePosition
        name={name}
        userRole={userRole}
        flexDirection={flexDirection}
      />
    </UserProfileAvatarContainer>
  );
};

export default UserProfileAvatar;

const UserProfileAvatarContainer = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.8rem",
}));
