import { create } from "zustand";

interface ProjectStore {
    activeProject: string;
    setActiveProject: (project: string) => void;
    clearActiveProject: () => void;
    activeNodeId?: string | null;
    setActiveNodeId: (nodeId: string | null) => void;
}

export const useProjectStore = create<ProjectStore>((set) => ({
    activeProject: "New Project",
    setActiveProject: (project) => set({ activeProject: project }),
    clearActiveProject: () => set({ activeProject: "" }),
    activeNodeId: null,
    setActiveNodeId: (nodeId) => set({ activeNodeId: nodeId ? nodeId : null }),
}));
