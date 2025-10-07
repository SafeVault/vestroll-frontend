// This is the main dashboard component that orchestrates everything.
"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Plus } from "lucide-react";

// Import all our new components
import { NavigationTabs } from "./components/NavigationTabs";
import { SearchFilterBar } from "./components/SearchFilterBar";
import { EmployeeGrid } from "./components/EmployeeGrid";
import { EmployeeTable } from "./components/EmployeeTable";
import { EmployeeMobileCard } from "./components/EmployeeMobileCard";
import { TeamEmptyState } from "./components/TeamEmptyState";
import { Pagination } from "./components/Pagination";
import { FilterModal } from "./components/FilterModal";
import { EmptyState } from "./components/EmptyState";
import { CreateFirstContact } from "./components/CreateFirstContact";
import { generateMockEmployees } from "./utils";
import { ExportDropdown } from "./components/ExportDropDown";
import { CreateTimeOffForm } from "./components/timeOff/CreateTimeOffForm";
import { StatsBar } from "./components/StatsBar";
import { Button } from "@/components/ui/button";

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
    const matchesSearch = employee.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      filters.status === "All" || employee.status === filters.status;
    const matchesType =
      filters.type === "All" || employee.type === filters.type;
    return matchesSearch && matchesStatus && matchesType;
  });

  const itemsPerPage = 12;
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const activeEmployeesCount = allEmployees.filter(
    (emp) => emp.status === "Active"
  ).length;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleFilterApply = (newFilters: { status: string; type: string }) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "Employees":
        // Show empty state if no employees at all
        if (allEmployees.length === 0) {
          return (
            <div className="bg-white rounded-lg border border-gray-200">
              <TeamEmptyState onAddEmployee={() => console.log("Add employee")} />
            </div>
          );
        }

        // Get paginated employees
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedEmployees = filteredEmployees.slice(startIndex, endIndex);

        return (
          <>
            <StatsBar
              totalEmployees={allEmployees.length}
              activeEmployees={activeEmployeesCount}
            />
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Employees</h3>
              </div>
              <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="flex-1 md:flex-initial md:min-w-96">
                  <SearchFilterBar
                    searchQuery={searchQuery}
                    onSearchChange={handleSearchChange}
                    onFilterClick={() => setIsFilterOpen(true)}
                  />
                </div>
                <Button
                  className="bg-primary-100 hover:bg-primary-650 text-white whitespace-nowrap"
                  onClick={() => console.log("Add employee")}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Add Employee</span>
                  <span className="sm:hidden">Add</span>
                </Button>
              </div>
            </div>

            {/* Show "no results" if search/filter returns empty */}
            {filteredEmployees.length === 0 ? (
              <div className="bg-white rounded-lg border border-gray-200 min-h-96">
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
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              </div>
            ) : (
              <>
                {/* Desktop Table View */}
                <div className="hidden md:block bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <EmployeeTable employees={paginatedEmployees} />
                  {totalPages > 1 && (
                    <div className="border-t border-gray-200">
                      <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        totalItems={filteredEmployees.length}
                        itemsPerPage={itemsPerPage}
                        onPageChange={handlePageChange}
                      />
                    </div>
                  )}
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden">
                  <EmployeeMobileCard employees={paginatedEmployees} />
                  {totalPages > 1 && (
                    <div className="mt-4 bg-white rounded-lg border border-gray-200 p-4">
                      <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        totalItems={filteredEmployees.length}
                        itemsPerPage={itemsPerPage}
                        onPageChange={handlePageChange}
                      />
                    </div>
                  )}
                </div>
              </>
            )}
          </>
        );
      case "Time off":
        return <CreateTimeOffForm employees={allEmployees} />;
      case "Milestone":
      case "Time tracking":
      case "Expense":
        return (
          <div className="bg-white rounded-lg border border-gray-200 min-h-96">
            <EmptyState
              title={`No ${activeTab.toLowerCase()} records`}
              message={`${activeTab} records will be displayed here once added.`}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
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

      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {allEmployees.length === 0 ? (
          <CreateFirstContact />
        ) : (
          renderTabContent()
        )}
      </div>

      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        onApply={handleFilterApply}
      />

      {isExportOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsExportOpen(false)}
        />
      )}

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
