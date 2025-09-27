"use client";

import { useState } from "react";
import { Logo } from "@/components/email-verification/Logo";
import { OTPInput } from "@/components/email-verification/OTPInput";
import { ContinueButton } from "@/components/email-verification/ContinueButton";
import { ResendCodeButton } from "@/components/email-verification/ResendCodeButton";
import { HelperLink } from "@/components/email-verification/HelperLink";
import { FooterLinks } from "@/components/email-verification/FooterLinks";
import Image from "next/image";

// Utility function for email masking
const maskEmail = (email: string): string => {
  if (!email || !email.includes('@')) return email;
  const [username, domain] = email.split('@');
  if (username.length <= 2) return email;
  const maskedUsername = username.substring(0, 2) + '***';
  return `${maskedUsername}@${domain}`;
};

interface EmailVerificationPageProps {
  userEmail?: string;
}

export default function EmailVerificationPage({ 
  userEmail = "blessed@gmail.com" 
}: EmailVerificationPageProps) {
  const maskedEmail = maskEmail(userEmail);
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleOtpChange = (newOtp: string[]) => {
    setOtp(newOtp);
    setError(null); // Clear error when user types
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join("");
    
    if (code.length !== 6) {
      setError("Please enter all 6 digits");
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log("Verification code:", code);
      // Handle success - redirect or show success message
    } catch (err) {
      setError("Invalid code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      setIsLoading(true);
      // Simulate resend API call
      await new Promise(resolve => setTimeout(resolve, 500));
      console.log("Code resent to:", userEmail);
      setOtp(Array(6).fill(""));
      setError(null);
    } catch (err) {
      setError("Failed to resend code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleHelperClick = () => {
    // Handle help action - show modal, redirect to help, etc.
    console.log("Help requested");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile Header */}
      <div className="lg:hidden">
        <div className="flex justify-start pt-6 pb-4 px-4">
          <Logo isMobile />
        </div>
      </div>

      <div className="flex min-h-screen">
        {/* Desktop Left Panel */}
        <div className="hidden lg:flex lg:w-1/2">
          <div className="flex flex-col justify-between bg-purple-800 text-white w-full p-8 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-20 left-10 w-32 h-32 border border-white/20 rounded-full"></div>
              <div className="absolute top-40 right-20 w-24 h-24 border border-white/20 rounded-full"></div>
              <div className="absolute bottom-40 left-20 w-20 h-20 border border-white/20 rounded-full"></div>
            </div>
            
            <div className="relative z-10">
              <Logo />
              
              <div className="mt-12 flex justify-center">
                <div className="relative">
                  <Image
                    src="/assets/globe-illustration.png"
                    alt="Global Payments Illustration"
                    width={350}
                    height={350}
                    className="relative z-10"
                  />
                </div>
              </div>
              
              <div className="mt-8">
                <h1 className="text-3xl font-bold leading-tight">
                  Seamless Payments,<br />Anywhere.
                </h1>
                <p className="mt-3 text-sm opacity-90 leading-relaxed">
                  Experience Fast, Secure Crypto & Fiat Payroll & Invoicing with VestRoll
                </p>
              </div>
            </div>
            
            <footer className="text-xs opacity-70 relative z-10">
              © 2025, all rights reserved
            </footer>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col justify-center items-center w-full lg:w-1/2 px-4 py-8 lg:py-12">
          <div className="w-full max-w-md">
            <form onSubmit={handleSubmit} className="text-center space-y-6">
              {/* Header */}
              <div className="space-y-2">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                  Provide 6-digit code
                </h2>
                <p className="text-sm lg:text-base text-gray-600 leading-relaxed px-2">
                  Please enter the authentication code sent to your email account{" "}
                  <span className="font-semibold text-gray-900">{maskedEmail}</span>
                </p>
              </div>

              {/* OTP Input */}
              <div className="py-2">
                <OTPInput
                  value={otp}
                  onChange={handleOtpChange}
                  disabled={isLoading}
                  error={error}
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="text-sm text-red-600 bg-red-50 p-2 rounded-lg">
                  {error}
                </div>
              )}

              {/* Resend Code */}
              <div>
                <ResendCodeButton
                  onClick={handleResend}
                  disabled={isLoading}
                />
              </div>

              {/* Continue Button */}
              <ContinueButton
                disabled={otp.join("").length < 6 || isLoading}
                loading={isLoading}
              />

              {/* Help Link */}
              <div>
                <HelperLink onClick={handleHelperClick} />
              </div>
            </form>

            {/* Footer Links */}
            <div className="mt-8 lg:mt-12">
              <FooterLinks />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}