import { MapPin,  } from "lucide-react";
import Image from "next/image";


const QuickDash = () => {
  return (
    <div className="bg-white p-4 rounded-sm shadow w-full lg:w-md px-8 space-y-2">
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border text-[#5A42DE] border-[#5A42DE] bg-[#E8E5FA] `}
      >
        Payment Details
      </span>
      <div className="flex items-start gap-4">
        <div className="rounded-sm bg-[#E8E5FA] p-2 flex items-center justify-center h-12 w-12">
          <Image
            src="/contracts.svg"
            alt="Contract type"
            width={20}
            height={20}
          />
        </div>

        {/* Employee Info */}
        <div className="flex-1 w-full sm:w-auto">
          <div className="">
            <h1 className="text-xl sm:text-2xl font-bold text-text-primary">
              Quick Dash
            </h1>
            <p className="text-sm text-text-secondary">Pay as you go</p>
          </div>
        </div>
      </div>

      {/* Contact Details */}
      <div className="space-y-2">
        <div className="flex justify-between  bg-background-b2 p-1 rounded">
          <p className="text-xs text-text-secondary">Asset</p>
          <p className="text-xs text-text-secondary">Amount</p>
        </div>
        <div className="flex justify-between gap-2">
          <div className="flex items-center gap-2 text-text-secondary px-1 text-sm py-1 ">
            <Image src="/Tether.svg" alt="Currency" width={15} height={15} />
            <span>USDT</span>
          </div>
          <div className="flex items-center gap-2 px-1 text-text-secondary text-sm py-1 ">
            <span>$1,200.00</span>
          </div>
        </div>
        <div className="flex justify-between  bg-background-b2 p-1 rounded">
          <p className="text-xs text-text-secondary">Network</p>
          <p className="text-xs text-text-secondary">Frequency</p>
        </div>
        <div className="flex justify-between gap-2">
          <div className="flex items-center gap-2 text-text-secondary px-1 text-sm py-1 max-w-48  ">
            <Image src="/eth.svg" alt="Currency" width={15} height={15} />
            <span>Etherium</span>
          </div>
          <div className="flex items-center gap-2 px-1 text-text-secondary text-sm py-1 ">
       
            <span>Bi-weekly</span>
          </div>
        </div>
        <div className="flex justify-between  bg-background-b2 p-1 rounded">
          <p className="text-xs text-text-secondary">Next payout date</p>
        </div>
        <div className="flex items-start gap-2 text-text-primary px-1  text-sm py-1">
          <MapPin className="w-4 h-4 mt-0.5" />
          <span className="leading-relaxed text-sm">25th October 2025</span>
        </div>
      </div>
    </div>
  );
};

export default QuickDash;
