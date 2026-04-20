import React, { useEffect, useRef, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from 'recharts';
import { ChevronDown } from 'lucide-react';
import { useGetClientDashboardQuery } from '@/redux/features/clients/dashboardApi';
import { useSelector } from 'react-redux';
import { selectUser } from '@/store/features/auth/auth.slice';
import userImg from '../../../../public/clientUser.jpg';

// type ChartData = {
//   name: string;
//   value: number;
// };

// const data: ChartData[] = [
//   { name: '1-5 nov', value: 18 },
//   { name: '6-10 nov', value: 40 },
//   { name: '11-15 nov', value: 20 },
//   { name: '16-20 nov', value: 35 },
//   { name: '21-25 nov', value: 12 },
//   { name: '26-30 nov', value: 8 },
// ];

const options = [
  "Today",
  "This Week",
  "This Month",
  "Last Month",
  "This Year",
];

export const StatisticProfile: React.FC = () => {
  const [open, setOpen] = useState(false);
   const dropdownRef = useRef<HTMLDivElement | null>(null);
const [selected, setSelected] = useState("This Month");

const { data } = useGetClientDashboardQuery();

const client = data?.client;
const recentPackages = data?.recentPackages || [];
const totalOrders = recentPackages.length;

const getChartData = () => {
  if (!data) return [];

  switch (selected) {
    case "Today":
      return [{ name: data.deliveredCharts.today.label, value: data.deliveredCharts.today.totalDelivered }];
    case "This Week":
      return data.deliveredCharts.thisWeek.map((d) => ({ name: d.day, value: d.totalDelivered }));
    case "This Month":
      return data.deliveredCharts.thisMonth.map((d) => ({ name: d.label, value: d.totalDelivered }));
    case "Last Month":
      return data.deliveredCharts.lastMonth.map((d) => ({ name: d.label, value: d.totalDelivered }));
    case "This Year":
      return data.deliveredCharts.thisYear.map((d) => ({ name: d.month, value: d.totalDelivered }));
    default:
      return [];
  }
};

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  const authUser = useSelector(selectUser);
  return (
    <div  ref={dropdownRef}
     className="w-full h-full  space-y-5 bg-[#F8FAFF] p-4 rounded-[32px] border border-blue-100">
      
      {/* 1. Profile Section with Circular Border */}
      <div className="flex flex-col items-center pt-4 mb-7">
        <h3 className="w-full text-left font-semibold text-base sm:text-lg md:text-xl font-roboto text-[#000000] mb-6 px-2">Statistic</h3>
        
        <div className="relative w-43 h-43 flex items-center justify-center">
          {/* Outer Circle (Blue indicator) */}
          <div className="absolute inset-0 rounded-full  border border-[#B9CEF5]"></div>
          <div 
            className="absolute inset-0 rounded-full  border-[4px] border-blue-600" 
            style={{ clipPath: 'polygon(50% 50%, 100% 0, 100% 50%)' }} // Custom arc shape
          ></div>
          
          {/* Orders Badge */}
          <div className="absolute top-4 right-0 bg-blue-600 text-white text-[10px] px-2 py-1 rounded-full shadow-lg z-10">
            {totalOrders} Orders
          </div>

          {/* User Image */}
          <div className="w-[85%] h-[85%] rounded-full overflow-hidden border-4 border-white shadow-sm">
               <img
        key={authUser?.profileImageUrl} // image change hole re-render
        src={
          authUser?.profileImageUrl
            ? `${authUser.profileImageUrl}?t=${Date.now()}`
            : userImg
        }
        alt={authUser?.fullName || "User"}
        className="w-full h-full object-cover"
      />
          </div>
        </div>

        <div className="text-center mt-4">
          <h2 className="text-base sm:text-lg md:text-xl font-semibold text-[#000000] font-arima leading-[150%] flex items-center mb-2 justify-center gap-2">
            Good Morning {client?.fullName ? `, ${client.fullName}!` : '!'}
          </h2>
          <p className="text-sm sm:text-base text-[#4A5565] font-roboto leading-[150%] ">Track your packages & shipments history.</p>
        </div>
      </div>

      {/* 2. Bar Chart Section */}
      <div ref={dropdownRef} className="bg-[#E9F0FF] rounded-[24px] p-4 md:px-8.5 md:py-5 mb-6">
        
        <div className="relative">
  <button
    onClick={() => setOpen(!open)}
    className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg
    text-xs sm:text-sm font-normal text-[#155DFC] leading-[150%]
    cursor-pointer border border-blue-200 mb-8"
  >
    {selected}
    <ChevronDown className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} />
  </button>
    {open && (
    <div className="absolute left-0 top-full mt-1 w-40 bg-white border
    border-blue-100 rounded-lg shadow-lg z-50 overflow-hidden">
      {options.map((item) => (
        <button
          key={item}
          onClick={() => {
            setSelected(item);
              
            setOpen(false);
          }}
          className={`block w-full text-left px-3 py-2 text-xs sm:text-sm
          hover:bg-blue-50 transition
          ${selected === item ? "text-blue-600 font-medium" : "text-gray-700"}`}
        >
          {item}
        </button>
      ))}
    </div>
  )}
</div>


  
        <div className="h-44 w-full">
         <ResponsiveContainer width="100%" height="100%">
  <BarChart data={getChartData()} margin={{ top: 0, right: 0, left: -30, bottom: 0 }}>
    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#D1DFFF" />
    <XAxis 
      dataKey="name" 
      axisLine={false} 
      tickLine={false} 
      tick={{ fill: '#4A5565', fontSize: 10 }} 
      dy={10}
    />
    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#000000', fontSize: 16 }} />
    <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={28}>
      {getChartData().map((entry, index) => (
        <Cell
          key={`cell-${index}`}
          fill={entry.value > 30 ? '#1D61E7' : '#B8CFFF'} 
        />
      ))}
    </Bar>
  </BarChart>
</ResponsiveContainer>
        </div>
      </div>

      {/* 3. How to Order Section */}
      <div className="bg-[#EDF4FF] rounded-[24px] p-6 border border-blue-50 mb-6">
        <h3 className="font-normal text-[#0A0A0A] text-xs sm:text-sm md:text-base font-roboto mb-6 flex items-center gap-2">
          📦 How to Order
        </h3>
        <ul className="space-y-4">
          {[
            "Shop online from any platform",
            "Use our address with your client number",
            "Declare your package here",
            "We'll handle the rest!"
          ].map((text, i) => (
            <li key={i} className="flex gap-3 text-xs sm:text-sm font-normal font-roboto text-[#364153] leading-[150%]">
              <span className="font-normal text-[#364153]">{i + 1}.</span>
              {text}
            </li>
          ))}
        </ul>
      </div>

      {/* 4. Shipping Tip Section */}
      <div className="bg-[#FEFCE8] rounded-[24px] p-6 border border-yellow-100">
        <h4 className="font-normal text-[#0A0A0A] text-xs sm:text-sm md:text-base font-roboto mb-2 flex items-center gap-2 ">
          💡 Shipping Tip
        </h4>
        <p className="text-xs sm:text-sm font-normal text-[#364153] leading-[150%]">
          Consolidate multiple packages into one shipment to save on shipping costs! Contact us for more details.
        </p>
      </div>
      
    </div>
  );
};