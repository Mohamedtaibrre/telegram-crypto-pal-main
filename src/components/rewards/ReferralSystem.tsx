
import React, { useState } from 'react';
import { Share2, Copy, Users, DollarSign } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const ReferralSystem = () => {
  const [referralCode] = useState('MTG123456');
  const { toast } = useToast();
  
  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralCode);
    toast({
      title: "تم النسخ",
      description: "تم نسخ رمز الإحالة بنجاح",
    });
  };

  const shareReferralCode = () => {
    if (navigator.share) {
      navigator.share({
        title: 'انضم إلي في محفظة MTG!',
        text: `استخدم رمز الإحالة الخاص بي ${referralCode} للحصول على مكافأة خاصة عند التسجيل!`,
        url: window.location.origin,
      });
    } else {
      copyReferralCode();
      toast({
        title: "مشاركة",
        description: "تم نسخ الرابط. يمكنك مشاركته الآن.",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-crypto-card rounded-lg p-6 text-center">
        <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Users className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-xl font-bold mb-2">أحضر أصدقاءك، اكسب MTG</h2>
        <p className="text-gray-400 mb-6">احصل على 5 MTG لكل صديق ينضم باستخدام رابط الإحالة الخاص بك ويكمل معاملته الأولى</p>
        
        <div className="bg-crypto-dark p-3 rounded-lg mb-4 flex items-center justify-between">
          <span className="text-amber-500 font-mono">{referralCode}</span>
          <button 
            onClick={copyReferralCode}
            className="text-white hover:text-amber-500 transition-colors"
          >
            <Copy className="w-5 h-5" />
          </button>
        </div>
        
        <button 
          onClick={shareReferralCode}
          className="bg-amber-500 hover:bg-amber-600 text-white py-3 px-5 rounded-lg w-full flex items-center justify-center transition-colors"
        >
          <Share2 className="w-5 h-5 mr-2" />
          مشاركة رمز الإحالة
        </button>
      </div>
      
      <div className="bg-crypto-card rounded-lg p-4">
        <h3 className="font-medium mb-3">إحصائيات الإحالة</h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-crypto-dark p-3 rounded-lg text-center">
            <div className="text-2xl font-bold text-white">0</div>
            <div className="text-gray-400 text-sm">الأصدقاء المُسجلين</div>
          </div>
          <div className="bg-crypto-dark p-3 rounded-lg text-center">
            <div className="text-2xl font-bold text-amber-500">0 MTG</div>
            <div className="text-gray-400 text-sm">المكافآت المكتسبة</div>
          </div>
        </div>
      </div>
      
      <div className="bg-crypto-card rounded-lg p-4">
        <h3 className="font-medium mb-3">برنامج الإحالة</h3>
        <div className="space-y-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center mr-3">
              <DollarSign className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <h4 className="font-medium">المستوى 1: الإحالة المباشرة</h4>
              <p className="text-sm text-gray-400">احصل على 5 MTG لكل صديق تدعوه</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center mr-3">
              <DollarSign className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <h4 className="font-medium">المستوى 2: إحالة ثانوية</h4>
              <p className="text-sm text-gray-400">احصل على 2 MTG عندما يقوم الأشخاص الذين دعوتهم بدعوة آخرين</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralSystem;
