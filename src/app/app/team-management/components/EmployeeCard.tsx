// Displays a single employee's information in a card format.

import { User } from "lucide-react";
import { Employee } from "@/types/teamManagement.types";
import { StatusBadge } from "./StatusBadge";

type EmployeeCardProps = {
  employee: Employee;
};

export const EmployeeCard = ({ employee }: EmployeeCardProps) => (
  <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
    <div className="flex items-start gap-3 mb-3">
      <div className="w-12 h-12 rounded-full bg-gray-300 flex-shrink-0 overflow-hidden">
        {employee.avatar ? (
          <img
            src={employee.avatar}
            alt={employee.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-purple-100 text-purple-600">
            <User size={24} />
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900 truncate">
          {employee.name}
        </h3>
        <p className="text-xs pt-1 text-gray-500">{employee.role}</p>
      </div>
    </div>
    <span className="mb-4 block border-b border-[#DCE0E5]"></span>
    <div className="flex items-center justify-between gap-2 text-sm text-gray-600">
      <span className="flex gap-2 bg-[#F5F6F7] border  p-2 rounded-full">
        <User size={16} />
        {employee.type}
      </span>
      <StatusBadge status={employee.status} />
    </div>
  </div>
);