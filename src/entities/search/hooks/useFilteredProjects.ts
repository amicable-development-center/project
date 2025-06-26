import { useState, useMemo, useCallback } from "react";

import {
  RecruitmentStatus,
  type ProjectCategory,
  type Workflow,
} from "@shared/types/project";
import type { ProjectSearchFilterOption, SortBy } from "@shared/types/search";
import type { UserRole } from "@shared/types/user";

interface UseFilteredProjects {
  filterState: ProjectSearchFilterOption;
  title: string;
  category: ProjectCategory | "all";
  position: UserRole | "all";
  status: RecruitmentStatus | "all";
  workflow: Workflow | "all";
  sortBy: SortBy | "latest";
  updateTitle: (newTitle: string) => void;
  updateCategory: (newCategory: ProjectCategory | "all") => void;
  updatePosition: (newPosition: UserRole | "all") => void;
  updateStatus: (newStatus: RecruitmentStatus | "all") => void;
  updateWorkflow: (newWorkflow: Workflow | "all") => void;
  updateSortBy: (newSortBy: SortBy | "latest") => void;
  resetFilters: () => void;
  getActiveFiltersCount: () => number;
  getFilterStatus: () => ProjectSearchFilterOption;
}

const useFilteredProjects = (): UseFilteredProjects => {
  const [title, setTitle] = useState<string>("");
  const [category, setCategory] = useState<ProjectCategory | "all">("all");
  const [position, setPosition] = useState<UserRole | "all">("all");
  const [status, setStatus] = useState<RecruitmentStatus | "all">("all");
  const [workflow, setWorkflow] = useState<Workflow | "all">("all");
  const [sortBy, setSortBy] = useState<SortBy | "latest">("latest");

  const updateTitle = (newTitle: string): void => {
    setTitle(newTitle);
  };

  const updateCategory = (newCategory: ProjectCategory | "all"): void => {
    setCategory(newCategory);
  };

  const updatePosition = (newPosition: UserRole | "all"): void => {
    setPosition(newPosition);
  };

  const updateStatus = (newStatus: RecruitmentStatus | "all"): void => {
    setStatus(newStatus);
  };

  const updateWorkflow = (newWorkflow: Workflow | "all"): void => {
    setWorkflow(newWorkflow);
  };

  const updateSortBy = (newSortBy: SortBy | "latest"): void => {
    setSortBy(newSortBy);
  };

  const resetFilters = (): void => {
    setTitle("");
    setCategory("all");
    setPosition("all");
    setStatus("all");
    setWorkflow("all");
    setSortBy("latest");
  };

  const getActiveFiltersCount = (): number => {
    let count = 0;
    if (title) count++;
    if (category !== "all") count++;
    if (position !== "all") count++;
    if (status !== "all") count++;
    if (workflow !== "all") count++;
    return count;
  };

  const getFilterStatus = useCallback((): ProjectSearchFilterOption => {
    const cleanFilter: ProjectSearchFilterOption = {
      title: title || "",
      category: category === "all" ? undefined : category,
      position: position === "all" ? undefined : position,
      status: status === "all" ? undefined : status,
      workflow: workflow === "all" ? undefined : workflow,
      sortBy: sortBy || "latest",
    };

    return Object.fromEntries(
      Object.entries(cleanFilter).filter(([_, value]) => value !== undefined)
    ) as ProjectSearchFilterOption;
  }, [title, category, position, status, workflow, sortBy]);

  const filterState = useMemo(
    () => ({
      title,
      category,
      position,
      status,
      workflow,
      sortBy,
    }),
    [title, category, position, status, workflow, sortBy]
  );

  return {
    filterState,
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
    getFilterStatus,
  };
};

export default useFilteredProjects;
