"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

type TeamEmptyStateProps = {
  onAddEmployee?: () => void;
};

export const TeamEmptyState = ({ onAddEmployee }: TeamEmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="mb-6">
        <Image
          src="/Empty State.svg"
          alt="No employees"
          width={200}
          height={200}
          className="w-48 h-48 md:w-64 md:h-64"
        />
      </div>
      <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">
        No employees yet
      </h3>
      <p className="text-gray-500 text-center max-w-md mb-6">
        Start building your team by adding your first employee. You can manage
        their information, roles, and status all in one place.
      </p>
      {onAddEmployee && (
        <Button
          onClick={onAddEmployee}
          className="bg-primary-100 hover:bg-primary-650 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Employee
        </Button>
      )}
    </div>
  );
};
