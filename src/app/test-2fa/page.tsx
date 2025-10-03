"use client";

import React, { useState } from "react";
import TwoFactorCodeModal from "@/components/2fa/TwoFactorCodeModal";

export default function Test2FAPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (code: string) => {
    console.log("Submitted code:", code);
    alert(`2FA Code submitted: ${code}`);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">2FA Modal Test</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-3 bg-[#5E2A8C] text-white rounded-lg font-medium hover:bg-[#4E2275]"
        >
          Open 2FA Modal
        </button>
      </div>

      <TwoFactorCodeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
