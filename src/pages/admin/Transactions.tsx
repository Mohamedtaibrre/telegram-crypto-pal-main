import React, { useState, useEffect } from 'react';
import { getTransactions, updateTransactionStatus } from '../../services/adminService';
import { toast } from '@/components/ui/use-toast';

const Transactions = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      setLoading(true);
      const txData = await getTransactions();
      setTransactions(txData);
    } catch (error: any) {
      toast({
        title: 'خطأ في تحميل المعاملات',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (txId: string, status: 'pending' | 'completed' | 'failed') => {
    try {
      await updateTransactionStatus(txId, status);
      await loadTransactions();
      toast({
        title: 'تم تحديث حالة المعاملة',
        description: 'تم تحديث حالة المعاملة بنجاح',
      });
    } catch (error: any) {
      toast({
        title: 'خطأ في تحديث حالة المعاملة',
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
      <h2 className="text-2xl font-bold">المعاملات</h2>
      <div className="grid gap-4">
        {transactions.map(tx => (
          <div key={tx.id} className="bg-crypto-darker p-4 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <span className="font-semibold">
                    {tx.type === 'send' ? 'إرسال' : tx.type === 'receive' ? 'استلام' : 'تبديل'}
                  </span>
                  <span className={`px-2 py-1 rounded text-sm ${
                    tx.status === 'completed' ? 'bg-green-500/20 text-green-500' :
                    tx.status === 'failed' ? 'bg-red-500/20 text-red-500' :
                    'bg-amber-500/20 text-amber-500'
                  }`}>
                    {tx.status === 'completed' ? 'مكتمل' :
                     tx.status === 'failed' ? 'فشل' : 'معلق'}
                  </span>
                </div>
                <p className="text-sm text-gray-400 mt-1">
                  {tx.amount} {tx.currency}
                </p>
                <p className="text-sm text-gray-400">
                  {new Date(tx.timestamp).toLocaleString('ar-SA')}
                </p>
              </div>
              <div className="space-x-2 rtl:space-x-reverse">
                {tx.status === 'pending' && (
                  <>
                    <button
                      onClick={() => handleStatusUpdate(tx.id, 'completed')}
                      className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600"
                    >
                      قبول
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(tx.id, 'failed')}
                      className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600"
                    >
                      رفض
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Transactions;
