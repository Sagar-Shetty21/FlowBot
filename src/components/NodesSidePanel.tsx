import { GitBranch, MessageSquare, Send, Settings, Zap } from "lucide-react";
import { useState } from "react";

interface NodeType {
    id: string;
    name: string;
    icon: React.ReactNode;
    description: string;
    color: string;
}

const nodeTypes: NodeType[] = [
    {
        id: "message",
        name: "Message",
        icon: <MessageSquare className="w-5 h-5" />,
        description: "Send a message to user",
        color: "bg-blue-500",
    },
    {
        id: "condition",
        name: "Condition",
        icon: <GitBranch className="w-5 h-5" />,
        description: "Branch based on condition",
        color: "bg-yellow-500",
    },
    {
        id: "action",
        name: "Action",
        icon: <Zap className="w-5 h-5" />,
        description: "Perform an action",
        color: "bg-green-500",
    },
    {
        id: "input",
        name: "User Input",
        icon: <Send className="w-5 h-5" />,
        description: "Wait for user input",
        color: "bg-purple-500",
    },
    {
        id: "settings",
        name: "Settings",
        icon: <Settings className="w-5 h-5" />,
        description: "Configure flow settings",
        color: "bg-gray-500",
    },
];

const NodesSidePanel = () => {
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);

    const onDragStart = (event: React.DragEvent, nodeType: NodeType) => {
        // Store the node type data in the drag event
        event.dataTransfer.setData(
            "application/reactflow",
            JSON.stringify(nodeType)
        );
        event.dataTransfer.effectAllowed = "move";

        // Create a visual representation of the dragged item
        const dragImage = document.createElement("div");
        dragImage.innerHTML = `
            <div style="
                position: relative;
                background: white;
                border: 2px solid #000000;
                border-radius: 4px;
                padding: 8px 30px;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                display: flex;
                align-items: center;
                gap: 8px;
                font-family: system-ui;
                font-size: 14px;
                color: #374151;
            ">
                <!-- Top dot -->
                <div style="
                    position: absolute;
                    top: -3px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 4px;
                    height: 4px;
                    background-color: #000;
                    border-radius: 50%;
                "></div>

                <!-- Bottom dot -->
                <div style="
                    position: absolute;
                    bottom: -3px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 4px;
                    height: 4px;
                    background-color: #000;
                    border-radius: 50%;
                "></div>

                ${nodeType.name}
            </div>
        `;
        dragImage.style.position = "absolute";
        dragImage.style.top = "-1000px";
        document.body.appendChild(dragImage);
        event.dataTransfer.setDragImage(dragImage, 50, 25);

        // Clean up the drag image after drag starts
        setTimeout(() => {
            document.body.removeChild(dragImage);
        }, 0);
    };

    return (
        <div className="relative w-80 h-full">
            {/* Hand-drawn border */}
            <div className="absolute inset-0 border-2 border-gray-300 transform rotate-0.5"></div>
            <div className="absolute inset-0 border-2 border-gray-300 transform -rotate-0.5"></div>

            <div className="relative bg-white h-full p-6">
                <div className="relative mb-6">
                    <h2 className="text-lg font-bold text-gray-800 transform rotate-0.5">
                        Add Nodes
                    </h2>
                    <div className="absolute -bottom-1 left-0 w-20 h-0.5 bg-gray-800 transform -rotate-1"></div>
                </div>

                <div className="space-y-4">
                    {nodeTypes.map((node, index) => (
                        <div
                            key={node.id}
                            className="relative cursor-pointer group"
                            onMouseEnter={() => setHoveredNode(node.id)}
                            onMouseLeave={() => setHoveredNode(null)}
                            draggable={node.id === "message"} // Only message nodes are draggable for now
                            onDragStart={(event) => onDragStart(event, node)}
                        >
                            {/* Hand-drawn card effect */}
                            <div
                                className={`absolute inset-0 ${
                                    node.color
                                } opacity-20 rounded-lg transform rotate-${
                                    index % 2 ? "1" : "-1"
                                } group-hover:rotate-${
                                    index % 2 ? "2" : "-2"
                                } transition-transform`}
                            ></div>
                            <div
                                className={`relative bg-white border-2 border-gray-300 rounded-lg p-4 transform hover:scale-105 transition-transform ${
                                    node.id !== "message" ? "opacity-60" : ""
                                }`}
                            >
                                <div className="flex items-start space-x-3">
                                    <div
                                        className={`${
                                            node.color
                                        } text-white p-2 rounded-lg transform rotate-${
                                            index % 2 ? "-1" : "1"
                                        }`}
                                    >
                                        {node.icon}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-800 transform rotate-0.5">
                                            {node.name}
                                        </h3>
                                        <p className="text-sm text-gray-600 mt-1 transform -rotate-0.5">
                                            {node.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Red overlay for unsupported nodes - only on hover */}
                                {node.id !== "message" &&
                                    hoveredNode === node.id && (
                                        <div className="absolute inset-0 bg-red-500 bg-opacity-80 rounded-lg flex items-center justify-center">
                                            <span className="text-white font-semibold text-sm transform rotate-1 bg-red-600 px-3 py-1 rounded-lg shadow-lg">
                                                Not Yet Supported
                                            </span>
                                        </div>
                                    )}
                            </div>

                            {/* Tooltip for unsupported nodes - removed since we have overlay now */}
                        </div>
                    ))}
                </div>

                {/* Tips section */}
                <div className="mt-8 relative">
                    <div className="absolute inset-0 bg-yellow-100 border-2 border-yellow-300 rounded-lg transform rotate-1"></div>
                    <div className="relative bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4 transform -rotate-0.5">
                        <h3 className="font-semibold text-yellow-800 mb-2 transform rotate-1">
                            💡 Tips
                        </h3>
                        <ul className="text-sm text-yellow-700 space-y-1">
                            <li className="transform rotate-0.5">
                                • Drag nodes to canvas
                            </li>
                            <li className="transform -rotate-0.5">
                                • Connect with lines
                            </li>
                            <li className="transform rotate-0.5">
                                • Test your flow
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NodesSidePanel;
