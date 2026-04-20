import { AdminCardSection } from "@/components/reuseable/AdminCardSection";
import { DeliveryConfirmedIcon } from "../Dashbord/DeviveryConfirmationIcon";
import { useGetClientsQuery } from "@/redux/features/admin/clientApi";


const ClientCard = () => {
  const { data, isLoading } = useGetClientsQuery({ page: 1, limit: 20 });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const clients = data?.data || [];


  const totalClients = data?.total || 0;
  const activeClients = clients.filter(c => c.status === "active").length;
  const totalPackages = clients.length; 

  const stats = [
    {
      icon: DeliveryConfirmedIcon,
      iconBgColor: "bg-blue-100",
      iconColor: "text-blue-600",
      value: totalClients.toString(),
      label: "Clients",
    },
    {
      icon: DeliveryConfirmedIcon,
      iconBgColor: "bg-green-100",
      iconColor: "text-green-600",
      value: activeClients.toString(),
      label: "Active Clients",
    },
    {
      icon: DeliveryConfirmedIcon,
      iconBgColor: "bg-purple-100",
      iconColor: "text-purple-600",
      value: totalPackages.toString(),
      label: "Total Clients (Page)",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
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

export default ClientCard;







// import { AdminCardSection } from "@/components/reuseable/AdminCardSection";

// import { DeliveryConfirmedIcon } from "../Dashbord/DeviveryConfirmationIcon";
// // import PackageCheck from '../../../../public/images/Admin/Icons/boxIcon.svg'


// const ClientCard = () => {
//   const stats = [
//     { icon: DeliveryConfirmedIcon, iconBgColor: "bg-blue-100", iconColor: "text-blue-600", value: "50", label: "Clietns" },
//     { icon: DeliveryConfirmedIcon, iconBgColor: "bg-blue-100", iconColor: "text-blue-600", value: "20", label: "Active Clients" },
//     { icon: DeliveryConfirmedIcon, iconBgColor: "bg-blue-100", iconColor: "text-blue-600", value: "97", label: "Total Packages" },

   
//   ];

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-3  gap-6 mt-6">
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

// export default ClientCard;