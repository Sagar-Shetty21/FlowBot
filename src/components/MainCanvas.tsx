import { Background, Controls, ReactFlow, useReactFlow } from "@xyflow/react";
import { GitBranch } from "lucide-react";
import { useNodeStore } from "../stores/useNodeStore";
import { useCallback, useRef } from "react";

const MainCanvas = () => {
    const nodes = useNodeStore((state) => state.nodes);
    const addNode = useNodeStore((state) => state.addNode);
    const reactFlowWrapper = useRef<HTMLDivElement>(null);
    const { screenToFlowPosition } = useReactFlow();

    const handleDrop = useCallback(
        (event: React.DragEvent) => {
            event.preventDefault();

            const reactFlowBounds =
                reactFlowWrapper.current?.getBoundingClientRect();

            if (!reactFlowBounds) return;

            // Get the node type data from the drag event
            const nodeData = event.dataTransfer.getData(
                "application/reactflow"
            );

            if (!nodeData) return;

            try {
                const nodeType = JSON.parse(nodeData);

                // Calculate the position where the node should be dropped
                const position = screenToFlowPosition({
                    x: event.clientX - reactFlowBounds.left,
                    y: event.clientY - reactFlowBounds.top,
                });

                // Generate a unique ID for the new node
                const newNodeId = `${nodeType.id}-${Date.now()}`;

                // Create the new node
                const newNode = {
                    id: newNodeId,
                    type: "default",
                    position,
                    data: {
                        label: nodeType.name,
                        nodeType: nodeType.id,
                        description: nodeType.description,
                        color: nodeType.color,
                    },
                    draggable: true,
                    selectable: true,
                };

                // Add the node to the store
                addNode(newNode);
            } catch (error) {
                console.error("Error parsing dropped node data:", error);
            }
        },
        [screenToFlowPosition, addNode]
    );

    const handleDragOver = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    }, []);

    return (
        <div className="flex-1 relative overflow-hidden" ref={reactFlowWrapper}>
            {/* Hand-drawn border */}
            <div className="absolute inset-0 border-2 border-gray-300 transform rotate-0.5"></div>
            <div className="absolute inset-0 border-2 border-gray-300 transform -rotate-0.5"></div>

            <div className="relative bg-slate-50 h-full">
                <ReactFlow
                    nodes={nodes}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    proOptions={{ hideAttribution: true }}
                    fitView
                >
                    <Background />
                    <Controls />

                    {/* Empty state */}
                    {nodes.length === 0 && (
                        <div className="flex items-center justify-center h-full">
                            <div className="text-center relative">
                                <div className="absolute inset-0 bg-gray-200 rounded-lg transform rotate-2"></div>
                                <div className="relative bg-white border-2 border-gray-300 rounded-lg p-8 transform -rotate-1">
                                    <div className="w-16 h-16 mx-auto mb-4 relative">
                                        <div className="absolute inset-0 bg-gray-300 rounded-full transform rotate-3"></div>
                                        <div className="relative bg-gray-400 rounded-full w-16 h-16 flex items-center justify-center transform -rotate-2">
                                            <GitBranch className="w-8 h-8 text-white transform rotate-1" />
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-700 mb-2 transform rotate-0.5">
                                        Start Building Your Flow
                                    </h3>
                                    <p className="text-gray-500 transform -rotate-0.5">
                                        Add nodes from the right panel to create
                                        your chatbot flow
                                    </p>
                                    <div className="mt-4">
                                        <div className="absolute bottom-0 left-1/2 w-20 h-0.5 bg-gray-400 transform -translate-x-1/2 rotate-2"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </ReactFlow>
            </div>
        </div>
    );
};

export default MainCanvas;
