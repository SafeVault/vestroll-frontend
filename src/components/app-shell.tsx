"use client";

import { useState } from "react";
import Sidebar from "./sidebar";
import { Menu } from "lucide-react";

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f3f4f6]">
      {/* Mobile top bar */}
      <div className="sticky top-0 z-30 flex items-center gap-3 border-b border-[#e5e7eb] bg-white px-4 py-3 lg:hidden">
        <button
          type="button"
          aria-label="Open menu"
          className="rounded-lg p-2 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6d28d9]"
          onClick={() => setMobileOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </button>
        <span className="text-base font-semibold">VestRoll</span>
      </div>

      <Sidebar mobileOpen={mobileOpen} onCloseMobile={() => setMobileOpen(false)} />

      <div className="lg:pl-72">
        <main className="px-4 py-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}


