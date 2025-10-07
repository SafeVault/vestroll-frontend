"use client";

import React from "react";
import Image from "next/image";
import { Edit2, Trash2 } from "lucide-react";
import { Employee } from "@/types/teamManagement.types";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type EmployeeTableProps = {
  employees: Employee[];
};

export const EmployeeTable = ({ employees }: EmployeeTableProps) => {
  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-gray-200 bg-gray-50">
            <TableHead className="text-gray-600 font-semibold text-sm">
              Name
            </TableHead>
            <TableHead className="text-gray-600 font-semibold text-sm">
              Email
            </TableHead>
            <TableHead className="text-gray-600 font-semibold text-sm">
              Role
            </TableHead>
            <TableHead className="text-gray-600 font-semibold text-sm">
              Department
            </TableHead>
            <TableHead className="text-gray-600 font-semibold text-sm">
              Status
            </TableHead>
            <TableHead className="text-gray-600 font-semibold text-sm text-right">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((employee) => (
            <TableRow
              key={employee.id}
              className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <TableCell className="py-4">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={employee.avatar || "/profileImage.png"}
                      alt={employee.name}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                  <span className="font-medium text-gray-900">
                    {employee.name}
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-gray-600 text-sm">
                {employee.email}
              </TableCell>
              <TableCell className="text-gray-600 text-sm">
                {employee.role}
              </TableCell>
              <TableCell className="text-gray-600 text-sm">
                {employee.department}
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    employee.status === "Active" ? "default" : "secondary"
                  }
                  className={
                    employee.status === "Active"
                      ? "bg-success-100 text-success-600 border-success-200 hover:bg-success-100"
                      : "bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-100"
                  }
                >
                  {employee.status}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-end gap-2">
                  <button
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    aria-label="Edit employee"
                  >
                    <Edit2 className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                    aria-label="Delete employee"
                  >
                    <Trash2 className="w-4 h-4 text-error-500" />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
