
import { UserWallet } from './types/userTypes';
import { getUserData, saveUserData } from './userService';
import { getDefaultNetwork } from './utils/walletUtils';

// Get user wallets
export const getUserWallets = async (telegramId: string): Promise<UserWallet[]> => {
  try {
    const userData = await getUserData(telegramId);
    return userData.wallets;
  } catch (error) {
    console.error('Failed to get user wallets:', error);
    return [];
  }
};

// Update wallet balance
export const updateWalletBalance = async (
  telegramId: string,
  token: string,
  newBalance: string,
  network?: string
): Promise<void> => {
  try {
    const userData = await getUserData(telegramId);
    
    // Find the specific wallet to update
    let walletIndex = -1;
    if (network) {
      walletIndex = userData.wallets.findIndex(wallet => wallet.token === token && wallet.network === network);
    } else {
      walletIndex = userData.wallets.findIndex(wallet => wallet.token === token);
    }
    
    // Update or add the wallet
    if (walletIndex !== -1) {
      userData.wallets[walletIndex].balance = newBalance;
    } else {
      userData.wallets.push({
        token,
        balance: newBalance,
        network: network || getDefaultNetwork(token)
      });
    }
    
    await saveUserData(telegramId, userData);
  } catch (error) {
    console.error('Failed to update wallet balance:', error);
  }
};

// Update fiat balance
export const updateFiatBalance = async (
  telegramId: string,
  amount: number,
  isAdd: boolean = true
): Promise<void> => {
  try {
    const userData = await getUserData(telegramId);
    
    if (userData.fiatBalance === undefined) {
      userData.fiatBalance = 0;
    }
    
    if (isAdd) {
      userData.fiatBalance += amount;
    } else {
      userData.fiatBalance = Math.max(0, userData.fiatBalance - amount);
    }
    
    await saveUserData(telegramId, userData);
  } catch (error) {
    console.error('Failed to update fiat balance:', error);
  }
};

// Connect external wallet
export const connectExternalWallet = async (
  telegramId: string,
  walletName: string
): Promise<void> => {
  try {
    const userData = await getUserData(telegramId);
    
    if (!userData.connectedWallets) {
      userData.connectedWallets = [];
    }
    
    if (!userData.connectedWallets.includes(walletName)) {
      userData.connectedWallets.push(walletName);
    }
    
    await saveUserData(telegramId, userData);
  } catch (error) {
    console.error('Failed to connect external wallet:', error);
  }
};

// Get connected wallets
export const getConnectedWallets = async (telegramId: string): Promise<string[]> => {
  try {
    const userData = await getUserData(telegramId);
    return userData.connectedWallets || [];
  } catch (error) {
    console.error('Failed to get connected wallets:', error);
    return [];
  }
};
