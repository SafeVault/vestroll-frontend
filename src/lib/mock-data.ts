// lib/mockData.ts

import { Asset, Transaction } from "@/types/finance.types";

export const MOCK_ASSETS: Asset[] = [
  {
    id: 1,
    name: 'Tether USD',
    symbol: 'USDT',
    balance: '$476.19',
    amount: '581 USDT',
    price: '$1.00',
    change: '-0.0018%',
    icon: '/tether-icon.svg',
    bgColor: 'bg-[#26A17B]'
  },
  {
    id: 2,
    name: 'DAI',
    symbol: 'DAI',
    balance: '$476.19',
    amount: '581 USDT',
    price: '$1.00',
    change: '-0.0018%',
    icon: '/dai-icon.svg',
    bgColor: 'bg-[#F5AC37]'
  },
  {
    id: 3,
    name: 'USDC',
    symbol: 'USDC',
    balance: '$476.19',
    amount: '581 USDT',
    price: '$1.00',
    change: '-0.0018%',
    icon: '/usdc-icon.svg',
    bgColor: 'bg-[#2775CA]'
  },
  {
    id: 4,
    name: 'BNB',
    symbol: 'BNB',
    balance: '$476.19',
    amount: '581 USDT',
    price: '$1.00',
    change: '-0.0018%',
    icon: '/bnb-icon.svg',
    bgColor: 'bg-[#F3BA2F]'
  }
];

export const generateMockTransactions = (count: number = 80): Transaction[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `0x6885afa...63b3`,
    description: 'MintForge Bug fixes and performance updates',
    amount: '$1,200.00',
    asset: 'USDT',
    status: i === 0 ? 'Pending' : i === 1 ? 'Failed' : 'Successful',
    timestamp: '25th Oct 2025 | 2:00pm'
  }));
};