import { ChevronLeft, ChevronRight, MoreHoriz } from "@mui/icons-material";
import { Box, Button, styled, IconButton } from "@mui/material";
import { type JSX } from "react";

import usePagination from "@shared/hooks/usePagination";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  disabled = false,
}: PaginationProps): JSX.Element => {
  const { pageNumbers, canGoPrev, canGoNext } = usePagination({
    currentPage,
    totalPages,
  });

  if (totalPages <= 1) {
    return <></>;
  }

  return (
    <PaginationContainer>
      <IconButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!canGoPrev || disabled}
        size="small"
      >
        <ChevronLeft />
      </IconButton>
      <PageNumbersContainer>
        {pageNumbers.map((page, index) => (
          <Box key={index}>
            {page === "ellipsis" ? (
              <EllipsisButton disabled>
                <MoreHoriz fontSize="small" />
              </EllipsisButton>
            ) : (
              <PageButton
                variant={page === currentPage ? "contained" : "outlined"}
                size="small"
                onClick={() => onPageChange(page)}
                disabled={disabled}
                $isActive={page === currentPage}
              >
                {page}
              </PageButton>
            )}
          </Box>
        ))}
      </PageNumbersContainer>
      <IconButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!canGoNext || disabled}
        size="small"
      >
        <ChevronRight />
      </IconButton>
    </PaginationContainer>
  );
};

export default Pagination;

const PaginationContainer = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.5rem",
  padding: "2rem 0",
}));

const PageNumbersContainer = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: "0.25rem",
}));

const PageButton = styled(Button)<{ $isActive: boolean }>(
  ({ theme, $isActive }) => ({
    minWidth: "2.5rem",
    height: "2.5rem",
    padding: "0",
    fontSize: "0.875rem",
    fontWeight: $isActive ? 600 : 400,
    ...($isActive && {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      "&:hover": {
        backgroundColor: theme.palette.primary.dark,
      },
    }),
  })
);

const EllipsisButton = styled(IconButton)(() => ({
  minWidth: "2.5rem",
  height: "2.5rem",
  cursor: "default",
  "&:hover": {
    backgroundColor: "transparent",
  },
}));
