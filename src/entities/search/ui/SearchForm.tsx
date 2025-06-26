import {
  Box,
  Paper,
  alpha,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import type { JSX } from "react";
import { memo, useCallback } from "react";

import {
  MemoizedActiveFiltersChip,
  MemoizedResetButton,
  MemoizedSearchButton,
} from "@entities/search/ui/SearchActions";
import { MemoizedFiltersGrid } from "@entities/search/ui/SearchFilters";
import SearchInput from "@entities/search/ui/SearchInput";
import {
  MemoizedTitleSection,
  MemoizedSectionHeader,
} from "@entities/search/ui/SearchLabels";

import {
  useSearchUtils,
  useActiveFiltersCount,
  useSearchTitle,
  useSearchHistoryActions,
} from "@shared/stores/searchStore";
import type { ProjectSearchFilterOption } from "@shared/types/search";

interface SearchFormProps {
  onSearch: (filter: ProjectSearchFilterOption) => void;
  isLoading?: boolean;
}

const SearchForm = memo(
  ({ onSearch, isLoading = false }: SearchFormProps): JSX.Element => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const title = useSearchTitle();

    const { resetFilters, getFilterStatus } = useSearchUtils();
    const { addToHistory } = useSearchHistoryActions();

    const activeFiltersCount = useActiveFiltersCount();

    const handleSearch = useCallback((): void => {
      const searchFilter = getFilterStatus();

      if (title.trim()) {
        addToHistory(title);
      }

      onSearch(searchFilter);
    }, [getFilterStatus, title, addToHistory, onSearch]);

    return (
      <StyledForm
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
      >
        <StyledContainer>
          <HeaderSection>
            <MemoizedTitleSection isMobile={isMobile} />

            <StatusArea $hasActiveFilters={activeFiltersCount > 0}>
              {activeFiltersCount > 0 && (
                <MemoizedActiveFiltersChip count={activeFiltersCount} />
              )}
              <MemoizedResetButton
                onClick={resetFilters}
                disabled={isLoading}
              />
            </StatusArea>
          </HeaderSection>

          <SearchSection>
            <SearchContainer>
              <SearchInput onEnterPress={handleSearch} />
            </SearchContainer>
          </SearchSection>

          <FiltersSection>
            <MemoizedSectionHeader />

            <MemoizedFiltersGrid />
          </FiltersSection>

          <ActionSection>
            <MemoizedSearchButton isLoading={isLoading} isMobile={isMobile} />
          </ActionSection>
        </StyledContainer>
      </StyledForm>
    );
  }
);

export default SearchForm;

const StyledForm = styled("form")(() => ({
  width: "100%",
}));

const StyledContainer = styled(Paper)(({ theme }) => ({
  width: "100%",
  borderRadius: theme.spacing(3),
  marginBottom: theme.spacing(4),
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
  boxShadow: `0 8px 32px ${alpha(theme.palette.common.black, 0.04)}`,
}));

const HeaderSection = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  padding: theme.spacing(4),
  backgroundColor: theme.palette.background.paper,

  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    gap: theme.spacing(3),
    alignItems: "stretch",
  },
}));

const StatusArea = styled(Box, {
  shouldForwardProp: (prop) => prop !== "$hasActiveFilters",
})<{ $hasActiveFilters: boolean }>(({ theme, $hasActiveFilters }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),

  [theme.breakpoints.down("md")]: {
    justifyContent: $hasActiveFilters ? "space-between" : "flex-end",
  },
}));

const SearchSection = styled(Box)(({ theme }) => ({
  padding: `${theme.spacing(2)} ${theme.spacing(4)}`,
  backgroundColor: theme.palette.background.paper,
}));

const SearchContainer = styled(Box)(() => ({
  width: "100%",
}));

const FiltersSection = styled(Box)(({ theme }) => ({
  padding: `0 ${theme.spacing(4)} ${theme.spacing(3)}`,
  backgroundColor: theme.palette.background.paper,
}));

const ActionSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  paddingTop: theme.spacing(2),
  display: "flex",
  justifyContent: "center",
  backgroundColor: theme.palette.background.paper,
}));
