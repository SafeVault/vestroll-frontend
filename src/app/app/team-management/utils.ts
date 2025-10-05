// This file contains utility functions, like  mock data generator.

import { Employee } from "@/types/teamManagement.types";

export const generateMockEmployees = (count = 32): Employee[] => {
  const employees: Employee[] = [];
  const types = ["Freelancer", "Contractor"];

  for (let i = 1; i <= count; i++) {
    employees.push({
      id: i,
      name: "James Akinbiola",
      role: "Front-end developer",
      type: types[i % 2],
      status: i % 3 === 0 ? "Inactive" : "Active",
      avatar: "/profileImage.png",
    });
  }
  return employees;
};
