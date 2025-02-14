import type { SavingPlan, MonthlyData } from "../types";

export const mockSavingPlans: SavingPlan[] = [
  {
    id: "1",
    name: "New Setup Vinyl",
    current: 732000,
    target: 1200000,
    type: "vinyl",
  },
  {
    id: "2",
    name: "Umroh to Mecca",
    current: 3560000,
    target: 122140000,
    type: "travel",
  },
  {
    id: "3",
    name: "New Iphone",
    current: 5120000,
    target: 20000000,
    type: "gadget",
  },
];

export function getLast6Months(): MonthlyData[] {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();

  const last6Months = Array.from({ length: 6 }, (_, i) => {
    const monthIndex = (currentMonth - i + 12) % 12;
    return months[monthIndex];
  }).reverse();

  return last6Months.map((month) => ({
    month,
    income: Math.floor(Math.random() * 30000000) + 20000000,
    expenses: Math.floor(Math.random() * 15000000) + 5000000,
  }));
}
