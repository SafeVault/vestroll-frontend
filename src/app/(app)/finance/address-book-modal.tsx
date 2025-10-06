import React from "react";
import Image from "next/image";

const AddressBookModal = ({ onClose, onAddAddress }: { onClose: () => void; onAddAddress: () => void }) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="hidden md:block bg-white w-[420px] rounded-2xl p-6 shadow-lg relative">

        {/* Header */}
        <h2 className="text-lg font-semibold text-gray-900 text-center mb-4">Address book</h2>
    {/* Close Button */}
        <Image
            src="\images\close_big.svg"
            alt="Close"
            width={14}  
            height={14}
            className="absolute top-8 left-7 cursor-pointer"
            onClick={onClose}
            />
        {/* Search Bar */}
        <div className=" mb-6">
            <div className="relative items-center">
           <input
            type="text"
            placeholder="Search..."
            className="w-full border border-gray-200 py-4 PX-2 pl-4 rounded-lg pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 bg-[#F5F6F7]"
          />
               
           <svg
            className="absolute translate-y-1/2 right-3 top-1.5 h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
            />
          </svg>  
           
            </div>
        
        </div>

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center text-center mt-6">
        {/* <div className="border border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center"> */}
          <Image
           width ={160}
           height={160}
            src="/images/Empty State.png"
            alt="No addresses"
           
          />
          <h3 className="text-gray-800 font-medium mt-4 text-lg">No saved addresses yet</h3>
          <p className="text-sm text-gray-500 mt-1 mb-6 px-6 max-w-xs">
            Save your go-to crypto addresses so sending funds is faster and safer.
          </p>
          </div>

          <button
            onClick={onAddAddress}
            className="w-full px-6 py-4 rounded-xl bg-[#5E2A8C] text-white text-base font-medium cursor-pointer"
          >
            Add address
          </button>
        </div>
        <div className="md:hidden block">
        {/* Mobile View */}
        <div className="bg-white w-screen h-screen p-6 shadow-lg relative">
            
        {/* Header */}
        <h2 className="text-lg font-semibold text-gray-900 text-center mb-4">Address book</h2>
    {/* Close Button */}
        <Image
            src="\images\close_big.svg"
            alt="Close"
            width={14}  
            height={14}
            className="absolute top-8 left-7 cursor-pointer"
            onClick={onClose}
            />
        {/* Search Bar */}
        <div className=" mb-6">
            <div className="relative items-center">
           <input
            type="text"
            placeholder="Search..."
            className="w-full border border-gray-200 py-4 PX-2 pl-4 rounded-lg pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 bg-[#F5F6F7]"
          />
               
           <svg
            className="absolute translate-y-1/2 right-3 top-1.5 h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
            />
          </svg>  
           
            </div>
        
        </div>
        <div className="py-10">
        <div className="flex flex-col items-center justify-center text-center mt-6">
        {/* <div className="border border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center"> */}
          <Image
           width ={160}
           height={160}
            src="/images/Empty State.png"
            alt="No addresses"
           
          />
          <h3 className="text-gray-800 font-medium mt-4 text-lg">No saved addresses yet</h3>
          <p className="text-sm text-gray-500 mt-1 mb-6 px-6 max-w-xs">
            Save your go-to crypto addresses so sending funds is faster and safer.
          </p>
          </div>
    </div>
        <div className="py-20">
          <button
            className="w-full px-6 py-4 rounded-xl bg-[#5E2A8C] text-white text-base font-medium cursor-pointer"
          >
            Add address
          </button>
        </div>
        </div>

        </div>
        </div>
    
    // </div>
  );
};

export default AddressBookModal;
