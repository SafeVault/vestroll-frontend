"use client";

import { useState } from "react";
import useModal from "@/hooks/useModal";
import { X } from "lucide-react";

function RejectTimeSheetModal({
  handleReject,
}: {
  handleReject?: (reason: string) => void;
}) {
  const [reason, setReason] = useState("");

  const onReject = () => {
    handleReject?.(reason);
  };
  const { hideModal } = useModal();

  return (
    <div className="w-screen h-svh sm:h-fit sm:w-full">
      <div className="flex items-center">
        <button className="w-fit cursor-pointer" onClick={() => hideModal()}>
          <X width={32} height={32} />
        </button>
        <p className="text-xl font-semibold text-text-header flex-1 text-center">
          Reason for rejection
        </p>
      </div>
      <div className="p-2 space-y-8">
        <form className="w-full p-4">
          <div className="form-control flex flex-col gap-2 ">
            <label htmlFor="reason">Reason(s)</label>
            <textarea
              name="reason"
              className="resize-none rounded-lg px-3.5 bg-[#F5F6F7] h-24 border-0 outline-none py-4.5"
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            ></textarea>
          </div>
        </form>
        <button
          className="w-full  h-14 rounded-xl text-white text-base font-medium bg-primary-500  cursor-pointer  transition ease-in-out duration-200"
          type="button"
          onClick={onReject}
        >
          Reject
        </button>
      </div>
    </div>
  );
}
export default RejectTimeSheetModal;
