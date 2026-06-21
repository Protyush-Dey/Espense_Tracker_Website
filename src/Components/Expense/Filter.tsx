import { useState, useRef, useEffect } from "react";
import { DatePicker, type DatePickerProps } from "antd";

// ── icons ────────────────────────────────────────────────────────────────────

const SearchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg
    width="13" height="13" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
    className={`transition-transform duration-200 ${open ? "rotate-180 text-indigo-500" : "text-gray-400"}`}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const CalendarIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

// ── dropdown ─────────────────────────────────────────────────────────────────

interface DropdownProps {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}

const Dropdown = ({ label, options, value, onChange, placeholder = "All" }: DropdownProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="flex flex-col gap-1 flex-1 min-w-[120px] relative">
      {/* label */}
      <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">
        {label}
      </span>

      {/* trigger */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`
          flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm
          border transition-all duration-150 outline-none cursor-pointer
          ${open
            ? "border-indigo-400 bg-white ring-2 ring-indigo-100"
            : "border-gray-200 bg-gray-50 hover:border-indigo-200 hover:bg-white"
          }
        `}
      >
        <span className={value ? "text-gray-800 font-medium" : "text-gray-400"}>
          {value || placeholder}
        </span>
        <ChevronIcon open={open} />
      </button>

      {/* menu */}
      {open && (
        <div className="absolute top-[calc(100%+6px)] left-0 right-0 z-50 bg-white border border-gray-200 rounded-xl shadow-lg shadow-indigo-50 overflow-hidden animate-[fadeSlide_0.12s_ease]">
          <div
            className="px-3 py-2 text-sm text-gray-400 cursor-pointer hover:bg-indigo-50 hover:text-indigo-500 transition-colors"
            onClick={() => { onChange(""); setOpen(false); }}
          >
            {placeholder}
          </div>
          {options.map((opt) => (
            <div
              key={opt}
              onClick={() => { onChange(opt); setOpen(false); }}
              className={`
                px-3 py-2 text-sm cursor-pointer transition-colors
                ${value === opt
                  ? "bg-indigo-50 text-indigo-600 font-semibold"
                  : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-500"
                }
              `}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ── divider ──────────────────────────────────────────────────────────────────

const VDivider = () => (
  <div className="self-end mb-[2px] w-px h-8 bg-gray-200 flex-shrink-0" />
);

// ── data ──────────────────────────────────────────────────────────────────────

const CATEGORIES = ["Food & Dining", "Shopping", "Transport", "Utilities", "Healthcare", "Entertainment", "Salary", "Investment"];
const ACCOUNTS   = ["Main Account", "Savings", "Business", "Joint Account", "Credit Card"];
const PAY_GET    = ["Pay", "Get", "Transfer"];

// ── Filter ────────────────────────────────────────────────────────────────────

const Filter = () => {
  const [search,   setSearch]   = useState("");
  const [category, setCategory] = useState("");
  const [account,  setAccount]  = useState("");
  const [payGet,   setPayGet]   = useState("");

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };

  const hasFilters = !!(search || category || account || payGet);

  const handleClear = () => {
    setSearch(""); setCategory(""); setAccount(""); setPayGet("");
  };

  return (
    <>
      {/* Ant DatePicker override — minimal, scoped */}
      <style>{`
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(-4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .filter-datepicker.ant-picker {
          border: 1.5px solid #e5e7eb !important;
          border-radius: 8px !important;
          background: #f9fafb !important;
          padding: 6px 10px !important;
          box-shadow: none !important;
          width: 100% !important;
          transition: border-color .15s, box-shadow .15s !important;
        }
        .filter-datepicker.ant-picker:hover {
          border-color: #a5b4fc !important;
          background: #fff !important;
        }
        .filter-datepicker.ant-picker-focused {
          border-color: #818cf8 !important;
          background: #fff !important;
          box-shadow: 0 0 0 3px rgba(99,102,241,.1) !important;
        }
        .filter-datepicker .ant-picker-input > input {
          font-size: 13px !important;
          color: #1f2937 !important;
        }
        .filter-datepicker .ant-picker-input > input::placeholder {
          color: #9ca3af !important;
        }
      `}</style>

      <div className="w-full bg-white border border-gray-200 rounded-2xl shadow-sm px-5 py-4">

        {/* ── header ── */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-500 inline-block" />
            <span className="text-sm font-bold text-gray-800 tracking-tight">Filters</span>
          </div>
          <button
            onClick={handleClear}
            disabled={!hasFilters}
            className={`text-xs font-semibold transition-colors duration-150 ${
              hasFilters ? "text-indigo-500 hover:text-indigo-700 cursor-pointer" : "text-gray-300 cursor-default"
            }`}
          >
            Clear all
          </button>
        </div>

        {/* ── controls row ── */}
        <div className="flex items-end gap-2 flex-wrap">

          {/* Search */}
          <div className="flex flex-col gap-1 flex-[1.4] min-w-[140px]">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">Search</span>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-gray-400 pointer-events-none flex">
                <SearchIcon />
              </span>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search transactions…"
                className="
                  w-full pl-8 pr-3 py-2 text-sm rounded-lg
                  border border-gray-200 bg-gray-50 text-gray-800
                  placeholder-gray-400 outline-none
                  transition-all duration-150
                  hover:border-indigo-200 hover:bg-white
                  focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100
                "
              />
            </div>
          </div>

          <VDivider />

          {/* Category */}
          <Dropdown label="Category" options={CATEGORIES} value={category} onChange={setCategory} placeholder="All categories" />

          <VDivider />

          {/* Account */}
          <Dropdown label="Account" options={ACCOUNTS} value={account} onChange={setAccount} placeholder="All accounts" />

          <VDivider />

          {/* Pay / Get */}
          <Dropdown label="Pay / Get" options={PAY_GET} value={payGet} onChange={setPayGet} placeholder="Any" />

          <VDivider />

          {/* From date */}
          <div className="flex flex-col gap-1 flex-1 min-w-[120px]">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">From date</span>
            <DatePicker
              onChange={onChange}
              placeholder="Start date"
              className="filter-datepicker"
              suffixIcon={<CalendarIcon />}
            />
          </div>

          {/* To date */}
          <div className="flex flex-col gap-1 flex-1 min-w-[120px]">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">To date</span>
            <DatePicker
              onChange={onChange}
              placeholder="End date"
              className="filter-datepicker"
              suffixIcon={<CalendarIcon />}
            />
          </div>

        </div>
      </div>
    </>
  );
};

export default Filter;