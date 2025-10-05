// Address form domain types
// NOTE: All components and hooks must import from this file for consistency

export type SupportedAssetSymbol = "USDC" | "USDT" | "ETH" | "BTC";

export type SupportedNetwork =
  | "Ethereum"
  | "Polygon"
  | "Arbitrum"
  | "Optimism"
  | "Stellar";

export interface AddressFormValues {
  asset: SupportedAssetSymbol;
  network: SupportedNetwork;
  walletAddress: string;
  walletLabel: string;
}

export interface AddressBookItem extends AddressFormValues {
  id: string;
  createdAt: string;
}

export interface AddressValidationResult {
  isValid: boolean;
  message?: string;
}



