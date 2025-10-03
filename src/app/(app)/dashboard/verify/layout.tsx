"use client";

import { ArrowLeft } from "lucide-react";

export default function CreateContractsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const handleBack = () => {
    if (typeof window !== "undefined") {
      window.history.back();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex flex-col bg-white border-b border-t mb-6 border-gray-200 py-6 px-4">
        <button
          onClick={handleBack}
          className="flex items-center text-gray-500 hover:text-gray-700 transition-colors"
        >
          <ArrowLeft size={16} className="mr-2" />
          <span className="text-sm">back</span>
        </button>
        <h1 className="text-2xl font-bold text-gray-900">KYB Verification</h1>
      </div>
      <div className="w-full px-2 sm:px-6 md:px-8 pb-8">
        {/* Content area */}
        <div className="bg-white mx-auto rounded-lg px-4 py-4 sm:px-6 md:p-8 shadow-sm lg:w-[480px] max-w-[480px]">
          {children}
        </div>
      </div>
    </div>
  );
}
