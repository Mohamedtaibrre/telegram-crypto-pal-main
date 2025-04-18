
import React from 'react';
import { ArrowUp, Plus, Percent, RotateCw, Trophy, CreditCard, Wallet, History } from 'lucide-react';
import { Link } from 'react-router-dom';

const WalletActions = () => {
  const actions = [
    { icon: <Trophy className="w-6 h-6 text-white" />, label: "مكافآت", path: "/rewards", color: "bg-crypto-card" },
    { icon: <Percent className="w-6 h-6 text-white" />, label: "كسب", path: "/earn", color: "bg-crypto-card" },
    { icon: <RotateCw className="w-6 h-6 text-white" />, label: "تحويل", path: "/swap", color: "bg-crypto-card" },
    { icon: <CreditCard className="w-6 h-6 text-white" />, label: "شراء", path: "/buy", color: "bg-crypto-card" },
    { icon: <Plus className="w-6 h-6 text-white" />, label: "إيداع", path: "/receive", color: "bg-crypto-card" },
    { icon: <ArrowUp className="w-6 h-6 text-white" />, label: "أرسل", path: "/send", color: "bg-crypto-card" },
    { icon: <Wallet className="w-6 h-6 text-white" />, label: "محافظ", path: "/wallets", color: "bg-crypto-card" },
    { icon: <History className="w-6 h-6 text-white" />, label: "سجل", path: "/history", color: "bg-crypto-card" }
  ];

  // Create rows of actions (4 per row)
  const actionRows = [];
  for (let i = 0; i < actions.length; i += 4) {
    actionRows.push(actions.slice(i, i + 4));
  }

  return (
    <div className="px-4 mb-6">
      {actionRows.map((row, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-4 gap-2 mb-4">
          {row.map((action, index) => (
            <div key={index} className="flex flex-col items-center">
              <Link to={action.path} className="w-full">
                <div className={`${action.color} w-11 h-11 rounded-xl flex items-center justify-center mb-1 mx-auto`}>
                  {action.icon}
                </div>
                <span className="text-white text-xs text-center block">{action.label}</span>
              </Link>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default WalletActions;
