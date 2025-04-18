
import React from 'react';
import { Menu, Home, Settings, CreditCard } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const NavigationBar = () => {
  const location = useLocation();
  
  return (
    <div className="fixed bottom-0 left-0 right-0 border-t border-gray-800 bg-crypto-dark flex justify-around p-2">
      <Link to="/" className="p-3 rounded-full">
        <Home className={`w-6 h-6 ${location.pathname === '/' ? 'text-crypto-blue' : 'text-white'}`} />
      </Link>
      
      <Link to="/card" className="p-3 rounded-full">
        <CreditCard className={`w-6 h-6 ${location.pathname === '/card' ? 'text-crypto-blue' : 'text-white'}`} />
      </Link>
      
      <Link to="/history" className="p-3 rounded-full">
        <Menu className={`w-6 h-6 ${location.pathname === '/history' ? 'text-crypto-blue' : 'text-white'}`} />
      </Link>
      
      <Link to="/settings" className="p-3 rounded-full">
        <Settings className={`w-6 h-6 ${location.pathname === '/settings' ? 'text-crypto-blue' : 'text-white'}`} />
      </Link>
    </div>
  );
};

export default NavigationBar;
