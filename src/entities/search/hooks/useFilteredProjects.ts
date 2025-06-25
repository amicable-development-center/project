import { useState, useCallback } from "react";

import type { ProjectSearchFilterOption, SortBy } from "@entities/search/types";

import {
  RecruitmentStatus,
  type ProjectCategory,
  type Workflow,
} from "@shared/types/project";
import type { UserRole } from "@shared/types/user";

const INITIAL_FILTER_STATE: ProjectSearchFilterOption = {
  title: "",
  category: undefined,
  position: undefined,
  status: undefined,
  workflow: undefined,
  sortBy: "latest",
};

interface UseFilteredProjects {
  filterState: ProjectSearchFilterOption;
  updateTitle: (title: string) => void;
  updateCategory: (category: ProjectCategory | "all") => void;
  updatePosition: (position: UserRole | "all") => void;
  updateStatus: (status: RecruitmentStatus | "all") => void;
  updateWorkflow: (workflow: Workflow | "all") => void;
  updateSortBy: (sortBy: SortBy) => void;
  resetFilters: () => void;
  getActiveFiltersCount: () => number;
  getCleanFilter: () => ProjectSearchFilterOption;
}

const useFilteredProjects = (): UseFilteredProjects => {
  const [filterState, setFilterState] =
    useState<ProjectSearchFilterOption>(INITIAL_FILTER_STATE);

  const updateFilter = useCallback(
    <K extends keyof ProjectSearchFilterOption>(
      key: K,
      value: ProjectSearchFilterOption[K]
    ) => {
      const safeValue =
        value && typeof value === "string" && value.trim() !== ""
          ? value
          : undefined;
      setFilterState((prev) => ({ ...prev, [key]: safeValue }));
    },
    []
  );

  const updateTitle = useCallback((title: string) => {
    setFilterState((prev) => ({ ...prev, title }));
  }, []);

  const updateCategory = useCallback(
    (category: ProjectCategory | "all") => {
      updateFilter("category", category === "all" ? undefined : category);
    },
    [updateFilter]
  );

  const updatePosition = useCallback(
    (position: UserRole | "all") => {
      updateFilter("position", position === "all" ? undefined : position);
    },
    [updateFilter]
  );

  const updateStatus = useCallback(
    (status: RecruitmentStatus | "all") => {
      updateFilter("status", status === "all" ? undefined : status);
    },
    [updateFilter]
  );

  const updateWorkflow = useCallback(
    (workflow: Workflow | "all") => {
      updateFilter("workflow", workflow === "all" ? undefined : workflow);
    },
    [updateFilter]
  );

  const updateSortBy = useCallback(
    (sortBy: SortBy) => {
      updateFilter("sortBy", sortBy);
    },
    [updateFilter]
  );

  const resetFilters = useCallback(() => {
    setFilterState(INITIAL_FILTER_STATE);
  }, []);

  const getActiveFiltersCount = useCallback((): number => {
    let count = 0;

    if (filterState.title) count++;
    if (filterState.category) count++;
    if (filterState.position) count++;
    if (filterState.status) count++;
    if (filterState.workflow) count++;
    if (filterState.sortBy !== "latest") count++;
    return count;
  }, [filterState]);

  const getCleanFilter = useCallback((): ProjectSearchFilterOption => {
    const filter: ProjectSearchFilterOption = {};

    if (filterState.title) filter.title = filterState.title;
    if (filterState.category) filter.category = filterState.category;
    if (filterState.position) filter.position = filterState.position;
    if (filterState.status) filter.status = filterState.status;
    if (filterState.workflow) filter.workflow = filterState.workflow;
    if (filterState.sortBy) filter.sortBy = filterState.sortBy;
    return filter;
  }, [filterState]);

  return {
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
  };
};

export default useFilteredProjects;
