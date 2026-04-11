import PiGraph from "./PiGraph";

type DataType = {
  catagory: string;
  value: number;
};

const PiChart = () => {
  const rawData: DataType[] = [
    { catagory: "Food", value: 30 },
    { catagory: "Rent", value: 10 },
    { catagory: "Travel", value: 18 },
    { catagory: "Recharge", value: 20 },
    { catagory: "Grocery", value: 12 },
    { catagory: "Other", value: 10 },
  ];

  const COLORS = [
    "#3B82F6", // blue
    "#10B981", // green
    "#F59E0B", // yellow
    "#EF4444", // red
    "#8B5CF6", // purple
    "#06B6D4", // cyan
  ];

  const data = rawData.map((item, index) => ({
    value: item.value,
    fill: COLORS[index % COLORS.length],
    catagory: item.catagory,
  }));

  return (
    <div className="w-full sm:w-5/7 min-w-75  rounded-lg shadow-card flex items-center justify-between text-[14px] xl:text-xl font-semibold gap-4 p-3 sm:px-8">
        <div className="flex flex-col gap-1 items-center">
        <p>Expenses by Category</p>
        <PiGraph data={data} />
        </div>
        <ul className="w-1/2 font-normal text-[14px]">
          {data.map((e, index) => {
            return (
              <div key={index} className="flex justify-between items-center">
                <div className="flex gap-3 justify-center items-center">
                  <div
                    className="w-2 aspect-square rounded-full"
                    style={{ backgroundColor: e.fill }}
                  ></div>
                  <p>{e.catagory}</p>
                </div>
                <p>{e.value}</p>
              </div>
            );
          })}
        </ul>
      </div>
  );
};

export default PiChart;
