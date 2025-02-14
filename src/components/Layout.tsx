import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import { Wallet } from "lucide-react";

export function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-6 py-8 w-full flex-1">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-500 rounded-xl flex items-center justify-center">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-semibold">SpendWise</h1>
          </div>

          <nav className="hidden md:flex gap-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-medium ${
                  isActive
                    ? "bg-yellow-100 text-yellow-900"
                    : "text-gray-600 hover:bg-yellow-50"
                } `
              }
              end
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/transactions"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-medium ${
                  isActive
                    ? "bg-yellow-100 text-yellow-900"
                    : "text-gray-600 hover:bg-yellow-50"
                } `
              }
            >
              Transactions
            </NavLink>
            <NavLink
              to="/analytics"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-medium ${
                  isActive
                    ? "bg-yellow-100 text-yellow-900"
                    : "text-gray-600 hover:bg-yellow-50"
                } `
              }
            >
              Analytics
            </NavLink>
            <NavLink
              to="/history"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-medium ${
                  isActive
                    ? "bg-yellow-100 text-yellow-900"
                    : "text-gray-600 hover:bg-yellow-50"
                } `
              }
            >
              History
            </NavLink>
          </nav>
        </header>

        <main className="mb-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
