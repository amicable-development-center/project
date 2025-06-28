import FavoriteIcon from "@mui/icons-material/Favorite";
import { Box, Typography, styled } from "@mui/material";
import type { JSX } from "react";

const LikedProjectsEmpty = (): JSX.Element => {
  return (
    <EmptyContainer>
      <IconWrapper>
        <FavoriteIcon sx={{ fontSize: 64, color: "text.disabled" }} />
      </IconWrapper>
      <EmptyTitle variant="h6" color="text.secondary">
        아직 좋아요한 프로젝트가 없습니다
      </EmptyTitle>
      <EmptyDescription variant="body2" color="text.disabled">
        마음에 드는 프로젝트에 좋아요를 눌러보세요!
      </EmptyDescription>
    </EmptyContainer>
  );
};

export default LikedProjectsEmpty;

const EmptyContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(8, 2),
  textAlign: "center",
  minHeight: "300px",
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  opacity: 0.6,
}));

const EmptyTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  fontWeight: 600,
}));

const EmptyDescription = styled(Typography)(() => ({
  maxWidth: "400px",
  lineHeight: 1.6,
}));
