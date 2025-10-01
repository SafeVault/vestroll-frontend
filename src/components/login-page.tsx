import React, { useState } from 'react';
import { Eye, EyeOff, Mail } from 'lucide-react';



interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface LoginFormErrors {
  email?: string;
  password?: string;
}

interface LoginPageProps {
  onLogin: (data: { email: string; password: string; rememberMe?: boolean }) => void;
  onGoogleLogin?: () => void;
  onAppleLogin?: () => void;
  onForgotPassword?: () => void;
}



export default function LoginPage({
  onLogin,
  onGoogleLogin,
  onAppleLogin,
  onForgotPassword
}: LoginPageProps) {

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false
  });
  
  const [errors, setErrors] = useState<LoginFormErrors>({});
  

  const validateForm = (): boolean => {
    const newErrors: LoginFormErrors = {};
  
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
  
    if (errors[name as keyof LoginFormErrors]) {
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
         <img src="/left.svg" alt="left image" className="bg-cover" />

         

        </div>

        {/* Right Side - Form Section */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
            <div className="w-full max-w-md lg:max-w-sm">
              <div className="mb-8">
                <h2 className="text-[#17171C] text-[28px] font-bold mb-2">
                  Welcome back!
                </h2>
                <p className="text-[#414F62] text-[12px] font-medium sm:text-base">
                  Securely access your account and manage payroll with ease
                </p>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-[#17171C] text-[12px] font-medium mb-2">
                    Email address <span className="text-red-500">*</span>
                  </label>
                  <div className="">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full pl-3 pr-3 py-3 sm:py-3.5 bg-[#F5F6F7] rounded-[8px] border ${
                        errors.email ? 'border-red-300' : 'border-gray-200'
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 text-sm sm:text-base`}
                      placeholder="Enter your email address"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-[#17171C] text-[12px] font-medium mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`w-full pr-12 pl-3 py-3 sm:py-3.5 bg-[#F5F6F7] rounded-[8px] border ${
                        errors.password ? 'border-red-300' : 'border-gray-200'
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 text-sm sm:text-base`}
                      placeholder="Enter password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                  )}
                </div>

                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center">
                    <input
                      id="rememberMe"
                      name="rememberMe"
                      type="checkbox"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                      className="h-4 w-4 text-[#5E2A8C] text-[12px] focus:ring-purple-500 border border-[#5E2A8C] rounded"
                    />
                    <label htmlFor="rememberMe" className="ml-2 block text-[12px] text-[#5E2A8C]">
                      Remember me
                    </label>
                  </div>
                  <button
                    type="button"
                    onClick={onForgotPassword}
                    className="text-[12px] text-[#5E2A8C] hover:text-purple-800 font-medium"
                  >
                    Forgot password?
                  </button>
                </div>

                <button
                  type="button"
                  disabled={isLoading}
                  onClick={handleSubmit}
                  className={`w-full py-3.5 sm:py-4 text-[16px] px-4 rounded-[12px] font-semibold text-white text-sm sm:text-base transition-all duration-200 ${
                    !isLoading
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
              </div>

              <div className="mt-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-[#414F62] text-[12px] font-medium">OR</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="w-full flex flex-row gap-2 items-center justify-center inline-flex justify-center items-center py-2.5 sm:py-3 px-2 sm:px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
                ><span className='text-[#17171C] text-[12px] font-medium'>Login with</span>
                  <svg className="w-5 h-5 mr-1 sm:mr-2 flex-shrink-0" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                </button>

                <button
                  type="button"
                  className="w-full flex flex-row gap-2 items-center justify-center items-center py-2.5 sm:py-3 px-2 sm:px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
                >
                  <span className='text-[#17171C] text-[12px] font-medium'>Login with</span>
                  <svg className="w-5 h-5 mr-1 sm:mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                </button>
              </div>

              <div className="mt-8 text-center">
                <p className="text-[12px] flex flex-row gap-2 justify-center items-center sm:text-sm text-gray-600">
                 New to VestRoll?
                  <a href="#" className="font-medium text-purple-700 hover:text-purple-800">
                   Create Account
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6 border-t border-gray-200">
            <div className="max-w-md mx-auto lg:max-w-none">
              <div className="flex hidden lg:flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0 text-xs sm:text-sm">
                <span className="text-[#414F62] text-[12px] font-medium">© 2025, all rights reserved</span>
                <div className="flex items-center space-x-2 sm:space-x-3 text-gray-700">
                  <a href="#" className="hover:text-[#5E2A8C] transition-colors">Privacy Policy</a>
                  <span className="text-[#414F62] text-[12px] font-medium">•</span>
                  <a href="#" className="hover:text-[#5E2A8C] transition-colors">Terms and condition</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}