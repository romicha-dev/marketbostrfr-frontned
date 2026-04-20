import { Calculator } from "lucide-react";
import { useState } from "react";
import CreateQuoteModal from "./CreateQuiteModal";
import { useGetPackagesQuery } from "@/redux/features/clients/packageApi";


const PackageAwaitng = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<any>(null);


  const { data, isLoading, isError } = useGetPackagesQuery({
    page: 1,
    limit: 20,
    status: "PENDING_QUOTE", 
  });

  const packages = data?.data || [];

  const handleOpenModal = (pkg: any) => {
    setSelectedPackage(pkg);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPackage(null);
  };

 if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (isError) {
    return (
      <div className="text-center py-10 text-red-500">
        Failed to load packages 
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold font-roboto text-[#0A0A0A]">
          Packages Awaiting Quotes
        </h2>

        <span className="bg-[#FFF7ED] text-[#F54900] px-3 py-1 rounded-full text-sm border border-[#FFEDD5]">
          {data?.meta?.total || 0} Pending
        </span>
      </div>

      {/* LIST */}
      <div className="space-y-4">
        {packages.length === 0 ? (
          <p className="text-gray-500 text-center py-6">
            No pending quote packages found
          </p>
        ) : (
          packages.map((pkg: any) => (
            <div
              key={pkg.id}
              className="bg-white border border-blue-100 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center hover:shadow-lg transition-all"
            >
              {/* LEFT SIDE */}
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-lg font-semibold text-[#101828]">
                    {pkg.packageCode}
                  </span>

                  <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs uppercase">
                    Needs Quote
                  </span>
                </div>

                <p className="text-sm text-gray-500">
                  {pkg.description || "No description"}
                </p>

                <div className="flex flex-wrap gap-6 text-sm text-gray-600 pt-2">
                  <span>
                    Client: {pkg.clientName || "N/A"}
                  </span>
                  <span>
                    Weight: {pkg.weightKg} kg
                  </span>
                  <span>
                    Destination: {pkg.destination}
                  </span>
                </div>
              </div>

              {/* BUTTON */}
              <button
                onClick={() => handleOpenModal(pkg)}
                className="mt-5 md:mt-0 bg-[#1C60DF] text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-700 transition"
              >
                <Calculator className="w-5 h-5" />
                Create Quote
              </button>
            </div>
          ))
        )}
      </div>

      {/* MODAL */}
      <CreateQuoteModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        packageData={selectedPackage}
      />
    </div>
  );
};

export default PackageAwaitng;








// import { Calculator } from 'lucide-react';
// import { useState } from 'react';
// import CreateQuoteModal from './CreateQuiteModal';


// interface PackageQuote {
//   packageId: string;
//   name: string;
//   clientNumber: string;
//   email: string;
//   weight: string;
//   description: string;
//   destination: string;
// }

// const PackageAwaitng = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedPackage, setSelectedPackage] = useState<PackageQuote | null>(null);

//   const awaitingPackages: PackageQuote[] = [
//     {
//       packageId: "PKG-847",
//       name: "Jean Dupont",
//       clientNumber: "1234567890",
//       email: "jean@example.com",
//       weight: "2.8 kg",
//       description: "Amazon Electronics",
//       destination: "Martinique"
//     },
//     {
//       packageId: "PKG-848",
//       name: "Alice Martin",
//       clientNumber: "0987654321",
//       email: "alice@example.com",
//       weight: "3.2 kg",
//       description: "Books",
//       destination: "Guadeloupe"
//     },
//     {
//       packageId: "PKG-849",
//       name: "Pierre Durand",
//       clientNumber: "1122334455",
//       email: "pierre@example.com",
//       weight: "1.5 kg",
//       description: "Clothes",
//       destination: "Guadeloupe"
//     },
//   ];

//   const handleOpenModal = (pkg: PackageQuote) => {
//     setSelectedPackage(pkg);
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setSelectedPackage(null);
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h2 className="text-lg sm:text-xl md:text-2xl font-semibold font-roboto leading-[150%] text-[#0A0A0A]">
//           Packages Awaiting Quotes
//         </h2>
//         <span className="bg-[#FFF7ED] text-[#F54900] px-3 py-1 rounded-full text-sm md:text-base font-normal leading-[150%] border border-[#FFEDD5]">
//           {awaitingPackages.length} Pending
//         </span>
//       </div>

//       <div className="space-y-4">
//         {awaitingPackages.map((pkg, index) => (
//           <div
//             key={index}
//             className="bg-white border border-blue-100 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center hover:shadow-lg hover:shadow-blue-50 transition-all group"
//           >
//             <div className="flex-1 space-y-4">
//               <div className="flex items-center gap-3">
//                 <span className="text-base sm:text-lg md:text-xl font-normal font-roboto text-[#101828] leading-[150%]">{pkg.packageId}</span>
//                 <span className="bg-[#FFF7ED] text-[#F54900] px-3 py-1 rounded-full text-sm md:text-base uppercase font-normal font-roboto leading-[150%] tracking-wider mb-2">
//                   Needs Quote
//                 </span>
//               </div>
//               <p className="text-sm md:text-base text-[#4A5565] font-normal font-roboto leading-[150%]">{pkg.description}</p>
//               <div className="flex flex-wrap gap-8 pt-2">
//                 <InfoColumn label="Client" value={pkg.name} />
//                 <InfoColumn label="Weight" value={pkg.weight} />
//                 <InfoColumn label="Destination" value={pkg.destination} />
//               </div>
//             </div>

//             <button
//               onClick={() => handleOpenModal(pkg)}
//               className="mt-6 md:mt-0 bg-[#1C60DF] text-white px-4.5 py-2.5 rounded-[4px] font-normal font-inter flex items-center gap-2 hover:bg-blue-700 transition-all active:scale-[0.98] shadow-lg shadow-blue-100"
//             >
//               <Calculator className="w-5 h-5" />
//               Create Quote
//             </button>
//           </div>
//         ))}
//       </div>

//       <CreateQuoteModal
//         isOpen={isModalOpen}
//         onClose={handleCloseModal}
//         packageData={selectedPackage}
//       />
//     </div>
//   );
// };

// const InfoColumn = ({ label, value }: { label: string; value: string }) => (
//   <div className="flex flex-col gap-1">
//     <span className="text-sm md:text-base text-[#6A7282] font-normal font-roboto leading-[150%] tracking-wider">{label}</span>
//     <span className="text-sm md:text-base font-normal font-roboto leading-[150%] text-[#101828]">{value}</span>
//   </div>
// );

// export default PackageAwaitng;
