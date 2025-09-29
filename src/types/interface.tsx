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
