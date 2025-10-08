// This file contains all the shared type definitions for the dashboard.
export type Employee = {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
  type: string;
  status: string;
  avatar?: string;
};

export interface TimeOffFormData {
  employee: Employee | null;
  timeOffType: "paid" | "unpaid";
  reason: string;
  startDate: string;
  endDate: string;
  description: string;
  attachment: File | null;
}
