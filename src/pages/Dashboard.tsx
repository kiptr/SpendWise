import React from "react";
import { BalanceCard } from "../components/BalanceCard";
import { IncomeExpenses } from "../components/IncomeExpenses";
import { SavingPlans } from "../components/SavingPlans";
import { mockSavingPlans } from "../data/mock";

export function Dashboard() {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <BalanceCard balance={11500000} savings={3500000} />
        <IncomeExpenses incomes={5000000} expenses={1500000} />
      </div>
      <SavingPlans plans={mockSavingPlans} />
    </div>
  );
}
