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

// 로컬 스토리지에서 검색 히스토리 불러오기
const getInitialSearchHistory = (): string[] => {
  try {
    const stored = localStorage.getItem("search-history");
    if (stored) {
      return JSON.parse(stored);
    } else {
      // 개발용 더미 데이터 (나중에 제거)
      return ["React 프로젝트", "TypeScript", "Frontend"];
    }
  } catch {
    // 개발용 더미 데이터 (나중에 제거)
    return ["React 프로젝트", "TypeScript", "Frontend"];
  }
};

// 로컬 스토리지에서 히스토리 활성화 상태 불러오기
const getInitialHistoryEnabled = (): boolean => {
  try {
    const stored = localStorage.getItem("search-history-enabled");
    return stored ? JSON.parse(stored) : true; // 기본값은 true
  } catch {
    return true;
  }
};

// 로컬 스토리지에 히스토리 활성화 상태 저장
const saveHistoryEnabled = (enabled: boolean): void => {
  try {
    localStorage.setItem("search-history-enabled", JSON.stringify(enabled));
  } catch {
    // 저장 실패 시 무시
  }
};

// 로컬 스토리지에 검색 히스토리 저장
const saveSearchHistory = (history: string[]): void => {
  try {
    localStorage.setItem("search-history", JSON.stringify(history));
  } catch {
    // 저장 실패 시 무시
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
    searchHistory: getInitialSearchHistory(),
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
      if (!isHistoryEnabled) return; // 히스토리가 비활성화되어 있으면 추가하지 않음

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
      console.log("스토어: 전체 히스토리 삭제");
      set({ searchHistory: [] });
      saveSearchHistory([]);
    },

    removeFromHistory: (searchTerm) => {
      console.log("스토어: 개별 히스토리 삭제", searchTerm);
      const currentHistory = get().searchHistory;
      const newHistory = currentHistory.filter((term) => term !== searchTerm);
      console.log("삭제 전:", currentHistory, "삭제 후:", newHistory);
      set({ searchHistory: newHistory });
      saveSearchHistory(newHistory);
    },

    toggleHistoryEnabled: () => {
      const currentEnabled = get().isHistoryEnabled;
      const newEnabled = !currentEnabled;
      console.log("스토어: 히스토리 토글", currentEnabled, "->", newEnabled);
      set({ isHistoryEnabled: newEnabled });
      saveHistoryEnabled(newEnabled);

      // 히스토리를 비활성화할 때 기존 히스토리도 삭제
      if (!newEnabled) {
        console.log("히스토리 비활성화로 인한 전체 삭제");
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
