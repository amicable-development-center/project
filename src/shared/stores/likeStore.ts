import { create } from "zustand";

export const useLikeStore = create<LikeStore>((set) => ({
  likedProjects: [],
  setLikedProjects: (projects) => set({ likedProjects: projects }),
}));

interface LikeStore {
  likedProjects: string[];
  setLikedProjects: (projects: string[]) => void;
}
