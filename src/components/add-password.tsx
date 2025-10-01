"use client";
import React, { useState, useMemo } from "react";
import { Eye, EyeOff, Check } from "lucide-react";
import Image from "next/image";

interface PasswordRequirements {
  minLength: boolean;
  hasUppercase: boolean;
  hasNumber: boolean;
  hasSpecial: boolean;
}

interface RequirementItemProps {
  met: boolean;
  text: string;
}

interface VestRollPasswordPageProps {
  currentStep?: number;
  totalSteps?: number;
  onNext?: (data: { password: string }) => void;
  onBack?: () => void;
}

const RequirementItem: React.FC<RequirementItemProps> = ({ met, text }) => {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
          met ? "bg-[#5E2A8C]" : "bg-white border-2 border-gray-300"
        }`}
      >
        {met && <Check size={14} className="text-white" />}
      </div>
      <span className={`text-sm ${met ? "text-gray-900" : "text-gray-500"}`}>
        {text}
      </span>
    </div>
  );
};

export default function VestRollPasswordPage({
  currentStep = 2,
  totalSteps = 5,
  onNext,
  onBack,
}: VestRollPasswordPageProps) {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const requirements = useMemo<PasswordRequirements>(() => {
    return {
      minLength: password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecial: /[!@#$%^&*]/.test(password),
    };
  }, [password]);

  const allRequirementsMet = Object.values(requirements).every(Boolean);
  const passwordsMatch =
    password === confirmPassword && confirmPassword.length > 0;
  const canSubmit = allRequirementsMet && passwordsMatch;

  const handleSubmit = (): void => {
    if (canSubmit) {
      console.log("Password created successfully!");
      if (onNext) {
        onNext({ password });
      } else {
        alert("Password created successfully!");
      }
    }
  };

  return (
    <div className="w-full bg-white p-4">
      {/* Mobile Logo */}
      <div className="lg:hidden">
        <Image src="/Vector.svg" alt="Globe icon" width={40} height={40} />
      </div>

      <div className="flex h-full">
        {/* Left Side - Hero Section (Desktop Only) */}
        <div className="hidden lg:flex lg:w-1/2 bg-[#5E2A8C] text-white p-8 lg:p-12 flex-col justify-center relative overflow-hidden rounded-xl">
          {/* Logo */}
          <div className="absolute top-8 left-8">
            <div className="bg-white bg-opacity-20 backdrop-blur-sm text-red-500 px-4 py-2 rounded-lg text-lg font-bold">
              <Image src="/Logo.svg" alt="Globe icon" width={174} height={56} />
            </div>
          </div>

          {/* Globe visualization */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <Image
                src="/Frame 2147223744.svg"
                alt="Globe icon"
                width={494.22}
                height={497.03}
              />
            </div>
          </div>

          <h1 className="text-4xl lg:text-[76px] font-extrabold mb-4 leading-tight">
            Seamless Payments,
            <br />
            Anywhere.
          </h1>
          <p className="text-[16px] text-white">
            Experience Fast, Secure Crypto & Fiat Payroll & Invoicing with
            VestRoll
          </p>
        </div>

        {/* Right Side - Form Section */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <div className="flex-1 flex flex-col p-8 lg:p-12">
            {/* Progress Indicator */}
            <div className="flex gap-2 mb-8">
              {Array.from({ length: totalSteps }).map((_, index) => (
                <div
                  key={index}
                  className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                    index < currentStep
                      ? "bg-[#5E2A8C]"
                      : index === currentStep
                        ? "bg-[#5E2A8C]"
                        : "bg-gray-200"
                  }`}
                ></div>
              ))}
            </div>

            {/* Form */}
            <div className="flex-1 flex flex-col">
              <div className="mb-8">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                  Add a password
                </h2>
                <p className="text-gray-600">
                  Create a secure password to access your VestRoll account for
                  subsequent login
                </p>
              </div>

              <div className="space-y-6 flex-1">
                {/* New Password Field */}
                <div>
                  <label
                    htmlFor="new-password"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    New password
                  </label>
                  <div className="relative">
                    <input
                      id="new-password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      className="w-full px-4 py-4 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5E2A8C] text-gray-900"
                      aria-describedby="password-requirements"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password Field */}
                <div>
                  <label
                    htmlFor="confirm-password"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Confirm password
                  </label>
                  <div className="relative">
                    <input
                      id="confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm password"
                      className="w-full px-4 py-4 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5E2A8C] text-gray-900"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      aria-label={
                        showConfirmPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Password Requirements */}
                <div
                  id="password-requirements"
                  className="space-y-3 pt-2"
                  role="list"
                >
                  <RequirementItem
                    met={requirements.minLength}
                    text="Minimum of 8 characters"
                  />
                  <RequirementItem
                    met={requirements.hasUppercase}
                    text="At least one uppercase letter (A-Z)"
                  />
                  <RequirementItem
                    met={requirements.hasNumber}
                    text="At least one number (0-9)"
                  />
                  <RequirementItem
                    met={requirements.hasSpecial}
                    text="At least one special character (!@#$%^&*)"
                  />
                </div>

                {/* Navigation Buttons */}
                <div className="flex gap-4">
                  {onBack && currentStep > 0 && (
                    <button
                      onClick={onBack}
                      className="w-1/3 py-4 rounded-xl font-semibold text-[#5E2A8C] border-2 border-[#5E2A8C] hover:bg-gray-50 transition-all"
                    >
                      Back
                    </button>
                  )}
                  <button
                    onClick={handleSubmit}
                    disabled={!canSubmit}
                    className={`${onBack && currentStep > 0 ? "w-2/3" : "w-full"} py-4 rounded-xl font-semibold text-white transition-all ${
                      canSubmit
                        ? "bg-[#5E2A8C] shadow-lg hover:shadow-xl hover:bg-[#4d2270] cursor-pointer"
                        : "bg-gray-300 cursor-not-allowed"
                    }`}
                    aria-label="Create password"
                  >
                    Create password
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-8 text-center text-sm hidden sm:block">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
            <span className="text-gray-500">© 2025, all rights reserved</span>
            <div className="flex space-x-4 text-gray-700">
              <a href="#" className="hover:text-[#5E2A8C]">
                Privacy Policy
              </a>
              <span>•</span>
              <a href="#" className="hover:text-[#5E2A8C]">
                Terms and condition
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
