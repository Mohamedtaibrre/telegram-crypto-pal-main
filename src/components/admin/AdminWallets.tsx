
import React, { useState } from 'react';
import { Search, ArrowDownToLine, Eye, AlertTriangle, MoreHorizontal, UserPlus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

// Mock users data - in a real app this would come from an API
const mockUsers = [
  { 
    id: 1, 
    username: 'user1', 
    email: 'user1@example.com',
    walletAddress: '0x1234...5678',
    balances: [
      { token: 'MTG', amount: '5,000' },
      { token: 'BNB', amount: '2.45' },
      { token: 'USDT', amount: '1,200' }
    ]
  },
  { 
    id: 2, 
    username: 'user2', 
    email: 'user2@example.com',
    walletAddress: '0x5678...9012',
    balances: [
      { token: 'MTG', amount: '12,500' },
      { token: 'BNB', amount: '4.87' },
      { token: 'USDT', amount: '3,600' }
    ]
  },
  { 
    id: 3, 
    username: 'user3', 
    email: 'user3@example.com',
    walletAddress: '0x9012...3456',
    balances: [
      { token: 'MTG', amount: '8,700' },
      { token: 'BNB', amount: '1.02' },
      { token: 'USDT', amount: '895' }
    ]
  }
];

const AdminWallets = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [withdrawDialog, setWithdrawDialog] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawToken, setWithdrawToken] = useState('MTG');
  const [destinationAddress, setDestinationAddress] = useState('');
  const [adminNote, setAdminNote] = useState('');
  const { toast } = useToast();

  const filteredUsers = mockUsers.filter(user => 
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.walletAddress.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleWithdraw = () => {
    // In a real implementation, this would call an API to initiate the withdrawal
    toast({
      title: "تم إرسال طلب السحب",
      description: `تم سحب ${withdrawAmount} ${withdrawToken} من محفظة ${selectedUser.username} إلى العنوان ${destinationAddress.substring(0, 10)}...`,
    });
    
    // Reset form and close dialog
    setWithdrawDialog(false);
    setWithdrawAmount('');
    setDestinationAddress('');
    setAdminNote('');
  };

  const openWithdrawDialog = (user: any) => {
    setSelectedUser(user);
    setWithdrawDialog(true);
    // Set default token
    setWithdrawToken(user.balances[0]?.token || 'MTG');
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">إدارة المحافظ</h2>
        <div className="text-sm text-gray-400">إدارة محافظ المستخدمين وعمليات السحب</div>
      </div>
      
      <div className="bg-crypto-card rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="بحث عن مستخدم، عنوان..."
              className="pl-10 bg-crypto-dark border-gray-700 text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Button className="bg-amber-500 hover:bg-amber-600">
            <UserPlus className="w-4 h-4 mr-2" />
            إضافة مستخدم
          </Button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="py-3 px-4 text-right text-gray-400 font-medium">المستخدم</th>
                <th className="py-3 px-4 text-right text-gray-400 font-medium">عنوان المحفظة</th>
                <th className="py-3 px-4 text-right text-gray-400 font-medium">الرصيد (MTG)</th>
                <th className="py-3 px-4 text-right text-gray-400 font-medium">الرصيد (BNB)</th>
                <th className="py-3 px-4 text-right text-gray-400 font-medium">الرصيد (USDT)</th>
                <th className="py-3 px-4 text-right text-gray-400 font-medium">العمليات</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                  <td className="py-3 px-4">
                    <div>
                      <div className="font-medium">{user.username}</div>
                      <div className="text-sm text-gray-400">{user.email}</div>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-mono text-sm">{user.walletAddress}</td>
                  <td className="py-3 px-4">{user.balances.find(b => b.token === 'MTG')?.amount || '0'}</td>
                  <td className="py-3 px-4">{user.balances.find(b => b.token === 'BNB')?.amount || '0'}</td>
                  <td className="py-3 px-4">{user.balances.find(b => b.token === 'USDT')?.amount || '0'}</td>
                  <td className="py-3 px-4">
                    <div className="flex justify-end items-center space-x-2 rtl:space-x-reverse">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => openWithdrawDialog(user)}
                      >
                        <ArrowDownToLine className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>خيارات</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>تجميد الحساب</DropdownMenuItem>
                          <DropdownMenuItem>تعديل الرصيد</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-500">
                            حذف الحساب
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-gray-400">
                    لا توجد نتائج للبحث
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Withdraw Dialog */}
      <Dialog open={withdrawDialog} onOpenChange={setWithdrawDialog}>
        <DialogContent className="bg-crypto-dark text-white border-gray-700 max-w-md">
          <DialogHeader>
            <DialogTitle>سحب من محفظة المستخدم</DialogTitle>
            <DialogDescription className="text-gray-400">
              {selectedUser && `سحب الأموال من محفظة ${selectedUser.username}`}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 my-2">
            <div>
              <label className="block text-sm text-gray-400 mb-1">العملة</label>
              <select
                className="w-full bg-crypto-card border border-gray-700 rounded-lg p-2 text-white"
                value={withdrawToken}
                onChange={(e) => setWithdrawToken(e.target.value)}
              >
                {selectedUser?.balances.map((balance: any) => (
                  <option key={balance.token} value={balance.token}>
                    {balance.token} (الرصيد: {balance.amount})
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm text-gray-400 mb-1">المبلغ</label>
              <Input
                type="text"
                className="bg-crypto-card border-gray-700 text-white"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                placeholder="أدخل المبلغ"
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-400 mb-1">عنوان المحفظة الوجهة</label>
              <Input
                type="text"
                className="bg-crypto-card border-gray-700 text-white"
                value={destinationAddress}
                onChange={(e) => setDestinationAddress(e.target.value)}
                placeholder="0x..."
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-400 mb-1">ملاحظات المشرف (اختياري)</label>
              <Input
                type="text"
                className="bg-crypto-card border-gray-700 text-white"
                value={adminNote}
                onChange={(e) => setAdminNote(e.target.value)}
                placeholder="سبب السحب أو ملاحظات أخرى"
              />
            </div>
            
            <div className="flex items-start p-3 bg-amber-500/10 rounded-lg border border-amber-500/20">
              <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 mr-2" />
              <div className="text-sm">
                <p className="font-medium text-amber-500">تنبيه أمان</p>
                <p className="text-gray-300">هذا الإجراء سيسحب الأموال من محفظة المستخدم. يجب استخدام هذه الميزة فقط للحالات الضرورية وبموافقة المستخدم.</p>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setWithdrawDialog(false)}
            >
              إلغاء
            </Button>
            <Button 
              className="bg-amber-500 hover:bg-amber-600"
              onClick={handleWithdraw}
              disabled={!withdrawAmount || !destinationAddress}
            >
              تأكيد السحب
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Transaction History */}
      <div className="bg-crypto-card rounded-lg p-6">
        <h3 className="text-xl font-medium mb-4">سجل عمليات السحب الإدارية</h3>
        
        <div className="text-center text-gray-400 py-8">
          لا توجد عمليات سحب سابقة
        </div>
      </div>
    </div>
  );
};

export default AdminWallets;
