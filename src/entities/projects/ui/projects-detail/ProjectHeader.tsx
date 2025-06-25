import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, styled } from "@mui/material";
import type { JSX } from "react";
import { useNavigate } from "react-router-dom";

const DetailHeader = ({ title }: { title: string }): JSX.Element => {
  const Navigate = useNavigate();

  const goListPage = (): void | Promise<void> => Navigate("/project");

  return (
    <HeadBox>
      <ClickSpan onClick={goListPage}>
        <ArrowBackIcon />
        프로젝트 목록
      </ClickSpan>
      <span>/</span>
      <span>{title}</span>
    </HeadBox>
  );
};

export default DetailHeader;

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
`;
