
import React, { useState } from 'react';
import { ArrowLeft, Gift, Trophy, Star, Calendar, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import RewardCard from '@/components/rewards/RewardCard';
import RewardsTasks from '@/components/rewards/RewardsTasks';
import ReferralSystem from '@/components/rewards/ReferralSystem';
import CoinLock from '@/components/rewards/CoinLock';

const Rewards = () => {
  const [activeTab, setActiveTab] = useState('rewards');
  
  return (
    <div className="min-h-screen bg-crypto-dark text-white flex flex-col">
      <div className="flex items-center p-4 border-b border-gray-800">
        <Link to="/" className="mr-4">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-xl font-bold">المكافآت والإحالات</h1>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-800">
        <button
          className={`flex-1 py-3 text-center ${activeTab === 'rewards' ? 'text-amber-500 border-b-2 border-amber-500' : 'text-gray-400'}`}
          onClick={() => setActiveTab('rewards')}
        >
          <div className="flex items-center justify-center">
            <Trophy className="w-5 h-5 mr-2" />
            <span>المكافآت</span>
          </div>
        </button>
        <button
          className={`flex-1 py-3 text-center ${activeTab === 'referrals' ? 'text-amber-500 border-b-2 border-amber-500' : 'text-gray-400'}`}
          onClick={() => setActiveTab('referrals')}
        >
          <div className="flex items-center justify-center">
            <Gift className="w-5 h-5 mr-2" />
            <span>الإحالات</span>
          </div>
        </button>
        <button
          className={`flex-1 py-3 text-center ${activeTab === 'lock' ? 'text-amber-500 border-b-2 border-amber-500' : 'text-gray-400'}`}
          onClick={() => setActiveTab('lock')}
        >
          <div className="flex items-center justify-center">
            <Clock className="w-5 h-5 mr-2" />
            <span>قفل العملة</span>
          </div>
        </button>
      </div>

      <div className="flex-1 p-4">
        {activeTab === 'rewards' && (
          <div className="space-y-6">
            <div className="bg-crypto-card rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <Star className="w-6 h-6 text-amber-500 mr-2" />
                  <span className="text-lg font-medium">نقاطك الحالية</span>
                </div>
                <span className="text-2xl font-bold text-amber-500">0</span>
              </div>
              <div className="text-sm text-gray-400">
                اكسب النقاط من خلال إكمال المهام وإحالة الأصدقاء واستخدام المنصة
              </div>
            </div>
            
            <h2 className="text-lg font-medium mb-3">المكافآت المتاحة</h2>
            <div className="grid grid-cols-2 gap-4">
              <RewardCard 
                title="رصيد MTG" 
                points={100} 
                description="احصل على 1 MTG في محفظتك" 
                icon={<Star className="w-5 h-5 text-amber-500" />}
              />
              <RewardCard 
                title="تخفيض الرسوم" 
                points={250} 
                description="خصم 50% على رسوم المعاملات لمدة أسبوع" 
                icon={<Star className="w-5 h-5 text-amber-500" />}
              />
              <RewardCard 
                title="مكافأة VIP" 
                points={500} 
                description="ترقية إلى حالة VIP لمدة شهر" 
                icon={<Star className="w-5 h-5 text-amber-500" />}
              />
              <RewardCard 
                title="NFT خاص" 
                points={1000} 
                description="احصل على NFT حصري من مجموعة MTG" 
                icon={<Star className="w-5 h-5 text-amber-500" />}
              />
            </div>

            <h2 className="text-lg font-medium mb-3 mt-6">المهام اليومية</h2>
            <RewardsTasks />
          </div>
        )}

        {activeTab === 'referrals' && (
          <ReferralSystem />
        )}

        {activeTab === 'lock' && (
          <CoinLock />
        )}
      </div>
    </div>
  );
};

export default Rewards;
