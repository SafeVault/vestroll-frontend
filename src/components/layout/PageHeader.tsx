"use client";

import React from "react";
import { ArrowLeft, Search, Menu } from "lucide-react";
import Image from "next/image";

interface PageHeaderProps {
  title: string;
  onBack?: () => void;
}

export default function PageHeader({ title, onBack }: PageHeaderProps) {
  return (
    <div className="w-full border-b bg-white">
      {/* Top row */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 mb-5">
        {/* Left side: Hamburger (mobile) OR Search bar (desktop) */}
        <div className="flex items-center">
          {/* Hamburger (mobile only) */}
          <button className="md:hidden">
            <Menu className="w-6 h-6 text-gray-700" />
          </button>

          {/* Search bar (desktop only) */}
          <div className="relative hidden md:block w-full max-w-sm">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-4 pr-9 py-2 rounded-lg border border-gray-200 text-sm 
                         focus:ring-2 focus:ring-purple-600 focus:border-purple-600 
                         text-gray-700 bg-[#F5F6F7] placeholder-gray-400"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Search icon (mobile only) */}
          <button className="md:hidden">
            <Search className="w-5 h-5 text-gray-700" />
          </button>

          {/* Notification bell */}
          <button>
            <Image
              src="/bell.png"
              alt="Notifications"
              width={32}
              height={32}
              className="object-contain"
            />
          </button>

          {/* Profile */}
          <div className="flex items-center gap-2">
            <Image
              src="/profile.png"
              alt="User Avatar"
              width={36}
              height={36}
              className="rounded-full"
            />
            {/* Show text only on desktop */}
            <div className="hidden md:flex flex-col">
              <span className="text-sm font-medium text-gray-900 leading-tight">
                Peter
              </span>
              <span className="text-xs text-gray-500 leading-tight">
                Administrator
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom row: back + title */}
      <div className="px-6 pb-3">
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm text-[#7F8C9F] hover:text-gray-900 mb-1"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        )}
        <h1 className="text-xl font-semibold text-[#17171C]">{title}</h1>
      </div>
    </div>
  );
}
