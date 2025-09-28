"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const violet = {
  base: "#6d28d9",
  hover: "#5b21b6",
  active: "#4c1d95",
};

function classNames(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function Tab({ label, href }: { label: string; href: string }) {
  const pathname = usePathname();
  const active = pathname === href;
  return (
    <Link
      href={href}
      className={classNames(
        "-mb-px whitespace-nowrap border-b-2 px-3 sm:px-4 py-3 text-sm sm:text-base transition-colors",
        active ? "font-semibold" : "text-[#6b7280] hover:text-[#4b5563]"
      )}
      style={{ borderColor: active ? violet.base : "transparent", color: active ? violet.base : undefined }}
      aria-current={active ? "page" : undefined}
    >
      {label}
    </Link>
  );
}

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const themeVars = {
    "--violet-base": violet.base,
    "--violet-hover": violet.hover,
    "--violet-active": violet.active,
  } as React.CSSProperties;

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6 sm:py-10" style={themeVars}>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-semibold text-[#111827]">Settings</h1>
      </div>

      <nav className="mt-6 flex items-center gap-2 border-b border-[#e5e7eb] overflow-x-auto overflow-y-hidden flex-nowrap whitespace-nowrap" role="navigation" aria-label="Settings navigation">
        <Tab label="Company" href="/app/settings" />
        <Tab label="Permissions" href="/app/settings/permissions" />
        <Tab label="Hiring templates" href="/app/settings/hiring-templates" />
        <Tab label="Address book" href="/app/settings/address-book" />
      </nav>

      <div className="mt-6">{children}</div>
    </div>
  );
}



