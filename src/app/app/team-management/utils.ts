// This file contains utility functions, like  mock data generator.

import { Employee } from "@/types/teamManagement.types";

export const generateMockEmployees = (count = 32): Employee[] => {
  const employees: Employee[] = [];
  const types = ["Freelancer", "Contractor"];
  const departments = ["Engineering", "Design", "Marketing", "Sales", "HR"];
  const names = [
    "James Akinbiola",
    "Sarah Johnson",
    "Michael Chen",
    "Emily Davis",
    "David Wilson",
    "Lisa Anderson",
    "Robert Taylor",
    "Jennifer Martinez"
  ];

  for (let i = 1; i <= count; i++) {
    const name = names[i % names.length];
    const firstName = name.split(" ")[0].toLowerCase();
    employees.push({
      id: i,
      name: name,
      email: `${firstName}${i}@company.com`,
      role: "Front-end developer",
      department: departments[i % departments.length],
      type: types[i % 2],
      status: i % 3 === 0 ? "Inactive" : "Active",
      avatar: "/profileImage.png",
    });
  }
  return employees;
};
