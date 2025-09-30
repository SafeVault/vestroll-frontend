import React, { useState } from 'react';
import { Eye, EyeOff, Mail } from 'lucide-react';

interface ForgotPasswordPageProps {
  onBackToLogin: () => void;
}

interface FormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface FormErrors {
  email?: string;
  password?: string;
}
interface ForgotPasswordPageProps {
    onBackToLogin: () => void;
    onForgotPassword: () => void;
  }

export default function ForgotPasswordPage({
    onBackToLogin,
    onForgotPassword
  }: ForgotPasswordPageProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setTimeout(() => {
      console.log('Login:', formData);
      setIsLoading(false);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="flex flex-col lg:flex-row">

        <div className='lg:hidden flex items-center justify-start my-4 mx-4'>
          <img src="/mobilelogo.png.png" alt='' className='w-10 h-10 -scale-y-100' />
        </div>

        {/* Left Side - Hero Section (Desktop Only) */}
        <div className="hidden lg:flex lg:w-1/2 bg-white text-white p-4 lg:p-8 flex-col justify-center relative overflow-hidden h-full w-full">
          <div className=''>
            <img src="/left.svg" alt="left image" className="object-cover" />
          </div>
        </div>

        {/* Right Side - Form Section */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
            <div className="w-full max-w-md lg:max-w-md">
              <div className="mb-8">
                <h2 className="text-[#17171C] text-[40px] font-bold mb-2">
                  Forgot Your Password
                </h2>
                <p className="text-[#414F62] text-[16px] font-medium sm:text-base">
                  Provide the email address linked to your VestRoll account to reset your password and login
                </p>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-[#17171C] text-[12px] font-medium mb-2">
                    Email address <span className="text-red-500">*</span>
                  </label>
                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full pl-3 pr-3 py-3 text-[14px] text-[#BDC5D1] sm:py-3.5 bg-[#F5F6F7] rounded-[8px] border ${errors.email ? 'border-red-300' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 text-sm sm:text-base`}
                      placeholder="Provide email address"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                <button
                  type="button"
                  disabled={isLoading}
                  onClick={handleSubmit}
                  className={`w-full py-3.5 sm:py-4 text-[16px] px-4 rounded-[12px] font-semibold text-white text-sm sm:text-base transition-all duration-200 ${!isLoading
                    ? 'bg-[#5E2A8C] hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transform hover:scale-[1.02] active:scale-[0.98]'
                    : 'bg-gray-300 cursor-not-allowed'
                    }`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                      Signing in...
                    </div>
                  ) : (
                    'Continue'
                  )}
                </button>

                <div className='flex justify-center items-center'>
                  <button
                    type="button"
                    disabled={isLoading}
                    onClick={onBackToLogin}
                    className='text-[#5E2A8C]'
                  >
                    Back to Login
                  </button>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
