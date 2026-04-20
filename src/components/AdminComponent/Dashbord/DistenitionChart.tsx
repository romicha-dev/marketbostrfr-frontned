import { useGetAdminDashboardQuery } from '@/redux/features/admin/adminDashboardApi';

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const COLORS = ['#EAB308', '#3B82F6', '#10B981', '#8B5CF6', '#F43F5E'];

const DestinationChart = () => {
  const { data: dashboardData, isLoading } = useGetAdminDashboardQuery();


  const chartData =
    dashboardData?.packagesByDestination
      .filter((item) => item.count > 0)
      .map((item, index) => ({
        name: item.destination,
        value: item.count,
        color: COLORS[index % COLORS.length],
      })) || [];

  if (isLoading) {
    return (
      <div className="w-full h-[516px] flex items-center justify-center bg-white rounded-2xl border border-gray-100">
        <p className="text-gray-400 animate-pulse">Loading Chart...</p>
      </div>
    );
  }

  return (
    <div className="w-full h-[516px] p-4 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col">
      
   
      <h2 className="text-base sm:text-lg md:text-xl font-normal font-roboto text-[#0A0A0A] mb-4 sm:mb-6">
        Packages by Destination
      </h2>

      <ResponsiveContainer width="100%" height="100%">
        <PieChart>

 
          <Legend
            verticalAlign="top"
            align="left"
            iconType="square"
            iconSize={18}
            wrapperStyle={{ paddingBottom: '40px', fontSize: '14px' }}
          />

          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            outerRadius={90}   
            dataKey="value"
            stroke="white"
            strokeWidth={2}

     
            label={({ name, value, x, y, cx, fill }) => (
              <text
                x={x}
                y={y}
                fill={fill}
                textAnchor={x > cx ? 'start' : 'end'}
                dominantBaseline="central"
                style={{ fontSize: '12px', fontWeight: 500 }}
              >
                {`${name}: ${value}`}
              </text>
            )}

            labelLine={false}
          >
            {chartData.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Pie>

        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DestinationChart;





// import {
//   PieChart,
//   Pie,
//   Cell,
//   ResponsiveContainer,
//   Legend,
// } from 'recharts';

// const data = [
//   { name: 'Guadeloupe', value: 287, color: '#EAB308' }, // Yellow-500
//   { name: 'Madagascar', value: 132, color: '#3B82F6' }, // Emerald-500
//   { name: 'Martinique', value: 345, color: '#10B981' }, // Blue-500
// ];

// const DestinationChart = () => {
//   return (
//     <div className="w-full  h-[516px] p-4 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col">
//       <h2 className="ttext-base sm:text-lg md:text-xl  font-normal font-roboto leading-snug md:leading-[150%] text[#0A0A0A] mb-4 sm:mb-6">Packages by Destination</h2>
      
//       <ResponsiveContainer width="100%" height="100%">
//         <PieChart>
//           {/* Custom Top Legend */}
//           <Legend 
//             verticalAlign="top" 
//             align="left" 
//             iconType="square"
//             iconSize={18}
//             wrapperStyle={{ paddingBottom: '40px', fontSize: '14px' }}
//           />
          
//           <Pie
//             data={data}
//             cx="50%"
//             cy="50%"
//             innerRadius={0}
//             outerRadius={100}
//             paddingAngle={0}
//             dataKey="value"
//             stroke="white"
//             strokeWidth={2}
//             // Label customization to match image colors and format
//             label={({ name, value, x, y, cx, fill }) => (
//               <text
//                 x={x}
//                 y={y}
//                 fill={fill} // Matches label color to slice color
//                 textAnchor={x > cx ? 'start' : 'end'}
//                 dominantBaseline="central"
//                 className="text-xs font-medium"
//               >
//                 {`${name}: ${value}`}
//               </text>
//             )}
//             labelLine={false} // Removed lines to match the clean floating look
//           >
//             {data.map((entry, index) => (
//               <Cell key={`cell-${index}`} fill={entry.color} />
//             ))}
//           </Pie>
//         </PieChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default DestinationChart;