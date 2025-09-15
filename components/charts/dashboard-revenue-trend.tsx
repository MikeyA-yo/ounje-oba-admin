import {
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { Icon } from "@iconify/react/dist/iconify.js";
import { revenueTrend } from "@/data/home";

export default function RevenueTrendChart() {
  return (
    <div className="border rounded-lg p-4">
      <div className="flex justify-between items-center gap-2">
        <h2 className="h6-medium">Revenue Trend</h2>
        <div className="flex items-center gap-2 font-medium border border-[#8D8D8D] rounded-lg px-2 py-1">
          <Icon icon={"hugeicons:calendar-03"} />
          <p>
            1-May, 2025 <span className="text-grey-700">to</span> 30-May, 2025
          </p>
        </div>
      </div>
      <ResponsiveContainer width={"100%"} height={350} className="mt-6">
        <LineChart
          data={revenueTrend}
          margin={{ top: 30, left: 10, bottom: 15 }}
        >
          <CartesianGrid vertical={false} stroke="#F3F3F3" />
          <Legend
            verticalAlign="top"
            iconType="circle"
            iconSize={8}
            align="right"
            wrapperStyle={{ top: "0px" }}
          />
          <YAxis
            dataKey={"grossRevenue"}
            axisLine={false}
            tickLine={false}
            fontSize={"14px"}
            tickFormatter={(value) =>
              value / 1000 == 0 ? "0" : `${value / 1000}k`
            }
          >
            <Label
              value={"Daily Sales"}
              angle={-90}
              position={"left"}
              offset={0}
              fontSize={"14px"}
            />
          </YAxis>
          <XAxis
            dataKey={"day"}
            tickLine={false}
            axisLine={false}
            fontSize={"14px"}
            label={{
              value: "May, 2025",
              position: "bottom",
              offset: 0,
            }}
            interval={1}
          />
          <Line
            name="Net Revenue"
            type={"basisOpen"}
            dataKey={"netRevenue"}
            dot={false}
            stroke="#F29B4C"
            strokeWidth={2}
            isAnimationActive={false}
          />
          <Line
            name="Gross Revenue"
            type={"basisOpen"}
            dataKey={"grossRevenue"}
            dot={false}
            stroke="#5EBAB0"
            strokeWidth={2}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
