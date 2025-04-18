
import React from 'react';
import { Star } from 'lucide-react';

interface RewardCardProps {
  title: string;
  points: number;
  description: string;
  icon?: React.ReactNode;
}

const RewardCard = ({ title, points, description, icon }: RewardCardProps) => {
  return (
    <div className="bg-crypto-card rounded-lg p-4 hover:bg-opacity-80 transition-colors">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium">{title}</h3>
        {icon || <Star className="w-5 h-5 text-amber-500" />}
      </div>
      <p className="text-gray-400 text-sm mb-3">{description}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Star className="w-4 h-4 text-amber-500 mr-1" />
          <span className="text-amber-500">{points} نقطة</span>
        </div>
        <button className="text-xs bg-amber-500 hover:bg-amber-600 text-white py-1 px-3 rounded-full transition-colors">
          استبدال
        </button>
      </div>
    </div>
  );
};

export default RewardCard;
