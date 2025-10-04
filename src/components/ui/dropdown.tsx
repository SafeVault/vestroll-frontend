"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface DropdownOption {
  label: string;
  icon?: string;
}

interface DropdownProps {
  label: string;
  value: string;
  options: DropdownOption[] | string[];
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  icon?: string;
  className?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  value,
  options,
  onChange,
  error,
  placeholder = "--",
  icon,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Get the selected option for display
  const selectedOption =
    Array.isArray(options) &&
    options.length > 0 &&
    typeof options[0] === "object"
      ? options.find(
          (opt): opt is DropdownOption =>
            typeof opt === "object" && opt.label === value
        )
      : null;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (optionLabel: string) => {
    onChange(optionLabel);
    setIsOpen(false);
  };

  return (
    <div className={`relative min-w-fit ${className}`} ref={dropdownRef}>
      <label className="block text-sm font-medium text-[#414F62] mb-2">
        {label}
      </label>
      <button
        type="button"
        onClick={toggleDropdown}
        className={`w-full min-w-fit flex items-center justify-between px-4 py-3 rounded-lg bg-[#F5F6F7] transition-colors text-[#414F62] ${
          error ? "border-red-300" : "border-gray-300"
        }`}
      >
        <div className="flex items-center gap-x-2">
          {(selectedOption?.icon || icon) && (
            <Image
              src={selectedOption?.icon || icon || ""}
              alt="option-icon"
              width={24}
              height={24}
              className="w-[24px] h-[24px]"
            />
          )}
          <span className={value ? "text-[#414F62]" : "text-[#BDC5D1]"}>
            {value || placeholder}
          </span>
        </div>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className={`ml-1 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.2788 5.9668L8.93208 10.3135C8.41875 10.8268 7.57875 10.8268 7.06542 10.3135L2.71875 5.9668"
            stroke="#414F62"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 text-[#414F62] bg-white border border-gray-300 rounded-lg shadow-lg z-40 max-h-48 overflow-y-auto">
          {options.map((option) => {
            const optionLabel =
              typeof option === "string" ? option : option.label;
            const optionIcon =
              typeof option === "object" ? option.icon : undefined;

            return (
              <button
                key={optionLabel}
                onClick={() => handleOptionSelect(optionLabel)}
                className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors flex items-center gap-x-2"
              >
                {optionIcon && (
                  <Image
                    src={optionIcon}
                    alt={`${optionLabel}-icon`}
                    width={20}
                    height={20}
                    className="w-[20px] h-[20px]"
                  />
                )}
                <span>{optionLabel}</span>
              </button>
            );
          })}
        </div>
      )}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default Dropdown;
