import React, { useState, useEffect } from 'react';
import { Star, Copy, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '../contexts/AuthContext';
import { getUserWallets } from '../services/userDataService';

interface WalletBalanceProps {
  walletName?: string;
  defaultCurrency?: string;
  rewards?: number;
}

const WalletBalance = ({ 
  walletName = "MTG Wallet", 
  defaultCurrency = "MTG",
  rewards = 0
}: WalletBalanceProps) => {
  const [selectedCurrency, setSelectedCurrency] = useState(defaultCurrency);
  const [showAllWallets, setShowAllWallets] = useState(false);
  const [wallets, setWallets] = useState<any[]>([]);
  const [totalBalance, setTotalBalance] = useState("0.00");
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

  // Network explorer URLs (would come from config in a real app)
  const blockExplorers = {
    "BNB Smart Chain": "https://bscscan.com/address/",
    "Ethereum": "https://etherscan.io/address/",
    "Solana": "https://solscan.io/account/",
    "TON Network": "https://tonscan.org/address/",
    "Tron": "https://tronscan.org/#/address/"
  };

  // Wallet addresses (in a real app, these would be generated or retrieved from backend)
  const walletAddresses = {
    "BNB Smart Chain": "0xc8e124121985aa53cdf2a55261cb5920dc1db186",
    "Ethereum": "0x9d8A62f656a8d1615C1294fd71e9CFb3E4855A4F",
    "Solana": "EhYXq3ANp5nAJ6fVGrGJRr5KUxUrvNNyv2qLkQHkLwYC",
    "TON Network": "UQBEgrbsICzTcUJJYSyZ_JDkVgV8_EtXVZVr7AIEPLkkOARi",
    "Tron": "TJpSJZYF6aVRTomH9xdU5CSt29K7hNLRyZ"
  };

  // Default network for each currency
  const currencyNetworks = {
    "MTG": "BNB Smart Chain",
    "BNB": "BNB Smart Chain",
    "ETH": "Ethereum",
    "USDT": "BNB Smart Chain",
    "USDC": "BNB Smart Chain",
    "SOL": "Solana",
    "TON": "TON Network",
    "TRX": "Tron"
  };

  // Load user wallets
  useEffect(() => {
    const fetchWallets = async () => {
      if (user) {
        setIsLoading(true);
        try {
          const userWallets = await getUserWallets(user.telegramId);
          setWallets(userWallets);
          
          // Calculate equivalent USD value (in a real app, would use market rates)
          const rates = {
            "MTG": 0.75,
            "BNB": 300,
            "ETH": 3000,
            "USDT": 1,
            "USDC": 1,
            "SOL": 150,
            "TON": 5,
            "TRX": 0.1
          };
          
          let total = 0;
          userWallets.forEach(wallet => {
            const rate = rates[wallet.token] || 0;
            total += parseFloat(wallet.balance) * rate;
          });
          
          setTotalBalance(total.toFixed(2));
        } catch (error) {
          console.error("Error fetching wallet data:", error);
          toast({
            title: "خطأ",
            description: "فشل في تحميل بيانات المحفظة",
            variant: "destructive",
          });
        } finally {
          setIsLoading(false);
        }
      }
    };
    
    fetchWallets();
  }, [user, toast]);

  // Get the selected wallet
  const selectedWallet = wallets.find(wallet => wallet.token === selectedCurrency) || {
    token: selectedCurrency,
    balance: "0.00",
    network: currencyNetworks[selectedCurrency] || "BNB Smart Chain"
  };

  // Get wallet address for the selected currency
  const getWalletAddress = () => {
    const network = selectedWallet.network || currencyNetworks[selectedCurrency];
    return walletAddresses[network] || walletAddresses["BNB Smart Chain"];
  };

  const walletAddress = getWalletAddress();

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    toast({
      title: "تم النسخ",
      description: "تم نسخ عنوان المحفظة بنجاح",
    });
  };

  const truncateAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  const getExplorerUrl = () => {
    const network = selectedWallet.network || currencyNetworks[selectedCurrency];
    const baseUrl = blockExplorers[network] || blockExplorers["BNB Smart Chain"];
    return baseUrl + walletAddress;
  };

  if (isLoading) {
    return (
      <div className="text-center mb-6 mt-4 p-4">
        <div className="flex justify-center">
          <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <div className="mt-2 text-gray-400">جاري تحميل بيانات المحفظة...</div>
      </div>
    );
  }

  return (
    <div className="text-center mb-6 mt-4">
      <h2 className="text-xl text-white mb-2">
        <span className="text-gray-400">رصيد</span> {walletName}
      </h2>
      <div className="text-5xl font-bold text-white">
        {selectedWallet.balance}<span className="text-gray-400 ml-2">{selectedCurrency}</span>
      </div>
      
      <div className="text-gray-400 text-sm mb-2">
        ~${parseFloat(selectedWallet.balance) * (selectedCurrency === "MTG" ? 0.75 : 1)} USD
      </div>
      
      <div className="flex items-center justify-center mt-1 mb-2">
        <div className="text-sm text-gray-400">
          {selectedWallet.network || currencyNetworks[selectedCurrency]}
        </div>
        <button 
          className="ml-2 text-gray-400 hover:text-amber-500 transition-colors"
          onClick={handleCopyAddress}
        >
          <div className="flex items-center text-xs">
            {truncateAddress(walletAddress)}
            <Copy className="w-3 h-3 ml-1" />
          </div>
        </button>
      </div>
      
      {showAllWallets && (
        <div className="bg-crypto-card rounded-lg p-2 mx-4 mb-4">
          <div className="grid grid-cols-3 gap-2 mb-2">
            {wallets.map((wallet, index) => (
              <button
                key={index}
                className={`p-2 rounded-lg text-center ${selectedCurrency === wallet.token ? 'bg-amber-500/20 border border-amber-500/40' : 'hover:bg-gray-800'}`}
                onClick={() => setSelectedCurrency(wallet.token)}
              >
                <div className="font-bold">{wallet.token}</div>
                <div className="text-sm">{wallet.balance}</div>
              </button>
            ))}
          </div>
          <div className="border-t border-gray-700 pt-2 text-center">
            <div className="text-sm text-gray-400">إجمالي القيمة: ${totalBalance} USD</div>
          </div>
        </div>
      )}
      
      <div className="flex justify-center items-center space-x-4 rtl:space-x-reverse">
        <Link to="/rewards" className="inline-flex items-center text-amber-500 text-sm">
          <Star className="w-4 h-4 mr-1" />
          <span>{rewards} نقطة مكافآت</span>
        </Link>
        
        <button onClick={() => setShowAllWallets(!showAllWallets)} 
                className="inline-flex items-center text-gray-400 text-sm hover:text-amber-500 transition-colors">
          {showAllWallets ? (
            <>
              <ChevronUp className="w-4 h-4 mr-1" />
              <span>إخفاء المحافظ</span>
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4 mr-1" />
              <span>عرض جميع المحافظ</span>
            </>
          )}
        </button>
        
        <a href={getExplorerUrl()} 
           target="_blank" 
           rel="noopener noreferrer"
           className="inline-flex items-center text-gray-400 text-sm hover:text-amber-500 transition-colors">
          <ExternalLink className="w-4 h-4 mr-1" />
          <span>عرض على المستكشف</span>
        </a>
      </div>
    </div>
  );
};

export default WalletBalance;
