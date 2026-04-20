import { useGetDropOffAppointmentsQuery } from "@/redux/features/clients/dropOffApi";
import { ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { useState } from "react";
import DropOffModal from "./DropOffModal";



type Props = {
  searchTerm: string;
  statusFilter: string;
};

const DropOffPackage = ({ searchTerm, statusFilter }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
   const [selectedId, setSelectedId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 4;

  const { data, isLoading } = useGetDropOffAppointmentsQuery({
    page: currentPage,
    limit: ITEMS_PER_PAGE,
  });

  const appointments = data?.data ?? [];
  const totalPages = data?.meta?.totalPages ?? 1;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'UPCOMING': return 'bg-[#DBEAFE] text-[#193CB8]';
      case 'COMPLETED': return 'bg-[#D0FFE2] text-[#00A63E]';
      case 'CANCELLED': return 'bg-[#FAD0D0] text-[#BF0C0F]';
      default: return 'bg-gray-100 text-gray-600';
    }
  };


   const filtered = appointments.filter((pkg) => {
    const q = searchTerm.toLowerCase();
    const matchesSearch =
      !q ||
      pkg.appointmentCode?.toLowerCase().includes(q) ||
      pkg.description?.toLowerCase().includes(q);
    const matchesStatus =
      statusFilter === 'Online  Ordered Package' ? true : pkg.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  return (
    <div>
      {/* Packages Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {filtered.map((pkg) => (
          <div key={pkg.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-5 border-b border-gray-100">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <span className="font-normal font-roboto text-sm sm:text-base leading-[150%] text-[#101828]">
                    {pkg.appointmentCode}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs sm:text-sm font-roboto font-normal ${getStatusColor(pkg.status)}`}>
                    {pkg.status}
                  </span>
                </div>
                <div className="flex flex-col md:flex-row items-center gap-2">
                  {pkg.status === 'UPCOMING' && (
                  <button
  onClick={() => {
    setSelectedId(pkg.id);     // ✅ set id
    setIsModalOpen(true);      // ✅ open modal
  }}
  className="px-3 py-2.5 bg-[#155DFC] hover:bg-blue-700 text-white rounded-lg text-sm cursor-pointer font-medium flex items-center gap-1"
>
  <Eye className="w-4 h-4" />
  Track
</button>
                  )}
                </div>
              </div>

              <p className="text-[#4A5565] text-sm sm:text-base font-roboto leading-[150%] font-normal mb-3.5">
                {pkg.description}
              </p>

              <div className="flex flex-col md:flex-row justify-between gap-x-4 gap-y-2 text-sm font-normal leading-[142%] text-[#4A5565]">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-3.5">
                  <span>📦 {pkg.packageCount} package(s)</span>
                  <span>🚩 {pkg.timeSlot}</span>
                  <span>🕝 {new Date(pkg.appointmentDate).toLocaleDateString('en-GB', {
                    day: 'numeric', month: 'long', year: 'numeric'
                  })}</span>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="p-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-[#6A7282] text-sm font-normal font-roboto leading-[150%] mb-1">Address</p>
                  <p className="text-[#101828] text-sm font-normal font-roboto leading-[150%]">{pkg.address}</p>
                </div>
                <div>
                  <p className="text-[#6A7282] text-sm font-normal font-roboto leading-[150%] mb-1">Postal Code</p>
                  <p className="text-[#101828] text-sm font-normal font-roboto leading-[150%]">{pkg.postalCode}</p>
                </div>
                <div>
                  <p className="text-[#6A7282] text-sm font-normal font-roboto leading-[150%] mb-1">Phone</p>
                  <p className="text-[#101828] text-sm font-normal font-roboto leading-[150%]">{pkg.contactPhone}</p>
                </div>
                <div>
                  <p className="text-[#6A7282] text-sm font-normal font-roboto leading-[150%] mb-1">Priority</p>
                  <p className="text-[#155DFC] text-sm font-normal font-roboto leading-[150%]">{pkg.priorityDelivery}</p>
                </div>
              </div>
            </div>
          </div>
        ))}

        {appointments.length === 0 && (
          <div className="col-span-2 text-center py-10">
            <p className="text-gray-400 text-sm">No appointments found.</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          className={`text-sm font-roboto font-medium flex items-center gap-1 ${currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-[#09090B] cursor-pointer"}`}
        >
          <ChevronLeft className="w-4 h-4" /> Previous
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button key={i + 1} onClick={() => setCurrentPage(i + 1)}
            className={`px-4 py-2 rounded-lg font-medium cursor-pointer transition-colors ${currentPage === i + 1 ? "bg-blue-600 text-white" : "border border-gray-300 text-gray-700 hover:bg-gray-50"}`}
          >{i + 1}</button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          className={`text-sm font-roboto font-medium flex items-center gap-1 ${currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "text-[#09090B] cursor-pointer"}`}
        >
          Next <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <DropOffModal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  packageId={selectedId}   // ✅ pass id
/>
    </div>
  );
};

export default DropOffPackage;







// import { ChevronLeft, ChevronRight, CreditCard, Eye } from 'lucide-react';
// import { useState } from 'react';
// import PackageModal from '../myPackage/PackageTracking';

// const DropOffPackage = () => {
//     const [isModalOpen, setIsModalOpen] = useState(false);

//   const defaultPackages = [
//     {
//       id: 'DRP-2025-001',
//       status: 'Upcoming',
//       statusColor: 'blue',
//       order: 'Electronics - fragile itemss',
//       weight: '2.5 kg',
//       destination: '10:00 - 11:00',
//       carrier: '🕝 February 10th, 2025',
//       price: '💶 45.00',
//       trackingNumber: '1Z999AA10123456784',
//       blNumber: 'BL-2025-001',
//       date: '2025-11-10',
//       clientNumber: 'KYL-2025-123456'
//     },
//     {
//       id: 'DRP-2025-002',
//       status: 'Upcoming',
//       statusColor: 'blue',
//       order: 'Electronics - fragile itemss',
//       weight: '2.5 kg',
//       destination: '10:00 - 11:00',
//       carrier: '🕝 February 10th, 2025',
//       price: '💶 45.00',
//       trackingNumber: '1Z999AA10123456784',
//       blNumber: 'BL-2025-001',
//       date: '2025-11-10',
//       clientNumber: 'KYL-2025-123456'
//     },
//     {
//       id: 'DRP-2025-003',
//       status: 'Upcoming',
//       statusColor: 'blue',
//       order: 'Electronics - fragile itemss',
//       weight: '2.5 kg',
//       destination: '10:00 - 11:00',
//       carrier: '🕝 February 10th, 2025',
//       price: '💶 45.00',
//       trackingNumber: '1Z999AA10123456784',
//       blNumber: 'BL-2025-001',
//       date: '2025-11-10',
//       clientNumber: 'KYL-2025-123456'
//     },
//     {
//       id: 'DRP-2025-004',
//       status: 'Upcoming',
//       statusColor: 'blue',
//       order: 'Electronics - fragile itemss',
//       weight: '2.5 kg',
//       destination: '10:00 - 11:00',
//       carrier: '🕝 February 10th, 2025',
//       price: '💶 45.00',
//       trackingNumber: '1Z999AA10123456784',
//       blNumber: 'BL-2025-001',
//       date: '2025-11-10',
//       clientNumber: 'KYL-2025-123456'
//     },

//   ];


//   const [packages] = useState(() => {
//     const saved = localStorage.getItem('my_packages');
//     const parsedSaved = saved ? JSON.parse(saved) : [];
//     return [...parsedSaved, ...defaultPackages]; 
//   });

//   const ITEMS_PER_PAGE = 4;
//   const [currentPage, setCurrentPage] = useState(1);

//   const totalPages = Math.ceil(packages.length / ITEMS_PER_PAGE);
//   const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
//   const currentPackages = packages.slice(startIndex, startIndex + ITEMS_PER_PAGE);





//   return (
//     <div className=''>
     
//       {/* Packages Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//         {currentPackages.map((pkg, idx) => (
//           <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
//             <div className="p-5 border-b border-gray-100">
//               <div className="flex justify-between items-start mb-3">
//                 <div className="flex items-center gap-3">
//                   <span className="font-normal font-roboto text-sm sm:text-base leading-[150%] text-[#101828]">{pkg.id}</span>
//                   <span className={`px-3 py-1 rounded-full text-xs sm:text-sm font-roboto font-normal ${
//                     pkg.statusColor === 'blue' ? 'bg-[#DBEAFE] text-[#193CB8]' :
//                     pkg.statusColor === 'green' ? 'bg-[#D0FFE2] text-[#00A63E]' :
//                     'bg-[#F0FDF4] text-[#00A63E]'
//                   }`}>
//                     {pkg.status}
//                   </span>
//                 </div>
//                 <div className="flex flex-col md:flex-row items-center gap-2">
//                   {pkg.status === 'Pending Payment' && (
//                     <button className="px-3 py-2.5 bg-[#00A63E] hover:bg-green-700 text-white rounded-lg text-sm sm:text-base leading-[120%] cursor-pointer font-medium flex items-center gap-1">
//                       <CreditCard className="w-4 h-4" />
//                       Pay
//                     </button>
//                   )}
//                   <button onClick={() => setIsModalOpen(true)} className="px-3 py-2.5 bg-[#155DFC] hover:bg-blue-700 text-white rounded-lg text-sm sm:text-base leading-[120%] cursor-pointer font-medium flex items-center gap-1">
//                     <Eye className="w-4 h-4" />
//                     Track
//                   </button>
//                 </div>
//               </div>
//               <p className="text-[#4A5565] text-sm sm:text-base font-roboto leading-[150%] font-normal mb-3.5">{pkg.order}</p>
//               <div className="flex flex-col md:flex-row justify-between gap-x-4 gap-y-2 text-sm font-normal leading-[142%] text-[#4A5565]">
//                 <div className='flex flex-col md:flex-row items-start md:items-center gap-3.5'>
//                   <span className="flex items-center text-[#4A5565] gap-1">{pkg.weight}</span>
//                   <span className="flex items-center gap-1">🚩 {pkg.destination}</span>
//                   <span className="flex items-center text-base gap-1">{pkg.carrier}</span>
//                 </div>
//                 <div className="flex justify-end">
//                   <span className="text-2xl font-bold text-[#00A63E]">{pkg.price}</span>
//                 </div>
//               </div>
//             </div>

//             {/* Package Details */}
//             <div className="p-5">
//               <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 gap-4 text-sm">
//                 <div>
//                   <p className="text-[#6A7282] text-sm sm:text-base font-normal font-roboto leading-[150%] mb-1">Tracking Number</p>
//                   <p className="text-[#101828] text-sm sm:text-base font-normal font-roboto leading-[150%]">{pkg.trackingNumber}</p>
//                 </div>
//                 <div>
//                   <p className="text-[#6A7282] text-sm sm:text-base font-normal font-roboto leading-[150%] mb-1">BL Number</p>
//                   <p className="text-[#101828] text-sm sm:text-base font-normal font-roboto leading-[150%]">{pkg.blNumber}</p>
//                 </div>
//                 <div>
//                   <p className="text-[#6A7282] text-sm sm:text-base font-normal font-roboto leading-[150%] mb-1">Date</p>
//                   <p className="text-[#101828] text-sm sm:text-base font-normal font-roboto leading-[150%]">{pkg.date}</p>
//                 </div>
//                 <div>
//                   <p className="text-[#6A7282] text-sm sm:text-base font-normal font-roboto leading-[150%] mb-1">Client Number</p>
//                   <p className="text-[#155DFC] text-sm sm:text-base font-normal font-roboto leading-[150%]">{pkg.clientNumber}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Pagination */}
//       <div className="flex justify-center items-center gap-2">
//         <button
//           disabled={currentPage === 1}
//           onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
//           className={`text-sm font-roboto font-medium flex items-center gap-1
//             ${currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-[#09090B] cursor-pointer"}
//           `}
//         >
//           <ChevronLeft className="w-4 h-4" />
//           Previous
//         </button>

//         {[...Array(totalPages)].map((_, i) => {
//           const page = i + 1;
//           return (
//             <button
//               key={page}
//               onClick={() => setCurrentPage(page)}
//               className={`px-4 py-2 rounded-lg font-medium cursor-pointer transition-colors
//                 ${currentPage === page ? "bg-blue-600 text-white" : "border border-gray-300 text-gray-700 hover:bg-gray-50"}
//               `}
//             >
//               {page}
//             </button>
//           );
//         })}

//         <button
//           disabled={currentPage === totalPages}
//           onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
//           className={`text-sm font-roboto font-medium flex items-center gap-1
//             ${currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "text-[#09090B] cursor-pointer"}
//           `}
//         >
//           Next
//           <ChevronRight className="w-4 h-4" />
//         </button>
//       </div>

//         <PackageModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
//     </div>
//   );
// };

// export default DropOffPackage; 
