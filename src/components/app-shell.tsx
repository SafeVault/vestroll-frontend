"use client";

import { useState } from "react";
import avatar from "../../public/avatar/avatar.png";
import { StaticImageData } from "next/image";
import MobileHeader from "./mobile-header";
import Sidebar from "./sidebar";
import DesktopHeader from "./desktop-header";

interface AppShellProps {
  children: React.ReactNode;
  user?: {
    name: string;
    email?: string;
    userType?: string;
    avatar?: string | StaticImageData;
  };
}

export default function AppShell({
  children,
  user = {
    name: "Peter",
    email: "peter@vestroll.com",
    userType: "Administrator",
    avatar: avatar,
  },
}: AppShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f3f4f6]">
      {/* Mobile Header */}
      <MobileHeader user={user} onOpenMenu={() => setMobileOpen(true)} />

      {/* Sidebar */}
      <Sidebar mobileOpen={mobileOpen} onCloseMobile={() => setMobileOpen(false)} />

      {/* Main content */}
      <div className="lg:pl-72">
        <DesktopHeader user={user} onSearch={(val) => console.log("Search:", val)} />
        <main className="px-4 py-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
