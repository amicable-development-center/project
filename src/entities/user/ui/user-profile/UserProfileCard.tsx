import SettingsIcon from "@mui/icons-material/Settings";
import {
  Box,
  Avatar,
  Typography,
  Card,
  CardContent,
  IconButton,
  Divider,
} from "@mui/material";
import { styled as muiStyled } from "@mui/material/styles";
import type { JSX } from "react";

import TabWithBadge from "./TapWithBadge";

// Chip 컴포넌트는 상위에서 import해서 prop으로 넘겨야 함

interface UserProfileCardProps {
  userProfile: any;
  PROFILE_TABS: { label: string; color: string }[];
  likeProjects: any[];
  appliedProjects: any[];
  tab: number;
  setTab: (idx: number) => void;
  ProfileTabChip: any;
}

const userRoleMap: Record<string, string> = {
  frontend: "프론트엔드",
  backend: "백엔드",
  fullstack: "풀스택",
  designer: "디자이너",
  pm: "PM",
};
const experienceMap: Record<string, string> = {
  junior: "주니어 (3년 이하)",
  mid: "미들 (3년 이상 10년 이하)",
  senior: "시니어 (10년 이상)",
};

const UserProfileCard = ({
  userProfile,
  PROFILE_TABS,
  likeProjects,
  appliedProjects,
  tab,
  setTab,
  ProfileTabChip,
}: UserProfileCardProps): JSX.Element => {
  return (
    <ProfileCard>
      <ProfileCardContent>
        <ProfileCardHeader>
          <IconButton size="small" aria-label="프로필 수정">
            <SettingsIcon />
          </IconButton>
        </ProfileCardHeader>
        <ProfileMainRow>
          <ProfileAvatar src={userProfile.avatar} />
          <ProfileInfoCol>
            <Typography variant="h5" fontWeight={700}>
              {userProfile.name}
            </Typography>
            <Typography>
              {userRoleMap[userProfile.userRole] || userProfile.userRole}
            </Typography>
            <Typography>
              {experienceMap[userProfile.experience] || userProfile.experience}
            </Typography>
          </ProfileInfoCol>
        </ProfileMainRow>
        <Box mt={2} width="100%">
          <Typography>{userProfile.introduceMyself}</Typography>
        </Box>
        <Divider sx={{ my: 2 }} />
        <ProfileEmail>{userProfile.email}</ProfileEmail>
        <Box mt={2} display="flex" gap={1} justifyContent="center">
          {PROFILE_TABS.map((tabInfo, idx) => (
            <TabWithBadge
              key={tabInfo.label}
              label={tabInfo.label}
              count={
                idx === 0
                  ? likeProjects?.length || 0
                  : appliedProjects?.length || 0
              }
              active={tab === idx}
              onClick={() => setTab(idx)}
              ProfileTabChip={ProfileTabChip}
            />
          ))}
        </Box>
      </ProfileCardContent>
    </ProfileCard>
  );
};

export default UserProfileCard;

// 스타일 컴포넌트 재사용
const ProfileCard = muiStyled(Card)(({ theme }) => ({
  minWidth: 280,
  maxWidth: 320,
  borderRadius: 12,
  boxShadow: theme.shadows[2],
  position: "relative",
  padding: 0,
}));
const ProfileCardContent = muiStyled(CardContent)(({ theme }) => ({
  padding: theme.spacing(3),
  paddingBottom: "16px",
  "&:last-child": {
    paddingBottom: "16px",
  },
}));
const ProfileCardHeader = muiStyled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  marginBottom: 8,
  minHeight: 32,
});
const ProfileMainRow = muiStyled(Box)({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: 16,
});
const ProfileAvatar = muiStyled(Avatar)({
  width: 100,
  height: 100,
  marginBottom: 0,
});
const ProfileInfoCol = muiStyled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: 4,
});
const ProfileEmail = muiStyled(Typography)(({ theme }) => ({
  color: theme.palette.text.disabled,
  fontSize: "0.95rem",
  fontStyle: "italic",
  fontWeight: 400,
  marginTop: theme.spacing(1),
}));
