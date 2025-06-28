import MailOutlineIcon from "@mui/icons-material/MailOutline";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { Box, styled, Typography } from "@mui/material";
import type { JSX } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useAuthStore } from "@shared/stores/authStore";
import type { User } from "@shared/types/user";
import TitleWithIcon from "@shared/ui/project-detail/TitleWithIcon";

const ProjectLeader = ({
  projectOwner,
  onEmailClick,
}: {
  projectOwner: User | undefined;
  onEmailClick?: () => void;
}): JSX.Element | null => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuthStore();
  if (!projectOwner) return null;

  return (
    <>
      <TitleWithIcon
        Icon={ThumbUpOffAltIcon}
        title="프로젝트 리더"
        color="warning"
      />

      <Box display="flex">
        <PicBox>
          <img src={projectOwner.avatar} alt="프로필 이미지" />
        </PicBox>
        <div>
          <Typography variant="h5">{projectOwner.name}</Typography>
          <Typography variant="body2" color="primary" fontWeight={500}>
            {projectOwner.userRole}
          </Typography>
          <Typography variant="body2" fontWeight={500} color="#858585">
            경력 {projectOwner.experience}
          </Typography>
        </div>
      </Box>

      <Typography variant="body2" marginY={2}>
        {projectOwner.introduceMyself || "아직 등록한 소개가 없어요! 🚀"}
      </Typography>

      <MessageBtn
        onClick={() => {
          if (!user) {
            navigate(
              `/login?redirect=${encodeURIComponent(location.pathname)}`
            );
          }
          onEmailClick?.();
        }}
      >
        <MailOutlineIcon />
        {}
        <Typography variant="button">연락하기</Typography>
      </MessageBtn>
    </>
  );
};

export default ProjectLeader;

const PicBox = styled(Box)`
  width: 6.5rem;
  height: 6.5rem;
  margin-right: 1rem;
  background-color: #eeeeee;
  border-radius: 50px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: fill;
  }
`;

const MessageBtn = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 4rem;
  gap: 5px;
  border: 1px solid #dddddd;
  border-radius: 4px;
  transition: background-color 0.3s;
  cursor: pointer;

  &:hover {
    background-color: #f4f4f4;
  }
`;
