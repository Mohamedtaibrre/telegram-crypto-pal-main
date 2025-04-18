import { db, rtdb } from '../config/firebase';
import { collection, doc, getDocs, updateDoc, deleteDoc, query, where } from 'firebase/firestore';
import { ref, set, get } from 'firebase/database';

// User Management
export const getUsers = async () => {
  const usersRef = collection(db, 'users');
  const snapshot = await getDocs(usersRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const updateUserStatus = async (userId: string, status: 'active' | 'blocked') => {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, { status });
};

// Transaction Management
export const getTransactions = async () => {
  const txRef = collection(db, 'transactions');
  const snapshot = await getDocs(txRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const updateTransactionStatus = async (txId: string, status: 'pending' | 'completed' | 'failed') => {
  const txRef = doc(db, 'transactions', txId);
  await updateDoc(txRef, { status });
};

// Card Management
export const getCards = async () => {
  const cardsRef = collection(db, 'cards');
  const snapshot = await getDocs(cardsRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const updateCardStatus = async (cardId: string, status: 'active' | 'blocked') => {
  const cardRef = doc(db, 'cards', cardId);
  await updateDoc(cardRef, { status });
};

export const deleteCard = async (cardId: string) => {
  await deleteDoc(doc(db, 'cards', cardId));
};

// Platform Settings
export const updatePlatformSettings = async (settings: {
  maintenanceMode: boolean;
  fees: { swap: number; transfer: number };
  limits: { daily: number; monthly: number };
}) => {
  const settingsRef = ref(rtdb, 'settings');
  await set(settingsRef, settings);
};

export const getPlatformSettings = async () => {
  const settingsRef = ref(rtdb, 'settings');
  const snapshot = await get(settingsRef);
  return snapshot.val();
};

// Rewards Management
export const getRewards = async () => {
  const rewardsRef = collection(db, 'rewards');
  const snapshot = await getDocs(rewardsRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const updateReward = async (rewardId: string, data: any) => {
  const rewardRef = doc(db, 'rewards', rewardId);
  await updateDoc(rewardRef, data);
};

// Analytics
export const getAnalytics = async () => {
  const [users, transactions, cards] = await Promise.all([
    getUsers(),
    getTransactions(),
    getCards()
  ]);

  return {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.status === 'active').length,
    totalTransactions: transactions.length,
    totalVolume: transactions.reduce((acc: number, tx: any) => acc + (tx.amount || 0), 0),
    activeCards: cards.filter(c => c.status === 'active').length
  };
};
