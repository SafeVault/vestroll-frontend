import React from 'react';
import { MOCK_ASSETS, generateMockTransactions } from '@/lib/mock-data';
import { BalanceSection } from '@/components/finance/balance-section';
import { AssetsGrid } from '@/components/finance/assets-grid';
import { FinanceClient } from '@/components/finance/finance-client';

const allTransactions = generateMockTransactions(80);

export default function FinancePage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-6 lg:p-8">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <header className="mb-5">
          <p className="text-xs text-[#94A3B8] mb-1">Overview</p>
          <h1 className="text-2xl md:text-3xl font-bold text-[#0F172A]">
            Finance
          </h1>
        </header>

        {/* Balance Section */}
        <BalanceSection
          balance="$5,050.00"
          change="-0.0051% ($0.99)"
        />

        {/* Assets Grid */}
        <AssetsGrid assets={MOCK_ASSETS} />

        {/* Transactions Section with Client Component */}
        <FinanceClient
          allTransactions={allTransactions}
          initialResultsPerPage={10}
        />
      </div>
    </div>
  );
}