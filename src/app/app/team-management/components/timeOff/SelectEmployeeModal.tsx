// /app/team-management/components/time-off/SelectEmployeeModal.tsx

import React, { useState, useMemo } from 'react';
import { X, Search, User } from 'lucide-react';
import { Employee } from '@/types/teamManagement.types';

type SelectEmployeeModalProps = {
  isOpen: boolean;
  onClose: () => void;
  employees: Employee[];
//   onSelect: (employeeName: string) => void;
   onSelect: (employee: Employee) => void;
};

// A sub-component for rendering a single employee row
const EmployeeRow = ({ employee, onSelect }: { employee: Employee; onSelect: () => void }) => (
  <button
    onClick={onSelect}
    className="w-full text-left p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors"
  >
    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
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
      {/* <User size={20} className="text-purple-600" /> */}
    </div>
    <div className="min-w-0">
      <p className="font-medium text-gray-800 truncate">{employee.name}</p>
      <p className="text-sm text-gray-500 truncate">{employee.role}</p>
    </div>
  </button>
);

export const SelectEmployeeModal = ({ isOpen, onClose, employees, onSelect }: SelectEmployeeModalProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEmployees = useMemo(() => {
    if (!searchQuery) return employees;
    return employees.filter(emp =>
      emp.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, employees]);

  if (!isOpen) return null;

  const handleSelect = (employee: Employee) => {
    onSelect(employee);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-md flex flex-col h-full max-h-[70vh]">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0">
            <h2 className="text-lg font-semibold text-gray-900">Select employee</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Search */}
          <div className="p-4 border-b border-gray-200 flex-shrink-0">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Employee List */}
          <div className="overflow-y-auto flex-grow">
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map(employee => (
                <EmployeeRow
                  key={employee.id}
                  employee={employee}
                  onSelect={() => handleSelect(employee)}
                />
              ))
            ) : (
              <p className="text-center text-gray-500 py-10">No employees found.</p>
            )}
          </div>

          {/* Footer (Desktop Only) */}
          <div className="p-4 border-t border-gray-200 flex-shrink-0">
            <button
              onClick={onClose} // Or handle a selection if needed
              className="w-full px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </>
  );
};