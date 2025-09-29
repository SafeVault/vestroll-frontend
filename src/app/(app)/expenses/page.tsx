"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, X, Check } from "lucide-react";

function StatusBadge({
  status,
}: {
  status: "Pending" | "Approved" | "Rejected";
}) {
  const base =
    "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium";
  const cls =
    status === "Pending"
      ? "bg-[#FEF7EB] text-[#E79A23] border border-[#E79A23]"
      : status === "Approved"
        ? "bg-[#EDFEEC] text-[#065f46] border border-[#065f46]"
        : "bg-[#fee2e2] text-[#991b1b] border border-[#991b1b]";
  return <span className={`${base} ${cls}`}>{status}</span>;
}

export default function ExpenseDetailsPage({ id }: { id: string }) {
  return (
    <div className="max-w-6xl">
      <div className="flex bg-white items-start justify-between gap-4">
        <div>
          <Link
            href="/app/finance"
            className="inline-flex items-center gap-2 text-sm text-[#6b7280] hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </Link>
          <h2 className="mt-4 text-2xl font-semibold text-[#111827]">
            Expense details
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <button className="rounded-lg border flex items-center gap-1 border-[#5E2A8C] bg-white px-6 py-3 text-sm text-[#5E2A8C]">
            Reject
            <X width={20} height={20} />
          </button>
          <button className="rounded-lg flex items-center gap-1 bg-[#5E2A8C] px-6 py-3 text-sm text-white">
            Approve
            <Check width={20} height={20} />
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-6">
        <div className="rounded-xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-[#F3EBF9] p-3">
                <Image src="/bills.svg" alt="icon" width={28} height={28} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#111827]">
                  Electricity and data
                </h3>
                <p className="text-sm text-[#6b7280]">Software & Tools</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="text-left">
                <div className="text-sm text-[#6b7280]">Status</div>
                <div className="mt-1">
                  <StatusBadge status="Pending" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="col-span-3 w-full">
              <div className="w-full flex justify-between bg-[#f9fafb] p-1 px-2 text-sm text-[#6b7280]">
                <div className="rounded-md font-semibold bg-[#f9fafb] text-sm text-[#6b7280]">
                  Amount
                </div>
                <div className="rounded-md font-semibold bg-[#f9fafb] text-sm text-[#6b7280]">
                  Expense date
                </div>
              </div>
              <div className="mt-2 text-base flex justify-between p-1 px-2 font-medium text-[#111827]">
                <div className="text-sm font-semibold text-[#17171C]">
                  42 USDT
                </div>
                <div className="text-sm font-semibold text-[#17171C]">
                  25th Oct 2025
                </div>
              </div>

              <div className="mt-4 w-full flex justify-between bg-[#f9fafb] p-1 px-2 text-sm text-[#6b7280]">
                Description
              </div>
              <p className="mt-2 text-sm font-semibold text-[#17171C] p-1 px-2">
                Monthly subscription for design and creative tools used for
                client deliverables.
              </p>

              <div className="mt-2 w-full flex justify-between bg-[#f9fafb] p-1 px-2 text-sm text-[#6b7280]">
                <div className="rounded-md font-semibold bg-[#f9fafb] text-sm text-[#6b7280]">
                  Attachment
                </div>
                <div className="rounded-md bg-[#f9fafb] font-semibold text-sm text-[#6b7280]">
                  Submitted on
                </div>
              </div>
              <div className="mt-2 text-base flex justify-between p-1 px-2 font-medium text-[#111827]">
                <div className="text-sm font-semibold text-[#17171C]">
                  <Link href="#" className="text-sm font-medium text-[#5E2A8C]">
                    File_name.pdf
                  </Link>
                </div>
                <div className="text-sm font-semibold text-[#17171C]">
                  25th Oct 2025
                </div>
              </div>
            </div>

            {/* <div className="space-y-4">
              <div className="rounded-md bg-[#f9fafb] p-3 text-sm text-[#6b7280]">
                Expense date
              </div>
              <div className="text-sm text-[#374151]">25th Oct 2025</div>

              <div className="mt-4 rounded-md bg-[#f9fafb] p-3 text-sm text-[#6b7280]">
                Submitted on
              </div>
              <div className="text-sm text-[#374151]">25th Oct 2025</div>
            </div> */}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex items-center gap-4 rounded-xl border border-[#e5e7eb] bg-white p-4">
            <div className="rounded-lg bg-[#F3EBF9] p-3">
              <Image src="/note.svg" alt="contract" width={36} height={36} />
            </div>
            <div>
              <div className="text-xl font-semibold text-[#111827]">
                Quikdash
              </div>
              <div className="text-sm text-[#6b7280]">Pay as you go</div>
            </div>
            <div className="ml-auto text-sm text-[#6d28d9]">
              <Link href="#">View contract</Link>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-xl border border-[#e5e7eb] bg-white p-4">
            <div className="rounded-lg bg-[#F3EBF9] p-3">
              <Image
                src="/profile.svg"
                alt="person"
                width={36}
                height={36}
                className="rounded-full"
              />
            </div>
            <div>
              <div className="text-sm font-semibold text-[#111827]">
                James Akinbiola
              </div>
              <div className="text-sm text-[#6b7280]">Front-end developer</div>
            </div>
            <div className="ml-auto text-sm text-[#6d28d9]">
              <Link href="#">View details</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
