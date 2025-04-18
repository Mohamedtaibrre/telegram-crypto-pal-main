
import React from 'react';
import { X } from 'lucide-react';

const StakingBanner = () => {
  return (
    <div className="purple-gradient rounded-xl mx-4 mb-6 p-4 relative overflow-hidden">
      <button className="absolute top-2 right-2 text-white p-1 rounded-full bg-black/20">
        <X className="w-4 h-4" />
      </button>
      
      <div className="flex items-center">
        <div className="mr-4 w-16 h-16 flex-shrink-0">
          <img 
            src="/lovable-uploads/51d8d4d1-ea9a-4324-a114-c010fc19d8dd.png" 
            alt="Staking Box"
            className="w-full h-full object-contain"
          />
        </div>
        
        <div className="flex-1 text-right text-white">
          <p className="font-bold">
            احصل على ما يصل إلى 3.5% APY على USDT الخاص بك
          </p>
          <button className="inline-block mt-2 text-sm font-medium hover:underline">
            ابدأ في الكسب ›
          </button>
        </div>
      </div>
    </div>
  );
};

export default StakingBanner;
