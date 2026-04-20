import { useGetClientDashboardQuery } from "@/redux/features/clients/dashboardApi";


export const CardSection: React.FC = () => {
  const { data, isLoading } = useGetClientDashboardQuery();

  const stats = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M11 21.7299C11.304 21.9054 11.6489 21.9979 12 21.9979C12.3511 21.9979 12.696 21.9054 13 21.7299L20 17.7299C20.3037 17.5545 20.556 17.3024 20.7315 16.9987C20.9071 16.6951 20.9996 16.3506 21 15.9999V7.9999C20.9996 7.64918 20.9071 7.30471 20.7315 7.00106C20.556 6.69742 20.3037 6.44526 20 6.2699L13 2.2699C12.696 2.09437 12.3511 2.00195 12 2.00195C11.6489 2.00195 11.304 2.09437 11 2.2699L4 6.2699C3.69626 6.44526 3.44398 6.69742 3.26846 7.00106C3.09294 7.30471 3.00036 7.64918 3 7.9999V15.9999C3.00036 16.3506 3.09294 16.6951 3.26846 16.9987C3.44398 17.3024 3.69626 17.5545 4 17.7299L11 21.7299Z" stroke="#155DFC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 22V12" stroke="#155DFC" strokeWidth="2"/>
          <path d="M3.29 7L12 12L20.71 7" stroke="#155DFC" strokeWidth="2"/>
        </svg>
      ),
      label: "Total Packages",
      value: isLoading ? "..." : data?.summary.totalPackagesCombined ?? 0, 
      bg: "bg-blue-50",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12Z" stroke="#F0B100" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M15.7099 15.1798L12.6099 13.3298C12.0699 13.0098 11.6299 12.2398 11.6299 11.6098V7.50977" stroke="#F0B100" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      label: "In Transit",
      value: isLoading ? "..." : data?.summary.inTransitCombined ?? 0, 
      bg: "bg-yellow-50",
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path d="M20.75 10.75C20.75 5.22715 16.2728 0.75 10.75 0.75C5.22715 0.75 0.75 5.22715 0.75 10.75C0.75 16.2728 5.22715 20.75 10.75 20.75C16.2728 20.75 20.75 16.2728 20.75 10.75Z" stroke="#12BC31" strokeWidth="1.5"/>
          <path d="M6.75 11.5C6.75 11.5 8.35 12.4125 9.15 13.75C9.15 13.75 11.55 8.5 14.75 6.75" stroke="#12BC31" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      label: "Delivered",
      value: isLoading ? "..." : data?.summary.deliveredCombined ?? 0, 
      bg: "bg-green-50",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M8.67188 14.3298C8.67188 15.6198 9.66188 16.6598 10.8919 16.6598H13.4019C14.4719 16.6598 15.3419 15.7498 15.3419 14.6298C15.3419 13.4098 14.8119 12.9798 14.0219 12.6998L9.99187 11.2998C9.20187 11.0198 8.67188 10.5898 8.67188 9.36984C8.67188 8.24984 9.54187 7.33984 10.6119 7.33984H13.1219C14.3519 7.33984 15.3419 8.37984 15.3419 9.66984" stroke="#164DB2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 6V18" stroke="#164DB2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#164DB2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      label: "Total Spent",
      value: isLoading ? "..." : `€${data?.summary.totalSpent ?? 0}`, 
      bg: "bg-blue-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 mt-8">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="bg-white rounded-xl p-6 shadow-sm border border-[#B9CEF5] hover:shadow-md transition-shadow"
        >
          <div className={`w-10 h-10 rounded-full ${stat.bg} flex items-center justify-center mb-4`}>
            {stat.icon}
          </div>
          <p className="text-xl sm:text-base md:text-3xl font-normal text-[#0A0A0A] leading-[120%] mb-6">
            {stat.value}
          </p>
          <p className="text-base sm:text-lg md:text-xl font-normal leading-[120%] text-[#4A5565]">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
};




// const stats = [
//   {
//     icon: (
//       <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
//         <path d="M11 21.7299C11.304 21.9054 11.6489 21.9979 12 21.9979C12.3511 21.9979 12.696 21.9054 13 21.7299L20 17.7299C20.3037 17.5545 20.556 17.3024 20.7315 16.9987C20.9071 16.6951 20.9996 16.3506 21 15.9999V7.9999C20.9996 7.64918 20.9071 7.30471 20.7315 7.00106C20.556 6.69742 20.3037 6.44526 20 6.2699L13 2.2699C12.696 2.09437 12.3511 2.00195 12 2.00195C11.6489 2.00195 11.304 2.09437 11 2.2699L4 6.2699C3.69626 6.44526 3.44398 6.69742 3.26846 7.00106C3.09294 7.30471 3.00036 7.64918 3 7.9999V15.9999C3.00036 16.3506 3.09294 16.6951 3.26846 16.9987C3.44398 17.3024 3.69626 17.5545 4 17.7299L11 21.7299Z" stroke="#155DFC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//         <path d="M12 22V12" stroke="#155DFC" strokeWidth="2"/>
//         <path d="M3.29 7L12 12L20.71 7" stroke="#155DFC" strokeWidth="2"/>
//       </svg>
//     ),
//     label: "Total Packages",
//     value: "5",
//     bg: "bg-blue-50",
//   },
//   {
//     icon: (
//       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//   <path d="M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12Z" stroke="#F0B100" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
//   <path d="M15.7099 15.1798L12.6099 13.3298C12.0699 13.0098 11.6299 12.2398 11.6299 11.6098V7.50977" stroke="#F0B100" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
// </svg>
//     ),
//     label: "In Transit",
//     value: "01",
//     bg: "bg-yellow-50",
//   },
//   {
//     icon: (
//       <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
//   <path d="M20.75 10.75C20.75 5.22715 16.2728 0.75 10.75 0.75C5.22715 0.75 0.75 5.22715 0.75 10.75C0.75 16.2728 5.22715 20.75 10.75 20.75C16.2728 20.75 20.75 16.2728 20.75 10.75Z" stroke="#12BC31" stroke-width="1.5"/>
//   <path d="M6.75 11.5C6.75 11.5 8.35 12.4125 9.15 13.75C9.15 13.75 11.55 8.5 14.75 6.75" stroke="#12BC31" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
// </svg>
//     ),
//     label: "Delivered",
//     value: "01",
//     bg: "bg-green-50",
//   },
//   {
//     icon: (
//      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//   <path d="M8.67188 14.3298C8.67188 15.6198 9.66188 16.6598 10.8919 16.6598H13.4019C14.4719 16.6598 15.3419 15.7498 15.3419 14.6298C15.3419 13.4098 14.8119 12.9798 14.0219 12.6998L9.99187 11.2998C9.20187 11.0198 8.67188 10.5898 8.67188 9.36984C8.67188 8.24984 9.54187 7.33984 10.6119 7.33984H13.1219C14.3519 7.33984 15.3419 8.37984 15.3419 9.66984" stroke="#164DB2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
//   <path d="M12 6V18" stroke="#164DB2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
//   <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#164DB2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
// </svg>
//     ),
//     label: "Total Spent",
//     value: "€157.50",
//     bg: "bg-blue-50",
//   },
// ];


// export const CardSection: React.FC = () => {
//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 mt-8">
//       {stats.map((stat, idx) => (
//         <div
//           key={idx}
//           className="bg-white rounded-xl p-6 shadow-sm border border-[#B9CEF5] hover:shadow-md transition-shadow"
//         >
//           <div
//             className={`w-10 h-10 rounded-full ${stat.bg} flex items-center justify-center mb-4`}
//           >
//             {stat.icon}
//           </div>

//           <p className="text-xl sm:text-base md:text-3xl font-normal text-[#0A0A0A] leading-[120%] mb-6">
//             {stat.value}
//           </p>
//           <p className="text-base sm:text-lg md:text-xl font-normal leading-[120%] text-[#4A5565]">{stat.label}</p>
//         </div>
//       ))}
//     </div>
//   );
// };
