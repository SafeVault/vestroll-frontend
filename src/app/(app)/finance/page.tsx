"use client";

import AddAddressModal from "@/components/finance/add-address-modal";
import TransactionDetailsModal from "@/components/finance/transaction-details-modal";
import AddressBookEmptyModal from "@/components/modal/address-book/AddressBookEmptyModal";
import useModal from "@/hooks/useModal";
import { useEffect } from "react";

export default function FinancePage() {
  const { showCustomModal, showContentOnlyModal } = useModal();

  useEffect(() => {
    // Auto-open via query ?openAddAddress=true
    const params = new URLSearchParams(window.location.search);
    if (params.get("openAddAddress") === "true") {
      showCustomModal(<AddAddressModal />, "md");
    }
  }, [showCustomModal]);

  return (
    <div className="rounded-xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-[#111827]">Finance</h1>
        <button
          onClick={() => showCustomModal(<AddAddressModal />, "md")}
          className="px-4 py-2 rounded-lg bg-[#5E2A8C] text-white hover:bg-[#4C1D95]"
        >
          Add address
        </button>
      </div>
      <p className="mt-2 text-[#6b7280]">Placeholder page.</p>

      <button
        onClick={() =>
          showContentOnlyModal(<TransactionDetailsModal />, {
            title: "Deposit",
            size: "md",
            showButtons: false,
            fullScreen: true,
          })
        }
        className="px-4 py-2 rounded-lg bg-[#5E2A8C] text-white hover:bg-[#4C1D95]"
      >
        Show Transaction.
      </button>
      <AddressBookEmptyModal isOpen={true} onClose={() => {}} />
    </div>
  );
}
