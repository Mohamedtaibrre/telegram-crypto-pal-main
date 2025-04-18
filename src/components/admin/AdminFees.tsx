
import React from 'react';
import { Edit, Percent, ArrowLeftRight, Send, Download } from 'lucide-react';

const AdminFees = () => {
  const feeSettings = [
    { id: 1, type: 'رسوم التحويل', value: '0.5%', icon: <ArrowLeftRight className="w-5 h-5 text-amber-500" /> },
    { id: 2, type: 'رسوم الإرسال', value: '0.2%', icon: <Send className="w-5 h-5 text-amber-500" /> },
    { id: 3, type: 'رسوم الإيداع', value: '0%', icon: <Download className="w-5 h-5 text-amber-500" /> },
    { id: 4, type: 'رسوم فك القفل المبكر', value: '2%', icon: <Percent className="w-5 h-5 text-amber-500" /> },
  ];

  const vipLevels = [
    { id: 1, name: 'عادي', discount: '0%', threshold: '0 MTG' },
    { id: 2, name: 'فضي', discount: '25%', threshold: '1000 MTG' },
    { id: 3, name: 'ذهبي', discount: '50%', threshold: '5000 MTG' },
    { id: 4, name: 'بلاتيني', discount: '75%', threshold: '10000 MTG' },
    { id: 5, name: 'VIP', discount: '100%', threshold: '50000 MTG' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">إدارة الرسوم</h2>
        <div className="text-sm text-gray-400">تكوين رسوم النظام ومستويات الخصم</div>
      </div>
      
      <div className="bg-crypto-card rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-medium">إعدادات الرسوم</h3>
          <button className="flex items-center bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg transition-colors">
            <Edit className="w-4 h-4 mr-2" />
            تعديل الرسوم
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {feeSettings.map((fee) => (
            <div key={fee.id} className="bg-crypto-dark rounded-lg p-4">
              <div className="flex items-center mb-3">
                {fee.icon}
                <h4 className="font-medium ml-2">{fee.type}</h4>
              </div>
              <div className="text-2xl font-bold">{fee.value}</div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 bg-yellow-900/20 border border-yellow-700/30 text-yellow-200 p-4 rounded-lg">
          <p className="text-sm">
            <strong>ملاحظة:</strong> تطبق الرسوم على جميع المعاملات باستثناء المشمولة في الخصومات المحددة في مستويات VIP.
          </p>
        </div>
      </div>
      
      <div className="bg-crypto-card rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-medium">مستويات VIP والخصومات</h3>
          <button className="flex items-center bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg transition-colors">
            <Edit className="w-4 h-4 mr-2" />
            تعديل المستويات
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-gray-700">
              <tr>
                <th className="pb-3 text-gray-400 font-medium">المستوى</th>
                <th className="pb-3 text-gray-400 font-medium">خصم الرسوم</th>
                <th className="pb-3 text-gray-400 font-medium">حد الأهلية (رصيد MTG)</th>
              </tr>
            </thead>
            <tbody>
              {vipLevels.map((level) => (
                <tr key={level.id} className="border-b border-gray-700 last:border-0">
                  <td className="py-4">{level.name}</td>
                  <td className="py-4">{level.discount}</td>
                  <td className="py-4">{level.threshold}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="bg-crypto-card rounded-lg p-6">
        <h3 className="text-xl font-medium mb-4">إحصائيات الرسوم</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-crypto-dark rounded-lg p-4">
            <h4 className="text-gray-400 mb-2">إجمالي الرسوم المحصلة (MTG)</h4>
            <div className="text-2xl font-bold">0 MTG</div>
          </div>
          <div className="bg-crypto-dark rounded-lg p-4">
            <h4 className="text-gray-400 mb-2">إجمالي الرسوم المحصلة (BNB)</h4>
            <div className="text-2xl font-bold">0 BNB</div>
          </div>
          <div className="bg-crypto-dark rounded-lg p-4">
            <h4 className="text-gray-400 mb-2">إجمالي الخصومات الممنوحة</h4>
            <div className="text-2xl font-bold">0 MTG</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminFees;
