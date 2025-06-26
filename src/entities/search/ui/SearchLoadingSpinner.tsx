import { Box, styled, Typography } from "@mui/material";
import type { JSX } from "react";

import LoadingSpinner from "@shared/ui/loading-spinner/LoadingSpinner";

const SearchLoadingSpinner = (): JSX.Element => {
  return (
    <LoadingContainer>
      <LoadingSpinner size={60} />
      <Typography variant="h6" color="text.secondary" mt={2}>
        프로젝트를 불러오는 중...
      </Typography>
    </LoadingContainer>
  );
};

export default SearchLoadingSpinner;

const LoadingContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "4rem 0rem",
  minHeight: "400px",
  [theme.breakpoints.up("sm")]: {
    padding: "6rem 2rem",
  },
}));
