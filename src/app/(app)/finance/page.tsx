// pages/transactions.tsx (Updated)
"use client";
import React, { useState, useMemo, useCallback } from "react";
import { Transaction } from "./types";
import TransactionList from "./components/TransactionList";
import EmptyState from "./components/EmptyState";

// --- Dummy Data (Remains the same) ---
const DUMMY_TRANSACTIONS: Transaction[] = [
  {
    id: "1",
    transactionId: "0x6885afa...63b3",
    description: "MintForge Bug fixes and performance updates",
    amount: 1200.0,
    asset: "USDT",
    status: "Pending",
    timestamp: "25th Oct 2025 | 2:00pm",
  },
  {
    id: "2",
    transactionId: "0x6885afa...63b3",
    description: "MintForge Bug fixes and performance updates",
    amount: 1200.0,
    asset: "USDT",
    status: "Failed",
    timestamp: "25th Oct 2025 | 2:00pm",
  },
  {
    id: "3",
    transactionId: "0x6885afa...63b3",
    description: "MintForge Bug fixes and performance updates",
    amount: 1200.0,
    asset: "USDT",
    status: "Successful",
    timestamp: "25th Oct 2025 | 2:00pm",
  },
  {
    id: "4",
    transactionId: "0x6885afa...63b3",
    description: "MintForge Bug fixes and performance updates",
    amount: 1200.0,
    asset: "USDT",
    status: "Successful",
    timestamp: "25th Oct 2025 | 2:00pm",
  },
  {
    id: "5",
    transactionId: "0x6885afa...63b3",
    description: "MintForge Bug fixes and performance updates",
    amount: 1200.0,
    asset: "USDT",
    status: "Successful",
    timestamp: "25th Oct 2025 | 2:00pm",
  },
  {
    id: "6",
    transactionId: "0x6885afa...63b3",
    description: "MintForge Bug fixes and performance updates",
    amount: 1200.0,
    asset: "USDT",
    status: "Successful",
    timestamp: "25th Oct 2025 | 2:00pm",
  },
  {
    id: "7",
    transactionId: "0x6885afa...63b3",
    description: "MintForge Bug fixes and performance updates",
    amount: 1200.0,
    asset: "USDT",
    status: "Successful",
    timestamp: "25th Oct 2025 | 2:00pm",
  },
  {
    id: "8",
    transactionId: "0x6885afa...63b3",
    description: "MintForge Bug fixes and performance updates",
    amount: 1200.0,
    asset: "USDT",
    status: "Successful",
    timestamp: "25th Oct 2025 | 2:00pm",
  },
  {
    id: "9",
    transactionId: "0x1c34abc...7a9f",
    description: "Withdrawal to external wallet",
    amount: 50.0,
    asset: "USDT",
    status: "Pending",
    timestamp: "24th Oct 2025 | 1:30pm",
  },
  {
    id: "10",
    transactionId: "0x2d56def...8b0g",
    description: "Exchange fee deduction",
    amount: 5.0,
    asset: "USDT",
    status: "Successful",
    timestamp: "24th Oct 2025 | 10:00am",
  },
  {
    id: "9",
    transactionId: "0x1c34abc...7a9f",
    description: "Withdrawal to external wallet",
    amount: 50.0,
    asset: "USDT",
    status: "Pending",
    timestamp: "24th Oct 2025 | 1:30pm",
  },
  {
    id: "10",
    transactionId: "0x2d56def...8b0g",
    description: "Exchange fee deduction",
    amount: 5.0,
    asset: "USDT",
    status: "Successful",
    timestamp: "24th Oct 2025 | 10:00am",
  },
];

const ITEMS_PER_PAGE = 10;

const TransactionsPage: React.FC = () => {
  // To test the empty state, you can change the initial state to:
  // useState<Transaction[]>([]);
  const [allTransactions, setAllTransactions] =
    useState<Transaction[]>(DUMMY_TRANSACTIONS);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(allTransactions.length / ITEMS_PER_PAGE);

  const paginatedTransactions = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return allTransactions.slice(start, end);
  }, [allTransactions, currentPage]);

  const handlePageChange = useCallback(
    (page: number) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
      }
    },
    [totalPages]
  );

  const handleExport = () => {
    alert("Export function triggered: Downloading transactions_export.csv...");
  };

  const isEmpty = allTransactions.length === 0;

  return (
    <div className="h-full bg-white">
      <div className=" h-full">
        <div className="flex justify-between items-center px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-center">
            <button className="inline-flex items-center text-[#7F8C9F] hover:text-gray-900">
              <svg
                className="w-5 h-5 mr-2 over:text-gray-900"
                fill="none"
                stroke="#7F8C9F"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                ></path>
              </svg>
              Back
            </button>
            <h1 className="text-[24px] font-semibold text-[#17171C]">
              Transactions
            </h1>
          </div>

          <button
            onClick={handleExport}
            className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-white bg-[#5E2A8C] hover:bg-purple-700"
          >
            Export
            <svg
              className="ml-2 -mr-1 h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </button>
        </div>

        {/* Main Content Area */}
        <div className="px-4 sm:px-6 lg:px-8 h-full bg-[#F5F6F7] p-6">
          <div className="w-full h-full flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">History</h2>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Search by description..."
                className="p-2 bg-white border border-[#DCE0E5] rounded-md text-[12px] text-[#7F8C9F] w-64"
              />
              <button className="p-2 bg-white border border-[#DCE0E5] rounded-md hover:bg-gray-50">
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707v5.614a1 1 0 01-1.242.97l-4-.988a1 1 0 01-.758-.97v-5.614a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
          {isEmpty ? (
            <EmptyState />
          ) : (
            // Populated List View
            <div className="bg-white shadow-md rounded-lg">
              <TransactionList
                transactions={paginatedTransactions}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;
