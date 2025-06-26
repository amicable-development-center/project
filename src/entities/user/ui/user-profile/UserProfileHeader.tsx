import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, styled } from "@mui/material";
import type { JSX } from "react";
import { useNavigate } from "react-router-dom";

interface UserProfileHeaderProps {
  title?: string;
  backText?: string;
  backTo?: string;
}

const UserProfileHeader = ({
  title = "마이페이지",
  backText = "홈으로 돌아가기",
  backTo = "/",
}: UserProfileHeaderProps): JSX.Element => {
  const navigate = useNavigate();
  return (
    <HeadBox>
      <ClickSpan onClick={() => navigate(backTo)}>
        <ArrowBackIcon fontSize="small" />
        {backText}
      </ClickSpan>
      <span>/</span>
      <TitleSpan>{title}</TitleSpan>
    </HeadBox>
  );
};

export default UserProfileHeader;

const HeadBox = styled(Box)`
  display: flex;
  align-items: center;
  padding: 2rem 0;
  font-size: 14px;
  gap: 8px;
`;
const ClickSpan = styled("span")`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
`;
const TitleSpan = styled("span")`
  font-size: 14px;
  /* 필요시 font-weight, color 등 추가 */
`;
