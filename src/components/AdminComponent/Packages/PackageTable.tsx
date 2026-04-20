import { useState } from "react";
import { DataTable } from "@/components/reuseable/TableData";
import { SquarePen } from "lucide-react";
import EditPackageModal from "./EditModal";
import { PackageResponse, useUpdatePackageMutation } from "@/redux/features/clients/packageApi";

/* ---------------- STATUS TYPES ---------------- */

type Status =
  | "Received"
  | "Weighed - Pending Quote"
  | "Quote Sent - Pending Payment"
  | "Payment Received"
  | "In Transit"
  | "Delivered";

/* ---------------- UI TYPE ---------------- */

interface PackageData {
  packageId: string;
  name: string;
  clientNumber: string;
  email: string;
  trackingNumber: string;
  blNumber: string;
  description: string;
  weight: string;
  shippingCost: string;
  carrier: string;
  destination: string;
  status: Status;
  internalNotes: string;
  _id?: string;
}

/* ---------------- PROPS TYPE (FIXED) ---------------- */

interface PackageTableProps {
  data: PackageResponse[];
  loading: boolean;
}

/* ---------------- BACKEND → UI MAP ---------------- */

 const backendStatusToUI: Record<string, Status> = {
  RECEIVED: "Received",
  UPCOMING: "Received",

  PENDING_QUOTE: "Weighed - Pending Quote",
  QUOTED: "Quote Sent - Pending Payment",

  PENDING_PAYMENT: "Payment Received",

  PROCESSING: "Payment Received",

  IN_TRANSIT: "In Transit",
  DELIVERED: "Delivered",
};

/* ---------------- MAPPER ---------------- */

const mapResponseToPackageData = (pkg: PackageResponse): PackageData => ({
  packageId: pkg.packageCode,
  name: pkg.clientId,
  clientNumber: pkg.clientId,
  email: "",
  trackingNumber: pkg.trackingNumber,
  blNumber: pkg.blNumber,
  description: pkg.description,
  weight: pkg.weightKg ? `${pkg.weightKg} kg` : "Pending",
  shippingCost: pkg.shippingCost ?? "0.00",
  carrier: pkg.carrier ?? "Pending",
  destination: pkg.destination,
  status: backendStatusToUI[pkg.status?.trim()] ?? "Received",
  internalNotes: pkg.internalNotes ?? "",
  _id: pkg.id,
});

/* ---------------- COMPONENT ---------------- */

const PackageTable = ({ data, loading }: PackageTableProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] =
    useState<PackageData | null>(null);

  const [updatePackage] = useUpdatePackageMutation();

  const packagesData: PackageData[] = (data ?? []).map(
    mapResponseToPackageData
  );

  /* ---------------- STATUS UI ---------------- */

  const statusStyles: Record<Status, string> = {
    Received: "bg-[#1068EB] text-white px-5",
    "Weighed - Pending Quote": "bg-[#EAB308] text-white px-3",
    "Quote Sent - Pending Payment": "bg-[#9333EA] text-white px-3",
    "Payment Received": "bg-[#0891B2] text-white px-3",
    "In Transit": "bg-[#EA580C] text-white px-5",
    Delivered: "bg-[#16A34A] text-white px-5",
  };

  const statusLabel: Record<Status, string> = {
    Received: "Received",
    "Weighed - Pending Quote": "Weighed - Pending",
    "Quote Sent - Pending Payment": "Quote Sent - Pending",
    "Payment Received": "Payment Received",
    "In Transit": "In Transit",
    Delivered: "Delivered",
  };

  /* ---------------- EDIT ---------------- */

  const handleEditPackage = (pkg: PackageData) => {
    setSelectedPackage(pkg);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPackage(null);
  };



const uiStatusToBackend: Record<string, string> = {
  "Received": "RECEIVED",
  "Weighed - Pending Quote": "PENDING_QUOTE",
  "Quote Sent - Pending Payment": "QUOTED",
  "Payment Received": "PENDING_PAYMENT",
  "In Transit": "IN_TRANSIT",
  "Delivered": "DELIVERED",
};


  const handleSavePackage = async (
    updatedPackage: PackageData & { _id?: string }
  ) => {
    const id = updatedPackage._id ?? updatedPackage.packageId;

    try {
      await updatePackage({
        id,
        body: {
          packageCode: updatedPackage.packageId,
          trackingNumber: updatedPackage.trackingNumber,
          blNumber: updatedPackage.blNumber,
          description: updatedPackage.description,
          weightKg: updatedPackage.weight.replace(" kg", ""),
          shippingCost: updatedPackage.shippingCost,
          carrier: updatedPackage.carrier,
          destination: updatedPackage.destination,
          status: uiStatusToBackend[updatedPackage.status] ?? "RECEIVED",
          internalNotes: updatedPackage.internalNotes,
        },
      }).unwrap();

      handleCloseModal();
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update package");
    }
  };

  /* ---------------- LOADING ---------------- */

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );

  /* ---------------- TABLE ---------------- */

  const packageColumns = [
    { header: "Package ID", key: "packageId" },
    {
      header: "Client",
      key: "name",
      render: (item: PackageData) => (
        <div className="flex flex-col">
          <span>{item.name}</span>
          <span className="text-sm text-gray-500">
            {item.clientNumber}
          </span>
        </div>
      ),
    },
    { header: "Description", key: "description" },
    { header: "Weight", key: "weight" },
    { header: "Destination", key: "destination" },
    {
      header: "Status",
      key: "status",
      render: (item: PackageData) => (
        <span
          className={`py-2 rounded-full text-xs font-semibold ${statusStyles[item.status]}`}
        >
          {statusLabel[item.status]}
        </span>
      ),
    },
    {
      header: "Action",
      key: "action",
      render: (item: PackageData) => (
        <button
          onClick={() => handleEditPackage(item)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <SquarePen className="w-4 h-4" />
          Edit
        </button>
      ),
    },
  ];

  return (
    <>
      <div className="mt-6">
        <DataTable
          columns={packageColumns}
          data={packagesData}
          itemsPerPage={5}
        />
      </div>

 <EditPackageModal
  isOpen={isModalOpen}
  onClose={handleCloseModal}
  packageData={selectedPackage}
  onSave={handleSavePackage}
/>
    </>
  );
};

export default PackageTable;




// import { useState } from "react";
// import { DataTable } from "@/components/reuseable/TableData";
// import { SquarePen } from "lucide-react";
// import EditPackageModal from "./EditModal";
// import { PackageResponse, useGetPackagesQuery, useUpdatePackageMutation } from "@/redux/features/clients/packageApi";


// type Status =
//   | "Received"
//   | "Weighed - Pending Quote"
//   | "Quote Sent - Pending Payment"
//   | "Payment Received"
//   | "In Transit"
//   | "Delivered";

// interface PackageData {
//   packageId: string;
//   name: string;
//   clientNumber: string;
//   email: string;
//   trackingNumber: string;
//   blNumber: string;
//   description: string;
//   weight: string;
//   shippingCost: string;
//   carrier: string;
//   destination: string;
//   status: Status;
//   internalNotes: string;
// }

// // Map backend enum → UI Status label
// const backendStatusToUI: Record<string, Status> = {
//   RECEIVED: "Received",
//   PENDING_QUOTE: "Weighed - Pending Quote",
//   QUOTED: "Quote Sent - Pending Payment",
//   PENDING_PAYMENT: "Payment Received",
//   IN_TRANSIT: "In Transit",
//   DELIVERED: "Delivered",
//   UPCOMING: "Received",
//   PROCESSING: "In Transit",
// };

// // Map backend PackageResponse → UI PackageData
// const mapResponseToPackageData = (pkg: PackageResponse): PackageData => ({
//   packageId: pkg.packageCode,
//   name: pkg.clientId, // will be replaced once client info is available on response
//   clientNumber: pkg.clientId,
//   email: "",
//   trackingNumber: pkg.trackingNumber,
//   blNumber: pkg.blNumber,
//   description: pkg.description,
//   weight: pkg.weightKg ? `${pkg.weightKg} kg` : "Pending",
//   shippingCost: pkg.shippingCost ?? "0.00",
//   carrier: pkg.carrier ?? "Pending",
//   destination: pkg.destination,
//   status: backendStatusToUI[pkg.status] ?? "Received",
//   internalNotes: pkg.internalNotes ?? "",
//   // store the real DB id for PATCH calls
//   _id: pkg.id,
// } as PackageData & { _id: string });

// // interface PackageTableProps {
// //   searchTerm: string;
// //   statusFilter: string;
// // }


// const PackageTable = () => {

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedPackage, setSelectedPackage] = useState<PackageData | null>(null);
//   const [page, ] = useState(1);

//   const uiStatusToBackend: Record<string, string> = {
//     "All Statuses": "",
//     "In Transit": "IN_TRANSIT",
//     "Pending Payment": "PENDING_PAYMENT",
//     "Delivered": "DELIVERED",
//     "Processing": "PROCESSING",
//   };


//   const { data, isLoading, isError } = useGetPackagesQuery({ page, limit: 20 ,
//     //    search: searchTerm,        
//     // status: uiStatusToBackend[statusFilter] ?? "", 
//   });
//   console.log(data)

//   const [updatePackage] = useUpdatePackageMutation();

//   const packagesData: PackageData[] = (data?.data ?? []).map(mapResponseToPackageData);
//   console.log(packagesData)

//   // Status → Tailwind classes (same colours as original UI)
//   const statusStyles: Record<Status, string> = {
//     Received: "bg-[#1068EB] text-white px-5",
//     "Weighed - Pending Quote": "bg-[#EAB308] text-white px-3",
//     "Quote Sent - Pending Payment": "bg-[#9333EA] text-white px-3",
//     "Payment Received": "bg-[#0891B2] text-white px-3",
//     "In Transit": "bg-[#EA580C] text-white px-5",
//     Delivered: "bg-[#16A34A] text-white px-5",
//   };

//   const statusLabel: Record<Status, string> = {
//     Received: "Received",
//     "Weighed - Pending Quote": "Weighed - Pending",
//     "Quote Sent - Pending Payment": "Quote Sent - Pending",
//     "Payment Received": "Payment Received",
//     "In Transit": "In Transit",
//     Delivered: "Delivered",
//   };

//   const handleEditPackage = (pkg: PackageData) => {
//     setSelectedPackage(pkg);
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setSelectedPackage(null);
//   };

//   // Map UI Status → backend enum
 

//   const handleSavePackage = async (updatedPackage: PackageData & { _id?: string }) => {
//     const id = updatedPackage._id ?? updatedPackage.packageId;

//     try {
//       await updatePackage({
//         id,
//         body: {
//           packageCode: updatedPackage.packageId,
//           trackingNumber: updatedPackage.trackingNumber,
//           blNumber: updatedPackage.blNumber,
//           description: updatedPackage.description,
//           weightKg: updatedPackage.weight.replace(" kg", ""),
//           shippingCost: updatedPackage.shippingCost,
//           carrier: updatedPackage.carrier,
//           destination: updatedPackage.destination,
//           status: uiStatusToBackend[updatedPackage.status],
//           internalNotes: updatedPackage.internalNotes,
//         },
//       }).unwrap();

//       handleCloseModal();
//     } catch (error) {
//       console.error("Error updating package:", error);
//       alert("Failed to update package. Please try again.");
//     }
//   };

//   const packageColumns = [
//     {
//       header: "Package ID",
//       key: "packageId",
//       className: "font-normal text-gray-500",
//     },
//     {
//       header: "Client",
//       key: "name",
//       render: (item: PackageData) => (
//         <div className="flex flex-col">
//           <span className="text-gray-500 font-normal">{item.name}</span>
//           <span className="text-sm md:text-base text-gray-500">{item.clientNumber}</span>
//         </div>
//       ),
//     },
//     {
//       header: "Description",
//       key: "description",
//       className: "text-gray-500 max-w-[200px]",
//     },
//     {
//       header: "Weight",
//       key: "weight",
//       render: (item: PackageData) =>
//         item.weight === "Pending" ? (
//           <span className="bg-[#FEF9C3] text-[#A16207] px-4 py-1.5 rounded-full font-normal text-sm md:text-base">
//             Pending
//           </span>
//         ) : (
//           <span className="text-gray-600 font-normal">{item.weight}</span>
//         ),
//     },
//     {
//       header: "Destination",
//       key: "destination",
//       className: "text-gray-600",
//     },
//     {
//       header: "Status",
//       key: "status",
//       render: (item: PackageData) => (
//         <span
//           className={`py-2 rounded-full text-xs font-semibold leading-none inline-block text-center whitespace-nowrap ${statusStyles[item.status]}`}
//         >
//           {statusLabel[item.status]}
//         </span>
//       ),
//     },
//     {
//       header: "Action",
//       key: "action",
//       render: (item: PackageData) => (
//         <button
//           onClick={() => handleEditPackage(item)}
//           className="bg-[#1C60DF] text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-all flex items-center gap-2 text-sm font-semibold"
//         >
//           <SquarePen className="w-4 h-4" />
//           Edit
//         </button>
//       ),
//     },
//   ];

//    if (isLoading)
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//       </div>
//     );

//   if (isError) {
//     return (
//       <div className="mt-8 flex items-center justify-center py-16 text-red-500 text-sm">
//         Failed to load packages. Please refresh and try again.
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="mt-8">
//         <DataTable columns={packageColumns} data={packagesData} itemsPerPage={5} />
//       </div>

//       <EditPackageModal
//         isOpen={isModalOpen}
//         onClose={handleCloseModal}
//         packageData={selectedPackage}
//         onSave={handleSavePackage}
//       />
//     </>
//   );
// };

// export default PackageTable;






// import { useState } from "react";
// import { DataTable } from "@/components/reuseable/TableData";
// import { SquarePen } from "lucide-react";
// import EditPackageModal from "./EditModal";

// type Status =
//    | "Received"
//   | "Weighed - Pending Quote"
//   | "Quote Sent - Pending Payment"
//   | "Payment Received"
//   | "In Transit"
//   | "Delivered";

// interface PackageData {
//   packageId: string;
//   name: string;
//   clientNumber: string;
//   email: string;
//   trackingNumber: string;
//   blNumber: string;
//   description: string;
//   weight: string;
//   shippingCost: string;
//   carrier: string;
//   destination: string;
//   status: Status;
//   internalNotes: string;
// }


// const PackageTable = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedPackage, setSelectedPackage] = useState<PackageData | null>(null);

//   // State for packages - ekhon data update hobe
//   const [packagesData, setPackagesData] = useState<PackageData[]>([
//     {
//       packageId: "PKG-847",
//       name: "Jean Dupont",
//       clientNumber: "KYL-2025-123456",
//       email: "jean.dupont@email.com",
//       trackingNumber: "1Z999AA10123456790",
//       blNumber: "",
//       description: "Amazon Order - Electronics",
//       weight: "Pending",
//       shippingCost: "0.00",
//       carrier: "Pending",
//       destination: "Guadeloupe",
//       status: "Received",
//       internalNotes: ""
//     },
//     {
//       packageId: "PKG-848",
//       name: "Jean Dupont",
//       clientNumber: "KYL-2025-123456",
//       email: "jean.dupont@email.com",
//       trackingNumber: "1Z999AA10123456791",
//       blNumber: "BL-2025-001",
//       description: "Amazon Order - Electronics",
//       weight: "2.3 kg",
//       shippingCost: "35.00",
//       carrier: "DHL",
//       destination: "Guadeloupe",
//       status: "Weighed - Pending Quote",
//       internalNotes: "Customer requested expedited shipping"
//     },
//     {
//       packageId: "PKG-849",
//       name: "Jean Dupont",
//       clientNumber: "KYL-2025-123456",
//       email: "jean.dupont@email.com",
//       trackingNumber: "1Z999AA10123456792",
//       blNumber: "BL-2025-002",
//       description: "Amazon Order - Electronics",
//       weight: "2.3 kg",
//       shippingCost: "35.00",
//       carrier: "FedEx",
//       destination: "Guadeloupe",
//       status: "Quote Sent - Pending Payment",
//       internalNotes: ""
//     },
//     {
//       packageId: "PKG-850",
//       name: "Jean Dupont",
//       clientNumber: "KYL-2025-123456",
//       email: "jean.dupont@email.com",
//       trackingNumber: "1Z999AA10123456793",
//       blNumber: "BL-2025-003",
//       description: "Amazon Order - Electronics",
//       weight: "2.3 kg",
//       shippingCost: "35.00",
//       carrier: "UPS",
//       destination: "Guadeloupe",
//       status: "In Transit",
//       internalNotes: "Package cleared customs"
//     }
//   ]);

//   // Status styles
//   const statusStyles: Record<Status, string> = {
//     Received: "bg-[#1068EB] text-white px-5",
//     "Weighed - Pending Quote": "bg-[#EAB308] text-white px-3",
//     "Quote Sent - Pending Payment": "bg-[#9333EA] text-white px-3",
//     "In Transit": "bg-[#EA580C] text-white px-5",
//     "Delivered": "bg-[#16A34A] text-white px-5",
//     "Payment Received": "bg-[#0891B2] text-white px-3"
//   };

//   // Handle edit button click
//   const handleEditPackage = (pkg: PackageData) => {
//     setSelectedPackage(pkg);
//     setIsModalOpen(true);
//   };

//   // Handle modal close
//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setSelectedPackage(null);
//   };

//   // Handle save changes - EKHON ACTUALLY UPDATE HOBE
//   const handleSavePackage = async (updatedPackage: PackageData) => {
//     try {
    
//       // const response = await fetch(`/api/packages/${updatedPackage.packageId}`, {
//       //   method: 'PUT',
//       //   headers: { 'Content-Type': 'application/json' },
//       //   body: JSON.stringify(updatedPackage)
//       // });
//       // 
//       // if (!response.ok) throw new Error('Failed to update package');

//       // Simulate API delay
//       await new Promise(resolve => setTimeout(resolve, 500));

//       // Update local state - table e change dekhabe
//       setPackagesData(prevPackages => 
//         prevPackages.map(pkg => 
//           pkg.packageId === updatedPackage.packageId ? updatedPackage : pkg
//         )
//       );

//       console.log('Package updated successfully:', updatedPackage);
      
//       // Optional: Success notification
//       alert(`Package ${updatedPackage.packageId} updated successfully!`);

//     } catch (error) {
//       console.error('Error updating package:', error);
//       alert('Failed to update package. Please try again.');
//     }
//   };

//   const packageColumns = [
//     {
//       header: "Package ID",
//       key: "packageId",
//       className: "font-normal text-gray-500",
//     },
//     {
//       header: "Client",
//       key: "name",
//       render: (item: PackageData) => (
//         <div className="flex flex-col">
//           <span className="text-gray-500 font-normal">{item.name}</span>
//           <span className="text-sm md:text-base text-gray-500">{item.clientNumber}</span>
//         </div>
//       ),
//     },
//     {
//       header: "Description",
//       key: "description",
//       className: "text-gray-500 max-w-[200px]",
//     },
//     {
//       header: "Weight",
//       key: "weight",
//       render: (item: PackageData) => (
//         item.weight === "Pending" ? (
//           <span className="bg-[#FEF9C3] text-[#A16207] px-4 py-1.5 rounded-full font-normal text-sm md:text-base">
//             Pending
//           </span>
//         ) : (
//           <span className="text-gray-600 font-normal">{item.weight}</span>
//         )
//       ),
//     },
//     {
//       header: "Destination",
//       key: "destination",
//       className: "text-gray-600",
//     },
//     {
//       header: "Status",
//       key: "status",
//       render: (item: PackageData) => (
//         <span
//           className={`py-2 rounded-full text-xs font-semibold leading-none inline-block text-center whitespace-nowrap ${statusStyles[item.status]}`}
//         >
//           {item.status === "Received" ? "Receive" : 
//            item.status === "Weighed - Pending Quote" ? "Weighed - Pending" : 
//            item.status === "Quote Sent - Pending Payment" ? "Quote Sent - Pending" : 
//            item.status === "In Transit" ? "In Transit" :
//            item.status === "Delivered" ? "Delivered" : "Payment Received"}
//         </span>
//       ),
//     },
//     {
//       header: "Action",
//       key: "action",
//       render: (item: PackageData) => (
//         <button
//           onClick={() => handleEditPackage(item)}
//           className="bg-[#1C60DF] text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-all flex items-center gap-2 text-sm font-semibold"
//         >
//           <SquarePen className="w-4 h-4" />
//           Edit
//         </button>
//       ),
//     },
//   ];

//   return (
//     <>
//       <div className="mt-8">
//         <DataTable columns={packageColumns} data={packagesData} itemsPerPage={5} />
//       </div>

//       {/* Edit Package Modal */}
//       <EditPackageModal
//         isOpen={isModalOpen}
//         onClose={handleCloseModal}
//         packageData={selectedPackage}
//         onSave={handleSavePackage}
//       />
//     </>
//   );
// };

// export default PackageTable;