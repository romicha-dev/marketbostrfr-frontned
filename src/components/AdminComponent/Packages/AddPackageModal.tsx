import React, { useState, useRef, useEffect } from 'react';
import { X, ChevronDown } from 'lucide-react';
import { useCreatePackageMutation } from '@/redux/features/clients/packageApi';
import { toast } from 'react-toastify';


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
}

interface EditPackageModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageData: PackageData | null;
  onSave: (data: PackageData) => void;
}


interface CustomDropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({ value, onChange, options, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-[#EFF6FF] border-none rounded-lg px-4 py-3 text-left text-sm text-gray-700 flex items-center justify-between hover:bg-[#E0EFFF] transition-colors"
      >
        <span className={value ? 'text-gray-900' : 'text-gray-400'}>
          {value || placeholder}
        </span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-[100] w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-[#EFF6FF] transition-colors"
            >
              {option}
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
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-[#EFF6FF] border-none rounded-lg px-4 py-3 text-xs font-normal font-inter text-[#0A0A0A] mb-3 leading-[150%] focus:ring-2 focus:ring-blue-500 outline-none transition-all"
    />
  </div>
);

const AddPackageModal: React.FC<EditPackageModalProps> = ({
  isOpen,
  onClose,
  packageData,
  // onSave
}) => {
  const [formData, setFormData] = useState<PackageData | null>(null);
   const [isLoading, setIsLoading] = useState(false);
    const [createPackage,] = useCreatePackageMutation();

  useEffect(() => {
    if (packageData) {
      setFormData({ ...packageData });
    }
  }, [packageData]);

  if (!isOpen || !packageData || !formData) return null;

  const uiStatusToBackend: Record<string, string> = {
    "Received": "RECEIVED",
    "Weighed - Pending Quote": "PENDING_QUOTE",
    "Quote Sent - Pending Payment": "QUOTED",
    "Payment Received": "PENDING_PAYMENT",
    "In Transit": "IN_TRANSIT",
    "Delivered": "DELIVERED",
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!formData) return;

    setIsLoading(true);
    try {
   await createPackage({
  packageCode: formData.packageId || `PKG-${Date.now()}`, // min 2 chars guarantee
  trackingNumber: formData.trackingNumber,
  blNumber: formData.blNumber,
  description: formData.description,
  weightKg: formData.weight.replace(/[^0-9.]/g, ""), // "2.5 kg" → "2.5"
  shippingCost: formData.shippingCost,
  carrier: formData.carrier,
  destination: formData.destination, // এখন "GUADELOUPE" etc আসবে
  status: uiStatusToBackend[formData.status] ?? "RECEIVED",
  internalNotes: formData.internalNotes,
}).unwrap();

      toast.success("Package added successfully!");
      onClose();
    } catch (error) {
      toast.error("Failed to add package. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  //handleChange 
  const handleChange = (field: keyof PackageData, value: string) => {
    setFormData(prev => prev ? ({ ...prev, [field]: value }) : null);
  };

  const statusOptions = [
    "Received",
    "Weighed - Pending Quote",
    "Quote Sent - Pending Payment",
    "Payment Received",
    "In Transit",
    "Delivered",
  ];

  const carrierOptions = ["Pending", "DHL", "FedEx", "UPS", "USPS"];
const destinationOptions = ["GUADELOUPE", "MARTINIQUE", "MADAGASCAR", "OTHER"];
  const arrived = ["Order From Online", "Physical Drop off"];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-2 sm:p-4 backdrop-blur-sm transition-opacity"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[95vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex-shrink-0 border-b border-gray-100 px-6 py-5 flex items-center justify-between">
          <div>
            <h2 className="text-xl md:text-2xl font-semibold text-[#0A0A0A] font-roboto leading-[150%]">
              Add Package  {packageData.packageId}
            </h2>
            <p className="text-sm md:text-base  text-[#717182] font-normal font-roboto mt-0.5">{packageData.description}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
         

          <form className="space-y-4">
                 <div>
              <label className="block text-sm md:text-base font-normal font-roboto text-[#0A0A0A]  leading-[150%] mb-2">Package Arrived by</label>
            <CustomDropdown value={formData.destination} options={arrived} onChange={(v: string) => handleChange('destination', v)} />
            </div>
            <div className="grid grid-cols-1 gap-4">
              <InputField label="Tracking Number" value={formData.trackingNumber} onChange={(v: string) => handleChange('trackingNumber', v)} />
              <InputField label="BL Number" value={formData.blNumber} onChange={(v: string) => handleChange('blNumber', v)} placeholder="Enter BL ID" />
            </div>

            <InputField label="Description" value={formData.description} onChange={(v: string) => handleChange('description', v)} />

            <div className="grid grid-cols-1  gap-4">
               <InputField label="Weight (kg)" value={formData.weight} onChange={(v: string) => handleChange('weight', v)} />
               
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <InputField label="Shipping Cost (€)" value={formData.shippingCost} onChange={(v: string) => handleChange('shippingCost', v)} />
              <div>
                <label className="block text-sm md:text-base font-normal font-roboto text-[#0A0A0A]  leading-[150%] mb-2">Carrier</label>
                <CustomDropdown value={formData.carrier} options={carrierOptions} onChange={(v: string) => handleChange('carrier', v)} />
              </div>
              <div>
                <label className="block text-sm md:text-base font-normal font-roboto text-[#0A0A0A] leading-[150%] mb-2">Destination</label>
                <CustomDropdown value={formData.destination} options={destinationOptions} onChange={(v: string) => handleChange('destination', v)} />
              </div>
            </div>

            <div>
              <label className="block text-sm md:text-base font-normal font-roboto text-[#0A0A0A]  leading-[150%] mb-2">Package Status</label>
              <CustomDropdown 
                value={formData.status} 
                options={statusOptions} 
                onChange={(v: string) => handleChange('status', v as Status)} 
              />
            </div>

            <div>
              <label className="block text-sm md:text-base font-normal font-roboto text-[#0A0A0A]  leading-[150%] mb-2">Internal Notes</label>
              <textarea
                value={formData.internalNotes}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleChange('internalNotes', e.target.value)}
                rows={3}
                placeholder="Write internal notes..."
                className="w-full bg-[#EFF6FF] border-none rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 resize-none outline-none"
              />
            </div>

          </form>

           <div className="bg-[#F8FAFC] border border-gray-100 rounded-xl p-5">
            <h3 className="text-sm md:text-base font-normal font-roboto text-[#0A0A0A] mb-3 leading-[150%] ">Client Information</h3>
            <div className="space-y-2">
              <div className='flex items-center  gap-2'>
                <h3 className='text-sm md:text-base font-normal font-roboto text-[#6A7282] mb-3 leading-[150%]'>Client: </h3>
                 <p className="text-sm md:text-base font-normal font-roboto text-[#364153] mb-3 leading-[150%]">{formData.name}</p>
              </div>
              <div className='flex items-center  gap-2'>
                <h3 className='text-sm md:text-base font-normal font-roboto text-[#6A7282] mb-3 leading-[150%]'>Client Number: </h3>
                 <p className="text-sm md:text-base font-normal font-roboto text-[#364153] mb-3 leading-[150%]">{formData.clientNumber} </p>
              </div>
              <div className='flex items-center  gap-2'>
                <h3 className='text-sm md:text-base font-normal font-roboto text-[#6A7282] mb-3 leading-[150%]'>Email: </h3>
                 <p className="text-sm md:text-base font-normal font-roboto text-[#364153] mb-3 leading-[150%]">{formData.email}</p>
              </div>
              
            
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 border-t border-gray-100 px-6 py-5 bg-gray-50">
          <button
            onClick={handleSubmit}
            className="w-full bg-[#1C60DF] text-white py-4 rounded-xl font-bold hover:bg-[#1557CC] transition-all active:scale-[0.98] shadow-lg shadow-blue-100"
          >
           {isLoading ? "Adding..." : "Add Package"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPackageModal;