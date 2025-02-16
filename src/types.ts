export interface SavingPlan {
  id: string;
  name: string;
  current: number;
  target: number;
  type: string;
}

export interface PlanType {
  id: string;
  name: string;
  bgColor: string;
  textColor: string;
  progressColor: string;
  icon: string;
}

export interface MonthlyData {
  month: string;
  income: number;
  expenses: number;
}

export interface Transaction {
  id: string;
  payment: string;
  description: string;
  amount: number;
  date: string;
  timestamp: string;
  type: "income" | "expense";
}
