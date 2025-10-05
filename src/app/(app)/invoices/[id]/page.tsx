"use client";

import { useParams } from "next/navigation";
import { mockInvoices } from "@/data/invoices";
import InvoiceHeader from "@/components/invoices/InvoiceHeader";
import InvoiceSummary from "@/components/invoices/InvoiceSummary";

export default function InvoiceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const invoice = mockInvoices.find((inv) => inv.id === id);

  if (!invoice) {
    return <div className="p-6 text-red-600">Invoice not found.</div>;
  }

  // Simple inline conversion (tweak rates here as needed)
  const RATE_MAP: Record<string, number> = {
    USDT: 1.002, // small spread to match your mock ($582.20 for 581 USDT)
    ETH: 3000,
    BTC: 68000,
  };

  const rate = RATE_MAP[invoice.paidIn] ?? 1;
  const convertedValue = (invoice.amount * rate).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <InvoiceHeader
        invoiceId={invoice.invoiceNo}
        status={invoice.status}
        onBack={() => history.back()}
        onApprove={() => console.log("Approve", invoice.id)}
        onReject={() => console.log("Reject", invoice.id)}
        onExport={() => console.log("Export", invoice.id)}
        onMakePayment={() => console.log("Make Payment", invoice.id)}
      />

      <main className="flex flex-col items-center py-10">
        <InvoiceSummary
          amount={invoice.amount}
          currency={invoice.paidIn}
          convertedValue={convertedValue}
          iconSrc="/invoice-icon.png" // make sure this exists in /public
        />
      </main>
    </div>
  );
}
