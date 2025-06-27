import { create } from "zustand";

interface ApplicationsStore {
  appliedProjectIds: string[];
  appliedProjectsCount: number;
  setAppliedProjectIds: (projectIds: string[]) => void;
  addAppliedProject: (projectId: string) => void;
  removeAppliedProject: (projectId: string) => void;
  isProjectApplied: (projectId: string) => boolean;
}

export const useApplicationsStore = create<ApplicationsStore>((set, get) => ({
  appliedProjectIds: [],
  appliedProjectsCount: 0,

  setAppliedProjectIds: (projectIds: string[]) =>
    set({
      appliedProjectIds: projectIds,
      appliedProjectsCount: projectIds.length,
    }),

  addAppliedProject: (projectId: string) =>
    set((state) => {
      if (!state.appliedProjectIds.includes(projectId)) {
        const newIds = [...state.appliedProjectIds, projectId];
        return {
          appliedProjectIds: newIds,
          appliedProjectsCount: newIds.length,
        };
      }
      return state;
    }),

  removeAppliedProject: (projectId: string) =>
    set((state) => {
      const newIds = state.appliedProjectIds.filter((id) => id !== projectId);
      return {
        appliedProjectIds: newIds,
        appliedProjectsCount: newIds.length,
      };
    }),

  isProjectApplied: (projectId: string) => {
    const { appliedProjectIds } = get();
    return appliedProjectIds.includes(projectId);
  },
}));
