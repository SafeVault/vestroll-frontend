'use client'

import React, { useState, useRef, useEffect } from 'react';
import { AlertCircle, Check } from 'lucide-react';

export default function OTPVerification() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  // Function to set ref
  const setInputRef = (el: HTMLInputElement | null, index: number) => {
    inputRefs.current[index] = el;
  };

  useEffect(() => {
    // Auto-focus first input on mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index: number, value: string) => {
    // Only allow numeric input
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    // Auto-advance to next field
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    // Handle arrow keys
    if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();

    // Only process if it's 6 digits
    if (/^\d{6}$/.test(pastedData)) {
      const newOtp = pastedData.split('');
      setOtp(newOtp);
      setError('');
      // Focus last input
      inputRefs.current[5]?.focus();
    }
  };

  const validateOTP = () => {
    const otpString = otp.join('');

    if (otpString.length !== 6) {
      setError('Please enter all 6 digits');
      return false;
    }

    if (!/^\d{6}$/.test(otpString)) {
      setError('OTP must contain only numbers');
      return false;
    }

    return true;
  };

  const handleVerify = async () => {
    if (!validateOTP()) return;

    setIsVerifying(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      const otpString = otp.join('');

      // Simulate validation (in real app, this would be API call)
      if (otpString === '123456') {
        setSuccess(true);
        setTimeout(() => {
          alert('2FA setup complete!');
        }, 1000);
      } else {
        setError('Invalid code. Please check your authenticator app and try again.');
        setOtp(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      }

      setIsVerifying(false);
    }, 1500);
  };

  const handleGoBack = () => {
    // In real app, this would navigate to previous step
    alert('Going back to previous step...');
  };

  const isComplete = otp.every(digit => digit !== '');

  return (
    <div className="min-h-screen ">
      {/* Header */}
      <div className="mb-8 p-4 border-b">
        <button
          onClick={handleGoBack}
          className="text-gray-400 text-sm mb-4 hover:text-gray-600 transition-colors"
        >
          ← Back
        </button>
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Edit profile
        </h1>
      </div>
      <div className='bg-gray-50 flex items-center justify-center p-4'>
        <div className="w-full max-w-md bg-white rounded-lg shadow-sm p-6 md:p-8">

          {/* Verify Code Section */}
          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
              Verify code
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Enter the 6-digit code shown in your authenticator app
            </p>

            {/* OTP Label */}
            <label className="block text-sm font-medium text-gray-700 mb-3">
              OTP
            </label>

            {/* OTP Input Fields */}
            <div className="flex gap-2 mb-6">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => setInputRef(el, index)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit ? '*' : ''}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  className={`w-full h-12 text-center text-black text-lg font-semibold border rounded-lg focus:outline-none focus:ring-2 transition-all ${error
                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                    : success
                      ? 'border-green-300 focus:ring-green-500 focus:border-green-500'
                      : 'border-gray-300 focus:ring-purple-900 focus:border-purple-500'
                    }`}
                  disabled={isVerifying || success}
                />
              ))}
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-start gap-2 mb-4 text-red-600 text-sm">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="flex items-start gap-2 mb-4 text-green-600 text-sm">
                <Check className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Code verified successfully!</span>
              </div>
            )}

            {/* Verify Button */}
            <button
              onClick={handleVerify}
              disabled={!isComplete || isVerifying || success}
              className={`w-full h-12 rounded-lg font-medium transition-all ${isComplete && !isVerifying && !success
                ? 'bg-purple-900 hover:bg-purple-900 text-white'
                : 'bg-gray-400 text-white cursor-not-allowed'
                }`}
            >
              {isVerifying ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Verifying...
                </span>
              ) : success ? (
                'Verified ✓'
              ) : (
                'Verify'
              )}
            </button>

            {/* Go Back Link */}
            <button
              onClick={handleGoBack}
              className="w-full mt-4 text-lg text-purple-900 hover:text-purple-900 transition-colors"
              disabled={isVerifying}
            >
              Go back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}