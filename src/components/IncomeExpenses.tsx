import React from "react";
import { ArrowUpCircle, ArrowDownCircle } from "lucide-react";
import { formatIDR } from "../utils/currency";

interface IncomeExpensesProps {
  incomes: number;
  expenses: number;
}

export function IncomeExpenses({ incomes, expenses }: IncomeExpensesProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm h-[calc(100%)]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium">Incomes & Expenses</h2>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
            <ArrowUpCircle className="w-6 h-6 text-emerald-500" />
          </div>
          <div>
            <span className="text-emerald-500 font-medium">
              +{formatIDR(incomes)}
            </span>
            <p className="text-sm text-gray-600">Total incomes this month</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
            <ArrowDownCircle className="w-6 h-6 text-red-500" />
          </div>
          <div>
            <span className="text-red-500 font-medium">
              -{formatIDR(expenses)}
            </span>
            <p className="text-sm text-gray-600">Total outcomes this month</p>
          </div>
        </div>
      </div>
    </div>
  );
}
