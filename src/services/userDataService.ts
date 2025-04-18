
// This file now acts as a centralized export point for all services

// Export types
export * from './types/userTypes';

// Export user services
export { getUserData, saveUserData } from './userService';

// Export wallet services
export { 
  getUserWallets, 
  updateWalletBalance, 
  updateFiatBalance, 
  connectExternalWallet, 
  getConnectedWallets 
} from './walletService';

// Export transaction services
export { 
  addTransaction, 
  getUserTransactions 
} from './transactionService';

// Export utility functions
export { 
  getDefaultNetwork, 
  getDefaultUserData 
} from './utils/walletUtils';
