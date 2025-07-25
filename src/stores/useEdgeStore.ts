// stores/useEdgeStore.ts
import { applyEdgeChanges, type Edge, type EdgeChange } from "@xyflow/react";
import { create } from "zustand";

interface EdgeStore {
    edges: Edge[];
    setEdges: (edges: Edge[]) => void;
    addEdge: (edge: Edge) => void;
    updateEdge: (id: string, partial: Partial<Edge>) => void;
    removeEdge: (id: string) => void;
    updateEdges: (changes: EdgeChange[]) => void;
    emptyEdges: () => void;
}

export const useEdgeStore = create<EdgeStore>((set) => ({
    edges: [],

    setEdges: (edges) => set({ edges }),

    addEdge: (edge) =>
        set((state) => ({
            edges: [...state.edges, edge],
        })),

    updateEdge: (id, partial) =>
        set((state) => ({
            edges: state.edges.map((e) =>
                e.id === id ? { ...e, ...partial } : e
            ),
        })),

    removeEdge: (id) =>
        set((state) => ({
            edges: state.edges.filter((e) => e.id !== id),
        })),

    updateEdges: (changes) =>
        set((state) => ({
            edges: applyEdgeChanges(changes, state.edges),
        })),

    emptyEdges: () =>
        set(() => ({
            edges: [],
        })),
}));
