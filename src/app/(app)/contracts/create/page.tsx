"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import ContractDetails from "@/components/contracts/ContractDetails";
import ProjectDetails from "@/components/contracts/ProjectDetails";
import EmployeeDetails from "@/components/contracts/EmployeeDetails";
import { ComplianceForm } from "@/components/contracts/ComplianceForm";
import ContractReviewAccordion from "@/components/contracts/Sign&Review";

interface ContractFormData {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientAddress: string;
  startDate: string;
  endDate: string;
  terminationNotice: string;
  network: string;
  asset: string;
  amount: string;
  calculatedAmount: string;
  invoiceFrequency: string;
  issueInvoiceOn: string;
  paymentDue: string;
  firstInvoiceType: "full" | "custom";
  firstInvoiceDate: string;
  firstInvoiceAmount: string;
  walletAddress: string;
  walletType: string;
  contractDuration: string;
  renewalTerms: string;
  milestones: Array<{
    id: string;
    title: string;
    description: string;
    dueDate: string;
    amount: string;
  }>;
  taxType: string;
  taxId: string;
  taxRate: string;
  uploadedFiles: File[];
}

interface FormErrors {
  [key: string]: string;
}

const steps = [
  { id: 1, name: "Choose contract Type" },
  { id: 2, name: "Project Details" },
  { id: 3, name: "Employee Details" },
  { id: 4, name: "Contract Details" },
  { id: 5, name: "Compliance Details" },
  { id: 6, name: "Review & Sign" },
];

export default function CreateContractPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ContractFormData>({
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    clientAddress: "",
    startDate: "",
    endDate: "",
    terminationNotice: "",
    network: "Ethereum",
    asset: "USDT",
    amount: "2000.00",
    calculatedAmount: "1974.849",
    invoiceFrequency: "",
    issueInvoiceOn: "",
    paymentDue: "",
    firstInvoiceType: "full",
    firstInvoiceDate: "",
    firstInvoiceAmount: "",
    walletAddress: "",
    walletType: "",
    contractDuration: "",
    renewalTerms: "",
    milestones: [],
    taxType: "",
    taxId: "",
    taxRate: "",
    uploadedFiles: [],
  });
  const [errors, setErrors] = useState<FormErrors>({});

  // Listen to layout buttons
  useEffect(() => {
    const onPrev = () => setCurrentStep((s) => Math.max(1, s - 1));
    const onNext = () => setCurrentStep((s) => Math.min(6, s + 1));
    window.addEventListener("contracts:prev", onPrev);
    window.addEventListener("contracts:next", onNext);
    return () => {
      window.removeEventListener("contracts:prev", onPrev);
      window.removeEventListener("contracts:next", onNext);
    };
  }, []);

  const ProgressBar = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-gray-700">
          {steps.find((s) => s.id === currentStep)?.name}
        </h2>
      </div>
      <div className="flex items-center space-x-2">
        {steps.map((step) => (
          <div
            key={step.id}
            className={`h-1 flex-1 ${step.id <= currentStep ? "bg-[#5E2A8C]" : "bg-[#DCE0E5]"} rounded-full`}
          />
        ))}
      </div>
    </div>
  );

  const handleFormDataChange = (data: ContractFormData) => setFormData(data);
  const handleErrorsChange = (newErrors: FormErrors) => setErrors(newErrors);

  const handleCreateContract = () => {
    console.log("Creating contract...", formData);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-700 mb-4">
              Project Setup
            </h3>
            <p className="text-gray-600">
              Basic project information will go here
            </p>
          </div>
        );
      case 2:
        return <ProjectDetails />;
      case 3:
        return <EmployeeDetails />;
      case 4:
        return (
          <ContractDetails
            formData={formData}
            onFormDataChange={handleFormDataChange}
            errors={errors}
            onErrorsChange={handleErrorsChange}
            onNext={() => setCurrentStep((s) => Math.min(6, s + 1))}
            onPrev={() => setCurrentStep((s) => Math.max(1, s - 1))}
          />
        );
      case 5:
        return <ComplianceForm />;
      case 6:
        return <ContractReviewAccordion />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <ProgressBar />
      {renderStep()}
    </div>
  );
}
