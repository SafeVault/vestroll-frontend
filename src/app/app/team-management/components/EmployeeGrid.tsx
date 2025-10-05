// Lays out the employee cards in a responsive grid.

import Link from "next/link";
import { Employee } from "@/types/teamManagement.types";
import { EmployeeCard } from "./EmployeeCard";

type EmployeeGridProps = {
  employees: Employee[];
  currentPage: number;
  itemsPerPage: number;
};

export const EmployeeGrid = ({
  employees,
  currentPage,
  itemsPerPage,
}: EmployeeGridProps) => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentEmployees = employees.slice(startIndex, endIndex);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
      {currentEmployees.map((employee) => (
        <Link key={employee.id} href={`/app/team-management/${employee.id}`}>
          <EmployeeCard employee={employee} />
        </Link>
      ))}
    </div>
  );
};