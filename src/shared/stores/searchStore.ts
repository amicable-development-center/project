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
  searchHistory: string[];
  isHistoryEnabled: boolean;

  updateTitle: (title: string) => void;
  updateCategory: (category: ProjectCategory | "all") => void;
  updatePosition: (position: UserRole | "all") => void;
  updateStatus: (status: RecruitmentStatus | "all") => void;
  updateWorkflow: (workflow: Workflow | "all") => void;
  updateSortBy: (sortBy: SortBy | "latest") => void;
  resetFilters: () => void;
  addToHistory: (searchTerm: string) => void;
  clearHistory: () => void;
  removeFromHistory: (searchTerm: string) => void;
  toggleHistoryEnabled: () => void;

  getActiveFiltersCount: () => number;
  getFilterStatus: () => ProjectSearchFilterOption;
}

const getInitialSearchHistory = (): string[] | undefined => {
  try {
    const stored = localStorage.getItem("search-history");
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    return [];
  }
};

const getInitialHistoryEnabled = (): boolean => {
  try {
    const stored = localStorage.getItem("search-history-enabled");
    return stored ? JSON.parse(stored) : true;
  } catch {
    return true;
  }
};

const saveHistoryEnabled = (enabled: boolean): void => {
  try {
    localStorage.setItem("search-history-enabled", JSON.stringify(enabled));
  } catch {}
};

const saveSearchHistory = (history: string[]): void => {
  try {
    localStorage.setItem("search-history", JSON.stringify(history));
  } catch {
    return;
  }
};

export const useSearchStore = create<SearchState>()(
  subscribeWithSelector((set, get) => ({
    title: "",
    category: "all",
    position: "all",
    status: "all",
    workflow: "all",
    sortBy: "latest",
    searchHistory: getInitialSearchHistory() || [],
    isHistoryEnabled: getInitialHistoryEnabled(),

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

    addToHistory: (searchTerm) => {
      const { isHistoryEnabled } = get();
      if (!isHistoryEnabled) return;

      const trimmedTerm = searchTerm.trim();
      if (!trimmedTerm) return;

      const currentHistory = get().searchHistory;
      const newHistory = [
        trimmedTerm,
        ...currentHistory.filter((term) => term !== trimmedTerm),
      ].slice(0, 10);

      set({ searchHistory: newHistory });
      saveSearchHistory(newHistory);
    },

    clearHistory: () => {
      set({ searchHistory: [] });
      saveSearchHistory([]);
    },

    removeFromHistory: (searchTerm) => {
      const currentHistory = get().searchHistory;
      const newHistory = currentHistory.filter((term) => term !== searchTerm);
      set({ searchHistory: newHistory });
      saveSearchHistory(newHistory);
    },

    toggleHistoryEnabled: () => {
      const currentEnabled = get().isHistoryEnabled;
      const newEnabled = !currentEnabled;
      set({ isHistoryEnabled: newEnabled });
      saveHistoryEnabled(newEnabled);

      if (!newEnabled) {
        set({ searchHistory: [] });
        saveSearchHistory([]);
      }
    },

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

export const useSearchHistory = (): string[] =>
  useSearchStore((state) => state.searchHistory);

export const useSearchHistoryActions = (): {
  addToHistory: (searchTerm: string) => void;
  clearHistory: () => void;
  removeFromHistory: (searchTerm: string) => void;
  toggleHistoryEnabled: () => void;
} =>
  useSearchStore(
    useShallow((state) => ({
      addToHistory: state.addToHistory,
      clearHistory: state.clearHistory,
      removeFromHistory: state.removeFromHistory,
      toggleHistoryEnabled: state.toggleHistoryEnabled,
    }))
  );

export const useIsHistoryEnabled = (): boolean =>
  useSearchStore((state) => state.isHistoryEnabled);
