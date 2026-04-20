
import { ChevronLeft, ChevronRight,  } from "lucide-react";
import { ReactNode, useState } from "react";



export interface Column<T> {
  key: keyof T | string;
  header: string | ReactNode;
  render?: (item: T) => ReactNode;
  className?: string;
  cellClassName?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  itemsPerPage?: number;
  showPagination?: boolean;
  emptyMessage?: string;
}

export const DataTable = <T extends object>({
  columns,
  data,
  itemsPerPage = 5,
  showPagination = true,
  emptyMessage = "No data available"
}: DataTableProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);
  
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

const renderCell = (item: T, column: Column<T>) => {
    if (column.render) {
      return column.render(item);
    }
    
    // Check if the key exists on the item before accessing
    const key = column.key as keyof T;
    const value = item[key];

    // React can't render objects directly, so we ensure it's a renderable type
    return value !== undefined ? String(value) : null;
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-sm border border-[#E8EFFC] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#E8EFFC] ">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className={`px-4 py-3 text-left text-base sm:text-lg md:text-xl font-roboto font-normal leading-[150%] text-gray-900 uppercase tracking-wider ${column.className || ''}`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {currentData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-8 text-center text-gray-500">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              currentData.map((item, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-gray-50 transition-colors">
                  {columns.map((column, colIndex) => (
                    <td
                      key={colIndex}
                      className={`px-4 py-4 text-sm sm:text-base font-normal font-roboto text-gray-500 leading-[150%]  ${column.cellClassName || ''}`}
                    >
                      {renderCell(item, column)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

   {showPagination && totalPages > 1 && (
  <div className="bg-gray-50 px-4 py-3 flex items-center justify-center border-t border-gray-200">
    <div className="flex items-center gap-2">
      {/* Previous Button */}
      <button
        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className="py-2 px-4 flex items-center gap-2 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
       
        <ChevronLeft className="w-5 h-5 text-gray-600" />
         Previous
      </button>

      {/* Page Numbers */}
      {Array.from({ length: totalPages }, (_, i) => i + 1)
        .filter(page => {
          // Show only pages around current page
          return page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1);
        })
        .map((page, index, arr) => (
          <span key={page} className="flex items-center">
            {index > 0 && page - arr[index - 1] > 1 && (
              <span className="px-2">...</span>
            )}
            <button
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded text-sm font-medium ${
                currentPage === page
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-200'
              }`}
            >
              {page}
            </button>
          </span>
        ))}

      {/* Next Button */}
      <button
        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="px-4 py-2 flex items-center gap-2 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
           Next
        <ChevronRight className="w-5 h-5 text-gray-600" />
     
      </button>
    </div>
  </div>
)}

    </div>
  );
};