import { Box, styled } from "@mui/material";
import { memo } from "react";
import type { JSX } from "react";

import { SELECT_FIELD_CONFIGS } from "@entities/search/model/selectFieldConfigs";
import SelectBox from "@entities/search/ui/SelectBox";

import {
  useSearchCategory,
  useSearchPosition,
  useSearchStatus,
  useSearchWorkflow,
  useSearchSortBy,
  useSearchFilterActions,
} from "@shared/stores/searchStore";

export const MemoizedCategoryFilter = memo((): JSX.Element => {
  const category = useSearchCategory();
  const { updateCategory } = useSearchFilterActions();

  return (
    <SelectBox
      config={SELECT_FIELD_CONFIGS.category}
      value={category || "all"}
      onChange={updateCategory as (value: string) => void}
    />
  );
});

export const MemoizedPositionFilter = memo((): JSX.Element => {
  const position = useSearchPosition();
  const { updatePosition } = useSearchFilterActions();

  return (
    <SelectBox
      config={SELECT_FIELD_CONFIGS.position}
      value={position || "all"}
      onChange={updatePosition as (value: string) => void}
    />
  );
});

export const MemoizedStatusFilter = memo((): JSX.Element => {
  const status = useSearchStatus();
  const { updateStatus } = useSearchFilterActions();

  return (
    <SelectBox
      config={SELECT_FIELD_CONFIGS.status}
      value={status || "all"}
      onChange={updateStatus as (value: string) => void}
    />
  );
});

export const MemoizedWorkflowFilter = memo((): JSX.Element => {
  const workflow = useSearchWorkflow();
  const { updateWorkflow } = useSearchFilterActions();

  return (
    <SelectBox
      config={SELECT_FIELD_CONFIGS.workflow}
      value={workflow || "all"}
      onChange={updateWorkflow as (value: string) => void}
    />
  );
});

export const MemoizedSortByFilter = memo((): JSX.Element => {
  const sortBy = useSearchSortBy();
  const { updateSortBy } = useSearchFilterActions();

  return (
    <SelectBox
      config={SELECT_FIELD_CONFIGS.sortBy}
      value={sortBy || "latest"}
      onChange={updateSortBy as (value: string) => void}
    />
  );
});

// 전체 필터 그리드를 메모이제이션
export const MemoizedFiltersGrid = memo(
  (): JSX.Element => (
    <FiltersGrid>
      <MemoizedCategoryFilter />
      <MemoizedPositionFilter />
      <MemoizedStatusFilter />
      <MemoizedWorkflowFilter />
      <MemoizedSortByFilter />
    </FiltersGrid>
  )
);

// Styled Components
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
