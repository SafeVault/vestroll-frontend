"use client";

import AgreementSelector from "@/components/contracts/AgreementSelector";
import ContractForm from "@/components/contracts/ContractForm";
import ContractOptions from "@/components/contracts/ContractOptions";
import HiringForm from "@/components/contracts/HireForm";
import NewEmployee from "@/components/contracts/NewEmployee";
import ContractReviewAccordion from "@/components/contracts/Sign&Review";
import StepIndicator from "@/components/contracts/StepIndicator";
import { Search, Bell } from "lucide-react";
import Image from "next/image";
import { useState } from "react";


export default function CreateContractPage() {

  const [step, setStep] = useState(5);

  const stepContents = [
    <ContractOptions key={1} />,
    <HiringForm key={2} />,
    <NewEmployee key={3} />,
    <ContractForm key={4} />,
    <AgreementSelector key={5} />,
    <ContractReviewAccordion key={6} />,
  ];

  function choseRenderStep() {
    return stepContents[step - 1] ?? <div>Invalid Step</div>;
  }

  const stepTitles = [
    "Choose contract type",
    "Project details",
    "Employee details",
    "Contract details",
    "Compliance",
    "Review & Sign",
  ];


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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
                <Image
                  src="/user-avatar.svg"
                  alt="Peter"
                  className="object-contain"
                  width={40}
                  height={40}
                />
              </div>
              <div className="hidden sm:block">
                <p className="text-[16px] font-semibold text-[#17171C]">
                  Peter
                </p>
                <p className="text-[#7F8C9F] text-[10px]">Administrator</p>
              </div>
              <Image
                src="/arrow-down.png"
                className="text-gray-400 hidden sm:block"
                alt="Arrow Down"
                width={16}
                height={16}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="">
        <div className="bg-white px-4 py-5 border-b border-[#DCE0E5]">
          <button className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
            <span className="text-sm text-[#7F8C9F] text-[12px]">← Back</span>
          </button>

          <h1 className="font-bold text-[#17171C] text-[24px]">
            Create contract
          </h1>
        </div>

        <div className="max-w-4xl p-4 sm:p-6 bg-white m-4 rounded-md">
          <div className="mb-8">
            <h2 className="text-[#414F62] font-semibold text-[20px] mb-4">
              {stepTitles[step - 1]}
            </h2>
            <StepIndicator totalSteps={6} currentStep={step} />
          </div>
          {choseRenderStep()}

          {/* Navigation Button */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
            <button
              onClick={() => setStep((prev) => Math.max(1, prev - 1))}
              className="w-full h-14 py-4 bg-white border-[1.5px] border-[#17171C] text-[#17171C] text-[16px] font-semibold rounded-[12px] hover:bg-gray-50 transition-colors"
            >
              Prev
            </button>
            <button
              onClick={() => setStep((prev) => Math.min(stepContents.length, prev + 1))}
              className="w-full h-14 bg-[#5E2A8C] text-[16px] text-white font-semibold rounded-[12px] hover:bg-purple-700 transition-colors"
            >
              Next
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
