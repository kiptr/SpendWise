import React, { useMemo } from "react";
import {
  ArrowUp,
  ArrowDown,
  TrendingUp,
  Wallet,
  CreditCard,
  DollarSign,
} from "lucide-react";
import { mockTransactions } from "../data/mock";
import { formatIDR } from "../utils/currency";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const currentMonth = new Date().getMonth();
const last12Month = Array.from({ length: 12 }, (_, i) => {
  const monthIndex = (currentMonth - i + 12) % 12;
  return months[monthIndex];
}).reverse();

export function Analytics() {
  const stats = useMemo(() => {
    const totalIncome = mockTransactions.reduce((sum, t) => sum + t.amount, 0);
    const averageTransaction = totalIncome / mockTransactions.length;

    return {
      totalIncome,
      averageTransaction,
      transactionCount: mockTransactions.length,
    };
  }, []);

  const StatCard = ({ title, value, icon: Icon, trend, trendValue }: any) => (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
          <Icon className="w-6 h-6 text-yellow-600" />
        </div>
        {trend && (
          <span
            className={`flex items-center gap-1 text-sm ${
              trend === "up" ? "text-emerald-600" : "text-red-600"
            }`}
          >
            {trend === "up" ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
            {trendValue}%
          </span>
        )}
      </div>
      <h3 className="text-gray-600 text-sm mb-1">{title}</h3>
      <p className="text-2xl font-semibold">{value}</p>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Income"
          value={formatIDR(stats.totalIncome)}
          icon={Wallet}
          trend="up"
          trendValue="12.5"
        />
        <StatCard
          title="Total Expenses"
          value={formatIDR(stats.totalIncome * 0.4)}
          icon={CreditCard}
          trend="down"
          trendValue="5.2"
        />
        <StatCard
          title="Average Transaction"
          value={formatIDR(stats.averageTransaction)}
          icon={TrendingUp}
        />
        <StatCard
          title="Total Income"
          value={stats.transactionCount}
          icon={DollarSign}
          trend="up"
          trendValue="8.1"
        />
      </div>
    </div>
  );
}
