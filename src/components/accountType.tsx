"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Globe from "./ui/globe"
import BusinessIllustration from "./ui/business_illustration"
import FreelancerIllustration from "./ui/freelancer_illustration"
import ContractorIllustration from "./ui/contractor_illustration"
import vesrrolllogo from '../app/vestroll_Logo.png'
import Image from "next/image"
const accountTypes = [
  {
    id: "business",
    name: "Business",
    icon: <BusinessIllustration  />,
    description: "For companies and organizations",
  },
  {
    id: "freelancer",
    name: "Freelancer",
    icon: <FreelancerIllustration />,
    description: "For independent professionals",
  },
  {
    id: "contractor",
    name: "Contractor",
    icon: <ContractorIllustration />,
    description: "For contract workers",
  },
]

export default function VestRollAccountSelection() {
  const [selectedType, setSelectedType] = useState<string>("")

  return (
    <div className="min-h-screen bg-gray-50 lg:bg-white">

      <div className="lg:flex lg:min-h-screen">
        {/* Left Panel - Desktop Only */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 relative overflow-hidden">
          {/* VestRoll Logo */}
          <div className="absolute bg-white top-8 rounded-lg left-8 z-10">
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2">
              <Image src={vesrrolllogo} alt="VestRoll Logo" width={32} height={32} />
              <span className="text-black font-semibold text-lg">VestRoll</span>
            </div>
          </div>

          {/* Currency Indicators */}
          <div className="absolute top-[15rem] left-[25%] flex items-center justify-center">
            <div className="relative w-80 h-80">
              
              <Globe />

              {/* Currency Badges */}
              <div className="absolute top-16 left-12 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-2">
                <span className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
                  🍁
                </span>
                <span className="text-sm font-medium">CAD</span>
              </div>

              <div className="absolute top-8 right-16 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-2">
                <span className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">
                  🇪🇺
                </span>
                <span className="text-sm font-medium">EUR</span>
              </div>

              <div className="absolute bottom-20 right-8 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-2">
                <span className="w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs">
                  🇬🇧
                </span>
                <span className="text-sm font-medium">GBP</span>
              </div>

              <div className="absolute bottom-32 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-2">
                <span className="w-4 h-4 bg-green-600 rounded-full flex items-center justify-center text-white text-xs">
                  💵
                </span>
                <span className="text-sm font-medium">USD</span>
              </div>

              <div className="absolute bottom-8 right-20 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-2">
                <span className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">
                  🇳🇬
                </span>
                <span className="text-sm font-medium">NGN</span>
              </div>
            </div>
          </div>

          {/* Bottom Content */}
          <div className="absolute bottom-16 left-8 right-8">
            <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
              Seamless Payments,
              <br />
              Anywhere.
            </h1>
            <p className="text-purple-100 text-lg">
              Experience Fast, Secure Crypto & Fiat Payroll & Invoicing with VestRoll
            </p>
          </div>
        </div>

        {/* Right Panel - Account Selection */}
        <div className="lg:w-1/2 flex flex-col justify-center p-6 lg:p-16">
          {/* Progress Indicator */}
          <div className="flex justify-center mb-8 lg:mb-12">
            <div className="flex gap-2">
              <div className="w-8 h-1 bg-purple-600 rounded-full"></div>
              <div className="w-8 h-1 bg-purple-600 rounded-full"></div>
              <div className="w-8 h-1 bg-purple-600 rounded-full"></div>
              <div className="w-8 h-1 bg-purple-600 rounded-full"></div>
              <div className="w-8 h-1 bg-gray-200 rounded-full"></div>
            </div>
          </div>

          <div className="max-w-md mx-auto w-full">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2 text-balance">Select account type</h2>
            <p className="text-gray-600 mb-8 lg:mb-12">Choose an account type that best suits your usecase</p>

            {/* Account Type Cards */}
            <div className="grid grid-cols-3 gap-3 lg:gap-4 mb-8 lg:mb-12">
              {accountTypes.map((type) => (
                <Card
                  key={type.id}
                  className={`p-4 lg:p-6 cursor-pointer transition-all hover:shadow-md ${
                    selectedType === type.id ? "ring-2 ring-purple-600 bg-purple-50" : "hover:bg-gray-50"
                  }`}
                  onClick={() => setSelectedType(type.id)}
                >
                  <div className="text-center">
                    <div className="mb-4 flex items-center justify-center h-12 w-12 mx-auto">

                    {type.icon}
                    </div>
                    <h3 className="font-medium text-gray-900 text-sm lg:text-base">{type.name}</h3>
                  </div>
                </Card>
              ))}
            </div>

            {/* Continue Button */}
            <Button
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 lg:py-4 text-base lg:text-lg font-medium rounded-xl"
              disabled={!selectedType}
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
