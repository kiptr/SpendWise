import React from "react";
import type { Transaction } from "../types";
import { formatIDR } from "../utils/currency";

interface TransactionListProps {
  transactions: Transaction[];
}

export function TransactionList({ transactions }: TransactionListProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">List of transactions</h2>
      </div>

      <div className="h-[calc(100%-64px)]">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-600">
              <th className="pb-3">Payment</th>
              <th className="pb-3">Amount</th>
              <th className="pb-3">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td className="py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
                      A
                    </div>
                    <div>
                      <p className="font-medium">{transaction.payment}</p>
                      <p className="text-xs text-gray-500">
                        {transaction.description}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="text-sm">
                  <span className="text-emerald-600">
                    {formatIDR(transaction.amount)}
                  </span>
                </td>
                <td className="text-sm">
                  <p className="text-gray-900">{transaction.date}</p>
                  <p className="text-xs text-gray-500">
                    {transaction.timestamp}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
