import React from "react";
import { X } from "lucide-react";
import { useGetPackageByIdQuery } from "@/redux/features/clients/packageApi";

interface PackageModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageId: string; 
}

const statusOrder = [
  "Received",
  "Weighed - Pending Quote",
  "Quote Sent - Pending Payment",
  "Payment Received",
  "In Transit",
  "Delivered",
];

const PackageModal: React.FC<PackageModalProps> = ({
  isOpen,
  onClose,
  packageId,
}) => {
  if (!isOpen) return null;

  // 🔥 API CALL (REAL)
  const { data, isLoading } = useGetPackageByIdQuery(packageId);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/40">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

 const currentStatus = data?.status?.trim() || "Received";
const currentIndex = statusOrder.findIndex(
  (s) => s.toLowerCase() === currentStatus.toLowerCase()
);
  // const currentIndex = statusOrder.indexOf(currentStatus);

const trackingHistory = statusOrder.map((status, index) => ({
  status,
  time: index <= currentIndex ? (data?.updatedAt || "N/A") : null,
  location: index <= currentIndex ? (data?.destination || "N/A") : null,
  completed: index <= currentIndex,
}));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-[500px] rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">

        {/* HEADER */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">
            Package Tracking - {data?.packageCode}
          </h2>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="p-6 max-h-[80vh] overflow-y-auto">

          {/* PACKAGE DETAILS (API DATA) */}
          <div className="bg-[#F8FAFF] rounded-xl p-5 mb-8 border border-blue-50">
            <h3 className="text-sm font-semibold mb-4">Package Details</h3>

            <div className="grid grid-cols-2 gap-y-4 text-sm">
              <div>
                <p className="text-gray-500">Description</p>
                <p className="font-medium">{data?.description}</p>
              </div>

              <div>
                <p className="text-gray-500">Weight</p>
                <p className="font-medium">{data?.weightKg} kg</p>
              </div>

              <div>
                <p className="text-gray-500">Tracking Number</p>
                <p className="font-medium">{data?.trackingNumber}</p>
              </div>

              <div>
                <p className="text-gray-500">Cost</p>
                <p className="font-medium">€{data?.shippingCost}</p>
              </div>

              <div>
                <p className="text-gray-500">BL Number</p>
                <p className="text-blue-600 font-medium">
                  {data?.blNumber}
                </p>
              </div>

              <div>
                <p className="text-gray-500">Carrier</p>
                <p className="font-medium">{data?.carrier}</p>
              </div>
            </div>
          </div>

          {/* TRACKING HISTORY */}
          <div>
            <h3 className="text-sm font-semibold mb-6">Tracking History</h3>

            <div className="relative ml-3 max-h-[260px] overflow-y-auto">
              <div className="absolute left-[11px] top-0 bottom-0 w-[2px] bg-blue-100" />

              <div className="space-y-8">
                {trackingHistory.map((item, index) => (
                  <div key={index} className="relative flex items-start gap-4">

                    {/* ICON */}
                    <div className="z-10 bg-white">

                      {/* ✔ COMPLETED */}
                      {item.completed ? (
                        <div className="bg-[#1C60DF] h-8 w-8 rounded-full flex items-center justify-center">
                                             <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#clip0_1_12449)">
     <path d="M18.1678 8.33357C18.5484 10.2013 18.2772 12.1431 17.3994 13.8351C16.5216 15.527 15.0902 16.8669 13.3441 17.6313C11.5979 18.3957 9.64252 18.5384 7.80391 18.0355C5.9653 17.5327 4.35465 16.4147 3.24056 14.8681C2.12646 13.3214 1.57626 11.4396 1.68171 9.53639C1.78717 7.63318 2.54189 5.82364 3.82004 4.40954C5.09818 2.99545 6.82248 2.06226 8.70538 1.76561C10.5883 1.46897 12.516 1.82679 14.167 2.7794" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
     <path d="M7.5 9.16634L10 11.6663L18.3333 3.33301" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
   </g>
   <defs>
     <clipPath id="clip0_1_12449">
      <rect width="20" height="20" fill="white"/>
     </clipPath>
   </defs>
 </svg>
                        </div>
                      ) : (
                        /* ⭕ PENDING */
                        <div className="w-8 h-8 rounded-full bg-[#DBEAFE] flex items-center justify-center">
                          <div className="w-3 h-3 rounded-full border border-blue-500" />
                        </div>
                      )}
                    </div>

                    {/* TEXT */}
                    <div>
                      <h4
                        className={`text-sm font-semibold ${
                          item.completed ? "text-gray-900" : "text-gray-400"
                        }`}
                      >
                        {item.status}
                      </h4>

                      <p className="text-xs text-gray-500 mt-1">
                        {item.time}
                      </p>

                      <p className="text-xs text-gray-400">
                        {item.location}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PackageModal;







// import React from 'react';
// import { X,} from 'lucide-react';

// interface PackageModalProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// const PackageModal: React.FC<PackageModalProps> = ({ isOpen, onClose }) => {
//   if (!isOpen) return null;

//   const trackingHistory = [
//     { status: 'Received at Warehouse', time: '2025-10-20 11:00', location: 'Paris, France', completed: true },
//     { status: 'Weighed & Quoted', time: '2025-10-20 16:00', location: 'Paris, France', completed: false },
//     { status: 'Payment Received', time: '2025-10-21 09:00', location: 'Online', completed: false },
//     { status: 'In Transit', time: '2025-10-21 09:00', location: 'Fort-de-France, Martinique', completed: false },
//     { status: 'Out for Delivery', time: '2025-10-21 09:00', location: 'Fort-de-France, Martinique', completed: false },
//     { status: 'Delivered', time: '2025-10-21 09:00', location: 'Recipient Address', completed: false },
//   ];

//   //  const dropdownRef = useRef<HTMLDivElement | null>(null);
//   //      // 👉 outside click handler
//   // useEffect(() => {
//   //   const handleClickOutside = (event: MouseEvent) => {
//   //     if (
//   //       dropdownRef.current &&
//   //       !dropdownRef.current.contains(event.target as Node)
//   //     ) {
//   //       setOpen(false);
//   //     }
//   //   };

//     // document.addEventListener("mousedown", handleClickOutside);
//   //   return () => {
//   //     document.removeEventListener("mousedown", handleClickOutside);
//   //   };
//   // }, []);
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
//       <div className="bg-white w-full max-w-[500px] rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        
//         {/* Modal Header */}
//         <div className="flex justify-between items-center p-6 border-b border-gray-100">
//           <h2 className="text-lg font-semibold text-gray-800">Package Tracking - PKG-003</h2>
//           <button 
//             onClick={onClose}
//             className="p-1 hover:bg-gray-100 rounded-full transition-colors"
//           >
//             <X className="w-5 h-5 text-gray-500" />
//           </button>
//         </div>

//         <div className="p-6 max-h-[80vh] overflow-y-auto">
//           {/* Package Details Box */}
//           <div className="bg-[#F8FAFF] rounded-xl p-5 mb-8 border border-blue-50">
//             <h3 className="text-sm font-semibold text-gray-700 mb-4">Package Details</h3>
//             <div className="grid grid-cols-2 gap-y-4 text-sm">
//               <div>
//                 <p className="text-gray-500 mb-1">Description</p>
//                 <p className="font-medium text-gray-900">Temu - Electronics & Gadgets</p>
//               </div>
//               <div>
//                 <p className="text-gray-500 mb-1">Weight</p>
//                 <p className="font-medium text-gray-900">3.8 kg</p>
//               </div>
//               <div>
//                 <p className="text-gray-500 mb-1">Tracking Number</p>
//                 <p className="font-medium text-gray-900">1Z999AA10123456786</p>
//               </div>
//               <div>
//                 <p className="text-gray-500 mb-1">Cost</p>
//                 <p className="font-medium text-gray-900">€42.00</p>
//               </div>
//               <div>
//                 <p className="text-gray-500 mb-1">BL Number</p>
//                 <p className="text-blue-600 font-medium cursor-pointer">BL-2025-002</p>
//               </div>
//               <div>
//                 <p className="text-gray-500 mb-1">Carrier</p>
//                 <p className="font-medium text-gray-900">CMA CGM</p>
//               </div>
//             </div>
//           </div>

//           {/* Tracking History */}
//           <div>
//             <h3 className="text-sm font-semibold text-gray-700 mb-6">Tracking History</h3>
//             <div className="relative ml-3  max-h-[260px] overflow-y-auto custom-scrollbar">
//               {/* Vertical Line */}
//               <div className="absolute left-[11px] top-0 bottom-0 w-[2px] bg-blue-100" />
              
//               <div className="space-y-8">
//                 {trackingHistory.map((item, index) => (
//                   <div key={index} className="relative flex items-start gap-4">
//                     <div className="z-10 bg-white">
//                       {item.completed ? (
//                         <div className='bg-[#1C60DF] h-8 w-8 rounded-full flex items-center justify-center'>
//                         <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
//   <g clip-path="url(#clip0_1_12449)">
//     <path d="M18.1678 8.33357C18.5484 10.2013 18.2772 12.1431 17.3994 13.8351C16.5216 15.527 15.0902 16.8669 13.3441 17.6313C11.5979 18.3957 9.64252 18.5384 7.80391 18.0355C5.9653 17.5327 4.35465 16.4147 3.24056 14.8681C2.12646 13.3214 1.57626 11.4396 1.68171 9.53639C1.78717 7.63318 2.54189 5.82364 3.82004 4.40954C5.09818 2.99545 6.82248 2.06226 8.70538 1.76561C10.5883 1.46897 12.516 1.82679 14.167 2.7794" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
//     <path d="M7.5 9.16634L10 11.6663L18.3333 3.33301" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
//   </g>
//   <defs>
//     <clipPath id="clip0_1_12449">
//       <rect width="20" height="20" fill="white"/>
//     </clipPath>
//   </defs>
// </svg>
//                         <span></span>
//                         </div>
//                       ) : (
//                         <div className="w-8 h-8 rounded-full bg-[#DBEAFE] flex items-center justify-center">
//                           <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//   <g clip-path="url(#clip0_1_12461)">
//     <path d="M7.99967 14.6673C11.6816 14.6673 14.6663 11.6825 14.6663 8.00065C14.6663 4.31875 11.6816 1.33398 7.99967 1.33398C4.31778 1.33398 1.33301 4.31875 1.33301 8.00065C1.33301 11.6825 4.31778 14.6673 7.99967 14.6673Z" stroke="#155DFC" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
//   </g>
//   <defs>
//     <clipPath id="clip0_1_12461">
//       <rect width="16" height="16" fill="white"/>
//     </clipPath>
//   </defs>
// </svg>
//                         </div>
//                       )}
//                     </div>
//                     <div>
//                       <h4 className={`text-sm font-semibold ${item.completed ? 'text-gray-900' : 'text-gray-700'}`}>
//                         {item.status}
//                       </h4>
//                       <p className="text-xs text-gray-500 mt-1">{item.time}</p>
//                       <p className="text-xs text-gray-400 mt-0.5">{item.location}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PackageModal;