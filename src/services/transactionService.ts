
import { db } from '../config/firebase';
import { collection, addDoc, query, where, getDocs, orderBy } from 'firebase/firestore';
import { Transaction } from './types/userTypes';
import { getUserData, saveUserData } from './userService';

// Collection reference
const TRANSACTIONS_COLLECTION = 'transactions';

// Add a transaction
export const addTransaction = async (
  telegramId: string, 
  transaction: Omit<Transaction, 'id' | 'userId' | 'timestamp'>
): Promise<Transaction> => {
  try {
    const newTransaction: Transaction = {
      ...transaction,
      id: `tx_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      userId: telegramId,
      timestamp: Date.now()
    };
    
    // Add to transactions collection
    const transactionsCollectionRef = collection(db, TRANSACTIONS_COLLECTION);
    await addDoc(transactionsCollectionRef, newTransaction);
    
    // Update user's transactions list
    const userData = await getUserData(telegramId);
    userData.transactions.unshift(newTransaction);
    await saveUserData(telegramId, userData);
    
    return newTransaction;
  } catch (error) {
    console.error('Failed to add transaction:', error);
    throw error;
  }
};

// Get user transactions
export const getUserTransactions = async (telegramId: string): Promise<Transaction[]> => {
  try {
    const transactionsCollectionRef = collection(db, TRANSACTIONS_COLLECTION);
    const q = query(
      transactionsCollectionRef, 
      where('userId', '==', telegramId),
      orderBy('timestamp', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const transactions: Transaction[] = [];
    
    querySnapshot.forEach((doc) => {
      transactions.push(doc.data() as Transaction);
    });
    
    return transactions;
  } catch (error) {
    console.error('Failed to get user transactions:', error);
    
    // Fallback to local data
    const userData = await getUserData(telegramId);
    return userData.transactions;
  }
};
