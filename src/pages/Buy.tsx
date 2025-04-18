import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const Buy = () => {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USDT");
  const { toast } = useToast();

  const handleBuy = () => {
    toast({
      title: "Purchase Initiated",
      description: `Starting purchase of ${amount} ${currency}`,
    });
    // Implement actual purchase logic here
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>Buy Crypto</CardTitle>
          <CardDescription>Purchase cryptocurrency using your preferred payment method</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="currency">Currency</Label>
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger>
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USDT">USDT</SelectItem>
                <SelectItem value="BTC">Bitcoin</SelectItem>
                <SelectItem value="ETH">Ethereum</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button className="w-full" onClick={handleBuy}>
            Buy Now
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Buy;
