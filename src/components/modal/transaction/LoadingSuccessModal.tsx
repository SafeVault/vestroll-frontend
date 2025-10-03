"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SuccessProps {
  amount: string;
  walletAddress: string;
  date: string; // added
  status: string; // added
  loading: boolean;
  onClose: () => void;
}

const LoadingSuccessModal: React.FC<SuccessProps> = ({
  amount,
  walletAddress,
  date,
  status,
  loading,
  onClose,
}) => {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-white/30 backdrop-blur-sm absolute inset-0 z-50">
      <AnimatePresence mode="wait">
        {loading ? (
          // Loading State
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -30 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="bg-white w-[90%] max-w-[340px] min-h-[420px] md:max-w-[480px] md:min-h-[470px] mx-auto flex flex-col justify-between rounded-xl p-8 shadow-lg"
          >
            {/* Close button */}
            <div className="flex justify-end">
              <button onClick={onClose} className="size-8">
                ✕
              </button>
            </div>

            {/* Spinner */}
            <div className="flex flex-col gap-8 items-center">
              <div className="w-[80px] h-[80px] border-4 border-[#5A42DE] border-t-transparent rounded-full animate-spin"></div>
              <div className="text-center">
                <h1 className="font-bold text-[24px] text-[#17171C]">
                  Sending...
                </h1>
                <p className="text-[#414F62]">
                  <span className="text-[#5A42DE]">{amount}</span> to{" "}
                  <span className="text-[#17171C]">{walletAddress}</span>
                </p>
              </div>
            </div>

            {/* Single button */}
            <button className="bg-[#5E2A8C] text-white rounded-xl py-4 mt-6">
              Back to home
            </button>
          </motion.div>
        ) : (
          // Success State
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -30 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="bg-white w-[90%] max-w-[340px] min-h-[420px] md:max-w-[480px] md:min-h-[470px] mx-auto flex flex-col justify-between rounded-xl p-8 shadow-lg"
          >
            {/* Close button */}
            <div className="flex justify-end">
              <button onClick={onClose} className="size-8">
                ✕
              </button>
            </div>

            {/* Checkmark + text */}
            <div className="flex flex-col gap-8 items-center">
              <div className="w-[100px] h-[100px] flex items-center justify-center rounded-full bg-[#c6bff2] p-3">
                <div className="w-full h-full flex items-center justify-center rounded-full bg-[#3b20d2]">
                  <motion.svg
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    width="46"
                    height="32"
                    viewBox="0 0 46 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.99219 15.9392L16.0531 28L42.0023 4"
                      stroke="white"
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </motion.svg>
                </div>
              </div>

              <div className="text-center">
                <h1 className="font-bold text-[24px] text-[#17171C]">
                  Successful!
                </h1>
                <p className="text-[#414F62]">
                  <span className="text-[#5A42DE]">{amount}</span> was sent to{" "}
                  <span className="text-[#17171C]">{walletAddress}</span>
                </p>
              </div>

              {/* Transaction details */}
              <div className="text-sm text-[#414F62] mt-2 space-y-1">
                <p>Date: {date}</p>
                <p>Status: {status}</p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="gap-2 flex items-center mt-6">
              <button className="text-[#5E2A8C] border border-[#5E2A8C] bg-white rounded-xl py-3 flex-1">
                Back to home
              </button>
              <button className="bg-[#5E2A8C] text-white rounded-xl py-3 flex-1">
                Continue
              </button>
              <button className="bg-gray-100 text-[#17171C] rounded-xl py-3 flex-1">
                Back to transactions
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LoadingSuccessModal;
