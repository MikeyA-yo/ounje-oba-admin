// import { ordersTrend } from "@/data/home";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
} from "recharts";

export default function OrdersTrendChart({ data }: { data?: any[] }) {
  // Fallback to empty array if data is undefined to prevent reduce error
  const safeData = data || [];
  const totalAmount = safeData.reduce((prev: number, curr: any) => prev + (curr.amount || 0), 0);
  const COLORS = ["#24A148", "#F1C21B", "#1D55CE"];

  return (
    <div className="border rounded-lg p-4">
      <div className="flex justify-between items-center gap-2">
        <h2 className="h6-medium">Orders Trend</h2>
        <div className="flex items-center gap-2 border border-[#8D8D8D] rounded-lg px-2 py-1">
          <p className="body-3">Monthly</p>
          <Icon icon={"iconoir:nav-arrow-down-solid"} />
        </div>
      </div>
      <ResponsiveContainer width={"100%"} height={350} className="mt-6">
        <PieChart data={safeData}>
          <Pie
            isAnimationActive={false}
            dataKey={"amount"}
            startAngle={85}
            endAngle={360 + 85}
            innerRadius={65}
            fill="#808080"
            legendType="circle"
            nameKey={"status"}
            labelLine={false}
            label={({ cx, cy }) => {
              return (
                <text
                  x={cx}
                  y={cy}
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  <tspan x="50%" dy="-0.6em" className="fill-black-400 body-3">
                    Total
                  </tspan>
                  <tspan
                    x="50%"
                    dy="1.2em"
                    className="fill-black body-1 font-semibold"
                  >
                    {totalAmount}
                  </tspan>
                </text>
              );
            }}
          >
            {safeData.map((_: any, index: number) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
            <Legend
              verticalAlign="bottom"
              content={({ payload }) => {
                // console.log(payload);
                return (
                  <div className="flex justify-around items-center gap-2 w-full">
                    {payload?.map((item, index) => (
                      <div
                        key={index}
                        className="flex flex-col items-center text-center gap-2"
                      >
                        <div
                          style={{ backgroundColor: item.color }}
                          className="size-2 rounded-full"
                        />
                        <span className="caption">
                          {item.value}
                          <br />
                          {safeData[index]?.amount}
                        </span>
                      </div>
                    ))}
                  </div>
                );
              }}
            />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
