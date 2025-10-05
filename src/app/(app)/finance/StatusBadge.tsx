// components/StatusBadge.tsx

import React from "react";
import { TransactionStatus } from "./types";

interface StatusBadgeProps {
  status: TransactionStatus;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  let bgColorClass = "";
  let textColorClass = "";
  let borderColorClass = "";

  switch (status) {
    case "Successful":
      // Green color for success
      bgColorClass = "bg-[#EDFEEC]";
      textColorClass = "text-[#26902B]";
      borderColorClass = "border-[#26902B]";
      break;
    case "Pending":
      // Yellow/Amber color for pending
      bgColorClass = "bg-[#FEF7EB]";
      textColorClass = "text-[#E79A23]";
      borderColorClass = "border-[#E79A23]";
      break;
    case "Failed":
      // Red color for failed
      bgColorClass = "bg-[#FEECEC]";
      textColorClass = "text-[#C64242]";
      borderColorClass = "border-[#C64242]";
      break;
    default:
      bgColorClass = "bg-gray-100";
      textColorClass = "text-gray-800";
      borderColorClass
  }

  return (
    <span
      className={`inline-flex items-center border px-3 py-0.5 rounded-full text-xs font-medium ${borderColorClass} ${bgColorClass} ${textColorClass}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
