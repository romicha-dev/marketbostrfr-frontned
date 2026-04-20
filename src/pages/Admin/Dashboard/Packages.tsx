import AddPackageModal from "@/components/AdminComponent/Packages/AddPackageModal";
import PackageCard from "@/components/AdminComponent/Packages/PackageCard";
import PackageTable from "@/components/AdminComponent/Packages/PackageTable";
import AdminTitleHeader from "@/components/reuseable/AdminTitleHeader";
import { useGetPackagesQuery } from "@/redux/features/clients/packageApi";
import { PackageData } from "@/type/type";
import { ChevronDown, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// ─── Status options (backend values) ──────────────────────────────────────────
const STATUS_OPTIONS = [
  { label: "All Statuses", value: "" },
  { label: "Received",         value: "RECEIVED" },
  { label: "Upcoming",         value: "UPCOMING" },
  { label: "Pending Quote",    value: "PENDING_QUOTE" },
  { label: "Quoted",           value: "QUOTED" },
  { label: "Pending Payment",  value: "PENDING_PAYMENT" },
  { label: "Processing",       value: "PROCESSING" },
  { label: "In Transit",       value: "IN_TRANSIT" },
  { label: "Delivered",        value: "DELIVERED" },
];

const Packages = () => {
  /* ---------------- SEARCH ---------------- */
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  /* ---------------- STATUS FILTER ---------------- */
  const [statusFilter, setStatusFilter] = useState("");

  /* ---------------- MODAL ---------------- */
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<PackageData | null>(null);

  /* ---------------- DROPDOWN ---------------- */
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  /* ---------------- DEBOUNCE SEARCH ---------------- */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  /* ---------------- OUTSIDE CLICK ---------------- */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowStatusDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ---------------- CURRENT LABEL ---------------- */
  const currentLabel =
    STATUS_OPTIONS.find((s) => s.value === statusFilter)?.label ?? "All Statuses";

  /* ---------------- API CALL ---------------- */
  const { data, isLoading } = useGetPackagesQuery({
    page: 1,
    limit: 20,
    search: debouncedSearch || undefined,
    status: statusFilter || undefined,   // directly send backend value
  });

  return (
    <div>
      {/* HEADER */}
      <div className="flex flex-col md:flex-row items-center justify-between">
        <AdminTitleHeader
          title="Package Management"
          description="Manage all packages and shipments"
        />
      </div>

      {/* MODAL */}
      <AddPackageModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedPackage(null);
        }}
        packageData={selectedPackage}
        onSave={(data) => {
          console.log("New package:", data);
          setIsModalOpen(false);
        }}
      />

      {/* SEARCH + FILTER */}
      <div
        ref={dropdownRef}
        className="w-full flex flex-col md:flex-row gap-4 mb-6 mt-4"
      >
        {/* SEARCH */}
        <div className="relative w-full md:w-2/3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by ID, tracking number, or description..."
            className="w-full pl-10 pr-4 py-3 bg-blue-50 border border-blue-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
          />
        </div>

        {/* STATUS FILTER */}
        <div className="relative w-full md:w-1/3">
          <div
            onClick={() => setShowStatusDropdown((prev) => !prev)}
            className="cursor-pointer w-full px-4 py-3 bg-blue-50 border border-blue-100 rounded-full flex justify-between items-center text-gray-700"
          >
            <span>{currentLabel}</span>
            <ChevronDown className="w-5 h-5 text-gray-400" />
          </div>

          {showStatusDropdown && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
              {STATUS_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setStatusFilter(option.value);
                    setShowStatusDropdown(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 hover:bg-blue-50 text-gray-700 transition text-sm ${
                    statusFilter === option.value ? "bg-blue-50 font-medium text-blue-600" : ""
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* CARD */}
      <PackageCard />

      {/* TABLE */}
      <PackageTable data={data?.data || []} loading={isLoading} />
    </div>
  );
};

export default Packages;



// import AddPackageModal from "@/components/AdminComponent/Packages/AddPackageModal"
// import PackageCard from "@/components/AdminComponent/Packages/PackageCard"
// import PackageTable from "@/components/AdminComponent/Packages/PackageTable"
// import AdminTitleHeader from "@/components/reuseable/AdminTitleHeader"
// import { PackageData } from "@/type/type"
// import { ChevronDown, Search } from "lucide-react"
// import { useEffect, useRef, useState } from "react"


// const Packages = () => {
//     const [searchTerm, setSearchTerm] = useState('');
//     const [statusFilter, setStatusFilter] = useState('All Statuses');
//     const statuses = ['All Statuses', 'In Transit', 'Pending Payment', 'Delivered', 'Processing'];
// const [isModalOpen, setIsModalOpen] = useState(false);
// const [selectedPackage, ] = useState<PackageData | null>(null);



   
//     const [showStatusDropdown, setShowStatusDropdown] = useState(false);
//      const dropdownRef = useRef<HTMLDivElement | null>(null);

     

//        useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node)
//       ) {
//         setShowStatusDropdown(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <div>
//       <div>
//             <div className="flex flex-col md:flex-row items-center justify-between">
//               <AdminTitleHeader  title="Package Management"
//            description="Manage all packages and shipments" />

//           {/* <button
//   onClick={() => {
//     setSelectedPackage({
//       packageId: "",
//       name: "",
//       clientNumber: "",
//       email: "",
//       trackingNumber: "",
//       blNumber: "",
//       description: "",
//       weight: "",
//       shippingCost: "",
//       carrier: "",
//       destination: "",
//       status: "Received",
//       internalNotes: ""
//     });
//     setIsModalOpen(true);
//   }}
//   className="bg-[#1C60DF] w-full md:w-auto text-white p-3 rounded-xl cursor-pointer text-sm md:text-base font-inter mb-4"
// >
//   + Add Package
// </button> */}
// </div>

// <AddPackageModal
//   isOpen={isModalOpen}
//   onClose={() => setIsModalOpen(false)}
//   packageData={selectedPackage}
//   onSave={(data) => {
//     console.log("New package data:", data);
    
//     setIsModalOpen(false);
//   }}
// />



//            <div>
//       {/* Search and Filter Bar */}
//         <div ref={dropdownRef} className="w-full flex flex-col md:flex-row gap-4 mb-6">
//           <div className="relative  w-full md:w-2/3">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//             <input
//               type="text"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               placeholder="Search by ID, tracking number, or description..."
//               className="w-full pl-10 pr-4 py-3 bg-blue-50 border border-blue-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
//             />
//           </div>

//           <div  ref={dropdownRef} className="relative w-full md:w-1/3  ">
//             <div
//               onClick={() => setShowStatusDropdown(!showStatusDropdown)}
//               className="cursor-pointer w-full px-4 py-3 bg-blue-50 border border-blue-100 rounded-full flex justify-between items-center text-gray-700"
//             >
//               <span>{statusFilter}</span>
//               <ChevronDown className="w-5 h-5 text-gray-400" />
//             </div>
//             {showStatusDropdown && (
//               <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
//                 {statuses.map((status) => (
//                   <button
//                     key={status}
//                     onClick={() => {
//                       setStatusFilter(status);
//                       setShowStatusDropdown(false);
//                     }}
//                     className="w-full text-left px-4 py-2 hover:bg-blue-50 text-gray-700 transition-colors first:rounded-t-lg last:rounded-b-lg"
//                   >
//                     {status}
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//   </div>

//      <div>
//       <PackageCard/>
//       <PackageTable />
//      </div>
//       </div>
//     </div>
//   )
// }

// export default Packages
