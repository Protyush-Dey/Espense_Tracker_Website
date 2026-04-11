
import { PieChart, Pie, Cell } from "recharts";

type DataType = {
  value: number;
  fill: string;
  
};

type PiGraphProps = {
  data: DataType[];
};

const PiGraph = ({ data }: PiGraphProps) => {
  return (
    <PieChart width={100} height={120} >
      <Pie
        data={data}
        dataKey="value"
        cx="50%"
        cy="50%"
        outerRadius={50}
        innerRadius={25}
        isAnimationActive={true}
        animationDuration={800}
        activeShape={false}
      >
        {data.map((entry, index) => (
          <Cell key={index} fill={entry.fill} style={{ outline: "none" }}/>
        ))}
      </Pie>
    </PieChart>
  );
};

export default PiGraph;