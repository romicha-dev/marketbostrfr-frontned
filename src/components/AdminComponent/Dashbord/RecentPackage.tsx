import { useGetAdminDashboardQuery } from '@/redux/features/admin/adminDashboardApi';
import React from 'react';


type Status = string;

interface PackageCardProps {
  packageId: string;
  trackingNumber: string;
  date: string;
  customerName: string;
  company: string;
  weight: string;
  status: Status;
}

// Status styles mapping
const getStatusStyles = (status: string) => {
  const s = status.toLowerCase();
  if (s.includes('received')) return 'bg-[#1C60DF] text-white';
  if (s.includes('quote')) return 'bg-[#F0B100] text-white';
  if (s.includes('transit')) return 'bg-purple-600 text-white';
  if (s.includes('delivered')) return 'bg-green-600 text-white';
  if (s.includes('payment') || s.includes('pending')) return 'bg-orange-500 text-white';
  return 'bg-gray-500 text-white';
};

const PackageCard: React.FC<PackageCardProps> = ({
  packageId,
  trackingNumber,
  date,
  customerName,
  company,
  weight,
  status,
}) => {
  const displayWeight = Number(weight) > 0 ? `${weight} kg` : 'Pending';
  return (
    <div className="bg-white rounded-lg border border-[#B9CEF5] p-4 sm:p-6 hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="text-[#155DFC] font-medium text-sm sm:text-base">
              {packageId}
            </span>
            <span className="text-[#4A5565] text-sm sm:text-base">
              {trackingNumber}
            </span>
          </div>
          <div className="text-[#4A5565] text-sm">
            {new Date(date).toLocaleDateString('en-GB')} {/* Date format: DD/MM/YYYY */}
          </div>
        </div>

        <span className={`${getStatusStyles(status)} px-3 py-1.5 rounded-[8px] text-xs sm:text-sm font-medium whitespace-nowrap self-start`}>
          {status}
        </span>
      </div>

      <div className="space-y-1">
        <div className="text-gray-900 font-normal text-base sm:text-lg mb-1">
          {customerName}
        </div>
        <div className="text-gray-600 text-sm sm:text-base mb-1">
          {company}
        </div>
        <div className="text-gray-600 text-sm sm:text-base font-medium">
  Weight: {displayWeight}
</div>
      </div>
    </div>
  );
};

const RecentPackages: React.FC = () => {

  const { data: dashboardData, isLoading } = useGetAdminDashboardQuery();


  const packages = dashboardData?.recentPackages || [];

  if (isLoading) {
    return <div className="p-10 text-center text-gray-400">Loading packages...</div>;
  }

  return (
    <div className="bg-white py-6 px-3 rounded-[8px] md:px-10">
      <h1 className="text-base sm:text-lg md:text-xl font-medium text-[#0A0A0A] mb-4 sm:mb-6">
        Recent Packages
      </h1>

      <div className="space-y-4">
        {packages.length > 0 ? (
          packages.map((pkg, index) => (
            <PackageCard
              key={index}
              packageId={pkg.packageCode}
              trackingNumber={`TRK-${pkg.packageCode.split('-')[1] || 'N/A'}`} 
              date={pkg.createdAt}
              customerName={pkg.clientName}
              company={pkg.description}
              weight={pkg.weightKg.toString()}
              status={pkg.status}
            />
          ))
        ) : (
          <div className="text-center py-10 text-gray-500">No recent packages found.</div>
        )}
      </div>
    </div>
  );
};

export default RecentPackages;





// import React from 'react';

// // Define allowed status types
// type Status = 'Received' | 'Pending Quote' | 'In Transit' | 'Delivered' | 'Processing';

// // Props interface for PackageCard
// interface PackageCardProps {
//   packageId: string;
//   trackingNumber: string;
//   date: string;
//   customerName: string;
//   company: string;
//   weight: string;
//   status?: Status;
// }

// // Status color mapping
// const statusStyles: Record<Status, string> = {
//   'Received': 'bg-[#1C60DF] text-white',
//   'Pending Quote': 'bg-[#F0B100] text-white',
//   'In Transit': 'bg-purple-600 text-white',
//   'Delivered': 'bg-green-600 text-white',
//   'Processing': 'bg-orange-500 text-white',
// };

// // Reusable PackageCard component
// const PackageCard: React.FC<PackageCardProps> = ({
//   packageId,
//   trackingNumber,
//   date,
//   customerName,
//   company,
//   weight,
//   status = 'Received',
// }) => {
//   return (
//     <div className="bg-white rounded-lg border border-[#B9CEF5] p-4 sm:p-6 hover:shadow-md transition-shadow">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
//         <div className="flex-1">
//           <div className="flex flex-wrap items-center gap-2 mb-1">
//             <span className="text-[#155DFC] font-normal font-roboto leading-snug md:leading-[150%] text-sm sm:text-base">
//               {packageId}
//             </span>
//             <span className="text-[#4A5565] font-normal font-roboto leading-snug md:leading-[150%] text-sm sm:text-base">
//               {trackingNumber}
//             </span>
//           </div>
//           <div className="text-[#4A5565] font-normal font-roboto leading-snug md:leading-[150%] text-sm">
//             {date}
//           </div>
//         </div>

//         {/* Status Badge */}
//         <span className={`${statusStyles[status]} p-2.5 rounded-[8px] text-xs sm:text-sm md:text-base leading-[150%] font-inter font-medium whitespace-nowrap self-start`}>
//           {status}
//         </span>
//       </div>

//       {/* Customer Info */}
//       <div className="space-y-1">
//         <div className="text-gray-900 font-normal font-roboto leading-snug md:leading-[150%] text-base sm:text-lg md:text-xl mb-2.5">
//           {customerName}
//         </div>
//         <div className="text-gray-600 font-normal font-roboto leading-snug md:leading-[150%] text-sm sm:text-base mb-2.5">
//           {company}
//         </div>
//         <div className="text-gray-600 font-normal font-roboto leading-snug md:leading-[150%] text-sm sm:text-base">
//           Weight: {weight}
//         </div>
//       </div>
//     </div>
//   );
// };

// // Demo: RecentPackages component
// const RecentPackages: React.FC = () => {
//   const packages: PackageCardProps[] = [
//     {
//       packageId: 'PKG-847',
//       trackingNumber: 'KYL-2025-123456',
//       date: '2025-12-13',
//       customerName: 'Jean Dupont',
//       company: 'Amazon Electronics',
//       weight: 'Pending',
//       status: 'Received'
//     },
//     {
//       packageId: 'PKG-848',
//       trackingNumber: 'KYL-2025-123457',
//       date: '2025-12-14',
//       customerName: 'Sarah Johnson',
//       company: 'Tech Solutions Inc',
//       weight: '2.5 kg',
//       status: 'Pending Quote'
//     },
//     // {
//     //   packageId: 'PKG-849',
//     //   trackingNumber: 'KYL-2025-123458',
//     //   date: '2025-12-15',
//     //   customerName: 'Mike Anderson',
//     //   company: 'Global Imports',
//     //   weight: '3.2 kg',
//     //   status: 'In Transit'
//     // },
//     // {
//     //   packageId: 'PKG-850',
//     //   trackingNumber: 'KYL-2025-123459',
//     //   date: '2025-12-16',
//     //   customerName: 'Emma Wilson',
//     //   company: 'Fashion Hub',
//     //   weight: '4.5 kg',
//     //   status: 'Delivered'
//     // },
//     // {
//     //   packageId: 'PKG-851',
//     //   trackingNumber: 'KYL-2025-123460',
//     //   date: '2025-12-17',
//     //   customerName: 'Liam Smith',
//     //   company: 'Tech Mart',
//     //   weight: '1.8 kg',
//     //   status: 'Processing'
//     // }
//   ];

//   return (
//     <div className=" bg-white py-6 px-3 rounded-[8px] md:px-10 ">
//       <div className="">
//         {/* Header */}
//         <h1 className="text-base sm:text-lg md:text-xl  font-normal font-roboto leading-snug md:leading-[150%] text[#0A0A0A] mb-4 sm:mb-6">
//           Recent Packages
//         </h1>

//         {/* Package Cards List */}
//         <div className="space-y-4">
//           {packages.map((pkg, index) => (
//             <PackageCard key={index} {...pkg} />
//           ))}
//         </div>

      
//       </div>
//     </div>
//   );
// };

// export default RecentPackages;
