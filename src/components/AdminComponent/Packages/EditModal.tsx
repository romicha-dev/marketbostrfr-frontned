import React, { useState, useRef, useEffect } from "react";
import { X, ChevronDown } from "lucide-react";


export type Status =
  | "Received"
  | "Weighed - Pending Quote"
  | "Quote Sent - Pending Payment"
  | "Payment Received"
  | "In Transit"
  | "Delivered";

export interface PackageData {
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

interface EditPackageModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageData: PackageData | null;
  onSave: (data: PackageData) => void;
}

// Status badge colours — same palette as PackageTable
const statusBadgeStyle: Record<Status, string> = {
  Received: "bg-[#1068EB] text-white",
  "Weighed - Pending Quote": "bg-[#EAB308] text-white",
  "Quote Sent - Pending Payment": "bg-[#9333EA] text-white",
  "Payment Received": "bg-[#0891B2] text-white",
  "In Transit": "bg-[#EA580C] text-white",
  Delivered: "bg-[#16A34A] text-white",
};



interface CustomDropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string; badge?: string }[];
  placeholder?: string;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  value,
  onChange,
  options,
  placeholder,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selected = options.find((o) => o.value === value);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-[#EFF6FF] border-none rounded-lg px-4 py-3 text-left text-sm text-gray-700 flex items-center justify-between hover:bg-[#E0EFFF] transition-colors"
      >
        <span className="flex items-center gap-2">
          {selected?.badge && (
            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${selected.badge}`}>
              {selected.label}
            </span>
          )}
          {!selected?.badge && (
            <span className={value ? "text-gray-900" : "text-gray-400"}>
              {selected?.label ?? placeholder}
            </span>
          )}
        </span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute z-[100] w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-[#EFF6FF] transition-colors flex items-center gap-2"
            >
              {opt.badge ? (
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${opt.badge}`}>
                  {opt.label}
                </span>
              ) : (
                opt.label
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};



interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, value, onChange, placeholder = "" }) => (
  <div>
    <label className="block text-sm md:text-base font-normal font-roboto text-[#0A0A0A] mb-3 leading-[150%]">
      {label}
    </label>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-[#EFF6FF] border-none rounded-lg px-4 py-3 text-xs font-normal font-inter text-[#0A0A0A] mb-3 leading-[150%] focus:ring-2 focus:ring-blue-500 outline-none transition-all"
    />
  </div>
);



const EditPackageModal: React.FC<EditPackageModalProps> = ({
  isOpen,
  onClose,
  packageData,
  onSave,
}) => {
  const [formData, setFormData] = useState<PackageData | null>(null);
  const [isLoading, ] = useState(false);
  

  useEffect(() => {
    if (packageData) setFormData({ ...packageData });
  }, [packageData]);

  if (!isOpen || !packageData || !formData) return null;

  const handleChange = (field: keyof PackageData, value: string) => {
    setFormData((prev) => (prev ? { ...prev, [field]: value } : null));
  };

// const handleSubmit = async (e?: React.FormEvent) => {
//   if (e) e.preventDefault();
//   if (!formData) return;

//   setIsLoading(true);
//   try {
//     await onSave(formData);
//     toast.success(`Package ${formData.packageId} updated successfully!`);
//     onClose();
//   } catch {
//     toast.error("Failed to update package. Please try again.");
//   } finally {
//     setIsLoading(false);
//   }
// };

  // Status options with badge colours from the UI palette
  const statusOptions: { label: string; value: string; badge?: string }[] = [
    { label: "Received", value: "Received", badge: statusBadgeStyle["Received"] },
    { label: "Weighed - Pending Quote", value: "Weighed - Pending Quote", badge: statusBadgeStyle["Weighed - Pending Quote"] },
    { label: "Quote Sent - Pending Payment", value: "Quote Sent - Pending Payment", badge: statusBadgeStyle["Quote Sent - Pending Payment"] },
    { label: "Payment Received", value: "Payment Received", badge: statusBadgeStyle["Payment Received"] },
    { label: "In Transit", value: "In Transit", badge: statusBadgeStyle["In Transit"] },
    { label: "Delivered", value: "Delivered", badge: statusBadgeStyle["Delivered"] },
  ];

  const carrierOptions = ["Pending", "DHL", "FedEx", "UPS", "USPS"].map((v) => ({
    label: v,
    value: v,
  }));

const destinationOptions = [
  "GUADELOUPE",
  "MARTINIQUE",
  "MADAGASCAR",
  "OTHER"
].map(v => ({
  label: v,
  value: v,
}));

  const arrivedOptions = ["Order From Online", "Physical Drop off"].map((v) => ({
    label: v,
    value: v,
  }));

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-2 sm:p-4 backdrop-blur-sm transition-opacity"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[95vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex-shrink-0 border-b border-gray-100 px-6 py-5 flex items-center justify-between">
          <div>
            <h2 className="text-xl md:text-2xl font-semibold text-[#0A0A0A] font-roboto leading-[150%]">
              Edit Package — {packageData.packageId}
            </h2>
            <p className="text-sm md:text-base text-[#717182] font-normal font-roboto mt-0.5">
              {packageData.description}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          <form className="space-y-4">
            {/* Arrived by */}
            <div>
              <label className="block text-sm md:text-base font-normal font-roboto text-[#0A0A0A] leading-[150%] mb-2">
                Package Arrived by
              </label>
              <CustomDropdown
                value={formData.destination}
                options={arrivedOptions}
                onChange={(v) => handleChange("destination", v)}
                placeholder="Select arrival method"
              />
            </div>

            {/* Tracking / BL */}
            <div className="grid grid-cols-1 gap-4">
              <InputField
                label="Tracking Number"
                value={formData.trackingNumber}
                onChange={(v) => handleChange("trackingNumber", v)}
              />
              <InputField
                label="BL Number"
                value={formData.blNumber}
                onChange={(v) => handleChange("blNumber", v)}
                placeholder="Enter BL ID"
              />
            </div>

            <InputField
              label="Description"
              value={formData.description}
              onChange={(v) => handleChange("description", v)}
            />

            <InputField
              label="Weight (kg)"
              value={formData.weight}
              onChange={(v) => handleChange("weight", v)}
            />

            {/* Cost / Carrier / Destination */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <InputField
                label="Shipping Cost (€)"
                value={formData.shippingCost}
                onChange={(v) => handleChange("shippingCost", v)}
              />
              <div>
                <label className="block text-sm md:text-base font-normal font-roboto text-[#0A0A0A] leading-[150%] mb-2">
                  Carrier
                </label>
                <CustomDropdown
                  value={formData.carrier}
                  options={carrierOptions}
                  onChange={(v) => handleChange("carrier", v)}
                />
              </div>
              <div>
                <label className="block text-sm md:text-base font-normal font-roboto text-[#0A0A0A] leading-[150%] mb-2">
                  Destination
                </label>
                <CustomDropdown
                  value={formData.destination}
                  options={destinationOptions}
                  onChange={(v) => handleChange("destination", v)}
                />
              </div>
            </div>

            {/* Status — badges use the same colours as the table */}
            <div>
              <label className="block text-sm md:text-base font-normal font-roboto text-[#0A0A0A] leading-[150%] mb-2">
                Package Status
              </label>
              <CustomDropdown
                value={formData.status}
                options={statusOptions}
                onChange={(v) => handleChange("status", v as Status)}
              />
            </div>

            {/* Internal Notes */}
            <div>
              <label className="block text-sm md:text-base font-normal font-roboto text-[#0A0A0A] leading-[150%] mb-2">
                Internal Notes
              </label>
              <textarea
                value={formData.internalNotes}
                onChange={(e) => handleChange("internalNotes", e.target.value)}
                rows={3}
                placeholder="Write internal notes…"
                className="w-full bg-[#EFF6FF] border-none rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 resize-none outline-none"
              />
            </div>
          </form>

          {/* Client Info */}
          <div className="bg-[#F8FAFC] border border-gray-100 rounded-xl p-5">
            <h3 className="text-sm md:text-base font-normal font-roboto text-[#0A0A0A] mb-3 leading-[150%]">
              Client Information
            </h3>
            <div className="space-y-2">
              {[
                { label: "Client", value: formData.name },
                { label: "Client Number", value: formData.clientNumber },
                { label: "Email", value: formData.email },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center gap-2">
                  <span className="text-sm md:text-base font-normal font-roboto text-[#6A7282] mb-3 leading-[150%]">
                    {label}:
                  </span>
                  <span className="text-sm md:text-base font-normal font-roboto text-[#364153] mb-3 leading-[150%]">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 border-t border-gray-100 px-6 py-5 bg-gray-50">
          <button
             onClick={() => formData && onSave(formData)}
            className="w-full bg-[#1C60DF] text-white py-4 rounded-xl font-bold hover:bg-[#1557CC] transition-all active:scale-[0.98] shadow-lg shadow-blue-100"
          >
            {isLoading? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPackageModal;






// import React, { useState, useRef, useEffect } from 'react';
// import { X, ChevronDown } from 'lucide-react';


// export type Status =
//   | "Received"
//   | "Weighed - Pending Quote"
//   | "Quote Sent - Pending Payment"
//   | "Payment Received"
//   | "In Transit"
//   | "Delivered";


// export interface PackageData {
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

// interface EditPackageModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   packageData: PackageData | null;
//   onSave: (data: PackageData) => void;
// }


// interface CustomDropdownProps {
//   value: string;
//   onChange: (value: string) => void;
//   options: string[];
//   placeholder?: string;
// }

// const CustomDropdown: React.FC<CustomDropdownProps> = ({ value, onChange, options, placeholder }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

  

//   return (
//     <div ref={dropdownRef} className="relative">
//       <button
//         type="button"
//         onClick={() => setIsOpen(!isOpen)}
//         className="w-full bg-[#EFF6FF] border-none rounded-lg px-4 py-3 text-left text-sm text-gray-700 flex items-center justify-between hover:bg-[#E0EFFF] transition-colors"
//       >
//         <span className={value ? 'text-gray-900' : 'text-gray-400'}>
//           {value || placeholder}
//         </span>
//         <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
//       </button>

//       {isOpen && (
//         <div className="absolute z-[100] w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
//           {options.map((option) => (
//             <button
//               key={option}
//               type="button"
//               onClick={() => {
//                 onChange(option);
//                 setIsOpen(false);
//               }}
//               className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-[#EFF6FF] transition-colors"
//             >
//               {option}
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };


// interface InputFieldProps {
//   label: string;
//   value: string;
//   onChange: (value: string) => void;
//   placeholder?: string;
// }

// const InputField: React.FC<InputFieldProps> = ({ label, value, onChange, placeholder = "" }) => (
//   <div>
//     <label className="block text-sm md:text-base font-normal font-roboto text-[#0A0A0A] mb-3 leading-[150%]">
//       {label}
//     </label>
//     <input
//       type="text"
//       value={value}
//       onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
//       placeholder={placeholder}
//       className="w-full bg-[#EFF6FF] border-none rounded-lg px-4 py-3 text-xs font-normal font-inter text-[#0A0A0A] mb-3 leading-[150%] focus:ring-2 focus:ring-blue-500 outline-none transition-all"
//     />
//   </div>
// );

// const AddPackageModal: React.FC<EditPackageModalProps> = ({
//   isOpen,
//   onClose,
//   packageData,
//   onSave
// }) => {
//   const [formData, setFormData] = useState<PackageData | null>(null);

//   useEffect(() => {
//     if (packageData) {
//       setFormData({ ...packageData });
//     }
//   }, [packageData]);

//   if (!isOpen || !packageData || !formData) return null;

//   const handleSubmit = (e?: React.FormEvent) => {
//     if (e) e.preventDefault();
//     onSave(formData);
//     onClose();
//   };

//   //handleChange এর টাইপ ফিক্স
//   const handleChange = (field: keyof PackageData, value: string) => {
//     setFormData(prev => prev ? ({ ...prev, [field]: value }) : null);
//   };

//   const statusOptions = [
//     "Received",
//     "Weighed - Pending Quote",
//     "Quote Sent - Pending Payment",
//     "Payment Received",
//     "In Transit",
//     "Delivered",
//   ];

//   const carrierOptions = ["Pending", "DHL", "FedEx", "UPS", "USPS"];
//   const destinationOptions = ["Pending", "Guadeloupe", "Martinique", "France"];
//   const arrived = ["Order From Online", "Physical Drop off"];

//   return (
//     <div
//       className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-2 sm:p-4 backdrop-blur-sm transition-opacity"
//       onClick={onClose}
//     >
//       <div
//         className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[95vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
//         onClick={(e: React.MouseEvent) => e.stopPropagation()}
//       >
//         {/* Header */}
//         <div className="flex-shrink-0 border-b border-gray-100 px-6 py-5 flex items-center justify-between">
//           <div>
//             <h2 className="text-xl md:text-2xl font-semibold text-[#0A0A0A] font-roboto leading-[150%]">
//               Edit Package - {packageData.packageId}
//             </h2>
//             <p className="text-sm md:text-base  text-[#717182] font-normal font-roboto mt-0.5">{packageData.description}</p>
//           </div>
//           <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full">
//             <X className="w-5 h-5" />
//           </button>
//         </div>

//         {/* Content */}
//         <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
         

//           <form className="space-y-4">
//                  <div>
//               <label className="block text-sm md:text-base font-normal font-roboto text-[#0A0A0A]  leading-[150%] mb-2">Package Arrived by</label>
//             <CustomDropdown value={formData.destination} options={arrived} onChange={(v: string) => handleChange('destination', v)} />
//             </div>
//             <div className="grid grid-cols-1 gap-4">
//               <InputField label="Tracking Number" value={formData.trackingNumber} onChange={(v: string) => handleChange('trackingNumber', v)} />
//               <InputField label="BL Number" value={formData.blNumber} onChange={(v: string) => handleChange('blNumber', v)} placeholder="Enter BL ID" />
//             </div>

//             <InputField label="Description" value={formData.description} onChange={(v: string) => handleChange('description', v)} />

//             <div className="grid grid-cols-1  gap-4">
//                <InputField label="Weight (kg)" value={formData.weight} onChange={(v: string) => handleChange('weight', v)} />
               
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//               <InputField label="Shipping Cost (€)" value={formData.shippingCost} onChange={(v: string) => handleChange('shippingCost', v)} />
//               <div>
//                 <label className="block text-sm md:text-base font-normal font-roboto text-[#0A0A0A]  leading-[150%] mb-2">Carrier</label>
//                 <CustomDropdown value={formData.carrier} options={carrierOptions} onChange={(v: string) => handleChange('carrier', v)} />
//               </div>
//               <div>
//                 <label className="block text-sm md:text-base font-normal font-roboto text-[#0A0A0A] leading-[150%] mb-2">Destination</label>
//                 <CustomDropdown value={formData.destination} options={destinationOptions} onChange={(v: string) => handleChange('destination', v)} />
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm md:text-base font-normal font-roboto text-[#0A0A0A]  leading-[150%] mb-2">Package Status</label>
//               <CustomDropdown 
//                 value={formData.status} 
//                 options={statusOptions} 
//                 onChange={(v: string) => handleChange('status', v as Status)} 
//               />
//             </div>

//             <div>
//               <label className="block text-sm md:text-base font-normal font-roboto text-[#0A0A0A]  leading-[150%] mb-2">Internal Notes</label>
//               <textarea
//                 value={formData.internalNotes}
//                 onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleChange('internalNotes', e.target.value)}
//                 rows={3}
//                 placeholder="Write internal notes..."
//                 className="w-full bg-[#EFF6FF] border-none rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 resize-none outline-none"
//               />
//             </div>

//           </form>

//            <div className="bg-[#F8FAFC] border border-gray-100 rounded-xl p-5">
//             <h3 className="text-sm md:text-base font-normal font-roboto text-[#0A0A0A] mb-3 leading-[150%] ">Client Information</h3>
//             <div className="space-y-2">
//               <div className='flex items-center  gap-2'>
//                 <h3 className='text-sm md:text-base font-normal font-roboto text-[#6A7282] mb-3 leading-[150%]'>Client: </h3>
//                  <p className="text-sm md:text-base font-normal font-roboto text-[#364153] mb-3 leading-[150%]">{formData.name}</p>
//               </div>
//               <div className='flex items-center  gap-2'>
//                 <h3 className='text-sm md:text-base font-normal font-roboto text-[#6A7282] mb-3 leading-[150%]'>Client Number: </h3>
//                  <p className="text-sm md:text-base font-normal font-roboto text-[#364153] mb-3 leading-[150%]">{formData.clientNumber} </p>
//               </div>
//               <div className='flex items-center  gap-2'>
//                 <h3 className='text-sm md:text-base font-normal font-roboto text-[#6A7282] mb-3 leading-[150%]'>Email: </h3>
//                  <p className="text-sm md:text-base font-normal font-roboto text-[#364153] mb-3 leading-[150%]">{formData.email}</p>
//               </div>
              
            
//             </div>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="flex-shrink-0 border-t border-gray-100 px-6 py-5 bg-gray-50">
//           <button
//             onClick={handleSubmit}
//             className="w-full bg-[#1C60DF] text-white py-4 rounded-xl font-bold hover:bg-[#1557CC] transition-all active:scale-[0.98] shadow-lg shadow-blue-100"
//           >
//          Save Change
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddPackageModal;








// import React, { useState, useRef, useEffect } from 'react';
// import { X, ChevronDown } from 'lucide-react';


// export type Status =
//   | "Received"
//   | "Weighed - Pending Quote"
//   | "Quote Sent - Pending Payment"
//   | "Payment Received"
//   | "In Transit"
//   | "Delivered";

// export interface PackageData {
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

// interface EditPackageModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   packageData: PackageData | null;
//   onSave: (data: PackageData) => void;
// }


// interface CustomDropdownProps {
//   value: string;
//   onChange: (value: string) => void;
//   options: string[];
//   placeholder?: string;
// }

// const CustomDropdown: React.FC<CustomDropdownProps> = ({ value, onChange, options, placeholder }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   return (
//     <div ref={dropdownRef} className="relative">
//       <button
//         type="button"
//         onClick={() => setIsOpen(!isOpen)}
//         className="w-full bg-[#EFF6FF] border-none rounded-lg px-4 py-3 text-left text-sm text-gray-700 flex items-center justify-between hover:bg-[#E0EFFF] transition-colors"
//       >
//         <span className={value ? 'text-gray-900' : 'text-gray-400'}>
//           {value || placeholder}
//         </span>
//         <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
//       </button>

//       {isOpen && (
//         <div className="absolute z-[100] w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
//           {options.map((option) => (
//             <button
//               key={option}
//               type="button"
//               onClick={() => {
//                 onChange(option);
//                 setIsOpen(false);
//               }}
//               className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-[#EFF6FF] transition-colors"
//             >
//               {option}
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };


// interface InputFieldProps {
//   label: string;
//   value: string;
//   onChange: (value: string) => void;
//   placeholder?: string;
// }

// const InputField: React.FC<InputFieldProps> = ({ label, value, onChange, placeholder = "" }) => (
//   <div>
//     <label className="block text-sm md:text-base font-normal font-roboto text-[#0A0A0A] mb-3 leading-[150%]">
//       {label}
//     </label>
//     <input
//       type="text"
//       value={value}
//       onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
//       placeholder={placeholder}
//       className="w-full bg-[#EFF6FF] border-none rounded-lg px-4 py-3 text-xs font-normal font-inter text-[#0A0A0A] mb-3 leading-[150%] focus:ring-2 focus:ring-blue-500 outline-none transition-all"
//     />
//   </div>
// );

// const EditPackageModal: React.FC<EditPackageModalProps> = ({
//   isOpen,
//   onClose,
//   packageData,
//   onSave
// }) => {
//   const [formData, setFormData] = useState<PackageData | null>(null);

//   useEffect(() => {
//     if (packageData) {
//       setFormData({ ...packageData });
//     }
//   }, [packageData]);

//   if (!isOpen || !packageData || !formData) return null;

//   const handleSubmit = (e?: React.FormEvent) => {
//     if (e) e.preventDefault();
//     onSave(formData);
//     onClose();
//   };

//   //handleChange এর টাইপ ফিক্স
//   const handleChange = (field: keyof PackageData, value: string) => {
//     setFormData(prev => prev ? ({ ...prev, [field]: value }) : null);
//   };

//   const statusOptions = [
//     "Received",
//     "Weighed - Pending Quote",
//     "Quote Sent - Pending Payment",
//     "Payment Received",
//     "In Transit",
//     "Delivered",
//   ];

//   const carrierOptions = ["Pending", "DHL", "FedEx", "UPS", "USPS"];
//   const destinationOptions = ["Pending", "Guadeloupe", "Martinique", "France"];

//   return (
//     <div
//       className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-2 sm:p-4 backdrop-blur-sm transition-opacity"
//       onClick={onClose}
//     >
//       <div
//         className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[95vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
//         onClick={(e: React.MouseEvent) => e.stopPropagation()}
//       >
//         {/* Header */}
//         <div className="flex-shrink-0 border-b border-gray-100 px-6 py-5 flex items-center justify-between">
//           <div>
//             <h2 className="text-xl md:text-2xl font-semibold text-[#0A0A0A] font-roboto leading-[150%]">
//               Edit Package - {packageData.packageId}
//             </h2>
//             <p className="text-sm md:text-base  text-[#717182] font-normal font-roboto mt-0.5">{packageData.description}</p>
//           </div>
//           <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full">
//             <X className="w-5 h-5" />
//           </button>
//         </div>

//         {/* Content */}
//         <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
//           <div className="bg-[#F8FAFC] border border-gray-100 rounded-xl p-5">
//             <h3 className="text-sm md:text-base font-normal font-roboto text-[#0A0A0A] mb-3 leading-[150%] ">Client Information</h3>
//             <div className="space-y-2">
//               <div className='flex items-center  gap-2'>
//                 <h3 className='text-sm md:text-base font-normal font-roboto text-[#6A7282] mb-3 leading-[150%]'>Client: </h3>
//                  <p className="text-sm md:text-base font-normal font-roboto text-[#364153] mb-3 leading-[150%]">{formData.name}</p>
//               </div>
//               <div className='flex items-center  gap-2'>
//                 <h3 className='text-sm md:text-base font-normal font-roboto text-[#6A7282] mb-3 leading-[150%]'>Client Number: </h3>
//                  <p className="text-sm md:text-base font-normal font-roboto text-[#364153] mb-3 leading-[150%]">{formData.clientNumber} </p>
//               </div>
//               <div className='flex items-center  gap-2'>
//                 <h3 className='text-sm md:text-base font-normal font-roboto text-[#6A7282] mb-3 leading-[150%]'>Email: </h3>
//                  <p className="text-sm md:text-base font-normal font-roboto text-[#364153] mb-3 leading-[150%]">{formData.email}</p>
//               </div>
              
            
//             </div>
//           </div>

//           <form className="space-y-4">
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <InputField label="Tracking Number" value={formData.trackingNumber} onChange={(v: string) => handleChange('trackingNumber', v)} />
//               <InputField label="BL Number" value={formData.blNumber} onChange={(v: string) => handleChange('blNumber', v)} placeholder="Enter BL ID" />
//             </div>

//             <InputField label="Description" value={formData.description} onChange={(v: string) => handleChange('description', v)} />

//             <div className="grid grid-cols-1  gap-4">
//                <InputField label="Weight (kg)" value={formData.weight} onChange={(v: string) => handleChange('weight', v)} />
               
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//               <InputField label="Shipping Cost (€)" value={formData.shippingCost} onChange={(v: string) => handleChange('shippingCost', v)} />
//               <div>
//                 <label className="block text-sm md:text-base font-normal font-roboto text-[#0A0A0A]  leading-[150%] mb-2">Carrier</label>
//                 <CustomDropdown value={formData.carrier} options={carrierOptions} onChange={(v: string) => handleChange('carrier', v)} />
//               </div>
//               <div>
//                 <label className="block text-sm md:text-base font-normal font-roboto text-[#0A0A0A] leading-[150%] mb-2">Destination</label>
//                 <CustomDropdown value={formData.destination} options={destinationOptions} onChange={(v: string) => handleChange('destination', v)} />
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm md:text-base font-normal font-roboto text-[#0A0A0A]  leading-[150%] mb-2">Package Status</label>
//               <CustomDropdown 
//                 value={formData.status} 
//                 options={statusOptions} 
//                 onChange={(v: string) => handleChange('status', v as Status)} 
//               />
//             </div>

//             <div>
//               <label className="block text-sm md:text-base font-normal font-roboto text-[#0A0A0A]  leading-[150%] mb-2">Internal Notes</label>
//               <textarea
//                 value={formData.internalNotes}
//                 onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleChange('internalNotes', e.target.value)}
//                 rows={3}
//                 placeholder="Write internal notes..."
//                 className="w-full bg-[#EFF6FF] border-none rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 resize-none outline-none"
//               />
//             </div>
//           </form>
//         </div>

//         {/* Footer */}
//         <div className="flex-shrink-0 border-t border-gray-100 px-6 py-5 bg-gray-50">
//           <button
//             onClick={handleSubmit}
//             className="w-full bg-[#1C60DF] text-white py-4 rounded-xl font-bold hover:bg-[#1557CC] transition-all active:scale-[0.98] shadow-lg shadow-blue-100"
//           >
//             Save Changes
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditPackageModal;