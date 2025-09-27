'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';
import Image from 'next/image';

// Form validation schema
const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters'),
  rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginPageProps {
  onLogin?: (data: LoginFormData) => void;
  onGoogleLogin?: () => void;
  onAppleLogin?: () => void;
  onForgotPassword?: () => void;
}

export default function LoginPage({
  onLogin,
  onGoogleLogin,
  onAppleLogin,
  onForgotPassword,
}: LoginPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      await onLogin?.(data);
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    onGoogleLogin?.();
  };

  const handleAppleLogin = () => {
    onAppleLogin?.();
  };

  const handleForgotPassword = () => {
    onForgotPassword?.();
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

          {/* Globe visualization placeholder */}
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
          Seamless payments, anywhere.
            <br />
          </h1>
          <p className="text-[16px] text-white">
          VestRoll lets you manage payroll and invoicing in crypto and fiat—quickly and securely.
          </p>
        </div>

        {/* Right Side - Form Section */}
        <div className="relative w-full flex-1 flex flex-col items-center sm:justify-between justify-center px-0 sm:px-4">
          <div className="h-[50px] sm:block hidden"></div>
          <div className="flex items-center justify-center w-full max-w-2xl">
            <div className="w-full">
              {/* Heading */}
              <div className="mb-8">
                <h2 className="text-2xl lg:text-[40px] font-bold text-[#17171C] mb-2">
                Welcome back!
                </h2>
                <p className="text-[#414F62] text-[16px]">
                Securely access your account and manage payroll with ease
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Email field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      {...register('email')}
                      type="email"
                      id="email"
                      className={`pl-10 pr-3 bg-[#F5F6F7] rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 ${
                        errors.email ? "border-red-300" : "border-gray-300"
                      }`}
                      placeholder="Enter your email address"
                      style={{
                        width: '440px',
                        height: '53px',
                        gap: '8px',
                        transform: 'rotate(0deg)',
                        opacity: 1,
                        borderRadius: '8px',
                        paddingTop: '18px',
                        paddingRight: '14px',
                        paddingBottom: '18px',
                        paddingLeft: '14px',
                        background: 'var(--Fill-Background, #F5F6F7)'
                      }}
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>

                {/* Password field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                      <input
                        {...register('password')}
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        className={`pr-12 bg-[#F8F9FA] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-400 ${
                          errors.password ? "border-red-300" : "border-[#E5E7EB]"
                        }`}
                        placeholder="Enter password"
                        style={{
                          width: '440px',
                          height: '53px',
                          gap: '8px',
                          transform: 'rotate(0deg)',
                          opacity: 1,
                          borderRadius: '8px',
                          paddingTop: '18px',
                          paddingRight: '40px',
                          paddingBottom: '18px',
                          paddingLeft: '14px'
                        }}
                      />
                    <div
                      className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </div>
                  </div>
                  {errors.password && (
                    <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>
                  )}
                </div>

                {/* Remember me and Forgot password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      {...register('rememberMe')}
                      id="rememberMe"
                      type="checkbox"
                      className="h-4 w-4 text-[#5E2A8C] focus:ring-[#5E2A8C] border-gray-300 rounded"
                    />
                    <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                      Remember me
                    </label>
                  </div>
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-sm text-[#5E2A8C] hover:text-purple-700 font-medium"
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Continue button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`font-semibold text-white transition-all duration-200 ${
                    !isLoading
                      ? "bg-[#5E2A8C] hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transform hover:scale-[1.02]"
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
                  style={{
                    width: '440px',
                    height: '56px',
                    gap: '8px',
                    transform: 'rotate(0deg)',
                    opacity: 1,
                    borderRadius: '12px',
                    padding: '16px' // Spacing-md equivalent
                  }}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                      Signing in...
                    </div>
                  ) : (
                    "Continue"
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="mt-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                  </div>
                </div>
              </div>

              {/* Social login buttons */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="w-full inline-flex justify-center items-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Google
                </button>

                <button
                  type="button"
                  onClick={handleAppleLogin}
                  className="w-full inline-flex justify-center items-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  Apple
                </button>
              </div>

              {/* Sign up link */}
              <div className="mt-8 text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <a href="#" className="font-medium text-[#5E2A8C] hover:text-purple-700">
                    Sign up for free
                  </a>
                </p>
              </div>
            </div>
          </div>
          {/* Footer */}
          <div className="w-full pt-6 text-center text-sm sm:block hidden">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
              <span className="text-[15px] text-[#7F8C9F]">
                © 2025, all rights reserved
              </span>
              <div className="flex space-x-4 text-[#17171C]">
                <a href="#" className="text-[16px]">
                  Privacy Policy
                </a>
                <span>•</span>
                <a href="#" className="text-[16px]">
                  Terms and condition
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
