import { collection, doc, getDoc, getDocs, setDoc, updateDoc, query, where } from 'firebase/firestore';
import { ref, set, get, update, push } from 'firebase/database';
import { db, rtdb } from '../config/firebase';
import { VirtualCard, CardTransaction, CardSettings, CardTopupRequest } from './types/cardTypes';

const CARDS_COLLECTION = 'virtual_cards';
const CARD_SETTINGS_DOC = 'settings';
const TOPUP_REQUESTS_COLLECTION = 'card_topup_requests';

// Generate a random card number that starts with 4 (VISA)
const generateCardNumber = (): string => {
  const prefix = '4';
  const remainingLength = 15;
  let number = prefix;
  for (let i = 0; i < remainingLength; i++) {
    number += Math.floor(Math.random() * 10);
  }
  return number;
};

// Generate expiry date 3 years from now
const generateExpiryDate = (): string => {
  const date = new Date();
  date.setFullYear(date.getFullYear() + 3);
  return `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear().toString().slice(-2)}`;
};

// Generate random CVV
const generateCVV = (): string => {
  return Math.floor(Math.random() * 900 + 100).toString();
};

export const createVirtualCard = async (userId: string): Promise<VirtualCard> => {
  const cardDoc = doc(collection(db, CARDS_COLLECTION));
  const newCard: VirtualCard = {
    id: cardDoc.id,
    userId,
    cardNumber: generateCardNumber(),
    expiryDate: generateExpiryDate(),
    cvv: generateCVV(),
    balance: '0',
    currency: 'USD',
    status: 'active',
    createdAt: new Date().toISOString(),
    transactions: []
  };

  // Save to Firestore for main data
  await setDoc(cardDoc, newCard);

  // Save to Realtime Database for real-time updates
  await set(ref(rtdb, `cards/${cardDoc.id}`), {
    balance: newCard.balance,
    status: newCard.status,
    lastUpdated: new Date().toISOString()
  });

  return newCard;
};

export const getVirtualCard = async (userId: string): Promise<VirtualCard | null> => {
  const cardsRef = collection(db, CARDS_COLLECTION);
  const q = query(cardsRef, where('userId', '==', userId));
  const querySnapshot = await getDocs(q);
  
  if (querySnapshot.empty) {
    return null;
  }

  return querySnapshot.docs[0].data() as VirtualCard;
};

export const topUpCard = async (cardId: string, userId: string, amount: string, mtgAmount: string): Promise<CardTopupRequest> => {
  // Create request in Firestore
  const requestDoc = doc(collection(db, TOPUP_REQUESTS_COLLECTION));
  const request: CardTopupRequest = {
    cardId,
    userId,
    amount,
    mtgAmount,
    timestamp: Date.now(),
    status: 'pending'
  };

  await setDoc(requestDoc, request);

  // Update real-time balance in RTDB
  const cardRef = ref(rtdb, `cards/${cardId}`);
  const cardSnapshot = await get(cardRef);
  const currentBalance = cardSnapshot.val()?.balance || '0';
  const newBalance = (parseFloat(currentBalance) + parseFloat(amount)).toString();

  await update(cardRef, {
    balance: newBalance,
    lastUpdated: new Date().toISOString()
  });

  return request;
};

export const getCardSettings = async (): Promise<CardSettings> => {
  const settingsDoc = await getDoc(doc(db, CARDS_COLLECTION, CARD_SETTINGS_DOC));
  if (!settingsDoc.exists()) {
    const defaultSettings: CardSettings = {
      maxBalance: '10000',
      minTopup: '10',
      maxTopup: '1000',
      monthlyLimit: '5000',
      dailyLimit: '500',
      transactionLimit: '200',
      allowedCountries: ['US', 'UK', 'EU', 'AE', 'SA'],
      allowedMerchants: [],
      blockedMerchants: []
    };
    await setDoc(doc(db, CARDS_COLLECTION, CARD_SETTINGS_DOC), defaultSettings);
    return defaultSettings;
  }
  return settingsDoc.data() as CardSettings;
};

export const updateCardSettings = async (settings: Partial<CardSettings>): Promise<void> => {
  await updateDoc(doc(db, CARDS_COLLECTION, CARD_SETTINGS_DOC), settings);
};

export const freezeCard = async (cardId: string): Promise<void> => {
  await updateDoc(doc(db, CARDS_COLLECTION, cardId), {
    status: 'frozen'
  });
};

export const unfreezeCard = async (cardId: string): Promise<void> => {
  await updateDoc(doc(db, CARDS_COLLECTION, cardId), {
    status: 'active'
  });
};

export const getCardTransactions = async (cardId: string): Promise<CardTransaction[]> => {
  const cardDoc = await getDoc(doc(db, CARDS_COLLECTION, cardId));
  if (!cardDoc.exists()) {
    return [];
  }
  const card = cardDoc.data() as VirtualCard;
  return card.transactions || [];
};

export const addCardTransaction = async (cardId: string, transaction: Omit<CardTransaction, 'id'>): Promise<void> => {
  // Add transaction to Firestore
  const cardDoc = doc(db, CARDS_COLLECTION, cardId);
  const cardData = await getDoc(cardDoc);

  if (!cardData.exists()) {
    throw new Error('Card not found');
  }

  const card = cardData.data() as VirtualCard;
  const newTransaction: CardTransaction = {
    ...transaction,
    id: Date.now().toString()
  };

  const updatedTransactions = [...card.transactions, newTransaction];
  await updateDoc(cardDoc, { transactions: updatedTransactions });

  // Add transaction to RTDB for real-time updates
  const transactionRef = ref(rtdb, `transactions/${cardId}`);
  await push(transactionRef, {
    ...newTransaction,
    timestamp: new Date().toISOString()
  });

  // Update card balance in RTDB
  const cardRef = ref(rtdb, `cards/${cardId}`);
  const cardSnapshot = await get(cardRef);
  const currentBalance = cardSnapshot.val()?.balance || '0';
  const newBalance = (parseFloat(currentBalance) - parseFloat(transaction.amount)).toString();

  await update(cardRef, {
    balance: newBalance,
    lastUpdated: new Date().toISOString()
  });
};
