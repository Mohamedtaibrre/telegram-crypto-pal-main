import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

interface StakingOption {
  id: string;
  token: string;
  apy: string;
  minAmount: string;
  lockPeriod: string;
}

const Earn = () => {
  const { toast } = useToast();

  const stakingOptions: StakingOption[] = [
    {
      id: "1",
      token: "BTC",
      apy: "5.5%",
      minAmount: "0.01 BTC",
      lockPeriod: "30 days",
    },
    {
      id: "2",
      token: "ETH",
      apy: "4.8%",
      minAmount: "0.1 ETH",
      lockPeriod: "60 days",
    },
    {
      id: "3",
      token: "USDT",
      apy: "12%",
      minAmount: "100 USDT",
      lockPeriod: "90 days",
    },
  ];

  const handleStake = (option: StakingOption) => {
    toast({
      title: "Staking Initiated",
      description: `Starting staking process for ${option.token}`,
    });
    // Implement actual staking logic here
  };

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Earn Crypto</h1>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {stakingOptions.map((option) => (
            <Card key={option.id}>
              <CardHeader>
                <CardTitle>{option.token} Staking</CardTitle>
                <CardDescription>Earn passive income with {option.token}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-500">APY</span>
                    <span className="font-bold text-green-500">{option.apy}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Min. Amount</span>
                    <span>{option.minAmount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Lock Period</span>
                    <span>{option.lockPeriod}</span>
                  </div>
                  <Button
                    className="w-full"
                    onClick={() => handleStake(option)}
                  >
                    Stake {option.token}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Your Staking Overview</CardTitle>
            <CardDescription>View your active staking positions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center p-4 text-gray-500">
              No active staking positions. Start staking to earn rewards!
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Earn;
