import { DropOffAppointment } from '@/redux/features/clients/dropOffApi';
import { PackageResponse } from '@/redux/features/clients/packageApi';
import React from 'react';


type PendingItem =
  | { kind: 'package'; data: PackageResponse }
  | { kind: 'dropoff'; data: DropOffAppointment };

interface Props {
  item: PendingItem;
  closeModal: () => void;
}

const formatDate = (dateStr: string | null | undefined) => {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  });
};

const InvoiceModal: React.FC<Props> = ({ item, closeModal }) => {
  const isPackage = item.kind === 'package';
  const pkg = isPackage ? (item.data as PackageResponse) : null;
  const dropoff = !isPackage ? (item.data as DropOffAppointment) : null;

  const code = isPackage ? pkg!.packageCode : dropoff!.appointmentCode;
  const description = isPackage ? pkg!.description : dropoff!.description;
  const amount = isPackage ? pkg!.shippingCost : '—';
  const paidDate = isPackage ? pkg!.deliveredAt ?? pkg!.updatedAt : dropoff!.updatedAt;

  const handleDownload = () => {
    const win = window.open('', '_blank');
    if (!win) return;
    win.document.write(`
      <html>
        <head>
          <title>Invoice - ${code}</title>
          <style>
            body { font-family: Roboto, sans-serif; padding: 40px; color: #101828; }
            .header { display: flex; justify-content: space-between; border-bottom: 1px solid #DDE7FA; padding-bottom: 20px; margin-bottom: 24px; }
            .row { display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 14px; }
            .label { color: #6A7282; }
            .divider { border-top: 1px solid #e5e7eb; margin: 20px 0; }
            .total { font-size: 18px; font-weight: 600; }
            h1 { font-size: 22px; font-weight: 400; margin: 0 0 4px; }
            .badge { background: #dcfce7; color: #16a34a; padding: 3px 12px; border-radius: 99px; font-size: 13px; display: inline-block; }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <h1>KayLeo Logistics</h1>
              <p style="color:#6A7282;margin:0">Package Forwarding Services</p>
            </div>
            <div style="text-align:right">
              <p style="font-size:18px;margin:0 0 8px">${code}</p>
              <span class="badge">Paid</span>
            </div>
          </div>
          <div class="row"><span class="label">Type</span><span>${isPackage ? 'Package' : dropoff!.type.replace('_', ' ')}</span></div>
          <div class="row"><span class="label">Description</span><span>${description}</span></div>
          ${isPackage ? `
            <div class="row"><span class="label">Tracking Number</span><span>${pkg!.trackingNumber}</span></div>
            <div class="row"><span class="label">Weight</span><span>${pkg!.weightKg} kg</span></div>
            <div class="row"><span class="label">Carrier</span><span>${pkg!.carrier}</span></div>
            <div class="row"><span class="label">Destination</span><span>${pkg!.destination}</span></div>
          ` : `
            <div class="row"><span class="label">Appointment Date</span><span>${formatDate(dropoff!.appointmentDate)}</span></div>
            <div class="row"><span class="label">Time Slot</span><span>${dropoff!.timeSlot}</span></div>
            <div class="row"><span class="label">Package Count</span><span>${dropoff!.packageCount}</span></div>
            <div class="row"><span class="label">Priority</span><span>${dropoff!.priorityDelivery}</span></div>
          `}
          <div class="row"><span class="label">Paid At</span><span>${formatDate(paidDate)}</span></div>
          <div class="divider"></div>
          <div class="row total"><span>Total Amount</span><span>€${amount}</span></div>
        </body>
      </html>
    `);
    win.document.close();
    win.print();
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 sm:p-8 md:p-10">

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between border-b border-[#DDE7FA] pb-5 mb-6 sm:mb-8">
            <div className="mb-4 sm:mb-0">
              <h1 className="text-base sm:text-lg md:text-xl font-normal font-roboto leading-snug md:leading-[150%] text-[#101828] mb-1">
                KayLeo Logistics
              </h1>
              <p className="text-sm sm:text-base font-roboto text-gray-600">
                Package Forwarding Services
              </p>
            </div>
            <div className="flex flex-col items-start sm:items-end gap-3">
              <p className="text-base sm:text-lg font-normal font-roboto text-[#101828]">{code}</p>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                Paid
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="mb-5 sm:mb-6">
            <h2 className="text-sm font-normal font-roboto text-gray-700 mb-2">Description</h2>
            <p className="text-sm md:text-base font-roboto text-gray-900 mb-1">{description}</p>
            {isPackage && (
              <p className="text-sm font-roboto text-gray-600">
                Tracking: {pkg!.trackingNumber}
              </p>
            )}
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 mb-5 sm:mb-6">
            <div>
              <h3 className="text-sm font-roboto text-gray-700 mb-1">
                {isPackage ? 'Delivered At' : 'Appointment Date'}
              </h3>
              <p className="text-sm md:text-base font-roboto text-gray-900">
                {isPackage ? formatDate(pkg!.deliveredAt) : formatDate(dropoff!.appointmentDate)}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-roboto text-gray-700 mb-1">Paid At</h3>
              <p className="text-sm md:text-base font-roboto text-gray-900">{formatDate(paidDate)}</p>
            </div>
          </div>

          {/* Extra Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 mb-6 sm:mb-8">
            {isPackage ? (
              <>
                <div>
                  <h3 className="text-sm font-roboto text-gray-700 mb-1">Weight</h3>
                  <p className="text-sm md:text-base font-roboto text-gray-900">{pkg!.weightKg} kg</p>
                </div>
                <div>
                  <h3 className="text-sm font-roboto text-gray-700 mb-1">Destination</h3>
                  <p className="text-sm md:text-base font-roboto text-gray-900">{pkg!.destination}</p>
                </div>
              </>
            ) : (
              <>
                <div>
                  <h3 className="text-sm font-roboto text-gray-700 mb-1">Time Slot</h3>
                  <p className="text-sm md:text-base font-roboto text-gray-900">{dropoff!.timeSlot}</p>
                </div>
                <div>
                  <h3 className="text-sm font-roboto text-gray-700 mb-1">Priority</h3>
                  <p className="text-sm md:text-base font-roboto text-gray-900">{dropoff!.priorityDelivery}</p>
                </div>
              </>
            )}
          </div>

          {/* Total */}
          <div className="flex justify-between items-center mb-6 sm:mb-8 pt-4 border-t border-gray-200">
            <h3 className="text-base sm:text-lg md:text-xl font-normal text-[#101828] font-roboto leading-[150%]">
              Total Amount
            </h3>
            <p className="text-base sm:text-lg md:text-xl font-normal text-[#101828] font-roboto leading-[150%]">
              €{amount}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              onClick={handleDownload}
              className="flex-1 px-6 py-3 bg-blue-600 text-white font-roboto cursor-pointer rounded-lg font-medium hover:bg-blue-700 transition-all text-sm sm:text-base"
            >
              Download PDF
            </button>
            <button
              onClick={closeModal}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-roboto cursor-pointer rounded-lg font-medium hover:bg-gray-50 transition-all text-sm sm:text-base"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceModal;







// import React from 'react';

// interface Props {
//   closeModal: () => void;
// }

// const InvoiceModal: React.FC<Props> = ({ closeModal }) => {
//   return (
//     <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
//         <div className="p-6 sm:p-8 md:p-10">
//           {/* Header Section */}
//           <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between border-b border-[#DDE7FA] pb-5 mb-6 sm:mb-8">
//             <div className="mb-4 sm:mb-0">
//               <h1 className="text base sm:text-lg md:text-xl  font-normal font-roboto leading-snug md:leading-[150%] text-[#101828] mb-1">
//                 KayLeo Logistics
//               </h1>
//               <p className="text-sm sm:text-base font-roboto text-gray-600">
//                 Package Forwarding Services
//               </p>
//             </div>
//             <div className="flex flex-col items-start items-center gap-3">
//               <p className="text base sm:text-lg md:text-xl  font-normal font-roboto leading-snug md:leading-[150%] text-[#101828]">
//                 INV-2025-001234
//               </p>
//               <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
//                 Paid
//               </span>
//             </div>
//             {/* <button className='hover:bg-gray-100 py-2 px-4 cursor-pointer'>
//                 <X/>
//             </button> */}
//           </div>

//           {/* Description Section */}
//           <div className="mb-5 sm:mb-6">
//             <h2 className="text-sm font-normal font-roboto leading-snug text-gray-700 mb-2">Description</h2>
//             <p className="text-sm md:text-base leading-snug font-roboto font-normal text-gray-900 mb-1">
//               Shipping quote for Nike shoes package
//             </p>
//             <p className="text-sm leading-snug font-roboto font-normal text-gray-600">
//               Tracking: AMZ-FR-1234567890
//             </p>
//           </div>

//           {/* Invoice & Due Date */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 mb-5 sm:mb-6">
//             <div>
//               <h3 className="text-sm leading-snug font-roboto font-normal text-gray-700 mb-1">Invoice Date</h3>
//               <p className="text-sm leading-snug font-roboto font-normal md:text-base text-gray-900">January 10, 2025</p>
//             </div>
//             <div>
//               <h3 className="text-sm leading-snug font-roboto font-normal text-gray-700 mb-1">Due Date</h3>
//               <p className="md:text-base text-sm leading-snug font-roboto font-normal text-gray-900">January 18, 2025</p>
//             </div>
//           </div>

//           {/* Weight & Destination */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 mb-6 sm:mb-8">
//             <div>
//               <h3 className="text-sm leading-snug font-roboto font-normal text-gray-700 mb-1">Weight</h3>
//               <p className="md:text-base text-sm leading-snug font-roboto font-normal text-gray-900">1.5 kg</p>
//             </div>
//             <div>
//               <h3 className="text-sm leading-snug font-roboto font-normal text-gray-700 mb-1">Destination</h3>
//               <p className="text-sm leading-snug font-roboto font-normal md:text-base text-gray-900 ">Fort-de-France, Martinique</p>
//             </div>
//           </div>

//           {/* Itemized Charges */}
//           <div className="mb-6 sm:mb-8">
//             <h3 className="text-sm md:text-base leading-snug font-roboto font-normal text-gray-900 mb-4">
//               Itemized Charges
//             </h3>
            
//             <div className="space-y-3">
//               <div className="flex justify-between items-center">
//                 <span className="text-sm leading-snug font-roboto font-normal text-[#364153]">Base Shipping Rate</span>
//                 <span className="text-sm leading-snug font-roboto font-normal text-[#364153]">€25.00</span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-sm leading-snug font-roboto font-normal text-[#364153]">Weight Surcharge (1.5 kg)</span>
//                 <span className="text-sm leading-snug font-roboto font-normal text-[#364153]">€15.00</span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-sm leading-snug font-roboto font-normal text-[#364153]">Volume Surcharge</span>
//                 <span className="text-sm leading-snug font-roboto font-normal text-[#364153]">€0.00</span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-sm leading-snug font-roboto font-normal text-[#364153]">Insurance Coverage</span>
//                 <span className="text-sm leading-snug font-roboto font-normal text-[#364153]">€20.00</span>
//               </div>
//             </div>
//           </div>

//           {/* Total Amount */}
//           <div className="flex justify-between items-center mb-6 sm:mb-8 pt-4 border-t border-gray-200">
//             <h3 className="text-base sm:text-lg md:text-xl  font-normal text-[#101828] font-roboto leading-[150%]">
//               Total Amount
//             </h3>
//             <p className="text-base sm:text-lg md:text-xl  font-normal text-[#101828] font-roboto leading-[150%]">
//               €45.50
//             </p>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
//             <button className="flex-1 px-6 py-3 bg-blue-600 text-white font-inter cursor-pointer rounded-lg font-medium hover:bg-blue-700 transition-all text-sm sm:text-base">
//               Download Pdf
//             </button>
//             <button 
//               onClick={closeModal}
//               className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-inter cursor-pointer rounded-lg font-medium hover:bg-gray-50 transition-all text-sm sm:text-base"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InvoiceModal;