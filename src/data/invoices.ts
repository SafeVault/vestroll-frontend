// src/data/invoices.ts

export type InvoiceStatus = "Pending" | "Approved" | "Overdue" | "Paid" | "Rejected";

export interface Invoice {
  id: string;              // stable id used in the route
  invoiceNo: string;       // human-readable number, e.g. "#INV-2025-010"
  title: string;
  amount: number;
  paidIn: string;          // e.g. "USDT"
  status: InvoiceStatus;
  issueDate: string;
  name?: string;
  number?: string;
  company?: string;
  [key: string]: string | number | undefined;
}

// Mock dataset (expand later or replace with API)
export const mockInvoices: Invoice[] = [
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
    status: "Overdue",
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
    status: "Paid",
    issueDate: "25th Oct 2025",
    name: "March April Invoice",
    number: "#INV-2025-012",
    company: "Sample Company",
  },
];
