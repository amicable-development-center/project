import { create } from "zustand";

import type { ProjectListRes } from "@shared/types/project";

interface ProjectStoreState {
  likeProjects: ProjectListRes[];
  appliedProjects: ProjectListRes[];
  setLikeProjects: (projects: ProjectListRes[]) => void;
  setAppliedProjects: (projects: ProjectListRes[]) => void;
  removeLikeProjects: (ids: string[]) => void;
  removeAppliedProjects: (ids: string[]) => void;
}

export const useProjectStore = create<ProjectStoreState>((set) => ({
  likeProjects: [],
  appliedProjects: [],
  setLikeProjects: (projects) => set({ likeProjects: projects }),
  setAppliedProjects: (projects) => set({ appliedProjects: projects }),
  removeLikeProjects: (ids) =>
    set((state) => ({
      likeProjects: state.likeProjects.filter((p) => !ids.includes(p.id)),
    })),
  removeAppliedProjects: (ids) =>
    set((state) => ({
      appliedProjects: state.appliedProjects.filter((p) => !ids.includes(p.id)),
    })),
}));
