"use client";

import Link from "next/link";
import React from "react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-6">
        <h2 className="text-xl font-bold mb-6">Vestroll</h2>
        <nav className="flex flex-col space-y-4">
          <Link href="/app/dashboard" className="hover:text-gray-300">Dashboard</Link>
          <Link href="/app/transactions" className="hover:text-gray-300">Transactions</Link>
          <Link href="/app/invoices" className="hover:text-gray-300">Invoices</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 p-8">{children}</main>
    </div>
  );
}
