import React, { useState } from 'react';
import { Eye, Download } from 'lucide-react';
import InvoiceModal from '../Payment/InvoiceModal';
import { useGetInvoicesQuery } from '@/redux/features/clients/invoiceApi';

const InvoicesPage: React.FC = () => {
  const [selectedInvoice, setSelectedInvoice] = useState<any | null>(null);

  const { data, isLoading } = useGetInvoicesQuery({ page: 1, limit: 20 });

  const invoices = data?.data || [];

  const totalInvoices = data?.meta?.total || 0;
  const totalPaid = invoices
    .filter((i: any) => i.status === 'PAID')
    .reduce((acc: number, i: any) => acc + Number(i.totalAmount || 0), 0);
  const totalPending = invoices
    .filter((i: any) => i.status === 'PENDING')
    .reduce((acc: number, i: any) => acc + Number(i.totalAmount || 0), 0);

  const stats = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M11 21.7299C11.304 21.9054 11.6489 21.9979 12 21.9979C12.3511 21.9979 12.696 21.9054 13 21.7299L20 17.7299C20.3037 17.5545 20.556 17.3024 20.7315 16.9987C20.9071 16.6951 20.9996 16.3506 21 15.9999V7.9999C20.9996 7.64918 20.9071 7.30471 20.7315 7.00106C20.556 6.69742 20.3037 6.44526 20 6.2699L13 2.2699C12.696 2.09437 12.3511 2.00195 12 2.00195C11.6489 2.00195 11.304 2.09437 11 2.2699L4 6.2699C3.69626 6.44526 3.44398 6.69742 3.26846 7.00106C3.09294 7.30471 3.00036 7.64918 3 7.9999V15.9999C3.00036 16.3506 3.09294 16.6951 3.26846 16.9987C3.44398 17.3024 3.69626 17.5545 4 17.7299L11 21.7299Z" stroke="#155DFC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 22V12" stroke="#155DFC" strokeWidth="2"/>
          <path d="M3.29 7L12 12L20.71 7" stroke="#155DFC" strokeWidth="2"/>
        </svg>
      ),
      label: 'Total Invoices',
      value: totalInvoices,
      bg: 'bg-blue-50',
      valueColor: 'text-[#0A0A0A]',
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12Z" stroke="#F0B100" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M15.7099 15.1798L12.6099 13.3298C12.0699 13.0098 11.6299 12.2398 11.6299 11.6098V7.50977" stroke="#F0B100" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      label: 'Total Paid',
      value: `€${totalPaid.toFixed(2)}`,
      bg: 'bg-yellow-50',
      valueColor: 'text-[#00A63E]',
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path d="M20.75 10.75C20.75 5.22715 16.2728 0.75 10.75 0.75C5.22715 0.75 0.75 5.22715 0.75 10.75C0.75 16.2728 5.22715 20.75 10.75 20.75C16.2728 20.75 20.75 16.2728 20.75 10.75Z" stroke="#12BC31" strokeWidth="1.5"/>
          <path d="M6.75 11.5C6.75 11.5 8.35 12.4125 9.15 13.75C9.15 13.75 11.55 8.5 14.75 6.75" stroke="#12BC31" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      label: 'Total Pending',
      value: `€${totalPending.toFixed(2)}`,
      bg: 'bg-green-50',
      valueColor: 'text-[#D08700]',
    },
  ];

  // invoice data কে InvoiceModal এর item format এ convert করো
  const buildItem = (inv: any) => ({
    kind: 'package' as const,
    data: {
      id: inv.id,
      packageCode: inv.invoiceNumber,
      trackingNumber: inv.trackingNumber || '—',
      blNumber: inv.blNumber || '—',
      description: inv.description || '—',
      weightKg: inv.weight || '—',
      shippingCost: inv.totalAmount,
      carrier: inv.carrier || '—',
      destination: inv.destination || '—',
      status: inv.status,
      isPaid: inv.status === 'PAID',
      deliveredAt: inv.paidAt || null,
      updatedAt: inv.updatedAt || inv.issueDate,
      clientId: inv.clientId || '—',
      createdAt: inv.issueDate,
    },
  });

  return (
    <div className="min-h-screen">
      <main className="py-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-base sm:text-lg md:text-xl font-semibold text-[#0A0A0A] font-arima mb-2">
            Invoices
          </h1>
          <p className="text-[#4A5565] text-sm">View and download your invoices</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8 mt-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white rounded-xl p-6 shadow-sm border border-[#B9CEF5] hover:shadow-md">
              <div className={`w-10 h-10 rounded-full ${stat.bg} flex items-center justify-center mb-4`}>
                {stat.icon}
              </div>
              <p className={`text-xl md:text-3xl mb-6 ${stat.valueColor}`}>{stat.value}</p>
              <p className="text-base text-[#4A5565]">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#E8EFFC]">
                  <th className="py-4 px-6 text-left">Invoice</th>
                  <th className="py-4 px-6 text-left">Package</th>
                  <th className="py-4 px-6 text-left">Date</th>
                  <th className="py-4 px-6 text-left">Due</th>
                  <th className="py-4 px-6 text-left">Amount</th>
                  <th className="py-4 px-6 text-left">Status</th>
                  <th className="py-4 px-6 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={7} className="text-center py-6 text-gray-400 animate-pulse">
                      Loading...
                    </td>
                  </tr>
                ) : invoices.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-6 text-gray-500">
                      No invoices found
                    </td>
                  </tr>
                ) : (
                  invoices.map((inv: any, idx: number) => (
                    <tr key={idx} className="border-t hover:bg-gray-50 transition">
                      <td className="py-4 px-6 text-sm text-[#101828]">{inv.invoiceNumber}</td>
                      <td className="py-4 px-6 text-sm text-[#101828]">{inv.packageId || '—'}</td>
                      <td className="py-4 px-6 text-sm text-[#4A5565]">{inv.issueDate?.slice(0, 10)}</td>
                      <td className="py-4 px-6 text-sm text-[#4A5565]">{inv.dueDate?.slice(0, 10)}</td>
                      <td className="py-4 px-6 text-sm font-medium text-[#101828]">€{inv.totalAmount}</td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          inv.status === 'PAID'
                            ? 'bg-[#C9FFE0] text-[#00A242]'
                            : 'bg-[#F5ECAA] text-[#F0B100]'
                        }`}>
                          {inv.status}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          {/* View → modal খুলবে */}
                          <button
                            onClick={() => setSelectedInvoice(inv)}
                            className="hover:text-blue-800 transition"
                            title="View Invoice"
                          >
                            <Eye className="w-5 h-5 text-blue-600" />
                          </button>
                          {/* Download → সরাসরি print */}
                          <button
                            onClick={() => {
                              setSelectedInvoice(inv);
                              setTimeout(() => window.print(), 300);
                            }}
                            className="hover:text-blue-800 transition"
                            title="Download Invoice"
                          >
                            <Download className="w-5 h-5 text-blue-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </main>

      {/* Invoice Modal */}
      {selectedInvoice && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setSelectedInvoice(null)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <InvoiceModal
              item={buildItem(selectedInvoice)}
              closeModal={() => setSelectedInvoice(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoicesPage;







// import React, { useState } from 'react';
// import {  Eye, Download,  } from 'lucide-react';
// import InvoiceModal from '../Payment/InvoiceModal';

// const InvoicesPage: React.FC = () => {
//   //const [searchTerm, setSearchTerm] = useState('');
 
//     const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);

//   const stats = [
//   {
//     icon: (
//       <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
//         <path d="M11 21.7299C11.304 21.9054 11.6489 21.9979 12 21.9979C12.3511 21.9979 12.696 21.9054 13 21.7299L20 17.7299C20.3037 17.5545 20.556 17.3024 20.7315 16.9987C20.9071 16.6951 20.9996 16.3506 21 15.9999V7.9999C20.9996 7.64918 20.9071 7.30471 20.7315 7.00106C20.556 6.69742 20.3037 6.44526 20 6.2699L13 2.2699C12.696 2.09437 12.3511 2.00195 12 2.00195C11.6489 2.00195 11.304 2.09437 11 2.2699L4 6.2699C3.69626 6.44526 3.44398 6.69742 3.26846 7.00106C3.09294 7.30471 3.00036 7.64918 3 7.9999V15.9999C3.00036 16.3506 3.09294 16.6951 3.26846 16.9987C3.44398 17.3024 3.69626 17.5545 4 17.7299L11 21.7299Z" stroke="#155DFC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//         <path d="M12 22V12" stroke="#155DFC" strokeWidth="2"/>
//         <path d="M3.29 7L12 12L20.71 7" stroke="#155DFC" strokeWidth="2"/>
//       </svg>
//     ),
//     label: "Total Invoices",
//     value: "5",
//     bg: "bg-blue-50",
//        valueColor: "text-[#0A0A0A]",
//   },
//   {
//     icon: (
//       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//   <path d="M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12Z" stroke="#F0B100" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
//   <path d="M15.7099 15.1798L12.6099 13.3298C12.0699 13.0098 11.6299 12.2398 11.6299 11.6098V7.50977" stroke="#F0B100" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
// </svg>
//     ),
//     label: "Total paid",
//     value: "€135.50",
//     bg: "bg-yellow-50",
//        valueColor: "text-[#00A63E]",
//   },
//   {
//     icon: (
//       <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
//   <path d="M20.75 10.75C20.75 5.22715 16.2728 0.75 10.75 0.75C5.22715 0.75 0.75 5.22715 0.75 10.75C0.75 16.2728 5.22715 20.75 10.75 20.75C16.2728 20.75 20.75 16.2728 20.75 10.75Z" stroke="#12BC31" stroke-width="1.5"/>
//   <path d="M6.75 11.5C6.75 11.5 8.35 12.4125 9.15 13.75C9.15 13.75 11.55 8.5 14.75 6.75" stroke="#12BC31" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
// </svg>
//     ),
//     label: "Total Pending",
//     value: "€22.00",
//     bg: "bg-green-50",
//        valueColor: "text-[#D08700]",
//   },
  
// ];

//   const invoices = [
//     {
//       invoiceNumber: 'INV-2024-001',
//       packageId: '$250.00',
//       date: '2024-07-10',
//       dueDate: '2024-07-10',
//       amount: '2024-07-10',
//       status: 'Paid',
//       statusColor: 'green'
//     },
//     {
//       invoiceNumber: 'INV-2024-001',
//       packageId: '$120.00',
//       date: '2024-07-10',
//       dueDate: '2024-07-10',
//       amount: '2024-07-10',
//       status: 'Paid',
//       statusColor: 'green'
//     },
//     {
//       invoiceNumber: 'INV-2024-001',
//       packageId: '$15.00',
//       date: '2024-07-10',
//       dueDate: '2024-07-10',
//       amount: '2024-07-10',
//       status: 'Pending',
//       statusColor: 'yellow'
//     },
//     {
//       invoiceNumber: 'INV-2024-001',
//       packageId: '$30.00',
//       date: '2024-07-10',
//       dueDate: '2024-07-10',
//       amount: '2024-07-10',
//       status: 'Paid',
//       statusColor: 'green'
//     }
//   ];

//   return (
//     <div className="min-h-screen ">
   
//       {/* Main Content */}
//       <main className="  py-8">
//         {/* Page Header */}
//         <div className="mb-8">
//           <h1 className="text-base sm:text-lg md:text-xl font-semibold text-[#0A0A0A] font-arima leading-[150%] mb-2">Invoices</h1>
//           <p className="text-[#4A5565] font-normal font-roboto leading-[150%] text-sm sm:text-base">View and download your invoices</p>
//         </div>

//         {/* Stats Cards */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8 mt-8">
//       {stats.map((stat, idx) => (
//         <div
//           key={idx}
//           className="bg-white rounded-xl p-6 shadow-sm border border-[#B9CEF5] hover:shadow-md transition-shadow"
//         >
//           <div
//             className={`w-10 h-10 rounded-full ${stat.bg} flex items-center justify-center mb-4`}
//           >
//             {stat.icon}
//           </div>

//           <p
//   className={`text-xl sm:text-base md:text-3xl font-normal leading-[120%] mb-6 ${stat.valueColor}`}
// >
//   {stat.value}
// </p>

//           <p className="text-base sm:text-lg md:text-xl font-normal leading-[120%] text-[#4A5565]">{stat.label}</p>
//         </div>
//       ))}
//     </div>

//         {/* Invoices Table */}
//         <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
//           {/* Desktop Table */}
//           <div className="hidden md:block overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="bg-[#E8EFFC] border-b border-gray-200">
//                   <th className="text-left py-4 px-6 text-base sm:text-lg md:text-xl font-normal font-roboto leading-[150%] text-gray-900">Invoice Number</th>
//                   <th className="text-left py-4 px-6 text-base sm:text-lg md:text-xl font-normal font-roboto leading-[150%] text-gray-900">Package ID</th>
//                   <th className="text-left py-4 px-6 text-base sm:text-lg md:text-xl font-normal font-roboto leading-[150%] text-gray-900">Date</th>
//                   <th className="text-left py-4 px-6 text-base sm:text-lg md:text-xl font-normal font-roboto leading-[150%] text-gray-900">Due Date</th>
//                   <th className="text-left py-4 px-6 text-base sm:text-lg md:text-xl font-normal font-roboto leading-[150%] text-gray-900">Amount</th>
//                   <th className="text-left py-4 px-6 text-base sm:text-lg md:text-xl font-normal font-roboto leading-[150%] text-gray-900">Status</th>
//                   <th className="text-left py-4 px-6 text-base sm:text-lg md:text-xl font-normal font-roboto leading-[150%] text-gray-900">Action</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-100">
//                 {invoices.map((invoice, idx) => (
//                   <tr key={idx} className="hover:bg-gray-50 transition-colors">
//                     <td className="py-4 px-6 text-sm sm:text-base font-normal font-roboto leading-[150%] text-gray-500">{invoice.invoiceNumber}</td>
//                     <td className="py-4 px-6 text-sm sm:text-base font-normal font-roboto leading-[150%] text-gray-500">{invoice.packageId}</td>
//                     <td className="py-4 px-6 text-sm sm:text-base font-normal font-roboto leading-[150%] text-gray-500">{invoice.date}</td>
//                     <td className="py-4 px-6 text-sm sm:text-base font-normal font-roboto leading-[150%] text-gray-500">{invoice.dueDate}</td>
//                     <td className="py-4 px-6 text-sm sm:text-base font-normal font-roboto leading-[150%] text-gray-500">{invoice.amount}</td>
//                     <td className="py-4 px-6">
//                       <span className={`inline-block px-3 py-1 rounded-full text-sm sm:text-base font-normal font-roboto leading-[150%] ${
//                         invoice.statusColor === 'green' 
//                           ? 'bg-[#C9FFE0] text-[#00A242]' 
//                           : 'bg-[#F5ECAA] text-[#F0B100]'
//                       }`}>
//                         {invoice.status}
//                       </span>
//                     </td>
//                     <td className="py-4 px-6">
//                       <div className="flex items-center">
//   {/* Eye */}
//   <button  onClick={() => setIsInvoiceModalOpen(true)} className="p-2 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer">
//     <Eye className="w-6 h-6 text-[#1C60DF]" />
//   </button>

//   {/* Divider */}
//   <span className="h-4 w-1px border border-r border-gray-50 mx-2"></span>

//   {/* Download */}
//   <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer">
//     <Download className="w-6 h-6 text-[#1C60DF]" />
//   </button>
// </div>

//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Mobile Cards */}
//           <div className="md:hidden divide-y divide-gray-100">
//             {invoices.map((invoice, idx) => (
//               <div key={idx} className="p-5">
//                 <div className="flex justify-between items-start mb-4">
//                   <div>
//                     <p className="font-semibold text-gray-900 mb-1">{invoice.invoiceNumber}</p>
//                     <p className="text-sm text-gray-600">{invoice.packageId}</p>
//                   </div>
//                   <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
//                     invoice.statusColor === 'green' 
//                       ? 'bg-green-100 text-green-700' 
//                       : 'bg-yellow-100 text-yellow-700'
//                   }`}>
//                     {invoice.status}
//                   </span>
//                 </div>

//                 <div className="grid grid-cols-2 gap-3 text-sm mb-4">
//                   <div>
//                     <p className="text-gray-500 mb-1">Date</p>
//                     <p className="text-gray-900">{invoice.date}</p>
//                   </div>
//                   <div>
//                     <p className="text-gray-500 mb-1">Due Date</p>
//                     <p className="text-gray-900">{invoice.dueDate}</p>
//                   </div>
//                   <div>
//                     <p className="text-gray-500 mb-1">Amount</p>
//                     <p className="text-gray-900">{invoice.amount}</p>
//                   </div>
//                 </div>

//                 <div className="flex gap-2">
//                   <button className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors">
//                     <Eye className="w-4 h-4" />
//                     View
//                   </button>
//                   <button className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
//                     <Download className="w-4 h-4" />
//                     Download
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </main>
//        {isInvoiceModalOpen && (
//         <div
//           className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
//           onClick={() => setIsInvoiceModalOpen(false)}
//         >
//           <InvoiceModal closeModal={() => setIsInvoiceModalOpen(false)} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default InvoicesPage;