"use client";
import Stepper from "@/components/auth/Stepper";
import { useState } from "react";
import { ComplianceForm } from "./ComplianceForm";
import { Bell, Search } from "lucide-react";
import EmployeeDetails from "./EmployeeDetails";
import ProjectDetails from "./ProjectDetails";

function CreateContract() {
  const [currentStep, setCurrentStep] = useState(2); // use local storage if needed

  const renderStep = () => {
    // add other steps to match
    switch (currentStep) {
      case 2:
        return <ProjectDetails setStep={setCurrentStep} />;
      case 3:
        return <EmployeeDetails setStep={setCurrentStep} />;
      case 5:
        return <ComplianceForm setStepper={setCurrentStep} />;

      default:
        return <ComplianceForm setStepper={setCurrentStep} />;
    }
  };
  return (
    <div>
      <header className="bg-white border-b border-[#DCE0E5] px-4 sm:px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex-1 max-w-md">
            <div className="flex items-center justify-between bg-[#F5F6F7] border border-[#DCE0E5] rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-purple-500 focus-within:border-transparent transition-all">
              <input
                type="text"
                placeholder="Search..."
                className="flex-1 bg-transparent text-[#7F8C9F] focus:outline-none"
              />
              <Search className="w-5 h-5 text-[#7F8C9F] ml-2" />
            </div>
          </div>

          <div className="flex items-center gap-4 ml-4">
            <button className="relative p-2 hover:bg-gray-100 bg-white border border-[#DCE0E5] rounded-full transition-colors">
              <Bell className="w-6 h-6 text-gray-600" />
              <span className="absolute top-1 right-3 w-2 h-2 bg-[#5E2A8C] rounded-full"></span>
            </button>

            <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
              <div className="relative">
                <img
                  src="/user-avatar.svg"
                  alt="Peter"
                  className="w-10 h-10 object-contain"
                />
              </div>
              <div className="hidden sm:block">
                <p className="text-[16px] font-semibold text-[#17171C]">
                  Peter
                </p>
                <p className="text-[#7F8C9F] text-[10px]">Administrator</p>
              </div>
              <img
                src="/arrow-down.png"
                className="w-4 h-4 text-gray-400 hidden sm:block"
              />
            </div>
          </div>
        </div>
      </header>

      <div>
        <div className="bg-white px-4 py-5 border-b border-[#DCE0E5]">
          <button className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
            <span className="text-sm text-[#7F8C9F] text-[12px]">← Back</span>
          </button>

          <h1 className="font-bold text-[#17171C] text-[24px]">
            Create contract
          </h1>
        </div>
        {renderStep()}
      </div>
    </div>
  );
}
export default CreateContract;
