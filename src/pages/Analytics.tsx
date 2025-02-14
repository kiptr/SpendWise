import React, { useMemo } from "react";
import {
  ArrowUp,
  ArrowDown,
  TrendingUp,
  Wallet,
  CreditCard,
  DollarSign,
} from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement,
} from "chart.js";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import { mockTransactions } from "../data/mock";
import { formatIDR } from "../utils/currency";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement
);

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
const last12Months = Array.from({ length: 12 }, (_, i) => {
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

  const transactionData = {
    labels: last12Months,
    datasets: [
      {
        label: "Income",
        data: last12Months.map(
          () => Math.floor(Math.random() * 30000000) + 20000000
        ),
        borderColor: "rgb(34, 197, 94)",
        backgroundColor: "rgba(34, 197, 94, 0.1)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Expenses",
        data: last12Months.map(
          () => Math.floor(Math.random() * 15000000) + 5000000
        ),
        borderColor: "rgb(239, 68, 68)",
        backgroundColor: "rgba(239, 68, 68, 0.1)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const dailyTransactions = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Transactions",
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: "rgba(234, 179, 8, 0.8)",
        borderRadius: 8,
      },
    ],
  };

  const categoryData = {
    labels: ["Subscription", "Services", "Hardware", "Software", "Others"],
    datasets: [
      {
        data: [25, 30, 15, 20, 10],
        backgroundColor: [
          "rgba(234, 179, 8, 0.8)",
          "rgba(34, 197, 94, 0.8)",
          "rgba(239, 68, 68, 0.8)",
          "rgba(245, 158, 11, 0.8)",
          "rgba(147, 51, 234, 0.8)",
        ],
        borderWidth: 0,
      },
    ],
  };

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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-6">
            Income vs Expenses Trend
          </h3>
          <Line
            data={transactionData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top" as const,
                },
                tooltip: {
                  callbacks: {
                    label: function (context) {
                      let label = context.dataset.label || "";
                      if (label) {
                        label += ": ";
                      }
                      if (context.parsed.y !== null) {
                        label += formatIDR(context.parsed.y);
                      }
                      return label;
                    },
                  },
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    callback: function (value) {
                      return formatIDR(value as number);
                    },
                  },
                },
              },
            }}
          />
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-6">
            Daily Transaction Volume
          </h3>
          <Bar
            data={dailyTransactions}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-6">Spending by Category</h3>
          <div className="flex items-center justify-center">
            <div className="w-[300px]">
              <Doughnut
                data={categoryData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: "right" as const,
                    },
                  },
                  cutout: "70%",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
