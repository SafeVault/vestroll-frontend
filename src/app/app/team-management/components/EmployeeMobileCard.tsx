"use client";

import React from "react";
import Image from "next/image";
import { Edit2, Trash2 } from "lucide-react";
import { Employee } from "@/types/teamManagement.types";
import { Badge } from "@/components/ui/badge";

type EmployeeMobileCardProps = {
  employees: Employee[];
};

export const EmployeeMobileCard = ({ employees }: EmployeeMobileCardProps) => {
  return (
    <div className="space-y-4">
      {employees.map((employee) => (
        <div
          key={employee.id}
          className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={employee.avatar || "/profileImage.png"}
                  alt={employee.name}
                  width={48}
                  height={48}
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-base">
                  {employee.name}
                </h3>
                <p className="text-sm text-gray-500">{employee.email}</p>
              </div>
            </div>
            <Badge
              variant={employee.status === "Active" ? "default" : "secondary"}
              className={
                employee.status === "Active"
                  ? "bg-success-100 text-success-600 border-success-200 hover:bg-success-100"
                  : "bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-100"
              }
            >
              {employee.status}
            </Badge>
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Role:</span>
              <span className="text-sm font-medium text-gray-900">
                {employee.role}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Department:</span>
              <span className="text-sm font-medium text-gray-900">
                {employee.department}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100">
            <button
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Edit employee"
            >
              <Edit2 className="w-4 h-4" />
              Edit
            </button>
            <button
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-error-500 hover:bg-red-50 rounded-lg transition-colors"
              aria-label="Delete employee"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
