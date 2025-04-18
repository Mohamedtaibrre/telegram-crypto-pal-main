
import React, { useState, useEffect } from 'react';
import { Search, UserCircle, Wallet, ArrowUpRight, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';

// Function to get all user IDs from localStorage
const getAllUserIds = (): string[] => {
  const userIds: string[] = [];
  const prefix = 'mtg_user_data_';
  
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith(prefix)) {
      userIds.push(key.replace(prefix, ''));
    }
  }
  
  return userIds;
};

// Function to get user data
const getUserData = (telegramId: string) => {
  const dataKey = `mtg_user_data_${telegramId}`;
  const savedData = localStorage.getItem(dataKey);
  
  if (savedData) {
    try {
      return JSON.parse(savedData);
    } catch (error) {
      console.error('Failed to parse user data:', error);
      return null;
    }
  }
  
  return null;
};

// Function to get user profile
const getUserProfile = (telegramId: string) => {
  const userKey = 'mtg_user';
  const allUsers = [];
  
  // Try to find the user in localStorage
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key === userKey) {
      try {
        const userData = JSON.parse(localStorage.getItem(key) || '');
        if (userData && userData.telegramId === telegramId) {
          return userData;
        }
        
        // Save all users for later use
        if (userData) {
          allUsers.push(userData);
        }
      } catch (error) {
        console.error('Failed to parse user data:', error);
      }
    }
  }
  
  // If not found, return placeholder data
  return {
    id: `user_${telegramId}`,
    telegramId,
    username: 'مستخدم',
    firstName: 'مستخدم',
    lastName: telegramId,
  };
};

const AdminUsers = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [withdrawAddress, setWithdrawAddress] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawToken, setWithdrawToken] = useState('MTG');
  const [note, setNote] = useState('');
  
  useEffect(() => {
    // Get all user IDs
    const userIds = getAllUserIds();
    
    // Get user data and profiles
    const userData = userIds.map(id => {
      const data = getUserData(id);
      const profile = getUserProfile(id);
      
      return {
        id,
        profile,
        data
      };
    });
    
    setUsers(userData);
  }, []);
  
  const filteredUsers = users.filter(user => {
    const searchLower = searchTerm.toLowerCase();
    return (
      user.id.includes(searchLower) ||
      (user.profile?.username && user.profile.username.toLowerCase().includes(searchLower)) ||
      (user.profile?.firstName && user.profile.firstName.toLowerCase().includes(searchLower)) ||
      (user.profile?.lastName && user.profile.lastName.toLowerCase().includes(searchLower))
    );
  });
  
  // Handle user selection
  const handleSelectUser = (user: any) => {
    setSelectedUser(user);
    setWithdrawAddress('');
    setWithdrawAmount('');
    setWithdrawToken('MTG');
    setNote('');
  };
  
  // Handle admin withdrawal
  const handleAdminWithdrawal = () => {
    if (!selectedUser || !withdrawAddress || !withdrawAmount) {
      alert('يرجى ملء جميع الحقول المطلوبة');
      return;
    }
    
    // This would typically involve blockchain operations
    // For now, we'll just update the local data for demonstration
    
    alert('تم إرسال طلب السحب بنجاح');
    
    // Reset form
    setWithdrawAddress('');
    setWithdrawAmount('');
    setNote('');
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">إدارة المستخدمين</h2>
        <div className="text-sm text-gray-400">إجمالي المستخدمين: {users.length}</div>
      </div>
      
      <div className="relative">
        <Search className="absolute left-3 top-3 text-gray-400" />
        <Input
          type="text"
          placeholder="بحث عن مستخدم بواسطة الاسم أو معرف Telegram"
          className="pl-10 bg-crypto-card border-gray-700"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Users list */}
        <div className="col-span-1 bg-crypto-card rounded-lg p-4 h-[600px] overflow-y-auto">
          <h3 className="text-lg font-medium mb-4">قائمة المستخدمين</h3>
          
          {filteredUsers.length === 0 ? (
            <div className="text-center py-10 text-gray-400">
              لا يوجد مستخدمين مطابقين للبحث
            </div>
          ) : (
            <div className="space-y-2">
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className={`p-3 rounded-lg cursor-pointer ${
                    selectedUser?.id === user.id ? 'bg-amber-500/20 border border-amber-500/40' : 'hover:bg-gray-800'
                  }`}
                  onClick={() => handleSelectUser(user)}
                >
                  <div className="flex items-center">
                    <UserCircle className="w-8 h-8 text-amber-500 mr-2" />
                    <div>
                      <div className="font-medium">
                        {user.profile?.firstName || 'مستخدم'} {user.profile?.lastName || ''}
                      </div>
                      <div className="text-sm text-gray-400">
                        ID: {user.id}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* User details */}
        {selectedUser ? (
          <div className="col-span-2 grid grid-cols-1 gap-6">
            {/* User info and balances */}
            <div className="bg-crypto-card rounded-lg p-6">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center">
                  <UserCircle className="w-12 h-12 text-amber-500 mr-3" />
                  <div>
                    <h3 className="text-xl font-bold">
                      {selectedUser.profile?.firstName || 'مستخدم'} {selectedUser.profile?.lastName || ''}
                    </h3>
                    <div className="text-gray-400">@{selectedUser.profile?.username || selectedUser.id}</div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-sm text-gray-400">معرف Telegram</div>
                  <div className="font-medium">{selectedUser.id}</div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {selectedUser.data?.wallets?.map((wallet: any, index: number) => (
                  <div key={index} className="bg-crypto-dark p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <div className="text-sm text-gray-400">{wallet.token}</div>
                      <Wallet className="w-4 h-4 text-amber-500" />
                    </div>
                    <div className="text-lg font-bold">{wallet.balance}</div>
                    <div className="text-xs text-gray-400">{wallet.network}</div>
                  </div>
                ))}
              </div>
              
              {/* Admin actions */}
              <div className="bg-crypto-dark p-4 rounded-lg">
                <h4 className="font-medium mb-4">سحب الرصيد (المشرف)</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">العملة</label>
                    <select
                      className="w-full bg-crypto-card border border-gray-700 rounded-lg p-2"
                      value={withdrawToken}
                      onChange={(e) => setWithdrawToken(e.target.value)}
                    >
                      {selectedUser.data?.wallets?.map((wallet: any, index: number) => (
                        <option key={index} value={wallet.token}>
                          {wallet.token} (الرصيد: {wallet.balance})
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">المبلغ</label>
                    <Input
                      type="text"
                      placeholder="0.00"
                      className="bg-crypto-card border-gray-700"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm text-gray-400 mb-1">عنوان المحفظة</label>
                  <Input
                    type="text"
                    placeholder="0x..."
                    className="bg-crypto-card border-gray-700"
                    value={withdrawAddress}
                    onChange={(e) => setWithdrawAddress(e.target.value)}
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm text-gray-400 mb-1">ملاحظة (اختياري)</label>
                  <Input
                    type="text"
                    placeholder="ملاحظة للسحب"
                    className="bg-crypto-card border-gray-700"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                </div>
                
                <button
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white p-3 rounded-lg font-medium transition-colors"
                  onClick={handleAdminWithdrawal}
                >
                  تنفيذ عملية السحب
                </button>
              </div>
            </div>
            
            {/* Transaction history */}
            <div className="bg-crypto-card rounded-lg p-6">
              <h3 className="text-lg font-medium mb-4">سجل المعاملات</h3>
              
              {selectedUser.data?.transactions?.length > 0 ? (
                <div className="space-y-3">
                  {selectedUser.data.transactions.map((tx: any, index: number) => (
                    <div key={index} className="bg-crypto-dark p-3 rounded-lg flex justify-between items-center">
                      <div className="flex items-center">
                        {tx.type === 'send' && <ArrowUpRight className="w-5 h-5 text-red-500 mr-2" />}
                        {tx.type === 'receive' && <ArrowUpRight className="w-5 h-5 text-green-500 transform rotate-180 mr-2" />}
                        {tx.type === 'swap' && <ArrowUpRight className="w-5 h-5 text-blue-500 transform rotate-90 mr-2" />}
                        {tx.type === 'admin_withdrawal' && <ArrowUpRight className="w-5 h-5 text-amber-500 mr-2" />}
                        <div>
                          <div className="font-medium">
                            {tx.amount} {tx.token}
                          </div>
                          <div className="text-xs text-gray-400">
                            {tx.type === 'send' && 'إرسال'}
                            {tx.type === 'receive' && 'استلام'}
                            {tx.type === 'swap' && 'تبديل'}
                            {tx.type === 'admin_withdrawal' && 'سحب إداري'}
                            {tx.note && ` - ${tx.note}`}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className={`text-sm ${
                          tx.status === 'completed' ? 'text-green-500' : 
                          tx.status === 'pending' ? 'text-amber-500' : 'text-red-500'
                        }`}>
                          {tx.status === 'completed' && 'مكتمل'}
                          {tx.status === 'pending' && 'قيد الانتظار'}
                          {tx.status === 'failed' && 'فشل'}
                        </div>
                        <div className="flex items-center text-xs text-gray-400">
                          <Clock className="w-3 h-3 mr-1" />
                          {new Date(tx.timestamp).toLocaleString('ar-SA')}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 text-gray-400">
                  لا توجد معاملات بعد
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="col-span-2 bg-crypto-card rounded-lg p-6 flex items-center justify-center h-[600px]">
            <div className="text-center">
              <UserCircle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-400">اختر مستخدمًا لعرض التفاصيل</h3>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
