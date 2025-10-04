"use client";
import React, { useState } from "react";
import {
  Search,
  ListFilter,
  Upload,
  FileText,
  File,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  User,
  X,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// ============================================
// COMPONENT: EmptyState
// ============================================
const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-20 px-4">
    <div className="relative mb-6">
      <div className="w-32 h-32 bg-gray-200 rounded-md flex items-center justify-center">
        <Search size={48} className="text-gray-400" />
      </div>
    </div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">No records yet</h3>
    <p className="text-gray-500 text-center max-w-sm">
      Employee records will be displayed here once added to the system
    </p>
  </div>
);

// ============================================
// COMPONENT: StatusBadge
// ============================================
type StatusBadgeProps = {
  status: string;
};

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const isActive = status === "Active";
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
        isActive
          ? "bg-green-50 text-green-700 border border-green-200"
          : "bg-gray-50 text-gray-600 border border-gray-200"
      }`}
    >
      {status}
    </span>
  );
};

// ============================================
// COMPONENT: EmployeeCard
// ============================================
type EmployeeCardProps = {
  employee: Employee;
};
const EmployeeCard = ({ employee }: EmployeeCardProps) => (
  <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
    <div className="flex items-start gap-3 mb-3">
      <div className="w-12 h-12 rounded-full bg-gray-300 flex-shrink-0 overflow-hidden">
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
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900 truncate">
          {employee.name}
        </h3>
        <p className="text-xs pt-1 text-gray-500">{employee.role}</p>
      </div>
    </div>
    <span className="mb-4 block border-b border-[#DCE0E5]"></span>
    <div className="flex items-center justify-between gap-2 text-sm text-gray-600">
      <span className="flex gap-2 bg-[#F5F6F7] border  p-2 rounded-full">
        <User size={16} />
        {employee.type}
      </span>
      <StatusBadge status={employee.status} />
    </div>
  </div>
);

// ============================================
// COMPONENT: EmployeeGrid
// ============================================
type Employee = {
  id: number;
  name: string;
  role: string;
  type: string;
  status: string;
  avatar?: string;
};

type EmployeeGridProps = {
  employees: Employee[];
  currentPage: number;
  itemsPerPage: number;
};
const EmployeeGrid = ({
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

// ============================================
// COMPONENT: Pagination
// ============================================
type PaginationProps = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
}: PaginationProps) => {
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - 1 && i <= currentPage + 1)
    ) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "...") {
      pages.push("...");
    }
  }

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 sm:px-6">
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft size={16} />
        </button>

        <div className="hidden sm:flex items-center gap-1">
          {pages.map((page, index) =>
            page === "..." ? (
              <span
                key={`ellipsis-${index}`}
                className="px-3 py-2 text-gray-500"
              >
                ...
              </span>
            ) : (
              <button
                key={page}
                onClick={() => {
                  if (typeof page === "number") {
                    onPageChange(page);
                  }
                }}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === page
                    ? "bg-purple-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            )
          )}
        </div>

        <span className="sm:hidden px-3 py-2 text-sm text-gray-700">
          {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-2 border border-gray-300 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="text-xs text-gray-600">
        <span className="font-medium">{startItem}</span> to{" "}
        <span className="font-medium">{endItem}</span> of{" "}
        <span className="font-medium">{totalItems}</span> employees
      </div>
    </div>
  );
};

// ============================================
// COMPONENT: ExportDropdown
// ============================================
type ExportDropdownProps = {
  isOpen: boolean;
  onToggle: () => void;
};
const ExportDropdown = ({ isOpen, onToggle }: ExportDropdownProps) => (
  <div className="relative">
    <button
      onClick={onToggle}
      className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
    >
      <Upload size={18} />
      <span className="hidden sm:inline">Export</span>
      <ChevronDown
        size={16}
        className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
      />
    </button>

    {isOpen && (
      <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
        <button className="w-full px-4 py-2.5 text-left hover:bg-gray-50 flex items-center gap-3 transition-colors">
          <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center">
            <FileText size={16} className="text-red-600" />
          </div>
          <span className="text-gray-700 font-medium">Export as PDF</span>
        </button>
        <button className="w-full px-4 py-2.5 text-left hover:bg-gray-50 flex items-center gap-3 transition-colors">
          <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center">
            <FileText size={16} className="text-green-600" />
          </div>
          <span className="text-gray-700 font-medium">Export as Excel</span>
        </button>
        <button className="w-full px-4 py-2.5 text-left hover:bg-gray-50 flex items-center gap-3 transition-colors">
          <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
            <File size={16} className="text-gray-600" />
          </div>
          <span className="text-gray-700 font-medium">Export as CSV</span>
        </button>
      </div>
    )}
  </div>
);

// ============================================
// NEW COMPONENT: FilterModal
// ============================================
type FilterModalProps = {
  isOpen: boolean;
  onClose: () => void;
  filters: {
    status: string;
    type: string;
  };
  onApply: (filters: { status: string; type: string }) => void;
};

const FilterModal = ({
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
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/70 z-40" onClick={handleCancel} />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Filter</h2>
            <button
              onClick={handleCancel}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Status Filter */}
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

            {/* Type Filter */}
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

          {/* Footer */}
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

// ============================================
// COMPONENT: NavigationTabs
// ============================================
type NavigationTabsProps = {
  activeTab: string;
  onTabChange: (tab: string) => void;
};
const NavigationTabs = ({ activeTab, onTabChange }: NavigationTabsProps) => {
  const tabs = [
    "Employees",
    "Time tracking",
    "Milestone",
    "Time off",
    "Expense",
  ];

  return (
    <div className="w-full -mx-4 sm:mx-0 max-sm:w-sm">
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-6 mt-4 px-4 sm:px-0 min-w-max">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={`pb-2 px-1 relative transition-colors whitespace-nowrap ${
                activeTab === tab
                  ? "text-purple-600 font-medium"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================
// COMPONENT: StatsBar
// ============================================
type StatsBarProps = {
  totalEmployees: number;
  activeEmployees: number;
};

const StatsBar = ({ totalEmployees, activeEmployees }: StatsBarProps) => {
  const percentage =
    totalEmployees > 0 ? (activeEmployees / totalEmployees) * 100 : 0;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
          <User size={24} className="text-purple-600" />
        </div>
        <div className="flex-1">
          <p className="text-sm text-gray-500 mb-1">Total number</p>
          <h2 className="text-2xl font-bold text-gray-900">
            {totalEmployees} employees
          </h2>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">
            Active:{" "}
            <span className="font-semibold text-gray-900">
              {activeEmployees} employees
            </span>
          </p>
        </div>
      </div>
      <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-purple-600 h-2 rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

// ==========================================
// COMPONENT: CreateFirstContact (For Empty State)
// ==========================================

const CreateFirstContact = () => {
  return (
    <div className="bg-[url('/purple-bg.png')] bg-no-repeat bg-cover rounded-lg p-6 text-white flex flex-col gap-6 mb-3">
      <div className="flex flex-col gap-2">
        <p className="text-xl md:text-[28px] font-bold">
          Create your first contract
        </p>
        <p className="font-medium text-sm text-[#E8E5FA]">
          You're one step away! Set up your first contract and start managing
          payroll.
        </p>
      </div>
      <div className="flex flex-1">
        <button className="bg-white text-primary-500 px-4 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors cursor-pointer">
          New Contract
        </button>
      </div>
    </div>
  );
};

// ============================================
// COMPONENT: SearchFilterBar
// ============================================
type SearchFilterBarProps = {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onFilterClick: () => void;
};
const SearchFilterBar = ({
  searchQuery,
  onSearchChange,
  onFilterClick,
}: SearchFilterBarProps) => (
  <div className="flex gap-3">
    <div className="flex-1 relative">
      <Search
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        size={20}
      />
      <input
        type="text"
        placeholder="Search by name..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
      />
    </div>
    <button
      onClick={onFilterClick}
      className="px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors"
    >
      <ListFilter size={20} className="text-gray-800" />
    </button>
  </div>
);

// ============================================
// UTILITY: Mock Data Generator
// ============================================
const generateMockEmployees = (count = 32) => {
  const employees = [];
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

// ============================================
// MAIN COMPONENT: TeamManagementDashboard
// ============================================
const TeamManagementDashboard = () => {
  const [activeTab, setActiveTab] = useState("Employees");
  const [searchQuery, setSearchQuery] = useState("");
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    status: "All",
    type: "All",
  });

  const allEmployees = generateMockEmployees();

  // Apply filters and search
  const filteredEmployees = allEmployees.filter((employee) => {
    // Search filter
    const matchesSearch = employee.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    // Status filter
    const matchesStatus =
      filters.status === "All" || employee.status === filters.status;

    // Type filter
    const matchesType =
      filters.type === "All" || employee.type === filters.type;

    return matchesSearch && matchesStatus && matchesType;
  });

  const itemsPerPage = 12;
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const activeEmployees = allEmployees.filter(
    (emp) => emp.status === "Active"
  ).length;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleFilterApply = (newFilters: { status: string; type: string }) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Reset to first page when search changes
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Overview</p>
              <h1 className="text-2xl font-bold text-gray-900">
                Team management
              </h1>
            </div>
            <ExportDropdown
              isOpen={isExportOpen}
              onToggle={() => setIsExportOpen(!isExportOpen)}
            />
          </div>
          <NavigationTabs activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {allEmployees.length === 0 ? (
          <CreateFirstContact />
        ) : (
          <StatsBar
            totalEmployees={allEmployees.length}
            activeEmployees={activeEmployees}
          />
        )}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              {activeTab === "Milestone" ? "Milestone requests" : "Employees"}
            </h3>
          </div>
          <div className="w-full md:w-auto md:min-w-96">
            <SearchFilterBar
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
              onFilterClick={() => setIsFilterOpen(true)}
            />
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-lg border border-gray-200 min-h-96">
          {filteredEmployees.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 px-4">
              <Image
                src="/search-paper.svg"
                alt="No records"
                width={200}
                height={200}
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                No employees found
              </h3>
              <p className="text-gray-500 text-center max-w-sm">
                Employees you have contracts with will be displayed here{" "}
              </p>
            </div>
          ) : (
            <>
              <EmployeeGrid
                employees={filteredEmployees}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
              />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={filteredEmployees.length}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>
      </div>

      {/* Filter Modal */}
      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        onApply={handleFilterApply}
      />

      {/* Click outside to close dropdown */}
      {isExportOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsExportOpen(false)}
        />
      )}

      {/* Hide scrollbar globally */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default TeamManagementDashboard;
