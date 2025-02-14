import React from "react";
import { BalanceCard } from "../components/BalanceCard";
import { IncomeExpenses } from "../components/IncomeExpenses";
import { SavingPlans } from "../components/SavingPlans";
import { GeneralPayment } from "../components/GeneralPayment";
import { getLast6Months, mockSavingPlans } from "../data/mock";

export function Dashboard() {
  const monthlyData = getLast6Months();

  return (
    <div className="grid grid-cols-12 gap-6 flex-1">
      <div className="cols-span-12 lg:col-span-7 grid grid-rows-[auto_auto_1fr] gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <BalanceCard balance={11500000} savings={3500000} />
          <IncomeExpenses incomes={5000000} expenses={1500000} />
        </div>
        <SavingPlans plans={mockSavingPlans} />
      </div>
      <div className="col-span-12 lg:col-span-5 grid grid-rows-[320px_1fr] gap-6">
        <GeneralPayment data={monthlyData} />
      </div>
    </div>
  );
}
