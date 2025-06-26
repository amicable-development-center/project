import { Box, Typography } from "@mui/material";
import type { JSX } from "react";

// Box: maxWidth={700} mx="auto" 설정이 불필요하여 삭제히였습니다.
// Typography 엔 fontSize 설정이 적용되지 않아 삭제하였습니다.
const TopTitle = (): JSX.Element => {
  return (
    <Box pb={2} textAlign="center">
      <Typography variant="h3" fontWeight={800} mb={1} color="#222">
        같이 할 사람 구해요! 🚀
      </Typography>
      <Typography variant="h6" color="#555" mb={0.5}>
        멋진 아이디어가 있다면 팀원을 모집해보세요
      </Typography>
      <Typography color="#888">
        혼자서는 힘들어도 함께라면 뭐든 할 수 있어요!
      </Typography>
    </Box>
  );
};

export default TopTitle;
