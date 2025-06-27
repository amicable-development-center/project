import SettingsIcon from "@mui/icons-material/Settings";
import {
  Box,
  Avatar,
  Typography,
  Card,
  CardContent,
  IconButton,
  Divider,
  Dialog,
  DialogContent,
} from "@mui/material";
import { styled as muiStyled } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import type { ComponentType, JSX } from "react";
import { useState } from "react";

import { useUpdateUser } from "@entities/user/hooks/useUpdateUser";
import UpdateUserForm from "@entities/user/ui/UpdateUserForm";

import { useAuthStore } from "@shared/stores/authStore";
import { useLikeStore } from "@shared/stores/likeStore";
import { useProjectStore } from "@shared/stores/projectStore";
import { ProjectCollectionTabType } from "@shared/types/project";
import type { User } from "@shared/types/user";
import { UserExperience } from "@shared/types/user";

import TabWithBadge from "./TapWithBadge";

// Chip 컴포넌트는 상위에서 import해서 prop으로 넘겨야 함

interface UserProfileCardProps {
  userProfile: User;
  PROFILE_TABS: {
    label: string;
    color: string;
    type: ProjectCollectionTabType;
  }[];
  tab: ProjectCollectionTabType;
  setTab: (type: ProjectCollectionTabType) => void;
  ProfileTabChip: ComponentType<any>;
}

const userRoleMap: Record<string, string> = {
  frontend: "프론트엔드",
  backend: "백엔드",
  fullstack: "풀스택",
  designer: "디자이너",
  pm: "PM",
};

const experienceMap: Record<string, string> = {
  [UserExperience.junior]: "주니어 (3년 이하) 🌱",
  [UserExperience.mid]: "미들 (3년 이상 10년 이하) 🌿",
  [UserExperience.senior]: "시니어 (10년 이상) 🌳",
};

const UserProfileCard = ({
  userProfile,
  PROFILE_TABS,
  tab,
  setTab,
  ProfileTabChip,
}: UserProfileCardProps): JSX.Element => {
  const { appliedProjects } = useProjectStore();
  const { likedProjectsCount } = useLikeStore();
  const { user } = useAuthStore();
  const [open, setOpen] = useState(false);
  const updateUserMutation = useUpdateUser();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleUpdate = (userInfo: any) => {
    if (user?.uid) {
      updateUserMutation.mutate({ uid: user.uid, userInfo });
      handleClose();
    }
  };

  return (
    <ProfileCard>
      <ProfileCardContent>
        <ProfileCardHeader>
          <Tooltip
            title="프로필 수정"
            arrow
            placement="left"
            slotProps={{
              tooltip: {
                sx: {
                  fontSize: "1.1rem",
                  padding: "8px 16px",
                },
              },
            }}
          >
            <IconButton
              size="large"
              aria-label="프로필 수정"
              onClick={handleOpen}
            >
              <SettingsIcon sx={{ fontSize: "2rem" }} />
            </IconButton>
          </Tooltip>
        </ProfileCardHeader>
        <ProfileMainRow>
          <ProfileAvatar src={userProfile.avatar} />
          <ProfileInfoCol>
            <Typography
              variant="h2"
              fontWeight={700}
              sx={{ paddingBottom: "1.5rem" }}
            >
              {userProfile.name}
            </Typography>
            <Typography variant="body1" sx={{ whiteSpace: "nowrap" }}>
              {userRoleMap[userProfile.userRole] || userProfile.userRole}
            </Typography>
            <Typography variant="body2">
              {experienceMap[userProfile.experience] || userProfile.experience}
            </Typography>
          </ProfileInfoCol>
        </ProfileMainRow>
        <Box mt={2} width="100%" padding="0 1rem">
          <Typography>{userProfile.introduceMyself}</Typography>
        </Box>
        <Divider sx={{ my: 2, width: "100%", mx: 0 }} />

        <TabBadgeContainer>
          {PROFILE_TABS.map((tabInfo) => (
            <TabWithBadge
              key={tabInfo.label}
              label={tabInfo.label}
              count={
                tabInfo.type === ProjectCollectionTabType.Likes
                  ? likedProjectsCount
                  : tabInfo.type === ProjectCollectionTabType.Applied
                    ? appliedProjects?.length || 0
                    : userProfile.myProjects?.length || 0
              }
              active={tab === tabInfo.type}
              onClick={() => setTab(tabInfo.type)}
              ProfileTabChip={ProfileTabChip}
            />
          ))}
        </TabBadgeContainer>

        <ProfileEmail>💌 • {userProfile.email}</ProfileEmail>
      </ProfileCardContent>
      <Dialog open={open} onClose={handleClose} maxWidth="sm">
        <DialogContent>
          <UpdateUserForm
            defaultUser={userProfile}
            onSubmit={handleUpdate}
            onCancel={handleClose}
          />
        </DialogContent>
      </Dialog>
    </ProfileCard>
  );
};

export default UserProfileCard;

// 스타일 컴포넌트 재사용
const ProfileCard = muiStyled(Card)(({ theme }) => ({
  minWidth: 280,
  maxWidth: 380,
  borderRadius: 12,
  boxShadow: theme.shadows[2],
  position: "relative",
}));
const ProfileCardContent = muiStyled(CardContent)({
  margin: "2rem",
  paddingBottom: "16px",
  position: "relative",
  "&:last-child": {
    paddingBottom: "16px",
  },
});
const ProfileCardHeader = muiStyled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  marginBottom: 8,
  minHeight: 32,
  position: "absolute",
  top: 0,
  right: -10,
});
const ProfileMainRow = muiStyled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 16,
  justifyContent: "space-between",
  flexDirection: "row-reverse",
  marginTop: "3rem",
  padding: "0 0.5rem",
});
const ProfileAvatar = muiStyled(Avatar)({
  width: 100,
  height: 100,
  marginBottom: 0,
});
const ProfileInfoCol = muiStyled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: 2,
});
const ProfileEmail = muiStyled(Typography)(({ theme }) => ({
  color: theme.palette.text.disabled,
  fontSize: "1.1rem",
  fontStyle: "italic",
  fontWeight: 400,
  marginTop: theme.spacing(1),
  textAlign: "end",
}));

const TabBadgeContainer = muiStyled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  gap: theme.spacing(1),
  justifyContent: "center",
  display: "none",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));
