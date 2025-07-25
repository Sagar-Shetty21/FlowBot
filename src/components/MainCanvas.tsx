import { GitBranch } from "lucide-react";

interface NodeType {
    id: string;
    name: string;
    icon: React.ReactNode;
    description: string;
    color: string;
}

interface MainCanvasProps {
    nodes: NodeType[];
}

const MainCanvas: React.FC<MainCanvasProps> = ({ nodes }) => {
    return (
        <div className="flex-1 relative overflow-hidden">
            {/* Hand-drawn border */}
            <div className="absolute inset-0 border-2 border-gray-300 transform rotate-0.5"></div>
            <div className="absolute inset-0 border-2 border-gray-300 transform -rotate-0.5"></div>

            <div className="relative bg-slate-50 h-full">
                {/* Grid pattern with hand-drawn feel */}
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: `
                            radial-gradient(circle at 1px 1px, gray 1px, transparent 0),
                            radial-gradient(circle at 20px 20px, gray 0.5px, transparent 0)
                        `,
                        backgroundSize: "20px 20px",
                        transform: "rotate(0.5deg)",
                    }}
                ></div>

                {/* Empty state */}
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
                                Add nodes from the right panel to create your
                                chatbot flow
                            </p>
                            <div className="mt-4">
                                <div className="absolute bottom-0 left-1/2 w-20 h-0.5 bg-gray-400 transform -translate-x-1/2 rotate-2"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainCanvas;
