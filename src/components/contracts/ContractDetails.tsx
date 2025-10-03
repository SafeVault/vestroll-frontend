"use client";

import { useState, useMemo } from "react";
import { Upload, X } from "lucide-react";
import InputField from "@/components/InputField";
import Dropdown from "@/components/ui/dropdown";
import { z } from "zod";

interface ContractFormData {
  // Contact details
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientAddress: string;
  startDate: string;
  endDate: string;
  terminationNotice: string;

  // Payment details
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

  // Contract wallet
  walletAddress: string;
  walletType: string;

  // End Period
  contractDuration: string;
  renewalTerms: string;

  // Milestone/Deliverable
  milestones: Array<{
    id: string;
    title: string;
    description: string;
    dueDate: string;
    amount: string;
  }>;

  // Tax details
  taxType: string;
  taxId: string;
  taxRate: string;

  // Files
  uploadedFiles: File[];
}

interface FormErrors {
  [key: string]: string;
}

interface ContractDetailsProps {
  formData: ContractFormData;
  onFormDataChange: (data: ContractFormData) => void;
  errors: FormErrors;
  onErrorsChange: (errors: FormErrors) => void;
  onNext: () => void;
  onPrev: () => void;
}

const networks = [
  { label: "Ethereum", icon: "/icons/eth.svg" },
  { label: "Polygon", icon: "/icons/eth.svg" },
  { label: "BSC", icon: "/icons/eth.svg" },
  { label: "Arbitrum", icon: "/icons/eth.svg" },
];
const assets = [
  { label: "USDT", icon: "/icons/usdt.svg" },
  { label: "USDC", icon: "/icons/usdt.svg" },
  { label: "ETH", icon: "/icons/eth.svg" },
  { label: "DAI", icon: "/icons/usdt.svg" },
];
const invoiceFrequencies = ["Weekly", "Bi-weekly", "Monthly", "Quarterly"];
const paymentDueOptions = ["Net 15", "Net 30", "Net 45", "Due on receipt"];

// Zod schema for validation
const milestoneSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  dueDate: z.string().min(1, "Due date is required"),
  amount: z
    .string()
    .min(1, "Amount is required")
    .refine(
      (val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0,
      "Amount must be greater than 0"
    ),
});

const contractSchema = z.object({
  // Contact details
  clientName: z.string().min(1, "Client name is required"),
  clientEmail: z.string().email("Invalid email address"),
  clientPhone: z.string().optional(),
  clientAddress: z.string().optional(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  terminationNotice: z.string().optional(),

  // Payment details
  network: z.string().min(1, "Network is required"),
  asset: z.string().min(1, "Asset is required"),
  amount: z
    .string()
    .min(1, "Amount is required")
    .refine(
      (val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0,
      "Amount must be greater than 0"
    ),
  calculatedAmount: z.string().optional(),
  invoiceFrequency: z.string().min(1, "Invoice frequency is required"),
  issueInvoiceOn: z.string().optional(),
  paymentDue: z.string().min(1, "Payment due is required"),
  firstInvoiceType: z.enum(["full", "custom"]),
  firstInvoiceDate: z.string().optional(),
  firstInvoiceAmount: z.string().optional(),

  // Contract wallet
  walletAddress: z.string().min(1, "Wallet address is required"),
  walletType: z.string().optional(),

  // End Period
  contractDuration: z.string().optional(),
  renewalTerms: z.string().optional(),

  // Milestone/Deliverable
  milestones: z.array(milestoneSchema).optional(),

  // Tax details
  taxType: z.string().optional(),
  taxId: z.string().optional(),
  taxRate: z.string().optional(),

  // Files
  uploadedFiles: z.array(z.any()).optional(),
});

export default function ContractDetails({
  formData,
  onFormDataChange,
  errors,
  onErrorsChange,
  onNext,
  onPrev,
}: ContractDetailsProps) {
  const [dragOver, setDragOver] = useState(false);

  const validateForm = (): boolean => {
    try {
      contractSchema.parse(formData);
      onErrorsChange({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: FormErrors = {};
        error.issues.forEach((err: z.ZodIssue) => {
          if (err.path.length > 0) {
            const fieldName = err.path.join(".");
            newErrors[fieldName] = err.message;
          }
        });
        onErrorsChange(newErrors);
      }
      return false;
    }
  };

  const isValid = useMemo(() => {
    try {
      contractSchema.parse(formData);
      return true;
    } catch {
      return false;
    }
  }, [formData]);

  const handleInputChange = (field: keyof ContractFormData, value: string) => {
    onFormDataChange({ ...formData, [field]: value });
    // Clear error when user starts typing
    if (errors[field]) {
      onErrorsChange({ ...errors, [field]: "" });
    }
  };


  const addMilestone = () => {
    const newMilestone = {
      id: Date.now().toString(),
      title: "",
      description: "",
      dueDate: "",
      amount: "",
    };
    onFormDataChange({
      ...formData,
      milestones: [...formData.milestones, newMilestone],
    });
  };

  const removeMilestone = (id: string) => {
    onFormDataChange({
      ...formData,
      milestones: formData.milestones.filter((m) => m.id !== id),
    });
  };

  const updateMilestone = (id: string, field: string, value: string) => {
    onFormDataChange({
      ...formData,
      milestones: formData.milestones.map((m) =>
        m.id === id ? { ...m, [field]: value } : m
      ),
    });

    // Clear error in a separate effect to avoid stale closure
    const milestoneIndex = formData.milestones.findIndex((m) => m.id === id);
    const milestoneErrorKey = `milestones.${milestoneIndex}.${field}`;
    if (errors[milestoneErrorKey]) {
      onErrorsChange({ ...errors, [milestoneErrorKey]: "" });
    }
  };

  const handleFileUpload = (files: FileList | null) => {
    if (files) {
      const newFiles = Array.from(files);
      onFormDataChange({
        ...formData,
        uploadedFiles: [...formData.uploadedFiles, ...newFiles],
      });
    }
  };

  const removeFile = (index: number) => {
    onFormDataChange({
      ...formData,
      uploadedFiles: formData.uploadedFiles.filter((_, i) => i !== index),
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext();
    }
  };


  const DatePicker = ({
    label,
    value,
    onChange,
    error,
  }: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    error?: string;
  }) => (
    <div className="">
      <label className="block text-sm font-medium text-[#414F62] mb-2">
        {label}
      </label>
      <div className="relative bg[#F5F6F7]">
        <input
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-[#414F62] bg-[#F5F6F7] ${
            error ? "border-red-300" : "border-gray-300"
          }`}
        />
        <svg
          width="16"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#414F62]"
          height="17"
          viewBox="0 0 16 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.33203 1.83301V3.83301"
            stroke="#7F8C9F"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10.668 1.83301V3.83301"
            stroke="#7F8C9F"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2.33203 6.55957H13.6654"
            stroke="#7F8C9F"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14 6.16634V11.833C14 13.833 13 15.1663 10.6667 15.1663H5.33333C3 15.1663 2 13.833 2 11.833V6.16634C2 4.16634 3 2.83301 5.33333 2.83301H10.6667C13 2.83301 14 4.16634 14 6.16634Z"
            stroke="#7F8C9F"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7.99764 9.63314H8.00363"
            stroke="#7F8C9F"
            strokeWidth="1.33333"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5.52889 9.63314H5.53488"
            stroke="#7F8C9F"
            strokeWidth="1.33333"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5.52889 11.6331H5.53488"
            stroke="#7F8C9F"
            strokeWidth="1.33333"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );

  const FileUpload = () => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Contract Documents
      </label>
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragOver ? "border-purple-400 bg-purple-50" : "border-gray-300"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Upload className="mx-auto text-gray-400 mb-2" size={24} />
        <p className="text-gray-600 mb-2">
          Drag and drop files here, or click to select
        </p>
        <p className="text-sm text-gray-400">PDF, DOC, DOCX up to 10MB</p>
        <input
          type="file"
          multiple
          accept=".pdf,.doc,.docx"
          onChange={(e) => handleFileUpload(e.target.files)}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="mt-2 inline-block px-4 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 cursor-pointer"
        >
          Choose Files
        </label>
      </div>
      {formData.uploadedFiles.length > 0 && (
        <div className="mt-4 space-y-2">
          {formData.uploadedFiles.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 bg-gray-50 rounded"
            >
              <span className="text-sm text-gray-700">{file.name}</span>
              <button
                onClick={() => removeFile(index)}
                className="text-red-500 hover:text-red-700"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Contract Details */}
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DatePicker
            label="End date (optional)"
            value={formData.endDate}
            onChange={(value) => handleInputChange("endDate", value)}
            error={errors.endDate}
          />
          <DatePicker
            label="Start date"
            value={formData.startDate}
            onChange={(value) => handleInputChange("startDate", value)}
            error={errors.startDate}
          />
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <InputField
              id="terminationNotice"
              label="Termination notice period (days)"
              value={formData.terminationNotice}
              onChange={(e) =>
                handleInputChange("terminationNotice", e.target.value)
              }
              error={errors.terminationNotice}
            />
            <p className="text-xs mt-1 text-[#414F62]">
              Either party may terminate this contract by the specified notice,
              after which the contract will end.
            </p>
          </div>
        </div>
      </div>

      {/* Payment Details */}
      <div>
        <div className="flex items-center mb-4 gap-x-4">
          <h3 className="text-lg font-medium text-gray-700 min-w-fit ">
            Payment details
          </h3>
          <div className="h-px bg-[#DCE0E5] w-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Dropdown
            label="Network"
            value={formData.network}
            options={networks}
            onChange={(value) => handleInputChange("network", value)}
            error={errors.network}
          />
          <div className="flex items-end gap-x-2 w-full relative">
            <Dropdown
              label="Asset"
              value={formData.asset}
              options={assets}
              onChange={(value) => handleInputChange("asset", value)}
              error={errors.asset}
            />
            <div className="w-full relative">
              <div className="">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#414F62]">
                  $
                </span>
                <input
                  type="number"
                  step="0.01"
                  value={formData.amount}
                  onChange={(e) => handleInputChange("amount", e.target.value)}
                  className={`w-full pl-8 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-[#414F62] bg-[#F5F6F7] ${
                    errors.amount ? "border-red-300" : "border-gray-300"
                  }`}
                  placeholder="0.00"
                />
              </div>
              {errors.amount && (
                <p className="text-red-500 text-sm mt-2">{errors.amount}</p>
              )}
            </div>
            <p className="text-sm text-[#414F62] absolute top-0 right-2">
              = <span className="font-medium">{formData.calculatedAmount}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Invoice Details */}
      <div>
        <div className="flex items-center mb-4 gap-x-4">
          <h3 className="text-lg font-medium text-gray-700 min-w-fit ">
            Invoice details
          </h3>
          <div className="h-px bg-[#DCE0E5] w-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Dropdown
            label="Invoice frequency"
            value={formData.invoiceFrequency}
            options={invoiceFrequencies}
            onChange={(value) => handleInputChange("invoiceFrequency", value)}
            error={errors.invoiceFrequency}
          />
          <Dropdown
            label="Issue Invoice on"
            value={formData.issueInvoiceOn}
            options={[
              "1st of month",
              "15th of month",
              "Last day of month",
              "Custom",
            ]}
            onChange={(value) => handleInputChange("issueInvoiceOn", value)}
            error={errors.issueInvoiceOn}
          />
          <Dropdown
            label="Payment due"
            value={formData.paymentDue}
            options={paymentDueOptions}
            onChange={(value) => handleInputChange("paymentDue", value)}
            error={errors.paymentDue}
          />
        </div>
      </div>

      {/* First Invoice */}
      <div>
        <div className="flex items-center mb-4 gap-x-4">
          <h3 className="text-lg font-medium text-gray-700 min-w-fit ">
            First Invoice
          </h3>
          <div className="h-px bg-[#DCE0E5] w-full"></div>
        </div>
        <div className="space-y-4">
          <div className="flex space-x-8">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="firstInvoiceType"
                value="full"
                checked={formData.firstInvoiceType === "full"}
                onChange={(e) =>
                  handleInputChange("firstInvoiceType", e.target.value)
                }
                className="sr-only"
              />
              <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${
                formData.firstInvoiceType === "full" 
                  ? "border-purple-600 bg-purple-600" 
                  : "border-gray-300 bg-white"
              }`}>
                {formData.firstInvoiceType === "full" && (
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                )}
              </div>
              <span className="text-sm font-medium text-gray-900">Full amount</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="firstInvoiceType"
                value="custom"
                checked={formData.firstInvoiceType === "custom"}
                onChange={(e) =>
                  handleInputChange("firstInvoiceType", e.target.value)
                }
                className="sr-only"
              />
              <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${
                formData.firstInvoiceType === "custom" 
                  ? "border-purple-600 bg-purple-600" 
                  : "border-gray-300 bg-white"
              }`}>
                {formData.firstInvoiceType === "custom" && (
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                )}
              </div>
              <span className="text-sm font-medium text-gray-900">Custom amount</span>
            </label>
          </div>
          <p className="text-sm text-gray-600">
            You would receive the full monthly amount for your first payment.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DatePicker
              label="Date"
              value={formData.firstInvoiceDate}
              onChange={(value) => handleInputChange("firstInvoiceDate", value)}
              error={errors.firstInvoiceDate}
            />
            <InputField
              id="firstInvoiceAmount"
              label="Amount"
              placeholder="Enter amount"
              value={formData.firstInvoiceAmount}
              onChange={(e) =>
                handleInputChange("firstInvoiceAmount", e.target.value)
              }
              error={errors.firstInvoiceAmount}
            />
          </div>
        </div>
      </div>

      {/* Add inclusive tax (optional) */}
      <div>
        <div className="flex items-center mb-4 gap-x-4">
          <h3 className="text-lg font-medium text-gray-700 min-w-fit ">
            Add inclusive tax (optional)
          </h3>
          <div className="h-px bg-[#DCE0E5] w-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Dropdown
            label="Tax type"
            value={formData.taxType}
            options={["VAT", "GST", "HST", "PST", "Sales Tax"]}
            onChange={(value) => handleInputChange("taxType", value)}
            error={errors.taxType}
            placeholder="e.g VAT, GST, HST, PST"
          />
          <Dropdown
            label="ID / account number"
            value={formData.taxId}
            options={[]}
            onChange={(value) => handleInputChange("taxId", value)}
            error={errors.taxId}
          />
          <Dropdown
            label="Tax rate"
            value={formData.taxRate}
            options={[]}
            onChange={(value) => handleInputChange("taxRate", value)}
            error={errors.taxRate}
          />
        </div>
      </div>

    </div>
  );
}
