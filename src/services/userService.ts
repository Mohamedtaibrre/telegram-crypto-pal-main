
import { db } from '../config/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { UserData } from './types/userTypes';
import { getDefaultUserData } from './utils/walletUtils';

// Collection reference
const USERS_COLLECTION = 'users';

// Get user data from Firestore
export const getUserData = async (telegramId: string): Promise<UserData> => {
  try {
    const userDocRef = doc(db, USERS_COLLECTION, telegramId);
    const userDoc = await getDoc(userDocRef);
    
    if (userDoc.exists()) {
      return userDoc.data() as UserData;
    } else {
      // Create default user data if not exists
      const defaultData = getDefaultUserData(telegramId);
      defaultData.profile = {
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
      };
      await setDoc(userDocRef, defaultData);
      return defaultData;
    }
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    return getDefaultUserData(telegramId);
  }
};

// Save user data to Firestore
export const saveUserData = async (telegramId: string, data: UserData): Promise<void> => {
  try {
    const userDocRef = doc(db, USERS_COLLECTION, telegramId);
    await setDoc(userDocRef, data);
  } catch (error) {
    console.error('Failed to save user data:', error);
  }
};
