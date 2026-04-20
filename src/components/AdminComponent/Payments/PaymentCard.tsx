import { AdminCardSection } from "@/components/reuseable/AdminCardSection";
import { DeliveryConfirmedIcon } from "../Dashbord/DeviveryConfirmationIcon";
import { useGetPaymentsQuery } from "@/redux/features/clients/paymentsApi";


const PaymentCard = () => {
 const { data } = useGetPaymentsQuery({
  page: 1,
  limit: 50,
});

  const payments = data?.data || [];

  // 🔥 calculations
  const totalPayments = payments.length;

  const paidPayments = payments.filter((p) => p.status === "PAID");
  const pendingPayments = payments.filter((p) => p.status === "PENDING");

  const totalPaidAmount = paidPayments.reduce(
    (sum, p) => sum + Number(p.amount || 0),
    0
  );

  const totalPendingAmount = pendingPayments.reduce(
    (sum, p) => sum + Number(p.amount || 0),
    0
  );

  const stats = [
    {
      icon: DeliveryConfirmedIcon,
      iconBgColor: "bg-blue-100",
      iconColor: "text-blue-600",
      value: totalPayments,
      label: "Total Payments",
    },
    {
      icon: DeliveryConfirmedIcon,
      iconBgColor: "bg-green-100",
      iconColor: "text-green-600",
      value: `€${totalPaidAmount}`,
      label: `Paid (${paidPayments.length} payments)`,
      valueColor: "#00A63E",
      labelColor: "#00A63E",
    },
    {
      icon: DeliveryConfirmedIcon,
      iconBgColor: "bg-red-100",
      iconColor: "text-red-600",
      value: `€${totalPendingAmount}`,
      label: `Pending (${pendingPayments.length} payments)`,
      valueColor: "#CA3500",
      labelColor: "#F54900",
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
          valueColor={stat.valueColor}
          labelColor={stat.labelColor}
        />
      ))}
    </div>
  );
};

export default PaymentCard;






// import { AdminCardSection } from "@/components/reuseable/AdminCardSection";

// import { DeliveryConfirmedIcon } from "../Dashbord/DeviveryConfirmationIcon";
// // import PackageCheck from '../../../../public/images/Admin/Icons/boxIcon.svg'


// const PaymentCard = () => {
//   const stats = [
//     { icon: DeliveryConfirmedIcon, iconBgColor: "bg-blue-100", iconColor: "text-blue-600", value: "6", label: "Total Payments" },
//     { icon: DeliveryConfirmedIcon, iconBgColor: "bg-blue-100", iconColor: "text-blue-600", value: "€102.00", label: "Paid (3 payments)", valueColor: "#00A63E", labelColor: "#00A63E" },
//     { icon: DeliveryConfirmedIcon, iconBgColor: "bg-blue-100", iconColor: "text-blue-600", value: "€70.00", label: "Pending (3 payments)", valueColor: "#CA3500", labelColor: "#F54900" },

   
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
//      valueColor={stat.valueColor}
//     labelColor={stat.labelColor}
//           // percentage is now omitted correctly
//         />
//       ))}
//     </div>
//   );
// };

// export default PaymentCard;