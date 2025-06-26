import { Box, Typography, styled } from "@mui/material";
import type { JSX } from "react";

import SearchLoadingSpinner from "@entities/search/ui/SearchLoadingSpinner";

import Pagination from "@shared/ui/pagination/Pagination";

interface SearchListResultHandlerProps {
  isLoading: boolean;
  isEmpty: boolean;
  isError: boolean;
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const SearchListResultHandler = ({
  isLoading,
  isEmpty,
  isError,
  totalPages,
  currentPage,
  onPageChange,
}: SearchListResultHandlerProps): JSX.Element | null => {
  if (isLoading) {
    return <SearchLoadingSpinner />;
  }

  if (isEmpty) {
    return (
      <EmptyState variant="h6">
        검색 조건에 맞는 프로젝트가 없습니다. 다른 조건으로 검색해보세요.
      </EmptyState>
    );
  }

  if (isError) {
    return (
      <ErrorContainer>
        <Typography variant="h6" color="error">
          프로젝트를 불러오는 중 오류가 발생했습니다.
        </Typography>
      </ErrorContainer>
    );
  }

  if (totalPages > 0) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </Box>
    );
  }

  return null;
};

const EmptyState = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  color: theme.palette.text.secondary,
  padding: "4rem 0",
  fontWeight: 500,
}));

const ErrorContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "4rem 0rem",
  [theme.breakpoints.up("sm")]: {
    padding: "6rem 2rem",
  },
}));

export default SearchListResultHandler;
