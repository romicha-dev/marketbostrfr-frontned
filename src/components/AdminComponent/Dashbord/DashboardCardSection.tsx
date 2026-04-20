import { AdminCardSection } from '@/components/reuseable/AdminCardSection';
import { Users, Wallet, Truck } from 'lucide-react';
import { DeliveryConfirmedIcon } from './DeviveryConfirmationIcon';
import { useGetAdminDashboardQuery } from '@/redux/features/admin/adminDashboardApi';


const DahboardCardSection = () => {
 
  const { data, isLoading } = useGetAdminDashboardQuery();

  
  if (isLoading) return <div>Loading Stats...</div>;


  const overview = data?.overview;

  const stats = [
    {
      icon: DeliveryConfirmedIcon,
      iconBgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
      value: overview?.totalPackages.value.toLocaleString() || '0',
      label: 'Total Packages',
      percentage: overview?.totalPackages.changePercent || 0,
      isPositive: overview?.totalPackages.trend === 'up'
    },
    {
      icon: Users,
      iconBgColor: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      value: overview?.activeClients.value.toLocaleString() || '0',
      label: 'Active Clients',
      percentage: overview?.activeClients.changePercent || 0,
      isPositive: overview?.activeClients.trend === 'up'
    },
    {
      icon: Wallet,
      iconBgColor: 'bg-[#00A63E1F]',
      iconColor: 'text-[#00A63E]',
     
      value: `${overview?.monthlyRevenue.currency || '€'}${overview?.monthlyRevenue.value.toLocaleString() || '0'}`,
      label: 'Monthly Revenue',
      percentage: overview?.monthlyRevenue.changePercent || 0,
      isPositive: overview?.monthlyRevenue.trend === 'up'
    },
    {
      icon: Truck,
      iconBgColor: 'bg-purple-100',
      iconColor: 'text-purple-600',
      value: overview?.inTransit.value.toLocaleString() || '0',
      label: 'In Transit',
      percentage: overview?.inTransit.changePercent || 0,
      isPositive: overview?.inTransit.trend === 'up'
    }
  ];

  return (
    <div className="mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <AdminCardSection
            key={index}
            icon={stat.icon}
            iconBgColor={stat.iconBgColor}
            iconColor={stat.iconColor}
            value={stat.value}
            label={stat.label}
            percentage={stat.percentage}
            isPositive={stat.isPositive}
          />
        ))}
      </div>
    </div>
  );
};

export default DahboardCardSection;



// import { AdminCardSection } from '@/components/reuseable/AdminCardSection';
// // import boxImg from '../../../../public/images/Admin/Icons/boxIcon.svg'
// // import userImg from '../../../../public/images/Admin/Icons/activeclientIcon.svg'
// // import reneviuImg from '../../../../public/images/Admin/Icons/reneviuIcon.svg'
// // import transitImg from '../../../../public/images/Admin/Icons/transitIcon.svg'
// import {  Users, Wallet, Truck } from 'lucide-react';
// import { DeliveryConfirmedIcon } from './DeviveryConfirmationIcon';
// const DahboardCardSection = () => {
//   const stats = [
//     {
//       icon:DeliveryConfirmedIcon,
//       iconBgColor: 'bg-blue-100',
//       iconColor: 'text-blue-600',
//       value: '847',
//       label: 'Total Packages',
//       percentage: 12.5,
//       isPositive: true
//     },
//     {
//       icon: Users,
//       iconBgColor: 'bg-yellow-100',
//       iconColor: 'text-yellow-600',
//       value: '800',
//       label: 'Active Clients',
//       percentage: 12.5,
//       isPositive: true
//     },
//     {
//       icon: Wallet,
//       iconBgColor: 'bg-[#00A63E1F]',
//       iconColor: 'text-[#00A63E]',
//       value: '€24,580',
//       label: 'Monthly Revenue',
//       percentage: 12.5,
//       isPositive: true
//     },
//     {
//       icon: Truck,
//       iconBgColor: 'bg-purple-100',
//       iconColor: 'text-purple-600',
//       value: '56',
//       label: 'In Transit',
//       percentage: 12.5,
//       isPositive: false
//     }
//   ];

//   return (
//     <div className=" mb-6 ">
//       <div className="">
    
        
//         {/* Grid Layout */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {stats.map((stat, index) => (
//             <AdminCardSection
//               key={index}
//               icon={stat.icon}
//               iconBgColor={stat.iconBgColor}
//               iconColor={stat.iconColor}
//               value={stat.value}
//               label={stat.label}
//               percentage={stat.percentage}
//               isPositive={stat.isPositive}
//             />
//           ))}
//         </div>

      
//       </div>
//     </div>
//   );
// };

// export default DahboardCardSection;
