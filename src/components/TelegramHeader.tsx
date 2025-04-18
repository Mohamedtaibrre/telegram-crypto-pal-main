
import React from 'react';
import { Check, ChevronDown, MoreVertical, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface TelegramHeaderProps {
  walletName?: string;
}

const TelegramHeader = ({ walletName = "محفظة" }: TelegramHeaderProps) => {
  const { user } = useAuth();
  
  return (
    <div className="flex items-center justify-between w-full px-4 py-3">
      <button className="p-1">
        <X className="w-6 h-6 text-white" />
      </button>
      
      <div className="flex items-center space-x-1 rtl:space-x-reverse">
        <h1 className="text-xl font-bold text-white">
          {user?.firstName ? `محفظة ${user.firstName}` : walletName}
        </h1>
        <div className="bg-crypto-blue rounded-full p-0.5">
          <Check className="w-4 h-4 text-white" />
        </div>
      </div>
      
      <div className="flex items-center space-x-2 rtl:space-x-reverse">
        <button className="p-1">
          <ChevronDown className="w-6 h-6 text-white" />
        </button>
        <button className="p-1">
          <MoreVertical className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
};

export default TelegramHeader;
