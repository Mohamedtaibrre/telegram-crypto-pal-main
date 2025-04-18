import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

interface Transaction {
  id: string;
  type: string;
  amount: string;
  currency: string;
  status: string;
  date: string;
}

const History = () => {
  const [filter, setFilter] = useState("all");

  const mockTransactions: Transaction[] = [
    {
      id: "1",
      type: "Send",
      amount: "-0.1",
      currency: "BTC",
      status: "Completed",
      date: "2025-04-18",
    },
    {
      id: "2",
      type: "Receive",
      amount: "+500",
      currency: "USDT",
      status: "Completed",
      date: "2025-04-17",
    },
    {
      id: "3",
      type: "Swap",
      amount: "1.5 ETH → 2500 USDT",
      currency: "",
      status: "Completed",
      date: "2025-04-16",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "text-green-500";
      case "pending":
        return "text-yellow-500";
      case "failed":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Transaction History</CardTitle>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter transactions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Transactions</SelectItem>
                <SelectItem value="send">Send</SelectItem>
                <SelectItem value="receive">Receive</SelectItem>
                <SelectItem value="swap">Swap</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockTransactions
              .filter((tx) => filter === "all" || tx.type.toLowerCase() === filter)
              .map((tx) => (
                <div
                  key={tx.id}
                  className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50"
                >
                  <div>
                    <p className="font-medium">{tx.type}</p>
                    <p className="text-sm text-gray-500">{tx.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      {tx.amount} {tx.currency}
                    </p>
                    <p className={`text-sm ${getStatusColor(tx.status)}`}>
                      {tx.status}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default History;
