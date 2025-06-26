import FilterListIcon from "@mui/icons-material/FilterList";
import Search from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import { Button, Chip, alpha, styled } from "@mui/material";
import { memo } from "react";
import type { JSX } from "react";

export const MemoizedActiveFiltersChip = memo(
  ({ count }: { count: number }): JSX.Element => (
    <ActiveFiltersChip
      icon={<FilterListIcon fontSize="small" />}
      label={`${count}개 활성 필터`}
      size="medium"
    />
  )
);

export const MemoizedResetButton = memo(
  ({
    onClick,
    disabled,
  }: {
    onClick: () => void;
    disabled: boolean;
  }): JSX.Element => (
    <ResetButton
      variant="outlined"
      startIcon={<TuneIcon fontSize="small" />}
      onClick={onClick}
      disabled={disabled}
    >
      필터 초기화
    </ResetButton>
  )
);

export const MemoizedSearchButton = memo(
  ({
    isLoading,
    isMobile,
  }: {
    isLoading: boolean;
    isMobile: boolean;
  }): JSX.Element => (
    <SearchButton
      type="submit"
      variant="contained"
      size={isMobile ? "medium" : "large"}
      fullWidth={isMobile}
      startIcon={<Search />}
      disabled={isLoading}
    >
      {isLoading ? "검색 중..." : "프로젝트 검색"}
    </SearchButton>
  )
);

// Styled Components
const ActiveFiltersChip = styled(Chip)(({ theme }) => ({
  fontWeight: 600,
  fontSize: "1.4rem",
  height: 40,
  backgroundColor: alpha(theme.palette.primary.main, 0.12),
  color: theme.palette.primary.main,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,

  "& .MuiChip-icon": {
    color: theme.palette.primary.main,
  },

  [theme.breakpoints.down("sm")]: {
    fontSize: "1.2rem",
  },
}));

const ResetButton = styled(Button)(({ theme }) => ({
  height: 40,
  fontWeight: 600,
  borderRadius: theme.spacing(1.5),
  borderColor: alpha(theme.palette.text.secondary, 0.3),
  color: theme.palette.text.secondary,

  "&:hover": {
    borderColor: theme.palette.primary.main,
    backgroundColor: alpha(theme.palette.primary.main, 0.04),
    color: theme.palette.primary.main,
  },

  [theme.breakpoints.down("sm")]: {
    height: 36,
    fontSize: "1.2rem",
    marginLeft: "auto",
  },
}));

const SearchButton = styled(Button)(({ theme }) => ({
  minWidth: 240,
  height: 56,
  fontSize: "1.1rem",
  fontWeight: 700,
  borderRadius: theme.spacing(2),
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.3)}`,
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  textTransform: "none",

  [theme.breakpoints.down("sm")]: {
    minWidth: "auto",
    height: 52,
    fontSize: "1.2rem",
    padding: theme.spacing(1.5, 2),
  },

  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: `0 12px 32px ${alpha(theme.palette.primary.main, 0.4)}`,
    background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
  },

  "&:active": {
    transform: "translateY(0px)",
  },

  "&:disabled": {
    transform: "none",
    background: theme.palette.action.disabledBackground,
    boxShadow: "none",
  },
}));
