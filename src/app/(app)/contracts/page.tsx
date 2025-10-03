"use client";

import React, { useMemo, useState } from "react";
import TitleHeader from "@/components/dashboard/TitleHeader";
import { contractMetricsData } from "@/util/constant";
import { UsdtIcon, DocumentIcon, FilterIcon } from "../../../../public/svg";
import Image from "next/image";

type ContractStatus =
  | "In Review"
  | "Rejected"
  | "Active"
  | "Completed";

type ContractItem = {
  id: string;
  title: string;
  amount: number;
  currency: string;
  status: ContractStatus;
  startDate: string;
  endDate: string;
  rateType: "Fixed rate" | "Hourly rate";
  tags?: string[]; // optional, not displayed on cards
};

const sampleContracts: ContractItem[] = [
  {
    id: "1",
    title: "Invyler Website & Webapp Design",
    amount: 6000,
    currency: "USDT",
    status: "In Review",
    startDate: "20th Oct 22",
    endDate: "26th Nov 22",
    rateType: "Fixed rate",
  },
  {
    id: "2",
    title: "Invyler Mobile App Design",
    amount: 6000,
    currency: "USDT",
    status: "Rejected",
    startDate: "20th Oct 22",
    endDate: "26th Nov 22",
    rateType: "Fixed rate",
  },
  {
    id: "3",
    title: "Brand Identity Design",
    amount: 6000,
    currency: "USDT",
    status: "Active",
    startDate: "20th Oct 22",
    endDate: "26th Nov 22",
    rateType: "Fixed rate",
  },
  {
    id: "4",
    title: "Marketing Website Refresh",
    amount: 6000,
    currency: "USDT",
    status: "Completed",
    startDate: "20th Oct 22",
    endDate: "26th Nov 22",
    rateType: "Fixed rate",
  },
  {
    id: "5",
    title: "Invyler Website & Webapp Design",
    amount: 6000,
    currency: "USDT",
    status: "Completed",
    startDate: "20th Oct 22",
    endDate: "26th Nov 22",
    rateType: "Fixed rate",
  },
  {
    id: "6",
    title: "Invyler Website & Webapp Design",
    amount: 6000,
    currency: "USDT",
    status: "Completed",
    startDate: "20th Oct 22",
    endDate: "26th Nov 22",
    rateType: "Fixed rate",
  },
  {
    id: "7",
    title: "Invyler Website & Webapp Design",
    amount: 6000,
    currency: "USDT",
    status: "Completed",
    startDate: "20th Oct 22",
    endDate: "26th Nov 22",
    rateType: "Fixed rate",
  },
  {
    id: "8",
    title: "Invyler Website & Webapp Design",
    amount: 6000,
    currency: "USDT",
    status: "Completed",
    startDate: "20th Oct 22",
    endDate: "26th Nov 22",
    rateType: "Fixed rate",
  },
];

const getStatusClasses = (status: ContractStatus) => {
  switch (status) {
    case "In Review":
      return "border-[#E79A23] bg-[#FEF7EB] text-[#E79A23]";
    case "Rejected":
      return "border-[#C64242] bg-[#FEECEC] text-[#C64242]";
    case "Active":
      return "border-[#26902B] bg-[#EDFEEC] text-[#26902B]";
    case "Completed":
      return "border-[#2B6CB0] bg-[#EBF4FF] text-[#2B6CB0]";
    default:
      return "border-gray-200 bg-gray-100 text-gray-600";
  }
};

// TagBadge removed per design; tags not displayed on cards

const DateRangeSelect = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  const options = ["Last 30 days", "Last 7 days"];
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-lg border border-[#DCE0E5] bg-white px-3 py-2 text-sm"
      >
        <span>{value}</span>
        <svg
          className={`h-4 w-4 text-gray-500 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 z-20 mt-2 w-44 rounded-lg border border-[#E5E7EB] bg-white shadow-lg">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 ${
                value === opt ? "text-[#5E2A8C] font-medium" : "text-gray-700"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default function ContractsPage() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"All" | "Pending" | "Fixed rate">("All");
  const [dateRange, setDateRange] = useState("Last 30 days");
  const [filterStatus, setFilterStatus] = useState<ContractStatus | null>("Active");
  const [filterRateType, setFilterRateType] = useState<ContractItem["rateType"] | null>("Fixed rate");

  const filteredContracts = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return sampleContracts;
    return sampleContracts.filter((c) => c.title.toLowerCase().includes(q));
  }, [search]);

  return (
    <div className="w-full overflow-x-hidden">
      <TitleHeader title="Contracts" isBackButton={false} isAddButton isExportButton={false} />

      <div className="mx-auto px-4 sm:px-6">
        {/* Metrics */}
        <div className="mt-2 sm:mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {contractMetricsData.map((metric, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-[#e5e7eb] p-4 sm:p-6 overflow-hidden shadow-sm">
              {/* Top row: title and time label */}
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-[#6b7280]">{metric.title}</div>
                <div className="text-xs text-[#7F8C9F]">This year</div>
              </div>
              {/* Divider */}
              <div className="mt-3 border-t border-[#e5e7eb]"></div>
              {/* Value and icon */}
              <div className="mt-3 flex items-start justify-between">
                <div>
                  <div className="text-3xl sm:text-4xl font-semibold text-[#111827]">{metric.value}</div>
                  <div className="mt-2 text-sm text-[#6b7280]">{metric.subValue}</div>
                </div>
                <div className="text-[#5E2A8C]">
                  {idx === 0 || idx === 1 ? (
                    <Image src="/note.svg" alt="note" width={40} height={41} />
                  ) : idx === 2 ? (
                    <Image src="/coin.svg" alt="coin" width={40} height={41} />
                  ) : (
                    <Image src="/dollar-circle.svg" alt="dollar" width={40} height={41} />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* History toolbar: title left, controls right (responsive) */}
        <div className="mt-6 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <h3 className="text-lg font-semibold text-[#17171C]">History</h3>

          {/* Right controls stack */}
          <div className="flex flex-col items-end gap-2 w-full md:w-auto">
            {/* Top row: search + filter button */}
            <div className="flex items-center gap-2 self-end w-full md:w-auto">
              <div className="relative w-full md:w-[340px]">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search..."
                  className="w-full rounded-2xl border border-[#DCE0E5] bg-white pl-4 pr-12 py-3 text-sm text-[#111827] placeholder-[#9ca3af] focus:border-[#5E2A8C] focus:ring-2 focus:ring-[#E2D8F1]"
                />
                {/* Right aligned search icon */}
                <svg
                  className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#9ca3af]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <button className="rounded-2xl border border-[#5E2A8C] bg-white p-2 text-[#5E2A8C]">
                <FilterIcon />
              </button>
            </div>

            {/* Bottom row: attachment-style filter chips + reset aligned to right */}
            <div className="flex flex-wrap items-center gap-2 justify-end w-full">
              {/* Contract type chip */}
              {filterRateType && (
                <span className="inline-flex items-center gap-1 rounded-2xl bg-[#F3EBF9] px-3 py-1 text-sm">
                  <span className="text-[#5E2A8C]">Contract type:</span>
                  <span className="text-[#17171C]">{filterRateType === "Fixed rate" ? "Fixed" : "Hourly"}</span>
                  <button
                    type="button"
                    aria-label="Clear contract type filter"
                    onClick={() => setFilterRateType(null)}
                    className="ml-1 text-[#6b7280] hover:text-[#111827]"
                  >
                    {/* X icon */}
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              )}
              {/* Status chip */}
              {filterStatus && (
                <span className="inline-flex items-center gap-1 rounded-2xl bg-[#F3EBF9] px-3 py-1 text-sm">
                  <span className="text-[#5E2A8C]">Status:</span>
                  <span className="text-[#17171C]">{filterStatus}</span>
                  <button
                    type="button"
                    aria-label="Clear status filter"
                    onClick={() => setFilterStatus(null)}
                    className="ml-1 text-[#6b7280] hover:text-[#111827]"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              )}
              <button
                onClick={() => {
                  setActiveTab("All");
                  setSearch("");
                  setDateRange("Last 30 days");
                  setFilterStatus("Active");
                  setFilterRateType("Fixed rate");
                }}
                className="rounded-2xl px-4 py-2 text-sm border bg-white border-[#5E2A8C] text-[#5E2A8C] font-medium"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Cards grid */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 xl:gap-6">
          {filteredContracts.length === 0 ? (
            <div className="col-span-full text-center py-12 text-[#6b7280]">
              No contracts available
            </div>
          ) : (
            filteredContracts.map((contract) => (
              <div
                key={contract.id}
                className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200 min-h-[180px]"
              >
                {/* Header: Icon + Amount */}
                <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
                  {/* Note icon from asset with purple square background */}
                  <Image src="/Frame 1948759910.svg" alt="note" width={40} height={40} />
                  {/* USDT pill with provided asset */}
                  <div className="flex items-center gap-2 bg-[#F5F6F7] rounded-xl px-3 py-1">
                    <Image src="/Component 13.svg" alt="USDT" width={16} height={16} />
                    <span className="text-xs sm:text-sm font-medium text-[#17171C]">
                      {contract.amount.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })} {contract.currency}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-medium text-[#17171C] text-sm sm:text-base mb-4">
                  {contract.title}
                </h3>

                {/* Date Range */}
                <div className="flex items-center gap-2 mb-5 text-[#7F8C9F]">
                  <svg
                    className="h-5 w-5 text-[#5A42DE]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10m-12 8h14a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-xs sm:text-sm">
                    {contract.startDate} - {contract.endDate}
                  </span>
                </div>

                {/* Divider */}
                <div className="border-t border-[#e5e7eb] mb-4"></div>

                {/* Footer: Rate Type + Status & tags */}
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 text-[#6b7280] text-xs">{contract.rateType}</span>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusClasses(
                      contract.status
                    )}`}
                  >
                    {contract.status}
                  </span>
                </div>

                {/* Tags removed to match attachment: no Freelance/Approved pills */}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}


