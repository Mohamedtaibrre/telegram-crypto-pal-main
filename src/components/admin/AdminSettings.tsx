
import React from 'react';
import { Save, RefreshCw, Shield, Database, Globe } from 'lucide-react';
import { Input } from '@/components/ui/input';

const AdminSettings = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">إعدادات النظام</h2>
        <div className="text-sm text-gray-400">إعدادات عامة للمنصة</div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-crypto-card rounded-lg p-6">
          <div className="flex items-center mb-6">
            <Shield className="w-6 h-6 text-amber-500 mr-3" />
            <h3 className="text-xl font-medium">إعدادات الأمان</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">حد السحب اليومي (MTG)</label>
              <Input 
                type="text" 
                defaultValue="1000"
                className="bg-crypto-dark border-gray-700 text-white"
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-400 mb-1">فترة التأكيد للمعاملات الكبيرة (دقائق)</label>
              <Input 
                type="text" 
                defaultValue="30"
                className="bg-crypto-dark border-gray-700 text-white"
              />
            </div>
            
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="enable2fa" 
                defaultChecked 
                className="mr-2 h-4 w-4"
              />
              <label htmlFor="enable2fa" className="text-sm">تفعيل المصادقة الثنائية للمعاملات</label>
            </div>
            
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="emailNotifications" 
                defaultChecked 
                className="mr-2 h-4 w-4"
              />
              <label htmlFor="emailNotifications" className="text-sm">تفعيل إشعارات البريد الإلكتروني للمعاملات</label>
            </div>
          </div>
        </div>
        
        <div className="bg-crypto-card rounded-lg p-6">
          <div className="flex items-center mb-6">
            <Database className="w-6 h-6 text-amber-500 mr-3" />
            <h3 className="text-xl font-medium">إعدادات الشبكة</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">عنوان العقد الذكي (MTG)</label>
              <Input 
                type="text" 
                defaultValue="0xc8e124121985aa53cdf2a55261cb5920dc1db186"
                className="bg-crypto-dark border-gray-700 text-white"
                readOnly
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-400 mb-1">شبكة BNB Smart Chain RPC</label>
              <Input 
                type="text" 
                defaultValue="https://bsc-dataseed.binance.org/"
                className="bg-crypto-dark border-gray-700 text-white"
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-400 mb-1">الحد الأدنى للتأكيدات</label>
              <Input 
                type="text" 
                defaultValue="12"
                className="bg-crypto-dark border-gray-700 text-white"
              />
            </div>
            
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="testnet" 
                className="mr-2 h-4 w-4"
              />
              <label htmlFor="testnet" className="text-sm">استخدام شبكة اختبار BNB Smart Chain</label>
            </div>
          </div>
        </div>
        
        <div className="bg-crypto-card rounded-lg p-6">
          <div className="flex items-center mb-6">
            <Globe className="w-6 h-6 text-amber-500 mr-3" />
            <h3 className="text-xl font-medium">إعدادات المنصة</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">اسم المنصة</label>
              <Input 
                type="text" 
                defaultValue="MTG Wallet"
                className="bg-crypto-dark border-gray-700 text-white"
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-400 mb-1">رابط الدعم</label>
              <Input 
                type="text" 
                defaultValue="https://support.mtg.com"
                className="bg-crypto-dark border-gray-700 text-white"
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-400 mb-1">رابط السياسة والشروط</label>
              <Input 
                type="text" 
                defaultValue="https://mtg.com/terms"
                className="bg-crypto-dark border-gray-700 text-white"
              />
            </div>
            
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="maintenance" 
                className="mr-2 h-4 w-4"
              />
              <label htmlFor="maintenance" className="text-sm">وضع الصيانة</label>
            </div>
          </div>
        </div>
        
        <div className="bg-crypto-card rounded-lg p-6">
          <div className="flex items-center mb-6">
            <RefreshCw className="w-6 h-6 text-amber-500 mr-3" />
            <h3 className="text-xl font-medium">السيولة والمزامنة</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">فترة مزامنة السعر (ثواني)</label>
              <Input 
                type="text" 
                defaultValue="60"
                className="bg-crypto-dark border-gray-700 text-white"
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-400 mb-1">عنوان مجمع السيولة</label>
              <Input 
                type="text" 
                defaultValue="0x..."
                className="bg-crypto-dark border-gray-700 text-white"
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-400 mb-1">احتياطي السيولة (MTG)</label>
              <Input 
                type="text" 
                defaultValue="100000"
                className="bg-crypto-dark border-gray-700 text-white"
              />
            </div>
            
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="autoUpdate" 
                defaultChecked
                className="mr-2 h-4 w-4"
              />
              <label htmlFor="autoUpdate" className="text-sm">تحديث الأسعار تلقائيًا</label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <button className="flex items-center bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg transition-colors">
          <Save className="w-5 h-5 mr-2" />
          حفظ الإعدادات
        </button>
      </div>
    </div>
  );
};

export default AdminSettings;
