"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface FileUploadProps {
  label: string;
  onFileSelect: (file: File | null) => void;
  file: File | null;
  accept?: string;
  maxSize?: number; // in MB
  className?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  label,
  onFileSelect,
  file,
  accept = ".svg,.png,.jpg,.jpeg,.gif",
  maxSize = 5, // 5MB default
  className = "",
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const componentId = label.replace(/\s+/g, '-').toLowerCase();

  // Sync preview with file prop
  useEffect(() => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  }, [file]);

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
    setPreview(null);
  };

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-[#17171C] mb-2">
        {label}
      </label>
      
      {file ? (
        // File uploaded state - show preview and file info
        <div className="border border-[#DCE0E5] rounded-[8px] p-4 bg-white">
          <div className="flex items-start gap-4">
            {preview ? (
              // Image preview
              <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 relative">
                <Image
                  src={preview}
                  alt="File preview"
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              // File icon for non-image files
              <div className="w-20 h-20 bg-[#F3EBF9] rounded-lg flex items-center justify-center flex-shrink-0">
                <svg width="24" height="24" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.99935 11.333V7.33301L4.66602 8.66634" stroke="#5E2A8C" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 7.33301L7.33333 8.66634" stroke="#5E2A8C" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14.6673 6.66634V9.99967C14.6673 13.333 13.334 14.6663 10.0007 14.6663H6.00065C2.66732 14.6663 1.33398 13.333 1.33398 9.99967V5.99967C1.33398 2.66634 2.66732 1.33301 6.00065 1.33301H9.33398" stroke="#5E2A8C" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14.6673 6.66634H12.0007C10.0007 6.66634 9.33398 5.99967 9.33398 3.99967V1.33301L14.6673 6.66634Z" stroke="#5E2A8C" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            )}
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-sm font-medium text-[#414F62] truncate">
                  {file.name}
                </p>
                <span className="text-xs text-[#059669] font-medium">
                  ✓ Uploaded
                </span>
              </div>
              <p className="text-xs text-[#6B7280] mb-2">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => document.getElementById(`file-${componentId}`)?.click()}
                  className="text-xs text-[#5E2A8C] hover:text-[#4A1F6F] font-medium"
                >
                  Replace
                </button>
                <button
                  type="button"
                  onClick={removeFile}
                  className="text-xs text-red-500 hover:text-red-700 font-medium"
                >
                  Remove
                </button>
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
            <div className="w-10 h-10 bg-[#F3EBF9] rounded-full flex items-center justify-center mr-3">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.99935 11.333V7.33301L4.66602 8.66634" stroke="#5E2A8C" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 7.33301L7.33333 8.66634" stroke="#5E2A8C" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14.6673 6.66634V9.99967C14.6673 13.333 13.334 14.6663 10.0007 14.6663H6.00065C2.66732 14.6663 1.33398 13.333 1.33398 9.99967V5.99967C1.33398 2.66634 2.66732 1.33301 6.00065 1.33301H9.33398" stroke="#5E2A8C" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14.6673 6.66634H12.0007C10.0007 6.66634 9.33398 5.99967 9.33398 3.99967V1.33301L14.6673 6.66634Z" stroke="#5E2A8C" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm text-[#414F62] font-medium">
                <span className="text-[#9D62D0]">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-[#414F62] mt-1">
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
