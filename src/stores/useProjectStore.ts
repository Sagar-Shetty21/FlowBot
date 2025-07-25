import { create } from "zustand";

interface ProjectStore {
    activeProject: string;
    setActiveProject: (project: string) => void;
    clearActiveProject: () => void;
}

export const useProjectStore = create<ProjectStore>((set) => ({
    activeProject: "New Project",
    setActiveProject: (project) => set({ activeProject: project }),
    clearActiveProject: () => set({ activeProject: "" }),
}));
