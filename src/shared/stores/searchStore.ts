import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { useShallow } from "zustand/react/shallow";

import {
  RecruitmentStatus,
  type ProjectCategory,
  type Workflow,
} from "@shared/types/project";
import type { ProjectSearchFilterOption, SortBy } from "@shared/types/search";
import type { UserRole } from "@shared/types/user";

interface SearchState {
  title: string;
  category: ProjectCategory | "all";
  position: UserRole | "all";
  status: RecruitmentStatus | "all";
  workflow: Workflow | "all";
  sortBy: SortBy | "latest";

  updateTitle: (title: string) => void;
  updateCategory: (category: ProjectCategory | "all") => void;
  updatePosition: (position: UserRole | "all") => void;
  updateStatus: (status: RecruitmentStatus | "all") => void;
  updateWorkflow: (workflow: Workflow | "all") => void;
  updateSortBy: (sortBy: SortBy | "latest") => void;
  resetFilters: () => void;

  getActiveFiltersCount: () => number;
  getFilterStatus: () => ProjectSearchFilterOption;
}

export const useSearchStore = create<SearchState>()(
  subscribeWithSelector((set, get) => ({
    title: "",
    category: "all",
    position: "all",
    status: "all",
    workflow: "all",
    sortBy: "latest",

    updateTitle: (title) => set({ title }),
    updateCategory: (category) => set({ category }),
    updatePosition: (position) => set({ position }),
    updateStatus: (status) => set({ status }),
    updateWorkflow: (workflow) => set({ workflow }),
    updateSortBy: (sortBy) => set({ sortBy }),

    resetFilters: () =>
      set({
        title: "",
        category: "all",
        position: "all",
        status: "all",
        workflow: "all",
        sortBy: "latest",
      }),

    getActiveFiltersCount: () => {
      const state = get();
      let count = 0;
      if (state.title.trim() !== "") count++;
      if (state.category !== "all") count++;
      if (state.position !== "all") count++;
      if (state.status !== "all") count++;
      if (state.workflow !== "all") count++;
      return count;
    },

    getFilterStatus: () => {
      const state = get();
      const cleanFilter: ProjectSearchFilterOption = {
        title: state.title || "",
        category: state.category === "all" ? undefined : state.category,
        position: state.position === "all" ? undefined : state.position,
        status: state.status === "all" ? undefined : state.status,
        workflow: state.workflow === "all" ? undefined : state.workflow,
        sortBy: state.sortBy || "latest",
      };

      return Object.fromEntries(
        Object.entries(cleanFilter).filter(([_, value]) => value !== undefined)
      ) as ProjectSearchFilterOption;
    },
  }))
);

export const useSearchTitle = (): string =>
  useSearchStore((state) => state.title);

export const useSearchTitleActions = (): {
  updateTitle: (title: string) => void;
} =>
  useSearchStore(
    useShallow((state) => ({
      updateTitle: state.updateTitle,
    }))
  );

export const useSearchCategory = (): ProjectCategory | "all" =>
  useSearchStore((state) => state.category);
export const useSearchPosition = (): UserRole | "all" =>
  useSearchStore((state) => state.position);
export const useSearchStatus = (): RecruitmentStatus | "all" =>
  useSearchStore((state) => state.status);
export const useSearchWorkflow = (): Workflow | "all" =>
  useSearchStore((state) => state.workflow);
export const useSearchSortBy = (): SortBy | "latest" =>
  useSearchStore((state) => state.sortBy);

export const useSearchFilterActions = (): {
  updateCategory: (category: ProjectCategory | "all") => void;
  updatePosition: (position: UserRole | "all") => void;
  updateStatus: (status: RecruitmentStatus | "all") => void;
  updateWorkflow: (workflow: Workflow | "all") => void;
  updateSortBy: (sortBy: SortBy | "latest") => void;
} =>
  useSearchStore(
    useShallow((state) => ({
      updateCategory: state.updateCategory,
      updatePosition: state.updatePosition,
      updateStatus: state.updateStatus,
      updateWorkflow: state.updateWorkflow,
      updateSortBy: state.updateSortBy,
    }))
  );

export const useSearchUtils = (): {
  resetFilters: () => void;
  getActiveFiltersCount: () => number;
  getFilterStatus: () => ProjectSearchFilterOption;
} =>
  useSearchStore(
    useShallow((state) => ({
      resetFilters: state.resetFilters,
      getActiveFiltersCount: state.getActiveFiltersCount,
      getFilterStatus: state.getFilterStatus,
    }))
  );

// 활성 필터 수를 reactive하게 가져오는 selector
export const useActiveFiltersCount = (): number =>
  useSearchStore((state) => {
    let count = 0;
    if (state.title.trim() !== "") count++;
    if (state.category !== "all") count++;
    if (state.position !== "all") count++;
    if (state.status !== "all") count++;
    if (state.workflow !== "all") count++;
    return count;
  });
