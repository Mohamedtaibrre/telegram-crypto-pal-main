
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getUserData, saveUserData } from '../services/userService';
import { UserData } from '../services/types/userTypes';

interface User {
  id: string;
  telegramId: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  photoUrl?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (telegramId: string, userData?: Partial<User>) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for saved user data in localStorage on initial load
    const savedUser = localStorage.getItem('mtg_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Failed to parse user data:', error);
        localStorage.removeItem('mtg_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (telegramId: string, userData?: Partial<User>) => {
    try {
      setIsLoading(true);
      
      // Get or create user data from Firestore
      const userDataFromDb = await getUserData(telegramId);
      
      const newUser: User = {
        id: userData?.id || `user_${Date.now()}`,
        telegramId,
        username: userData?.username,
        firstName: userData?.firstName,
        lastName: userData?.lastName,
        photoUrl: userData?.photoUrl,
      };
      
      // Save user data to Firestore if it's a new user or data has changed
      await saveUserData(telegramId, {
        ...userDataFromDb,
        profile: {
          username: userData?.username,
          firstName: userData?.firstName,
          lastName: userData?.lastName,
          photoUrl: userData?.photoUrl,
          lastLogin: new Date().toISOString(),
        }
      } as UserData);
      
      setUser(newUser);
      localStorage.setItem('mtg_user', JSON.stringify(newUser));
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to login:', error);
      setIsLoading(false);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mtg_user');
    setIsLoading(false);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthProvider;
