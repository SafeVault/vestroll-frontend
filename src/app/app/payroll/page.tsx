import PageNavHeader from "@/components/reuseables/PageNavHeader";
import ProfileDetails from "./components/ProfileDetails";
import QuickDash from "./components/QuickDash";
import PayoutHistory from "./components/PayoutHistory";

export default function PayrollPage() {
  return (
    <div className="">
      <PageNavHeader name="James Akinbiola" />
      <div className="p-4 md:px-6 md:pt-6 flex flex-col lg:w-max ">
      <div className="flex lg:flex-row flex-col gap-6 lg:gap-10 mb-6">
        <ProfileDetails />
        <QuickDash />
      </div>
     <PayoutHistory />
      </div>
    </div>
  );
}
