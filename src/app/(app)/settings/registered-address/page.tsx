"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import InputField from "@/components/InputField";
import { CountrySelect, CustomSelect } from "./components/select-components";
import { countries, regions } from "./utils";

export default function BillingAddressPage() {
  const [formData, setFormData] = useState({
    addressLine: "",
    alternateAddress: "",
    city: "",
    region: "",
    country: "Nigeria",
    postalCode: "",
  });

  const { addressLine, city, region, country, postalCode } = formData;
  const isFormValid = !!(
    addressLine &&
    city &&
    region &&
    country &&
    postalCode
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="">
      <div className="mb-3 lg:mb-6 bg-white py-6 px-4">
        <Link
          href="/app/settings"
          className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-1">
          Registered address
        </h1>
      </div>

      <div className="max-w-2xl mx-auto p-2">
        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-sm">
          <form className="space-y-6">
            <InputField
              id="addressLine"
              label="Address line"
              value={formData.addressLine}
              onChange={handleInputChange}
              placeholder="-- "
            />
            <InputField
              id="alternateAddress"
              label="Alternate Address line (optional)"
              value={formData.alternateAddress}
              onChange={handleInputChange}
              placeholder="-- "
            />
            <InputField
              id="city"
              label="City"
              value={formData.city}
              onChange={handleInputChange}
              placeholder="-- "
            />
            <CustomSelect
              label="Region/State/Province"
              options={regions}
              value={formData.region}
              onChange={(value) => handleSelectChange("region", value)}
              placeholder="-- "
            />
            <CountrySelect
              label="Country"
              options={countries}
              value={formData.country}
              onChange={(value) => handleSelectChange("country", value)}
            />
            <InputField
              id="postalCode"
              label="Postal code / ZIP"
              value={formData.postalCode}
              onChange={handleInputChange}
              placeholder="-- "
            />
            <div className="pt-4">
              <Button
                disabled={!isFormValid}
                className={`w-full text-white px-8 py-6 rounded-lg text-base font-semibold ${
                  isFormValid
                    ? "bg-[#5E2A8C] hover:bg-[#4A1F73]"
                    : "bg-gray-500 cursor-not-allowed"
                }`}
              >
                Save changes
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
