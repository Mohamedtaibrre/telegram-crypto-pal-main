export interface VirtualCard {
  id: string;
  userId: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  balance: string;
  currency: string;
  status: 'active' | 'frozen' | 'expired';
  createdAt: string;
  lastUsed?: string;
  transactions: CardTransaction[];
}

export interface CardTransaction {
  id: string;
  cardId: string;
  userId: string;
  type: 'topup' | 'purchase' | 'refund';
  amount: string;
  merchant?: string;
  description?: string;
  status: 'pending' | 'completed' | 'failed';
  timestamp: number;
}

export interface CardSettings {
  maxBalance: string;
  minTopup: string;
  maxTopup: string;
  monthlyLimit: string;
  dailyLimit: string;
  transactionLimit: string;
  allowedCountries: string[];
  allowedMerchants: string[];
  blockedMerchants: string[];
}

export interface CardTopupRequest {
  cardId: string;
  userId: string;
  amount: string;
  mtgAmount: string;
  timestamp: number;
  status: 'pending' | 'completed' | 'failed';
}
