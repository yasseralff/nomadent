import React from "react";

interface ExpenseItem {
  id: number;
  description: string;
  category: string;
  amount: number;
  currency: string;
  converted: number;
  date: string;
}

interface ExpensesTableProps {
  expenses: ExpenseItem[];
}

export function ExpensesTable({ expenses }: ExpensesTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-outline-variant/60 text-[10px] text-muted-foreground uppercase font-sora font-bold tracking-wider">
            <th className="pb-3 pl-2">Description</th>
            <th className="pb-3">Category</th>
            <th className="pb-3 text-right">Amount</th>
            <th className="pb-3 text-right">Converted (USD)</th>
            <th className="pb-3 pr-2 text-right">Date</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-outline-variant/30">
          {expenses.map((expense) => (
            <tr key={expense.id} className="group hover:bg-surface-container-high/40 transition-colors font-sans text-sm">
              <td className="py-3 pl-2 font-medium text-on-surface max-w-[200px] truncate">
                {expense.description}
              </td>
              <td className="py-3 text-on-surface-variant">
                <span className="text-xs px-2 py-0.5 rounded-full border border-outline-variant bg-surface-container-lowest font-medium">
                  {expense.category}
                </span>
              </td>
              <td className="py-3 text-right font-medium text-on-surface font-sora">
                {expense.amount.toFixed(2)} <span className="text-xs text-muted-foreground">{expense.currency}</span>
              </td>
              <td className="py-3 text-right font-semibold text-primary font-sora">
                ${expense.converted.toFixed(2)}
              </td>
              <td className="py-3 pr-2 text-right text-xs text-muted-foreground">
                {expense.date}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
