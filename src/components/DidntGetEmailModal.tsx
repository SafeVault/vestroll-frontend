'use client';

import React from 'react';

interface DidntGetEmailModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const DidntGetEmailModal: React.FC<DidntGetEmailModalProps> = ({
    isOpen,
    onClose
}) => {
    React.useEffect(() => {
        if (!isOpen) return;

        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-md bg-white rounded-2xl p-6 md:p-8 shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Close modal"
                >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                    >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>

                {/* Icon with multi-layer glow effect */}
                <div className="flex justify-center mb-6">
                    <div className="relative flex items-center justify-center w-32 h-32">
                        {/* Outermost glow - very light purple */}
                        <div className="absolute w-32 h-32 rounded-full bg-purple-200 opacity-40 blur-2xl"></div>

                        {/* Middle glow layer - medium purple/blue */}
                        <div className="absolute w-24 h-24 rounded-full bg-[#6366f1] opacity-50 blur-xl"></div>

                        {/* Inner glow - brighter purple */}
                        <div className="absolute w-20 h-20 rounded-full bg-[#7c3aed] opacity-60 blur-lg"></div>

                        {/* Solid center circle */}
                        <div className="relative w-20 h-20 rounded-full bg-[#5E2A8C] flex items-center justify-center shadow-lg z-10">
                            <span className="text-4xl">🧐</span>
                        </div>
                    </div>
                </div>

                {/* Heading */}
                <h2 className="text-2xl font-bold text-center text-gray-900 mb-4">
                    Didn&apos;t Get the Email?
                </h2>

                {/* Troubleshooting Steps */}
                <ul className="space-y-3 mb-6 text-gray-600 text-sm md:text-base">
                    <li className="flex items-start">
                        <span className="mr-2 mt-1">•</span>
                        <span>Check your spam or junk folder - sometimes, emails get filtered</span>
                    </li>
                    <li className="flex items-start">
                        <span className="mr-2 mt-1">•</span>
                        <span>Wait a few minutes - it may take a moment to arrive</span>
                    </li>
                    <li className="flex items-start">
                        <span className="mr-2 mt-1">•</span>
                        <span>Resend the email - tap the button to send it again</span>
                    </li>
                    <li className="flex items-start">
                        <span className="mr-2 mt-1">•</span>
                        <span>Check if your email is correct - sometimes, we make mistakes</span>
                    </li>
                </ul>

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="w-full bg-[#5E2A8C] hover:bg-[#4E1F6C] text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default DidntGetEmailModal;