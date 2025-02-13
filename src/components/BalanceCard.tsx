import React from "react";
import { CreditCard, Wallet } from "lucide-react";

interface BalanceCardProps {
  balance: number;
  savings: number;
}

export function BalanceCard({ balance, savings }: BalanceCardProps) {
  return (
    <div className="bg-yellow-500 rounded-2xl p-6 text-white h-[calc(100%)]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Balance overview</h2>
        <button className="text-white/80 hover:text-white">
          <CreditCard size={20} />
        </button>
      </div>

      <div className="mb-4">
        <span className="text-3xl font-bold">Rp. {balance}</span>
      </div>

      <div className="text-white/90 text-sm">
        <p>Extra savings Rp. {savings}</p>
        <p className="text-white/70">Combination of bank accounts</p>
      </div>

      <div className="flex gap-2 mt-4">
        <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center">
          <Wallet className="w-5 h-5 text-yellow-600" />
        </div>
      </div>
    </div>
  );
}
