// components/TransactionList.tsx (Revised for Mobile Responsiveness)

import React from "react";
import { Transaction } from "../types";
import StatusBadge from "../StatusBadge";
import Image from "next/image";

interface TransactionListProps {
  transactions: Transaction[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

// --- Placeholder for an Asset Icon/Badge ---
const AssetBadge: React.FC<{ asset: Transaction["asset"] }> = ({ asset }) => {
  return (
    <div className="flex items-center space-x-1">
      {/* USDT Icon - assuming the path is correct and the icon exists */}
      {asset === "USDT" && (
        <Image src="/Component 13.svg" width={16} height={16} alt="USDT" />
      )}
      <span className="text-sm font-medium text-gray-700">{asset}</span>
    </div>
  );
};

// --- Pagination Controls (Revised for Mobile) ---
const PaginationControls: React.FC<any> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  // Only show a limited number of page numbers around the current one on mobile
  const maxPagesToShow = 5;
  const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center p-4 border-t border-gray-100 space-y-3 sm:space-y-0">
      {/* Current Range/Total - More concise on mobile */}
      <div className="text-sm text-gray-500">
        Page {currentPage} of {totalPages}
      </div>

      <div className="flex items-center space-x-1">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded-full disabled:opacity-50 transition-colors"
          aria-label="Previous Page"
        >
          {/* Chevron Left Icon */}
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
        </button>

        {/* Display limited pages for better mobile fit */}
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium transition-colors ${
              page === currentPage
                ? "bg-purple-100 text-purple-600" // Selected button style from design
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded-full disabled:opacity-50 transition-colors"
          aria-label="Next Page"
        >
          {/* Chevron Right Icon */}
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
        </button>
      </div>

      {/* Results per page - Hidden on small mobile screens to save space (only shows on medium/large) */}
      <div className="hidden md:flex items-center space-x-2 text-sm text-gray-500">
        <span>Results per page</span>
        <select className="border border-gray-300 rounded-md p-1">
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
        </select>
      </div>
    </div>
  );
};

// --- Mobile Card Component (Revised for better layout) ---
const MobileTransactionCard: React.FC<{ transaction: Transaction }> = ({
  transaction,
}) => (
  <div className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white">
    <div className="flex justify-between items-center mb-3 pb-3 border-b border-gray-100">
      <div className="font-semibold text-lg text-[#17171C]">
        ${transaction.amount.toFixed(2)}
      </div>
      <StatusBadge status={transaction.status} />
    </div>

    <div className="space-y-2">
      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-500">Description:</span>
        <span className="text-gray-700 font-medium max-w-[60%] text-right truncate">
          {transaction.description}
        </span>
      </div>

      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-500">Asset:</span>
        <AssetBadge asset={transaction.asset} />
      </div>

      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-500">Time:</span>
        <span className="text-gray-700">{transaction.timestamp}</span>
      </div>

      <div className="pt-2">
        <span className="block text-xs text-gray-500 mb-1">Transaction ID</span>
        <span className="font-mono text-sm text-gray-700 break-all">
          {transaction.transactionId}
        </span>
      </div>
    </div>
  </div>
);

// --- Main Transaction List Component (Revised) ---
const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const tableHeaders = [
    "Transaction ID",
    "Description",
    "Amount",
    "Asset",
    "Status",
    "Timestamp",
  ];

  return (
    <div className="p-0 mt-6">
      {/* Desktop Table View */}
      {/* Added `w-full` to the container to ensure it uses available space */}
      <div className="p-6 hidden lg:block overflow-x-auto w-full">
        <table className="min-w-full divide-y divide-gray-100">
          <thead className="bg-[#F5F6F7]">
            <tr>
              {/* Checkbox column */}
              <th className="px-6 py-3 w-4">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-purple-600 rounded border-gray-300"
                />
              </th>
              {tableHeaders.map((header) => (
                <th
                  key={header}
                  className="px-6 py-3 text-left text-[16px] text-[#414F62] font-semibold tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {transactions.map((t) => (
              <tr key={t.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 w-4">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-purple-600 rounded border-gray-300"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap font-mono text-[14px] text-[#17171C]">
                  {t.transactionId}
                </td>
                <td className="px-6 py-4 text-[14px] text-[#17171C] max-w-xs">
                  {/* Ensure long descriptions are truncated for table width */}
                  <div className="truncate">{t.description}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-[14px] text-[#17171C] font-semibold">
                  ${t.amount.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-[14px] text-[#17171C]">
                  <AssetBadge asset={t.asset} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-[14px] text-[#26902B]">
                  <StatusBadge status={t.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-[14px] text-[#17171C]">
                  {t.timestamp}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View - Removed mx-3 from inner div, now using p-4 for container */}
      <div className="lg:hidden p-4 space-y-4">
        {transactions.map((t) => (
          <MobileTransactionCard key={t.id} transaction={t} />
        ))}
      </div>

      {/* Pagination Controls */}
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default TransactionList;
