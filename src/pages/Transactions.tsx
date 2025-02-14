import React, { useState } from "react";
import { mockTransactions } from "../data/mock";
import { formatIDR } from "../utils/currency";
import type { Transaction } from "../types";

export function Transactions() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredTransactions = mockTransactions.filter((transaction) => {
    if (transaction.type !== "expense") return false;

    return true;
  });

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTransactions = filteredTransactions.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const TransactionRow = ({ transaction }: { transaction: Transaction }) => (
    <tr className="border-b border-gray-100 hover:bg-gray-50/50">
      <td className="py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
            <span className="text-gray-600 font-medium">
              {transaction.payment[0]}
            </span>
          </div>
          <div>
            <p className="font-medium">{transaction.payment}</p>
            <p className="text-sm text-gray-500">{transaction.description}</p>
          </div>
        </div>
      </td>
      <td>
        <span className="text-red-600">{formatIDR(transaction.amount)}</span>
      </td>
      <td>
        <div>
          <p>{transaction.date}</p>
          <p className="text-sm text-gray-500">{transaction.timestamp}</p>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-semibold">Transactions</h1>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left py-4 font-medium text-gray-600">
                Transaction
              </th>
              <th className="text-left py-4 font-medium text-gray-600">
                Amount
              </th>
              <th className="text-left py-4 font-medium text-gray-600">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paginatedTransactions.map((transaction) => (
              <TransactionRow key={transaction.id} transaction={transaction} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
