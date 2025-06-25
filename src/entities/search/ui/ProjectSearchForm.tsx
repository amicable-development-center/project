import { Search, Clear, FilterList, TuneRounded } from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  Paper,
  Divider,
  useTheme,
  alpha,
} from "@mui/material";
import type { JSX } from "react";

import useFilteredProjects from "@entities/search/hooks/useFilteredProjects";
import type { ProjectSearchFilterOption, SortBy } from "@entities/search/types";

import {
  ProjectCategory,
  RecruitmentStatus,
  Workflow,
} from "@shared/types/project";
import type { UserRole } from "@shared/types/user";

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

  const positionOptions: { value: UserRole; label: string }[] = [
    { value: "frontend", label: "프론트앤드" },
    { value: "backend", label: "백엔드" },
    { value: "fullstack", label: "풀스택" },
    { value: "designer", label: "디자이너" },
    { value: "pm", label: "PM" },
  ];

  return (
    <Paper
      elevation={0}
      sx={{
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
        border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
        borderRadius: 0,
        overflow: "hidden",
        mb: 4,
      }}
    >
      {/* 헤더 영역 */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          color: "white",
          p: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <TuneRounded sx={{ fontSize: 28 }} />
          <Typography variant="h5" fontWeight="600">
            프로젝트 검색
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {getActiveFiltersCount() > 0 && (
            <Chip
              label={`${getActiveFiltersCount()}개 필터 적용중`}
              size="small"
              sx={{
                backgroundColor: alpha(theme.palette.common.white, 0.2),
                color: "white",
                fontWeight: "bold",
              }}
            />
          )}
          <IconButton
            onClick={handleReset}
            disabled={isLoading}
            sx={{
              color: "white",
              border: `1px solid ${alpha(theme.palette.common.white, 0.3)}`,
              "&:hover": {
                backgroundColor: alpha(theme.palette.common.white, 0.1),
                borderColor: alpha(theme.palette.common.white, 0.5),
              },
            }}
          >
            <Clear />
          </IconButton>
        </Box>
      </Box>

      <Box sx={{ p: 4 }}>
        <Stack spacing={4}>
          {/* 프로젝트 제목 검색 */}
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
                borderRadius: 5,
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

          {/* 필터 옵션들 - 한 줄로 배치 */}
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
            {/* 프로젝트 분야 */}
            <FormControl
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 5,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow: `0 2px 8px ${alpha(theme.palette.primary.main, 0.1)}`,
                  },
                },
              }}
            >
              <InputLabel>🎯 프로젝트 분야</InputLabel>
              <Select
                value={filterState.category || "all"}
                label="🎯 프로젝트 분야"
                onChange={(e) =>
                  updateCategory(
                    e.target.value === "all"
                      ? "all"
                      : (e.target.value as ProjectCategory)
                  )
                }
              >
                <MenuItem value="all">전체 카테고리</MenuItem>
                {Object.values(ProjectCategory).map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* 모집 포지션 */}
            <FormControl
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 5,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow: `0 2px 8px ${alpha(theme.palette.secondary.main, 0.1)}`,
                  },
                },
              }}
            >
              <InputLabel>👥 모집 포지션</InputLabel>
              <Select
                value={filterState.position || "all"}
                label="👥 모집 포지션"
                onChange={(e) =>
                  updatePosition(
                    e.target.value === "all"
                      ? "all"
                      : (e.target.value as UserRole)
                  )
                }
              >
                <MenuItem value="all">전체 직무</MenuItem>
                {positionOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* 모집 상태 */}
            <FormControl
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 5,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow: `0 2px 8px ${alpha(theme.palette.success.main, 0.1)}`,
                  },
                },
              }}
            >
              <InputLabel>📢 모집 상태</InputLabel>
              <Select
                value={filterState.status || "all"}
                label="📢 모집 상태"
                onChange={(e) =>
                  updateStatus(
                    e.target.value === "all"
                      ? "all"
                      : (e.target.value as RecruitmentStatus)
                  )
                }
              >
                <MenuItem value="all">전체 상태</MenuItem>
                {Object.values(RecruitmentStatus).map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* 진행 방식 */}
            <FormControl
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 5,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow: `0 2px 8px ${alpha(theme.palette.info.main, 0.1)}`,
                  },
                },
              }}
            >
              <InputLabel>🌍 진행 방식</InputLabel>
              <Select
                value={filterState.workflow || "all"}
                label="🌍 진행 방식"
                onChange={(e) =>
                  updateWorkflow(
                    e.target.value === "all"
                      ? "all"
                      : (e.target.value as Workflow)
                  )
                }
              >
                <MenuItem value="all">전체 지역</MenuItem>
                {Object.values(Workflow).map((workflow) => (
                  <MenuItem key={workflow} value={workflow}>
                    {workflow}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* 정렬 방식 */}
            <FormControl
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 5,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow: `0 2px 8px ${alpha(theme.palette.warning.main, 0.1)}`,
                  },
                },
              }}
            >
              <InputLabel>📊 정렬 방식</InputLabel>
              <Select
                value={filterState.sortBy || "latest"}
                label="📊 정렬 방식"
                onChange={(e) => updateSortBy(e.target.value as SortBy)}
              >
                <MenuItem value="latest">최신순</MenuItem>
                <MenuItem value="deadline">마감순</MenuItem>
                <MenuItem value="applicants">지원자순</MenuItem>
                <MenuItem value="popularity">인기순</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* 선택된 필터 표시 */}
          {getActiveFiltersCount() > 0 && (
            <>
              <Divider sx={{ opacity: 0.3 }} />
              <Box>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
                >
                  <FilterList sx={{ color: "primary.main" }} />
                  <Typography
                    variant="body2"
                    fontWeight="600"
                    color="primary.main"
                  >
                    활성 필터 ({getActiveFiltersCount()}개)
                  </Typography>
                </Box>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {filterState.title && (
                    <Chip
                      label={`제목: ${filterState.title}`}
                      onDelete={() => updateTitle("")}
                      size="small"
                      variant="outlined"
                      color="primary"
                      sx={{
                        borderRadius: 5,
                        "& .MuiChip-deleteIcon": {
                          color: "primary.main",
                        },
                      }}
                    />
                  )}
                  {filterState.position && filterState.position !== "all" && (
                    <Chip
                      label={`포지션: ${positionOptions.find((p) => p.value === filterState.position)?.label}`}
                      onDelete={() => updatePosition("all")}
                      size="small"
                      variant="outlined"
                      color="secondary"
                      sx={{ borderRadius: 5 }}
                    />
                  )}
                  {filterState.category && filterState.category !== "all" && (
                    <Chip
                      label={`분야: ${filterState.category}`}
                      onDelete={() => updateCategory("all")}
                      size="small"
                      variant="outlined"
                      color="primary"
                      sx={{ borderRadius: 5 }}
                    />
                  )}
                  {filterState.status && filterState.status !== "all" && (
                    <Chip
                      label={`상태: ${filterState.status}`}
                      onDelete={() => updateStatus("all")}
                      size="small"
                      variant="outlined"
                      color="success"
                      sx={{ borderRadius: 5 }}
                    />
                  )}
                  {filterState.workflow && filterState.workflow !== "all" && (
                    <Chip
                      label={`방식: ${filterState.workflow}`}
                      onDelete={() => updateWorkflow("all")}
                      size="small"
                      variant="outlined"
                      color="info"
                      sx={{ borderRadius: 5 }}
                    />
                  )}
                  {filterState.sortBy && filterState.sortBy !== "latest" && (
                    <Chip
                      label={`정렬: ${filterState.sortBy}`}
                      onDelete={() => updateSortBy("latest")}
                      size="small"
                      variant="outlined"
                      color="warning"
                      sx={{ borderRadius: 5 }}
                    />
                  )}
                </Stack>
              </Box>
            </>
          )}

          {/* 검색 버튼 */}
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
                borderRadius: 0,
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
