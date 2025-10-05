"use client";

import Image from "next/image";

interface InvoiceSummaryProps {
  amount: number;          // e.g. 581
  currency: string;        // e.g. "USDT"
  convertedValue: string;  // e.g. "$582.20"
  /** Circle icon asset (the one you showed). Put it in /public */
  iconSrc?: string;        // default provided below
}

export default function InvoiceSummary({
  amount,
  currency,
  convertedValue,
  iconSrc = "/invoice-summary-icon.png", // <-- your circular icon in /public
}: InvoiceSummaryProps) {
  return (
    <section className="w-[852px] mx-auto">
      <div className="rounded-2xl border border-[#E9EAF0] bg-white shadow-sm px-10 py-7 flex flex-col items-center text-center">
        <Image
          src={iconSrc}
          alt="Invoice"
          width={100}
          height={100}
          priority
          className="mx-auto block"
        />

        <h2 className="mt-3 text-[20px] leading-[40px] font-semibold text-[#17171C]">
          {amount} {currency}
        </h2>

        <p className="mt-2 text-[16px] leading-[28px] text-[#5D6B82]">
          ≈{convertedValue}
        </p>
      </div>
    </section>
  );
}
