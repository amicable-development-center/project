import { Box, Typography, Button } from "@mui/material";
import type { JSX } from "react";
import { useNavigate } from "react-router-dom";

import useCountdown from "@shared/hooks/useCountdown";

const UserNotFound = (): JSX.Element => {
  const navigate = useNavigate();
  const count = useCountdown(3, () => navigate("/"));

  return (
    <Box textAlign="center" py={8}>
      <Typography variant="h3" mb={2}>
        😕 유저 정보를 찾을 수 없습니다.
      </Typography>
      <Typography mb={4}>{count}초 후 홈으로 이동합니다.</Typography>
      <Button variant="contained" onClick={() => navigate("/")}>
        홈으로 이동
      </Button>
    </Box>
  );
};

export default UserNotFound;
