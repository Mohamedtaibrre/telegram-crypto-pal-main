import React, { useState, useEffect } from 'react';
import { ArrowLeft, QrCode, Send as SendIcon, Wallet, ExternalLink, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '../contexts/AuthContext';
import { getUserWallets, addTransaction, updateWalletBalance } from '../services/userDataService';

const Send = () => {
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");
  const [selectedToken, setSelectedToken] = useState("MTG");
  const [selectedNetwork, setSelectedNetwork] = useState("BNB Smart Chain");
  const [memo, setMemo] = useState("");
  const [showConnectWallet, setShowConnectWallet] = useState(false);
  const [availableBalances, setAvailableBalances] = useState({});
  const { toast } = useToast();
  const { user } = useAuth();

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
    return { 
      value: token, 
      label: `${token} - ${token === "MTG" ? "Meta Go" : token} (${networks})`,
      balance: availableBalances[token] || "0.0"
    };
  });

  // Get available networks for the selected token
  const availableNetworks = tokenNetworks[selectedToken] || [];

  // Load user balances if authenticated
  useEffect(() => {
    const fetchWallets = async () => {
      if (user) {
        try {
          const wallets = await getUserWallets(user.telegramId);
          const balances = {};
          
          wallets.forEach(wallet => {
            balances[wallet.token] = wallet.balance;
          });
          
          setAvailableBalances(balances);
        } catch (error) {
          console.error("Error fetching wallet data:", error);
        }
      }
    };
    
    fetchWallets();
  }, [user]);

  const handleTokenChange = (e) => {
    const newToken = e.target.value;
    setSelectedToken(newToken);
    
    // Default to first available network for the selected token
    if (tokenNetworks[newToken] && tokenNetworks[newToken].length > 0) {
      setSelectedNetwork(tokenNetworks[newToken][0]);
    }
  };

  const handleScanQR = () => {
    // In a real implementation, this would open the camera to scan a QR code
    toast({
      title: "مسح الرمز",
      description: "افتح الكاميرا لمسح عنوان المحفظة",
    });
  };

  const handleConnectWallet = () => {
    setShowConnectWallet(!showConnectWallet);
  };

  const handleSend = async () => {
    if (!user) {
      toast({
        title: "خطأ",
        description: "يرجى تسجيل الدخول أولاً",
        variant: "destructive"
      });
      return;
    }
    
    if (!amount || !address) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال المبلغ والعنوان",
        variant: "destructive"
      });
      return;
    }
    
    const balance = parseFloat(availableBalances[selectedToken] || "0");
    const sendAmount = parseFloat(amount);
    
    if (sendAmount > balance) {
      toast({
        title: "خطأ",
        description: "رصيد غير كافٍ",
        variant: "destructive"
      });
      return;
    }
    
    try {
      // Update balance
      const newBalance = (balance - sendAmount).toFixed(6);
      await updateWalletBalance(user.telegramId, selectedToken, newBalance);
      
      // Add transaction
      await addTransaction(user.telegramId, {
        type: 'send',
        amount: amount,
        token: selectedToken,
        status: 'completed',
        toAddress: address,
        note: memo || `إرسال ${amount} ${selectedToken} إلى ${address.substring(0, 6)}...${address.substring(address.length - 4)}`
      });
      
      // Update available balance
      setAvailableBalances({
        ...availableBalances,
        [selectedToken]: newBalance
      });
      
      // Show success message
      toast({
        title: "تم الإرسال",
        description: `تم إرسال ${amount} ${selectedToken} إلى ${address.substring(0, 6)}...${address.substring(address.length - 4)}`,
      });
      
      // Reset form
      setAmount("");
      setAddress("");
      setMemo("");
    } catch (error) {
      console.error('Error processing transaction:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء معالجة المعاملة",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-crypto-dark text-white flex flex-col">
      <div className="flex items-center p-4 border-b border-gray-800">
        <Link to="/" className="mr-4">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-xl font-bold">إرسال</h1>
      </div>

      <div className="flex-1 p-4">
        <div className="mb-6">
          <label className="block text-sm text-gray-400 mb-2">اختر العملة</label>
          <div className="bg-crypto-card rounded-lg p-4 flex items-center justify-between">
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
          <div className="mb-6">
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

        <div className="mb-6">
          <label className="block text-sm text-gray-400 mb-2">المبلغ</label>
          <div className="bg-crypto-card rounded-lg p-4">
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="bg-transparent text-white text-2xl w-full focus:outline-none"
            />
            <div className="flex justify-between text-gray-400 text-sm mt-2">
              <button 
                className="text-amber-500"
                onClick={() => setAmount(availableBalances[selectedToken] || "0")}
              >
                الحد الأقصى
              </button>
              <div>
                المتاح: {availableBalances[selectedToken] || "0"} {selectedToken}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm text-gray-400 mb-2">العنوان</label>
          <div className="bg-crypto-card rounded-lg p-4 flex items-center">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="أدخل عنوان المستلم أو المعرف"
              className="bg-transparent text-white flex-1 focus:outline-none"
            />
            <button 
              className="ml-2 text-crypto-blue"
              onClick={handleScanQR}
            >
              <QrCode className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm text-gray-400 mb-2">ملاحظة (اختياري)</label>
          <div className="bg-crypto-card rounded-lg p-4">
            <input
              type="text"
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              placeholder="أضف ملاحظة مع المعاملة"
              className="bg-transparent text-white w-full focus:outline-none"
            />
          </div>
        </div>

        {amount && parseFloat(amount) > parseFloat(availableBalances[selectedToken] || "0") && (
          <div className="mb-6 p-3 bg-amber-500/20 border border-amber-500/30 rounded-lg flex items-start">
            <AlertTriangle className="w-5 h-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <div className="font-semibold text-amber-500">رصيد غير كافٍ</div>
              <div className="text-gray-300">المبلغ المطلوب يتجاوز رصيدك الحالي.</div>
            </div>
          </div>
        )}

        <button 
          className="w-full py-4 rounded-lg bg-amber-500 text-white font-bold flex items-center justify-center mb-4"
          disabled={!amount || !address || (parseFloat(amount) > parseFloat(availableBalances[selectedToken] || "0"))}
          onClick={handleSend}
        >
          <SendIcon className="w-5 h-5 mr-2" />
          إرسال
        </button>

        <button 
          className="w-full py-3 rounded-lg bg-crypto-card text-white flex items-center justify-center"
          onClick={handleConnectWallet}
        >
          <Wallet className="w-5 h-5 mr-2" />
          ربط بمحفظة خارجية
        </button>

        {showConnectWallet && (
          <div className="mt-4 bg-crypto-card rounded-lg p-4">
            <div className="text-center text-lg mb-4">اختر محفظة</div>
            <div className="grid grid-cols-2 gap-4">
              {['MetaMask', 'Trust Wallet', 'Binance Wallet', 'Coinbase Wallet', 'OKX Wallet', 'Ton Keeper', 'Phantom', 'Klever'].map((wallet) => (
                <button 
                  key={wallet}
                  className="bg-crypto-dark p-3 rounded-lg text-center hover:bg-gray-800"
                  onClick={() => {
                    toast({
                      title: "ربط المحفظ��",
                      description: `جاري الاتصال بـ ${wallet}...`,
                    });
                  }}
                >
                  {wallet}
                </button>
              ))}
            </div>
            <div className="text-center mt-4">
              <button 
                className="text-amber-500 flex items-center justify-center mx-auto"
                onClick={() => {
                  toast({
                    title: "دليل المحافظ",
                    description: "تم فتح دليل ربط المحافظ",
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
  );
};

export default Send;
