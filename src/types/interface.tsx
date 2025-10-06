import { ReactNode } from "react";

export interface BtnProp {
  variant: "primary" | "secondary" | "outline"; // add button type here
  onclick?: () => void;
  text: string;
}
export interface AuthLayoutProps {
  children: ReactNode;
}

export interface UserPermissionsData {
  id: number;
  name: string;
  email: string;
  permissions: string[];
}

export type InvoiceStatus = "Pending" | "Paid" | "Approved" | "Rejected";
export type StatusType = "Pending" | "Approved" | "Rejected";

export type InvoiceTableCell = {
  status?: InvoiceStatus;
  text?: string;
  icon?: ReactNode;
  iconLabel?: string;
};
export interface InvoiceDetailTableProps {
  headers: string[];
  body: [InvoiceTableCell, InvoiceTableCell];
}
export type ComplianceDetails = {
  agreement: File | null;
  additionalAgreement?: string;
  agreementType: string;
};
export type EmployeeDetails = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  country: string;
  address: string;
  city: string;
  postalCode: string;
};
export type PaymentDetails = {
  network: string;
  asset: string;
  amount: string;
};
export type InvoiceDetails = {
  invoiceFrequency: string;
  issueInvoiceOn: string;
  paymentDue: string;
};

export type FirstInvoice = {
  type: "full" | "custom";
  date?: string;
  amount?: string;
};

export type TaxDetails = {
  taxType: string;
  accountNumber: string;
  taxRate: string;
};
export type MilestoneDetails = {
  id: number;
  title: string;
  amount: string;
  description?: string;
  dueDate?: string;
  deliverables?: string;
  createdAt: string;
  updatedAt?: string;
  status?: StatusType;
  submittedAt?: string;
  paidInd?: string;
};
export type ContractProps = {
  noticePeriod: number;
  paymentDetails: PaymentDetails;
  invoiceDetails: InvoiceDetails;
  firstInvoice: FirstInvoice;
  taxDetails?: TaxDetails;
  milestoneDetails?: MilestoneDetails[];
  requireDeposit?: boolean;
  rateUnit?: string;
  totalMilestoneAmount?: string;
};
