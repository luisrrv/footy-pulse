import React from 'react';

interface LinePopupProps {
    onClose: () => void;
}

const LinePopup: React.FC<LinePopupProps> = ({ onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-background text-foreground rounded-lg p-8 max-w-md w-full">
                <h2 className="text-lg font-semibold mb-4">Set up your LINE user ID</h2>
                {/* Add Line user ID form */}
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default LinePopup;
