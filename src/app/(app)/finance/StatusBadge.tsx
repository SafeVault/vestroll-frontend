// components/StatusBadge.tsx

import React from 'react';
import { TransactionStatus } from './types';

interface StatusBadgeProps {
  status: TransactionStatus;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  let bgColorClass = '';
  let textColorClass = '';

  switch (status) {
    case 'Successful':
      // Green color for success
      bgColorClass = 'bg-green-100';
      textColorClass = 'text-green-800';
      break;
    case 'Pending':
      // Yellow/Amber color for pending
      bgColorClass = 'bg-yellow-100';
      textColorClass = 'text-yellow-800';
      break;
    case 'Failed':
      // Red color for failed
      bgColorClass = 'bg-red-100';
      textColorClass = 'text-red-800';
      break;
    default:
      bgColorClass = 'bg-gray-100';
      textColorClass = 'text-gray-800';
  }

  return (
    <span
      className={`inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium ${bgColorClass} ${textColorClass}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;