
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Settings, Users, TrendingUp, Percent, Lock, Gift, Wallet, Database } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminPanel = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [analytics, setAnalytics] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [cards, setCards] = useState<any[]>([]);
  const [rewards, setRewards] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [analyticsData, usersData, txData, cardsData, rewardsData, settingsData] = await Promise.all([
        getAnalytics(),
        getUsers(),
        getTransactions(),
        getCards(),
        getRewards(),
        getPlatformSettings()
      ]);

      setAnalytics(analyticsData);
      setUsers(usersData);
      setTransactions(txData);
      setCards(cardsData);
      setRewards(rewardsData);
      setSettings(settingsData);
    } catch (error: any) {
      toast({
        title: 'خطأ في تحميل البيانات',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUserStatus = async (userId: string, status: 'active' | 'blocked') => {
    try {
      await updateUserStatus(userId, status);
      await loadData();
      toast({
        title: 'تم تحديث حالة المستخدم',
        description: 'تم تحديث حالة المستخدم بنجاح',
      });
    } catch (error: any) {
      toast({
        title: 'خطأ في تحديث حالة المستخدم',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleSettingsUpdate = async (newSettings: any) => {
    try {
      await updatePlatformSettings(newSettings);
      setSettings(newSettings);
      toast({
        title: 'تم تحديث الإعدادات',
        description: 'تم تحديث إعدادات المنصة بنجاح',
      });
    } catch (error: any) {
      toast({
        title: 'خطأ في تحديث الإعدادات',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-crypto-dark">
        <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-crypto-dark text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">لوحة التحكم</h1>

        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-crypto-darker">
            <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
            <TabsTrigger value="users">المستخدمين</TabsTrigger>
            <TabsTrigger value="transactions">المعاملات</TabsTrigger>
            <TabsTrigger value="cards">البطاقات</TabsTrigger>
            <TabsTrigger value="rewards">المكافآت</TabsTrigger>
            <TabsTrigger value="settings">الإعدادات</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>إجمالي المستخدمين</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{analytics?.totalUsers}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>إجمالي المعاملات</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{analytics?.totalTransactions}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>البطاقات النشطة</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{analytics?.activeCards}</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <div className="bg-crypto-darker rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">إدارة المستخدمين</h2>
              <div className="space-y-4">
                {users.map(user => (
                  <div key={user.id} className="flex items-center justify-between p-4 bg-crypto-dark rounded-lg">
                    <div>
                      <p className="font-semibold">{user.username || user.telegramId}</p>
                      <p className="text-sm text-gray-400">{user.email}</p>
                    </div>
                    <Button
                      variant={user.status === 'active' ? 'destructive' : 'default'}
                      onClick={() => handleUserStatus(user.id, user.status === 'active' ? 'blocked' : 'active')}
                    >
                      {user.status === 'active' ? 'حظر' : 'تفعيل'}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>إعدادات المنصة</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <Label>وضع الصيانة</Label>
                  <Switch
                    checked={settings?.maintenanceMode}
                    onCheckedChange={(checked) => handleSettingsUpdate({ ...settings, maintenanceMode: checked })}
                  />
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>رسوم التحويل (%)</Label>
                    <Input
                      type="number"
                      value={settings?.fees?.transfer}
                      onChange={(e) => handleSettingsUpdate({
                        ...settings,
                        fees: { ...settings.fees, transfer: parseFloat(e.target.value) }
                      })}
                      className="mt-1"
                    />
                  </div>

            className={`w-full text-left p-3 rounded-lg mb-1 flex items-center ${activeTab === 'users' ? 'bg-amber-500/20 text-amber-500' : 'text-gray-400 hover:bg-gray-800'}`}
            onClick={() => setActiveTab('users')}
          >
            <Users className="w-5 h-5 mr-3" />
            المستخدمين
          </button>

          <button
            className={`w-full text-left p-3 rounded-lg mb-1 flex items-center ${activeTab === 'wallets' ? 'bg-amber-500/20 text-amber-500' : 'text-gray-400 hover:bg-gray-800'}`}
            onClick={() => setActiveTab('wallets')}
          >
            <Wallet className="w-5 h-5 mr-3" />
            المحافظ
          </button>

          <button
            className={`w-full text-left p-3 rounded-lg mb-1 flex items-center ${activeTab === 'rewards' ? 'bg-amber-500/20 text-amber-500' : 'text-gray-400 hover:bg-gray-800'}`}
            onClick={() => setActiveTab('rewards')}
          >
            <Gift className="w-5 h-5 mr-3" />
            المكافآت
          </button>

          <button
            className={`w-full text-left p-3 rounded-lg mb-1 flex items-center ${activeTab === 'transactions' ? 'bg-amber-500/20 text-amber-500' : 'text-gray-400 hover:bg-gray-800'}`}
            onClick={() => setActiveTab('transactions')}
          >
            <TrendingUp className="w-5 h-5 mr-3" />
            المعاملات
          </button>

          <button
            className={`w-full text-left p-3 rounded-lg mb-1 flex items-center ${activeTab === 'fees' ? 'bg-amber-500/20 text-amber-500' : 'text-gray-400 hover:bg-gray-800'}`}
            onClick={() => setActiveTab('fees')}
          >
            <Percent className="w-5 h-5 mr-3" />
            الرسوم
          </button>

          <button
            className={`w-full text-left p-3 rounded-lg mb-1 flex items-center ${activeTab === 'cards' ? 'bg-amber-500/20 text-amber-500' : 'text-gray-400 hover:bg-gray-800'}`}
            onClick={() => setActiveTab('cards')}
          >
            <Lock className="w-5 h-5 mr-3" />
            البطاقات
          </button>

          <button
            className={`w-full text-left p-3 rounded-lg mb-1 flex items-center ${activeTab === 'settings' ? 'bg-amber-500/20 text-amber-500' : 'text-gray-400 hover:bg-gray-800'}`}
            onClick={() => setActiveTab('settings')}
          >
            <Settings className="w-5 h-5 mr-3" />
            الإعدادات
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {activeTab === 'users' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">إدارة المستخدمين</h2>
            <div className="grid gap-4">
              {users.map(user => (
                <div key={user.id} className="bg-crypto-darker p-4 rounded-lg flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{user.username || user.telegramId}</p>
                    <p className="text-sm text-gray-400">{user.email}</p>
                  </div>
                  <button
                    onClick={() => handleUserStatus(user.id, user.status === 'active' ? 'blocked' : 'active')}
                    className={`px-4 py-2 rounded-lg ${user.status === 'active' ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
                  >
                    {user.status === 'active' ? 'حظر' : 'تفعيل'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'transactions' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">المعاملات</h2>
            <div className="grid gap-4">
              {transactions.map(tx => (
                <div key={tx.id} className="bg-crypto-darker p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold">{tx.type === 'send' ? 'إرسال' : 'استلام'}</p>
                      <p className="text-sm text-gray-400">{tx.amount} {tx.currency}</p>
                    </div>
                    <button
                      onClick={() => updateTransactionStatus(tx.id, tx.status === 'pending' ? 'completed' : 'pending')}
                      className={`px-4 py-2 rounded-lg ${tx.status === 'completed' ? 'bg-amber-500' : 'bg-gray-500'}`}
                    >
                      {tx.status === 'completed' ? 'مكتمل' : 'معلق'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">إعدادات المنصة</h2>
            <div className="bg-crypto-darker p-6 rounded-lg space-y-6">
              <div className="flex items-center justify-between">
                <span>وضع الصيانة</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings?.maintenanceMode}
                    onChange={(e) => handleSettingsUpdate({ ...settings, maintenanceMode: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                </label>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">رسوم التحويل (%)</label>
                  <input
                    type="number"
                    value={settings?.fees?.transfer}
                    onChange={(e) => handleSettingsUpdate({
                      ...settings,
                      fees: { ...settings.fees, transfer: parseFloat(e.target.value) }
                    })}
                    className="w-full bg-crypto-dark border border-gray-700 rounded-lg px-4 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">رسوم التبديل (%)</label>
                  <input
                    type="number"
                    value={settings?.fees?.swap}
                    onChange={(e) => handleSettingsUpdate({
                      ...settings,
                      fees: { ...settings.fees, swap: parseFloat(e.target.value) }
                    })}
                    className="w-full bg-crypto-dark border border-gray-700 rounded-lg px-4 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">الحد اليومي للتحويل</label>
                  <input
                    type="number"
                    value={settings?.limits?.daily}
                    onChange={(e) => handleSettingsUpdate({
                      ...settings,
                      limits: { ...settings.limits, daily: parseFloat(e.target.value) }
                    })}
                    className="w-full bg-crypto-dark border border-gray-700 rounded-lg px-4 py-2"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
