import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { VirtualCard as VirtualCardType, CardTransaction } from '../services/types/cardTypes';
import { createVirtualCard, getVirtualCard, topUpCard, freezeCard, unfreezeCard, getCardTransactions } from '../services/cardService';

const VirtualCard: React.FC = () => {
  const { user } = useAuth();
  const [card, setCard] = useState<VirtualCardType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [topupAmount, setTopupAmount] = useState('');
  const [transactions, setTransactions] = useState<CardTransaction[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCard = async () => {
      if (!user) return;
      
      try {
        let userCard = await getVirtualCard(user.telegramId);
        if (!userCard) {
          userCard = await createVirtualCard(user.telegramId);
        }
        setCard(userCard);
        const cardTransactions = await getCardTransactions(userCard.id);
        setTransactions(cardTransactions);
      } catch (err) {
        console.error('Error loading card:', err);
        setError('Failed to load card data');
      } finally {
        setIsLoading(false);
      }
    };

    loadCard();
  }, [user]);

  const handleTopup = async () => {
    if (!card || !user) return;

    try {
      // Calculate MTG amount (example rate: 1 USD = 2 MTG)
      const mtgAmount = (parseFloat(topupAmount) * 2).toString();
      await topUpCard(card.id, user.telegramId, topupAmount, mtgAmount);
      // Reset form and show success message
      setTopupAmount('');
      // You might want to reload the card data here
    } catch (err) {
      console.error('Topup error:', err);
      setError('Failed to process topup request');
    }
  };

  const handleFreeze = async () => {
    if (!card) return;
    try {
      await freezeCard(card.id);
      setCard(prev => prev ? { ...prev, status: 'frozen' } : null);
    } catch (err) {
      console.error('Freeze error:', err);
      setError('Failed to freeze card');
    }
  };

  const handleUnfreeze = async () => {
    if (!card) return;
    try {
      await unfreezeCard(card.id);
      setCard(prev => prev ? { ...prev, status: 'active' } : null);
    } catch (err) {
      console.error('Unfreeze error:', err);
      setError('Failed to unfreeze card');
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

  if (!card) {
    return (
      <div className="p-4 text-center">
        <p>No virtual card found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Card Display */}
      <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-xl p-6 shadow-lg">
        <div className="absolute top-4 right-4">
          <img src="/visa-white.png" alt="VISA" className="h-8" />
        </div>
        <div className="space-y-4">
          <div className="text-2xl font-mono">{card.cardNumber.replace(/(\d{4})/g, '$1 ').trim()}</div>
          <div className="flex justify-between">
            <div>
              <div className="text-xs opacity-70">VALID THRU</div>
              <div>{card.expiryDate}</div>
            </div>
            <div>
              <div className="text-xs opacity-70">CVV</div>
              <div>***</div>
            </div>
          </div>
          <div className="pt-4">
            <div className="text-xs opacity-70">BALANCE</div>
            <div className="text-xl">${card.balance}</div>
          </div>
        </div>
      </div>

      {/* Card Controls */}
      <div className="flex gap-4">
        {card.status === 'active' ? (
          <button
            onClick={handleFreeze}
            className="flex-1 py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Freeze Card
          </button>
        ) : (
          <button
            onClick={handleUnfreeze}
            className="flex-1 py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
          >
            Unfreeze Card
          </button>
        )}
      </div>

      {/* Topup Form */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Top Up Card</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Amount (USD)</label>
            <input
              type="number"
              value={topupAmount}
              onChange={(e) => setTopupAmount(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter amount"
              min="0"
            />
          </div>
          <button
            onClick={handleTopup}
            disabled={!topupAmount || parseFloat(topupAmount) <= 0}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:bg-gray-400"
          >
            Top Up
          </button>
        </div>
      </div>

      {/* Transactions */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
        <div className="space-y-2">
          {transactions.length === 0 ? (
            <p className="text-gray-500">No transactions yet</p>
          ) : (
            transactions.map(tx => (
              <div key={tx.id} className="flex justify-between items-center py-2 border-b">
                <div>
                  <div className="font-medium">{tx.merchant || tx.type}</div>
                  <div className="text-sm text-gray-500">
                    {new Date(tx.timestamp).toLocaleDateString()}
                  </div>
                </div>
                <div className={tx.type === 'topup' ? 'text-green-600' : 'text-red-600'}>
                  {tx.type === 'topup' ? '+' : '-'}${tx.amount}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default VirtualCard;
