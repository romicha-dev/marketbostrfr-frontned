import React, { useEffect, useRef, useState } from 'react';
import { Search, CreditCard, ChevronDown, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import PackageModal from './PackageTracking';
import CompeletePayment from '../Payment/CompeletePayment';
import { useNavigate } from 'react-router-dom';
import { useGetPackagesQuery } from '@/redux/features/clients/packageApi';


const STATUS_OPTIONS = [
  { label: 'All Statuses',    value: '' },
  { label: 'Received',        value: 'RECEIVED' },
  { label: 'Upcoming',        value: 'UPCOMING' },
  { label: 'Pending Quote',   value: 'PENDING_QUOTE' },
  { label: 'Quoted',          value: 'QUOTED' },
  { label: 'Pending Payment', value: 'PENDING_PAYMENT' },
  { label: 'Processing',      value: 'PROCESSING' },
  { label: 'In Transit',      value: 'IN_TRANSIT' },
  { label: 'Delivered',       value: 'DELIVERED' },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'PENDING_QUOTE':   return 'bg-[#FEF9C3] text-[#854D0E]';
    case 'QUOTED':          return 'bg-[#DBEAFE] text-[#1D4ED8]';
    case 'RECEIVED':        return 'bg-[#F3E8FF] text-[#7E22CE]';
    case 'UPCOMING':        return 'bg-[#E0F2FE] text-[#0369A1]';
    case 'PROCESSING':      return 'bg-[#FEF3C7] text-[#B45309]';
    case 'PENDING_PAYMENT': return 'bg-[#FAD0D0] text-[#BF0C0F]';
    case 'IN_TRANSIT':      return 'bg-[#D0E4FA] text-[#432DD7]';
    case 'DELIVERED':       return 'bg-[#D0FAE5] text-[#007A55]';
    default:                return 'bg-gray-100 text-gray-600';
  }
};

const getStatusLabel = (value: string) =>
  STATUS_OPTIONS.find((s) => s.value === value)?.label ?? value;

const ITEMS_PER_PAGE = 4;



const MyPackagesPage: React.FC = () => {
  const [searchTerm, setSearchTerm]         = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [statusFilter, setStatusFilter]     = useState('');  
  const [currentPage, setCurrentPage]       = useState(1);
  const [isModalOpen, setIsModalOpen]       = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedPaymentPkg, setSelectedPaymentPkg] = useState<typeof packages[0] | null>(null);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
const [selectedPackageId, setSelectedPackageId] = useState<string | null>(null);
 
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchTerm), 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);


  useEffect(() => { setCurrentPage(1); }, [debouncedSearch, statusFilter]);


  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowStatusDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);


  const { data, isLoading, isError } = useGetPackagesQuery({
    page: currentPage,
    limit: ITEMS_PER_PAGE,
    search: debouncedSearch || undefined,
    status: statusFilter || undefined,
  });

  const packages = (data?.data ?? []).map((pkg) => ({
    id:            pkg.packageCode,
    status:        pkg.status,
    order:         `${pkg.ecommercePlatform || ''} - ${pkg.description}`,
    weight:        pkg.weightKg || 'Pending',
    destination:   pkg.destination,
    carrier:       pkg.carrier || '🚚 Pending',
    price:         `€ ${pkg.shippingCost || '0.00'}`,
    trackingNumber: pkg.trackingNumber,
    blNumber:      pkg.blNumber,
    date:          pkg.declaredAt?.split('T')[0],
    clientNumber:  pkg.clientId,
    rawPkg:        pkg,
  }));

  const totalPages = data?.meta?.totalPages ?? 1;

  // ─── Loading / Error ─────────────────────────────────────────────────────────
  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );

  if (isError)
    return <p className="text-center py-10 text-red-500">Failed to load packages</p>;

  return (
    <div className="min-h-screen">
      <main className="py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-base sm:text-lg md:text-xl font-arima font-semibold text-[#0A0A0A] mb-2">
            My Packages
          </h1>
          <p className="text-[#4A5565] text-sm sm:text-base">
            Track and manage all your shipments
          </p>
        </div>

        {/* Search + Filter + Button */}
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex flex-col sm:flex-row max-w-[928px] gap-4 mb-6 w-full">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by ID, tracking number, or description..."
                className="w-full pl-10 pr-4 py-3 bg-blue-50 border border-blue-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Status Dropdown */}
            <div ref={dropdownRef} className="relative w-full md:w-1/2">
              <div
                onClick={() => setShowStatusDropdown((p) => !p)}
                className="cursor-pointer w-full px-4 py-3 bg-blue-50 border border-blue-100 rounded-full flex justify-between items-center text-gray-700"
              >
                <span>{getStatusLabel(statusFilter)}</span>
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
                      className={`w-full text-left px-4 py-2.5 hover:bg-blue-50 text-gray-700 text-sm transition ${
                        statusFilter === option.value ? 'bg-blue-50 font-medium text-blue-600' : ''
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mb-4">
            <button
              onClick={() => navigate('/client/declare-packages')}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Declare Package
            </button>
          </div>
        </div>

        {/* Empty state */}
        {packages.length === 0 && (
          <div className="text-center py-16 text-[#4A5565]">
            <p className="text-lg font-roboto">No packages found.</p>
            {(debouncedSearch || statusFilter) && (
              <button
                onClick={() => { setSearchTerm(''); setStatusFilter(''); }}
                className="mt-3 text-sm text-blue-600 underline"
              >
                Clear filters
              </button>
            )}
          </div>
        )}

        {/* Package Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {packages.map((pkg, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-5 border-b border-gray-100">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-normal font-roboto text-sm sm:text-base text-[#101828]">
                      {pkg.id}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs sm:text-sm font-roboto font-normal ${getStatusBadge(pkg.status)}`}>
                      {getStatusLabel(pkg.status)}
                    </span>
                  </div>

                  <div className="flex flex-col md:flex-row items-center gap-2">
                    {pkg.status === 'PENDING_PAYMENT' && (
                      <button
                        onClick={() => {
                          setSelectedPaymentPkg(pkg);
                          setIsPaymentModalOpen(true);
                        }}
                        className="px-3 py-2.5 bg-[#00A63E] hover:bg-green-700 text-white rounded-lg text-sm font-medium flex items-center gap-1"
                      >
                        <CreditCard className="w-4 h-4" /> Pay
                      </button>
                    )}
                    <button
                        onClick={() => {
    setSelectedPackageId(pkg.rawPkg.id); 
    setIsModalOpen(true);
  }}
                      
                      className="px-3 py-2.5 bg-[#155DFC] hover:bg-blue-700 text-white rounded-lg text-sm font-medium flex items-center gap-1"
                    >
                      <Eye className="w-4 h-4" /> Track
                    </button>
                  </div>
                </div>

                <p className="text-[#4A5565] text-sm sm:text-base font-roboto leading-[150%] font-normal mb-3.5">
                  {pkg.order}
                </p>

                <div className="flex flex-col md:flex-row justify-between gap-x-4 gap-y-2 text-sm font-normal leading-[142%] text-[#4A5565]">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-3.5">
                    <span>{pkg.weight}</span>
                    <span>🚩 Destination: {pkg.destination}</span>
                    <span>{pkg.carrier}</span>
                  </div>
                  <div className="flex justify-end">
                    <span className="text-2xl font-bold text-[#00A63E]">{pkg.price}</span>
                  </div>
                </div>
              </div>

              <div className="p-5 md:pr-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-[#6A7282] mb-1">Tracking Number</p>
                  <p className="text-[#101828]">{pkg.trackingNumber}</p>
                </div>
                <div>
                  <p className="text-[#6A7282] mb-1">BL Number</p>
                  <p className="text-[#101828]">{pkg.blNumber}</p>
                </div>
                <div>
                  <p className="text-[#6A7282] mb-1">Date</p>
                  <p className="text-[#101828]">{pkg.date ?? '—'}</p>
                </div>
                <div>
                  <p className="text-[#6A7282] mb-1">Client Number</p>
                  <p className="text-[#155DFC]">{pkg.clientNumber}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              className={`text-sm font-medium flex items-center gap-1 ${
                currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-[#09090B]'
              }`}
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>

            {[...Array(totalPages)].map((_, i) => {
              const page = i + 1;
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    currentPage === page
                      ? 'bg-blue-600 text-white'
                      : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              );
            })}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              className={`text-sm font-medium flex items-center gap-1 ${
                currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-[#09090B]'
              }`}
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </main>

      <PackageModal
  isOpen={isModalOpen}
  onClose={() => {
    setIsModalOpen(false);
    setSelectedPackageId(null);
  }}
  packageId={selectedPackageId || ""}
/>

      {isPaymentModalOpen && selectedPaymentPkg && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setIsPaymentModalOpen(false)}
        >
          <CompeletePayment
            item={{ kind: 'package', data: selectedPaymentPkg.rawPkg }}
            closeModal={() => {
              setIsPaymentModalOpen(false);
              setSelectedPaymentPkg(null);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default MyPackagesPage;






// import React, { useEffect, useRef, useState } from 'react';
// import { Search, CreditCard, ChevronDown, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
// import PackageModal from './PackageTracking';
// import CompeletePayment from '../Payment/CompeletePayment';
// import { useNavigate } from 'react-router-dom';


// const MyPackagesPage: React.FC = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState('All Statuses');
//   const [isModalOpen, setIsModalOpen] = useState(false);
//     const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
//   const [showStatusDropdown, setShowStatusDropdown] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement | null>(null);
//   const navigate = useNavigate()

//   const statuses = ['All Statuses', 'In Transit', 'Pending Payment', 'Delivered', 'Processing'];


  


//   const initialPackages = [
//     {
//       id: 'PKG-001',
//       status: 'In Transit',
//       statusColor: 'yellow',
//       order: 'Amazon Order #123456 - Electronics',
//       weight: '2.5 kg',
//       destination: 'Guadeloupe',
//       carrier: '🚚 Air France Cargo',
//       price: '€ 45.00',
//       trackingNumber: '1Z999AA10123456784',
//       blNumber: 'BL-2025-001',
//       date: '2025-11-10',
//       clientNumber: 'KYL-2025-123456'
//     },
//     {
//       id: 'PKG-002',
//       status: 'Pending Payment',
//       statusColor: 'red',
//       order: 'Shein Order #654321 - Clothes',
//       weight: '1.2 kg',
//       destination: 'Guadeloupe',
//       carrier: '🚚 Air France Cargo',
//       price: '€ 25.00',
//       trackingNumber: '1Z999AA10123456785',
//       blNumber: 'BL-2025-002',
//       date: '2025-11-12',
//       clientNumber: 'KYL-2025-654321'
//     },
//     {
//       id: 'PKG-003',
//       status: 'Delivered',
//       statusColor: 'green',
//       order: 'eBay Order #789012 - Accessories',
//       weight: '0.8 kg',
//       destination: 'Guadeloupe',
//       carrier: '🚚 Air France Cargo',
//       price: '€ 15.00',
//       trackingNumber: '1Z999AA10123456786',
//       blNumber: 'BL-2025-003',
//       date: '2025-11-14',
//       clientNumber: 'KYL-2025-789012'
//     },
//     {
//       id: 'PKG-004',
//       status: 'In Transit',
//       statusColor: 'yellow',
//       order: 'AliExpress Order #345678 - Gadgets',
//       weight: '3 kg',
//       destination: 'Guadeloupe',
//       carrier: '🚚 Air France Cargo',
//       price: '€ 60.00',
//       trackingNumber: '1Z999AA10123456787',
//       blNumber: 'BL-2025-004',
//       date: '2025-11-15',
//       clientNumber: 'KYL-2025-345678'
//     },
//     {
//       id: 'PKG-005',
//       status: 'Processing',
//       statusColor: 'blue',
//       order: 'Temu Order #901234 - Shoes',
//       weight: '2 kg',
//       destination: 'Guadeloupe',
//       carrier: '🚚 Air France Cargo',
//       price: '€ 35.00',
//       trackingNumber: '1Z999AA10123456788',
//       blNumber: 'BL-2025-005',
//       date: '2025-11-16',
//       clientNumber: 'KYL-2025-901234'
//     },
//     {
//       id: 'PKG-006',
//       status: 'Delivered',
//       statusColor: 'green',
//       order: 'Amazon Order #112233 - Books',
//       weight: '1.5 kg',
//       destination: 'Guadeloupe',
//       carrier: '🚚 Air France Cargo',
//       price: '€ 20.00',
//       trackingNumber: '1Z999AA10123456789',
//       blNumber: 'BL-2025-006',
//       date: '2025-11-17',
//       clientNumber: 'KYL-2025-112233'
//     }
//   ];


//   const [packages] = useState(() => {
//     const saved = localStorage.getItem('myPackages');
//     const parsedSaved = saved ? JSON.parse(saved) : [];
//     return [...parsedSaved, ...initialPackages]; 
//   });


//   const filteredPackages = packages.filter(pkg => {
//     const matchesSearch = pkg.order.toLowerCase().includes(searchTerm.toLowerCase()) || 
//                           pkg.trackingNumber.includes(searchTerm) ||
//                           pkg.id.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesStatus = statusFilter === 'All Statuses' || pkg.status === statusFilter;
//     return matchesSearch && matchesStatus;
//   });

  
//   const ITEMS_PER_PAGE = 4;
//   const [currentPage, setCurrentPage] = useState(1);
//   const totalPages = Math.ceil(filteredPackages.length / ITEMS_PER_PAGE);
//   const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
//   const currentPackages = filteredPackages.slice(startIndex, startIndex + ITEMS_PER_PAGE);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setShowStatusDropdown(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <div className="min-h-screen">
//       <main className="py-8">
//         {/* Page Header */}
//         <div className="mb-8">
//           <h1 className="text-base sm:text-lg md:text-xl font-arima font-semibold text-[#0A0A0A] leading-[150%] mb-2">My Packages</h1>
//           <p className="text-[#4A5565] text-sm sm:text-base font-normal font-roboto leading-[150%]">Track and manage all your shipments</p>
//         </div>
        

//         {/* Search and Filter - EXACT ORIGINAL DESIGN */}
//     <div className='flex flex-col md:flex-row items-center justify-between'>
//           <div className="flex flex-col sm:flex-row max-w-[928px] gap-4 mb-6">
//           <div className="relative flex-1">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//             <input
//               type="text"
//               value={searchTerm}
//               onChange={(e) => {setSearchTerm(e.target.value); setCurrentPage(1);}}
//               placeholder="Search by ID, tracking number, or description..."
//               className="w-full pl-10 pr-4 py-3 bg-blue-50 border border-blue-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
//             />
//           </div>

//           <div ref={dropdownRef} className="relative w-full md:w-1/2">
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
//                       setCurrentPage(1);
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

//             <div className="mb-4">
//         <button
//           onClick={()=> navigate('/client/declare-packages')}
//           className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
//         >
//           Declare Package
//         </button>
//       </div>
//     </div>

//         {/* Packages Grid - EXACT ORIGINAL DESIGN */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//           {currentPackages.map((pkg, idx) => (
//             <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
//               <div className="p-5 border-b border-gray-100">
//                 <div className="flex justify-between items-start mb-3">
//                   <div className="flex items-center gap-3">
//                     <span className="font-normal font-roboto text-sm sm:text-base leading-[150%] text-[#101828]">{pkg.id}</span>
//                     <span className={`px-3 py-1 rounded-full text-xs sm:text-sm font-roboto font-normal ${
//                       pkg.statusColor === 'yellow' ? 'bg-[#FEFCE8] text-[#D08700]' :
//                       pkg.statusColor === 'red' ? 'bg-[#FFF7ED] text-[#F54900]' :
//                       pkg.statusColor === 'blue' ? 'bg-[#EFF6FF] text-[#1D4ED8]' : 
//                       'bg-[#F0FDF4] text-[#00A63E]'
//                     }`}>
//                       {pkg.status}
//                     </span>
//                   </div>
//                   <div className="flex flex-col md:flex-row items-center gap-2">
//                     {pkg.status === 'Pending Payment' && (
//                       <button   onClick={() => setIsPaymentModalOpen(true)} className="px-3 py-2.5 bg-[#00A63E] hover:bg-green-700 text-white rounded-lg text-sm sm:text-base leading-[120%] cursor-pointer font-medium flex items-center gap-1">
//                         <CreditCard className="w-4 h-4" /> Pay
//                       </button>
//                     )}
//                     <button onClick={() => setIsModalOpen(true)} className="px-3 py-2.5 bg-[#155DFC] hover:bg-blue-700 text-white rounded-lg text-sm sm:text-base leading-[120%] cursor-pointer font-medium flex items-center gap-1">
//                       <Eye className="w-4 h-4" /> Track
//                     </button>
//                   </div>
//                 </div>
//                 <p className="text-[#4A5565] text-sm sm:text-base font-roboto leading-[150%] font-normal mb-3.5">{pkg.order}</p>
//                 <div className="flex flex-col md:flex-row justify-between gap-x-4 gap-y-2 text-sm font-normal leading-[142%] text-[#4A5565]">
//                   <div className='flex flex-col md:flex-row items-start md:items-center gap-3.5'>
//                     <span className="flex items-center text-[#4A5565] gap-1">{pkg.weight}</span>
//                     <span className="flex items-center gap-1">🚩Destination: {pkg.destination}</span>
//                     <span className="flex items-center text-base gap-1">{pkg.carrier}</span>
//                   </div>
//                   <div className="flex justify-end">
//                     <span className="text-2xl font-bold text-[#00A63E]">{pkg.price}</span>
//                   </div>
//                 </div>
//               </div>

//               {/* Package Details - EXACT ORIGINAL DESIGN */}
//               <div className="p-5">
//                 <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 gap-4 text-sm">
//                   <div>
//                     <p className="text-[#6A7282] text-sm sm:text-base font-normal font-roboto leading-[150%] mb-1">Tracking Number</p>
//                     <p className="text-[#101828] text-sm sm:text-base font-normal font-roboto leading-[150%]">{pkg.trackingNumber}</p>
//                   </div>
//                   <div>
//                     <p className="text-[#6A7282] text-sm sm:text-base font-normal font-roboto leading-[150%] mb-1">BL Number</p>
//                     <p className="text-[#101828] text-sm sm:text-base font-normal font-roboto leading-[150%]">{pkg.blNumber}</p>
//                   </div>
//                   <div>
//                     <p className="text-[#6A7282] text-sm sm:text-base font-normal font-roboto leading-[150%] mb-1">Date</p>
//                     <p className="text-[#101828] text-sm sm:text-base font-normal font-roboto leading-[150%]">{pkg.date}</p>
//                   </div>
//                   <div>
//                     <p className="text-[#6A7282] text-sm sm:text-base font-normal font-roboto leading-[150%] mb-1">Client Number</p>
//                     <p className="text-[#155DFC] text-sm sm:text-base font-normal font-roboto leading-[150%]">{pkg.clientNumber}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Pagination - EXACT ORIGINAL DESIGN */}
//         <div className="flex justify-center items-center gap-2">
//           <button
//             disabled={currentPage === 1}
//             onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
//             className={`text-sm font-roboto font-medium flex items-center gap-1
//               ${currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-[#09090B] cursor-pointer"}
//             `}
//           >
//             <ChevronLeft className="w-4 h-4" /> Previous
//           </button>

//           {[...Array(totalPages)].map((_, i) => {
//             const page = i + 1;
//             return (
//               <button
//                 key={page}
//                 onClick={() => setCurrentPage(page)}
//                 className={`px-4 py-2 rounded-lg font-medium cursor-pointer transition-colors
//                   ${currentPage === page ? "bg-blue-600 text-white" : "border border-gray-300 text-gray-700 hover:bg-gray-50"}
//                 `}
//               >
//                 {page}
//               </button>
//             );
//           })}

//           <button
//             disabled={currentPage === totalPages || totalPages === 0}
//             onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
//             className={`text-sm font-roboto font-medium flex items-center gap-1
//               ${(currentPage === totalPages || totalPages === 0) ? "text-gray-400 cursor-not-allowed" : "text-[#09090B] cursor-pointer"}
//             `}
//           >
//             Next <ChevronRight className="w-4 h-4" />
//           </button>
//         </div>
//       </main>

//       <PackageModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
//           {isPaymentModalOpen && (
//         <div
//           className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
//           onClick={() => setIsPaymentModalOpen(false)}
//         >
//           <CompeletePayment closeModal={() => setIsPaymentModalOpen(false)} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyPackagesPage;