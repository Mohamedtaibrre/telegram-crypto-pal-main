
import React, { useState, useEffect } from 'react';
import TelegramHeader from '@/components/TelegramHeader';
import WalletSelector from '@/components/WalletSelector';
import WalletBalance from '@/components/WalletBalance';
import WalletActions from '@/components/WalletActions';
import StakingBanner from '@/components/StakingBanner';
import TokenList from '@/components/TokenList';
import StakingOption from '@/components/StakingOption';
import NavigationBar from '@/components/NavigationBar';
import { useAuth } from '@/contexts/AuthContext';
import { getUserWallets } from '@/services/userDataService';

const Index = () => {
  const [selectedWallet, setSelectedWallet] = useState("MTG Wallet");
  const { user, isAuthenticated } = useAuth();
  const [tokens, setTokens] = useState([
    {
      name: "Meta Go",
      symbol: "MTG",
      balance: "0",
      icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTYgMjU2Ij48ZGVmcz48c3R5bGU+LmF7ZmlsbDojRjBCOTBCO308L3N0eWxlPjwvZGVmcz48cGF0aCBjbGFzcz0iYSIgZD0iTTEyOCwyNTZhMTI4LDEyOCwwLDEsMSwxMjgtMTI4QTEyOCwxMjgsMCwwLDEsMTI4LDI1NlptMCwyMGMtODEuNzMsMC0xNDgtNjYuMjctMTQ4LTE0OFM0Ni4yNy0yMCwxMjgtMjBzMTQ4LDY2LjI3LDE0OCwxNDhTMjA5LjczLDI3NiwxMjgsMjc2Wk03NS43NCwxMjkuMjFoMzAuNjZsLTEwLjMxLDE3Ljg3aDIwLjQ1bDEwLjMxLTE3Ljg3aDI5LjI3bC0xMC4zMSwxNy44N2gyMC40NWwxMC4zMS0xNy44N2gyOS4yN2wtNDIuMjQsNzMuMThoLTI5LjI4bDEwLjMxLTE3Ljg3aC0yMC40NmwtMTAuMzIsMTcuODdINzMuNTVaIi8+PC9zdmc+",
      contractAddress: "0xc8e124121985aa53cdf2a55261cb5920dc1db186",
      network: "BNB Smart Chain"
    },
    {
      name: "Binance Coin",
      symbol: "BNB",
      balance: "0",
      icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTYgMjU2Ij48ZGVmcz48c3R5bGU+LmF7ZmlsbDojRjBCOTBCO308L3N0eWxlPjwvZGVmcz48cGF0aCBjbGFzcz0iYSIgZD0iTTEyOCwyNTZhMTI4LDEyOCwwLDEsMSwxMjgtMTI4QTEyOCwxMjgsMCwwLDEsMTI4LDI1NlptMC0yNEMxOTMuOSwyMzIsMjQ3LDE3OC44OSwyNDcsMTEzUzE5My45LTYsMTI4LTYsOSw0Ny4xMSw5LDExMyw2Mi4xLDIzMiwxMjgsMjMyWk0xMjgsMTcxLjFMNzAsODQuOWgyMC43OGwyOCw1Mi41Nmw4LjQ0LDE0LjIzTDE1Niw4NC45aDE3Ljc4bC01OCw4Ni4yWm05MC4yMy0yLjIyaC0xNy43OGwtMjcuNTUtNTIuNTZMMTY0LjY3LDk4LjlsLTguNDQtMTQuMjMtNy43Ny0xMy4zNC0xLjU2LTEuNDUtLjQyLS45SDM3Ljc3TDEyOCwxNDYuMTFsOTAuMjMuODl2MjEuODhaIi8+PC9zdmc+",
    },
    {
      name: "Tether USD",
      symbol: "USDT",
      balance: "0",
      icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE2IDNDOC44IDMgMy4wMDAwMSA4LjggMy4wMDAwMSAxNkMzLjAwMDAxIDIzLjIgOC44IDI5IDE2IDI5QzIzLjIgMjkgMjkgMjMuMiAyOSAxNkMyOSA4LjggMjMuMiAzIDE2IDNaIiBmaWxsPSIjMzZCMEUzIi8+CjxwYXRoIGQ9Ik0xNy40OTk0IDEyLjg3NTVWMTAuODg2N0gyMi4yOTQ2VjcuOTI3NzNIOS43MDU0VjEwLjg4NjdIMTQuNTAwNlYxMi44NzM2QzExLjExOSAxMy4wNzcgOC41ODMwOSAxMy42ODk1IDguNTgzMDkgMTQuNDE1OUM4LjU4MzA5IDE1LjE0MjQgMTEuMTIwOCAxNS43NTQ5IDE0LjUwMDYgMTUuOTU4M1YyMy4xNzg0SDE3LjQ5OTRWMTU5NTY0QzIwLjg3NzIgMTUuNzU0OSAyMy40MDg1IDE1LjE0MDUgMjMuNDA4NSAxNC40MTRDMjMuNDA4NSAxMy42ODc1IDIwLjg3NTMgMTMuMDc3IDE3LjQ5OTQgMTMuNjM2M1YxNS4xOTM1Wk0xNC41MDA2IDEzLjYzODJDMTQuNDc4IDE0LjYzNjMgMTEuNDE2NiAxMy44NzQxIDExLjQxNjYgMTQuNDE1OUMxMS40MTY2IDE0Ljk1NzYgMTQuNDc2MiAxNS4xOTM1IDE0LjUwMDYgMTUuMTk1NFYxMy42MzgyWiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg==",
    }
  ]);
  
  useEffect(() => {
    // Load user wallet data when authenticated
    const fetchUserWallets = async () => {
      if (isAuthenticated && user) {
        try {
          const userWallets = await getUserWallets(user.telegramId);
          
          const updatedTokens = tokens.map(token => {
            const userWallet = userWallets.find(w => w.token === token.symbol);
            return {
              ...token,
              balance: userWallet?.balance || "0"
            };
          });
          
          setTokens(updatedTokens);
        } catch (error) {
          console.error("Error fetching user wallets:", error);
        }
      }
    };
    
    fetchUserWallets();
  }, [isAuthenticated, user]);
  
  // Calculate total balance in MTG for display
  const totalBalance = tokens.find(t => t.symbol === "MTG")?.balance || "0";
  
  return (
    <div className="min-h-screen bg-crypto-dark text-white flex flex-col">
      <TelegramHeader walletName={user?.firstName ? `محفظة ${user.firstName}` : "محفظة"} />
      
      <div className="flex-1 pb-16">
        <WalletSelector 
          selectedWallet={selectedWallet}
          wallets={["MTG Wallet", "My Wallet"]}
          onSelect={setSelectedWallet}
        />
        
        <WalletBalance 
          walletName={selectedWallet}
          defaultCurrency="MTG"
        />
        
        <WalletActions />
        
        <StakingBanner />
        
        <TokenList tokens={tokens} />
        
        <StakingOption 
          name="تكديس MTG"
          apy="5.2%"
        />
      </div>
      
      <NavigationBar />
    </div>
  );
};

export default Index;
