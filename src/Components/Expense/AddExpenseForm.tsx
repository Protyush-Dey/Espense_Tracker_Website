import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { useAccount } from "../../context/account.tsx";
import type { AddExpensePayload } from "../../types/userDataType.ts";
import { createExpense } from "../../api/userData.api.ts";

// ── Types ─────────────────────────────────────────────────────────────────────

interface AddExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (expense: AddExpensePayload) => void;
}

// ── Constants ─────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { category: "Food",     value: 30 },
  { category: "Rent",     value: 10 },
  { category: "Travel",   value: 18 },
  { category: "Recharge", value: 20 },
  { category: "Grocery",  value: 12 },
  { category: "Other",    value: 10 },
];

// ── Icons ─────────────────────────────────────────────────────────────────────

const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const SpinnerIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.5" strokeLinecap="round" className="animate-spin">
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

// ── Component ─────────────────────────────────────────────────────────────────

const AddExpenseForm = ({ isOpen, onClose, onSuccess }: AddExpenseModalProps) => {
  const queryClient = useQueryClient();
  const firstInputRef = useRef<HTMLSelectElement>(null);

  const { mutate, isPending, isError, error, reset } = useMutation({
    mutationFn: createExpense,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      // queryClient.invalidateQueries({ queryKey: ["getAllAccount"] }); // TODO: re-enable once balance refresh is needed
      onSuccess?.(data as AddExpensePayload);
      onClose();
    },
  });

  const { accounts } = useAccount();
  // console.log(accounts);
  

  // Focus trap & keyboard close
  useEffect(() => {
    if (!isOpen) { reset(); return; }
    setTimeout(() => firstInputRef.current?.focus(), 60);
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    mutate({
      account:   fd.get("accountId") as string,
      category:    fd.get("category") as string,
      isGiven:    fd.get("isGiven") === "true",
      description: fd.get("description") as string,
      amount:      parseFloat(fd.get("amount") as string),
      date:        fd.get("date") as string,
    });
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/30 backdrop-blur-[2px]"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div className="w-full max-w-md rounded-2xl bg-white shadow-xl border border-gray-200 overflow-hidden">

          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <div>
              <h2 id="modal-title" className="text-sm font-bold text-gray-800 tracking-tight">
                Add Transaction
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">Fill in the details below</p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
              aria-label="Close modal"
            >
              <XIcon />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">

            {/* Account */}
            <div>
              <label htmlFor="accountId" className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5">
                Account
              </label>
              <select
                id="accountId"
                name="accountId"
                ref={firstInputRef}
                required
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                defaultValue=""
              >
                <option value="" disabled>Select an account…</option>
                {accounts.map(a => (
                  <option key={a.account_id} value={a.account_id}>{a.account_name}</option>
                ))}
              </select>
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5">
                Category
              </label>
              <select
                id="category"
                name="category"
                required
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                defaultValue=""
              >
                <option value="" disabled>Select a category…</option>
                {CATEGORIES.map(c => (
                  <option key={c.category} value={c.category}>
                    {c.category} ({c.value}%)
                  </option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5">
                Description
              </label>
              <input
                id="description"
                name="description"
                type="text"
                placeholder="e.g. Weekly groceries"
                required
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
              />
            </div>

            {/* Amount + Date row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="amount" className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5">
                  Amount ($)
                </label>
                <input
                  id="amount"
                  name="amount"
                  type="number"
                  min="0.01"
                  step="0.01"
                  placeholder="0.00"
                  required
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                />
              </div>
              <div>
                <label htmlFor="date" className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5">
                  Date
                </label>
                <input
                  id="date"
                  name="date"
                  type="date"
                  required
                  defaultValue={new Date().toISOString().split("T")[0]}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                />
              </div>
            </div>

            {/* Is Income toggle */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">
                Transaction Type
              </label>
              <div className="flex rounded-xl border border-gray-200 bg-gray-50 p-1 gap-1">
                {[
                  { label: "Expense (Pay)", value: "true" },
                  { label: "Income (Get)",  value: "false" },
                ].map(opt => (
                  <label
                    key={opt.label}
                    className="flex-1 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="isGiven"
                      value={opt.value}
                      defaultChecked={opt.value === "true"}
                      className="sr-only peer"
                    />
                    <span className="flex items-center justify-center px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-500 transition-all peer-checked:bg-white peer-checked:text-indigo-600 peer-checked:shadow-sm peer-checked:border peer-checked:border-gray-200">
                      {opt.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Error */}
            {isError && (
              <p className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                {(error as Error).message}
              </p>
            )}

            {/* Actions */}
            <div className="flex items-center gap-3 pt-1">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isPending}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-indigo-500 text-sm font-semibold text-white hover:bg-indigo-600 disabled:opacity-60 disabled:cursor-not-allowed transition-colors shadow-sm shadow-indigo-200"
              >
                {isPending ? (
                  <>
                    <SpinnerIcon />
                    Saving…
                  </>
                ) : (
                  "Add Transaction"
                )}
              </button>
            </div>

          </form>
        </div>
      </div>
    </>
  );
};

export default AddExpenseForm;