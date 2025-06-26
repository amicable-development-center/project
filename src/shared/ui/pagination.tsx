import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
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
      <NavButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!canGoPrev || disabled}
        size="medium"
      >
        <ChevronLeftIcon />
      </NavButton>
      <PageNumbersContainer>
        {pageNumbers.map((page, index) => (
          <Box key={index}>
            {page === "ellipsis" ? (
              <EllipsisButton disabled>
                <MoreHorizIcon fontSize="medium" />
              </EllipsisButton>
            ) : (
              <PageButton
                variant={page === currentPage ? "contained" : "outlined"}
                size="medium"
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
      <NavButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!canGoNext || disabled}
        size="medium"
      >
        <ChevronRightIcon />
      </NavButton>
    </PaginationContainer>
  );
};

export default Pagination;

const PaginationContainer = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.75rem",
  padding: "2rem 0",
}));

const PageNumbersContainer = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
}));

const PageButton = styled(Button)<{ $isActive: boolean }>(
  ({ theme, $isActive }) => ({
    minWidth: "3rem",
    height: "3rem",
    padding: "0",
    fontSize: "1rem",
    fontWeight: $isActive ? 600 : 500,
    borderRadius: "0.5rem",
    ...($isActive && {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      "&:hover": {
        backgroundColor: theme.palette.primary.dark,
      },
    }),
    "&:not(.Mui-disabled):hover": {
      transform: "translateY(-1px)",
      boxShadow: theme.shadows[2],
    },
    transition: "all 0.2s ease-in-out",
  })
);

const NavButton = styled(IconButton)(({ theme }) => ({
  minWidth: "3rem",
  height: "3rem",
  borderRadius: "0.5rem",
  border: `1px solid ${theme.palette.divider}`,
  "&:not(.Mui-disabled):hover": {
    backgroundColor: theme.palette.action.hover,
    transform: "translateY(-1px)",
    boxShadow: theme.shadows[1],
  },
  transition: "all 0.2s ease-in-out",
}));

const EllipsisButton = styled(IconButton)(() => ({
  minWidth: "3rem",
  height: "3rem",
  cursor: "default",
  "&:hover": {
    backgroundColor: "transparent",
  },
}));
