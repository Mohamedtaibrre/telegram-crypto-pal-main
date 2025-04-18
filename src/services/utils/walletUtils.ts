
import { UserData, Transaction, UserWallet } from '../types/userTypes';

// Helper function to get default network for a token
export const getDefaultNetwork = (token: string): string => {
  const networkMap: {[key: string]: string} = {
    "MTG": "BNB Smart Chain",
    "BNB": "BNB Smart Chain",
    "ETH": "Ethereum",
    "USDT": "BNB Smart Chain",
    "USDC": "BNB Smart Chain",
    "SOL": "Solana",
    "TON": "TON Network",
    "TRX": "Tron"
  };
  
  return networkMap[token] || "BNB Smart Chain";
};

// Create default user data
export const getDefaultUserData = (telegramId: string): UserData => {
  const wallets: UserWallet[] = [
    {
      token: 'MTG',
      balance: '100',
      network: 'BNB Smart Chain'
    },
    {
      token: 'BNB',
      balance: '0.1',
      network: 'BNB Smart Chain'
    },
    {
      token: 'USDT',
      balance: '50',
      network: 'BNB Smart Chain'
    },
    {
      token: 'ETH',
      balance: '0.01',
      network: 'Ethereum'
    },
    {
      token: 'TON',
      balance: '5',
      network: 'TON Network'
    }
  ];

  const transactions: Transaction[] = [
    {
      id: `tx_${Date.now() - 86400000}`,
      userId: telegramId,
      type: 'receive',
      amount: '100',
      token: 'MTG',
      timestamp: Date.now() - 86400000,
      status: 'completed',
      note: 'Welcome bonus'
    }
  ];

  return {
    wallets,
    transactions,
    settings: {
      language: 'ar',
      currency: 'USD',
      theme: 'dark'
    },
    fiatBalance: 0,
    profile: {
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString()
    }
  };
};
