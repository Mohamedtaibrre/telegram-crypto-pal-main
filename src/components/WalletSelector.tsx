
import React from 'react';

interface WalletSelectorProps {
  selectedWallet: string;
  wallets: string[];
  onSelect: (wallet: string) => void;
}

const WalletSelector = ({ 
  selectedWallet = "TON Space", 
  wallets = ["TON Space", "المحفظة"], 
  onSelect 
}: WalletSelectorProps) => {
  return (
    <div className="flex items-center justify-center gap-4 my-4">
      <button 
        className={`rounded-full px-6 py-2 text-white text-sm font-medium ${
          selectedWallet === "TON Space" 
            ? "bg-crypto-card border border-gray-700" 
            : "bg-transparent"
        }`}
        onClick={() => onSelect("TON Space")}
      >
        TON Space
      </button>
      <button 
        className={`rounded-full px-6 py-2 text-white text-sm font-medium ${
          selectedWallet === "المحفظة" 
            ? "bg-crypto-card border border-gray-700" 
            : "bg-transparent"
        }`}
        onClick={() => onSelect("المحفظة")}
      >
        المحفظة
      </button>
      <div className="rounded-full overflow-hidden border border-teal-400">
        <div className="w-10 h-10 bg-teal-400 flex items-center justify-center text-white font-bold">
          M
        </div>
      </div>
    </div>
  );
};

export default WalletSelector;
