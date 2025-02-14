import React from "react";
import { ArrowUpCircle } from "lucide-react";
import type { Transaction } from "../types";
import { formatIDR } from "../utils/currency";

interface LastIncomeProps {
  transactions: Transaction[];
}

export function LastIncome({ transactions }: LastIncomeProps) {
  const lastIncomes = transactions.slice(0, 3);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium">Last Income</h2>
      </div>

      <div className="space-y-4">
        {lastIncomes.map((income) => (
          <div
            key={income.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                A
              </div>
              <div>
                <p className="font-medium">{income.payment}</p>
                <p className="text-sm text-gray-600">{income.description}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-emerald-500 font-medium">
                {formatIDR(income.amount)}
              </p>
              <p className="text-sm text-gray-500">{income.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
