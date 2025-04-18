
import React from 'react';
import { Edit, Lock, UnlockIcon, TrendingUp, Users } from 'lucide-react';

const AdminLock = () => {
  const lockPeriods = [
    { id: 1, days: 30, apy: '5.2%' },
    { id: 2, days: 90, apy: '7.5%' },
    { id: 3, days: 180, apy: '10.3%' },
    { id: 4, days: 365, apy: '15.8%' },
  ];

  const activeLocks = [
    { id: 1, username: 'user1', amount: '1000 MTG', period: '30 days', unlockDate: '2024-05-16', reward: '4.27 MTG' },
    { id: 2, username: 'user2', amount: '5000 MTG', period: '90 days', unlockDate: '2024-07-15', reward: '93.75 MTG' },
    { id: 3, username: 'user3', amount: '2500 MTG', period: '180 days', unlockDate: '2024-10-13', reward: '128.75 MTG' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">إدارة نظام قفل العملات</h2>
        <div className="text-sm text-gray-400">تكوين فترات القفل ومعدلات العوائد</div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-crypto-card rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">إجمالي MTG المقفلة</h3>
            <Lock className="w-6 h-6 text-amber-500" />
          </div>
          <div className="text-3xl font-bold">0 MTG</div>
          <div className="text-sm text-gray-400 mt-2">إجمالي العملات المقفلة حاليًا</div>
        </div>
        
        <div className="bg-crypto-card rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">العوائد المستحقة</h3>
            <TrendingUp className="w-6 h-6 text-amber-500" />
          </div>
          <div className="text-3xl font-bold">0 MTG</div>
          <div className="text-sm text-gray-400 mt-2">إجمالي العوائد المستحقة للعملات المقفلة</div>
        </div>
        
        <div className="bg-crypto-card rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">عدد المستخدمين المشاركين</h3>
            <Users className="w-6 h-6 text-amber-500" />
          </div>
          <div className="text-3xl font-bold">0</div>
          <div className="text-sm text-gray-400 mt-2">عدد المستخدمين المشاركين في نظام القفل</div>
        </div>
      </div>
      
      <div className="bg-crypto-card rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-medium">إعدادات فترات القفل</h3>
          <button className="flex items-center bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg transition-colors">
            <Edit className="w-4 h-4 mr-2" />
            تعديل الفترات
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-gray-700">
              <tr>
                <th className="pb-3 text-gray-400 font-medium">فترة القفل (أيام)</th>
                <th className="pb-3 text-gray-400 font-medium">معدل العائد السنوي (APY)</th>
                <th className="pb-3 text-gray-400 font-medium">الحالة</th>
              </tr>
            </thead>
            <tbody>
              {lockPeriods.map((period) => (
                <tr key={period.id} className="border-b border-gray-700 last:border-0">
                  <td className="py-4">{period.days}</td>
                  <td className="py-4">{period.apy}</td>
                  <td className="py-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-900/30 text-green-400">
                      مفعّل
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="bg-crypto-card rounded-lg p-6">
        <h3 className="text-xl font-medium mb-6">العملات المقفلة النشطة</h3>
        
        {activeLocks.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="border-b border-gray-700">
                <tr>
                  <th className="pb-3 text-gray-400 font-medium">المستخدم</th>
                  <th className="pb-3 text-gray-400 font-medium">المبلغ</th>
                  <th className="pb-3 text-gray-400 font-medium">الفترة</th>
                  <th className="pb-3 text-gray-400 font-medium">تاريخ فك القفل</th>
                  <th className="pb-3 text-gray-400 font-medium">المكافأة المتوقعة</th>
                  <th className="pb-3 text-gray-400 font-medium">إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {activeLocks.map((lock) => (
                  <tr key={lock.id} className="border-b border-gray-700 last:border-0">
                    <td className="py-4">{lock.username}</td>
                    <td className="py-4">{lock.amount}</td>
                    <td className="py-4">{lock.period}</td>
                    <td className="py-4">{lock.unlockDate}</td>
                    <td className="py-4 text-amber-500">{lock.reward}</td>
                    <td className="py-4">
                      <button className="flex items-center text-blue-400 hover:text-blue-300">
                        <UnlockIcon className="w-4 h-4 mr-1" />
                        <span>فك القفل</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-10 text-gray-400">
            لا توجد عملات مقفلة نشطة حاليًا
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminLock;
