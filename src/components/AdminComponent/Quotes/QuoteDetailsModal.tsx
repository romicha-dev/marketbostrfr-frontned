import React from 'react';
import { X, Send, Download, CheckCircle } from 'lucide-react';

// ── Types ──────────────────────────────────────────────────────────────────────

interface QuoteDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  paymentData: any | null; // full Quote object from backend
}

// ── Helpers ────────────────────────────────────────────────────────────────────

const fmt = (dateStr?: string | null) => {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
  });
};

const fmtAmount = (val?: string | null, currency = 'EUR') => {
  if (!val) return '—';
  return `${currency} ${parseFloat(val).toFixed(2)}`;
};

const STATUS_MAP: Record<string, { label: string; className: string }> = {
  GENERATED: { label: 'Generated', className: 'bg-blue-100 text-blue-700'      },
  PENDING:   { label: 'Pending',   className: 'bg-orange-100 text-orange-600'   },
  APPROVED:  { label: 'Approved',  className: 'bg-green-100 text-green-700'     },
  PAID:      { label: 'Paid',      className: 'bg-emerald-100 text-emerald-700' },
  REJECTED:  { label: 'Rejected',  className: 'bg-red-100 text-red-600'         },
};

// ── Sub-components ─────────────────────────────────────────────────────────────

const Row = ({ label, value }: { label: string; value?: string | null }) => (
  <div>
    <p className="text-sm text-[#6A7282] font-roboto mb-1">{label}</p>
    <p className="text-sm text-[#101828] font-roboto font-medium">{value || '—'}</p>
  </div>
);

const CostRow = ({ label, value }: { label: string; value?: string | null }) => (
  <div className="flex justify-between items-center">
    <p className="text-sm text-[#364153] font-roboto">{label}</p>
    <p className="text-sm text-[#364153] font-roboto font-medium">{value || '—'}</p>
  </div>
);

const TimelineItem = ({
  label,
  date,
  done,
}: {
  label: string;
  date?: string | null;
  done: boolean;
}) => (
  <div className="flex items-start gap-3">
    <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0
      ${done ? 'bg-green-100' : 'bg-gray-100'}`}>
      <CheckCircle className={`w-3.5 h-3.5 ${done ? 'text-green-600' : 'text-gray-300'}`} />
    </div>
    <div>
      <p className="text-sm font-medium text-[#101828] font-roboto">{label}</p>
      <p className="text-xs text-[#6A7282] font-roboto mt-0.5">{fmt(date)}</p>
    </div>
  </div>
);

// ── Main Component ─────────────────────────────────────────────────────────────

const QuoteDetails: React.FC<QuoteDetailsProps> = ({ isOpen, onClose, paymentData }) => {
  if (!isOpen || !paymentData) return null;

  // paymentData = full Quote object from backend:
  // { id, quoteNumber, status, amount, baseRate, weightCharge, fuelSurcharge,
  //   totalCost, shippingMethod, currency, notes, generatedAt, sentAt,
  //   validUntil, approvedAt, createdAt, updatedAt, packageId }

  const statusCfg = STATUS_MAP[paymentData.status] ?? {
    label: paymentData.status,
    className: 'bg-gray-100 text-gray-500',
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">

        {/* ── Header ── */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10">
          <div>
            <h2 className="text-lg font-semibold text-[#0A0A0A] font-roboto">
              Quote Details
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">{paymentData.quoteNumber}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* ── Scrollable Body ── */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">

          {/* Hero card */}
          <div className="bg-[#1956C9] rounded-xl p-6 text-white flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold font-roboto">{paymentData.quoteNumber}</h3>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusCfg.className}`}>
                  {statusCfg.label}
                </span>
              </div>
              <p className="text-sm text-[#DBEAFE]">Package: {paymentData.packageId}</p>
              <p className="text-sm text-[#DBEAFE]">Valid until: {fmt(paymentData.validUntil)}</p>
              <p className="text-sm text-[#DBEAFE]">Method: {paymentData.shippingMethod}</p>
            </div>
            <div className="flex flex-col items-start sm:items-end gap-3">
              <div className="text-right">
                <p className="text-xs text-[#DBEAFE]">Total Amount</p>
                <p className="text-2xl font-bold mt-0.5">
                  {fmtAmount(paymentData.totalCost, paymentData.currency)}
                </p>
              </div>
              <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-400 px-4 py-2 rounded-lg transition text-sm font-medium">
                <Send className="w-4 h-4" />
                Send
              </button>
            </div>
          </div>

          {/* ── Quote Info ── */}
          <Section title="Quote Information">
            <div className="grid grid-cols-2 gap-x-4 gap-y-4">
              <Row label="Quote Number"  value={paymentData.quoteNumber} />
              <Row label="Package ID"    value={paymentData.packageId}   />
              <Row label="Currency"      value={paymentData.currency}    />
              <Row label="Status"        value={statusCfg.label}         />
              {paymentData.notes && (
                <div className="col-span-2">
                  <Row label="Notes" value={paymentData.notes} />
                </div>
              )}
            </div>
          </Section>

          {/* ── Shipment Details ── */}
          <Section title="Shipment Details">
            <div className="grid grid-cols-2 gap-x-4 gap-y-4">
              <Row label="Shipping Method" value={paymentData.shippingMethod} />
              <Row label="Package ID"      value={paymentData.packageId}      />
            </div>
          </Section>

          {/* ── Cost Breakdown ── */}
          <Section title="Cost Breakdown">
            <div className="space-y-3">
              <CostRow
                label="Base Rate"
                value={paymentData.baseRate ? `€${parseFloat(paymentData.baseRate).toFixed(2)}` : null}
              />
              <CostRow
                label="Weight Charge"
                value={paymentData.weightCharge ? `€${parseFloat(paymentData.weightCharge).toFixed(2)}` : null}
              />
              <CostRow
                label="Fuel Surcharge"
                value={paymentData.fuelSurcharge ? `€${parseFloat(paymentData.fuelSurcharge).toFixed(2)}` : null}
              />
              <div className="border-t border-[#B9CEF5] pt-3">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-semibold text-[#101828]">Total Cost</p>
                  <p className="text-base font-bold text-[#1C60DF]">
                    {fmtAmount(paymentData.totalCost, paymentData.currency)}
                  </p>
                </div>
              </div>
            </div>
          </Section>

          {/* ── Quote Timeline ── */}
          <Section title="Quote Timeline">
            <div className="space-y-4">
              <TimelineItem
                label="Quote Generated"
                date={paymentData.generatedAt}
                done={!!paymentData.generatedAt}
              />
              <TimelineItem
                label="Quote Sent to Client"
                date={paymentData.sentAt}
                done={!!paymentData.sentAt}
              />
              <TimelineItem
                label="Quote Approved"
                date={paymentData.approvedAt}
                done={!!paymentData.approvedAt}
              />
              <TimelineItem
                label="Valid Until"
                date={paymentData.validUntil}
                done={false}
              />
            </div>
          </Section>

        </div>

        {/* ── Footer ── */}
        <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4 flex gap-3">
          <button className="flex-1 flex items-center justify-center gap-2 bg-[#1C60DF] hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-medium transition text-sm">
            <Send className="w-4 h-4" />
            Re-send Quote
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 px-6 py-2.5 rounded-xl font-medium border border-gray-200 transition text-sm">
            <Download className="w-4 h-4" />
            Download PDF
          </button>
        </div>

      </div>
    </div>
  );
};

// ── Section wrapper ────────────────────────────────────────────────────────────

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-[#F9FAFB] rounded-xl p-5 border border-gray-100">
    <h3 className="text-xs font-semibold text-[#6A7282] uppercase tracking-wider mb-4">{title}</h3>
    {children}
  </div>
);

export default QuoteDetails;









// import React from 'react';
// import { X,  } from 'lucide-react';

// interface PaymentData {
//   paymentId: string;
//   packageId: string;
//   clientName: string;
//   clientNumber: string;
//   amount: string;
//   method: string;
//   dueDate: string;
//   status: "Pending" | "Paid";
// }

// interface QuoteDetailsProps {
//   isOpen: boolean;
//   onClose: () => void;
//   paymentData: PaymentData | null;
// }

// const QuoteDetails: React.FC<QuoteDetailsProps> = ({ isOpen, onClose, paymentData }) => {
//   if (!isOpen || !paymentData) return null;

//   return (
//     <div  className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center p-4 z-50">
//       <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col">

//         {/* Header */}
//         <div className="sticky top-0 bg-white border-b px-4 sm:px-6 py-4 flex items-center justify-between z-10">
//           <h2 className="text-lg sm:text-xl font-normal font-roboto text-[#0A0A0A] leading-[150%]">
//             Quote Details - {paymentData.paymentId}
//           </h2>
//           <button
//             onClick={onClose}
//             className="text-gray-400 hover:text-gray-600 transition-colors"
//             aria-label="Close"
//           >
//             <X className="w-5 h-5" />
//           </button>
//         </div>

//         {/* Scrollable Content */}
//         <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">

//           {/* Quote Header Card */}
//           <div className="bg-[#1956C9] rounded-lg p-4 sm:p-6 text-white flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
//             <div className="space-y-2">
//               <h3 className="text-base sm:text-lg md:text-xl font-roboto font-normal leading-[150%]">{paymentData.paymentId}</h3>
//               <p className="text-sm md:text-sm font-normal font-roboto leading-[150%] text-[#DBEAFE] mb-3.5">Package: {paymentData.packageId}</p>
//               <p className="text-sm md:text-sm font-normal font-roboto leading-[150%] text-[#DBEAFE] mb-3.5">Valid until: {paymentData.dueDate}</p>
//             </div>
//             <div className="flex flex-col  items-start gap-4 sm:flex-col sm:items-end">
//               <div className="text-right">
//                 <p className="text-sm md:text-sm font-normal font-roboto leading-[150%] text-[#DBEAFE] mt-3 md:mt-9">{paymentData.amount}</p>
//               </div>
//               <button className="flex  items-center gap-2 bg-blue-500 hover:bg-blue-400 px-4 py-2 rounded transition-colors text-sm  sm:text-base font-normal font-roboto">
//                 Send
//               </button>
//             </div>
//           </div>

//           {/* Client Information */}
//           <div className='bg-[#F9FAFB] p-5'>
//             <h3 className="text-base sm:text-lg md:text-xl font-roboto font-normal text-[#0A0A0A] leading-[150%] mb-4">Client Information</h3>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div>
//                 <p className="text-sm md:text-base leading-[150%] font-roboto font-normal  text-[#6A7282] mb-1">Client Name</p>
//                 <p className="text-sm md:text-base leading-[150%] font-roboto font-normal  text-[#101828]">{paymentData.clientName}</p>
//               </div>
//               <div>
//                 <p className="text-sm md:text-base leading-[150%] font-roboto font-normal  text-[#6A7282]  mb-1">Client Number</p>
//                 <p className="text-sm sm:text-base text-blue-600 font-medium">{paymentData.clientNumber}</p>
//               </div>
//               <div className="sm:col-span-2">
//                 <p className="text-sm md:text-base leading-[150%] font-roboto font-normal text-[#6A7282] mb-1">Package Description</p>
//                 <p className="text-sm sm:text-base text-gray-900">Termo Electronics</p>
//               </div>
//             </div>
//           </div>

//           {/* Shipment Details */}
//           <div className='bg-[#F9FAFB] p-5'>
//             <h3 className="text-base sm:text-lg md:text-xl font-roboto font-normal text-[#0A0A0A] leading-[150%] mb-4">Shipment Details</h3>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div>
//                 <p className="text-sm md:text-base leading-[150%] font-roboto font-normal  text-[#6A7282] mb-1">Description</p>
//                 <p className="text-sm sm:text-base font-roboto font-normal leading-[150%] text-[#101828]">Shein Fashion Items</p>
//               </div>
//               <div>
//                 <p className="text-sm md:text-base leading-[150%] font-roboto font-normal  text-[#6A7282] mb-1">Destination</p>
//                 <p className="text-sm sm:text-base font-roboto font-normal leading-[150%] text-[#101828]">Guadeloupe</p>
//               </div>
//               <div>
//                 <p className="text-sm md:text-base leading-[150%] font-roboto font-normal  text-[#6A7282] mb-1">Weight</p>
//                 <p className="text-sm sm:text-base font-roboto font-normal leading-[150%] text-[#101828]">2.3 kg</p>
//               </div>
//               <div>
//                 <p className="text-sm md:text-base leading-[150%] font-roboto font-normal  text-[#6A7282] mb-1">Shipping Method</p>
//                 <p className="text-sm sm:text-base font-roboto font-normal leading-[150%] text-[#101828]">Air Freight</p>
//               </div>
//             </div>
//           </div>

//           {/* Cost Breakdown */}
//           <div className='bg-[#F9FAFB] p-5'>
//             <h3 className="text-base sm:text-lg md:text-xl font-roboto font-normal text-[#0A0A0A] leading-[150%]  mb-4">Cost Breakdown</h3>
//             <div className="space-y-3">
//               <div className="flex justify-between items-center">
//                 <p className="text-sm sm:text-base   text-[#364153] font-normal font-roboto leading-[150%]">Base Rate</p>
//                 <p className="text-sm sm:text-base   text-[#364153] font-normal font-roboto leading-[150%]">€12.00</p>
//               </div>
//               <div className="flex justify-between items-center">
//                 <p className="text-sm sm:text-base   text-[#364153] font-normal font-roboto leading-[150%]">Weight Charge (2.3 kg)</p>
//                 <p className="text-sm sm:text-base   text-[#364153] font-normal font-roboto leading-[150%]">€14.00</p>
//               </div>
//               <div className="flex justify-between items-center">
//                 <p className="text-sm sm:text-base   text-[#364153] font-normal font-roboto leading-[150%]">Fuel Surcharge</p>
//                 <p className="text-sm sm:text-base   text-[#364153] font-normal font-roboto leading-[150%]">€05.57</p>
//               </div>
//               <div className="border-t border-[#B9CEF5] pt-3 flex justify-between items-center">
//                 <p className="text-sm sm:text-base   text-[#364153] font-normal font-roboto leading-[150%]">Total Cost</p>
//                 <p className="text-sm sm:text-base   text-[#364153] font-normal font-roboto leading-[150%]">€31.57</p>
//               </div>
//             </div>
//           </div>

//           {/* Quote Timeline */}
//           <div className='bg-[#F9FAFB] p-5'>
//             <h3 className="text-base sm:text-lg md:text-xl font-roboto font-normal text-[#0A0A0A] leading-[150%] mb-4">Quote Timeline</h3>
//             <div className="space-y-3">
//               <div>
//                 <p className="text-sm md:text-base leading-snug font-normal font-roboto text-[#101828] mb-1">Quote Generated</p>
//                 <p className="text-sm sm:text-base font-normal font-roboto text-[#6A7282]">2025-12-11</p>
//               </div>
//               <div>
//                 <p className="text-sm md:text-base leading-snug font-normal font-roboto text-[#101828] mb-1">Quote Sent to Client</p>
//                 <p className="text-sm sm:text-base font-normal font-roboto text-[#6A7282]">2025-12-19</p>
//               </div>
//               <div>
//                 <a
//                   href="mailto:marie.martin@email.com"
//                   className="text-sm sm:text-base font-normal font-roboto text-[#00A63E] hover:text-green-700 "
//                 >
//                   Send to marie.martin@email.com
//                 </a>
//               </div>
//             </div>
//           </div>

//         </div>

//         {/* Footer Buttons */}
//         <div className="sticky bottom-0 bg-white  px-4 sm:px-6 py-4 flex flex-col sm:flex-row gap-3 sm:gap-4 z-10">
//           <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded font-medium transition-colors text-sm sm:text-base">
//             Re-send Quote
//           </button>
//           <button className="flex-1 bg-white hover:bg-gray-50 text-gray-700 px-6 py-2.5 rounded font-medium border border-gray-300 transition-colors text-sm sm:text-base">
//             Download PDF
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default QuoteDetails;
