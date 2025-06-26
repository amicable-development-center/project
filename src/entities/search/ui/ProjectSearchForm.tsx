import FilterListIcon from "@mui/icons-material/FilterList";
import Search from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import {
  Box,
  Button,
  Paper,
  alpha,
  Typography,
  Chip,
  styled,
  useMediaQuery,
  useTheme,
  Divider,
} from "@mui/material";
import type { JSX } from "react";
import { memo } from "react";

import useFilteredProjects from "@entities/search/hooks/useFilteredProjects";
import { SELECT_FIELD_CONFIGS } from "@entities/search/model/selectFieldConfigs";
import type { ProjectSearchFilterOption } from "@entities/search/types";
import MemoizedSelectBox from "@entities/search/ui/project-search-input/MemoizedSelectBox";
import SearchInputSection from "@entities/search/ui/SearchInputSection";

interface ProjectSearchFormProps {
  onSearch: (filter: ProjectSearchFilterOption) => void;
  isLoading?: boolean;
}

const ProjectSearchForm = ({
  onSearch,
  isLoading = false,
}: ProjectSearchFormProps): JSX.Element => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const {
    title,
    category,
    position,
    status,
    workflow,
    sortBy,
    updateTitle,
    updateCategory,
    updatePosition,
    updateStatus,
    updateWorkflow,
    updateSortBy,
    resetFilters,
    getActiveFiltersCount,
    getCleanFilter,
  } = useFilteredProjects();

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <StyledContainer>
      <HeaderSection>
        <TitleArea>
          <TextContainer>
            <MainTitle variant={isMobile ? "h5" : "h4"}>
              프로젝트 찾기
            </MainTitle>
            <SubTitle variant="body1">
              원하는 조건으로 프로젝트를 검색하고 필터링하세요
            </SubTitle>
          </TextContainer>
        </TitleArea>

        <StatusArea>
          {activeFiltersCount > 0 && (
            <ActiveFiltersChip
              icon={<FilterListIcon fontSize="small" />}
              label={`${activeFiltersCount}개 활성 필터`}
              size="medium"
            />
          )}
          <ResetButton
            variant="outlined"
            startIcon={<TuneIcon fontSize="small" />}
            onClick={resetFilters}
            disabled={isLoading}
          >
            필터 초기화
          </ResetButton>
        </StatusArea>
      </HeaderSection>

      <SearchSection>
        <SearchContainer>
          <SearchInputSection title={title} onTitleChange={updateTitle} />
        </SearchContainer>
      </SearchSection>

      <FiltersSection>
        <SectionHeader>
          <SectionTitle variant="h6">상세 필터</SectionTitle>
          <SectionDivider />
        </SectionHeader>

        <FiltersGrid>
          <MemoizedSelectBox
            config={SELECT_FIELD_CONFIGS.category}
            value={category || "all"}
            onChange={updateCategory as (value: string) => void}
          />

          <MemoizedSelectBox
            config={SELECT_FIELD_CONFIGS.position}
            value={position || "all"}
            onChange={updatePosition as (value: string) => void}
          />

          <MemoizedSelectBox
            config={SELECT_FIELD_CONFIGS.status}
            value={status || "all"}
            onChange={updateStatus as (value: string) => void}
          />

          <MemoizedSelectBox
            config={SELECT_FIELD_CONFIGS.workflow}
            value={workflow || "all"}
            onChange={updateWorkflow as (value: string) => void}
          />

          <MemoizedSelectBox
            config={SELECT_FIELD_CONFIGS.sortBy}
            value={sortBy || "latest"}
            onChange={updateSortBy as (value: string) => void}
          />
        </FiltersGrid>
      </FiltersSection>

      <ActionSection>
        <SearchButton
          variant="contained"
          size="large"
          fullWidth={isMobile}
          startIcon={<Search />}
          onClick={() => onSearch(getCleanFilter())}
          disabled={isLoading}
        >
          {isLoading ? "검색 중..." : "프로젝트 검색"}
        </SearchButton>
      </ActionSection>
    </StyledContainer>
  );
};

export default memo(ProjectSearchForm);

const StyledContainer = styled(Paper)(({ theme }) => ({
  width: "100%",
  borderRadius: theme.spacing(3),
  overflow: "hidden",
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

const TitleArea = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
}));

const TextContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: 4,
}));

const MainTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  color: theme.palette.text.primary,
  letterSpacing: "-0.02em",
}));

const SubTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontWeight: 500,
}));

const StatusArea = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),

  [theme.breakpoints.down("md")]: {
    justifyContent: "space-between",
  },
}));

const ActiveFiltersChip = styled(Chip)(({ theme }) => ({
  fontWeight: 600,
  fontSize: "0.875rem",
  height: 40,
  backgroundColor: alpha(theme.palette.primary.main, 0.12),
  color: theme.palette.primary.main,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,

  "& .MuiChip-icon": {
    color: theme.palette.primary.main,
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

const SectionHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(3),
  gap: theme.spacing(2),
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: theme.palette.text.primary,
  flexShrink: 0,
}));

const SectionDivider = styled(Divider)(({ theme }) => ({
  flex: 1,
  backgroundColor: alpha(theme.palette.primary.main, 0.1),
}));

const FiltersGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: theme.spacing(3),

  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "repeat(3, 1fr)",
  },

  [theme.breakpoints.up("lg")]: {
    gridTemplateColumns: "repeat(5, 1fr)",
  },
}));

const ActionSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  paddingTop: theme.spacing(2),
  display: "flex",
  justifyContent: "center",
  backgroundColor: theme.palette.background.paper,
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
