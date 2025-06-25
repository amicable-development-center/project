import CheckIcon from "@mui/icons-material/Check";
import {
  Paper,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import type { JSX } from "react";
import { useNavigate } from "react-router-dom";

import { useSocialLogin } from "@features/auth/hooks/useSocialLogin";
import { SocialLoginButton } from "@features/auth/ui/SocialLoginButton";

import { githubProvider, googleProvider } from "@shared/firebase/firebase";

const JoinForm = (): JSX.Element => {
  const { socialLogin } = useSocialLogin();
  const navigate = useNavigate();

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 4,
        width: "100%",
        maxWidth: "420px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* 타이틀 */}
      <Typography variant="h5" fontWeight={700} mb={2}>
        회원가입
      </Typography>
      <Typography variant="body2" mb={3}>
        새로운 프로젝트 여정을 시작해보세요! 🚀
      </Typography>

      {/* 소셜 로그인 버튼 */}
      <SocialLoginButton
        label="Google로 회원가입"
        logo="https://developers.google.com/identity/images/g-logo.png"
        onClick={() => socialLogin(googleProvider)}
      />
      <SocialLoginButton
        label="GitHub로 회원가입"
        logo="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
        onClick={() => socialLogin(githubProvider)}
      />

      {/* 회원가입 혜택 */}
      <Paper
        elevation={0}
        sx={{
          backgroundColor: "#f9f9ff",
          padding: 2,
          width: "100%",
          mt: 4,
        }}
      >
        <Typography variant="subtitle2" fontWeight={600} mb={1}>
          🎯 회원가입 혜택
        </Typography>
        <List dense>
          <ListItem>
            <ListItemIcon>
              <CheckIcon fontSize="small" color="primary" />
            </ListItemIcon>
            <ListItemText primary="프로젝트 등록 및 팀원 모집" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckIcon fontSize="small" color="primary" />
            </ListItemIcon>
            <ListItemText primary="관심 프로젝트 북마크 기능" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckIcon fontSize="small" color="primary" />
            </ListItemIcon>
            <ListItemText primary="실시간 알림 및 메시지" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckIcon fontSize="small" color="primary" />
            </ListItemIcon>
            <ListItemText primary="개인 프로필 및 포트폴리오" />
          </ListItem>
        </List>
      </Paper>

      {/* 로그인으로 이동 */}
      <Divider sx={{ width: "100%", my: 3 }}>또는</Divider>
      <Typography variant="body2">
        계정이 있으신가요?{" "}
        <Typography
          component="span"
          color="primary"
          sx={{ cursor: "pointer", fontWeight: 600 }}
          onClick={() => navigate("/login")}
        >
          로그인하기 →
        </Typography>
      </Typography>
    </Paper>
  );
};

export default JoinForm;
