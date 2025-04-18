
import React, { useState } from 'react';
import { LockIcon, UnlockIcon, CalendarIcon, TrendingUp } from 'lucide-react';
import { Input } from '@/components/ui/input';

const CoinLock = () => {
  const [amount, setAmount] = useState('');
  const [duration, setDuration] = useState('30');
  
  const calculateReward = () => {
    const amountNum = parseFloat(amount) || 0;
    const durationNum = parseInt(duration) || 0;
    
    let apy = 0;
    if (durationNum === 30) apy = 5.2;
    if (durationNum === 90) apy = 7.5;
    if (durationNum === 180) apy = 10.3;
    if (durationNum === 365) apy = 15.8;
    
    const reward = amountNum * (apy / 100) * (durationNum / 365);
    return reward.toFixed(2);
  };

  return (
    <div className="space-y-6">
      <div className="bg-crypto-card rounded-lg p-6 text-center">
        <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <LockIcon className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-xl font-bold mb-2">قفل عملات MTG</h2>
        <p className="text-gray-400 mb-6">قفل عملاتك MTG لفترة محددة واحصل على عوائد مضمونة</p>
        
        <div className="space-y-4">
          <div>
            <label className="block text-start text-sm text-gray-400 mb-1">المبلغ (MTG)</label>
            <Input
              type="number"
              placeholder="أدخل المبلغ"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-crypto-dark border-gray-700 text-white"
            />
          </div>
          
          <div>
            <label className="block text-start text-sm text-gray-400 mb-1">مدة القفل</label>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full bg-crypto-dark border border-gray-700 text-white rounded-md h-10 px-3"
            >
              <option value="30">30 يوم (APY 5.2%)</option>
              <option value="90">90 يوم (APY 7.5%)</option>
              <option value="180">180 يوم (APY 10.3%)</option>
              <option value="365">365 يوم (APY 15.8%)</option>
            </select>
          </div>
          
          <div className="bg-crypto-dark p-4 rounded-lg">
            <div className="flex justify-between mb-2">
              <span className="text-gray-400">المبلغ المقفل:</span>
              <span className="text-white">{amount || '0'} MTG</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-400">مدة القفل:</span>
              <span className="text-white">{duration} يوم</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">العائد المتوقع:</span>
              <span className="text-amber-500">{calculateReward()} MTG</span>
            </div>
          </div>
          
          <button className="bg-amber-500 hover:bg-amber-600 text-white py-3 px-5 rounded-lg w-full flex items-center justify-center transition-colors">
            <LockIcon className="w-5 h-5 mr-2" />
            قفل العملات
          </button>
        </div>
      </div>
      
      <div className="bg-crypto-card rounded-lg p-4">
        <h3 className="font-medium mb-3">العملات المقفلة</h3>
        <div className="text-center py-6 text-gray-400">
          ليس لديك أي عملات مقفلة حاليًا
        </div>
      </div>
      
      <div className="bg-crypto-card rounded-lg p-4">
        <h3 className="font-medium mb-3">مزايا قفل العملة</h3>
        <div className="space-y-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center mr-3">
              <TrendingUp className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <h4 className="font-medium">عوائد جذابة</h4>
              <p className="text-sm text-gray-400">احصل على APY يصل إلى 15.8% عند قفل عملاتك</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center mr-3">
              <UnlockIcon className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <h4 className="font-medium">مرونة متعددة</h4>
              <p className="text-sm text-gray-400">اختر من بين مدد مختلفة لتناسب احتياجاتك</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center mr-3">
              <CalendarIcon className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <h4 className="font-medium">دفعات منتظمة</h4>
              <p className="text-sm text-gray-400">يتم احتساب العوائد يوميًا وتوزيعها عند انتهاء فترة القفل</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinLock;
