import { paymentMethod } from "@/data/reports";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Cell,
  Label,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
} from "recharts";

export default function PaymentMethodChart() {
  const RADIAN = Math.PI / 180;
  const COLORS = [
    "#5C1978",
    "#2E2E2E",
    "#F29B4C",
    "#5EBAB0",
    "#1D55CE",
    "#F1C21B",
  ];

  return (
    <div className="border rounded-lg p-4">
      <div className="flex justify-between items-center gap-2">
        <h2 className="h6-medium">Payment Method Report</h2>
        <div className="flex items-center gap-2 border border-[#8D8D8D] rounded-lg px-2 py-1">
          <p className="body-3">Monthly</p>
          <Icon icon={"iconoir:nav-arrow-down-solid"} />
        </div>
      </div>
      <ResponsiveContainer width={"100%"} height={350} className="mt-6">
        <PieChart data={paymentMethod}>
          <Pie
            isAnimationActive={false}
            dataKey={"percentage"}
            endAngle={-360}
            innerRadius={60}
            fill="#808080"
            legendType="circle"
            nameKey={"status"}
            labelLine={false}
            label={({
              cx,
              cy,
              midAngle,
              innerRadius,
              outerRadius,
              payload,
            }) => {
              const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
              const x = cx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
              const y = cy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

              return (
                <text
                  x={x}
                  y={y}
                  fill="white"
                  textAnchor={"middle"}
                  dominantBaseline="central"
                >
                  {`${payload.percentage}%`}
                </text>
              );
            }}
          >
            {paymentMethod.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
            <Legend
              verticalAlign="bottom"
              content={({ payload }) => {
                return (
                  <div className="flex flex-wrap justify-center items-center gap-2 w-2/3 mx-auto">
                    {payload?.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center text-center gap-2"
                      >
                        <div
                          style={{ backgroundColor: COLORS[index] }}
                          className="size-2 rounded-full"
                        />
                        <span className="caption">
                          {paymentMethod[index].method}
                        </span>
                      </div>
                    ))}
                  </div>
                );
              }}
            />
          </Pie>
          <Label
            x={"50%"}
            y={"50%"}
            content={({ x, y }) => {
              return (
                <text x={x} y={y} textAnchor="middle" dominantBaseline="middle">
                  <tspan x="50%" dy="-0.6em" className="fill-black-400 body-3">
                    Total
                  </tspan>
                  <tspan
                    x="50%"
                    dy="1.2em"
                    className="fill-black body-1 font-semibold"
                  >
                    100%
                  </tspan>
                </text>
              );
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
