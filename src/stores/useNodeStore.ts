// stores/useNodeStore.ts
import { applyNodeChanges, type Node, type NodeChange } from "@xyflow/react";
import { create } from "zustand";

interface NodeStore {
    nodes: Node[];
    setNodes: (nodes: Node[]) => void;
    addNode: (node: Node) => void;
    updateNode: (id: string, partial: Partial<Node>) => void;
    removeNode: (id: string) => void;
    updateNodes: (changes: NodeChange[]) => void;
    emptyNodes: () => void;
}

export const useNodeStore = create<NodeStore>((set) => ({
    nodes: [],

    setNodes: (nodes) => set({ nodes }),

    addNode: (node) =>
        set((state) => ({
            nodes: [...state.nodes, node],
        })),

    updateNode: (id, partial) =>
        set((state) => ({
            nodes: state.nodes.map((n) =>
                n.id === id ? { ...n, ...partial } : n
            ),
        })),

    removeNode: (id) =>
        set((state) => ({
            nodes: state.nodes.filter((n) => n.id !== id),
        })),

    updateNodes: (changes) =>
        set((state) => ({
            nodes: applyNodeChanges(changes, state.nodes),
        })),
    emptyNodes: () =>
        set(() => ({
            nodes: [],
        })),
}));
