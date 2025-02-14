import React, { useState } from "react";
import type { SavingPlan, PlanType } from "../types";
import {
  Plus,
  CircleDollarSign,
  TrendingUp,
  Search,
  Disc3,
  Plane,
  Smartphone,
  GraduationCap,
  Home,
  Car,
} from "lucide-react";

interface SavingPlansProps {
  plans: SavingPlan[];
}

const DEFAULT_PLAN_TYPES: PlanType[] = [
  {
    id: "vinyl",
    name: "Vinyl Plans",
    bgColor: "bg-purple-500",
    textColor: "text-purple-500",
    icon: "Disc3",
  },
  {
    id: "travel",
    name: "Travel Plans",
    bgColor: "bg-emerald-500",
    textColor: "text-emerald-500",
    icon: "Plane",
  },
  {
    id: "gadget",
    name: "Gadget Plans",
    bgColor: "bg-yellow-500",
    textColor: "text-yellow-500",
    icon: "Smartphone",
  },
];

const AVAILABLE_COLORS = [
  { name: "Purple", bg: "bg-purple-500", text: "text-purple-500" },
  { name: "Emerald", bg: "bg-emerald-500", text: "text-emerald-500" },
  { name: "Yellow", bg: "bg-yellow-500", text: "text-yellow-500" },
  { name: "Blue", bg: "bg-blue-500", text: "text-blue-500" },
  { name: "Rose", bg: "bg-rose-500", text: "text-rose-500" },
  { name: "Indigo", bg: "bg-indigo-500", text: "text-indigo-500" },
  { name: "Teal", bg: "bg-teal-500", text: "text-teal-500" },
  { name: "Orange", bg: "bg-orange-500", text: "text-orange-500" },
  { name: "Cyan", bg: "bg-cyan-500", text: "text-cyan-500" },
  { name: "Pink", bg: "bg-pink-500", text: "text-pink-500" },
];

const ICONS_MAP = {
  Disc3,
  Plane,
  Smartphone,
  GraduationCap,
  Home,
  Car,
  CircleDollarSign,
};

export function SavingPlans({ plans }: SavingPlansProps) {
  const [planTypes, setPlanTypes] = useState<PlanType[]>(DEFAULT_PLAN_TYPES);

  const getPlanTypeConfig = (type: string): PlanType => {
    return (
      planTypes.find((t) => t.id === type) ?? {
        id: type,
        name: `${type.charAt(0).toUpperCase()}${type.slice(1)} Plans`,
        bgColor: "bg-gray-500",
        textColor: "text-gray-500",
        icon: "CircleDollarSign",
      }
    );
  };

  const DynamicIcon = ({
    name,
    size = 20,
  }: {
    name: string;
    size?: number;
  }) => {
    const Icon = ICONS_MAP[name as keyof typeof ICONS_MAP] || CircleDollarSign;
    return <Icon size={size} />;
  };

  const SavingPlanCard = ({ plan }: { plan: SavingPlan }) => {
    const progress = (plan.current / plan.target) * 100;
    const config = getPlanTypeConfig(plan.type);

    return (
      <div className="bg-gray-50 p-4 rounded-xl">
        <div className="flex items-center gap-3 mb-3">
          <div
            className={`w-10 h-10 rounded-full bg-opacity-10 ${config.bgColor} flex items-center justify-center ${config.textColor}`}
          >
            <DynamicIcon name={config.icon} />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-sm">{plan.name}</h3>
            <div className="flex items-center justify-between mt-0.5">
              <div className="flex items-baseline gap-1">
                <span className="text-sm font-medium">Rp.{plan.current}</span>
                <span className="text-xs text-gray-400">/</span>
                <span className="text-xs text-gray-400">Rp.{plan.target}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full ${config.bgColor} transition-all duration-300`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-medium">Savings plan</h2>
          <p className="text-sm text-gray-500">{plans.length} saving plans</p>
        </div>
      </div>

      <div className="space-y-3 max-h-[280px] overflow-y-auto pr-2 scrollbar-thin">
        {plans.map((plan) => (
          <SavingPlanCard key={plan.id} plan={plan} />
        ))}
      </div>
    </div>
  );
}
