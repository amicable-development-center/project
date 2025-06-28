import { create } from "zustand";

interface LikeStore {
  likedProjectIds: string[];
  likedProjectsCount: number;
  setLikedProjectIds: (projectIds: string[]) => void;
  addLikedProject: (projectId: string) => void;
  removeLikedProject: (projectId: string) => void;
  removeLikeProjects: (projectIds: string[]) => void;
  isProjectLiked: (projectId: string) => boolean;
}

export const useLikeStore = create<LikeStore>((set, get) => ({
  likedProjectIds: [],
  likedProjectsCount: 0,

  setLikedProjectIds: (projectIds) =>
    set({
      likedProjectIds: projectIds,
      likedProjectsCount: projectIds.length,
    }),

  addLikedProject: (projectId) =>
    set((state) => {
      if (!state.likedProjectIds.includes(projectId)) {
        const newIds = [...state.likedProjectIds, projectId];
        return {
          likedProjectIds: newIds,
          likedProjectsCount: newIds.length,
        };
      }
      return state;
    }),

  removeLikedProject: (projectId) =>
    set((state) => {
      const newIds = state.likedProjectIds.filter((id) => id !== projectId);
      return {
        likedProjectIds: newIds,
        likedProjectsCount: newIds.length,
      };
    }),

  removeLikeProjects: (projectIds: string[]) =>
    set((state) => {
      const newIds = state.likedProjectIds.filter(
        (id) => !projectIds.includes(id)
      );
      return {
        likedProjectIds: newIds,
        likedProjectsCount: newIds.length,
      };
    }),

  isProjectLiked: (projectId) => {
    const { likedProjectIds } = get();
    return likedProjectIds.includes(projectId);
  },
}));
