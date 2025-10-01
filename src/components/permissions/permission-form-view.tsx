"use client";

import React, { useState } from 'react';
import { ArrowLeft, Info, X } from 'lucide-react';
import { PermissionFormData, User } from '@/types/permissions-tab.types';

interface PermissionFormViewProps {
  selectedUser: User | null;
  initialFormData: PermissionFormData;
  initialPermissions: string[];
  onClose: () => void;
  onSave: (formData: PermissionFormData, permissions: string[]) => void;
}

export const availablePermissions: string[] = [
  'Administrator',
  'Team manager',
  'Expenses administrator',
  'External recruiter',
  'Invoice administrator',
  'Payroll administrator',
  'Time off administrator'
];

export default function PermissionFormView({
  selectedUser,
  initialFormData,
  initialPermissions,
  onClose,
  onSave
}: PermissionFormViewProps) {
  const [formData, setFormData] = useState<PermissionFormData>(initialFormData);
  const [permissions, setPermissions] = useState<string[]>(initialPermissions);
  const [errors, setErrors] = useState<Partial<PermissionFormData>>({});

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<PermissionFormData> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!isValidEmail(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const togglePermission = (permission: string): void => {
    if (permissions.includes(permission)) {
      setPermissions(permissions.filter(p => p !== permission));
    } else {
      setPermissions([...permissions, permission]);
    }
  };

  const handleSave = (): void => {
    if (selectedUser || validateForm()) {
      onSave(formData, permissions);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <h2 className="text-xl font-semibold text-gray-900">Permissions</h2>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
              if (errors.name) setErrors({ ...errors, name: undefined });
            }}
            disabled={!!selectedUser}
            className={`w-full px-4 py-2 border rounded-lg outline-none transition-colors ${
              selectedUser 
                ? 'bg-gray-50 text-gray-500 cursor-not-allowed' 
                : 'bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent'
            } ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Enter full name"
          />
          {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email address
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
              if (errors.email) setErrors({ ...errors, email: undefined });
            }}
            disabled={!!selectedUser}
            className={`w-full px-4 py-2 border rounded-lg outline-none transition-colors ${
              selectedUser 
                ? 'bg-gray-50 text-gray-500 cursor-not-allowed' 
                : 'bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent'
            } ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Enter email address"
          />
          {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-medium text-gray-700">
              Permissions
            </label>
            <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
              <Info className="w-4 h-4" />
              More info
            </button>
          </div>

          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {availablePermissions.map((permission) => {
              const isSelected = permissions.includes(permission);
              return (
                <button
                  key={permission}
                  onClick={() => togglePermission(permission)}
                  className={`w-full text-left px-4 py-2.5 rounded-lg border transition-colors ${
                    isSelected
                      ? 'bg-purple-50 border-purple-300 text-purple-700'
                      : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{permission}</span>
                    {isSelected && <X className="w-4 h-4 text-purple-600" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <button
          onClick={handleSave}
          className="w-full py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
        >
          Save changes
        </button>
      </div>
    </div>
  );
};

