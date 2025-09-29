"use client";

import { useState } from "react";

import {
  DocumentIcon,
  EthIcon,
  Location,
  Mail,
  Phone,
  UsdtIcon,
} from "../../../../../public/svg";
import InvoiceDetailTable from "@/components/dashboard/invoices/InvoiceDetailTable";
import {
  InvoiceDetailTableProps,
  InvoiceStatus,
} from "../../../../types/interface";
import ServiceCard from "@/components/dashboard/invoices/ServiceCard";
import InvoiceHeader from "@/components/dashboard/invoices/InvoiceHeader";
import InvoiceDetailFooter from "@/components/dashboard/invoices/InvoiceDetailFooter";
import useModal from "@/hooks/useModal";
import MakeInvoicePayment from "@/components/modal/MakeInvoicePayment";
import RejectTimeSheetModal from "@/components/modal/RejectTimeSheetModal";
import {
  billingDetailsData,
  invoiceBreakDownData,
  invoiceServiceData,
} from "../../../../util/constant";

const InvoiceDetails = () => {
  const [showCtaButton, setShowCtaButton] = useState<boolean>(true);
  const [status, setStatus] = useState<InvoiceStatus>("Pending");
  const [reason, setReason] = useState("");

  const { showCustomModal, hideModal, showEnhancedModal } = useModal();

  const handleOnApprove = () => {
    setShowCtaButton(false);
    setStatus("Approved");
  };
  const handleReject = () => {
    showEnhancedModal(
      <RejectTimeSheetModal
        handleReject={(reason) => {
          setReason(reason);
          setStatus("Rejected");
          setShowCtaButton(false);

          hideModal();
        }}
      />,
      {
        showCloseButton: false,
        showButtons: false,
      }
    );
  };

  const handlePayment = () => {
    showEnhancedModal(
      <MakeInvoicePayment
        handlePayment={() => {
          setStatus("Paid");
          hideModal();
        }}
      />,
      {
        showCloseButton: false,
        showButtons: false,
      }
    );
  };

  const getStatusTable = (): InvoiceDetailTableProps[] => [
    {
      headers: ["Status", "Invoice no"],
      body: [{ status: status }, { text: "#INV-2025-001" }],
    },
    {
      headers: ["Type", "Paid in"],
      body: [
        { text: "Contract Monthly Payment" },
        { icon: <UsdtIcon />, iconLabel: "USDT" },
      ],
    },
    {
      headers: ["Title", "Network"],
      body: [
        { text: "For Mar 31st - Apr 6th 2025" },
        { icon: <EthIcon />, iconLabel: "Ethereum" },
      ],
    },
    {
      headers: ["Issue Date", "Due Date"],
      body: [{ text: "15 April 2025" }, { text: "29 April 2025" }],
    },
  ];

  return (
    <div className="bg-gray-100" suppressHydrationWarning>
      <InvoiceHeader
        title="#INV-607"
        showCtaButton={showCtaButton}
        onApprove={handleOnApprove}
        handleReject={handleReject}
        status={status}
        handlePayment={handlePayment}
      />

      <section className="grid lg:grid-cols-2 grid-cols-1 gap-4 p-4 max-w-4xl w-full pb-22 lg:pb-4">
        <div className="lg:col-span-2 flex flex-col items-center justify-center bg-white p-6 rounded-lg gap-4">
          <div className="rounded-full bg-[#F3EBF9] p-7 text-primary-500">
            <DocumentIcon />
          </div>

          <span className="space-y-1 text-center">
            <p className="text-text-header text-xl font-semibold">581 USDT</p>
            <p className="font-medium text-text-subtext">≈$582.20</p>
          </span>
        </div>

        {/* billing cards info */}
        {billingDetailsData.map((details, index) => (
          <div
            className="p-6 rounded-lg bg-white space-y-4"
            key={`billing-${details.tag}-${index}`}
          >
            <span className="py-1 px-2 rounded-full border-[#E6D8F3] border bg-[#F3EBF9] text-primary-500 font-semibold text-xs inline-block">
              {details.tag}
            </span>

            <div>
              <p className="font-semibold text-gray-600 mb-1">{details.name}</p>
              <div className="text-sm font-medium text-gray-500 space-y-2">
                <div className="flex flex-wrap items-center">
                  <span className="flex items-center gap-1 mr-6">
                    <Mail />
                    {details.mail}
                  </span>

                  <span className="flex items-center gap-1">
                    <Phone />
                    {details.phone}
                  </span>
                </div>

                <span className="flex items-start gap-1">
                  <Location />
                  {details.location}
                </span>
              </div>
            </div>
          </div>
        ))}

        {/* Details */}
        <div className="p-6 rounded-lg bg-white space-y-4">
          <span className="py-1 px-2 rounded-full bg-[#F3EBF9] border border-[#E6D8F3] text-primary-500 font-semibold text-xs inline-block">
            Details
          </span>

          <div className="space-y-2" suppressHydrationWarning>
            {getStatusTable().map((detail, idx) => (
              <InvoiceDetailTable
                headers={detail.headers}
                body={detail.body}
                key={`status-table-${idx}-${detail.headers.join("-")}`}
              />
            ))}
            {reason && (
              <div>
                <div className="bg-gray-100 text-gray-400 font-medium text-xs py-1 px-2">
                  Reason for rejection
                </div>
                <p className="py-1 px-2 text-sm font-semibold text-gray-500">
                  {reason}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Invoice Breakdown */}
        <div className="p-6 rounded-lg bg-white space-y-4">
          <span className="py-1 px-2 rounded-full bg-[#F3EBF9] border border-[#E6D8F3] text-primary-500 font-semibold text-xs inline-block">
            Invoice Breakdown
          </span>

          {invoiceBreakDownData.map((invoice, idx) => (
            <div
              className={
                "grid grid-cols-2 gap-1 p-2 font-medium text-xs items-center " +
                ((idx + 1) % 2 !== 0 ? "bg-gray-100" : "")
              }
              key={`breakdown-${invoice.title}-${idx}`}
            >
              <p className=" text-gray-400">{invoice.title}</p>

              <span className="text-right">
                <p className="text-gray-500 font-semibold text-sm">
                  {invoice.value}
                </p>
                {invoice.subValue && (
                  <p className="text-gray-400">{invoice.subValue}</p>
                )}
              </span>
            </div>
          ))}

          <div className="grid grid-cols-2 gap-1 p-2 font-medium text-xs items-center bg-gray-100">
            <p className=" text-gray-400">Total Amount</p>

            <span className="text-right">
              <p className="text-gray-500 font-semibold text-xl">$582.20</p>
            </span>
          </div>
        </div>

        {/* Payment Memo */}
        <div className="p-6 rounded-lg bg-white space-y-4 lg:col-span-2">
          <span className="py-1 px-2 rounded-full bg-[#F3EBF9] border border-[#E6D8F3] text-primary-500 font-semibold text-xs inline-block">
            Payment Memo
          </span>

          <p className="text-sm font-semibold text-gray-500">
            Thank you for your business. Please remit payment according to the
            terms outlined in this invoice. If you have any questions regarding
            this invoice or the payment process, do not hesitate to contact us.
          </p>
        </div>

        {invoiceServiceData.map((service, idx) => (
          <ServiceCard {...service} key={`service-${service.title}-${idx}`} />
        ))}
      </section>

      <InvoiceDetailFooter
        showButton={showCtaButton}
        status={status}
        onPayment={handlePayment}
        onApprove={handleOnApprove}
        onReject={handleReject}
      />
    </div>
  );
};

export default InvoiceDetails;
