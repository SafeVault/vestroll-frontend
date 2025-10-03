// Business logic for Add Address flow
// All validations and submission are handled here

"use client";

import { useCallback, useMemo, useState } from "react";
import type {
  AddressBookItem,
  AddressFormValues,
  AddressValidationResult,
  SupportedAssetSymbol,
  SupportedNetwork,
} from "@/types/address-types";

const DEFAULT_VALUES: AddressFormValues = {
  asset: "USDC",
  network: "Ethereum",
  walletAddress: "",
  walletLabel: "",
};

function validateAddressFormat(
  address: string,
  network: SupportedNetwork
): AddressValidationResult {
  // Minimal format validation; extend with real libs per network
  if (!address || address.trim().length < 8) {
    return { isValid: false, message: "Address is too short" };
  }
  if (network === "Ethereum" && !/^0x[a-fA-F0-9]{8,}$/.test(address)) {
    return { isValid: false, message: "Invalid Ethereum address format" };
  }
  return { isValid: true };
}

export default function useAddAddress(initial?: Partial<AddressFormValues>) {
  const [values, setValues] = useState<AddressFormValues>({
    ...DEFAULT_VALUES,
    ...initial,
  });
  const [submitting, setSubmitting] = useState(false);

  const canSubmit = useMemo(() => {
    const labelOk = values.walletLabel.trim().length > 0;
    const addrValidation = validateAddressFormat(values.walletAddress, values.network);
    return labelOk && addrValidation.isValid;
  }, [values]);

  const setAsset = useCallback((asset: SupportedAssetSymbol) => {
    setValues((v) => ({ ...v, asset }));
  }, []);

  const setNetwork = useCallback((network: SupportedNetwork) => {
    setValues((v) => ({ ...v, network }));
  }, []);

  const setWalletAddress = useCallback((walletAddress: string) => {
    setValues((v) => ({ ...v, walletAddress }));
  }, []);

  const setWalletLabel = useCallback((walletLabel: string) => {
    setValues((v) => ({ ...v, walletLabel }));
  }, []);

  const reset = useCallback(() => setValues(DEFAULT_VALUES), []);

  const submit = useCallback(async (): Promise<AddressBookItem> => {
    setSubmitting(true);
    try {
      const validation = validateAddressFormat(values.walletAddress, values.network);
      if (!validation.isValid) {
        throw new Error(validation.message || "Invalid address");
      }

      // Simulated persistence. Replace with API call when available
      const newItem: AddressBookItem = {
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        ...values,
      };

      // TODO: integrate with backend/redux slice when available
      return newItem;
    } finally {
      setSubmitting(false);
    }
  }, [values]);

  return {
    values,
    setAsset,
    setNetwork,
    setWalletAddress,
    setWalletLabel,
    canSubmit,
    submitting,
    reset,
    submit,
  };
}



