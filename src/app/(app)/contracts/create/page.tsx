"use client";

import { useEffect, useState } from "react";
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
  paymentFrequency?: "Hourly" | "Daily" | "Weekly" | "Per Deliverable";
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
    paymentFrequency: "Hourly",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  // Listen to layout buttons
  useEffect(() => {
    const onPrev = () => {
      if (currentStep > 1) {
        setCurrentStep((s) => s - 1);
      }
    };

    const onNext = () => {
      // Add validation logic here before moving to next step
      if (currentStep < 6) {
        // You can add step-specific validation here
        if (currentStep === 4) {
          // Validate contract details before moving forward
          // The ContractDetails component handles its own validation
        }
        setCurrentStep((s) => s + 1);
      } else if (currentStep === 6) {
        // Final step - submit the form
        handleCreateContract();
      }
    };

    window.addEventListener("contracts:prev", onPrev);
    window.addEventListener("contracts:next", onNext);

    return () => {
      window.removeEventListener("contracts:prev", onPrev);
      window.removeEventListener("contracts:next", onNext);
    };
  }, [currentStep]);

  const ProgressBar = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-[#414F62]">
          {steps.find((s) => s.id === currentStep)?.name}
        </h2>
        <span className="text-sm text-[#7F8C9F]">
          Step {currentStep} of {steps.length}
        </span>
      </div>
      <div className="flex items-center space-x-2">
        {steps.map((step) => (
          <div
            key={step.id}
            className={`h-1 flex-1 transition-colors duration-300 ${step.id <= currentStep ? "bg-[#5E2A8C]" : "bg-[#E5E7EB]"
              } rounded-full`}
          />
        ))}
      </div>
    </div>
  );

  const handleFormDataChange = (data: ContractFormData) => {
    setFormData(data);
  };

  const handleErrorsChange = (newErrors: FormErrors) => {
    setErrors(newErrors);
  };

  const handleCreateContract = () => {
    console.log("Creating contract with data:", formData);
    // TODO: Add API call to create contract
    // Example:
    // try {
    //   const response = await createContractAPI(formData);
    //   if (response.success) {
    //     router.push('/contracts?success=true');
    //   }
    // } catch (error) {
    //   console.error('Error creating contract:', error);
    // }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-[#17171C] mb-4">
              Choose Contract Type
            </h3>
            <p className="text-[#7F8C9F] mb-8">
              Select the type of contract you want to create
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
              <button className="p-6 border-2 border-[#E5E7EB] rounded-lg hover:border-[#5E2A8C] transition-colors">
                <div className="text-4xl mb-2">📝</div>
                <h4 className="font-semibold text-[#17171C] mb-1">Freelance</h4>
                <p className="text-sm text-[#7F8C9F]">For independent contractors</p>
              </button>
              <button className="p-6 border-2 border-[#E5E7EB] rounded-lg hover:border-[#5E2A8C] transition-colors">
                <div className="text-4xl mb-2">💼</div>
                <h4 className="font-semibold text-[#17171C] mb-1">Full-time</h4>
                <p className="text-sm text-[#7F8C9F]">For permanent employees</p>
              </button>
              <button className="p-6 border-2 border-[#E5E7EB] rounded-lg hover:border-[#5E2A8C] transition-colors">
                <div className="text-4xl mb-2">⏱️</div>
                <h4 className="font-semibold text-[#17171C] mb-1">Part-time</h4>
                <p className="text-sm text-[#7F8C9F]">For part-time workers</p>
              </button>
            </div>
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