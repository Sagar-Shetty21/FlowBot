import type { Node, Edge } from "@xyflow/react";

interface ProjectData {
    nodes: Node[];
    edges: Edge[];
    lastEdited?: number; // Timestamp of last edit
}

export function saveProjectToLocalStorage(
    nodes: Node[],
    edges: Edge[],
    projectName: string
): void {
    if (!projectName.trim()) {
        throw new Error("Project name cannot be empty.");
    }

    const projectsRaw = localStorage.getItem("chatbot-projects");
    const projects: Record<string, ProjectData> = projectsRaw
        ? JSON.parse(projectsRaw)
        : {};

    // Check if project name already exists
    if (projects[projectName]) {
        throw new Error(`A project named "${projectName}" already exists.`);
    }

    // Check for orphan nodes (no edge connected)
    const connectedNodeIds = new Set(
        edges.flatMap((e) => [e.source, e.target])
    );
    const orphanNodes = nodes.filter((n) => !connectedNodeIds.has(n.id));

    if (orphanNodes.length > 0) {
        throw new Error(
            `Found ${orphanNodes.length} unconnected node(s). Please connect all nodes before saving.`
        );
    }

    // Save the project
    projects[projectName] = { nodes, edges, lastEdited: Date.now() };
    localStorage.setItem("chatbot-projects", JSON.stringify(projects));
}
