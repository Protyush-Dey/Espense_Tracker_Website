import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AddExpenseForm from "./AddExpenseForm.tsx";

// ── TanStack Query client ─────────────────────────────────────────────────────

const queryClient = new QueryClient();

// ── Types ────────────────────────────────────────────────────────────────────

interface Expense {
  id: number;
  date: string;
  description: string;
  category: string;
  account: string;
  type: "Pay" | "Get";
  amount: number;
}

// ── Mock Data (40 rows) ───────────────────────────────────────────────────────

const INITIAL_EXPENSES: Expense[] = [
  { id: 1,  date: "2025-06-01", description: "Grocery Store",         category: "Food & Dining",   account: "Main Account", type: "Pay", amount: 84.50  },
  { id: 2,  date: "2025-06-01", description: "Freelance Payment",     category: "Salary",          account: "Savings",      type: "Get", amount: 1200.00 },
  { id: 3,  date: "2025-06-02", description: "Netflix Subscription",  category: "Entertainment",   account: "Credit Card",  type: "Pay", amount: 15.99  },
  { id: 4,  date: "2025-06-02", description: "Uber Ride",             category: "Transport",       account: "Main Account", type: "Pay", amount: 12.40  },
  { id: 5,  date: "2025-06-03", description: "Electricity Bill",      category: "Utilities",       account: "Main Account", type: "Pay", amount: 97.20  },
  { id: 6,  date: "2025-06-03", description: "Stock Dividend",        category: "Investment",      account: "Savings",      type: "Get", amount: 340.00 },
  { id: 7,  date: "2025-06-04", description: "Coffee Shop",           category: "Food & Dining",   account: "Credit Card",  type: "Pay", amount: 6.80   },
  { id: 8,  date: "2025-06-04", description: "Amazon Order",          category: "Shopping",        account: "Credit Card",  type: "Pay", amount: 53.99  },
  { id: 9,  date: "2025-06-05", description: "Doctor Visit",          category: "Healthcare",      account: "Main Account", type: "Pay", amount: 60.00  },
  { id: 10, date: "2025-06-05", description: "Monthly Salary",        category: "Salary",          account: "Main Account", type: "Get", amount: 3500.00 },
  { id: 11, date: "2025-06-06", description: "Bus Pass",              category: "Transport",       account: "Main Account", type: "Pay", amount: 30.00  },
  { id: 12, date: "2025-06-06", description: "Restaurant Dinner",     category: "Food & Dining",   account: "Credit Card",  type: "Pay", amount: 78.00  },
  { id: 13, date: "2025-06-07", description: "Water Bill",            category: "Utilities",       account: "Main Account", type: "Pay", amount: 22.50  },
  { id: 14, date: "2025-06-07", description: "Gym Membership",        category: "Healthcare",      account: "Credit Card",  type: "Pay", amount: 45.00  },
  { id: 15, date: "2025-06-08", description: "Spotify Premium",       category: "Entertainment",   account: "Credit Card",  type: "Pay", amount: 9.99   },
  { id: 16, date: "2025-06-08", description: "Side Project Income",   category: "Salary",          account: "Savings",      type: "Get", amount: 850.00 },
  { id: 17, date: "2025-06-09", description: "Pharmacy",              category: "Healthcare",      account: "Main Account", type: "Pay", amount: 18.75  },
  { id: 18, date: "2025-06-09", description: "Online Course",         category: "Shopping",        account: "Credit Card",  type: "Pay", amount: 29.00  },
  { id: 19, date: "2025-06-10", description: "Petrol",                category: "Transport",       account: "Main Account", type: "Pay", amount: 55.00  },
  { id: 20, date: "2025-06-10", description: "Mutual Fund Return",    category: "Investment",      account: "Savings",      type: "Get", amount: 210.00 },
  { id: 21, date: "2025-06-11", description: "Supermarket Run",       category: "Food & Dining",   account: "Main Account", type: "Pay", amount: 102.30 },
  { id: 22, date: "2025-06-11", description: "Bonus Pay",             category: "Salary",          account: "Main Account", type: "Get", amount: 500.00 },
  { id: 23, date: "2025-06-12", description: "Movie Tickets",         category: "Entertainment",   account: "Credit Card",  type: "Pay", amount: 24.00  },
  { id: 24, date: "2025-06-12", description: "Taxi Cab",              category: "Transport",       account: "Main Account", type: "Pay", amount: 19.60  },
  { id: 25, date: "2025-06-13", description: "Internet Bill",         category: "Utilities",       account: "Main Account", type: "Pay", amount: 49.99  },
  { id: 26, date: "2025-06-13", description: "ETF Dividend",          category: "Investment",      account: "Savings",      type: "Get", amount: 175.00 },
  { id: 27, date: "2025-06-14", description: "Café Latte",            category: "Food & Dining",   account: "Credit Card",  type: "Pay", amount: 5.50   },
  { id: 28, date: "2025-06-14", description: "Clothes Shopping",      category: "Shopping",        account: "Credit Card",  type: "Pay", amount: 134.00 },
  { id: 29, date: "2025-06-15", description: "Dentist Checkup",       category: "Healthcare",      account: "Main Account", type: "Pay", amount: 80.00  },
  { id: 30, date: "2025-06-15", description: "Consulting Fee",        category: "Salary",          account: "Savings",      type: "Get", amount: 600.00 },
  { id: 31, date: "2025-06-16", description: "Train Ticket",          category: "Transport",       account: "Main Account", type: "Pay", amount: 38.00  },
  { id: 32, date: "2025-06-16", description: "Sushi Restaurant",      category: "Food & Dining",   account: "Credit Card",  type: "Pay", amount: 64.00  },
  { id: 33, date: "2025-06-17", description: "Gas Bill",              category: "Utilities",       account: "Main Account", type: "Pay", amount: 34.80  },
  { id: 34, date: "2025-06-17", description: "Yoga Class",            category: "Healthcare",      account: "Credit Card",  type: "Pay", amount: 20.00  },
  { id: 35, date: "2025-06-18", description: "Apple TV+",             category: "Entertainment",   account: "Credit Card",  type: "Pay", amount: 8.99   },
  { id: 36, date: "2025-06-18", description: "Rental Income",         category: "Investment",      account: "Savings",      type: "Get", amount: 900.00 },
  { id: 37, date: "2025-06-19", description: "Vitamins & Supplements", category: "Healthcare",    account: "Main Account", type: "Pay", amount: 27.40  },
  { id: 38, date: "2025-06-19", description: "Book Purchase",         category: "Shopping",        account: "Credit Card",  type: "Pay", amount: 16.99  },
  { id: 39, date: "2025-06-20", description: "Flight Booking",        category: "Transport",       account: "Credit Card",  type: "Pay", amount: 220.00 },
  { id: 40, date: "2025-06-20", description: "Stock Sale Profit",     category: "Investment",      account: "Savings",      type: "Get", amount: 480.00 },
];

// Account id → display label map (must match AddExpenseModal ACCOUNTS)
const ACCOUNT_LABEL: Record<string, string> = {
  "acc-001": "Main Account",
  "acc-002": "Savings",
  "acc-003": "Credit Card",
};

// ── Category badge colours ────────────────────────────────────────────────────

const CATEGORY_STYLES: Record<string, string> = {
  "Food & Dining":   "bg-orange-50 text-orange-600",
  "Salary":          "bg-emerald-50 text-emerald-600",
  "Entertainment":   "bg-purple-50 text-purple-600",
  "Transport":       "bg-sky-50 text-sky-600",
  "Utilities":       "bg-yellow-50 text-yellow-700",
  "Investment":      "bg-indigo-50 text-indigo-600",
  "Healthcare":      "bg-rose-50 text-rose-600",
  "Shopping":        "bg-pink-50 text-pink-600",
  // New form categories
  "Food":            "bg-orange-50 text-orange-600",
  "Rent":            "bg-amber-50 text-amber-700",
  "Travel":          "bg-sky-50 text-sky-600",
  "Recharge":        "bg-teal-50 text-teal-600",
  "Grocery":         "bg-lime-50 text-lime-700",
  "Other":           "bg-gray-100 text-gray-600",
};

// ── Icons ─────────────────────────────────────────────────────────────────────

const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14H6L5 6" />
    <path d="M10 11v6M14 11v6" />
    <path d="M9 6V4h6v2" />
  </svg>
);

const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const ChevronLeft = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRight = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

// ── Main Component ────────────────────────────────────────────────────────────

const PAGE_SIZE = 20;

// Hardcoded user id — swap to your auth context as needed
const CURRENT_USER_ID = "user-abc-123";

let nextId = INITIAL_EXPENSES.length + 1;

const ExpenseTableInner = () => {
  const [expenses, setExpenses] = useState<Expense[]>(INITIAL_EXPENSES);
  const [page, setPage]         = useState(1);
  const [modalOpen, setModalOpen] = useState(false);

  const totalPages = Math.ceil(expenses.length / PAGE_SIZE);
  const startIdx   = (page - 1) * PAGE_SIZE;
  const pageRows   = expenses.slice(startIdx, startIdx + PAGE_SIZE);

  const totalExpense = expenses.filter(e => e.type === "Pay").reduce((s, e) => s + e.amount, 0);
  const totalIncome  = expenses.filter(e => e.type === "Get").reduce((s, e) => s + e.amount, 0);

  const handleDelete = (id: number) => {
    setExpenses(prev => {
      const next = prev.filter(e => e.id !== id);
      const newTotal = Math.ceil(next.length / PAGE_SIZE);
      if (page > newTotal && newTotal > 0) setPage(newTotal);
      return next;
    });
  };

  // Called by the modal's onSuccess — adds the new row locally
  const handleNewExpense = (payload: {
    account: string;
    category: string;
    isGiven: boolean;
    description: string;
    amount: number;
    date: string;
  }) => {
    const newRow: Expense = {
      id:          nextId++,
      date:        payload.date,
      description: payload.description,
      category:    payload.category,
      account:     ACCOUNT_LABEL[payload.account] ?? payload.account,
      type:        payload.isGiven? "Get" : "Pay",
      amount:      payload.amount,
    };
    setExpenses(prev => [newRow, ...prev]);
    setPage(1); // Jump to first page so the new row is visible
  };

  const fmt = (n: number) =>
    n
  // .toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 });

  return (
    <>
      <div className="w-full  border border-gray-200 bg-white shadow-sm overflow-hidden flex flex-col h-full">

        {/* ── Header ── */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div>
              <h2 className="text-xl  font-semibold text-gray-800 tracking-tight">Expense Transactions</h2>
              {/* <p className="text-xs text-gray-400 mt-0.5">{expenses.length} total records</p> */}
            </div>
            {/* ── Plus button ── */}
            <button
              onClick={() => setModalOpen(true)}
              className="flex items-center gap-1.5 md:p-3  p-1.5 py-1.5 rounded-full md:rounded-lg bg-indigo-500 text-white text-xs font-semibold hover:bg-indigo-600 transition-colors shadow-sm shadow-indigo-200"
              title="Add transaction"
            >
              <PlusIcon />
              <span className="hidden md:flex">Add</span>
            </button>
          </div>
          <div className="flex flex-col md:flex-row md:items-center md:gap-4">
            <div className="text-right">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 hidden md:flex">Total Out</p>
              <p className="text-sm font-bold text-red-500">{fmt(totalExpense)}</p>
            </div>
            <div className="w-px h-8 bg-gray-200 hidden md:flex" />
            <div className="text-right">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 hidden md:flex">Total In</p>
              <p className="text-sm font-bold text-emerald-500">{fmt(totalIncome)}</p>
            </div>
          </div>
        </div>

        {/* ── Table ── */}
        <div className="overflow-y-auto" style={{ maxHeight: "480px" }}>
          <table className="w-full text-sm border-collapse">
            <thead className="sticky top-0 z-10">
              <tr className="bg-gray-50 border-b border-gray-200">
                {["#", "Date", "Description", "Category", "Account", "Type", "Amount", "Action"].map((h, i) => (
                  <th
                    key={i}
                    className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-widest text-gray-400 whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pageRows.map((row, idx) => (
                <tr
                  key={row.id}
                  className="border-b border-gray-100 hover:bg-indigo-50/40 transition-colors duration-100 group"
                >
                  <td className="px-4 py-3 text-gray-400 text-xs font-mono">
                    {startIdx + idx + 1}
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs whitespace-nowrap">
                    {row.date}
                  </td>
                  <td className="px-4 py-3 text-gray-800 font-medium whitespace-nowrap">
                    {row.description}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold whitespace-nowrap ${CATEGORY_STYLES[row.category] ?? "bg-gray-100 text-gray-600"}`}>
                      {row.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs whitespace-nowrap">
                    {row.account}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide ${
                      row.type === "Pay"
                        ? "bg-red-50 text-red-500"
                        : "bg-emerald-50 text-emerald-600"
                    }`}>
                      {row.type}
                    </span>
                  </td>
                  <td className={`px-4 py-3 font-semibold text-sm tabular-nums whitespace-nowrap ${
                    row.type === "Pay" ? "text-red-500" : "text-emerald-600"
                  }`}>
                    {row.type === "Pay" ? "−" : "+"}{fmt(row.amount)}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleDelete(row.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50"
                      title="Delete"
                    >
                      <TrashIcon />
                    </button>
                  </td>
                </tr>
              ))}

              {pageRows.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-6 py-16 text-center text-gray-400 text-sm">
                    No transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ── Pagination ── */}
        <div className="flex items-center justify-between px-6 py-3 border-t border-gray-100 bg-gray-50/60">
          <p className="text-xs text-gray-400">
            Showing{" "}
            <span className="font-semibold text-gray-600">{startIdx + 1}–{Math.min(startIdx + PAGE_SIZE, expenses.length)}</span>
            {" "}of{" "}
            <span className="font-semibold text-gray-600">{expenses.length}</span>
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-white hover:border-indigo-300 hover:text-indigo-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
              <button
                key={n}
                onClick={() => setPage(n)}
                className={`w-8 h-8 rounded-lg text-xs font-semibold transition-all ${
                  n === page
                    ? "bg-indigo-500 text-white shadow-sm shadow-indigo-200"
                    : "border border-gray-200 text-gray-500 hover:bg-white hover:border-indigo-300 hover:text-indigo-500"
                }`}
              >
                {n}
              </button>
            ))}
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-white hover:border-indigo-300 hover:text-indigo-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>

      {/* ── Modal ── */}
      <AddExpenseForm
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={handleNewExpense}
      />
    </>
  );
};

// Wrap with QueryClientProvider so useMutation works in the modal
const ExpenseTable = () => (
  <QueryClientProvider client={queryClient}>
    <ExpenseTableInner />
  </QueryClientProvider>
);

export default ExpenseTable;