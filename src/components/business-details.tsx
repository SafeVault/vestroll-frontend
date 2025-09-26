"use client";
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';

// Type definitions
interface FormData {
  companyName: string;
  companySize: string;
  companyIndustry: string;
  headquarterCountry: string;
  businessDescription: string;
}

interface FormErrors {
  companyName?: string;
  companySize?: string;
  companyIndustry?: string;
  headquarterCountry?: string;
  businessDescription?: string;
}

interface DropdownProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder: string;
  error?: string;
  required?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  value,
  onChange,
  options,
  placeholder,
  error,
  required = false
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full px-4 py-3 text-left bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 ${
            error ? 'border-red-300' : 'border-gray-300'
          } ${value ? 'text-gray-900' : 'text-gray-400'}`}
        >
          {value || placeholder}
          <ChevronDown className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {options.map((option, index) => (
              <button
                key={index}
                type="button"
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className="w-full px-4 py-3 text-left hover:bg-purple-50 focus:bg-purple-50 focus:outline-none transition-colors duration-150"
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

const BusinessRegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    companySize: '',
    companyIndustry: '',
    headquarterCountry: '',
    businessDescription: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const companySizes = [
    '1-10 employees',
    '11-50 employees',
    '51-200 employees',
    '201-500 employees',
    '501-1000 employees',
    '1000+ employees'
  ];

  const industries = [
    'Technology',
    'Finance',
    'Healthcare',
    'Education',
    'Retail',
    'Manufacturing',
    'Real Estate',
    'Media & Entertainment',
    'Food & Beverage',
    'Transportation',
    'Other'
  ];

  const countries = [
    'United States',
    'United Kingdom',
    'Canada',
    'Germany',
    'France',
    'Australia',
    'Japan',
    'Singapore',
    'Netherlands',
    'Nigeria',
    'South Africa',
    'Other'
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }

    if (!formData.companySize) {
      newErrors.companySize = 'Please select company size';
    }

    if (!formData.companyIndustry) {
      newErrors.companyIndustry = 'Please select an industry';
    }

    if (!formData.headquarterCountry) {
      newErrors.headquarterCountry = 'Please select headquarter country';
    }

    if (!formData.businessDescription.trim()) {
      newErrors.businessDescription = 'Business description is required';
    } else if (formData.businessDescription.trim().length < 10) {
      newErrors.businessDescription = 'Description must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData);
      alert('Business details submitted successfully!');
      setIsSubmitting(false);
    }, 2000);
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const isFormValid = formData.companyName && 
                     formData.companySize && 
                     formData.companyIndustry && 
                     formData.headquarterCountry && 
                     formData.businessDescription;

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b border-gray-200 p-4">
           <Image
                src="/Vector.svg"
                alt="Globe icon"
                width={40}
                height={40}
            />
      </div>

      <div className="flex min-h-screen">
        {/* Left Side - Hero Section (Desktop Only) */}
        <div className="hidden lg:flex lg:w-1/2 bg-[#5E2A8C] text-white p-8 lg:p-12 flex-col justify-center relative overflow-hidden">
          {/* Logo */}
          <div className="absolute top-8 left-8">
            <div className="bg-white bg-opacity-20 backdrop-blur-sm text-red-500 px-4 py-2 rounded-lg text-lg font-bold">
               <Image
                src="/Logo.svg"
                alt="Globe icon"
                width={174}
                height={56}
                />
            </div>
          </div>

          {/* Globe visualization placeholder */}
          <div className="mb-8 flex justify-center">
            <div className="relative w-80 h-80">
              {/* <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-pulse"></div>
              <div className="absolute inset-4 rounded-full border border-white/10"></div>
              <div className="absolute inset-8 rounded-full border border-white/10"></div> */}
               <Image
                    src="/Group.svg"
                    alt="Globe icon"
                    width={394.22}
                    height={397.03}
                    className='absolute inset-0'
                />
                 <Image
                    src="/Group (1).svg"
                    alt="Globe icon"
                    width={253.03}
                    height={252.63}
                    className='absolute inset-10'

                />
              
              {/* Currency badges */}
              <div className="absolute top-12 left-8 bg-white/20 backdrop-blur-sm px-3 py-2 rounded-lg text-sm font-medium">
                CAD 🍁
              </div>
              <div className="absolute top-8 right-12 bg-white/20 backdrop-blur-sm px-3 py-2 rounded-lg text-sm font-medium">
                EUR 🇪🇺
              </div>
              <div className="absolute bottom-12 left-12 bg-white/20 backdrop-blur-sm px-3 py-2 rounded-lg text-sm font-medium">
                USD 🇺🇸
              </div>
              <div className="absolute bottom-8 right-8 bg-white/20 backdrop-blur-sm px-3 py-2 rounded-lg text-sm font-medium">
                GBP 🇬🇧
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm px-3 py-2 rounded-lg text-sm font-medium">
                NGN 🇳🇬
              </div>
            </div>
          </div>

          <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
            Seamless Payments,<br />
            Anywhere.
          </h1>
          <p className="text-xl text-purple-100 max-w-md">
            Experience Fast, Secure Crypto & Fiat Payroll & Invoicing with VestRoll
          </p>
        </div>

        {/* Right Side - Form Section */}
        <div className="flex-1 lg:w-1/2 flex items-center justify-center p-6 lg:p-8">
          <div className="w-full max-w-md">
            {/* Progress Indicator */}
            <div className="mb-8">
              <div className="flex items-center mb-2">
                <div className="flex-1 h-1 bg-[#5E2A8C] rounded-full"></div>
                <div className="flex-1 h-1 bg-gray-200 rounded-full ml-2"></div>
                <div className="flex-1 h-1 bg-gray-200 rounded-full ml-2"></div>
                <div className="flex-1 h-1 bg-gray-200 rounded-full ml-2"></div>
              </div>
            </div>

            {/* Heading */}
            <div className="mb-8">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                Add business details
              </h2>
              <p className="text-gray-600">
                Tell us about your business
              </p>
            </div>

            {/* Form */}
            <div className="space-y-6">
              {/* Company Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                  placeholder="What's the name of your company"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 ${
                    errors.companyName ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.companyName && (
                  <p className="mt-2 text-sm text-red-600">{errors.companyName}</p>
                )}
              </div>

              {/* Company Size and Industry - Always 2 columns */}
              <div className="grid grid-cols-2 gap-4">
                <Dropdown
                  label="Company size"
                  value={formData.companySize}
                  onChange={(value) => handleInputChange('companySize', value)}
                  options={companySizes}
                  placeholder="Select"
                  error={errors.companySize}
                  required
                />

                <Dropdown
                  label="Company industry"
                  value={formData.companyIndustry}
                  onChange={(value) => handleInputChange('companyIndustry', value)}
                  options={industries}
                  placeholder="Select your industry"
                  error={errors.companyIndustry}
                  required
                />
              </div>

              {/* Headquarter Country */}
              <Dropdown
                label="Headquarter country"
                value={formData.headquarterCountry}
                onChange={(value) => handleInputChange('headquarterCountry', value)}
                options={countries}
                placeholder="Where country is your headquarter located?"
                error={errors.headquarterCountry}
                required
              />

              {/* Business Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What does your business do? <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.businessDescription}
                  onChange={(e) => handleInputChange('businessDescription', e.target.value)}
                  placeholder="Describe what your company does"
                  rows={4}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 resize-none ${
                    errors.businessDescription ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.businessDescription && (
                  <p className="mt-2 text-sm text-red-600">{errors.businessDescription}</p>
                )}
              </div>

              {/* Continue Button */}
              <button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-200 ${
                  isFormValid && !isSubmitting
                    ? 'bg-[#5E2A8C] hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transform hover:scale-[1.02]'
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  'Continue'
                )}
              </button>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
              <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
                <span>© 2025, all rights reserved</span>
                <div className="flex space-x-4">
                  <a href="#" className="hover:text-purple-600 transition-colors">Privacy Policy</a>
                  <span>•</span>
                  <a href="#" className="hover:text-purple-600 transition-colors">Terms and condition</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessRegistrationForm;