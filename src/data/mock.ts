import type { SavingPlan, MonthlyData, Transaction } from "../types";

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

export const mockTransactions: Transaction[] = [
  {
    id: "1",
    payment: "Salary",
    description: "Monthly salary payment",
    amount: 15000000,
    date: "25 oct 2023",
    timestamp: "10:00:00",
    type: "income",
  },
  {
    id: "2",
    payment: "Freelance Work",
    description: "Website Development",
    amount: 5000000,
    date: "19 oct 2023",
    timestamp: "15:45:22",
    type: "income",
  },
  {
    id: "3",
    payment: "Client Payment",
    description: "Mobile app development",
    amount: 8500000,
    date: "23 oct 2023",
    timestamp: "16:30:45",
    type: "income",
  },
  {
    id: "4",
    payment: "Consulting",
    description: "Technical consultation",
    amount: 2500000,
    date: "15 oct 2023",
    timestamp: "14:20:00",
    type: "income",
  },
  {
    id: "5",
    payment: "Workshop",
    description: "React workshop payment",
    amount: 3500000,
    date: "12 oct 2023",
    timestamp: "09:15:30",
    type: "income",
  },
  {
    id: "6",
    payment: "GitHub",
    description: "Pro Subscription",
    amount: 150000,
    date: "10 oct 2023",
    timestamp: "08:15:33",
    type: "expense",
  },
  {
    id: "7",
    payment: "Figma",
    description: "Team Plan",
    amount: 250000,
    date: "11 oct 2023",
    timestamp: "10:22:45",
    type: "expense",
  },
  {
    id: "8",
    payment: "Cloudflare",
    description: "DNS Services",
    amount: 180000,
    date: "12 oct 2023",
    timestamp: "14:30:12",
    type: "expense",
  },
  {
    id: "9",
    payment: "Microsoft",
    description: "Office 365",
    amount: 299000,
    date: "13 oct 2023",
    timestamp: "09:45:18",
    type: "expense",
  },
  {
    id: "10",
    payment: "Google Cloud",
    description: "Cloud Services",
    amount: 850000,
    date: "14 oct 2023",
    timestamp: "16:20:55",
    type: "expense",
  },
  {
    id: "11",
    payment: "Spotify",
    description: "Spotify Premium",
    amount: 25000,
    date: "16 oct 2023",
    timestamp: "21:32:12",
    type: "expense",
  },
  {
    id: "12",
    payment: "Netflix",
    description: "Monthly subscription",
    amount: 45250,
    date: "17 oct 2023",
    timestamp: "09:27:45",
    type: "expense",
  },
  {
    id: "13",
    payment: "Sketch",
    description: "Annually membership",
    amount: 50000,
    date: "18 oct 2023",
    timestamp: "10:55:39",
    type: "expense",
  },
  {
    id: "14",
    payment: "Dividend",
    description: "Stock dividend payment",
    amount: 750000,
    date: "20 oct 2023",
    timestamp: "11:00:00",
    type: "income",
  },
  {
    id: "15",
    payment: "Adobe CC",
    description: "Creative Cloud",
    amount: 200000,
    date: "20 oct 2023",
    timestamp: "08:15:00",
    type: "expense",
  },
  {
    id: "16",
    payment: "Domain Renewal",
    description: "mirauve.com",
    amount: 150000,
    date: "21 oct 2023",
    timestamp: "14:20:33",
    type: "expense",
  },
  {
    id: "17",
    payment: "AWS Services",
    description: "Cloud hosting",
    amount: 750000,
    date: "22 oct 2023",
    timestamp: "11:05:18",
    type: "expense",
  },
  {
    id: "18",
    payment: "Digital Ocean",
    description: "Server hosting",
    amount: 350000,
    date: "24 oct 2023",
    timestamp: "13:15:27",
    type: "expense",
  },
  {
    id: "19",
    payment: "Vercel",
    description: "Pro Plan",
    amount: 200000,
    date: "25 oct 2023",
    timestamp: "17:40:15",
    type: "expense",
  },
  {
    id: "20",
    payment: "Side Project",
    description: "Template sale revenue",
    amount: 1200000,
    date: "26 oct 2023",
    timestamp: "13:45:00",
    type: "income",
  },
];
