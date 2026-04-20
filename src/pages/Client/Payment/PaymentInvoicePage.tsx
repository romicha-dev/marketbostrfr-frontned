import React, { useState } from 'react';
import { Download } from 'lucide-react';
import PaymentInfo from './PaymentInfo';
import CompeletePayment from './CompeletePayment';
import InvoiceModal from './InvoiceModal';
import { PackageResponse, useGetPackagesQuery } from '@/redux/features/clients/packageApi';
import { DropOffAppointment, useGetDropOffAppointmentsQuery } from '@/redux/features/clients/dropOffApi';


// ─── Unified pending item type ─────────────────────────────────────────────
type PendingItem =
  | { kind: 'package'; data: PackageResponse }
  | { kind: 'dropoff'; data: DropOffAppointment };

const formatDate = (dateStr: string | null | undefined) => {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  });
};

const PaymentsInvoicesPage: React.FC = () => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<PendingItem | null>(null);

  // ─── Fetch packages ──────────────────────────────────────────────────────
  const {
    data: packagesData,
    isLoading: packagesLoading,
    isError: packagesError,
  } = useGetPackagesQuery({ page: 1, limit: 100 });

  // ─── Fetch dropoff appointments ──────────────────────────────────────────
  const {
    data: dropoffData,
    isLoading: dropoffLoading,
    isError: dropoffError,
  } = useGetDropOffAppointmentsQuery({ page: 1, limit: 100 });

  const isLoading = packagesLoading || dropoffLoading;
  const isError = packagesError || dropoffError;

  // ─── Filter: isPaid false → pending, true → history ─────────────────────
  const pendingPackages: PendingItem[] = (packagesData?.data ?? [])
    .filter((p) => !p.isPaid)
    .map((p) => ({ kind: 'package', data: p }));

  const pendingDropoffs: PendingItem[] = (dropoffData?.data ?? [])
    .filter((d) => !d.isPaid)
    .map((d) => ({ kind: 'dropoff', data: d }));

  const paidPackages: PendingItem[] = (packagesData?.data ?? [])
    .filter((p) => p.isPaid)
    .map((p) => ({ kind: 'package', data: p }));

  const paidDropoffs: PendingItem[] = (dropoffData?.data ?? [])
    .filter((d) => d.isPaid)
    .map((d) => ({ kind: 'dropoff', data: d }));

  const pendingItems: PendingItem[] = [...pendingPackages, ...pendingDropoffs];
  const historyItems: PendingItem[] = [...paidPackages, ...paidDropoffs];

  const handlePayNow = (item: PendingItem) => {
    setSelectedItem(item);
    setIsPaymentModalOpen(true);
  };

  const handleViewInvoice = (item: PendingItem) => {
    setSelectedItem(item);
    setIsInvoiceModalOpen(true);
  };

  // ─── Loading / Error ─────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="min-h-screen mt-5 mb-10 flex items-center justify-center">
        <p className="text-[#4A5565] font-roboto text-base animate-pulse">
          Loading payments...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen mt-5 mb-10 flex items-center justify-center">
        <p className="text-red-500 font-roboto text-base">
          Failed to load payments. Please try again.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-5 mb-10">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-base sm:text-lg md:text-xl font-semibold text-[#0A0A0A] font-arima leading-[150%] mb-2">
          Payments & Invoices
        </h1>
        <p className="text-[#4A5565] font-normal font-roboto leading-[150%] text-sm sm:text-base">
          Manage your payments and download invoices
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-stretch">
        {/* Left Section */}
        <div className="lg:w-2/3 w-full space-y-6">

          {/* ── Pending Payments ── */}
          <div>
            <h2 className="text-base sm:text-lg md:text-xl font-normal font-roboto leading-[150%] text-[#0A0A0A] mb-6">
              Pending Payments
            </h2>

            {pendingItems.length === 0 ? (
              <div className="bg-white rounded-2xl border border-[#B9CEF5] shadow-sm p-6 text-center">
                <p className="text-[#4A5565] font-roboto text-sm">
                  No pending payments 🎉
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingItems.map((item) => {
                  const isPackage = item.kind === 'package';
                  const pkg = isPackage ? (item.data as PackageResponse) : null;
                  const dropoff = !isPackage ? (item.data as DropOffAppointment) : null;

                  return (
                    <div
                      key={item.data.id}
                      className="bg-white rounded-2xl border py-5 px-6 border-[#B9CEF5] shadow-sm overflow-hidden"
                    >
                      <div className="p-5">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
                          <div className="flex flex-col items-start gap-3">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-normal text-sm sm:text-base text-[#101828] font-roboto leading-[150%]">
                                {isPackage ? pkg!.packageCode : dropoff!.appointmentCode}
                              </span>
                              <span className="px-3 py-1 bg-[#FFF7ED] text-[#F54900] rounded-full text-xs font-roboto font-normal">
                                Pending Payment
                              </span>
                              <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-roboto font-normal">
                                {isPackage ? 'Package' : dropoff!.type === 'DROP_OFF' ? 'Drop-off' : 'Pick-up'}
                              </span>
                            </div>
                            <p className="text-gray-700 text-sm">
                              {isPackage ? pkg!.description : dropoff!.description}
                            </p>
                          </div>

                          <div className="flex flex-col sm:items-end gap-2">
                            <span className="text-base sm:text-lg font-normal font-roboto leading-[150%] mb-2.5 text-[#353B42]">
                              Amount Due:{' '}
                              <span className="font-bold text-gray-900">
                                €{isPackage ? pkg!.shippingCost : '—'}
                              </span>
                            </span>
                            <button
                              onClick={() => handlePayNow(item)}
                              className="flex items-center justify-center gap-2 bg-[#00A63E] hover:bg-green-700 text-white px-3 py-2.5 rounded-lg text-sm font-medium cursor-pointer transition-all"
                            >
                              Pay Now
                            </button>
                          </div>
                        </div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                          {isPackage ? (
                            <>
                              <div>
                                <p className="text-[#6A7282] text-sm font-roboto mb-2">Tracking No</p>
                                <p className="font-roboto text-[#4A5565] text-sm">{pkg!.trackingNumber}</p>
                              </div>
                              <div>
                                <p className="text-[#6A7282] text-sm font-roboto mb-2">Weight</p>
                                <p className="font-roboto text-[#4A5565] text-sm">{pkg!.weightKg} kg</p>
                              </div>
                              <div>
                                <p className="text-[#6A7282] text-sm font-roboto mb-2">Carrier</p>
                                <p className="font-roboto text-[#4A5565] text-sm">{pkg!.carrier}</p>
                              </div>
                              <div>
                                <p className="text-[#6A7282] text-sm font-roboto mb-2">Destination</p>
                                <p className="font-roboto text-[#4A5565] text-sm">{pkg!.destination}</p>
                              </div>
                            </>
                          ) : (
                            <>
                              <div>
                                <p className="text-[#6A7282] text-sm font-roboto mb-2">Date</p>
                                <p className="font-roboto text-[#4A5565] text-sm">
                                  {formatDate(dropoff!.appointmentDate)}
                                </p>
                              </div>
                              <div>
                                <p className="text-[#6A7282] text-sm font-roboto mb-2">Time Slot</p>
                                <p className="font-roboto text-[#4A5565] text-sm">{dropoff!.timeSlot}</p>
                              </div>
                              <div>
                                <p className="text-[#6A7282] text-sm font-roboto mb-2">Packages</p>
                                <p className="font-roboto text-[#4A5565] text-sm">{dropoff!.packageCount}</p>
                              </div>
                              <div>
                                <p className="text-[#6A7282] text-sm font-roboto mb-2">Priority</p>
                                <p className="font-roboto text-[#4A5565] text-sm">{dropoff!.priorityDelivery}</p>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* ── Payment History ── */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-base sm:text-lg md:text-xl font-normal font-roboto leading-[150%] text-[#0A0A0A]">
                Payment History
              </h2>
            </div>

            {historyItems.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 text-center">
                <p className="text-[#4A5565] font-roboto text-sm">
                  No payment history yet.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {historyItems.map((item) => {
                  const isPackage = item.kind === 'package';
                  const pkg = isPackage ? (item.data as PackageResponse) : null;
                  const dropoff = !isPackage ? (item.data as DropOffAppointment) : null;

                  return (
                    <div
                      key={item.data.id}
                      className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5"
                    >
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-roboto text-[#424A52]">
                                {isPackage ? 'Package:' : 'Appointment:'}
                              </span>
                              <span className="text-sm font-roboto text-[#155DFC]">
                                {isPackage ? pkg!.packageCode : dropoff!.appointmentCode}
                              </span>
                              <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-roboto">
                                Paid
                              </span>
                            </div>
                            <span className="text-sm font-roboto text-[#424A52]">
                              {isPackage
                                ? formatDate(pkg!.deliveredAt ?? pkg!.updatedAt)
                                : formatDate(dropoff!.appointmentDate)}
                            </span>
                          </div>

                          <div className="text-sm flex items-center justify-between font-roboto text-[#424A52]">
                            <span>
                              {isPackage ? (
                                <>Tracking: <span className="text-[#101828]">{pkg!.trackingNumber}</span></>
                              ) : (
                                <>Type: <span className="text-[#101828]">{dropoff!.type.replace('_', ' ')}</span></>
                              )}
                            </span>
                            <span className="text-[#101828] font-medium">
                              €{isPackage ? pkg!.shippingCost : '—'}
                            </span>
                          </div>

                          <div className="text-sm font-roboto text-[#6A7282]">
                            {isPackage ? pkg!.description : dropoff!.description}
                          </div>
                        </div>

                        <div className="flex sm:flex-col items-center sm:items-end gap-3">
                          <button
                            onClick={() => handleViewInvoice(item)}
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all"
                          >
                            <Download className="w-4 h-4" />
                            Invoice
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Section */}
        <div className="lg:w-1/3 w-full min-h-[673px] flex">
          <PaymentInfo />
        </div>
      </div>

      {/* ── Modals ── */}
      {isPaymentModalOpen && selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setIsPaymentModalOpen(false)}
        >
          <CompeletePayment
            item={selectedItem}
            closeModal={() => {
              setIsPaymentModalOpen(false);
              setSelectedItem(null);
            }}
          />
        </div>
      )}

      {isInvoiceModalOpen && selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setIsInvoiceModalOpen(false)}
        >
          <InvoiceModal
            item={selectedItem}
            closeModal={() => {
              setIsInvoiceModalOpen(false);
              setSelectedItem(null);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default PaymentsInvoicesPage;




// import React, { useState } from 'react';
// import { Download } from 'lucide-react';
// import PaymentInfo from './PaymentInfo';
// import CompeletePayment from './CompeletePayment';
// import InvoiceModal from './InvoiceModal';

// const PaymentsInvoicesPage: React.FC = () => {
//   const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
//   const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);

//   const pendingPayments = [
//     {
//       invoiceId: 'INV-001',
//       packageId: 'PKG-002',
//       order: 'Amazon Order #123456 - Electronics',
//       weight: '1.2 kg',
//       shippingMethod: 'Air Freight',
//       dueDate: '2025-11-18',
//       amount: '45.00'
//     },
//     {
//       invoiceId: 'INV-003',
//       packageId: 'PKG-005',
//       order: 'Amazon Order #654321 - Books',
//       weight: '2.0 kg',
//       shippingMethod: 'Air Freight',
//       dueDate: '2025-11-20',
//       amount: '60.00'
//     }
//   ];

//   const paymentHistory = [
//     {
//       invoiceId: 'INV-002',
//       packageId: 'PKG-001',
//       order: 'Amazon Order #123456',
//       paymentMethod: 'Credit Card',
//       date: '2025-11-09',
//       amount: '35.00'
//     },
//     {
//       invoiceId: 'INV-004',
//       packageId: 'PKG-003',
//       order: 'Amazon Order #789012',
//       paymentMethod: 'PayPal',
//       date: '2025-11-10',
//       amount: '50.00'
//     }
//   ];

//   return (
//     <div className="min-h-screen mt-5 mb-10">
//       {/* Page Header */}
//       <div className="mb-8">
//         <h1 className="text-base sm:text-lg md:text-xl font-semibold text-[#0A0A0A] font-arima leading-[150%] mb-2">
//           Payments & Invoices
//         </h1>
//         <p className="text-[#4A5565] font-normal font-roboto leading-[150%] text-sm sm:text-base">
//           Manage your payments and download invoices
//         </p>
//       </div>

//       <div className="flex flex-col lg:flex-row gap-6 items-stretch">
//         {/* Left Section - Payments */}
//         <div className="lg:w-2/3 w-full space-y-6">
//           {/* Pending Payments */}
//           <div>
//             <h2 className="text-base sm:text-lg md:text-xl font-normal font-roboto leading-[150%] text-[#0A0A0A] mb-6">
//               Pending Payments
//             </h2>
//             <div className="space-y-4">
//               {pendingPayments.map((payment, idx) => (
//                 <div key={idx} className="bg-white rounded-2xl border py-5 px-6 border-[#B9CEF5] shadow-sm overflow-hidden">
//                   <div className="p-5">
//                     <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
//                       <div className="flex flex-col items-start gap-3">
//                         <div>
//                           <span className="font-normal text-sm sm:text-base text-[#101828] font-roboto leading-[150%]">{payment.invoiceId}</span>
//                           <span className="px-3 py-1 bg-[#FFF7ED] text-[#F54900] rounded-full text-xs sm:text-sm font-roboto font-normal">
//                             Pending Payment
//                           </span>
//                         </div>
//                         <p className="text-gray-700 text-sm mb-4">{payment.order}</p>
//                       </div>

//                       <div className="flex flex-col sm:items-end gap-2">
//                         <span className="text-base sm:text-lg md:text-xl font-normal font-roboto leading-[150%] mb-2.5 text-[#353B42]">
//                           Amount Due: <span className="font-bold text-gray-900">{payment.amount}</span>
//                         </span>
//                         <button
//                           onClick={() => setIsPaymentModalOpen(true)}
//                           className="flex items-center justify-center gap-2 bg-[#00A63E] hover:bg-green-700 text-white px-3 py-2.5 rounded-lg text-sm sm:text-base font-medium cursor-pointer transition-all"
//                         >
//                           Pay Now
//                         </button>
//                       </div>
//                     </div>

//                     {/* Payment Details Grid */}
//                     <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
//                       <div>
//                         <p className="text-[#6A7282] text-sm sm:text-base font-normal font-roboto leading-[150%] mb-3">Package ID</p>
//                         <p className="font-normal text-sm sm:text-base leading-[150%] font-roboto text-[#4A5565]">{payment.packageId}</p>
//                       </div>
//                       <div>
//                         <p className="text-[#6A7282] text-sm sm:text-base font-normal font-roboto leading-[150%] mb-3">Weight</p>
//                         <p className="font-normal text-sm sm:text-base leading-[150%] font-roboto text-[#4A5565]">{payment.weight}</p>
//                       </div>
//                       <div>
//                         <p className="text-[#6A7282] text-sm sm:text-base font-normal font-roboto leading-[150%] mb-3">Shipping Method</p>
//                         <p className="font-normal text-sm sm:text-base leading-[150%] font-roboto text-[#4A5565]">{payment.shippingMethod}</p>
//                       </div>
//                       <div>
//                         <p className="text-[#6A7282] text-sm sm:text-base font-normal font-roboto leading-[150%] mb-3">Due Date</p>
//                         <p className="font-normal text-sm sm:text-base leading-[150%] font-roboto text-[#4A5565]">{payment.dueDate}</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Payment History */}
//           <div>
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-base sm:text-lg md:text-xl font-normal font-roboto leading-[150%] text-[#0A0A0A] ">Payment History</h2>
//               <button className="text-blue-600 hover:text-blue-700 text-base sm:text-lg md:text-xl font-normal leading-[150%] underline cursor-pointer">
//                 View All
//               </button>
//             </div>

//             <div className="space-y-4">
//               {paymentHistory.map((history, idx) => (
//                 <div key={idx} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
//                   <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
//                     <div className="flex-1 space-y-2">
//                       <div className="flex items-center justify-between gap-3">
//                         <div>
//                           <span className="text-sm sm:text-base font-normal leading-[150%] font-roboto text-[#424A52]">Invoice Id:</span>
//                           <span className="text-sm sm:text-base font-normal leading-[150%] font-roboto text-[#155DFC]">{history.invoiceId}</span>
//                         </div>
//                         <span className="text-sm sm:text-base font-normal leading-[150%] font-roboto text-[#424A52]">{history.date}</span>
//                       </div>
                      
//                       <div className="text-sm flex items-center justify-between sm:text-base font-normal leading-[150%] font-roboto text-[#424A52]">
//                         <span>Package Id: <span className="text-[#101828]">{history.packageId}</span></span>
//                         <span className=" text-[#101828]">€{history.amount}</span>
//                       </div>
                      
//                       <div className="text-sm sm:text-base leading-[150%] font-roboto text-[#6A7282]">
//                         <span>{history.order}</span>
//                       </div>
                      
//                       <div className="text-sm sm:text-base font-normal font-roboto leading-[150%] text-[#424A52]">
//                         <span>Payment Method: <span className=" text-[#4A5565]">{history.paymentMethod}</span></span>
//                       </div>
//                     </div>
//                     <div className="flex sm:flex-col items-center sm:items-end gap-3">
//                       <button
//                         onClick={() => setIsInvoiceModalOpen(true)}
//                         className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all"
//                       >
//                         <Download className="w-4 h-4" />
//                         Invoice
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         <div className="lg:w-1/3 w-full min-h-[673px] flex">
//           <PaymentInfo/>
//         </div>
//       </div>

//       {/* Modals */}
//       {isPaymentModalOpen && (
//         <div
//           className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
//           onClick={() => setIsPaymentModalOpen(false)}
//         >
//           <CompeletePayment closeModal={() => setIsPaymentModalOpen(false)} />
//         </div>
//       )}

//       {isInvoiceModalOpen && (
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

// export default PaymentsInvoicesPage;
