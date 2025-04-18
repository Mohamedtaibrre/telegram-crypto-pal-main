
import React from 'react';
import { Percent, ChevronLeft, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

interface StakingOptionProps {
  name: string;
  apy: string;
  platform?: string;
  externalUrl?: string;
}

const StakingOption = ({ 
  name = "تكديس MTG", 
  apy = "5.2%",
  platform = "MTG Platform",
  externalUrl = "/rewards?tab=lock"
}: StakingOptionProps) => {
  const isExternal = externalUrl.startsWith('http');
  
  const StakingLink = ({ children }: { children: React.ReactNode }) => {
    if (isExternal) {
      return (
        <a href={externalUrl} target="_blank" rel="noopener noreferrer" className="block">
          {children}
        </a>
      );
    } else {
      return (
        <Link to={externalUrl} className="block">
          {children}
        </Link>
      );
    }
  };

  return (
    <StakingLink>
      <div className="flex items-center justify-between px-4 py-3">
        <ChevronLeft className="w-5 h-5 text-gray-400" />
        
        <div className="flex items-center flex-1 justify-end">
          <div className="text-right mr-3">
            <div className="text-white font-medium">{name}</div>
            <div className="flex items-center justify-end text-gray-400">
              <span>APY حتى {apy}</span>
              {isExternal && (
                <ExternalLink className="w-3 h-3 ml-1" />
              )}
            </div>
            {platform && <div className="text-xs text-gray-500">{platform}</div>}
          </div>
          
          <div className="w-12 h-12 rounded-full overflow-hidden bg-amber-500 flex items-center justify-center">
            <Percent className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>
    </StakingLink>
  );
};

export default StakingOption;
