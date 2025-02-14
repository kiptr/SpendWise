import React, { useState, useMemo } from "react";
import {
  TrendingUp,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
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
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
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
    </div>
  );
}
