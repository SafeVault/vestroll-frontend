'use client';

import React, { useRef, useState } from 'react';
import InputField from '@/components/InputField';
import Avatar from '@/components/Avatar';
import {
  CountrySelect,
  CustomSelect,
} from '@/app/(app)/settings/registered-address/components/select-components';
import { countries } from '@/app/(app)/settings/registered-address/utils';
import { Button } from '@/components/ui/button';
// import FileUpload from '@/components/ui/file-upload';
import { ImagePlus } from 'lucide-react';

interface FormData {
  companyLogo: File | null;
  companyName: string;
  registeredName: string;
  registrationNumber: string;
  country: string;
  size: string | null;
  vatNumber: string | null;
  companyWebsite: string;
}

export default function OTPVerification() {
  const logoInputRef = useRef<HTMLInputElement>(null);

  const handleGoBack = () => {
    // In real app, this would navigate to previous step
    alert('Going back to previous step...');
  };

  const [formData, setFormData] = useState<FormData>({
    companyLogo: null,
    companyName: '',
    registeredName: '',
    registrationNumber: '',
    country: '',
    size: null,
    vatNumber: null,
    companyWebsite: '',
  });

  const isFormValid = true; // Placeholder for form validation logic

  const sampleSizes = ['2', '5', '10-50', '50-100', '100-500', '500+'];
  const sampleVATNumbers = ['3455', '1234', '5678', '91011'];

  const onUpload = (file: File) => {
    const maxSize = 1024 * 1024; // 1MB in bytes - Could be adjusted as needed
    if (file.size > maxSize) {
      alert('File size exceeds 1MB. Please choose a smaller file.');
      return;
    }
    setFormData((prev) => ({ ...prev, companyLogo: file }));
    if (logoInputRef.current) {
      logoInputRef.current.value = ''; // Reset the input value to allow re-uploading the same file if needed
    }
  };

  return (
    <div className="min-h-screen ">
      <div className="mb-8 p-4 border-b">
        <button
          onClick={handleGoBack}
          className="text-gray-400 text-sm mb-4 hover:text-gray-600 transition-colors"
        >
          ← Back
        </button>
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Company Information</h1>
      </div>
      <div className="bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-lg bg-white rounded-lg shadow-sm p-6 md:p-8">
          <div className="flex flex-col items-center justify-center mb-6">
            <Avatar
              src={formData.companyLogo ? URL.createObjectURL(formData.companyLogo) : null}
              alt="Company Logo"
              size="xl"
              fallback="T3"
            />

            <div
              className="flex items-center gap-2 mt-1 mb-6 hover:cursor-pointer p-2 hover:rounded-lg hover:bg-gray-100 transition-all duration-300 ease-in-out"
              onClick={() => logoInputRef.current?.click()}
            >
              <ImagePlus className="text-primary-500" />
              <p className="text-primary-500">Upload image</p>
            </div>
          </div>

          <input
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            hidden
            onChange={(e) => e.target.files && onUpload(e.target.files[0])}
            ref={logoInputRef}
          />

          <div className="flex flex-col gap-4">
            <InputField
              id="companyName"
              label="Company/Brand name"
              value={formData.companyName}
              onChange={(e) => setFormData((prev) => ({ ...prev, companyName: e.target.value }))}
              placeholder="--"
            />

            <InputField
              id="registeredName"
              label="Registered name"
              value={formData.registeredName}
              onChange={(e) => setFormData((prev) => ({ ...prev, registeredName: e.target.value }))}
              placeholder="--"
            />

            <InputField
              id="registrationNumber"
              label="Registration number/EIN ID"
              value={formData.registrationNumber}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, registrationNumber: e.target.value }))
              }
              placeholder="--"
            />

            <CountrySelect
              label="Country"
              options={countries}
              value={formData.country}
              onChange={(value) => setFormData((prev) => ({ ...prev, country: value }))}
            />

            <div className="flex gap-4 w-full">
              <div className="flex-1">
                <CustomSelect
                  label="Size"
                  options={sampleSizes}
                  value={formData.size || ''}
                  onChange={() => {}}
                  placeholder="-- "
                />
              </div>

              <div className="flex-1">
                <CustomSelect
                  label="VAT number"
                  options={sampleVATNumbers}
                  value={formData.vatNumber || ''}
                  onChange={() => {}}
                  placeholder="-- "
                />
              </div>
            </div>

            <InputField
              id="companyWebsite"
              label="Company public website URL"
              value={formData.companyWebsite}
              onChange={() => {}}
              placeholder="-- "
            />
          </div>

          <div className="mt-12">
            <Button
              disabled={!isFormValid}
              className={`w-full text-white px-8 py-6 rounded-lg text-base font-semibold ${
                isFormValid ? 'bg-[#5E2A8C] hover:bg-[#4A1F73]' : 'bg-gray-500 cursor-not-allowed'
              }`}
            >
              Save changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
