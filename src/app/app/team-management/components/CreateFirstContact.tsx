// A special promotional card shown when the employee list is completely empty.

export const CreateFirstContact = () => {
    return (
      <div className="bg-[url('/purple-bg.png')] bg-no-repeat bg-cover rounded-lg p-6 text-white flex flex-col gap-6 mb-3">
        <div className="flex flex-col gap-2">
          <p className="text-xl md:text-[28px] font-bold">
            Create your first contract
          </p>
          <p className="font-medium text-sm text-[#E8E5FA]">
            You're one step away! Set up your first contract and start managing
            payroll.
          </p>
        </div>
        <div className="flex flex-1">
          <button className="bg-white text-purple-600 px-4 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors cursor-pointer">
            New Contract
          </button>
        </div>
      </div>
    );
  };