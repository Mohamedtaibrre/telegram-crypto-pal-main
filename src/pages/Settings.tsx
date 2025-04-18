
import React from 'react';
import { 
  ArrowLeft, 
  Lock, 
  LifeBuoy, 
  Globe, 
  Bell, 
  Wallet, 
  ShieldAlert, 
  ChevronRight 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Settings = () => {
  const settingsItems = [
    { icon: <Lock className="w-5 h-5" />, label: "الأمان", path: "/security" },
    { icon: <Wallet className="w-5 h-5" />, label: "حسابات وأصول", path: "/accounts" },
    { icon: <Bell className="w-5 h-5" />, label: "الإشعارات", path: "/notifications" },
    { icon: <Globe className="w-5 h-5" />, label: "اللغة", path: "/language" },
    { icon: <ShieldAlert className="w-5 h-5" />, label: "الخصوصية", path: "/privacy" },
    { icon: <LifeBuoy className="w-5 h-5" />, label: "الدعم", path: "/support" },
  ];

  return (
    <div className="min-h-screen bg-crypto-dark text-white flex flex-col">
      <div className="flex items-center p-4 border-b border-gray-800">
        <Link to="/" className="mr-4">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-xl font-bold">الإعدادات</h1>
      </div>

      <div className="flex-1 p-4">
        <div className="space-y-2">
          {settingsItems.map((item, index) => (
            <Link 
              key={index}
              to={item.path}
              className="flex items-center justify-between bg-crypto-card p-4 rounded-lg"
            >
              <div className="flex items-center">
                <div className="mr-3 text-crypto-blue">
                  {item.icon}
                </div>
                <span className="text-white">{item.label}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-500" />
            </Link>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <div className="text-crypto-blue font-medium mb-1">TON Space Wallet</div>
          <div className="text-gray-400 text-sm">v1.0.0</div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
