"use client";

import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import InputField from "@/components/InputField";

interface FormData {
  name: string;
  email: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

const EditProfileForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "Peter",
    email: "mailpete07@gmail.com",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};

    if (formData.name.length < 2)
      newErrors.name = "Name must be at least 2 characters";
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email address";

    if (
      formData.currentPassword ||
      formData.newPassword ||
      formData.confirmPassword
    ) {
      if (!formData.currentPassword)
        newErrors.currentPassword = "Current password is required";
      if (!formData.newPassword)
        newErrors.newPassword = "New password is required";
      if (!formData.confirmPassword)
        newErrors.confirmPassword = "Confirm password is required";

      if (formData.newPassword && formData.newPassword.length < 8)
        newErrors.newPassword = "New password must be at least 8 characters";

      if (
        formData.newPassword &&
        formData.confirmPassword &&
        formData.newPassword !== formData.confirmPassword
      )
        newErrors.confirmPassword = "Passwords don't match";
    }

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        console.log("Form submitted:", formData);
      }, 2000);
    } else {
      setErrors(formErrors);
    }
  };

  const onBack = () => console.log("Going back...");

  const passwordFields: Array<{
    id: keyof FormData;
    label: string;
    placeholder: string;
  }> = [
    {
      id: "currentPassword",
      label: "Current password",
      placeholder: "Enter current password",
    },
    {
      id: "newPassword",
      label: "New password",
      placeholder: "Enter new password",
    },
    {
      id: "confirmPassword",
      label: "Confirm new password",
      placeholder: "Confirm new password",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white border-b border-gray-200 px-4 py-4 md:px-6">
        <div>
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="text-sm font-medium">Back</span>
          </button>
        </div>
        <h1 className="text-2xl font-semibold text-gray-900">Edit profile</h1>
      </div>

      <div className="flex justify-center pt-8 px-4">
        <div className="w-full max-w-md">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg shadow-sm p-6 space-y-5 mb-3"
          >
            <InputField
              id="name"
              label="Name"
              value={formData.name}
              onChange={handleInputChange}
              error={errors.name}
              placeholder="Enter your name"
            />

            <InputField
              id="email"
              type="email"
              label="Email"
              value={formData.email}
              onChange={handleInputChange}
              error={errors.email}
              placeholder="Enter your email"
            />

            <div className="pt-2">
              <h3 className="text-base font-bold text-[#17171C] mb-4">
                Change your password
              </h3>
              <div className="space-y-4">
                {passwordFields.map((field) => (
                  <InputField
                    key={field.id}
                    id={field.id}
                    type="password"
                    label={field.label}
                    placeholder={field.placeholder}
                    value={formData[field.id]}
                    onChange={handleInputChange}
                    error={errors[field.id]}
                  />
                ))}
              </div>
            </div>

            <div className="pt-6">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#5E2A8C] text-white py-3 px-4 rounded-[12px] font-medium hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Saving changes...
                  </div>
                ) : (
                  "Save changes"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfileForm;
