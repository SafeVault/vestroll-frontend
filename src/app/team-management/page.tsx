"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Bell, ChevronDown, MoveLeft, Menu } from "lucide-react";
import EmployeeProfileHeader from "./components/profile";
import ContractCard from "./components/contractCard";
import Image from "next/image";
import Sidebar from "@/components/sidebar";

interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  image: string;
}
interface Admin {
  id: string;
  name: string;
  image: string;
  role: string;
}

const TeamManagementPage: React.FC = () => {
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  // Default employee data if none is provided
  const defaultEmployee: Employee = {
    id: "1",
    name: "James Akinbiola",
    email: "mailjames@gmail.com",
    phone: "+234 904 364 2019",
    address:
      "No 5 James Robertson Stedu/Oguntana Drive, Surulere, Nigeria | 145241",
    image: "/profileImage.png",
  };
  const defaultAdmin: Admin = {
    id: "1",
    name: "Peter",
    role: "Administrator",
    image: "/profileImage.png",
  };

  const UserDropdown: React.FC = () => (
    <div className="relative">
      <button
        onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
        className="flex items-center gap-3 p-2 hover:bg-fill-primary rounded-lg transition-colors"
      >
        <div className=" flex items-center relative justify-center">
          <Image
            src={defaultAdmin.image}
            alt="Contract type"
            width={20}
            height={20}
            className="w-8 h-8 relative rounded-full"
          />
          <Image
            src="/touchpoint360.png"
            alt="Contract type"
            width={20}
            height={20}
            className="absolute top-4 left-5"
          />
        </div>
        <div className="hidden sm:block text-left">
          <div className="text-sm font-medium text-text-primary">
            {defaultAdmin.name}
          </div>
          <div className="text-xs text-text-tertiary">{defaultAdmin.role}</div>
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
    <div className="flex flex-col min-h-screen   ">
      {/* Header */}
      <header
        className="bg-background-b0  fixed top-0 md:top-14 lg:top-0 left-0  
    w-full              
    lg:left-[18rem] lg:w-[calc(100%-18rem)] 
      py-4  z-10 "
      >
        <div className="flex items-center justify-between px-7  pb-3 ">
          {/* Search Bar */}
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-tertiary w-4 h-4" />
              <input
                type="text"
                placeholder="Search..."
                className=" w-80 pl-10 pr-4 py-2 bg-background-b0 border border-stroke-primary rounded-lg text-text-primary placeholder-text-tertiary focus:outline-none focus:border-brand-default focus:ring-1 focus:ring-brand-default transition-colors"
              />
            </div>
          </div>

          {/* Right Side */}
        <div className="flex items-center w-full">
            {/* Mobile menu button */}
            <button
              type="button"
              aria-label="Open menu"
              className="rounded-lg p-2 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6d28d9] md:hidden"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>

            {/* Right side content */}
            <div className="flex items-center gap-2 sm:gap-4 ml-auto">
              <Search className="text-text-tertiary md:hidden block w-4 h-4" />
              <button className="p-2 hover:bg-fill-primary rounded-lg transition-colors relative">
                <Bell className="w-5 h-5 text-text-secondary" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-default rounded-full"></span>
              </button>
              <UserDropdown />
            </div>

            {/* Sidebar (only rendered when mobileOpen = true) */}
            {mobileOpen && (
              <Sidebar
                mobileOpen={mobileOpen}
                onCloseMobile={() => setMobileOpen(false)}
              />
            )}
          </div>
        </div>
        <div className="px-7 space-y-3 pt-2">
          <p
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => router.back()}
          >
            
            <MoveLeft className="w-4 h-4" /> Back
          </p>
          <p className="text-lg font-semibold">{defaultEmployee.name}</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 sm:p-6 bg-background-b0 md:mt-40 mt-24">
        {/* Page Title */}
        <div className="">
          <p className="text-text-primary text-sm">Personal Information</p>
        </div>

        {/* Employee Profile Header */}
        <EmployeeProfileHeader defaultEmployee={defaultEmployee} />

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
