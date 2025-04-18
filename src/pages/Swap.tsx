import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowDown, Settings, RotateCw, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getUserWallets, addTransaction, updateWalletBalance, getUserData } from '../services/userDataService';
import { useToast } from "@/hooks/use-toast";

const Swap = () => {
  const [fromToken, setFromToken] = useState("MTG");
  const [toToken, setToToken] = useState("USDT");
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [exchangeRate, setExchangeRate] = useState("0.75");
  const [slippage, setSlippage] = useState("0.5");
  const [availableBalances, setAvailableBalances] = useState({});
  const { toast } = useToast();
  const { user } = useAuth();

  const tokenOptions = [
    { value: "MTG", label: "MTG", fullName: "Meta Go" },
    { value: "BNB", label: "BNB", fullName: "Binance Coin" },
    { value: "USDT", label: "USDT", fullName: "Tether USD" },
    { value: "TON", label: "TON", fullName: "Toncoin" },
    { value: "ETH", label: "ETH", fullName: "Ethereum" },
    { value: "USDC", label: "USDC", fullName: "USD Coin" },
    { value: "SOL", label: "SOL", fullName: "Solana" },
    { value: "TRX", label: "TRX", fullName: "Tron" }
  ];

  const exchangeRates = {
    "MTG_USDT": "0.75",
    "MTG_BNB": "0.0025",
    "MTG_TON": "0.15",
    "MTG_ETH": "0.00025",
    "BNB_USDT": "300",
    "ETH_USDT": "3000",
    "SOL_USDT": "150",
    "TON_USDT": "5",
    "TRX_USDT": "0.1",
    "USDC_USDT": "1"
  };

  const getRate = (from, to) => {
    const directRate = exchangeRates[`${from}_${to}`];
    if (directRate) return directRate;
    
    const reverseRate = exchangeRates[`${to}_${from}`];
    if (reverseRate) return (1 / parseFloat(reverseRate)).toFixed(8);
    
    const fromToUSDT = exchangeRates[`${from}_USDT`] || (1 / parseFloat(exchangeRates[`USDT_${from}`] || "0"));
    const usdtToTarget = exchangeRates[`USDT_${to}`] || (1 / parseFloat(exchangeRates[`${to}_USDT`] || "0"));
    
    if (fromToUSDT && usdtToTarget) {
      return (parseFloat(fromToUSDT) * parseFloat(usdtToTarget)).toFixed(8);
    }
    
    return "0";
  };

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

  const getTokenFullName = (value) => {
    const token = tokenOptions.find(t => t.value === value);
    return token ? token.fullName : value;
  };

  useEffect(() => {
    const rate = getRate(fromToken, toToken);
    setExchangeRate(rate);
    
    if (fromAmount) {
      const calculatedAmount = (parseFloat(fromAmount) * parseFloat(rate)).toFixed(6);
      setToAmount(calculatedAmount);
    }
  }, [fromToken, toToken]);

  const handleFromAmountChange = (e) => {
    const value = e.target.value;
    setFromAmount(value);
    
    if (value && !isNaN(value)) {
      const calculatedAmount = (parseFloat(value) * parseFloat(exchangeRate)).toFixed(6);
      setToAmount(calculatedAmount);
    } else {
      setToAmount("");
    }
  };

  const handleToAmountChange = (e) => {
    const value = e.target.value;
    setToAmount(value);
    
    if (value && !isNaN(value)) {
      const calculatedAmount = (parseFloat(value) / parseFloat(exchangeRate)).toFixed(6);
      setFromAmount(calculatedAmount);
    } else {
      setFromAmount("");
    }
  };

  const switchTokens = () => {
    const tempToken = fromToken;
    setFromToken(toToken);
    setToToken(tempToken);
    
    const tempAmount = fromAmount;
    setFromAmount(toAmount);
    setToAmount(tempAmount);
  };

  const handleSwap = async () => {
    if (!user) {
      toast({
        title: "خطأ",
        description: "يرجى تسجيل الدخول أولاً",
        variant: "destructive"
      });
      return;
    }
    
    if (!fromAmount || parseFloat(fromAmount) <= 0) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال مبلغ صالح",
        variant: "destructive"
      });
      return;
    }
    
    const fromBalance = parseFloat(availableBalances[fromToken] || "0");
    
    if (parseFloat(fromAmount) > fromBalance) {
      toast({
        title: "خطأ",
        description: "رصيد غير كافٍ",
        variant: "destructive"
      });
      return;
    }
    
    try {
      const newFromBalance = (fromBalance - parseFloat(fromAmount)).toFixed(6);
      await updateWalletBalance(user.telegramId, fromToken, newFromBalance);
      
      const toBalance = parseFloat(availableBalances[toToken] || "0");
      const newToBalance = (toBalance + parseFloat(toAmount)).toFixed(6);
      await updateWalletBalance(user.telegramId, toToken, newToBalance);
      
      await addTransaction(user.telegramId, {
        type: 'swap',
        amount: fromAmount,
        token: fromToken,
        status: 'completed',
        note: `تبديل من ${fromAmount} ${fromToken} إلى ${toAmount} ${toToken}`
      });
      
      setAvailableBalances({
        ...availableBalances,
        [fromToken]: newFromBalance,
        [toToken]: newToBalance
      });
      
      toast({
        title: "تم التبديل",
        description: `تم تبديل ${fromAmount} ${fromToken} إلى ${toAmount} ${toToken} بنجاح`,
      });
      
      setFromAmount("");
      setToAmount("");
    } catch (error) {
      console.error('Error processing swap:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء معالجة عملية التبديل",
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
        <h1 className="text-xl font-bold">تبادل</h1>
        <div className="ml-auto">
          <button className="p-1">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 p-4">
        <div className="mb-2">
          <label className="block text-sm text-gray-400 mb-2">من</label>
          <div className="bg-crypto-card rounded-lg p-4">
            <div className="flex justify-between mb-2">
              <select
                className="bg-transparent text-white text-lg font-medium focus:outline-none appearance-none"
                value={fromToken}
                onChange={(e) => setFromToken(e.target.value)}
              >
                {tokenOptions.map(token => (
                  <option key={token.value} value={token.value}>{token.label}</option>
                ))}
              </select>
              
              <input
                type="text"
                value={fromAmount}
                onChange={handleFromAmountChange}
                placeholder="0.00"
                className="bg-transparent text-white text-right text-lg w-1/2 focus:outline-none"
              />
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">{getTokenFullName(fromToken)}</span>
              <span className="text-gray-400">
                المتاح: {availableBalances[fromToken] || "0"}
                <button 
                  className="text-amber-500 mr-2"
                  onClick={() => setFromAmount(availableBalances[fromToken] || "0")}
                >
                  الحد الأقصى
                </button>
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center my-2">
          <button 
            onClick={switchTokens}
            className="w-10 h-10 rounded-full bg-crypto-card flex items-center justify-center"
          >
            <ArrowDown className="w-5 h-5 text-white" />
          </button>
        </div>
        
        <div className="mb-6">
          <label className="block text-sm text-gray-400 mb-2">إلى</label>
          <div className="bg-crypto-card rounded-lg p-4">
            <div className="flex justify-between mb-2">
              <select
                className="bg-transparent text-white text-lg font-medium focus:outline-none appearance-none"
                value={toToken}
                onChange={(e) => setToToken(e.target.value)}
              >
                {tokenOptions.map(token => (
                  <option key={token.value} value={token.value}>{token.label}</option>
                ))}
              </select>
              
              <input
                type="text"
                value={toAmount}
                onChange={handleToAmountChange}
                placeholder="0.00"
                className="bg-transparent text-white text-right text-lg w-1/2 focus:outline-none"
              />
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">{getTokenFullName(toToken)}</span>
              <span className="text-gray-400">المتاح: {availableBalances[toToken] || "0"}</span>
            </div>
          </div>
        </div>
        
        {fromAmount && parseFloat(fromAmount) > parseFloat(availableBalances[fromToken] || "0") && (
          <div className="mb-4 p-3 bg-amber-500/20 border border-amber-500/30 rounded-lg flex items-start">
            <AlertTriangle className="w-5 h-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <div className="font-semibold text-amber-500">رصيد غير كافٍ</div>
              <div className="text-gray-300">المبلغ المطلوب يتجاوز رصيدك الحالي.</div>
            </div>
          </div>
        )}
        
        <div className="bg-crypto-card rounded-lg p-4 mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-gray-400">سعر</span>
            <span className="text-white">1 {fromToken} = {exchangeRate} {toToken}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-400">رسوم المنصة</span>
            <span className="text-white">{slippage}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">الحد الأدنى للاستلام</span>
            <span className="text-white">
              {toAmount ? (parseFloat(toAmount) * (1 - parseFloat(slippage) / 100)).toFixed(6) : "0"} {toToken}
            </span>
          </div>
        </div>
        
        <button 
          className="w-full py-4 rounded-lg bg-amber-500 text-white font-bold flex items-center justify-center"
          disabled={!fromAmount || parseFloat(fromAmount) <= 0 || parseFloat(fromAmount) > parseFloat(availableBalances[fromToken] || "0") || fromToken === toToken}
          onClick={handleSwap}
        >
          <RotateCw className="w-5 h-5 mr-2" />
          استبدال
        </button>
      </div>
    </div>
  );
};

export default Swap;
