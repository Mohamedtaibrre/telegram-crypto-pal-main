import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface WalletBalance {
  currency: string;
  amount: string;
  value: string;
}

const Wallets = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("assets");

  const mockBalances: WalletBalance[] = [
    { currency: "BTC", amount: "0.5", value: "$20,000" },
    { currency: "ETH", amount: "2.0", value: "$4,000" },
    { currency: "USDT", amount: "1000", value: "$1,000" },
  ];

  const handleRefresh = () => {
    toast({
      title: "Refreshing Balances",
      description: "Updating your wallet balances...",
    });
    // Implement actual refresh logic here
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>My Wallets</CardTitle>
            <Button variant="outline" onClick={handleRefresh}>
              Refresh
            </Button>
          </div>
          <CardDescription>Manage your crypto assets</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="assets">Assets</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>
            
            <TabsContent value="assets">
              <div className="space-y-4">
                {mockBalances.map((balance) => (
                  <Card key={balance.currency}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-bold">{balance.currency}</h3>
                          <p className="text-sm text-gray-500">{balance.amount} {balance.currency}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">{balance.value}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="activity">
              <div className="text-center p-4">
                <p className="text-gray-500">Transaction history will appear here</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Wallets;
