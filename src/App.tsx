import "@xyflow/react/dist/style.css";
import Topbar from "./components/Topbar";
import MainCanvas from "./components/MainCanvas";
import NodesSidePanel from "./components/NodesSidePanel";
import { useState } from "react";

interface NodeType {
    id: string;
    name: string;
    icon: React.ReactNode;
    description: string;
    color: string;
}

function App() {
    const [nodes, setNodes] = useState<NodeType[]>([]);

    const handleNewFlow = () => {
        console.log("Creating new flow...");
        setNodes([]);
    };

    const handleViewFlows = () => {
        console.log("Viewing all flows...");
    };

    const handleAddNode = (nodeType: NodeType) => {
        console.log("Adding node:", nodeType.name);
        setNodes((prev) => [
            ...prev,
            { ...nodeType, id: `${nodeType.id}-${Date.now()}` },
        ]);
    };

    return (
        <div className="h-screen bg-gray-200 flex flex-col gap-1">
            <Topbar onNewFlow={handleNewFlow} onViewFlows={handleViewFlows} />

            <div className="flex-1 flex gap-1">
                <MainCanvas nodes={nodes} />
                <NodesSidePanel onAddNode={handleAddNode} />
            </div>
        </div>
    );
}

export default App;
