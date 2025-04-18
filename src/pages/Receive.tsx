
import React, { useState } from 'react';
import { ArrowLeft, Copy, Share2, ExternalLink, Wallet } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { QRCodeSVG } from 'qrcode.react';
import { useAuth } from '../contexts/AuthContext';
import { getUserWallets, saveUserData, getUserData } from '../services/userDataService';

const Receive = () => {
  const [selectedToken, setSelectedToken] = useState("MTG");
  const [selectedNetwork, setSelectedNetwork] = useState("BNB Smart Chain");
  const [showConnectWallet, setShowConnectWallet] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  
  // Wallet addresses (in a real app, these would be generated or retrieved from backend)
  const walletAddresses = {
    "BNB Smart Chain": "0xc8e124121985aa53cdf2a55261cb5920dc1db186",
    "Ethereum": "0x9d8A62f656a8d1615C1294fd71e9CFb3E4855A4F",
    "Solana": "EhYXq3ANp5nAJ6fVGrGJRr5KUxUrvNNyv2qLkQHkLwYC",
    "TON Network": "UQBEgrbsICzTcUJJYSyZ_JDkVgV8_EtXVZVr7AIEPLkkOARi",
    "Tron": "TJpSJZYF6aVRTomH9xdU5CSt29K7hNLRyZ"
  };

  // Get current wallet address based on selected network
  const walletAddress = walletAddresses[selectedNetwork] || walletAddresses["BNB Smart Chain"];

  // Available tokens and networks mapping
  const tokenNetworks = {
    "MTG": ["BNB Smart Chain"],
    "BNB": ["BNB Smart Chain"],
    "ETH": ["Ethereum"],
    "USDT": ["BNB Smart Chain", "Ethereum", "Tron"],
    "USDC": ["BNB Smart Chain", "Ethereum", "Solana"],
    "SOL": ["Solana"],
    "TON": ["TON Network"],
    "TRX": ["Tron"]
  };
  
  // Format tokens for select dropdown
  const tokens = Object.keys(tokenNetworks).map(token => {
    const networks = tokenNetworks[token].join(", ");
    return { value: token, label: `${token} (${networks})` };
  });
  
  // Get available networks for the selected token
  const availableNetworks = tokenNetworks[selectedToken] || [];

  // Update network when token changes
  const handleTokenChange = (e) => {
    const newToken = e.target.value;
    setSelectedToken(newToken);
    
    // Default to first available network for the selected token
    if (tokenNetworks[newToken] && tokenNetworks[newToken].length > 0) {
      setSelectedNetwork(tokenNetworks[newToken][0]);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress);
    toast({
      title: "تم النسخ",
      description: "تم نسخ عنوان المحفظة بنجاح",
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${selectedToken} Address`,
          text: walletAddress,
        });
        toast({
          title: "تمت المشاركة",
          description: "تمت مشاركة العنوان بنجاح",
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      handleCopy();
      toast({
        title: "تم النسخ",
        description: "تم نسخ العنوان للمشاركة",
      });
    }
  };

  const handleConnectWallet = () => {
    setShowConnectWallet(!showConnectWallet);
  };

  const connectExternalWallet = async (walletName) => {
    // In a real app, this would connect to the actual wallet provider
    toast({
      title: "ربط المحفظة",
      description: `تم ربط محفظة ${walletName} بنجاح`,
    });
    setShowConnectWallet(false);
    
    // Add demo deposit to user history if authenticated
    if (user) {
      try {
        // Get user data and properly await the Promise
        const userData = await getUserData(user.telegramId);
        
        // Add a demo transaction
        userData.transactions.unshift({
          id: `tx_${Date.now()}`,
          userId: user.telegramId,
          type: 'receive',
          amount: (Math.random() * 10).toFixed(4),
          token: selectedToken,
          timestamp: Date.now(),
          status: 'completed',
          fromAddress: `${walletName}_demo`,
          toAddress: walletAddress,
          note: `تم الإيداع من ${walletName}`
        });
        
        // Update wallet balance
        const walletIndex = userData.wallets.findIndex(w => w.token === selectedToken);
        if (walletIndex !== -1) {
          const currentBalance = parseFloat(userData.wallets[walletIndex].balance);
          userData.wallets[walletIndex].balance = (currentBalance + parseFloat((Math.random() * 10).toFixed(4))).toString();
        } else {
          userData.wallets.push({
            token: selectedToken,
            balance: (Math.random() * 10).toFixed(4),
            network: selectedNetwork
          });
        }
        
        await saveUserData(user.telegramId, userData);
      } catch (error) {
        console.error('Error updating user data:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-crypto-dark text-white flex flex-col">
      <div className="flex items-center p-4 border-b border-gray-800">
        <Link to="/" className="mr-4">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-xl font-bold">استلام</h1>
      </div>

      <div className="flex-1 p-4">
        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">اختر العملة</label>
          <div className="bg-crypto-card rounded-lg p-4">
            <select
              className="bg-transparent text-white text-lg font-medium focus:outline-none appearance-none w-full"
              value={selectedToken}
              onChange={handleTokenChange}
            >
              {tokens.map(token => (
                <option key={token.value} value={token.value}>{token.label}</option>
              ))}
            </select>
          </div>
        </div>

        {availableNetworks.length > 1 && (
          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-2">اختر الشبكة</label>
            <div className="bg-crypto-card rounded-lg p-4">
              <select
                className="bg-transparent text-white text-lg font-medium focus:outline-none appearance-none w-full"
                value={selectedNetwork}
                onChange={(e) => setSelectedNetwork(e.target.value)}
              >
                {availableNetworks.map(network => (
                  <option key={network} value={network}>{network}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        <div className="flex flex-col items-center mt-6 mb-6">
          <div className="w-64 h-64 bg-white p-4 rounded-lg mb-4 flex items-center justify-center">
            <QRCodeSVG 
              value={`${selectedToken.toLowerCase()}:${walletAddress}`}
              size={240}
              level="H"
              fgColor="#000000"
              bgColor="#FFFFFF"
            />
          </div>
          
          <div className="text-sm text-gray-400 mb-1">
            {selectedNetwork} ({selectedToken})
          </div>
          <div className="text-gray-400 mb-2">عنوان محفظتك</div>
          <div className="bg-crypto-card rounded-lg p-3 w-full mb-4">
            <div className="text-sm text-white text-center overflow-auto scrollbar-none">
              {walletAddress}
            </div>
          </div>
          
          <div className="flex space-x-4 rtl:space-x-reverse mb-6">
            <button 
              onClick={handleCopy}
              className="flex items-center justify-center py-3 px-6 rounded-lg bg-crypto-card"
            >
              <Copy className="w-5 h-5 mr-2" />
              نسخ
            </button>
            
            <button 
              onClick={handleShare}
              className="flex items-center justify-center py-3 px-6 rounded-lg bg-crypto-card"
            >
              <Share2 className="w-5 h-5 mr-2" />
              مشاركة
            </button>
          </div>
          
          <button 
            className="w-full py-4 rounded-lg bg-amber-500 text-white font-bold flex items-center justify-center"
            onClick={handleConnectWallet}
          >
            <Wallet className="w-5 h-5 mr-2" />
            الإيداع من محفظة خارجية
          </button>
          
          {showConnectWallet && (
            <div className="mt-4 bg-crypto-card rounded-lg p-4 w-full">
              <div className="text-center text-lg mb-4">اختر محفظة للإيداع</div>
              <div className="grid grid-cols-2 gap-4">
                {['MetaMask', 'Trust Wallet', 'Binance Wallet', 'Coinbase Wallet', 'OKX Wallet', 'Ton Keeper', 'Phantom', 'Klever'].map((wallet) => (
                  <button 
                    key={wallet}
                    className="bg-crypto-dark p-3 rounded-lg text-center hover:bg-gray-800"
                    onClick={() => connectExternalWallet(wallet)}
                  >
                    {wallet}
                  </button>
                ))}
              </div>
              <div className="text-center mt-4">
                <div className="text-gray-400 text-sm mb-2">
                  قم بإيداع {selectedToken} على شبكة {selectedNetwork} فقط
                </div>
                <button 
                  className="text-amber-500 flex items-center justify-center mx-auto"
                  onClick={() => {
                    toast({
                      title: "دليل الإيداع",
                      description: "تم فتح دليل الإيداع من المحافظ الخارجية",
                    });
                  }}
                >
                  <ExternalLink className="w-4 h-4 mr-1" />
                  تعلم المزيد
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Receive;
