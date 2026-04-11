import {
  BarChart,
  Bar,
  XAxis,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const BarGraph = () => {
  const data = [
    { name: "Jan", value: 420 },
    { name: "Feb", value: 580 },
    { name: "Mar", value: 300 },
    { name: "Apr", value: 700 },
    { name: "May", value: 650 },
    { name: "Jun", value: 0 },
    { name: "Jul", value: 0 },
    { name: "Aug", value: 0 },
    { name: "Sep", value: 0 },
    { name: "Oct", value: 0 },
    { name: "Nov", value: 0 },
    { name: "Dec", value: 0 },
  ];

  const activeMonth = "May";

  return (
    <div className="w-full h-full bg">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} barCategoryGap="25%">
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#6B7280", fontSize: 12 }}
          />

          <Tooltip
            contentStyle={{
              borderRadius: "5px",
              fontWeight: "600",
              border: "none",
              boxShadow:
                "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
              backgroundColor: "#EEEEEE",
            }}
            formatter={(value) => {
              if (value == null) return "No data";

              const num = Number(value);
              if (isNaN(num)) return "No data";

              return `₹ ${num.toLocaleString("en-IN")}`;
            }}
            cursor={{ fill: "transparent" }}
          />

          <Bar dataKey="value" radius={[3, 3, 3, 3]} minPointSize={3}>
            {data.map((entry) => (
              <Cell
                key={entry.name}
                fill={
                  entry.value === 0
                    ? "#E5E7EB"
                    : entry.name === activeMonth
                    ? "#3B7AE8"
                    : "#E8EDF5"
                }
                cursor="pointer"
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarGraph;