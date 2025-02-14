import React, { useState, useMemo } from "react";
import { formatIDR } from "../utils/currency";
import { MonthlyData } from "../types";

interface GeneralPaymentProps {
  data: MonthlyData[];
}

export function GeneralPayment({ data }: GeneralPaymentProps) {
  const maxValue = Math.max(...data.flatMap((d) => [d.income, d.expenses]));
  const balance = 11500000;
  const [hoveredBar, setHoveredBar] = useState<{
    type: "income" | "expense";
    amount: number;
  } | null>(null);

  const yAxisLabels = useMemo(() => {
    const step = Math.ceil(maxValue / 5 / 1000000) * 1000000;
    return Array.from({ length: 6 }, (_, i) => step * (5 - i));
  }, [maxValue]);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm h-full relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">General payment</h2>
      </div>

      {hoveredBar && (
        <div className="absolute top-6 right-6 bg-gray-900 text-white px-3 py-1.5 rounded text-sm whitespace-nowrap z-10">
          {hoveredBar.type === "income" ? "Income: " : "Expenses: "}
          {formatIDR(hoveredBar.amount)}
        </div>
      )}

      <div className="mb-6">
        <span className="text-3xl font-bold">{formatIDR(balance)}</span>
      </div>

      <div className="flex items-center gap-6 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Income</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Expenses</span>
        </div>
      </div>

      <div className="relative h-[180px]">
        <div className="absolute -left-2 top-0 bottom-8 flex flex-col justify-between text-xs text-gray-400">
          {yAxisLabels.map((value, index) => (
            <span key={index}>{Math.round(value / 1000000)}M</span>
          ))}
        </div>

        <div className="absolute left-6 right-0 top-0 bottom-8 flex flex-col justify-between">
          {yAxisLabels.map((_, index) => (
            <div key={index} className="border-t border-gray-100 w-full h-0">
              {" "}
            </div>
          ))}
        </div>

        <div className="absolute left-6 right-0 bottom-8 flex justify-between items-end h-[140px]">
          {data.map((month, index) => (
            <div key={index} className="flex flex-col items-center w-12">
              <div className="w-full flex justify-center gap-1 h-full">
                <div className="flex flex-col justify-end">
                  <div
                    className="w-2.5 bg-emerald-500 rounded-sm transition-all duration-300 cursor-pointer hover:opacity-80"
                    style={{ height: `${(month.income / maxValue) * 140}px` }}
                    onMouseEnter={() =>
                      setHoveredBar({ type: "income", amount: month.income })
                    }
                    onMouseLeave={() => setHoveredBar(null)}
                  ></div>
                </div>
                <div className="flex flex-col justify-end">
                  <div
                    className="w-2.5 bg-red-500 rounded-sm transition-all duration-300 cursor-pointer hover:opacity-80"
                    style={{ height: `${(month.expenses / maxValue) * 140}px` }}
                    onMouseEnter={() =>
                      setHoveredBar({
                        type: "expense",
                        amount: month.expenses,
                      })
                    }
                    onMouseLeave={() => setHoveredBar(null)}
                  ></div>
                </div>
              </div>
              <span className="text-xs text-gray-500 mt-2">{month.month}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
