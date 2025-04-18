import React, { useEffect, useState } from 'react';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { VirtualCard, CardSettings } from '../../services/types/cardTypes';
import { getCardSettings, updateCardSettings } from '../../services/cardService';

const CardManagement: React.FC = () => {
  const [cards, setCards] = useState<VirtualCard[]>([]);
  const [settings, setSettings] = useState<CardSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Load all cards
        const cardsRef = collection(db, 'virtual_cards');
        const cardsSnapshot = await getDocs(query(cardsRef));
        const cardsData = cardsSnapshot.docs
          .map(doc => doc.data() as VirtualCard)
          .filter(card => card.id); // Filter out settings document

        setCards(cardsData);

        // Load settings
        const cardSettings = await getCardSettings();
        setSettings(cardSettings);
      } catch (err) {
        console.error('Error loading data:', err);
        setError('Failed to load data');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleSettingsUpdate = async (field: keyof CardSettings, value: string | string[]) => {
    if (!settings) return;

    try {
      const updatedSettings = { ...settings, [field]: value };
      await updateCardSettings({ [field]: value });
      setSettings(updatedSettings);
    } catch (err) {
      console.error('Error updating settings:', err);
      setError('Failed to update settings');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-8">
      {/* Card Settings */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6">Card Settings</h2>
        {settings && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Maximum Balance (USD)</label>
              <input
                type="number"
                value={settings.maxBalance}
                onChange={(e) => handleSettingsUpdate('maxBalance', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Minimum Top-up (USD)</label>
              <input
                type="number"
                value={settings.minTopup}
                onChange={(e) => handleSettingsUpdate('minTopup', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Maximum Top-up (USD)</label>
              <input
                type="number"
                value={settings.maxTopup}
                onChange={(e) => handleSettingsUpdate('maxTopup', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Daily Limit (USD)</label>
              <input
                type="number"
                value={settings.dailyLimit}
                onChange={(e) => handleSettingsUpdate('dailyLimit', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Monthly Limit (USD)</label>
              <input
                type="number"
                value={settings.monthlyLimit}
                onChange={(e) => handleSettingsUpdate('monthlyLimit', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Transaction Limit (USD)</label>
              <input
                type="number"
                value={settings.transactionLimit}
                onChange={(e) => handleSettingsUpdate('transactionLimit', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        )}
      </div>

      {/* Active Cards */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6">Active Cards ({cards.length})</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Card Number</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Used</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {cards.map((card) => (
                <tr key={card.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{card.userId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{card.cardNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${card.balance}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      card.status === 'active' ? 'bg-green-100 text-green-800' :
                      card.status === 'frozen' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {card.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(card.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {card.lastUsed ? new Date(card.lastUsed).toLocaleDateString() : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CardManagement;
