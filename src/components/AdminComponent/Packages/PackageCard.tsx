import { AdminCardSection } from "@/components/reuseable/AdminCardSection";
import { useGetPackagesQuery } from "@/redux/features/clients/packageApi";
import { DeliveryConfirmedIcon } from "../Dashbord/DeviveryConfirmationIcon";


const PackageCard = () => {
  const { data } = useGetPackagesQuery({ page: 1, limit: 100 });

  const packages = data?.data ?? [];

  const total = packages.length;
  const inTransit = packages.filter(p => p.status === "IN_TRANSIT").length;
  const pendingAction = packages.filter(p =>
    ["PENDING_QUOTE", "PENDING_PAYMENT", "QUOTED"].includes(p.status)
  ).length;

  const stats = [
    { value: String(total).padStart(2, "0"),     label: "Total Package" },
    { value: String(pendingAction).padStart(2, "0"), label: "Pending Action" },
    { value: String(inTransit).padStart(2, "0"), label: "In Transit" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
      {stats.map((stat, index) => (
        <AdminCardSection
          key={index}
          icon={DeliveryConfirmedIcon}
          iconBgColor="bg-blue-100"
          iconColor="text-blue-600"
          value={stat.value}
          label={stat.label}
        />
      ))}
    </div>
  );
};
 export default PackageCard




// import { AdminCardSection } from "@/components/reuseable/AdminCardSection";

// import { DeliveryConfirmedIcon } from "../Dashbord/DeviveryConfirmationIcon";
// // import PackageCheck from '../../../../public/images/Admin/Icons/boxIcon.svg'


// const PackageCard = () => {
//   const stats = [
//     { icon: DeliveryConfirmedIcon, iconBgColor: "bg-blue-100", iconColor: "text-blue-600", value: "04", label: "Total Package" },
//     { icon: DeliveryConfirmedIcon, iconBgColor: "bg-blue-100", iconColor: "text-blue-600", value: "02", label: "Pending Action" },
//     { icon: DeliveryConfirmedIcon, iconBgColor: "bg-blue-100", iconColor: "text-blue-600", value: "02", label: "It Transit" },

   
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

// export default PackageCard;