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
  category: "all",
  position: "all",
  status: "all",
  workflow: "all",
  sortBy: "latest",
};

interface UseFilteredProjects {
  filterState: ProjectSearchFilterOption;
  updateTitle: (title: string) => void;
  updateCategory: (category: ProjectCategory | "all") => void;
  updatePosition: (position: UserRole | "all") => void;
  updateStatus: (status: RecruitmentStatus | "all") => void;
  updateWorkflow: (workflow: Workflow | "all") => void;
  updateSortBy: (sortBy: SortBy | "latest") => void;
  resetFilters: () => void;
  getActiveFiltersCount: () => number;
  getCleanFilter: () => ProjectSearchFilterOption;
}

const useFilteredProjects = (): UseFilteredProjects => {
  const [filterState, setFilterState] =
    useState<ProjectSearchFilterOption>(INITIAL_FILTER_STATE);

  const updateTitle = useCallback((title: string) => {
    setFilterState((prev) => ({ ...prev, title }));
  }, []);

  const updateCategory = useCallback((category: ProjectCategory | "all") => {
    setFilterState((prev) => ({ ...prev, category }));
  }, []);

  const updatePosition = useCallback((position: UserRole | "all") => {
    setFilterState((prev) => ({ ...prev, position }));
  }, []);

  const updateStatus = useCallback((status: RecruitmentStatus | "all") => {
    setFilterState((prev) => ({ ...prev, status }));
  }, []);

  const updateWorkflow = useCallback((workflow: Workflow | "all") => {
    setFilterState((prev) => ({ ...prev, workflow }));
  }, []);

  const updateSortBy = useCallback((sortBy: SortBy | "latest") => {
    setFilterState((prev) => ({ ...prev, sortBy }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilterState(INITIAL_FILTER_STATE);
  }, []);

  const getActiveFiltersCount = useCallback((): number => {
    let count = 0;
    if (filterState.title) count++;
    if (filterState.category && filterState.category !== "all") count++;
    if (filterState.position && filterState.position !== "all") count++;
    if (filterState.status && filterState.status !== "all") count++;
    if (filterState.workflow && filterState.workflow !== "all") count++;
    if (filterState.sortBy && filterState.sortBy !== "latest") count++;
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
