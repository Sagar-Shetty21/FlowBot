import type { Edge, Node } from "@xyflow/react";
import { useNodeStore } from "../stores/useNodeStore";
import { useEdgeStore } from "../stores/useEdgeStore";
import { useProjectStore } from "../stores/useProjectStore";

interface ProjectData {
    nodes: Node[];
    edges: Edge[];
    lastEdited: number;
}

interface ProjectWithName extends ProjectData {
    name: string;
}

function getProjectsFromLocalStorage(): ProjectWithName[] {
    const projectsRaw = localStorage.getItem("chatbot-projects");

    if (!projectsRaw) return [];

    try {
        const parsed = JSON.parse(projectsRaw) as Record<string, ProjectData>;

        const formatted: ProjectWithName[] = Object.entries(parsed).map(
            ([name, data]) => ({
                name,
                ...data,
            })
        );

        return formatted;
    } catch (e) {
        console.error("Failed to parse projects:", e);
        return [];
    }
}

const FlowProjectsList = ({ onClose }: { onClose: () => void }) => {
    // Sample flow data
    const flows = getProjectsFromLocalStorage();
    const { setNodes } = useNodeStore.getState();
    const { setEdges } = useEdgeStore.getState();
    const { setActiveProject, setActiveNodeId } = useProjectStore();

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    return (
        <div className="absolute inset-0 min-h-screen p-8 bg-transparent backdrop-blur-xl">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1
                        className="text-3xl font-bold text-gray-800 mb-2"
                        style={{
                            fontFamily: "Comic Sans MS, cursive",
                            filter: "drop-shadow(2px 2px 0px rgba(0,0,0,0.1))",
                        }}
                    >
                        My Flows
                    </h1>
                    <div className="h-1 w-16 bg-purple-400 rounded-full transform -rotate-1"></div>
                </div>

                {/* Flows Container */}
                <div
                    className="backdrop-blur-md bg-white/20 rounded-3xl p-6 border border-white/30 shadow-lg"
                    style={{
                        filter: "drop-shadow(0 8px 32px rgba(0,0,0,0.1))",
                        backdropFilter: "blur(16px)",
                    }}
                >
                    <div className="space-y-4">
                        {flows.map((flow, index) => (
                            <div
                                key={flow.name}
                                className="group relative p-4 rounded-2xl bg-white/40 hover:bg-white/60 transition-all duration-300 cursor-pointer border border-gray-200/50 hover:border-gray-300/70"
                                style={{
                                    transform: `rotate(${
                                        index % 2 === 0 ? "0.5deg" : "-0.5deg"
                                    })`,
                                    filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.05))",
                                }}
                                onClick={() => {
                                    setNodes(flow.nodes);
                                    setEdges(flow.edges);
                                    setActiveNodeId(null);
                                    setActiveProject(flow.name);
                                    onClose();
                                }}
                            >
                                {/* Sketchy border effect */}
                                <div
                                    className="absolute inset-0 rounded-2xl border-2 border-gray-400/30 pointer-events-none"
                                    style={{
                                        borderStyle: "dashed",
                                        borderRadius: "1rem",
                                        transform: "rotate(0.2deg)",
                                    }}
                                ></div>

                                <div className="relative z-10 flex justify-between items-center">
                                    <div className="flex-1">
                                        <h3
                                            className="text-lg font-semibold text-gray-800 mb-1"
                                            style={{
                                                fontFamily:
                                                    "Comic Sans MS, cursive",
                                                textShadow:
                                                    "1px 1px 0px rgba(255,255,255,0.5)",
                                            }}
                                        >
                                            {flow.name}
                                        </h3>
                                        <p
                                            className="text-sm text-gray-600"
                                            style={{
                                                fontFamily:
                                                    "Comic Sans MS, cursive",
                                            }}
                                        >
                                            Last edited:{" "}
                                            {formatDate(
                                                new Date(
                                                    flow.lastEdited
                                                ).toString()
                                            )}
                                        </p>
                                    </div>

                                    {/* Sketchy arrow */}
                                    <div className="ml-4 transform group-hover:translate-x-1 transition-transform duration-200">
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            className="text-gray-500"
                                            style={{
                                                filter: "drop-shadow(1px 1px 0px rgba(255,255,255,0.5))",
                                            }}
                                        >
                                            <path
                                                d="M8.5 5.5L15.5 12L8.5 18.5"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                style={{
                                                    strokeDasharray: "0.5 2",
                                                    filter: "url(#rough)",
                                                }}
                                            />
                                            <defs>
                                                <filter id="rough">
                                                    <feTurbulence
                                                        baseFrequency="0.04"
                                                        numOctaves="3"
                                                        result="roughness"
                                                        seed="1"
                                                    />
                                                    <feDisplacementMap
                                                        in="SourceGraphic"
                                                        in2="roughness"
                                                        scale="0.5"
                                                    />
                                                </filter>
                                            </defs>
                                        </svg>
                                    </div>
                                </div>

                                {/* Sketchy highlight on hover */}
                                <div
                                    className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-purple-200/20 to-pink-200/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                                    style={{ transform: "rotate(-0.3deg)" }}
                                ></div>
                            </div>
                        ))}
                    </div>

                    {/* Sketchy decorative elements */}
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-300 rounded-full opacity-60 transform rotate-12"></div>
                    <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-pink-300 rounded-full opacity-60 transform -rotate-12"></div>
                </div>

                {/* Add new flow button */}
                <div className="mt-6 flex justify-center">
                    <button
                        className="px-6 py-3 bg-red-400/80 hover:bg-red-500/80 text-white rounded-full transition-all duration-300 transform hover:scale-105 border-2 border-purple-300/50"
                        style={{
                            fontFamily: "Comic Sans MS, cursive",
                            filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.1))",
                            transform: "rotate(-1deg)",
                        }}
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FlowProjectsList;
