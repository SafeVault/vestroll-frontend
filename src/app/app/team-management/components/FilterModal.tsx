// /app/team-management/components/FilterModal.tsx
// The modal popup for applying filters to the employee list.

import { useState } from "react";
import { X } from "lucide-react";

type FilterModalProps = {
  isOpen: boolean;
  onClose: () => void;
  filters: {
    status: string;
    type: string;
  };
  onApply: (filters: { status: string; type: string }) => void;
};

export const FilterModal = ({
  isOpen,
  onClose,
  filters,
  onApply,
}: FilterModalProps) => {
  const [localFilters, setLocalFilters] = useState(filters);

  if (!isOpen) return null;

  const handleApply = () => {
    onApply(localFilters);
    onClose();
  };

  const handleCancel = () => {
    setLocalFilters(filters);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/70 z-40" onClick={handleCancel} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Filter</h2>
            <button
              onClick={handleCancel}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Status
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    setLocalFilters({ ...localFilters, status: "All" })
                  }
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    localFilters.status === "All"
                      ? "bg-purple-100 text-purple-700 border border-purple-300"
                      : "bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() =>
                    setLocalFilters({ ...localFilters, status: "Active" })
                  }
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    localFilters.status === "Active"
                      ? "bg-purple-100 text-purple-700 border border-purple-300"
                      : "bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200"
                  }`}
                >
                  Active
                </button>
                <button
                  onClick={() =>
                    setLocalFilters({ ...localFilters, status: "Inactive" })
                  }
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    localFilters.status === "Inactive"
                      ? "bg-purple-100 text-purple-700 border border-purple-300"
                      : "bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200"
                  }`}
                >
                  Inactive
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Type
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    setLocalFilters({ ...localFilters, type: "All" })
                  }
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    localFilters.type === "All"
                      ? "bg-purple-100 text-purple-700 border border-purple-300"
                      : "bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() =>
                    setLocalFilters({ ...localFilters, type: "Freelancer" })
                  }
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    localFilters.type === "Freelancer"
                      ? "bg-purple-100 text-purple-700 border border-purple-300"
                      : "bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200"
                  }`}
                >
                  Freelancer
                </button>
                <button
                  onClick={() =>
                    setLocalFilters({ ...localFilters, type: "Contractor" })
                  }
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    localFilters.type === "Contractor"
                      ? "bg-purple-100 text-purple-700 border border-purple-300"
                      : "bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200"
                  }`}
                >
                  Contractor
                </button>
              </div>
            </div>
          </div>
          <div className="flex gap-3 p-6 border-t border-gray-200">
            <button
              onClick={handleCancel}
              className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              className="flex-1 px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-colors"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </>
  );
};