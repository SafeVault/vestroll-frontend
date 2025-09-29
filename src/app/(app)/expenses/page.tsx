"use client";

import { useState } from "react";
import ExpenseHeader from "@/components/expenses/ExpenseHeader";
import ExpenseCard from "@/components/expenses/ExpenseCard";
import RelatedCard from "@/components/expenses/RelatedCard";
import { X, Check } from "lucide-react";
import RejectModal from "@/components/expenses/RejectModal";

export default function ExpenseDetailsPage() {
  const [status, setStatus] = useState<"Pending" | "Approved" | "Rejected">(
    "Pending"
  );
  const [isRejectOpen, setIsRejectOpen] = useState(false);

  function handleApprove() {
    setStatus("Approved");
  }

  function openRejectModal() {
    setIsRejectOpen(true);
  }

  function closeRejectModal() {
    setIsRejectOpen(false);
  }

  function handleConfirmReject(reason: string) {
    // TODO: send `reason` to API when wired
    // keep the param used so linters don't complain
    console.log("Reject reason:", reason);
    setStatus("Rejected");
    closeRejectModal();
  }

  return (
    <div className="max-w-full pb-24">
      <ExpenseHeader
        status={status}
        onApprove={handleApprove}
        onReject={openRejectModal}
      />

      <div className="mt-6 grid gap-6">
        <ExpenseCard
          status={status}
          amount="42 USDT"
          expenseDate="25th Oct 2025"
          submittedOn="25th Oct 2025"
          description="Monthly subscription for design and creative tools used for client deliverables."
          attachment="File_name.pdf"
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <RelatedCard
            imgSrc="/note.svg"
            title="Quikdash"
            subtitle="Pay as you go"
            actionText="View contract"
          />
          <RelatedCard
            imgSrc="/profile.svg"
            title="James Akinbiola"
            subtitle="Front-end developer"
            actionText="View details"
          />
        </div>
      </div>

      {/* Mobile fixed action bar - visible only on small screens */}
      <div className="fixed inset-x-0 bottom-4 z-40 lg:hidden">
        <div className="mx-auto max-w-6xl px-4">
          <div className="rounded-xl bg-transparent p-1">
            <div className="flex gap-3">
              <button
                type="button"
                onClick={openRejectModal}
                className="flex-1 rounded-lg border border-[#5E2A8C] bg-white px-4 py-3 text-sm text-[#5E2A8C] flex items-center justify-center gap-2"
              >
                <X className="h-4 w-4" />
                <span>Reject</span>
              </button>
              <button
                type="button"
                onClick={handleApprove}
                className="flex-1 rounded-lg bg-[#5E2A8C] px-4 py-3 text-sm text-white flex items-center justify-center gap-2"
              >
                <span>Approve</span>
                <Check className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <RejectModal
        open={isRejectOpen}
        onClose={closeRejectModal}
        onConfirm={handleConfirmReject}
      />
    </div>
  );
}
