"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

const Registration = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        agreedToTerms: false
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
    const [progress, setProgress] = useState(1);


    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First name is required';
        }

        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Last name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email address is required';
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!formData.agreedToTerms) {
            newErrors.agreedToTerms = 'You must agree to the Terms of Service and Privacy Policy';
        }

        return newErrors;
    };

    const handleBlur = (field: string) => {
        setTouched({ ...touched, [field]: true });
        const newErrors = validateForm();
        setErrors(newErrors);
    };

    const handleChange = (field: string, value: string | boolean) => {
        setFormData({ ...formData, [field]: value });

        if (touched[field]) {
            const newErrors = validateForm();
            setErrors(newErrors);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors = validateForm();
        setErrors(newErrors);
        setTouched({
            firstName: true,
            lastName: true,
            email: true,
            agreedToTerms: true
        });

        if (Object.keys(newErrors).length === 0) {
            console.log('Registration successful:', formData);
            alert('Registration successful!');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col">
            <div className="flex flex-1">
                {/* Left Side - Hero Section (Desktop Only) */}
                <div className="hidden lg:flex lg:w-1/2 bg-[#5E2A8C] text-white p-8 lg:p-12 flex-col justify-center relative overflow-hidden rounded-xl">
                    {/* Logo */}
                    <div className="absolute top-8 left-8">
                        <div className="bg-white bg-opacity-20 backdrop-blur-sm text-red-500 px-4 py-2 rounded-lg text-lg font-bold">
                            <Image src="/Logo.svg" alt="Globe icon" width={174} height={56} />
                        </div>
                    </div>

                    {/* Globe visualization placeholder */}
                    <div className="m-3 flex justify-center">
                        <div>
                            <Image
                                src="/globe-image.svg"
                                alt="Globe icon"
                                width={494.22}
                                height={497.03}
                            />
                        </div>
                    </div>

                    <h1 className="text-4xl lg:text-[50px] mb-4 leading-tight">
                        Seamless Payments,
                        <br />
                        Anywhere.
                    </h1>
                    <p className="text-[16px] text-white">
                        Experience Fast, Secure Crypto & Fiat Payroll & Invoicing with
                        VestRoll
                    </p>
                </div>

                {/* Right Section - Registration Form */}
                <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
                    <div className="w-full max-w-md">
                        {/* Mobile Logo */}
                        <div className="lg:hidden mb-8 flex justify-center">
                                <div className="bg-white bg-opacity-20 backdrop-blur-sm text-red-500 px-4 py-2 rounded-lg text-lg font-bold">
                                    <Image src="/Logo.svg" alt="Globe icon" width={174} height={56} />
                                </div>
                        </div>

                        {/* Progress Indicator */}
                        <div className="mb-8">
                            <div className="flex items-center mb-2">
                                <div className={`flex-1 h-1 rounded-full transition-colors duration-300 ${progress >= 1 ? 'bg-[#5E2A8C]' : 'bg-gray-200'}`}></div>
                                <div className={`flex-1 h-1 rounded-full ml-2 transition-colors duration-300 ${progress >= 2 ? 'bg-[#5E2A8C]' : 'bg-gray-200'}`}></div>
                                <div className={`flex-1 h-1 rounded-full ml-2 transition-colors duration-300 ${progress >= 3 ? 'bg-[#5E2A8C]' : 'bg-gray-200'}`}></div>
                                <div className={`flex-1 h-1 rounded-full ml-2 transition-colors duration-300 ${progress >= 4 ? 'bg-[#5E2A8C]' : 'bg-gray-200'}`}></div>
                                <div className={`flex-1 h-1 rounded-full ml-2 transition-colors duration-300 ${progress >= 5 ? 'bg-[#5E2A8C]' : 'bg-gray-200'}`}></div>
                            </div>
                        </div>

                        {/* Form Header */}
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">
                                Welcome to VestRoll!
                            </h2>
                            <p className="text-gray-600">
                                Let's get to know you! Provide the details below to continue
                            </p>
                        </div>

                        {/* Registration Form */}
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* First Name */}
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    id="firstName"
                                    value={formData.firstName}
                                    onChange={(e) => handleChange('firstName', e.target.value)}
                                    onBlur={() => handleBlur('firstName')}
                                    placeholder="Provide your first name"
                                    className={`w-full px-4 py-3 bg-gray-50 border ${touched.firstName && errors.firstName ? 'border-red-500' : 'border-gray-200'
                                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all text-gray-900`}
                                    aria-invalid={touched.firstName && errors.firstName ? 'true' : 'false'}
                                    aria-describedby={touched.firstName && errors.firstName ? 'firstName-error' : undefined}
                                />
                                {touched.firstName && errors.firstName && (
                                    <p id="firstName-error" className="mt-1 text-sm text-red-500" role="alert">
                                        {errors.firstName}
                                    </p>
                                )}
                            </div>

                            {/* Last Name */}
                            <div>
                                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    id="lastName"
                                    value={formData.lastName}
                                    onChange={(e) => handleChange('lastName', e.target.value)}
                                    onBlur={() => handleBlur('lastName')}
                                    placeholder="Provide your last name"
                                    className={`w-full px-4 py-3 bg-gray-50 border ${touched.lastName && errors.lastName ? 'border-red-500' : 'border-gray-200'
                                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all text-gray-900`}
                                    aria-invalid={touched.lastName && errors.lastName ? 'true' : 'false'}
                                    aria-describedby={touched.lastName && errors.lastName ? 'lastName-error' : undefined}
                                />
                                {touched.lastName && errors.lastName && (
                                    <p id="lastName-error" className="mt-1 text-sm text-red-500" role="alert">
                                        {errors.lastName}
                                    </p>
                                )}
                            </div>

                            {/* Business Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    Business email address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={(e) => handleChange('email', e.target.value)}
                                    onBlur={() => handleBlur('email')}
                                    placeholder="Provide email address"
                                    className={`w-full px-4 py-3 bg-gray-50 border ${touched.email && errors.email ? 'border-red-500' : 'border-gray-200'
                                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all text-gray-900`}
                                    aria-invalid={touched.email && errors.email ? 'true' : 'false'}
                                    aria-describedby={touched.email && errors.email ? 'email-error' : undefined}
                                />
                                {touched.email && errors.email && (
                                    <p id="email-error" className="mt-1 text-sm text-red-500" role="alert">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            {/* Terms Checkbox */}
                            <div>
                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.agreedToTerms}
                                        onChange={(e) => handleChange('agreedToTerms', e.target.checked)}
                                        onBlur={() => handleBlur('agreedToTerms')}
                                        className="w-6 h-4 mt-3 appearance-none bg-gray-400 rounded cursor-pointer checked:bg-[#5E2A8C] relative checked:after:content-['✓'] checked:after:absolute checked:after:text-white checked:after:text-sm checked:after:left-1/2 checked:after:top-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2"
                                    />
                                    <span className="text-sm text-gray-600 leading-relaxed">
                                        By creating an account, I agree to our{' '}
                                        <a href="#" className="text-[#5E2A8C] hover:text-purple-800 font-medium">
                                            Terms of Service
                                        </a>{' '}
                                        and{' '}
                                        <a href="#" className="text-[#5E2A8C] hover:text-purple-800 font-medium">
                                            Privacy Policy
                                        </a>{' '}
                                        and confirm that I am 18 years and older.
                                    </span>
                                </label>
                            </div>

                            {/* Continue Button */}
                            <button
                                type="submit"
                                disabled={!(formData.firstName && formData.lastName && formData.email && formData.agreedToTerms)}
                                className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-200 ${formData.firstName && formData.lastName && formData.email && formData.agreedToTerms
                                    ? 'bg-[#5E2A8C] hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transform hover:scale-[1.02]'
                                    : 'bg-gray-400 cursor-not-allowed'
                                    }`}
                            >
                                Continue
                            </button>

                            {/* Login Link */}
                            <p className="text-center text-sm text-gray-600">
                                Already own a VestRoll account?{' '}
                                <a href="#" className="text-[#5E2A8C] hover:text-purple-800 font-semibold">
                                    Login
                                </a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="w-full py-6 px-6 lg:px-12 text-center text-sm sm:block hidden">
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
    );
};

export default Registration;