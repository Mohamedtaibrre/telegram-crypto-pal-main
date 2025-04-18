
export interface Transaction {
  id: string;
  userId: string;
  type: 'send' | 'receive' | 'swap' | 'stake' | 'unstake' | 'buy' | 'sell' | 'fiat_deposit' | 'fiat_withdrawal' | 'admin_withdrawal';
  amount: number | string;
  token: string;
  timestamp: number;
  status: 'pending' | 'completed' | 'failed';
  fromAddress?: string;
  toAddress?: string;
  network?: string;
  txHash?: string;
  note?: string;
  feeAmount?: string;
  feeToken?: string;
}

export interface UserWallet {
  token: string;
  balance: string;
  network: string;
  address?: string;
  isExternal?: boolean;
}

export interface UserProfile {
  username?: string;
  firstName?: string;
  lastName?: string;
  photoUrl?: string;
  lastLogin?: string;
  createdAt?: string;
}

export interface UserData {
  wallets: UserWallet[];
  transactions: Transaction[];
  settings: Record<string, any>;
  connectedWallets?: string[];
  fiatBalance?: number;
  profile?: UserProfile;
}
