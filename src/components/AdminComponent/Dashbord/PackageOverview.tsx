import { AdminCardSection } from "@/components/reuseable/AdminCardSection";
import { useGetAdminDashboardQuery } from "@/redux/features/admin/adminDashboardApi";
import { Package, CircleCheckBig, CircleAlert, Clock, Truck } from "lucide-react";


const PackageOverview = () => {

  const { data: dashboardData, isLoading } = useGetAdminDashboardQuery();


  const summary = dashboardData?.statusSummary;

  const stats = [
    { 
      icon: Package, 
      iconBgColor: "bg-blue-100", 
      iconColor: "text-blue-600", 
      value: summary?.received.toLocaleString() || "0", 
      label: "Received" 
    },
    { 
      icon: Clock, 
      iconBgColor: "bg-orange-100", 
      iconColor: "text-orange-600", 
      value: summary?.pendingQuote.toLocaleString() || "0", 
      label: "Pending Quote" 
    },
    { 
      icon: CircleAlert, 
      iconBgColor: "bg-red-100", 
      iconColor: "text-red-600", 
      value: summary?.pendingPayment.toLocaleString() || "0", 
      label: "Pending Payment" 
    },
    { 
      icon: Truck, 
      iconBgColor: "bg-purple-100", 
      iconColor: "text-purple-600", 
      value: summary?.inTransit.toLocaleString() || "0", 
      label: "In Transit" 
    },
    { 
      icon: CircleCheckBig, 
      iconBgColor: "bg-[#F0FDF4]", 
      iconColor: "text-[#00A63E]", 
      value: summary?.delivered.toLocaleString() || "0", 
      label: "Delivered" 
    },
  ];

  if (isLoading) {
    return <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mt-6 animate-pulse">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-24 bg-gray-100 rounded-xl"></div>
      ))}
    </div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-6">
      {stats.map((stat, index) => (
        <AdminCardSection
          key={index}
          icon={stat.icon}
          iconBgColor={stat.iconBgColor}
          iconColor={stat.iconColor}
          value={stat.value}
          label={stat.label}
        />
      ))}
    </div>
  );
};

export default PackageOverview;






// import { AdminCardSection } from "@/components/reuseable/AdminCardSection";
// import { Package, CircleCheckBig, CircleAlert,   Clock } from "lucide-react";


// const PackageOverview = () => {
//   const stats = [
//     { icon: Package, iconBgColor: "bg-blue-100", iconColor: "text-blue-600", value: "23", label: "Received" },
//     { icon: Clock , iconBgColor: "bg-[#FEF2F2]", iconColor: "text-[#E7000B]", value: "15", label: "Pending Quote" },
//     { icon: CircleAlert, iconBgColor: "bg-[#FEF2F2]", iconColor: "text-[#E7000B]", value: "15", label: "Pending Payment" },
//     { icon:  CircleAlert, iconBgColor: "bg-[#FEF2F2]", iconColor: "text-[#E7000B]", value: "56", label: "In Transit" },
//     { icon: CircleCheckBig, iconBgColor: "bg-[#F0FDF4]", iconColor: "text-[#00A63E]", value: "735", label: "Delivered" },
//   ];

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-6">
//       {stats.map((stat, index) => (
//         <AdminCardSection
//           key={index}
//           icon={stat.icon}
//           iconBgColor={stat.iconBgColor}
//           iconColor={stat.iconColor}
//           value={stat.value}
//           label={stat.label}
//           // percentage is now omitted correctly
//         />
//       ))}
//     </div>
//   );
// };

// export default PackageOverview;