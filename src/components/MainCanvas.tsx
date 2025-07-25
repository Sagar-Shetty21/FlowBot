import {
    Background,
    Controls,
    ReactFlow,
    useReactFlow,
    type Connection,
    type Edge,
    type EdgeChange,
    type NodeChange,
} from "@xyflow/react";
import { GitBranch } from "lucide-react";
import { useNodeStore } from "../stores/useNodeStore";
import { useCallback, useRef } from "react";
import { useEdgeStore } from "../stores/useEdgeStore";
import toast, { Toaster } from "react-hot-toast";
import { useProjectStore } from "../stores/useProjectStore";

const MainCanvas = () => {
    const nodes = useNodeStore((state) => state.nodes);
    const edges = useEdgeStore((state) => state.edges);
    const addNode = useNodeStore((state) => state.addNode);
    const addEdge = useEdgeStore((state) => state.addEdge);
    const updateNodes = useNodeStore((state) => state.updateNodes);
    const updateEdges = useEdgeStore((state) => state.updateEdges);
    const reactFlowWrapper = useRef<HTMLDivElement>(null);
    const { screenToFlowPosition } = useReactFlow();
    const { setActiveNodeId, activeNodeId } = useProjectStore();

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

                // Define default node dimensions (adjust these based on your node sizes)
                const nodeWidth = 300; // Default width of your nodes
                const nodeHeight = -75; // Default height of your nodes

                // Calculate the position where the node should be dropped
                // Subtract half the node dimensions to center it on cursor
                const position = screenToFlowPosition({
                    x: event.clientX - reactFlowBounds.left - nodeWidth / 2,
                    y: event.clientY - reactFlowBounds.top - nodeHeight / 2,
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

    const onNodesChange = useCallback(
        (changes: NodeChange[]) => {
            updateNodes(changes);
        },
        [updateNodes]
    );

    const onEdgesChange = useCallback(
        (changes: EdgeChange[]) => {
            updateEdges(changes);
        },
        [updateEdges]
    );

    const handleDragOver = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    }, []);

    const onConnect = useCallback(
        (connection: Connection) => {
            // Check if source handle already has an outgoing edge
            const existingSourceEdge = edges.find(
                (edge) =>
                    edge.source === connection.source &&
                    edge.sourceHandle === connection.sourceHandle
            );

            // If source handle already has an edge, prevent the new connection
            if (existingSourceEdge) {
                console.warn(
                    `Source handle ${connection.sourceHandle} on node ${connection.source} already has an outgoing edge. Only one edge per source handle is allowed.`
                );
                toast.error(
                    `Cannot connect multiple edges from the same source handle.`
                );
                return; // Exit without creating the edge
            }

            // Check for duplicate edge (same source, sourceHandle, target, targetHandle)
            const duplicateEdge = edges.find(
                (edge) =>
                    edge.source === connection.source &&
                    edge.sourceHandle === connection.sourceHandle &&
                    edge.target === connection.target &&
                    edge.targetHandle === connection.targetHandle
            );

            if (duplicateEdge) {
                console.warn("Duplicate edge connection attempted");
                toast.error("Cannot create duplicate edge connections.");
                return; // Exit without creating the edge
            }

            // Create new edge if validations pass
            const newEdge: Edge = {
                id: `${connection.source}-${connection.sourceHandle}-${
                    connection.target
                }-${connection.targetHandle}-${Date.now()}`,
                source: connection.source,
                target: connection.target,
                sourceHandle: connection.sourceHandle,
                targetHandle: connection.targetHandle,
                type: "default",
            };

            addEdge(newEdge);
        },
        [addEdge, edges] // Added edges to dependency array
    );

    return (
        <div className="flex-1 relative overflow-hidden" ref={reactFlowWrapper}>
            {/* Hand-drawn border */}
            <div className="absolute inset-0 border-2 border-gray-300 transform rotate-0.5"></div>
            <div className="absolute inset-0 border-2 border-gray-300 transform -rotate-0.5"></div>

            <div className="relative bg-slate-50 h-full">
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onConnect={onConnect}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    proOptions={{ hideAttribution: true }}
                    fitView
                    onSelectionChange={({ nodes }) => {
                        const selectedId = nodes[0]?.id ?? null;
                        if (activeNodeId !== selectedId) {
                            setActiveNodeId(selectedId);
                        }
                    }}
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

                    <Toaster
                        containerStyle={{
                            position: "absolute", // or relative, depending on your layout
                        }}
                    />
                </ReactFlow>
            </div>
        </div>
    );
};

export default MainCanvas;
