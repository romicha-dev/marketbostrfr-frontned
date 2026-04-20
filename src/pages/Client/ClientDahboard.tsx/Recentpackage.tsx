import { useGetClientDashboardQuery } from '@/redux/features/clients/dashboardApi';
import React from 'react';

import { useNavigate } from 'react-router-dom';

const getStatusStyle = (status: string) => {
  switch (status?.toLowerCase()) {
    case 'delivered': return 'bg-[#D0FAE5] text-[#007A55]';
    case 'in_transit':
    case 'shipped': return 'bg-[#D0E4FA] text-[#432DD7]';
    case 'pending':
    case 'pending payment': return 'bg-[#FAD0D0] text-[#BF0C0F]';
    default: return 'bg-gray-100 text-gray-600';
  }
};

export const Recentpackage: React.FC = () => {
  const { data, isLoading } = useGetClientDashboardQuery();
  const navigate = useNavigate();

  const recentPackages = data?.recentPackages ?? [];

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-base sm:text-lg md:text-xl font-normal text-[#0A0A0A] leading-[150%] font-roboto">
          Recent Packages
        </h2>
        <button
          onClick={() => navigate('/client/my-packages')}
          className="text-xs sm:text-sm font-normal text-[#0A0A0A] leading-[150%] font-roboto cursor-pointer mb-4"
        >
          View All
        </button>
      </div>

      {/* Loading */}
      {isLoading && (
        <p className="text-sm text-gray-400 text-center py-6">Loading...</p>
      )}

      {/* Empty */}
      {!isLoading && recentPackages.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-400 text-sm">No recent packages found.</p>
        </div>
      )}

      {/* Package List */}
      {!isLoading && recentPackages.length > 0 && (
        <div className="flex flex-col gap-4">
          {recentPackages.map((pkg: any, idx: number) => (
            <div
              key={idx}
              className="p-5 rounded-xl border border-gray-100 flex justify-between items-center bg-white hover:shadow-md transition-shadow"
            >
              {/* Left Info */}
              <div className="space-y-1">
                <h3 className="text-xs sm:text-sm md:text-base font-normal text-[#0A0A0A] leading-[150%] font-roboto">
                  {pkg.title || pkg.description || "No Title"}
                </h3>
                <p className="text-sm leading-[150%] font-roboto font-normal text-[#7C8791]">
                  Tracking: {pkg.trackingNumber || pkg.id}
                </p>
                <div className="flex items-center gap-2 pt-4">
                  <span className="text-xs sm:text-sm text-[#4A5565] leading-[150%] font-roboto font-normal">
                    • Weight: {pkg.weight ?? "N/A"}
                  </span>
                  <span className="text-xs sm:text-sm text-[#4A5565] leading-[142%] font-roboto font-normal">
                    • Destination: {pkg.destination ?? "N/A"}
                  </span>
                </div>
              </div>

              {/* Right Price & Status */}
              <div className="flex flex-col items-end gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-normal leading-[120%] ${getStatusStyle(pkg.status)}`}>
                  {pkg.status || "Unknown"}
                </span>
                <p className="text-base sm:text-lg md:text-xl font-normal font-roboto leading-[150%] text-[#00A63E]">
                  • <span className="ml-1">€{pkg.price ?? "0.00"}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};



// import React from 'react';

// export const Recentpackage: React.FC = () => {

 
//   const packages = [
//     { 
//       id: 'AMZ123456789',
//       title: 'Electronics - Laptop',
//       weight: '2.5 kg',
//       destination: 'Guadeloupe',
//       price: '€45.00',
//       status: 'Delivered',
//       statusType: 'success'
//     },
//     { 
//       id: 'AMZ123456789',
//       title: 'Electronics - Laptop',
//       weight: '2.5 kg',
//       destination: 'Guadeloupe',
//       price: '€45.00',
//       status: 'Pending Payment',
//       statusType: 'warning'
//     },
//     { 
//       id: 'AMZ123456789',
//       title: 'Electronics - Laptop',
//       weight: '2.5 kg',
//       destination: 'Guadeloupe',
//       price: '€45.00',
//       status: 'Shipped',
//       statusType: 'info'
//     }
//   ];

  
//   // Status color logic (Exact like image)
//   const getStatusStyle = (type: string) => {
//     switch (type) {
//       case 'success': return 'bg-[#D0FAE5] text-[#007A55]'; // Light green
//       case 'warning': return 'bg-[#FAD0D0] text-[#BF0C0F]'; // Light red
//       case 'info': return 'bg-[#FAD0D0] text-[#432DD7]';    // Light blue
//       default: return 'bg-gray-100 text-gray-600';
//     }
//   };

//   return (
//     <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm w-full">
//       {/* Header Section */}
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-base sm:text-lg md:text-xl font-normal text-[#0A0A0A] leading-[150%] font-roboto">Recent Packages</h2>
//         <button className="txt-xs sm:text-sm font-normal text-[#0A0A0A] leading-[150%] font-roboto cursor-pointer mb-4">
//           View All
//         </button>
//       </div>

//       {/* Package List */}
//       <div className="flex flex-col gap-4">
//         {packages.map((pkg, idx) => (
//           <div 
//             key={idx} 
//             className="p-5 rounded-xl border border-gray-100 flex justify-between items-center bg-white hover:shadow-md transition-shadow"
//           >
//             {/* Left Info */}
//             <div className="space-y-1">
//               <h3 className="text-xs sm:text-sm md:text-base   font-normal text-[#0A0A0A] leading-[150%] font-roboto">{pkg.title || "No Title"}</h3>
//               <p className="text-sm leading-[150%] font-roboto font-normal text-[#7C8791]">Tracking: {pkg.id}</p>
//               <div className="flex items-center gap-2 pt-4">
//                 <span className="text-xs sm:text-sm text-[#4A5565]  leading-[150%] font-roboto font-normal">• Weight: {pkg.weight || "N/A"}</span>
//                 <span className="text-xs m:text-sm text-[#4A5565]  leading-[142%] font-roboto font-normal">• Destination: {pkg.destination || "N/A"}</span>
//               </div>
//             </div>

//             {/* Right Price & Status */}
//             <div className="flex flex-col items-end gap-3">
//               <span className={ `px-3 py-1 rounded-full text-xs font-normal   leading-[120%] ${getStatusStyle(pkg.status)}` }>
//                 {pkg.status || "Unknown"}
//               </span>
//               <p className="text-base sm:text-lg md:text-xl  font-normal font-roboto leading-[150%] text-[#00A63E]">
//                 • <span className="ml-1 ">{pkg.price ? `€${pkg.price}` : "€0.00"}</span>
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };