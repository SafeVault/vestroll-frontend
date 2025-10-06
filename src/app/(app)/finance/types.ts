// types.ts

// Updated statuses to match the design's badges
export type TransactionStatus = 'Successful' | 'Pending' | 'Failed';

export interface Transaction {
  id: string; // Used for React keys and Transaction ID column
  transactionId: string; // Shortened ID for display (e.g., "0x6885afa...63b3")
  description: string;
  amount: number;
  asset: 'USDT' | 'ETH' | 'BTC' | 'KES'; // Replaced 'currency' with 'asset'
  status: TransactionStatus;
  timestamp: string; // Replaced 'date' and 'time' with 'timestamp'
}