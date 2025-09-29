"use client";

import { useState } from "react";
import Sidebar from "./sidebar";
import { Menu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f3f4f6] flex">
      {/* Mobile top bar */}

      <Sidebar
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      <div className="flex-1">
        <div className="sticky top-0 z-30 flex items-center justify-between border-b border-[#e5e7eb] bg-white px-4 py-3 lg:hidden">
          <Link
            href="/"
            aria-label="VestRoll home"
            className="flex items-center"
          >
            <Image src="/Logo.svg" alt="VestRoll" width={100} height={100} />
          </Link>
          <button
            type="button"
            aria-label="Open menu"
            className="rounded-lg p-2 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6d28d9]"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>
          <p>homes</p>
        </div>
        <main className="">{children}</main>
      </div>
    </div>
  );
}
