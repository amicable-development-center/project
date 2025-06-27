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
  Tooltip,
} from "@mui/material";
import { styled as muiStyled } from "@mui/material/styles";
import type { ComponentType, JSX } from "react";
import { useState } from "react";

import { useUpdateUser } from "@entities/user/hooks/useUpdateUser";
import UpdateUserForm from "@entities/user/ui/UpdateUserForm";

import { useProjectStore } from "@shared/stores/projectStore";
import type { User, UserInput } from "@shared/types/user";
import { UserExperience } from "@shared/types/user";
import SnackbarAlert from "@shared/ui/SnackbarAlert";

import TabWithBadge from "./TapWithBadge";

// Chip 컴포넌트는 상위에서 import해서 prop으로 넘겨야 함

interface UserProfileCardProps {
  userProfile: User;
  PROFILE_TABS: { label: string; color: string }[];
  tab: number;
  setTab: (idx: number) => void;
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
  const { likeProjects, appliedProjects } = useProjectStore();
  const [openModal, setOpenModal] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const updateUserMutation = useUpdateUser();

  const handleOpenModal = (): void => {
    setOpenModal(true);
  };

  const handleCloseModal = (): void => {
    setOpenModal(false);
  };

  const handleSubmitUpdate = async (userInfo: UserInput): Promise<void> => {
    try {
      await updateUserMutation.mutateAsync({
        uid: userProfile.id,
        userInfo,
      });

      setOpenModal(false);
      setSnackbarOpen(true);
    } catch (error) {
      console.error("프로필 업데이트 실패:", error);
      // 에러 처리 로직 추가 가능
    }
  };

  return (
    <>
      <ProfileCard>
        <ProfileCardContent>
          <ProfileCardHeader>
            <Tooltip
              title="내 정보 수정하기"
              arrow
              placement="left"
              componentsProps={{
                tooltip: {
                  sx: {
                    fontSize: "1.4rem",
                    padding: "8px 12px",
                    backgroundColor: "rgba(0, 0, 0, 0.47)",
                    color: "#fff",
                    borderRadius: "6px",
                    fontWeight: 500,
                  },
                },
                arrow: {
                  sx: {
                    color: "rgba(0, 0, 0, 0.47)",
                  },
                },
              }}
            >
              <IconButton
                size="large"
                aria-label="프로필 수정"
                onClick={handleOpenModal}
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
              <Typography variant="body1">
                {userRoleMap[userProfile.userRole] || userProfile.userRole}
              </Typography>
              <Typography variant="body2">
                {experienceMap[userProfile.experience] ||
                  userProfile.experience}
              </Typography>
            </ProfileInfoCol>
          </ProfileMainRow>
          <Box mt={2} width="100%" padding="0 1rem">
            <Typography
              sx={{ whiteSpace: "pre-line", wordBreak: "break-word" }}
            >
              {userProfile.introduceMyself}
            </Typography>
          </Box>
          <Divider sx={{ my: 2 }} />
          <TabBadgeContainer>
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
          </TabBadgeContainer>
          <ProfileEmail>💌 • {userProfile.email}</ProfileEmail>
        </ProfileCardContent>
      </ProfileCard>

      {/* 프로필 수정 모달 */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        maxWidth="md"
        PaperProps={{
          sx: {
            borderRadius: 2,
            margin: 2,
          },
        }}
      >
        <DialogContent sx={{ padding: "2rem", py: 3 }}>
          <UpdateUserForm
            defaultUser={userProfile}
            onSubmit={handleSubmitUpdate}
            onCancel={handleCloseModal}
          />
        </DialogContent>
      </Dialog>

      {/* 스낵바 알림 */}
      <SnackbarAlert
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        message="프로필 정보가 업데이트되었습니다! ✨"
        severity="success"
      />
    </>
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
  padding: "0 2rem",
}));
const ProfileCardContent = muiStyled(CardContent)(({ theme }) => ({
  padding: theme.spacing(3),
  paddingBottom: "16px",
  position: "relative",
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
  position: "absolute",
  top: 10,
  right: -10,
});
const ProfileMainRow = muiStyled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 16,
  justifyContent: "space-between",
  flexDirection: "row-reverse",
  marginTop: "3rem",
  padding: "0 1rem",
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
