import { customerGrowth } from "@/data/reports";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  CartesianGrid,
  Label,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function CustomerGrowth() {
  return (
    <div className="border rounded-lg p-4">
      <div className="flex justify-between items-center gap-2">
        <h2 className="h6-medium">Customer Growth</h2>
        <div className="flex items-center gap-2 font-medium border border-[#8D8D8D] rounded-lg px-2 py-1">
          <Icon icon={"hugeicons:calendar-03"} />
          <p>
            1-May, 2025 <span className="text-grey-700">to</span> 30-May, 2025
          </p>
        </div>
      </div>
      <ResponsiveContainer width={"100%"} height={350} className="mt-6">
        <LineChart
          data={customerGrowth}
          margin={{ top: 30, left: 10, bottom: 15 }}
        >
          <Tooltip
            isAnimationActive={false}
            cursor={false}
            content={({ active, payload, ...props }) => {
              // console.log(props);
              const isVisible = active && payload && payload.length;
              return (
                <>
                  {isVisible && (
                    <div className="body-3 bg-[#F3EFF6] text-primary-700 border border-primary-100 rounded-md p-2">
                      <p className="mb-2">May {payload[0].payload.day}</p>
                      <p className="flex items-center gap-2">
                        <span className="bg-primary-400 rounded-full size-2" />
                        <span className="flex-1">No of Customers</span>
                        <span>{payload[0].value}</span>
                      </p>
                    </div>
                  )}
                </>
              );
            }}
          />
          <CartesianGrid vertical={false} stroke="#F3F3F3" />
          <YAxis axisLine={false} tickLine={false} fontSize={"14px"}>
            <Label
              value={"Number of Customers"}
              angle={-90}
              position={"left"}
              offset={0}
              fontSize={"14px"}
            />
          </YAxis>
          <XAxis
            tickLine={false}
            axisLine={false}
            interval={1}
            fontSize={"14px"}
          >
            <Label
              value={"May, 2025"}
              position={"bottom"}
              offset={0}
              fontSize={"14px"}
            />
          </XAxis>
          <Line
            isAnimationActive={false}
            dataKey={"customers"}
            type={"linear"}
            stroke="#5C1978"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
