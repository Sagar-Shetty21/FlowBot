import { GitBranch, MessageSquare, Send, Settings, Zap } from "lucide-react";

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

interface RightPanelProps {
    onAddNode: (nodeType: NodeType) => void;
}

const NodesSidePanel: React.FC<RightPanelProps> = ({ onAddNode }) => {
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
                            onClick={() => onAddNode(node)}
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
                            <div className="relative bg-white border-2 border-gray-300 rounded-lg p-4 transform hover:scale-105 transition-transform">
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
                            </div>
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
