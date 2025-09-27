"use client";

import React, { useState } from "react";
import { Search, Bell, ChevronDown, User } from "lucide-react";
import EmployeeProfileHeader from "./components/profile";
import  ContractCard  from "./components/contractCard";
import Image from "next/image"

const TeamManagementPage: React.FC = () => {
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const UserDropdown: React.FC = () => (
    <div className="relative">
      <button
        onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
        className="flex items-center gap-3 p-2 hover:bg-fill-primary rounded-lg transition-colors"
      >
        <div className="w-8 h-8 bg-brand-default rounded-full flex items-center relative justify-center">
          <User className="w-4 h-4 text-brand-contrast" />
           <Image 
                          src="/touchpoint360.png"   
                          alt="Contract type"
                          width={20}          
                          height={20} 
                          className="absolute top-4 left-5 right-"        
                        />
        </div>
        <div className="hidden sm:block text-left">
          <div className="text-sm font-medium text-text-primary">Peter</div>
          <div className="text-xs text-text-tertiary">Administrator</div>
        </div>
        <ChevronDown className="w-4 h-4 text-text-secondary cursor-pointer" />
      </button>

      {isUserDropdownOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-background-b1 border border-stroke-primary rounded-lg shadow-lg py-1 z-50">
          <button className="w-full text-left px-4 py-2 text-sm text-text-secondary hover:bg-fill-primary transition-colors">
            Profile Settings
          </button>
          <button className="w-full text-left px-4 py-2 text-sm text-text-secondary hover:bg-fill-primary transition-colors">
            Account Settings
          </button>
          <hr className="my-1 border-stroke-primary" />
          <button className="w-full text-left px-4 py-2 text-sm text-text-secondary hover:bg-fill-primary transition-colors">
            Sign Out
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen gap-4  ">
      {/* Header */}
      <header className="bg-background-b0 mb-6 border-b border-stroke-primary px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Search Bar */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-tertiary w-4 h-4" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 bg-background-b0 border border-stroke-primary rounded-lg text-text-primary placeholder-text-tertiary focus:outline-none focus:border-brand-default focus:ring-1 focus:ring-brand-default transition-colors"
              />
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2 sm:gap-4 ml-4">
            {/* Notifications */}
            <button className="p-2 hover:bg-fill-primary rounded-lg transition-colors relative">
              <Bell className="w-5 h-5 text-text-secondary" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-default rounded-full"></span>
            </button>

            {/* User Dropdown */}
            <UserDropdown />
          </div>
        </div>
       
      </header>

      {/* Main Content */}
      <main className="px-6 sm:p-6 bg-background-b0 ">
        {/* Page Title */}
        <div className="">
         
          <p className="text-text-primary text-sm">Personal Information</p>
        </div>

        {/* Employee Profile Header */}
        <EmployeeProfileHeader />

        {/* Contracts Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-text-secondary">
              Contracts
            </h3>
           
          </div>

          {/* Contract Cards Grid */}
          <ContractCard />
        </div>

        
      </main>
    </div>
  );
};

export default TeamManagementPage;
