import { ChevronDown, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import DropOffPackage from "./DropOffPackage";
import { useNavigate } from "react-router-dom";


const DropOff = () => {
      const [searchTerm, setSearchTerm] = useState('');
      const [statusFilter, setStatusFilter] = useState('Online  Ordered Package');
      //const [isModalOpen, setIsModalOpen] = useState(false);
      const [showStatusDropdown, setShowStatusDropdown] = useState(false);
      const dropdownRef = useRef<HTMLDivElement | null>(null);
           const navigate = useNavigate()

        const statuses = ['Online  Ordered Package', 'In Transit', 'Pending Payment', 'Delivered', 'Processing'];

          // Outside click handler for dropdown
          useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
              if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowStatusDropdown(false);
              }
            };
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
              document.removeEventListener("mousedown", handleClickOutside);
            };
          }, []);
  return (
    <div>
         {/* Page Header */}
       <div className="flex flex-col md:flex-row  w-full md:w-auto items-center justify-between mb-3">
        
 <div className="mb-8">
          <h1 className="text-base sm:text-lg md:text-xl font-arima font-semibold text-[#0A0A0A] leading-[150%] mb-2">My Drop-off Packages</h1>
          <p className="text-[#4A5565] text-sm sm:text-base font-normal font-roboto leading-[150%]">Track and manage all your shipments</p>
        </div>
        <button onClick={()=> navigate('physical-drop')} className="bg-[#1C60DF] hover:bg-blue-600 cursor-pointer text-white p-3 text-sm md:text-base leading-snug rounded-xl">+ Drop-Off Package</button>
       </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row max-w-[928px] gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by ID, tracking number, or description..."
              className="w-full pl-10 pr-4 py-3 bg-blue-50 border border-blue-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
            />
          </div>

          <div ref={dropdownRef} className="relative w-full md:w-1/2">
            <div
              onClick={() => setShowStatusDropdown(!showStatusDropdown)}
              className="cursor-pointer w-full px-4 py-3 bg-blue-50 border border-blue-100 rounded-full flex justify-between items-center text-gray-700"
            >
              <span>{statusFilter}</span>
              <ChevronDown className="w-5 h-5 text-gray-400" />
            </div>
            {showStatusDropdown && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                {statuses.map((status) => (
                  <button
                    key={status}
                    onClick={() => {
                      setStatusFilter(status);
                      setShowStatusDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-blue-50 text-gray-700 transition-colors first:rounded-t-lg last:rounded-b-lg"
                  >
                    {status}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <DropOffPackage searchTerm={searchTerm} statusFilter={statusFilter} />
        
    </div>
  )
}

export default DropOff
