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
  icon: string;
}

export interface MonthlyData {
  month: string;
  income: number;
  expenses: number;
}
