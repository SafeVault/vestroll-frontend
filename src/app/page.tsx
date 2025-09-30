import VestRollAccountSelection from '@/components/accountType';
import { redirect } from 'next/navigation';
import BusinessDetails from "../components/business-details";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen">
      <div className="w-full">
        <VestRollAccountSelection />
        <BusinessDetails />
        {/* redirect("/onboarding"); */}

        {/* Demo Navigation */}
        <div className="fixed bottom-4 right-4 z-50">
          <Link
            href="/billing-address"
            className="bg-[#5E2A8C] text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200 shadow-lg"
          >
            View Billing Address Form
          </Link>
        </div>
      </div>
    </div>
  );
}
