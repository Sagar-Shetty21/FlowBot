import "@xyflow/react/dist/style.css";
import Topbar from "./components/Topbar";
import MainCanvas from "./components/MainCanvas";
import NodesSidePanel from "./components/NodesSidePanel";
import { ReactFlowProvider } from "@xyflow/react";

function App() {
    const handleNewFlow = () => {
        console.log("Creating new flow...");
    };

    const handleViewFlows = () => {
        console.log("Viewing all flows...");
    };

    return (
        <div className="h-screen bg-gray-200 flex flex-col gap-1">
            <Topbar onNewFlow={handleNewFlow} onViewFlows={handleViewFlows} />

            <div className="flex-1 flex gap-1">
                <ReactFlowProvider>
                    <MainCanvas />
                    <NodesSidePanel />
                </ReactFlowProvider>
            </div>
        </div>
    );
}

export default App;
