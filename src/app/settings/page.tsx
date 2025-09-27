"use client";

import Image from "next/image";
import Link from "next/link";
import { UsersIcon, GlobeAltIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";

const violet = {
    base: "#6d28d9",
    hover: "#5b21b6",
    active: "#4c1d95",
};

function Tab({ label, href, active }: { label: string; href: string; active?: boolean }) {
  return (
    <Link
      href={href}
      className={`-mb-px border-b-2 px-3 sm:px-4 py-3 text-sm sm:text-base transition-colors ${
        active ? "font-semibold" : "text-[#6b7280] hover:text-[#4b5563]"
      }`}
      style={{ borderColor: active ? violet.base : "transparent", color: active ? violet.base : undefined }}
      aria-current={active ? "page" : undefined}
    >
      {label}
    </Link>
  );
}

function Stat({
  Icon,
  label,
  value,
}: {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f5f3ff]">
        <Icon className={`h-5 w-5 text-[${violet.base}]`} />
      </div>
      <div className="leading-tight">
        <div className="text-sm text-[#6b7280]">{label}</div>
        <div className="text-base sm:text-lg font-semibold text-[#111827]">{value}</div>
      </div>
    </div>
  );
}

function SectionCard({
    title,
    action,
    children,
}: {
    title: string;
    action?: React.ReactNode;
    children: React.ReactNode;
}) {
    return (
        <section className="rounded-xl border border-[#e5e7eb] bg-white shadow-sm">
            <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-[#eef2f7]">
                <h2 className="text-lg font-semibold text-[#1f2937]">{title}</h2>
                {action}
            </div>
            <div className="p-4 sm:p-6">{children}</div>
        </section>
    );
}

function FieldRow({ label, value, right }: { label: string; value?: React.ReactNode; right?: React.ReactNode }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-2 sm:gap-6 px-3 sm:px-4 py-3 rounded-lg bg-[#f8fafc]">
            <div className="text-sm text-[#6b7280]">{label}</div>
            <div className="sm:col-span-2 flex items-center justify-between gap-3">
                <div className="text-sm sm:text-base text-[#111827]">{value ?? <span className="text-[#9ca3af]">--</span>}</div>
                {right}
            </div>
        </div>
    );
}

function WarningBox({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex items-center gap-3 rounded-xl border border-[#fef08a] bg-[#fffbeb] px-4 py-4 text-[#92400e]">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#fef3c7] text-[#ca8a04]">!</span>
            <div className="text-sm">
                {children}
            </div>
        </div>
    );
}

export default function SettingsPage() {
    return (
        <div className="min-h-screen w-full bg-[#f3f4f6]">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6 sm:py-10">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl sm:text-3xl font-semibold text-[#111827]">Settings</h1>
                    <div className="hidden sm:block" />
                </div>

                <nav className="mt-6 flex items-center gap-2 border-b border-[#e5e7eb]">
                    <Tab label="Company" href="#" active />
                    <Tab label="Permissions" href="#" />
                    <Tab label="Hiring templates" href="#" />
                    <Tab label="Address book" href="#" />
                </nav>

                {/* Company Header */}
        <div className="mt-6 rounded-xl border border-[#e5e7eb] bg-white p-4 sm:p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="relative h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-[#ef4444] flex items-center justify-center shadow">
                <span className="text-white text-5xl leading-none">A</span>
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-semibold text-[#111827]">Touchpoint 360</h2>
              </div>
            </div>
            <div className="flex items-center gap-6 sm:gap-10">
              <Stat Icon={UsersIcon} label="Active members" value="20" />
              <div className="hidden sm:block h-10 w-px bg-[#e5e7eb]" />
              <Stat Icon={GlobeAltIcon} label="Countries" value="04" />
              <div className="hidden sm:block h-10 w-px bg-[#e5e7eb]" />
              <Stat Icon={ShieldCheckIcon} label="Administrators" value="02" />
            </div>
          </div>
        </div>

                {/* Company information */}
                <div className="mt-6">
                    <SectionCard
                        title="Company information"
                        action={
                            <button
                                className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium text-[${violet.base}] border-[${violet.base}] hover:bg-[${violet.hover}] hover:text-white active:bg-[${violet.active}] transition-colors`}
                            >
                                <Image src="/edit.svg" width={16} height={16} alt="Edit" />
                                Edit
                            </button>
                        }
                    >
                        <div className="space-y-3">
                            <FieldRow label="Company/Brand name" value="Touchpoint 360" />
                            <FieldRow label="Registered name" value="Touchpoint 360" />
                            <FieldRow label="Registration Number/EIN ID" value={<span className="text-[#9ca3af]">--</span>} />
                            <FieldRow
                                label="Country of incorporation"
                                value={
                                    <div className="flex items-center gap-2">
                                        <Image src="/nigeria.svg" width={20} height={14} alt="Nigeria" />
                                        <span>Nigeria</span>
                                    </div>
                                }
                            />
                            <FieldRow label="Size" value={<span className="text-[#9ca3af]">--</span>} />
                            <FieldRow label="VAT number" value={<span className="text-[#9ca3af]">--</span>} />
                            <FieldRow
                                label="Company public website URL"
                                value={
                                    <Link href="https://www.touchpoint360.com/" className={`text-[${violet.base}] hover:underline`}>https://www.touchpoint360.com/</Link>
                                }
                            />
                        </div>
                    </SectionCard>
                </div>

                {/* Addresses */}
                <div className="mt-6">
                    <SectionCard title="Addresses">
                        <div className="space-y-4">
                            <div>
                                <div className="text-sm text-[#6b7280] mb-2">Billing address</div>
                                <WarningBox>
                                    <span>
                                        Please <a className={`underline decoration-[${violet.base}] text-[${violet.base}] hover:no-underline`} href="#">add</a> your company billing address
                                    </span>
                                </WarningBox>
                            </div>
                            <div>
                                <div className="text-sm text-[#6b7280] mb-2">Registered address</div>
                                <WarningBox>
                                    <span>
                                        Please <a className={`underline decoration-[${violet.base}] text-[${violet.base}] hover:no-underline`} href="#">add</a> your a registered address
                                    </span>
                                </WarningBox>
                            </div>
                        </div>
                    </SectionCard>
                </div>
            </div>
        </div>
    );
}


