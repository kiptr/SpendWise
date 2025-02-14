import React, { useState, useMemo } from "react";
import {
  TrendingUp,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  ArrowUpCircle,
  ArrowDownCircle,
} from "lucide-react";
import { mockTransactions } from "../data/mock";
import { formatIDR } from "../utils/currency";
import type { Transaction } from "../types";

export function History() {
  const [selectedMonth, setSelectedMonth] = useState<string>("all");
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [transactionType, setTransactionType] = useState<
    "all" | "income" | "expense"
  >("all");

  const years = useMemo(() => {
    const uniqueYears = new Set(
      mockTransactions.map((t) =>
        new Date(t.date.split(" ").reverse().join("-")).getFullYear()
      )
    );
    return Array.from(uniqueYears).sort((a, b) => b - a);
  }, []);

  const paymentSources = useMemo(() => {
    const uniqueSources = new Set(mockTransactions.map((t) => t.payment));
    return ["all", ...Array.from(uniqueSources)];
  }, []);

  const filteredTransactions = useMemo(() => {
    return mockTransactions.filter((transaction) => {
      const transactionDate = new Date(
        transaction.date.split(" ").reverse().join("-")
      );
      const transactionYear = transactionDate.getFullYear().toString();
      const transactionMonth = transactionDate.getMonth();

      const yearMatch =
        selectedYear === "all" || transactionYear === selectedYear;
      const monthMatch =
        selectedMonth === "all" || transactionMonth === parseInt(selectedMonth);
      const sourceMatch =
        selectedCategory === "all" || transaction.payment === selectedCategory;
      const typeMatch =
        transactionType === "all" || transaction.type === transactionType;

      return yearMatch && monthMatch && sourceMatch && typeMatch;
    });
  }, [selectedYear, selectedMonth, selectedCategory, transactionType]);

  const statistics = useMemo(() => {
    const expenses = filteredTransactions.filter((t) => t.type === "expense");

    if (expenses.length === 0) {
      return {
        total: 0,
        average: 0,
        highest: 0,
        lowest: 0,
      };
    }

    const total = expenses.reduce((sum, t) => sum + t.amount, 0);
    const average = total / expenses.length;
    const amounts = expenses.map((t) => t.amount);
    const highest = Math.max(...amounts);
    const lowest = Math.min(...amounts);

    return { total, average, amounts, highest, lowest };
  }, [filteredTransactions]);

  const groupedTransactions = useMemo(() => {
    const groups = filteredTransactions.reduce((acc, transaction) => {
      if (!acc[transaction.date]) {
        acc[transaction.date] = [];
      }
      acc[transaction.date].push(transaction);
      return acc;
    }, {} as Record<string, Transaction[]>);

    return Object.entries(groups).sort((a, b) => {
      const dateA = new Date(a[0].split(" ").reverse().join("-"));
      const dateB = new Date(b[0].split(" ").reverse().join("-"));
      return dateB.getTime() - dateA.getTime();
    });
  }, [filteredTransactions]);

  return (
    <div className="space-y-6">
      <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white shadow-sm p-6 rounded-2xl">
          <div className="flex items-center gap-4 m-2">
            <div className="flex justify-center items-center bg-red-100 rounded-xl w-12 h-12">
              <TrendingUp className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Total Expenses</p>
              <p className="font-semibold text-xl">
                {formatIDR(statistics.total)}
              </p>
            </div>
          </div>
          <div className="text-gray-500 text-sm">
            For{" "}
            {filteredTransactions.filter((t) => t.type === "expense").length}{" "}
            transactions
          </div>
        </div>

        <div className="bg-white shadow-sm p-6 rounded-2xl">
          <div className="flex items-center gap-4 m-2">
            <div className="flex justify-center items-center bg-yellow-100 rounded-xl w-12 h-12">
              <Calendar className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Average Expenses</p>
              <p className="font-semibold text-xl">
                {formatIDR(statistics.average)}
              </p>
            </div>
          </div>
          <div className="text-gray-500 text-sm">Per transaction</div>
        </div>

        <div className="bg-white shadow-sm p-6 rounded-2xl">
          <div className="flex items-center gap-4 m-2">
            <div className="flex justify-center items-center bg-red-100 rounded-xl w-12 h-12">
              <ArrowUpRight className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Highest Expenses</p>
              <p className="font-semibold text-xl">
                {formatIDR(statistics.highest)}
              </p>
            </div>
          </div>
          <div className="text-gray-500 text-sm">Single transaction</div>
        </div>

        <div className="bg-white shadow-sm p-6 rounded-2xl">
          <div className="flex items-center gap-4 m-2">
            <div className="flex justify-center items-center bg-red-100 rounded-xl w-12 h-12">
              <ArrowDownRight className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Lowest Expenses</p>
              <p className="font-semibold text-xl">
                {formatIDR(statistics.lowest)}
              </p>
            </div>
          </div>
          <div className="text-gray-500 text-sm">Single transaction</div>
        </div>
      </div>

      <div className="bg-white shadow-sm p-6 rounded-2xl">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <label className="block mb-1 font-medium text-gray-700 text-sm">
              Year
            </label>
            <select
              className="bg-white px-3 py-2 border border-gray-200 focus:border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 w-full"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              <option value="all">All years</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="block mb-1 font-medium text-gray-700 text-sm">
              Month
            </label>
            <select
              className="bg-white px-3 py-2 border border-gray-200 focus:border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 w-full"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              <option value="all">All Months</option>
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i} value={i}>
                  {new Date(2000, i).toLocaleString("default", {
                    month: "long",
                  })}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="block mb-1 font-medium text-gray-700 text-sm">
              Payment Source / Recipient
            </label>
            <select
              className="bg-white px-3 py-2 border border-gray-200 focus:border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 w-full"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Sources</option>
              {paymentSources.slice(1).map((source) => (
                <option key={source} value={source}>
                  {source}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="block mb-1 font-medium text-gray-700 text-sm">
              Transaction Type
            </label>
            <select
              className="bg-white px-3 py-2 border border-gray-200 focus:border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 w-full"
              value={transactionType}
              onChange={(e) =>
                setTransactionType(
                  e.target.value as "all" | "income" | "expense"
                )
              }
            >
              <option value="all">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-2xl divide-y divide-gray-100">
        {groupedTransactions.map(([date, transactions]) => (
          <div key={date} className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">{date}</h3>
              <span className="text-gray-500 text-sm">
                {transactions.length} transaction
                {transactions.length !== 1 ? "s" : ""}
              </span>
            </div>
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex justify-between items-center"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex justify-center items-center bg-gray-100 rounded-full w-10 h-10 overflow-hidden">
                      <span className="font-medium text-gray-600">
                        {transaction.payment[0]}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{transaction.payment}</p>
                        {transaction.type === "income" ? (
                          <div className="bg-emerald-100 px-2 py-0.5 rounded font-medium text-emerald-700 text-xs">
                            <div className="flex items-center gap-1">
                              <ArrowUpCircle size={12} />
                              Income
                            </div>
                          </div>
                        ) : (
                          <div className="bg-red-100 px-2 py-0.5 rounded font-medium text-red-700 text-xs">
                            <div className="flex items-center gap-1">
                              <ArrowDownCircle size={12} />
                              Expense
                            </div>
                          </div>
                        )}
                      </div>
                      <p className="text-gray-500 text-sm">
                        {transaction.description}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-medium ${
                        transaction.type === "income"
                          ? "text-emerald-600"
                          : "text-red-600"
                      }`}
                    >
                      {transaction.type === "income" ? "+" : "-"}
                      {formatIDR(transaction.amount)}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {transaction.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
