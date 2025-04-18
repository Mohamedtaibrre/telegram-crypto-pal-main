
import React from 'react';
import { ChevronLeft, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Token {
  name: string;
  symbol: string;
  balance: string;
  icon: string;
  price?: string;
  change?: string;
  externalUrl?: string;
}

interface TokenListProps {
  tokens: Token[];
  title?: string;
  showPrices?: boolean;
}

const TokenList = ({ 
  tokens = [], 
  title = "الرموز المميزة",
  showPrices = false 
}: TokenListProps) => {
  return (
    <div className="px-4 mb-4">
      <div className="flex justify-between items-center mb-4">
        <div></div> {/* Empty div for flex alignment */}
        <h3 className="text-lg font-bold text-white">{title}</h3>
      </div>
      
      <div className="space-y-4">
        {tokens.map((token, index) => {
          const TokenLink = ({ children }: { children: React.ReactNode }) => {
            if (token.externalUrl?.startsWith('http')) {
              return (
                <a href={token.externalUrl} target="_blank" rel="noopener noreferrer" className="block">
                  {children}
                </a>
              );
            } else if (token.externalUrl) {
              return <Link to={token.externalUrl}>{children}</Link>;
            } else {
              return <div>{children}</div>;
            }
          };
          
          return (
            <TokenLink key={index}>
              <div className="flex items-center justify-between">
                <ChevronLeft className="w-5 h-5 text-gray-400" />
                
                <div className="flex items-center flex-1 justify-end">
                  <div className="text-right mr-3">
                    <div className="text-white font-medium">{token.name}</div>
                    <div className="text-gray-400">
                      {token.symbol} {token.balance}
                    </div>
                    {showPrices && token.price && (
                      <div className="flex items-center justify-end text-xs">
                        <span className={`${token.change?.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                          {token.change}
                        </span>
                        <span className="text-gray-500 ml-1">${token.price}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                    <img 
                      src={token.icon} 
                      alt={token.symbol}
                      className="w-8 h-8"
                    />
                  </div>
                </div>
              </div>
            </TokenLink>
          );
        })}
      </div>
    </div>
  );
};

export default TokenList;
