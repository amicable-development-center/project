import { Box, styled, Typography } from "@mui/material";
import type { JSX } from "react";

const ProjectModify = (): JSX.Element => {
  const handleDeleteBtn = (): void => {
    // Navigate '/project/insert로 이동'
    // state로 폼 넘김
    // 이푸 state 존재 여부에 따라 등록, 수정 나눌 예정
    // form을 나눈다면 여기서 나눠서 보낼 수 있도록 ...
    alert("아직없어염..");
  };

  return (
    <MessageBtn onClick={handleDeleteBtn}>
      <Typography>프로젝트 수정</Typography>
    </MessageBtn>
  );
};

export default ProjectModify;

const MessageBtn = styled(Box)`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 4rem;
  border-radius: 4px;
  border: 1px solid #dddddd;
  transition: background-color 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: #f4f4f4;
  }
`;
