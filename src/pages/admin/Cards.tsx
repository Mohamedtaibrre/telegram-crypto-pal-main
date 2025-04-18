import React, { useState, useEffect } from 'react';
import { getCards, updateCardStatus, deleteCard } from '../../services/adminService';
import { toast } from '@/components/ui/use-toast';

const Cards = () => {
  const [cards, setCards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCards();
  }, []);

  const loadCards = async () => {
    try {
      setLoading(true);
      const cardsData = await getCards();
      setCards(cardsData);
    } catch (error: any) {
      toast({
        title: 'خطأ في تحميل البطاقات',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCardStatus = async (cardId: string, status: 'active' | 'blocked') => {
    try {
      await updateCardStatus(cardId, status);
      await loadCards();
      toast({
        title: 'تم تحديث حالة البطاقة',
        description: 'تم تحديث حالة البطاقة بنجاح',
      });
    } catch (error: any) {
      toast({
        title: 'خطأ في تحديث حالة البطاقة',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleDeleteCard = async (cardId: string) => {
    if (!window.confirm('هل أنت متأكد من حذف هذه البطاقة؟')) return;

    try {
      await deleteCard(cardId);
      await loadCards();
      toast({
        title: 'تم حذف البطاقة',
        description: 'تم حذف البطاقة بنجاح',
      });
    } catch (error: any) {
      toast({
        title: 'خطأ في حذف البطاقة',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-crypto-dark">
        <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">إدارة البطاقات</h2>
      <div className="grid gap-4">
        {cards.map(card => (
          <div key={card.id} className="bg-crypto-darker p-4 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold">{card.cardNumber}</p>
                <p className="text-sm text-gray-400">
                  الرصيد: {card.balance} {card.currency}
                </p>
              </div>
              <div className="space-x-2 rtl:space-x-reverse">
                <button
                  onClick={() => handleCardStatus(card.id, card.status === 'active' ? 'blocked' : 'active')}
                  className={`px-4 py-2 rounded-lg ${
                    card.status === 'active' ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                  }`}
                >
                  {card.status === 'active' ? 'حظر' : 'تفعيل'}
                </button>
                <button
                  onClick={() => handleDeleteCard(card.id)}
                  className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600"
                >
                  حذف
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;
