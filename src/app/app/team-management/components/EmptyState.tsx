'use client';
import React, { useState } from 'react';
import {  Search, ListFilter, Upload, FileText, File, ChevronDown } from 'lucide-react';
import Image from 'next/image';

// Empty State Component
const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-20 px-4">
       <div className="relative mb-6">
      <Image
        src="/scope.png" 
        alt="scope"
        width={120}
        height={120}
        className="rounded-md"
      />
      </div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">No records yet</h3>
    <p className="text-gray-500 text-center max-w-sm">
      Employee records will be displayed here once added to the system
    </p>
  </div>
);

// Export Dropdown Component
const ExportDropdown = ({ isOpen, onToggle }) => (
  <div className="relative">
    <button
      onClick={onToggle}
      className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
    >
      <Upload size={18} />
      Export
      <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
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

// Navigation Tabs Component
const NavigationTabs = ({ activeTab, onTabChange }) => {
  const tabs = ['Employees', 'Time tracking', 'Milestone', 'Time off', 'Expense'];
  
  return (
    <div className="flex gap-6 border-b border-gray-200 mb-6">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`pb-3 px-1 relative transition-colors ${
            activeTab === tab
              ? 'text-purple-600 font-medium'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          {tab}
          {activeTab === tab && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600" />
          )}
        </button>
      ))}
    </div>
  );
};

// Search and Filter Bar Component
const SearchFilterBar = ({ searchQuery, onSearchChange }) => (
  <div className="flex flex-col sm:flex-row gap-3 mb-6">
    <div className="flex-1 relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      <input
        type="text"
        placeholder="Search by employee..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
      />
    </div>
    <button className="px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors">
      <ListFilter size={20} className="text-gray-800" />
    </button>
  </div>
);

// Main Dashboard Component
const TeamManagementDashboard = () => {
  const [activeTab, setActiveTab] = useState('Employees');
  const [searchQuery, setSearchQuery] = useState('');
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [hasData, setHasData] = useState(false); // Toggle this to show/hide table

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Overview</p>
              <h1 className="text-2xl font-bold text-gray-900">Team management</h1>
            </div>
            <ExportDropdown isOpen={isExportOpen} onToggle={() => setIsExportOpen(!isExportOpen)} />
          </div>
          <NavigationTabs activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
      </div>

      {/* Main Content */}
      <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:items-center sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
            <div className=""><h3 className='text-[#17171C] font-800 text-lg'>Milestone requests</h3></div>
        <SearchFilterBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        </div>
        
        {/* Content Area */}
        <div className="bg-white rounded-lg border border-gray-200 min-h-96">
          {!hasData ? (
            <EmptyState />
          ) : (
            <div className="p-6">
              <p className="text-gray-600">Table will appear here...</p>
            </div>
          )}
        </div>

        {/* Development Toggle Button */}
        <div className="mt-4 flex justify-center">
          <button
            onClick={() => setHasData(!hasData)}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm font-medium text-gray-700"
          >
            Toggle Data (Dev Only)
          </button>
        </div>
      </div>

      {/* Click outside to close dropdown */}
      {isExportOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsExportOpen(false)}
        />
      )}
    </div>
  );
};

export default TeamManagementDashboard;