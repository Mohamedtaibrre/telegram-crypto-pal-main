import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getTelegramUser, initTelegramApp } from '../utils/telegramAuth';

interface TelegramUser {
  telegramId: string;
  username: string;
  firstName: string;
  lastName: string;
  photoUrl: string;
}

const TelegramAutoLogin: React.FC = () => {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleLogin = async () => {
      try {
        // Initialize Telegram WebApp
        initTelegramApp();

        const telegramUser: TelegramUser | null = await getTelegramUser();
        if (telegramUser) {
          await login(telegramUser.telegramId, {
            telegramId: telegramUser.telegramId,
            username: telegramUser.username,
            firstName: telegramUser.firstName,
            lastName: telegramUser.lastName,
            photoUrl: telegramUser.photoUrl,
          });
        } else {
          setError('Failed to get Telegram user data');
        }
      } catch (err) {
        console.error('Login error:', err);
        setError('Failed to login');
      } finally {
        setIsLoading(false);
      }
    };

    handleLogin();
  }, [login]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Connecting to Telegram...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center p-4 bg-red-50 rounded-lg">
          <p className="text-red-600">Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default TelegramAutoLogin;
