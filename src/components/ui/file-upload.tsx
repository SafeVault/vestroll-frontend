"use client";

import React, { useState } from "react";

interface FileUploadProps {
  label: string;
  onFileSelect: (file: File | null) => void;
  file: File | null;
  accept?: string;
  maxSize?: number; // in MB
  className?: string;
  isUploading?: boolean;
  uploadProgress?: number; // 0-100
}

const FileUpload: React.FC<FileUploadProps> = ({
  label,
  onFileSelect,
  file,
  accept = ".svg,.png,.jpg,.jpeg,.gif",
  maxSize = 5, // 5MB default
  className = "",
  isUploading = false,
  uploadProgress = 0,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const componentId = label.replace(/\s+/g, "-").toLowerCase();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileSelect = (selectedFile: File) => {
    // Validate file size
    if (selectedFile.size > maxSize * 1024 * 1024) {
      alert(`File size must be less than ${maxSize}MB`);
      return;
    }

    onFileSelect(selectedFile);
    // Preview will be handled by useEffect when file prop changes
  };

  const removeFile = () => {
    onFileSelect(null);
  };

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-[#17171C] mb-2">
        {label}
      </label>

      {file ? (
        // File uploaded state - show file info with loading or completed state
        <div className="border border-[#DCE0E5] rounded-[8px] px-4 py-4 bg-white">
          <div className="flex items-center gap-x-4">
            {/* File Icon */}
            <div className="w-10 h-10 bg-[#E8E5FA] rounded-full flex items-center justify-center flex-shrink-0">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.6673 6.66634V9.99967C14.6673 13.333 13.334 14.6663 10.0007 14.6663H6.00065C2.66732 14.6663 1.33398 13.333 1.33398 9.99967V5.99967C1.33398 2.66634 2.66732 1.33301 6.00065 1.33301H9.33398"
                  stroke="#5A42DE"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14.6673 6.66634H12.0007C10.0007 6.66634 9.33398 5.99967 9.33398 3.99967V1.33301L14.6673 6.66634Z"
                  stroke="#5A42DE"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* File Info */}
            <div className="w-full">
              <div className="flex flex-col gap-y-1.5 w-full justify-between">
                <div className="flex flex-col gap-y-0.5">
                  <p className="text-sm font-semibold leading-[108%] text-[#17171C] truncate">
                    {file.name}
                  </p>
                  <p className="text-xs leading-[100%] text-[#7F8C9F]">
                    {(file.size / 1024 / 1024).toFixed(0)} MB
                  </p>
                </div>
                {/* Progress Bar */}
                {isUploading && (
                  <div className="w-full bg-[#E8E5FA] rounded-full h-2">
                    <div
                      className="bg-[#5A42DE] h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col items-center">
              <button
                type="button"
                onClick={removeFile}
                className="w-8 h-8 bg-[#F5F6F7] cursor-pointer border border-[#DCE0E5] rounded-full flex items-center justify-center hover:bg-[#E8E5FA] transition-colors"
              >
                {isUploading ? (
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 3L3 9M3 3L9 9"
                      stroke="#6B7280"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 3.98665C11.78 3.76665 9.54667 3.65332 7.32 3.65332C6 3.65332 4.68 3.71999 3.36 3.85332L2 3.98665" stroke="#7F8C9F" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M5.66602 3.31301L5.81268 2.43967C5.91935 1.80634 5.99935 1.33301 7.12602 1.33301H8.87268C9.99935 1.33301 10.086 1.83301 10.186 2.44634L10.3327 3.31301" stroke="#7F8C9F" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12.5669 6.09375L12.1336 12.8071C12.0603 13.8537 12.0003 14.6671 10.1403 14.6671H5.86026C4.00026 14.6671 3.94026 13.8537 3.86693 12.8071L3.43359 6.09375" stroke="#7F8C9F" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M6.88672 11H9.10672" stroke="#7F8C9F" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M6.33398 8.33301H9.66732" stroke="#7F8C9F" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    
                )}
              </button>
              {/* Progress Percentage */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#414F62]">
                  {isUploading && `${uploadProgress}%`}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // No file uploaded state - show upload area
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative border border-[#DCE0E5] rounded-[8px] p-4 transition-colors ${
            isDragOver ? "border-[#5E2A8C] bg-purple-30" : "bg-white"
          }`}
        >
          <div className="flex items-center">
            <div className="w-10 h-10 bg-[#E8E5FA] rounded-full flex items-center justify-center mr-3">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.99935 11.333V7.33301L4.66602 8.66634"
                  stroke="#5A42DE"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6 7.33301L7.33333 8.66634"
                  stroke="#5A42DE"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14.6673 6.66634V9.99967C14.6673 13.333 13.334 14.6663 10.0007 14.6663H6.00065C2.66732 14.6663 1.33398 13.333 1.33398 9.99967V5.99967C1.33398 2.66634 2.66732 1.33301 6.00065 1.33301H9.33398"
                  stroke="#5A42DE"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14.6673 6.66634H12.0007C10.0007 6.66634 9.33398 5.99967 9.33398 3.99967V1.33301L14.6673 6.66634Z"
                  stroke="#5A42DE"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm text-[#414F62] font-medium">
                <span className="text-[#5A42DE]">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-[#414F62] font-medium mt-1">
                SVG, PNG, JPG or GIF (max. {maxSize}MB)
              </p>
            </div>
          </div>
          <input
            type="file"
            accept={accept}
            onChange={handleFileInputChange}
            className="hidden"
            id={`file-${componentId}`}
          />
          <label
            htmlFor={`file-${componentId}`}
            className="absolute inset-0 cursor-pointer z-10"
          />
        </div>
      )}

      {file && (
        <input
          type="file"
          accept={accept}
          onChange={handleFileInputChange}
          className="hidden"
          id={`file-${componentId}`}
        />
      )}
    </div>
  );
};

export default FileUpload;
