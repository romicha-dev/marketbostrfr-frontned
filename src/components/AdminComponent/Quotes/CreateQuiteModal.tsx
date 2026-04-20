import React, { useEffect, useState, useCallback } from 'react';
import { X, ChevronDown, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { useCreateQuoteMutation } from '@/redux/features/admin/quotesApi';

// ─── Types ─────────────────────────────────────────────────────────────────────

interface ShippingOption {
  label: string;
  description: string;
  baseRate: number;
  fuelSurcharge: number;
  days: string;
}

interface CreateQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageData: any | null; // full pkg object from PackageAwaiting list
}

// ─── Shipping Options ───────────────────────────────────────────────────────────

const shippingOptions: ShippingOption[] = [
  { label: 'Air Freight',     description: 'Faster delivery via air',    baseRate: 12.0, fuelSurcharge: 5.57, days: '5–7 days'   },
  { label: 'Sea Freight',     description: 'Economical sea shipping',     baseRate: 8.0,  fuelSurcharge: 3.2,  days: '15–20 days' },
  { label: 'Express Courier', description: 'Premium express delivery',    baseRate: 20.0, fuelSurcharge: 8.5,  days: '1–3 days'   },
];

// ─── Toast ──────────────────────────────────────────────────────────────────────

const Toast = ({
  type,
  message,
  onClose,
}: {
  type: 'success' | 'error';
  message: string;
  onClose: () => void;
}) => {
  useEffect(() => {
    const t = setTimeout(onClose, 4000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div
      className={`fixed top-5 right-5 z-[9999] flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl text-sm font-medium
        animate-in slide-in-from-top-3 fade-in duration-300
        ${type === 'success'
          ? 'bg-white border border-green-100 text-green-700'
          : 'bg-white border border-red-100 text-red-600'
        }`}
      style={{ minWidth: 280, maxWidth: 380 }}
    >
      {type === 'success'
        ? <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
        : <XCircle    className="w-5 h-5 text-red-500 shrink-0"   />
      }
      <span className="flex-1">{message}</span>
      <button onClick={onClose} className="ml-2 opacity-40 hover:opacity-100 transition-opacity">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

// ─── Main Modal ─────────────────────────────────────────────────────────────────

const CreateQuoteModal: React.FC<CreateQuoteModalProps> = ({ isOpen, onClose, packageData }) => {
  const [selectedShipping, setSelectedShipping] = useState<ShippingOption>(shippingOptions[0]);
  const [dropdownOpen, setDropdownOpen]         = useState(false);
  const [isSubmitting, setIsSubmitting]         = useState(false);
  const [toast, setToast]                       = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const [createQuote] = useCreateQuoteMutation();

  // ── Reset on open ──
  useEffect(() => {
    if (isOpen) {
      setSelectedShipping(shippingOptions[0]);
      setDropdownOpen(false);
      setToast(null);
    }
  }, [isOpen]);

  // ── ESC key ──
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  // ── Price calc — packageData.weightKg is a string from PackageResponse ──
  const weightKg     = packageData?.weightKg ? parseFloat(packageData.weightKg) || 0 : 0;
  const weightCharge = weightKg * 5.0;
  const totalCost    = selectedShipping.baseRate + weightCharge + selectedShipping.fuelSurcharge;

  const now        = new Date();
  const validUntil = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

  // ── Submit ──
  const handleCreateQuote = useCallback(async () => {
    if (!packageData) return;
    setIsSubmitting(true);

    try {
      const payload = {
        quoteNumber:    `Q-${Date.now()}`,
        status:         'GENERATED',
        amount:         totalCost.toFixed(2),
        baseRate:       selectedShipping.baseRate.toFixed(2),
        weightCharge:   weightCharge.toFixed(2),
        fuelSurcharge:  selectedShipping.fuelSurcharge.toFixed(2),
        totalCost:      totalCost.toFixed(2),
        shippingMethod: selectedShipping.label,
        currency:       'EUR',
        notes:          selectedShipping.description,
        generatedAt:    now.toISOString(),
        sentAt:         now.toISOString(),
        validUntil:     validUntil.toISOString(),
        approvedAt:     now.toISOString(),
        packageId:      packageData.id,  // ✅ directly from the list item
      };

      await createQuote(payload).unwrap();
      setToast({ type: 'success', message: `Quote created for ${packageData.packageCode}!` });
      setTimeout(() => onClose(), 1800);

    } catch (error: any) {
      const msg =
        error?.data?.message ||
        error?.data?.error   ||
        error?.error         ||
        'Failed to create quote. Please try again.';
      setToast({ type: 'error', message: msg });
    } finally {
      setIsSubmitting(false);
    }
  }, [packageData, totalCost, selectedShipping, weightCharge, createQuote, onClose]);

  if (!isOpen || !packageData) return null;

  return (
    <>
      {toast && (
        <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />
      )}

      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200"
        onClick={onClose}
      >
        <div
          className="bg-white w-full max-w-xl max-h-[95vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex justify-between items-center px-6 py-5 border-b border-gray-100">
            <div>
              <h2 className="text-xl font-semibold text-[#0A0A0A]">Create Quote</h2>
              <p className="text-xs text-gray-400 mt-0.5">{packageData.packageCode}</p>
            </div>
            <button
              onClick={onClose}
              disabled={isSubmitting}
              className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5">

            {/* ── 1. Package Info — pre-filled from list ── */}
            <div className="bg-[#F9FAFB] rounded-xl p-5 border border-gray-100">
              <h3 className="text-xs font-semibold text-[#6A7282] uppercase tracking-wider mb-4">
                Package Information
              </h3>
              <div className="grid grid-cols-2 gap-x-4 gap-y-4">
                <InfoItem label="Package ID"    value={packageData.id}                           isLink />
                <InfoItem label="Package Code"  value={packageData.packageCode     || '—'} />
                <InfoItem label="Tracking No."  value={packageData.trackingNumber  || '—'} />
                <InfoItem label="BL Number"     value={packageData.blNumber        || '—'} />
                <InfoItem label="Carrier"       value={packageData.carrier         || '—'} />
                <InfoItem label="Destination"   value={packageData.destination     || '—'} />
                <InfoItem label="Weight"        value={packageData.weightKg ? `${packageData.weightKg} kg` : '—'} />
                <InfoItem label="Status"        value={packageData.status          || '—'} isStatus />
                {packageData.description && (
                  <div className="col-span-2">
                    <InfoItem label="Description" value={packageData.description} />
                  </div>
                )}
              </div>
            </div>

            {/* ── 2. Shipping Method ── */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#0A0A0A]">Shipping Method</label>
              <div className="relative">
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => setDropdownOpen((o) => !o)}
                  className="w-full bg-[#EFF6FF] rounded-xl px-4 py-3.5 text-sm text-gray-800 flex items-center justify-between hover:bg-[#E5F0FF] transition-colors"
                >
                  <span className="font-medium">{selectedShipping.label}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-400">{selectedShipping.days}</span>
                    <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                  </div>
                </button>

                {dropdownOpen && (
                  <div className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-xl z-20 overflow-hidden">
                    {shippingOptions.map((option) => (
                      <div
                        key={option.label}
                        onClick={() => { setSelectedShipping(option); setDropdownOpen(false); }}
                        className={`px-4 py-3.5 cursor-pointer transition-colors flex items-center justify-between
                          ${selectedShipping.label === option.label ? 'bg-[#EFF6FF]' : 'hover:bg-gray-50'}`}
                      >
                        <div>
                          <p className="text-sm font-medium text-gray-800">{option.label}</p>
                          <p className="text-xs text-gray-400 mt-0.5">{option.description} · {option.days}</p>
                        </div>
                        <span className="text-sm font-semibold text-[#1C60DF]">€{option.baseRate.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* ── 3. Payment Timeline ── */}
            <div className="bg-[#F8FAFC] rounded-xl p-5 border border-gray-100 space-y-3">
              <h3 className="text-xs font-semibold text-[#6A7282] uppercase tracking-wider mb-1">
                Payment Timeline
              </h3>

              <PriceRow label="Base Rate"     value={`€${selectedShipping.baseRate.toFixed(2)}`} />
              <PriceRow
                label={`Weight Charge${weightKg > 0 ? ` (${weightKg} kg × €5.00)` : ''}`}
                value={`€${weightCharge.toFixed(2)}`}
              />
              <PriceRow label="Fuel Surcharge" value={`€${selectedShipping.fuelSurcharge.toFixed(2)}`} />

              <div className="pt-3 border-t border-[#B9CEF5]">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-[#101828]">Total Cost</span>
                  <span className="text-lg font-bold text-[#1C60DF]">€{totalCost.toFixed(2)}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100 grid grid-cols-2 gap-3">
                <DateItem label="Generated At" date={now}        />
                <DateItem label="Valid Until"  date={validUntil} />
              </div>
            </div>

          </div>

          {/* Footer */}
          <div className="px-6 py-5 bg-white border-t border-gray-100 flex items-center justify-between gap-3">
            <button
              onClick={onClose}
              disabled={isSubmitting}
              className="px-6 py-3 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-all disabled:opacity-40"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateQuote}
              disabled={isSubmitting}
              className="flex items-center gap-2 bg-[#1C60DF] text-white px-8 py-3 rounded-xl text-sm font-medium
                hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 active:scale-[0.98]
                disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Creating…
                </>
              ) : (
                'Create & Send Quote'
              )}
            </button>
          </div>

        </div>
      </div>
    </>
  );
};

// ─── Helper Components ──────────────────────────────────────────────────────────

const statusColors: Record<string, string> = {
  PENDING:       'bg-amber-50 text-amber-600',
  PENDING_QUOTE: 'bg-orange-50 text-orange-500',
  IN_TRANSIT:    'bg-blue-50 text-blue-600',
  DELIVERED:     'bg-green-50 text-green-600',
  CANCELLED:     'bg-red-50 text-red-500',
};

const InfoItem = ({
  label,
  value,
  isLink   = false,
  isStatus = false,
}: {
  label: string;
  value: string;
  isLink?:   boolean;
  isStatus?: boolean;
}) => (
  <div className="space-y-1">
    <p className="text-xs text-[#6A7282] uppercase tracking-wider">{label}</p>
    {isStatus ? (
      <span className={`inline-block text-xs px-2.5 py-1 rounded-full font-medium ${statusColors[value] ?? 'bg-gray-100 text-gray-500'}`}>
        {value}
      </span>
    ) : (
      <p className={`text-sm font-medium truncate ${isLink ? 'text-[#1C60DF] cursor-pointer hover:underline' : 'text-[#364153]'}`}>
        {value}
      </p>
    )}
  </div>
);

const PriceRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between items-center">
    <span className="text-sm text-[#6A7282]">{label}</span>
    <span className="text-sm font-medium text-[#364153]">{value}</span>
  </div>
);

const DateItem = ({ label, date }: { label: string; date: Date }) => (
  <div className="space-y-0.5">
    <p className="text-xs text-[#6A7282] uppercase tracking-wider">{label}</p>
    <p className="text-xs font-medium text-[#364153]">
      {date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
    </p>
    <p className="text-xs text-gray-400">
      {date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
    </p>
  </div>
);

export default CreateQuoteModal;






// import React, { useEffect, useState } from 'react';
// import { X, ChevronDown } from 'lucide-react';
// import { useCreateQuoteMutation } from '@/redux/features/admin/quotesApi';

// interface CreateQuoteModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   packageData: {
//     packageId: string;
//     name: string;
//     clientNumber: string;
//     email: string;
//     weight: string;
//   } | null;
// }

// const shippingOptions = [
//   { label: "Air Freight (Faster)", description: "⚡ 5-7 days delivery, higher cost", baseRate: 12.00, fuelSurcharge: 5.57 },
//   { label: "Sea Freight (Economical)", description: "⛴️ 15-20 days delivery, lower cost", baseRate: 8.00, fuelSurcharge: 3.20 },
//   { label: "Express Courier", description: "🚀 1-3 days delivery, premium cost", baseRate: 20.00, fuelSurcharge: 8.50 },
// ];

// const CreateQuoteModal: React.FC<CreateQuoteModalProps> = ({ isOpen, onClose, packageData }) => {
//   const [selectedShipping, setSelectedShipping] = useState(shippingOptions[0]);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const [createQuote] = useCreateQuoteMutation();

//   // Calculate weight charge based on package weight
//   const calculateWeightCharge = () => {
//     if (!packageData?.weight) return 0;
//     const weight = parseFloat(packageData.weight.replace(/[^\d.]/g, ''));
//     return weight * 5.0; // €5 per kg
//   };

//   // Calculate total cost
//   const weightCharge = calculateWeightCharge();
//   const totalCost = selectedShipping.baseRate + weightCharge + selectedShipping.fuelSurcharge;

//   useEffect(() => {
//     const handleEsc = (e: KeyboardEvent) => {
//       if (e.key === 'Escape') onClose();
//     };
//     window.addEventListener('keydown', handleEsc);
//     return () => window.removeEventListener('keydown', handleEsc);
//   }, [onClose]);

// const handleCreateQuote = async () => {
//   if (!packageData) return;

//   setIsSubmitting(true);

//   try {
//     const payload = {
//       quoteNumber: `Q-${Date.now()}`,
//       status: "GENERATED",

//       amount: totalCost.toFixed(2),
//       baseRate: selectedShipping.baseRate.toFixed(2),
//       weightCharge: weightCharge.toFixed(2),
//       fuelSurcharge: selectedShipping.fuelSurcharge.toFixed(2),
//       totalCost: totalCost.toFixed(2),

//       shippingMethod: selectedShipping.label,
//       currency: "EUR",
//       notes: selectedShipping.description,

//       generatedAt: new Date().toISOString(),
//       validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),

//       packageId: packageData.packageId,
//     };

//     // 🔥 REAL API CALL
//     const res = await createQuote(payload).unwrap();

//     console.log("Quote Created ✅", res);

//     alert(`Quote created successfully for ${packageData.packageId}`);

//     onClose();

//   } catch (error) {
//     console.error("Quote creation failed ❌", error);
//     alert("Failed to create quote. Try again.");
//   } finally {
//     setIsSubmitting(false);
//   }
// };

//   if (!isOpen || !packageData) return null;

//   return (
//     <div 
//       className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200"
//       onClick={onClose}
//     >
//       <div 
//         className="bg-white w-full max-w-xl max-h-[95vh] rounded-2xl shadow-2xl overflow-hidden relative flex flex-col animate-in zoom-in-95 duration-200"
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* Header */}
//         <div className="flex justify-between items-center p-6 border-b border-gray-50">
//           <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#0A0A0A] font-roboto leading-[150%] mb-6">
//             Create Quote - {packageData.packageId}
//           </h2>
//           <button 
//             onClick={onClose} 
//             className="p-1.5 hover:bg-gray-100 rounded-full transition-colors group"
//             disabled={isSubmitting}
//           >
//             <X className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
//           </button>
//         </div>

//         {/* Scrollable Content */}
//         <div className="p-6 space-y-6 overflow-y-auto flex-1">

//           {/* Section 1: Package Information */}
//           <div className="bg-[#F9FAFB] rounded-xl p-7 border border-gray-100">
//             <h3 className="text-base sm:text-lg md:text-xl font-normal text-[#0A0A0A] mb-4 font-roboto leading-[150%]">Package Information</h3>
//             <div className="grid grid-cols-2 gap-y-5 gap-x-4">
//               <InfoItem label="Package ID" value={packageData.packageId} isLink />
//               <InfoItem label="Client" value={packageData.name} />
//               <InfoItem label="Client Number" value={packageData.clientNumber} />
//               <InfoItem label="Email" value={packageData.email} />
//               <InfoItem label="Weight" value={packageData.weight} />
//             </div>
//           </div>

//           {/* Section 2: Shipping Method Dropdown */}
//           <div className="space-y-2">
//             <label className="text-sm font-normal text-[#0A0A0A] mb-4 font-roboto leading-[150%]">Shipping Method</label>
//             <div className="relative">
//               <div 
//                 className="w-full bg-[#EFF6FF] border-none rounded-xl text-xs px-4 py-3.5 text-gray-800 flex items-center justify-between cursor-pointer group hover:bg-[#E5F0FF] transition-colors"
//                 onClick={() => !isSubmitting && setDropdownOpen(!dropdownOpen)}
//               >
//                 <span>{selectedShipping.label}</span>
//                 <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
//               </div>

//               {dropdownOpen && (
//                 <div className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-10">
//                   {shippingOptions.map((option) => (
//                     <div 
//                       key={option.label} 
//                       className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
//                       onClick={() => {
//                         setSelectedShipping(option);
//                         setDropdownOpen(false);
//                       }}
//                     >
//                       <p className="text-gray-800 font-roboto text-sm">{option.label}</p>
//                       <p className="text-gray-500 text-xs">{option.description}</p>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//             <div className="flex items-center gap-2 text-sm md:text-base leading-[120%] text-[#6A7282] font-normal pt-1">
//               <span>{selectedShipping.description}</span>
//             </div>
//           </div>

//           {/* Section 3: Payment Timeline / Price Breakdown */}
//           <div className="bg-[#F8FAFC] rounded-xl p-5 border border-gray-100 space-y-4">
//             <h3 className="text-base sm:text-lg md:text-xl font-normal text-[#0A0A0A] mb-4 font-roboto leading-[150%]">Payment Timeline</h3>
//             <div className="space-y-3">
//               <PriceRow label="Base Rate" value={`€${selectedShipping.baseRate.toFixed(2)}`} />
//               <PriceRow label={`Weight Charge (${packageData.weight})`} value={`€${weightCharge.toFixed(2)}`} />
//               <PriceRow label="Fuel Surcharge" value={`€${selectedShipping.fuelSurcharge.toFixed(2)}`} />
              
//               <div className="pt-3 border-t border-[#B9CEF5] mt-2">
//                 <div className="flex justify-between items-center">
//                   <span className="text-sm md:text-base leading-[150%] font-roboto font-normal text-[#101828]">Total Cost</span>
//                   <span className="text-sm md:text-base font-normal font-roboto text-[#101828] leading-[150%] ">€{totalCost.toFixed(2)}</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//         </div>

//         {/* Footer Actions */}
//         <div className="p-6 bg-white border-t border-gray-50">
//           <button 
//             className="w-full sm:w-auto bg-[#1C60DF] text-white px-8 py-3.5 rounded-xl font-normal font-arial leading-[150%] cursor-pointer hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
//             onClick={handleCreateQuote}
//             disabled={isSubmitting}
//           >
//             {isSubmitting ? 'Creating Quote...' : 'Create & Send Quote'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // --- Helper Components ---
// const InfoItem = ({ label, value, isLink = false }: { label: string; value: string; isLink?: boolean }) => (
//   <div className="space-y-1">
//     <p className="text-sm md:text-base text-[#6A7282] font-normal font-roboto leading-[150%] tracking-wider">{label}</p>
//     <p className={`text-sm md:text-base leading-[150%] font-roboto font-normal ${isLink ? 'text-[#1C60DF] cursor-pointer hover:underline' : 'text-[#364153]'}`}>
//       {value}
//     </p>
//   </div>
// );

// const PriceRow = ({ label, value }: { label: string; value: string }) => (
//   <div className="flex justify-between items-center">
//     <span className="text-sm md:text-base text-[#6A7282] font-normal font-roboto leading-[150%]">{label}</span>
//     <span className="text-sm md:text-base leading-[150%] font-roboto font-normal">{value}</span>
//   </div>
// );

// export default CreateQuoteModal;