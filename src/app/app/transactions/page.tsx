"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

// Define types for our data
interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: string;
  type: "credit" | "debit";
  status: "successful" | "pending" | "failed";
}

// Status badge component with color coding
const StatusBadge = ({ status }: { status: Transaction["status"] }) => {
  const statusConfig = {
    successful: {
      text: "Successful",
      className: "bg-green-100 text-green-800",
    },
    pending: {
      text: "Pending",
      className: "bg-yellow-100 text-yellow-800",
    },
    failed: {
      text: "Failed",
      className: "bg-red-100 text-red-800",
    },
  };

  const config = statusConfig[status];

  return (
    <span className={cn("px-3 py-1 rounded-full text-xs font-medium", config.className)}>
      {config.text}
    </span>
  );
};

// Mock data for transactions
const mockTransactions: Transaction[] = [
  {
    id: "1",
    date: "Oct 3, 2025",
    description: "USDC Deposit",
    amount: "+100.00 USDC",
    type: "credit",
    status: "successful",
  },
  {
    id: "2",
    date: "Oct 2, 2025",
    description: "Withdrawal to Wallet",
    amount: "-50.00 USDC",
    type: "debit",
    status: "pending",
  },
  {
    id: "3",
    date: "Oct 1, 2025",
    description: "Contract Payment",
    amount: "-200.00 USDC",
    type: "debit",
    status: "successful",
  },
  {
    id: "4",
    date: "Sep 30, 2025",
    description: "Freelancer Payment",
    amount: "-150.00 USDC",
    type: "debit",
    status: "failed",
  },
  {
    id: "5",
    date: "Sep 29, 2025",
    description: "Client Payment",
    amount: "+500.00 USDC",
    type: "credit",
    status: "successful",
  },
  {
    id: "6",
    date: "Sep 28, 2025",
    description: "Referral Bonus",
    amount: "+25.00 USDC",
    type: "credit",
    status: "successful",
  },
  {
    id: "7",
    date: "Sep 27, 2025",
    description: "Service Fee",
    amount: "-10.00 USDC",
    type: "debit",
    status: "successful",
  },
];

// Stats cards data
const statsData = [
  { title: "Total USDC", value: "5,000.00" },
  { title: "Wallet Balance", value: "1,200.00" },
  { title: "Last 30 Days", value: "15 transactions" },
];

export default function TransactionsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
          <p className="text-gray-500">View and manage your transaction history</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">Export</Button>
          <Button>Add Transaction</Button>
        </div>
      </div>

      {/* Balance Section */}
      <section className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                <Image src="/usdc.svg" alt="USDC" width={24} height={24} />
              </div>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Available balance</p>
              <h2 className="text-3xl font-bold text-gray-900">1,200.00 USDC</h2>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="outline" className="px-6 border-gray-300 text-gray-700 hover:bg-gray-50">View Wallet</Button>
            <Button className="px-6 bg-blue-600 hover:bg-blue-700">Withdraw</Button>
          </div>
        </div>
      </section>

      {/* Stats Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statsData.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-6">
            <h4 className="text-sm font-medium text-gray-500 mb-2">{stat.title}</h4>
            <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
          </div>
        ))}
      </section>

      {/* Transactions Table */}
      <section className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Transaction Table</h3>
            <div className="flex gap-3">
              <div className="relative">
                <select className="appearance-none bg-white border border-gray-300 rounded-lg py-2 pl-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option>All Transactions</option>
                  <option>Credits</option>
                  <option>Debits</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                  </svg>
                </div>
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search transactions..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="pb-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="pb-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="pb-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="pb-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="pb-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="pb-4 text-xs font-medium text-gray-500 uppercase tracking-wider text-right">More</th>
                </tr>
              </thead>
              <tbody>
                {mockTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50">
                    <td className="py-4 text-sm text-gray-900">{transaction.date}</td>
                    <td className="py-4 text-sm text-gray-900 font-medium">{transaction.description}</td>
                    <td className={`py-4 text-sm font-medium ${transaction.type === "credit" ? "text-green-600" : "text-red-600"}`}>
                      {transaction.amount}
                    </td>
                    <td className="py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 capitalize">
                        {transaction.type}
                      </span>
                    </td>
                    <td className="py-4">
                      <StatusBadge status={transaction.status} />
                    </td>
                    <td className="py-4 text-right">
                      <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">View</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {mockTransactions.map((transaction) => (
              <div key={transaction.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-900">{transaction.description}</h4>
                    <p className="text-sm text-gray-500">{transaction.date}</p>
                  </div>
                  <div className={`font-medium text-sm ${transaction.type === "credit" ? "text-green-600" : "text-red-600"}`}>
                    {transaction.amount}
                  </div>
                </div>
                <div className="flex justify-between mt-3 items-center">
                  <div className="flex gap-2">
                    <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded capitalize">
                      {transaction.type}
                    </span>
                    <StatusBadge status={transaction.status} />
                  </div>
                  <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">View</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pagination */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <p className="text-sm text-gray-500">Showing 1 to 7 of 15 results</p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled className="px-3">
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </Button>
          <Button variant="outline" size="sm" className="px-3">
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
}