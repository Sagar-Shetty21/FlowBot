import React, { useState } from "react";
import { Plus, List, Link } from "lucide-react";

interface TopbarProps {
    onNewFlow: () => void;
    onViewFlows: () => void;
}

const Topbar: React.FC<TopbarProps> = ({ onNewFlow, onViewFlows }) => {
    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <div className="relative">
            {/* Hand-drawn border effect */}
            <div className="absolute inset-0 border-2 border-gray-800 transform rotate-0.5"></div>
            <div className="absolute inset-0 border-2 border-gray-800 transform -rotate-0.5"></div>

            <div className="relative bg-white px-6 py-4 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center space-x-3">
                    <div className="relative">
                        <div className="w-8 h-8 bg-blue-500 rounded-full transform rotate-2"></div>
                        <div className="absolute inset-0 w-8 h-8 border-2 border-blue-600 rounded-full transform -rotate-1"></div>
                        <Link className="absolute inset-1 w-6 h-6 text-white transform rotate-1" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800 transform -rotate-1 relative">
                        FlowBot
                        <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-500 transform rotate-1"></div>
                    </h1>
                </div>

                {/* Action Buttons */}
                <div className="relative">
                    <button
                        onClick={() => setShowDropdown(!showDropdown)}
                        className="relative group"
                    >
                        <div className="absolute inset-0 bg-blue-500 rounded-lg transform rotate-1 group-hover:rotate-2 transition-transform"></div>
                        <div className="relative bg-blue-600 text-white px-4 py-2 rounded-lg border-2 border-blue-700 transform -rotate-1 group-hover:rotate-0 transition-transform flex items-center space-x-2">
                            <Plus className="w-4 h-4" />
                            <span className="font-medium">Actions</span>
                        </div>
                    </button>

                    {/* Dropdown Menu */}
                    {showDropdown && (
                        <div className="absolute right-0 top-12 z-10">
                            <div className="relative">
                                <div className="absolute inset-0 bg-white border-2 border-gray-800 rounded-lg transform rotate-1"></div>
                                <div className="relative bg-white border-2 border-gray-800 rounded-lg transform -rotate-0.5 p-2 space-y-1 min-w-48">
                                    <button
                                        onClick={() => {
                                            onNewFlow();
                                            setShowDropdown(false);
                                        }}
                                        className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded flex items-center space-x-2 transform hover:rotate-0.5 transition-transform"
                                    >
                                        <Plus className="w-4 h-4" />
                                        <span>Create New Flow</span>
                                    </button>
                                    <button
                                        onClick={() => {
                                            onViewFlows();
                                            setShowDropdown(false);
                                        }}
                                        className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded flex items-center space-x-2 transform hover:-rotate-0.5 transition-transform"
                                    >
                                        <List className="w-4 h-4" />
                                        <span>View All Flows</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Topbar;
