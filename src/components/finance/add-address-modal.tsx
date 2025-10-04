"use client";

import useAddAddress from "@/hooks/use-add-address";
import type { SupportedAssetSymbol, SupportedNetwork } from "@/types/address-types";
import useModal from "@/hooks/useModal";

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

export default function AddAddressModal() {
  const { hideModal } = useModal();
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
    USDC: "/usdc.svg",
    USDT: "/icons/usdt.svg",
    ETH: "/icons/eth.svg",
    BTC: "/bitcoin.svg",
  };

  const networkIcon: Record<SupportedNetwork, string> = {
    Ethereum: "/icons/eth.svg",
    Polygon: "/globe.svg", // placeholder icon in public
    Arbitrum: "/globe.svg",
    Optimism: "/globe.svg",
    Stellar: "/stellar.svg",
  };

  return (
    <div className="w-full max-w-xl">
      {/* Header (back + title + close) */}
      <div className="flex items-center justify-between pb-6">
        <button
          aria-label="Back"
          onClick={hideModal}
          className="p-2 rounded-md hover:bg-gray-100"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <h2 className="text-2xl font-semibold text-[#111827]">Add address</h2>
        <button
          aria-label="Close"
          onClick={hideModal}
          className="p-2 rounded-md hover:bg-gray-100"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M6 6l12 12M18 6L6 18" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="flex flex-col gap-5">
        {/* Asset */}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-[#111827]">Asset</label>
          <div className="relative">
            <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <img src={assetIcon[values.asset]} alt={values.asset} className="h-6 w-6" />
              <span className="text-[#111827]">{values.asset}</span>
            </div>
            <select
              className="appearance-none w-full rounded-xl bg-[#F3F4F6] pr-10 pl-14 py-4 text-transparent"
              value={values.asset}
              onChange={(e) => setAsset(e.target.value as SupportedAssetSymbol)}
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
              className="appearance-none w-full rounded-xl bg-[#F3F4F6] pr-10 pl-14 py-4 text-transparent"
              value={values.network}
              onChange={(e) => setNetwork(e.target.value as SupportedNetwork)}
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

        {/* Wallet address */}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-[#111827]">Wallet address</label>
          <div className="relative">
            <input
              placeholder="Paste or scan address"
              className="w-full rounded-xl bg-[#F3F4F6] pr-28 pl-4 py-4 text-[#111827] placeholder:text-[#9CA3AF]"
              value={values.walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <button
                type="button"
                onClick={pasteFromClipboard}
                className="px-3 py-1 rounded-lg border border-[#E5E7EB] text-[#111827] bg-white hover:bg-gray-50"
              >
                Paste
              </button>
              <button
                type="button"
                onClick={() => {/* Integrate QR scanner here */}}
                className="p-2 rounded-lg bg-white border border-[#E5E7EB] hover:bg-gray-50"
                aria-label="Scan address"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M7 3H5a2 2 0 0 0-2 2v2M17 3h2a2 2 0 0 1 2 2v2M7 21H5a2 2 0 0 1-2-2v-2M19 21a2 2 0 0 0 2-2v-2" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Wallet label */}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-[#111827]">Wallet label</label>
          <input
            placeholder="--"
            className="w-full rounded-xl bg-[#F3F4F6] px-4 py-4 text-[#111827] placeholder:text-[#9CA3AF]"
            value={values.walletLabel}
            onChange={(e) => setWalletLabel(e.target.value)}
          />
        </div>

        {/* Primary action */}
        <div className="pt-2">
          <button
            disabled={!canSubmit || submitting}
            onClick={async () => {
              await submit();
              hideModal();
            }}
            className="w-full px-6 py-4 rounded-xl bg-[#5E2A8C] text-white text-base font-medium hover:bg-[#4C1D95] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? "Creating..." : "Create address"}
          </button>
        </div>
      </div>
    </div>
  );
}



