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

import { DatePickerWithRange } from "../ui/date-range-picker";
import { DateRange } from "react-day-picker";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function RevenueTrendChart({
  data,
  date,
  setDate
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any[];
  date?: DateRange;
  setDate?: (date: DateRange | undefined) => void;
}) {
  return (
    <div className="border rounded-lg p-4">
      <div className="flex justify-between items-center gap-2 flex-wrap">
        <h2 className="h6-medium">Revenue Trend</h2>
        {date && setDate && (
          <DatePickerWithRange date={date} setDate={setDate} />
        )}
      </div>
      <ResponsiveContainer width={"100%"} height={350} className="mt-6">
        <LineChart
          data={data || []}
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
            // Remove static label for month since we have the picker
            // label={{
            //   value: "May, 2025",
            //   position: "bottom",
            //   offset: 0,
            // }}
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
