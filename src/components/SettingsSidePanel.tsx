import { useNodeStore } from "../stores/useNodeStore";
import { useProjectStore } from "../stores/useProjectStore";

const SettingsSidePanel = () => {
    const { activeNodeId } = useProjectStore();
    const { nodes, updateNode } = useNodeStore();

    return (
        <div className="relative w-80 h-full">
            {/* Hand-drawn border */}
            <div className="absolute inset-0 border-2 border-gray-300 transform rotate-0.5"></div>
            <div className="absolute inset-0 border-2 border-gray-300 transform -rotate-0.5"></div>

            <div className="relative bg-white h-full p-6">
                <div className="relative mb-6">
                    <h2 className="text-lg font-bold text-gray-800 transform rotate-0.5">
                        Node Settings
                    </h2>
                    <div className="absolute -bottom-1 left-0 w-20 h-0.5 bg-gray-800 transform -rotate-1"></div>
                </div>

                <div>
                    <textarea
                        className="w-full h-24 p-3 bg-white border-2 border-gray-800 rounded-none focus:outline-none focus:ring-0 focus:border-gray-900 disabled:bg-gray-50 disabled:border-gray-400 disabled:text-gray-500 transition-all duration-200 font-mono text-sm leading-relaxed resize-none shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,0.3)] focus:shadow-[5px_5px_0px_0px_rgba(0,0,0,0.4)] transform hover:-translate-x-0.5 hover:-translate-y-0.5 focus:-translate-x-0.5 focus:-translate-y-0.5"
                        style={{
                            borderImage: `url("data:image/svg+xml,%3csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='m5,5 L95,5 L95,95 L5,95 Z' stroke='%23374151' stroke-width='2' fill='none' stroke-dasharray='3,2'/%3e%3c/svg%3e") 2`,
                            background: `
            linear-gradient(90deg, transparent 79px, rgba(156, 163, 175, 0.3) 80px, rgba(156, 163, 175, 0.3) 81px, transparent 82px),
            linear-gradient(rgba(156, 163, 175, 0.1) 1px, transparent 1px)
        `,
                            backgroundSize: "80px 20px, 100% 20px",
                            backgroundPosition: "0 0, 0 0",
                        }}
                        placeholder="Edit node label..."
                        value={
                            activeNodeId
                                ? String(
                                      nodes.find(
                                          (node) => node.id === activeNodeId
                                      )?.data.label ?? ""
                                  )
                                : ""
                        }
                        onChange={(e) => {
                            if (activeNodeId) {
                                updateNode(activeNodeId, {
                                    data: {
                                        label: e.target.value,
                                    },
                                });
                            }
                        }}
                        disabled={!activeNodeId}
                    />
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
                                • Open Node settings by clicking on them.
                            </li>
                            <li className="transform rotate-0.5">
                                • Edit label from text field above.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsSidePanel;
