import { useGetAdminDashboardQuery } from "@/redux/features/admin/adminDashboardApi";
import React, { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";

const RevenueChart: React.FC = () => {
  const currentYear = new Date().getFullYear();


  const [selectedYear, setSelectedYear] = useState<number>(currentYear);
  const [selectedMonth, ] = useState<number>(0);


  const { data, isLoading } = useGetAdminDashboardQuery({
    year: selectedYear,
    month: selectedMonth === 0 ? undefined : selectedMonth,
  });

  const chartData = data?.monthlyRevenueAndPackages || [];

  const formatValue = (value: number) => {
    if (!value) return "0";
    if (value >= 1000) return `${Math.floor(value / 1000)}K+`;
    return value.toString();
  };

  const years = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => currentYear - 2 + i);
  }, [currentYear]);

  // const months = [
  //   { label: "All Months", value: 0 },
  //   { label: "January", value: 1 },
  //   { label: "February", value: 2 },
  //   { label: "March", value: 3 },
  //   { label: "April", value: 4 },
  //   { label: "May", value: 5 },
  //   { label: "June", value: 6 },
  //   { label: "July", value: 7 },
  //   { label: "August", value: 8 },
  //   { label: "September", value: 9 },
  //   { label: "October", value: 10 },
  //   { label: "November", value: 11 },
  //   { label: "December", value: 12 },
  // ];

  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-gray-100 p-6">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">

        {/* TITLE */}
        <h2 className="text-base font-semibold text-gray-800">
          Revenue Analytics
        </h2>

        {/* FILTER BOX */}
        <div className="flex gap-3">

          {/* MONTH */}
          {/* <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
            className="text-xs px-3 py-2 border rounded-md bg-gray-50 focus:ring-1 focus:ring-blue-500 outline-none"
          >
            {months.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select> */}

          {/* YEAR */}
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="text-xs px-3 py-2 border rounded-md bg-gray-50 focus:ring-1 focus:ring-blue-500 outline-none"
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>

        </div>
      </div>

      {/* CHART */}
      <div className="h-[400px] w-full">

        {isLoading ? (
          <div className="h-full flex items-center justify-center text-gray-400 animate-pulse">
            Loading chart...
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, bottom: 10 }}>

              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#374151", fontSize: 12 }}
                dy={10}
              />

              <YAxis hide />

              <Tooltip
                cursor={{ fill: "transparent" }}
                formatter={(value: any) => [
                  `€${Number(value).toLocaleString()}`,
                  "Revenue",
                ]}
              />

              <Bar
                dataKey="revenue"
                fill="#2563eb"
                radius={[6, 6, 6, 6]}
                barSize={35}
              >
                <LabelList
                  dataKey="revenue"
                  content={({ x, y, width, value }) => {
                    const cx = Number(x) + Number(width) / 2;
                    const cy = Number(y) - 8;

                    return (
                      <text
                        x={cx}
                        y={cy}
                        textAnchor="middle"
                        fontSize={10}
                        fontWeight={600}
                        fill="#111827"
                      >
                        {formatValue(Number(value))}
                      </text>
                    );
                  }}
                />
              </Bar>

            </BarChart>
          </ResponsiveContainer>
        )}

      </div>
    </div>
  );
};

export default RevenueChart;



// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   LabelList,
// } from "recharts";

// interface DataPoint {
//   month: string;
//   revenue: number;
// }

// const data: DataPoint[] = [
//   { month: "Jan", revenue: 20000 },
//   { month: "Feb", revenue: 64000 },
//   { month: "Mar", revenue: 52000 },
//   { month: "Apr", revenue: 120000 },
//   { month: "May", revenue: 82000 },
//   { month: "Jun", revenue: 68000 },
//   { month: "Jul", revenue: 130000 },
//   { month: "Aug", revenue: 50000 },
//   { month: "Sep", revenue: 10000 },
//   { month: "Oct", revenue: 30000 },
//   { month: "Nov", revenue: 15000 },
//   { month: "Dec", revenue: 40000 },
// ];

// const RevenueChart: React.FC = () => {
//   const formatValue = (value: number) => `${Math.floor(value / 1000)}K+`;

//   return (
//     <div className="w-full h-[520px] p-6 bg-white rounded-xl shadow-sm border border-gray-100">
//       <h2 className="text-sm sm:text-base font-poppins font-normal text-gray-800 mb-4">
//         Monthly Revenue & Packages
//       </h2>

//       {/* 👇 chart height আলাদা করে control করা হলো */}
//       <div className="h-[404px]">
//         <ResponsiveContainer width="100%" height="100%">
//           <BarChart
//             data={data}
//             margin={{ top: 20, right: 10, left: 10, bottom: 20 }} // 🔥 bottom space বাড়ানো
//             barGap={12}
//           >
//             <XAxis
//               dataKey="month"
//               axisLine={false}
//               tickLine={false}
//               tick={{ fill: "#212B36", fontSize: 14 }}
//               dy={20} // 🔥 month নাম নিচে নামানো
//             />

//             <YAxis hide />

//             <Tooltip cursor={{ fill: "transparent" }} />

//             <Bar
//               dataKey="revenue"
//               fill="#2563eb"
//               radius={[10, 10, 10, 10]}
//               barSize={42}
//             >
//            <LabelList
//   dataKey="revenue"
//   content={({ x, y, width, value }) => {
//     const cx = Number(x) + Number(width) / 2;
//     const cy = Number(y) + 22;

//     return (
//       <text
//         x={cx}
//         y={cy}
//         fill="#FFFFFF"
//         textAnchor="middle"
//         fontSize={11}
//         fontWeight={500}
//       >
//         {formatValue(Number(value))}
//       </text>
//     );
//   }}
// />

//             </Bar>
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default RevenueChart;
