// components/EmptyState.tsx

import React from "react";
import Image from "next/image";

const EmptyState: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-20 bg-white mt-6">
      <Image
        src="/Empty State.svg"
        alt="No transaction"
        width="200"
        height="200"
      />
      <h3 className="font-medium text-[20px] text-[#17171C]">
        No transactions yet
      </h3>
      <p className="mt-1 text-[14px] text-[#7F8C9F]">
        Start making payments or receiving funds to see them here.
      </p>
    </div>
  );
};

export default EmptyState;
