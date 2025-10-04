"use client";

import { useEffect, useRef, useState } from "react";
import { X, Search } from "lucide-react";
import Image from "next/image";

interface AddressBookEmptyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddressBookEmptyModal({
  isOpen,
  onClose,
}: AddressBookEmptyModalProps) {
  const [search, setSearch] = useState("");
  const dialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) {
      document.addEventListener("keydown", onKey);
    }
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => dialogRef.current?.focus(), 0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="addressbook-title"
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center lg:p-6"
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        className="
          bg-white w-full h-full
          lg:h-auto lg:max-h-[90vh] lg:w-[460px]
          rounded-none lg:rounded-2xl shadow-xl flex flex-col
        "
      >
        <button
          onClick={onClose}
          aria-label="Close address book"
          className="az-10 relative top-10 left-8 text-gray-900 hover:text-gray-900"
        >
          <X size={22} />
        </button>

        <div className="flex items-center justify-center relative p-4">
          <h2 id="addressbook-title" className="text-lg font-semibold text-gray-900">
            Address book
          </h2>
        </div>

        <div className="p-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-3 pr-10 rounded-xl  bg-gray-100  focus:ring-2 focus:ring-purple-500 focus:outline-none text-sm"
            />
            <Search
              size={18}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              aria-hidden
            />
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
          <Image
            src="/images/Empty State.png"
            alt="Empty Address Book"
            width={160}
            height={160}
            className="mb-6"
          />

          <div className="max-w-56">
            <h3 className="text-md font-bold text-gray-900 mb-1">
            No saved addresses yet
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            Save your go-to-crypto address so sending funds is faster and safer
          </p>
          </div>
        </div>

        <div className="p-4 ">
          <button
            className="w-full py-3 rounded-xl font-medium bg-purple-700 hover:bg-purple-700 text-white"
            onClick={() => {

              console.log("Add address clicked");
            }}
          >
            Add address
          </button>
        </div>
      </div>
    </div>
  );
}
