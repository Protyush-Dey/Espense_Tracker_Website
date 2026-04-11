import React from "react";
import { Select } from "antd";
import BarGraph from "./BarGraph";

const currentYear = new Date().getFullYear();
const yearOptions = Array.from(
  { length: currentYear - 2000 + 1 },
  (_, i) => {
    const year = currentYear - i;
    return { value: year, label: year.toString() };
  }
);

const BarChart = () => {
  const handleChange = (value: number) => {
    console.log("Selected year:", value);
  };

  return (
    <div className="w-full h-80 md:h-4/9 rounded-xl border border-black/15 flex flex-col p-4 gap-4">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="sm:text-lg text-sm font-semibold text-gray-700">
          Spending Overview
        </p>

        <Select
          defaultValue={currentYear}
          style={{ width: 120 }}
          onChange={handleChange}
          options={yearOptions}
        />
      </div>

      {/* Graph */}
      <div className="flex-1">
        <BarGraph />
      </div>

    </div>
  );
};

export default BarChart;