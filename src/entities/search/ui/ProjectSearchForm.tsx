import { Search } from "@mui/icons-material";
import {
  Box,
  Button,
  Stack,
  TextField,
  Paper,
  useTheme,
  alpha,
  Typography,
  Chip,
} from "@mui/material";
import type { JSX } from "react";

import useFilteredProjects from "@entities/search/hooks/useFilteredProjects";
import { SELECT_FIELD_CONFIGS } from "@entities/search/model/selectFieldConfigs";
import type { ProjectSearchFilterOption } from "@entities/search/types";
import ProjectSearchSelectBox from "@entities/search/ui/project-search-input/ProjectSearchSelectBox";

interface ProjectSearchFormProps {
  onSearch: (filter: ProjectSearchFilterOption) => void;
  isLoading?: boolean;
}

const ProjectSearchForm = ({
  onSearch,
  isLoading = false,
}: ProjectSearchFormProps): JSX.Element => {
  const theme = useTheme();
  const {
    filterState,
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

  const handleSearch = (): void => {
    const cleanFilter = getCleanFilter();
    onSearch(cleanFilter);
  };

  const handleReset = (): void => {
    resetFilters();
  };

  return (
    <Paper
      elevation={0}
      sx={{
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
        border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
        overflow: "hidden",
        mb: 4,
      }}
    >
      <Box
        sx={{
          background: theme.palette.background.paper,
          color: theme.palette.text.primary,
          p: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="h5" fontWeight="600">
              검색 및 필터
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {getActiveFiltersCount() > 0 && (
              <Chip
                label={`${getActiveFiltersCount()}개 필터 적용중`}
                size="small"
                color="primary"
              />
            )}
            <Button
              variant="outlined"
              size="small"
              onClick={handleReset}
              disabled={isLoading}
            >
              필터 초기화
            </Button>
          </Box>
        </>
      </Box>

      <Box sx={{ p: 3 }}>
        <Stack spacing={4}>
          <TextField
            fullWidth
            label="프로젝트 제목 검색"
            placeholder="검색할 프로젝트 제목을 입력하세요"
            value={filterState.title || ""}
            onChange={(e) => updateTitle(e.target.value)}
            variant="outlined"
            InputProps={{
              startAdornment: <Search sx={{ color: "action.active", mr: 1 }} />,
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                transition: "all 0.3s ease",
                "&:hover": {
                  boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.15)}`,
                },
                "&.Mui-focused": {
                  boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.25)}`,
                },
              },
            }}
          />

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
                md: "1fr 1fr 1fr",
                lg: "1fr 1fr 1fr 1fr 1fr",
              },
              gap: 3,
            }}
          >
            <ProjectSearchSelectBox
              config={SELECT_FIELD_CONFIGS.category}
              value={filterState.category || "all"}
              onChange={(value) => updateCategory(value as any)}
            />

            <ProjectSearchSelectBox
              config={SELECT_FIELD_CONFIGS.position}
              value={filterState.position || "all"}
              onChange={(value) => updatePosition(value as any)}
            />

            <ProjectSearchSelectBox
              config={SELECT_FIELD_CONFIGS.status}
              value={filterState.status || "all"}
              onChange={(value) => updateStatus(value as any)}
            />

            <ProjectSearchSelectBox
              config={SELECT_FIELD_CONFIGS.workflow}
              value={filterState.workflow || "all"}
              onChange={(value) => updateWorkflow(value as any)}
            />

            <ProjectSearchSelectBox
              config={SELECT_FIELD_CONFIGS.sortBy}
              value={filterState.sortBy || "latest"}
              onChange={(value) => updateSortBy(value as any)}
            />
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center", pt: 2 }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<Search />}
              onClick={handleSearch}
              disabled={isLoading}
              sx={{
                minWidth: 200,
                height: 56,
                fontSize: "1.1rem",
                fontWeight: "bold",
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                boxShadow: `0 4px 15px ${alpha(theme.palette.primary.main, 0.4)}`,
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: `0 6px 20px ${alpha(theme.palette.primary.main, 0.6)}`,
                  background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
                },
                "&:active": {
                  transform: "translateY(0px)",
                },
              }}
            >
              {isLoading ? "검색 중..." : "프로젝트 검색"}
            </Button>
          </Box>
        </Stack>
      </Box>
    </Paper>
  );
};

export default ProjectSearchForm;
