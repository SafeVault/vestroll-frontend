"use client";

import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Table from "@/components/table/Table";
import { TableColumn } from "../../../components/table/TableHeader";
import { invoiceMetricsData } from "@/util/constant";
import { useRouter } from "next/navigation";
import { RoutePaths } from "../../routes/routesPath";
import { UsdtIcon } from "../../../../public/svg";
import TitleHeader from "@/components/dashboard/TitleHeader";

interface Invoice {
  id: string;
  invoiceNo: string;
  title: string;
  amount: number;
  paidIn: string;
  status: "Successful" | "Failed" | "Pending";
  issueDate: string;
  name?: string;
  number?: string;
  company?: string;
  [key: string]: string | number | undefined; // Add index signature for dynamic property access
}

const Invoices: React.FC = () => {
  // Sample data - replace with your actual data fetching
  const [invoices] = useState<Invoice[]>([
    {
      id: "1",
      invoiceNo: "#INV-2025-010",
      title: "For Mar 31st - Apr 6th 2025",
      amount: 1200,
      paidIn: "USDT",
      status: "Pending",
      issueDate: "25th Oct 2025",
      name: "March April Invoice",
      number: "#INV-2025-010",
      company: "Sample Company",
    },
    {
      id: "2",
      invoiceNo: "#INV-2025-011",
      title: "For Mar 31st - Apr 6th 2025",
      amount: 1200,
      paidIn: "USDT",
      status: "Failed",
      issueDate: "25th Oct 2025",
      name: "March April Invoice",
      number: "#INV-2025-011",
      company: "Sample Company",
    },
    {
      id: "3",
      invoiceNo: "#INV-2025-012",
      title: "For Mar 31st - Apr 6th 2025",
      amount: 1200,
      paidIn: "USDT",
      status: "Successful",
      issueDate: "25th Oct 2025",
      name: "March April Invoice",
      number: "#INV-2025-012",
      company: "Sample Company",
    },
    {
      id: "4",
      invoiceNo: "#INV-2025-013",
      title: "Website Development Project",
      amount: 2500,
      paidIn: "USDT",
      status: "Successful",
      issueDate: "20th Oct 2025",
      name: "Website Development",
      number: "#INV-2025-013",
      company: "Tech Solutions Inc",
    },
    {
      id: "5",
      invoiceNo: "#INV-2025-014",
      title: "Mobile App Design",
      amount: 1800,
      paidIn: "USDT",
      status: "Pending",
      issueDate: "18th Oct 2025",
      name: "Mobile App Design",
      number: "#INV-2025-014",
      company: "Design Studio",
    },
    {
      id: "6",
      invoiceNo: "#INV-2025-015",
      title: "Consulting Services",
      amount: 3200,
      paidIn: "USDT",
      status: "Failed",
      issueDate: "15th Oct 2025",
      name: "Consulting Services",
      number: "#INV-2025-015",
      company: "Business Advisors",
    },
    {
      id: "7",
      invoiceNo: "#INV-2025-016",
      title: "Marketing Campaign",
      amount: 1500,
      paidIn: "USDT",
      status: "Successful",
      issueDate: "12th Oct 2025",
      name: "Marketing Campaign",
      number: "#INV-2025-016",
      company: "Digital Marketing Pro",
    },
    {
      id: "8",
      invoiceNo: "#INV-2025-017",
      title: "Content Writing",
      amount: 800,
      paidIn: "USDT",
      status: "Pending",
      issueDate: "10th Oct 2025",
      name: "Content Writing",
      number: "#INV-2025-017",
      company: "Content Creators",
    },
    {
      id: "9",
      invoiceNo: "#INV-2025-018",
      title: "SEO Optimization",
      amount: 1100,
      paidIn: "USDT",
      status: "Successful",
      issueDate: "8th Oct 2025",
      name: "SEO Optimization",
      number: "#INV-2025-018",
      company: "SEO Experts",
    },
    {
      id: "10",
      invoiceNo: "#INV-2025-019",
      title: "Database Management",
      amount: 2200,
      paidIn: "USDT",
      status: "Failed",
      issueDate: "5th Oct 2025",
      name: "Database Management",
      number: "#INV-2025-019",
      company: "Data Solutions",
    },
    {
      id: "11",
      invoiceNo: "#INV-2025-020",
      title: "Cloud Migration",
      amount: 3500,
      paidIn: "USDT",
      status: "Pending",
      issueDate: "3rd Oct 2025",
      name: "Cloud Migration",
      number: "#INV-2025-020",
      company: "Cloud Services Ltd",
    },
    {
      id: "12",
      invoiceNo: "#INV-2025-021",
      title: "Security Audit",
      amount: 1900,
      paidIn: "USDT",
      status: "Successful",
      issueDate: "1st Oct 2025",
      name: "Security Audit",
      number: "#INV-2025-021",
      company: "Cyber Security Inc",
    },
  ]);

  const [search, setSearch] = useState<string>("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const router = useRouter();

  // Filter invoices based on search query
  const filteredInvoices = invoices.filter(
    (invoice) =>
      invoice.name?.toLowerCase().includes(search.toLowerCase()) ||
      invoice.number?.toLowerCase().includes(search.toLowerCase()) ||
      invoice.company?.toLowerCase().includes(search.toLowerCase()) ||
      invoice.title?.toLowerCase().includes(search.toLowerCase()) ||
      invoice.invoiceNo?.toLowerCase().includes(search.toLowerCase())
  );

  const showModal = () => {
    // Add your filter modal logic here
    console.log("Show filter modal");
  };

  // Define table columns
  const invoiceColumns: TableColumn[] = [
    { key: "invoiceNo", header: "Invoice No." },
    { key: "title", header: "Title" },
    { key: "amount", header: "Amount", align: "center" },
    { key: "paidIn", header: "Paid in", align: "center" },
    { key: "status", header: "Status", align: "center" },
    { key: "issueDate", header: "Issue date", align: "right" },
  ];

  const getStatusBadge = (status: Invoice["status"]) => {
    switch (status) {
      case "Pending":
        return ` border-[#E79A23] bg-[#FEF7EB] text-[#E79A23]`;
      case "Failed":
        return `border-[#C64242] bg-[#FEECEC] text-[#C64242]`;
      case "Successful":
        return `border-[#26902B] bg-[#EDFEEC] text-[#26902B]`;
      default:
        return;
    }
  };

  // Custom cell renderer for invoice-specific formatting
  const renderInvoiceCell = (item: Invoice, column: TableColumn) => {
    switch (column.key) {
      case "title":
        return (
          <div className="text-text-header font-semibold">{item.title}</div>
        );
      case "amount":
        return (
          <div className="text-text-header font-semibold">
            {item.amount.toLocaleString()}.00
          </div>
        );
      case "paidIn":
        return (
          <div className="flex items-center font-medium gap-1 py-1.5 px-3 border border-border-primary bg-fill-background rounded-full w-fit mx-auto">
            <UsdtIcon />
            <span className="text-text-header">{item.paidIn}</span>
          </div>
        );
      case "status":
        return (
          <span
            className={`px-2 py-1 rounded-full text-sm font-semibold border ${getStatusBadge(
              item.status
            )}`}
          >
            {item.status}
          </span>
        );
      case "invoiceNo":
        return <p className="font-medium text-gray-900">{item.invoiceNo}</p>;
      case "title":
        return <span className="text-gray-600">{item.title}</span>;
      case "issueDate":
        return <span className="text-gray-600">{item.issueDate}</span>;
      default:
        return (
          (item as Record<string, string | number | undefined>)[column.key] ||
          "-"
        );
    }
  };

  const renderMobileCell = (item: Invoice) => (
    <div className="flex gap-2 sm:gap-4 justify-between p-2">
      <div className="space-y-1 flex-1 min-w-0">
        <p className="truncate font-semibold text-gray-500 text-sm sm:text-base">{item.invoiceNo}</p>
        <div className="flex items-center gap-2 text-xs sm:text-sm">
          <span className="font-medium text-gray-300">{item.amount.toLocaleString()}</span>
          <div className="w-px h-4 bg-gray-150" />
          <div className="flex items-center font-medium gap-1">
            <UsdtIcon />
            <span className="text-gray-600">{item.paidIn}</span>
          </div>
        </div>
      </div>

      <div className="space-y-1 shrink-0 flex flex-col items-end justify-center">
        <span
          className={`px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full text-xs font-semibold border ${getStatusBadge(
            item.status
          )}`}
        >
          {item.status}
        </span>
        <p className="text-xs font-medium text-gray-400">{item.issueDate}</p>
      </div>
    </div>
  );

  // Handle item selection
  const handleSelectItem = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedItems([...selectedItems, id]);
    } else {
      setSelectedItems(selectedItems.filter((item) => item !== id));
    }
  };

  // Handle select all
  const handleSelectAll = (checked: boolean) => {
    setSelectedItems(
      checked ? filteredInvoices.map((invoice) => invoice.id) : []
    );
  };

  // Handle row click (optional)
  const handleRowClick = (invoice: Invoice) => {
    // Add navigation or modal logic here
    router.push(`${RoutePaths.INVOICES}/${invoice.invoiceNo.replace("#", "")}`);
  };

  return (
    <div className="flex flex-col flex-1 bg-gray-100 w-full min-h-full">
      <div className="bg-white py-3 sm:py-6 border-b border-[#DCE0E5]">
        <TitleHeader title="Invoices" isBackButton={false} isExportButton />
      </div>
      <AnimatePresence mode="wait">
        <div className="flex flex-col flex-1 w-full h-full px-2 py-3 sm:px-4 sm:py-4">
          {invoices.length > 0 && (
            <div className="gap-2 w-full grid grid-cols-1 mb-3 sm:gap-4 sm:grid-cols-2 sm:mb-4 md:grid-cols-4">
              {invoiceMetricsData.map((metric) => (
                <div key={metric.title} className="w-full min-w-0">
                  <div className="h-full p-2 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg sm:p-4 sm:min-w-60 shadow-lg">
                    <span className="flex justify-between text-xs font-medium">
                      <p className="text-white/80 truncate sm:text-xs">{metric.title}</p>
                      <p className="text-white/60 text-xs hidden xs:inline">This year</p>
                    </span>

                    <hr className="my-2 border-white/20 sm:my-4" />

                    <div className="flex items-center justify-between">
                      <span className="min-w-0 flex-1">
                        <p className="mb-1 text-lg font-bold text-white sm:text-2xl lg:text-4xl truncate">
                          {metric.value}
                        </p>
                        <p className="text-xs font-medium text-white/80 sm:text-sm truncate">
                          {metric.subValue}
                        </p>
                      </span>

                      <span className="text-white/90 ml-2 flex-shrink-0">{metric.icon}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <Table
            data={filteredInvoices}
            columns={invoiceColumns}
            search={search}
            setSearch={setSearch}
            showModal={showModal}
            selectedTab="Invoice history"
            searchPlaceholder="Search by title..."
            selectedItems={selectedItems}
            onSelectItem={handleSelectItem}
            onSelectAll={handleSelectAll}
            onRowClick={handleRowClick}
            renderCell={renderInvoiceCell}
            emptyTitle={search ? "No invoices found" : "No invoices yet"}
            emptyDescription={
              search
                ? `No invoices match "${search}". Try adjusting your search.`
                : "Invoices sent to you will be displayed here"
            }
            renderMobileCell={renderMobileCell}
            showPagination={true}
            itemsPerPage={10}
          />
        </div>
      </AnimatePresence>
    </div>
  );
};

export default Invoices;
"use client";

import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Table from "@/components/table/Table";
import { TableColumn } from "../../../components/table/TableHeader";
import { invoiceMetricsData } from "@/util/constant";
import { useRouter } from "next/navigation";
import { UsdtIcon } from "../../../../public/svg";
import TitleHeader from "@/components/dashboard/TitleHeader";
import InvoiceDetailsModal from "@/components/modal/InvoiceDetailsModal";

interface Invoice {
  id: string;
  invoiceNo: string;
  title: string;
  amount: number;
  paidIn: string;
  status: "Pending" | "Overdue" | "Paid";
  issueDate: string;
  name?: string;
  number?: string;
  company?: string;
  [key: string]: string | number | undefined;
}

const Invoices: React.FC = () => {
  const [invoices] = useState<Invoice[]>([
    {
      id: "1",
      invoiceNo: "#INV-2025-001",
      title: "Brightfolk Payment for co...",
      amount: 581,
      paidIn: "USDT",
      status: "Paid",
      issueDate: "25th Oct 2025",
      name: "Adegboyega Oluwagbemiro",
      number: "#INV-2025-001",
      company: "Employee",
    },
    // Add other samples if needed
  ]);

  const [search, setSearch] = useState<string>("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const router = useRouter();

  const filteredInvoices = invoices.filter(
    (invoice) =>
      invoice.name?.toLowerCase().includes(search.toLowerCase()) ||
      invoice.number?.toLowerCase().includes(search.toLowerCase()) ||
      invoice.company?.toLowerCase().includes(search.toLowerCase()) ||
      invoice.title?.toLowerCase().includes(search.toLowerCase()) ||
      invoice.invoiceNo?.toLowerCase().includes(search.toLowerCase())
  );

  const showModal = () => {
    console.log("Show filter modal");
  };

  const invoiceColumns: TableColumn[] = [
    { key: "invoiceNo", header: "Invoice No." },
    { key: "title", header: "Title" },
    { key: "amount", header: "Amount", align: "center" },
    { key: "paidIn", header: "Paid in", align: "center" },
    { key: "status", header: "Status", align: "center" },
    { key: "issueDate", header: "Issue date", align: "right" },
  ];

  const getStatusBadge = (status: Invoice["status"]) => {
    switch (status) {
      case "Pending":
        return ` border-[#E79A23] bg-[#FEF7EB] text-[#E79A23]`;
      case "Overdue":
        return `border-[#C64242] bg-[#FEECEC] text-[#C64242]`;
      case "Paid":
        return `border-[#26902B] bg-[#EDFEEC] text-[#26902B]`;
      default:
        return;
    }
  };

  const renderInvoiceCell = (item: Invoice, column: TableColumn) => {
    switch (column.key) {
      case "title":
        return (
          <div className="text-text-header font-semibold">{item.title}</div>
        );
      case "amount":
        return (
          <div className="text-text-header font-semibold">
            {item.amount.toLocaleString()}.00
          </div>
        );
      case "paidIn":
        return (
          <div className="flex items-center font-medium gap-1 py-1.5 px-3 border border-border-primary bg-fill-background rounded-full w-fit mx-auto">
            <UsdtIcon />
            <span className="text-text-header">{item.paidIn}</span>
          </div>
        );
      case "status":
        return (
          <span
            className={`px-2 py-1 rounded-full text-sm font-semibold border ${getStatusBadge(
              item.status
            )}`}
          >
            {item.status}
          </span>
        );
      case "invoiceNo":
        return <p className="font-medium text-gray-900">{item.invoiceNo}</p>;
      case "title":
        return <span className="text-gray-600">{item.title}</span>;
      case "issueDate":
        return <span className="text-gray-600">{item.issueDate}</span>;
      default:
        return (
          (item as Record<string, string | number | undefined>)[column.key] ||
          "-"
        );
    }
  };

  const renderMobileCell = (item: Invoice) => (
    <div className="flex gap-4 justify-between">
      <div className="space-y-2 flex-1 min-w-0">
        <p className="truncate font-semibold text-gray-500">{item.invoiceNo}</p>
        <span className="flex items-center gap-2 ">
          <p className="text-xs font-medium text-gray-300">{item.amount}</p>

          <div className="w-px self-stretch bg-gray-150" />

          <div className="flex items-center font-medium gap-1 ">
            <UsdtIcon />

            <span className="text-gray-600 text-sm font-medium">
              {item.paidIn}
            </span>
          </div>
        </span>
      </div>

      <div className="space-y-2 shrink-0  flex flex-col items-end justify-between">
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold border ${getStatusBadge(
            item.status
          )}`}
        >
          {item.status}
        </span>
        <p className="text-xs font-medium text-gray-400">25th Oct 2025</p>
      </div>
    </div>
  );

  const handleSelectItem = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedItems([...selectedItems, id]);
    } else {
      setSelectedItems(selectedItems.filter((item) => item !== id));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedItems(
      checked ? filteredInvoices.map((invoice) => invoice.id) : []
    );
  };

  const handleRowClick = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setIsModalOpen(true);
  };

  const getInvoiceModalData = (invoice: Invoice | null) => {
    if (!invoice) return null;

    return {
      invoiceNo: invoice.invoiceNo,
      amount: invoice.amount,
      currency: invoice.paidIn,
      fiatAmount: 476.19,
      status: "Successful",
      network: "Ethereum",
      to: "0x6b885afa...6f23b3",
      fee: "0.0005 ETH ($1.31)",
      transactionId: "0x6b885afa...6f23b3",
      timestamp: "25th Oct 2025 | 2:00pm",
      contract: "Brightfolk Payment for co...",
      contractType: "Fixed rate",
      employee: "Adegboyega Oluwagbemiro",
      availablePayments: [],
      transactionIds: [],
      paymentHashes: [],
    };
  };

  return (
    <div className="flex flex-col flex-1 bg-gray-100 w-full min-h-full">
      {/* Invoice Details Modal */}
      {selectedInvoice && (
        <InvoiceDetailsModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedInvoice(null);
          }}
          invoiceData={getInvoiceModalData(selectedInvoice)!}
        />
      )}
      <div className="bg-white py-6 border-b border-[#DCE0E5]">
        <TitleHeader title="Invoices" isBackButton={false} isExportButton />
      </div>
      <AnimatePresence mode="wait">
        <div className="flex flex-col flex-1 w-full h-full px-4 py-4 ">
          {invoices.length > 0 && (
            <div className="gap-4 w-full flex overflow-x-auto mb-4 sm:grid sm:grid-cols-4 sm:overflow-x-visible">
              {invoiceMetricsData.map((metric) => (
                <div key={metric.title} className="min-w-3xs w-full">
                  <div className="h-full p-4 bg-white rounded-lg min-w-60 lg:w-full">
                    <span className="flex justify-between text-xs font-medium">
                      <p className="text-text-subtext ">{metric.title}</p>
                      <p className="text-[#7F8C9F]">This year</p>
                    </span>

                    <hr className="my-4 text-border-primary" />

                    <div className="flex items-center justify-between">
                      <span>
                        <p className="mb-1 text-2xl font-bold text-text-header lg:text-4xl">
                          {metric.value}
                        </p>
                        <p className="text-sm font-medium text-[#7F8C9F]">
                          {metric.subValue}
                        </p>
                      </span>

                      <span className="text-primary-500">{metric.icon}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <Table
            data={filteredInvoices}
            columns={invoiceColumns}
            search={search}
            setSearch={setSearch}
            showModal={showModal}
            selectedTab="Invoice history"
            searchPlaceholder="Search by title..."
            selectedItems={selectedItems}
            onSelectItem={handleSelectItem}
            onSelectAll={handleSelectAll}
            onRowClick={handleRowClick}
            renderCell={renderInvoiceCell}
            emptyTitle={search ? "No invoices found" : "No invoices yet"}
            emptyDescription={
              search
                ? `No invoices match "${search}". Try adjusting your search.`
                : "Invoices sent to you will be displayed here"
            }
            renderMobileCell={renderMobileCell}
          />
        </div>
      </AnimatePresence>
    </div>
  );
};

export default Invoices;
