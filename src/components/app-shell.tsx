"use client";

import { useState } from "react";
import avatar from "../../public/avatar/avatar.png";
import Image, { StaticImageData } from "next/image";
import MobileHeader from "./mobile-header";
import DesktopHeader from "./desktop-header";
import Sidebar from "./sidebar";
import Link from "next/link";
import { Menu } from "lucide-react";

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
    <div className="min-h-screen bg-[#f3f4f6] flex">
      {/* Mobile top bar */}

      <Sidebar
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      <div className="flex-1">
        {/* Use existing MobileHeader on small screens; pages handle their own desktop headers */}
        <MobileHeader
          user={{ name: user.name, avatar: user.avatar }}
          onOpenMenu={() => setMobileOpen(true)}
        />
        <DesktopHeader
          user={{ name: user.name, userType: user.userType, avatar: user.avatar }}
        />
        <main className="">{children}</main>
      </div>
    </div>
  );
}
