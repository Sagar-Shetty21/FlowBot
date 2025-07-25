import "@xyflow/react/dist/style.css";
import Topbar from "./components/Topbar";
import MainCanvas from "./components/MainCanvas";
import NodesSidePanel from "./components/NodesSidePanel";
import { ReactFlowProvider } from "@xyflow/react";
import NewFlowConfirmationModal from "./components/bits/NewFlowConfirmationModel";
import { useState } from "react";
import { useNodeStore } from "./stores/useNodeStore";
import { useEdgeStore } from "./stores/useEdgeStore";
import { useProjectStore } from "./stores/useProjectStore";
import FlowProjectsList from "./components/FlowProjectsList";
import SettingsSidePanel from "./components/SettingsSidePanel";

function App() {
    const emptyNodes = useNodeStore((state) => state.emptyNodes);
    const emptyEdges = useEdgeStore((state) => state.emptyEdges);
    const { setActiveProject, activeNodeId } = useProjectStore();
    const [flowProjectsListOpen, setFlowProjectsListOpen] = useState(false);

    const [isNewFlowModalOpen, setIsNewFlowModalOpen] = useState(false);
    const handleNewFlow = () => {
        setIsNewFlowModalOpen(true);
    };

    const handleViewFlows = () => {
        setFlowProjectsListOpen(true);
    };

    return (
        <div className="h-screen bg-gray-200 flex flex-col gap-1">
            <Topbar onNewFlow={handleNewFlow} onViewFlows={handleViewFlows} />

            <div className="flex-1 flex gap-1 relative">
                <ReactFlowProvider>
                    <MainCanvas />
                    {activeNodeId ? <SettingsSidePanel /> : <NodesSidePanel />}
                </ReactFlowProvider>
                {flowProjectsListOpen && (
                    <FlowProjectsList
                        onClose={() => setFlowProjectsListOpen(false)}
                    />
                )}
            </div>

            <NewFlowConfirmationModal
                isOpen={isNewFlowModalOpen}
                onCancel={() => setIsNewFlowModalOpen(false)}
                onConfirm={() => {
                    emptyEdges();
                    emptyNodes();
                    setActiveProject("New Project");
                    setIsNewFlowModalOpen(false);
                }}
            />
        </div>
    );
}

export default App;
