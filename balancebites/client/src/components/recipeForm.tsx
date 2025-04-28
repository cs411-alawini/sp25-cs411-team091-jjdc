import React from 'react';

interface spawnFormProps {
    onClose: () => void;
}

const SpawnForm: React.FC<spawnFormProps> = ({ onClose }) => {
    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                <h2 className="text-lg font-bold mb-4">Popup Modal</h2>
                {/* Placeholder content */}
                <p className="text-sm text-gray-600">This is a basic popup modal. No content yet!</p>
                {/* Close Button */}
                <div className="mt-4 flex justify-end">
                    <button
                    onClick={onClose}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                    >
                    Close
                    </button>
                </div>
            </div>
        </div>
    );
};
export default SpawnForm;