import {
  Box,
  Button,
  styled,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { type JSX } from "react";

import usePagination from "@shared/hooks/usePagination";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizIcon,
} from "@shared/ui/icons/CommonIcons";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
  showFastNavigation?: boolean;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  disabled = false,
  showFastNavigation = true,
}: PaginationProps): JSX.Element | null => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { pageNumbers, canGoPrev, canGoNext, canGoFastPrev, canGoFastNext } =
    usePagination({
      currentPage,
      totalPages,
    });

  if (totalPages <= 1) {
    return null;
  }

  const handleFastPrev = (): void => {
    const currentBlock = Math.floor((currentPage - 1) / 5);
    const prevBlockLastPage = currentBlock * 5;
    const newPage = Math.max(1, prevBlockLastPage);
    onPageChange(newPage);
  };

  const handleFastNext = (): void => {
    const currentBlock = Math.floor((currentPage - 1) / 5);
    const nextBlockFirstPage = (currentBlock + 1) * 5 + 1;
    const newPage = Math.min(totalPages, nextBlockFirstPage);
    onPageChange(newPage);
  };

  return (
    <PaginationContainer>
      {showFastNavigation && (
        <NavButton
          onClick={handleFastPrev}
          disabled={!canGoFastPrev || disabled}
          size={isMobile ? "large" : "medium"}
          title="이전 페이지 그룹으로 이동"
        >
          <DoubleChevronContainer>
            <ChevronLeftIcon fontSize="small" />
            <ChevronLeftIcon fontSize="small" />
          </DoubleChevronContainer>
        </NavButton>
      )}

      <NavButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!canGoPrev || disabled}
        size={isMobile ? "large" : "medium"}
        title="이전 페이지"
      >
        <ChevronLeftIcon />
      </NavButton>

      <PageNumbersContainer>
        {pageNumbers.map((page, index) => (
          <Box key={index}>
            {page === "ellipsis" ? (
              <EllipsisButton disabled size={isMobile ? "large" : "medium"}>
                <MoreHorizIcon fontSize="medium" />
              </EllipsisButton>
            ) : (
              <PageButton
                variant={page === currentPage ? "contained" : "outlined"}
                size={isMobile ? "large" : "medium"}
                onClick={() => onPageChange(page)}
                disabled={disabled}
                $isActive={page === currentPage}
                $isMobile={isMobile}
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
        size={isMobile ? "large" : "medium"}
        title="다음 페이지"
      >
        <ChevronRightIcon />
      </NavButton>

      {showFastNavigation && (
        <NavButton
          onClick={handleFastNext}
          disabled={!canGoFastNext || disabled}
          size={isMobile ? "large" : "medium"}
          title="다음 페이지 그룹으로 이동"
        >
          <DoubleChevronContainer>
            <ChevronRightIcon fontSize="small" />
            <ChevronRightIcon fontSize="small" />
          </DoubleChevronContainer>
        </NavButton>
      )}
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

const DoubleChevronContainer = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  marginLeft: "-2px",
  "& .MuiSvgIcon-root:last-child": {
    marginLeft: "-6px",
  },
}));

const PageButton = styled(Button, {
  shouldForwardProp: (prop) =>
    !["$isActive", "$isMobile"].includes(prop as string),
})<{ $isActive: boolean; $isMobile: boolean }>(
  ({ theme, $isActive, $isMobile }) => ({
    minWidth: $isMobile ? "3.5rem" : "3rem",
    height: $isMobile ? "3.5rem" : "3rem",
    padding: "0",
    fontSize: $isMobile ? "1.1rem" : "1rem",
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

  [theme.breakpoints.down("sm")]: {
    minWidth: "3.5rem",
    height: "3.5rem",
  },
}));

const EllipsisButton = styled(IconButton)(() => ({
  minWidth: "3rem",
  height: "3rem",
  cursor: "default",
  "&:hover": {
    backgroundColor: "transparent",
  },
}));
