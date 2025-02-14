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
  const statistics = useMemo(() => {
    const expenses = mockTransactions.filter((t) => t.type === "expense");

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
  }, [mockTransactions]);

  const groupedTransactions = useMemo(() => {
    const groups = mockTransactions.reduce((acc, transaction) => {
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
  }, [mockTransactions]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4 m-2">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Expenses</p>
              <p className="text-xl font-semibold">
                {formatIDR(statistics.total)}
              </p>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            For {mockTransactions.filter((t) => t.type === "expense").length}{" "}
            transactions
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4 m-2">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Average Expenses</p>
              <p className="text-xl font-semibold">
                {formatIDR(statistics.average)}
              </p>
            </div>
          </div>
          <div className="text-sm text-gray-500">Per transaction</div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4 m-2">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <ArrowUpRight className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Highest Expenses</p>
              <p className="text-xl font-semibold">
                {formatIDR(statistics.highest)}
              </p>
            </div>
          </div>
          <div className="text-sm text-gray-500">Single transaction</div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4 m-2">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <ArrowDownRight className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Lowest Expenses</p>
              <p className="text-xl font-semibold">
                {formatIDR(statistics.lowest)}
              </p>
            </div>
          </div>
          <div className="text-sm text-gray-500">Single transaction</div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm divide-y divide-gray-100">
        {groupedTransactions.map(([date, transactions]) => (
          <div key={date} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">{date}</h3>
              <span className="text-sm text-gray-500">
                {transactions.length} transaction
                {transactions.length !== 1 ? "s" : ""}
              </span>
            </div>
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
                      <span className="text-gray-600 font-medium">
                        {transaction.payment[0]}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{transaction.payment}</p>
                        {transaction.type === "income" ? (
                          <div className="px-2 py-0.5 bg-emerald-100 rounded text-emerald-700 text-xs font-medium">
                            <div className="flex items-center gap-1">
                              <ArrowUpCircle size={12} />
                              Income
                            </div>
                          </div>
                        ) : (
                          <div className="px-2 py-0.5 bg-red-100 rounded text-red-700 text-xs font-medium">
                            <div className="flex items-center gap-1">
                              <ArrowDownCircle size={12} />
                              Expense
                            </div>
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">
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
                    <p className="text-sm text-gray-500">
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
