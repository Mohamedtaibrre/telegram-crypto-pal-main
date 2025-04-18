
import React from 'react';
import { Edit, Users, DollarSign } from 'lucide-react';

const AdminReferrals = () => {
  const referralLevels = [
    { id: 1, name: 'المستوى 1', reward: '5 MTG', description: 'مكافأة للإحالة المباشرة' },
    { id: 2, name: 'المستوى 2', reward: '2 MTG', description: 'مكافأة للإحالة الثانوية' },
  ];

  const topReferrers = [
    { id: 1, username: 'user1', referrals: 12, earnings: '60 MTG' },
    { id: 2, username: 'user2', referrals: 8, earnings: '40 MTG' },
    { id: 3, username: 'user3', referrals: 5, earnings: '25 MTG' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">إدارة نظام الإحالة</h2>
        <div className="text-sm text-gray-400">تكوين برنامج الإحالة ومراقبة أداء المستخدمين</div>
      </div>
      
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-crypto-card rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">إجمالي الإحالات</h3>
            <Users className="w-6 h-6 text-amber-500" />
          </div>
          <div className="text-3xl font-bold">0</div>
          <div className="text-sm text-gray-400 mt-2">مجموع الإحالات على المنصة</div>
        </div>
        
        <div className="bg-crypto-card rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">المكافآت الموزعة</h3>
            <DollarSign className="w-6 h-6 text-amber-500" />
          </div>
          <div className="text-3xl font-bold">0 MTG</div>
          <div className="text-sm text-gray-400 mt-2">إجمالي المكافآت الموزعة للإحالات</div>
        </div>
        
        <div className="bg-crypto-card rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">معدل التحويل</h3>
            <Users className="w-6 h-6 text-amber-500" />
          </div>
          <div className="text-3xl font-bold">0%</div>
          <div className="text-sm text-gray-400 mt-2">نسبة التحويل من الإحالات إلى مستخدمين نشطين</div>
        </div>
      </div>
      
      <div className="bg-crypto-card rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-medium">إعدادات برنامج الإحالة</h3>
          <button className="flex items-center bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg transition-colors">
            <Edit className="w-4 h-4 mr-2" />
            تعديل الإعدادات
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-gray-700">
              <tr>
                <th className="pb-3 text-gray-400 font-medium">المستوى</th>
                <th className="pb-3 text-gray-400 font-medium">المكافأة</th>
                <th className="pb-3 text-gray-400 font-medium">الوصف</th>
              </tr>
            </thead>
            <tbody>
              {referralLevels.map((level) => (
                <tr key={level.id} className="border-b border-gray-700 last:border-0">
                  <td className="py-4">{level.name}</td>
                  <td className="py-4">{level.reward}</td>
                  <td className="py-4 text-gray-400">{level.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="bg-crypto-card rounded-lg p-6">
        <h3 className="text-xl font-medium mb-6">أفضل المستخدمين المحيلين</h3>
        
        {topReferrers.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="border-b border-gray-700">
                <tr>
                  <th className="pb-3 text-gray-400 font-medium">اسم المستخدم</th>
                  <th className="pb-3 text-gray-400 font-medium">عدد الإحالات</th>
                  <th className="pb-3 text-gray-400 font-medium">المكافآت المكتسبة</th>
                </tr>
              </thead>
              <tbody>
                {topReferrers.map((user) => (
                  <tr key={user.id} className="border-b border-gray-700 last:border-0">
                    <td className="py-4">{user.username}</td>
                    <td className="py-4">{user.referrals}</td>
                    <td className="py-4">{user.earnings}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-10 text-gray-400">
            لا توجد بيانات إحالة متاحة بعد
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminReferrals;
