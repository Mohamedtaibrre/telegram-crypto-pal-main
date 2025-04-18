
import React from 'react';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';

const AdminRewards = () => {
  const rewards = [
    { id: 1, name: 'رصيد MTG', points: 100, description: 'احصل على 1 MTG في محفظتك' },
    { id: 2, name: 'تخفيض الرسوم', points: 250, description: 'خصم 50% على رسوم المعاملات لمدة أسبوع' },
    { id: 3, name: 'مكافأة VIP', points: 500, description: 'ترقية إلى حالة VIP لمدة شهر' },
    { id: 4, name: 'NFT خاص', points: 1000, description: 'احصل على NFT حصري من مجموعة MTG' },
  ];

  const tasks = [
    { id: 1, name: 'تسجيل الدخول اليومي', points: 10, description: 'قم بتسجيل الدخول إلى المنصة يوميًا' },
    { id: 2, name: 'إجراء معاملة', points: 20, description: 'إرسال أو استلام أي مبلغ من MTG' },
    { id: 3, name: 'تبادل العملات', points: 25, description: 'قم بتبديل MTG مع أي عملة أخرى' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">إدارة المكافآت</h2>
        <div className="text-sm text-gray-400">تحكم بنظام المكافآت والمهام على المنصة</div>
      </div>
      
      <div className="bg-crypto-card rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-medium">المكافآت المتاحة</h3>
          <button className="flex items-center bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg transition-colors">
            <PlusCircle className="w-4 h-4 mr-2" />
            إضافة مكافأة
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-gray-700">
              <tr>
                <th className="pb-3 text-gray-400 font-medium">اسم المكافأة</th>
                <th className="pb-3 text-gray-400 font-medium">النقاط المطلوبة</th>
                <th className="pb-3 text-gray-400 font-medium">الوصف</th>
                <th className="pb-3 text-gray-400 font-medium">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {rewards.map((reward) => (
                <tr key={reward.id} className="border-b border-gray-700 last:border-0">
                  <td className="py-4">{reward.name}</td>
                  <td className="py-4">{reward.points}</td>
                  <td className="py-4 text-gray-400">{reward.description}</td>
                  <td className="py-4">
                    <div className="flex space-x-2 rtl:space-x-reverse">
                      <button className="text-blue-400 hover:text-blue-300 transition-colors">
                        <Edit className="w-5 h-5" />
                      </button>
                      <button className="text-red-400 hover:text-red-300 transition-colors">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="bg-crypto-card rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-medium">المهام المتاحة</h3>
          <button className="flex items-center bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg transition-colors">
            <PlusCircle className="w-4 h-4 mr-2" />
            إضافة مهمة
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-gray-700">
              <tr>
                <th className="pb-3 text-gray-400 font-medium">اسم المهمة</th>
                <th className="pb-3 text-gray-400 font-medium">النقاط</th>
                <th className="pb-3 text-gray-400 font-medium">الوصف</th>
                <th className="pb-3 text-gray-400 font-medium">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id} className="border-b border-gray-700 last:border-0">
                  <td className="py-4">{task.name}</td>
                  <td className="py-4">{task.points}</td>
                  <td className="py-4 text-gray-400">{task.description}</td>
                  <td className="py-4">
                    <div className="flex space-x-2 rtl:space-x-reverse">
                      <button className="text-blue-400 hover:text-blue-300 transition-colors">
                        <Edit className="w-5 h-5" />
                      </button>
                      <button className="text-red-400 hover:text-red-300 transition-colors">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
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

export default AdminRewards;
