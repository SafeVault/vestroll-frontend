import React from 'react';
import { MOCK_ASSETS, generateMockTransactions } from '@/lib/mock-data';
import { BalanceSection } from '@/components/finance/balance-section';
import { AssetsGrid } from '@/components/finance/assets-grid';
import { FinanceClient } from '@/components/finance/finance-client';

import { useEffect } from "react";
import useModal from "@/hooks/useModal";
import AddAddressModalComponent from "@/app/(app)/finance/add-address-modal";
import AddressBookModal from "@/app/(app)/finance/address-book-modal";
import useAddAddress from "@/hooks/use-add-address";
import type { SupportedAssetSymbol, SupportedNetwork } from "@/types/address-types";
import { useState } from "react";
import Image from "next/image";
import vuesax from "../../../../public/images/vuesax.svg";


type Option<T extends string> = { label: string; value: T };

const assetOptions: Option<SupportedAssetSymbol>[] = [
  { label: "USDC", value: "USDC" },
  { label: "USDT", value: "USDT" },
  { label: "ETH", value: "ETH" },
  { label: "BTC", value: "BTC" },
];

const networkOptions: Option<SupportedNetwork>[] = [
  { label: "Ethereum", value: "Ethereum" },
  { label: "Polygon", value: "Polygon" },
  { label: "Arbitrum", value: "Arbitrum" },
  { label: "Optimism", value: "Optimism" },
  { label: "Stellar", value: "Stellar" },
];

function AddAddressModal() {
  const { hideModal } = useModal();
  const [showModal, setShowModal] = useState(false);
  const [asset] = useState("");
  const {
    values,
    setAsset,
    setNetwork,
    setWalletAddress,
    setWalletLabel,
    canSubmit,
    submitting,
    submit,
    reset,
  } = useAddAddress();

  const pasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) setWalletAddress(text);
    } catch {
      // Clipboard not available
    }
  };

  const assetIcon: Record<SupportedAssetSymbol, string> = {
    USDC: "/Component 13.svg",
    USDT: "/icons/usdt.svg",
    ETH: "/icons/eth.svg",
    BTC: "/bitcoin.svg",
  };

  const networkIcon: Record<SupportedNetwork, string> = {
    Ethereum: "/icons/eth.svg",
    Polygon: "/globe.svg",
    Arbitrum: "/globe.svg",
    Optimism: "/globe.svg",
    Stellar: "/stellar.svg",
  };

  const { showCustomModal } = useModal();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("openAddAddress") === "true") {
      showCustomModal(<AddAddressModalComponent />, "md");
    }
  }, [showCustomModal]);
  const [amount, setAmount] = useState("");
const availableBalance = 20; // Example

const handleMaxClick = () => {
    setAmount(availableBalance.toString());
  }


  return (
    <div>
      <div className="rounded-xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
        <div className= "flex gap-2">
        <Image
        src= "/images\vuesax (1).svg"
        alt="Back"
        width={15}
        height={15}
        />
        <span className="flex text-[#7F8C9F]">Back</span>
        </div>


        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-[#111827]">Withdraw</h1>
          {/* <button
            onClick={() => showCustomModal(<AddAddressModalComponent />, "md")}
            className="px-4 py-2 rounded-lg bg-[#5E2A8C] text-white hover:bg-[#4C1D95]"
          >
            Add address
          </button> */}
        </div>
      </div>


          <div className="min-h-screen bg-gray-50 ">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-sm p-6 mt-2 h-[600px] flex flex-col justify-between">
        {/* Asset */}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-[#111827]">Asset</label>
          <div className="relative">
            <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
              {/* <img src={assetIcon[values.asset]} alt={asset} className="h-6 w-6" /> */}
              <Image
              src="/images\Component 13.svg"
              alt="USDC"
              width={20}
              height={20}
              />
              <span className="text-[#111827]">{values.asset}</span>

            </div>
            <select
              className="appearance-none w-full rounded-md bg-[#F3F4F6] pr-10 pl-14 py-4 text-transparent"
              value={values.asset}
              onChange={(e) => setAsset(e.target.value as SupportedAssetSymbol)}
              required
            >
              {assetOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#6b7280]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
        </div>

        {/* Network */}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-[#111827]">Network</label>
          <div className="relative">
            <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <img src={networkIcon[values.network]} alt={values.network} className="h-6 w-6" />
              <span className="text-[#111827]">{values.network}</span>
            </div>
            <select
              className="appearance-none w-full rounded-md bg-[#F3F4F6] pr-10 pl-14 py-4 text-transparent"
              value={values.network}
              onChange={(e) => setNetwork(e.target.value as SupportedNetwork)}
              required
            >
              {networkOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#6b7280]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
        </div>

        {/* Amount */}
           <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-gray-900">Amount</label>
              <span className="text-xs text-gray-500">Available: {availableBalance} {values.asset}</span>
            </div>
            <div className="relative">
              <div className="items-center gap-2 w-full bg-gray-100 rounded-xl p-4">
                <div className="flex text-2xl font-semibold text-black-900">$
                <input
                  type="number"
                   className="flex-1 text-2xl font-semibold text-black-900 outline-none placeholder:text-black"
                  placeholder=" 0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
                  <Image
                   src="/images\vuesax (2).svg"
                   alt="dropdown"
                   width={15}
                   height={15}/>

                </div>
                <div className="flex justify-between text-[#7F8C9F] items-center">
                  <span className=" text-xs">0 USDC</span>
                  <button
                  type="button"
                  onClick={handleMaxClick}
                  className="bg-[#E8E5FA] px-3 py-1 rounded-lg text-sm font-medium text-purple-600 bg-purple-50 transition-colors"
                > Max </button>
                </div>


              </div>

            </div>
          </div>


           {/* Wallet address */}
          <div className="flex flex-col gap-2">
            <div className="items-center flex justify-between ">
              <label className="text-sm font-medium text-gray-900">Send to</label>
              <div className="flex justify-end items-center items-center">
                  <Image
                src= "/images\vuesax.svg"
                alt="Address book"
                className="w-4 h-4 mr-2"
                width={4}
                height={4}
                />
              <button
              onClick={() => setShowModal(true)}
              className="text-sm text-purple-600 cursor-pointer">
                Address book
              </button>
              </div>

               {showModal && (
                <AddressBookModal
                onClose={() => setShowModal(false)}
                onAddAddress={() => {setShowModal(false);
          }} />
      )}
            </div>
            <div className="relative">
              <input
                placeholder="Paste or scan address"
                className="w-full rounded-md bg-gray-100 pr-28 pl-4 py-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:bg-white transition-all"
                value={values.walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                required
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={pasteFromClipboard}
                  className="px-4 py-2 text-sm rounded-lg border border-gray-200 text-gray-700 bg-white"
                >
                  Paste
                </button>
                <button
                  type="button"
                  onClick={() => {/* Integrate QR scanner here */}}
                  className=""
                  aria-label="Scan address"
                >
                 <Image
                  src="/images\scan.svg"
                  alt="Scan"
                  className="h-5 w-5"
                  width={4}
                  height={4}
                  />
                </button>
              </div>
            </div>
        </div>

        {/* Primary action */}
        <div className="pt-2">
          <button
            disabled={!canSubmit || submitting}
            onClick={async () => {
              await submit();
              hideModal();
            }}
            className="w-full px-6 py-4 rounded-xl bg-[#5E2A8C] text-white text-base font-medium cursor-pointer"
          >
            Continue
          </button>
        </div>
const allTransactions = generateMockTransactions(80);

export default function FinancePage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-6 lg:p-8">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <header className="mb-5">
          <p className="text-xs text-[#94A3B8] mb-1">Overview</p>
          <h1 className="text-2xl md:text-3xl font-bold text-[#0F172A]">
            Finance
          </h1>
        </header>

        {/* Balance Section */}
        <BalanceSection
          balance="$5,050.00"
          change="-0.0051% ($0.99)"
        />

        {/* Assets Grid */}
        <AssetsGrid assets={MOCK_ASSETS} />

        {/* Transactions Section with Client Component */}
        <FinanceClient
          allTransactions={allTransactions}
          initialResultsPerPage={10}
        />
      </div>
    </div>
    </div>

  );
}


export default AddAddressModal