// components/TransactionList.tsx (Revised)

import React from "react";
import { Transaction } from "../types";
import StatusBadge from "../StatusBadge";

interface TransactionListProps {
  transactions: Transaction[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

// --- Placeholder for an Asset Icon/Badge ---
const AssetBadge: React.FC<{ asset: Transaction["asset"] }> = ({ asset }) => {
  const color = asset === "USDT" ? "text-green-500" : "text-purple-500";
  return (
    <div className="flex items-center space-x-1">
      {/* Simple circle icon */}
      <span
        className={`w-2 h-2 rounded-full ${color} bg-current`}
        aria-hidden="true"
      />
      <span className="text-sm font-medium text-gray-700">{asset}</span>
    </div>
  );
};

// --- Pagination Controls (Re-used/Modified for design) ---
const PaginationControls: React.FC<any> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-between items-center p-4 border-t border-gray-100">
      <div className="text-sm text-gray-500">
        Showing 1 - {Math.min(currentPage * 10, totalPages * 10)} of{" "}
        {totalPages * 10}
      </div>

      <div className="flex items-center space-x-1">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded-full disabled:opacity-50"
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
          className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded-full disabled:opacity-50"
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

      <div className="flex items-center space-x-2 text-sm text-gray-500">
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

// --- Mobile Card Component (Revised) ---
const MobileTransactionCard: React.FC<{ transaction: Transaction }> = ({
  transaction,
}) => (
  <div className="border border-gray-200 rounded-lg p-4 mx-3 shadow-sm bg-white">
    <div className="flex justify-between items-start mb-2">
      <div className="font-semibold text-lg">
        ${transaction.amount.toFixed(2)}
      </div>
      <StatusBadge status={transaction.status} />
    </div>
    <p className="text-gray-700 text-sm mb-2">{transaction.description}</p>
    <div className="flex justify-between text-xs text-gray-500">
      <span className="font-mono">{transaction.transactionId}</span>
      <div className="flex items-center space-x-2">
        <AssetBadge asset={transaction.asset} />
        <span>{transaction.timestamp}</span>
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
      <div className="p-6 hidden lg:block overflow-x-auto">
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
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
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
                <td className="px-6 py-4 whitespace-nowrap font-mono text-sm text-gray-900">
                  {t.transactionId}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 max-w-xs">
                  {t.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">
                  ${t.amount.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <AssetBadge asset={t.asset} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={t.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {t.timestamp}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden p-4">
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
