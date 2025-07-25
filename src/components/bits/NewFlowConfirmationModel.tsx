import React from "react";

type NewFlowConfirmationModalProps = {
    isOpen: boolean;
    onCancel: () => void;
    onConfirm: () => void;
};

const NewFlowConfirmationModal: React.FC<NewFlowConfirmationModalProps> = ({
    isOpen,
    onCancel,
    onConfirm,
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-xl border-4 border-black max-w-md w-full mx-4 p-6 shadow-lg font-sketchy">
                <h2 className="text-lg md:text-xl font-bold mb-4">
                    Do you really want to create a new flow?
                </h2>
                <p className="text-gray-700 mb-6">
                    The current file will be discarded!
                </p>
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 border-2 border-black rounded-lg hover:bg-gray-200 transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 border-2 border-black bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-all"
                    >
                        Discard & Continue
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewFlowConfirmationModal;
