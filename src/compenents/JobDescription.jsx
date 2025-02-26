import React, { useState } from 'react';
import { ClipboardIcon, CheckIcon, PencilIcon, SaveIcon } from 'lucide-react';

const JobDescription=({ description, isLoading })=> {
    const [copied, setCopied] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedDescription, setEditedDescription] = useState(description);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(isEditing ? editedDescription : description);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleEdit = () => {
        setIsEditing(true);
        setEditedDescription(description);
    };

    const handleSave = () => {
        setIsEditing(false);
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">Generated Description</h2>
                {description && (
                    <div className="flex gap-2">
                        {isEditing ? (
                            <button
                                onClick={handleSave}
                                className="flex items-center gap-2 px-3 py-1 text-sm text-green-600 hover:text-green-900 transition-colors"
                            >
                                <SaveIcon className="w-4 h-4" />
                                Save
                            </button>
                        ) : (
                            <button
                                onClick={handleEdit}
                                className="flex items-center gap-2 px-3 py-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                            >
                                <PencilIcon className="w-4 h-4" />
                                Edit
                            </button>
                        )}
                        <button
                            onClick={handleCopy}
                            className="flex items-center gap-2 px-3 py-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            {copied ? (
                                <CheckIcon className="w-4 h-4 text-green-500" />
                            ) : (
                                <ClipboardIcon className="w-4 h-4" />
                            )}
                            {copied ? 'Copied!' : 'Copy'}
                        </button>
                    </div>
                )}
            </div>
            <div className="bg-white rounded-lg p-4 min-h-[300px]">
                {isLoading ? (
                    <div className="flex items-center justify-center h-full text-gray-500">
                        Generating your job description...
                    </div>
                ) : description ? (
                    isEditing ? (
                        <textarea
                            value={editedDescription}
                            onChange={(e) => setEditedDescription(e.target.value)}
                            className="w-full h-full min-h-[280px] bg-white border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                    ) : (
                        <div className="whitespace-pre-line text-gray-700">
                            {editedDescription || description}
                        </div>
                    )
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">
                        Your generated job description will appear here
                    </div>
                )}
            </div>
        </div>
    );
}

export default JobDescription;
