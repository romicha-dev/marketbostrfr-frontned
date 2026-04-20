import React, { useEffect, useRef, useState } from 'react';
import { Package, Plus, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCreateAddressMutation, useGetAddressesQuery } from '@/redux/features/clients/addressApi';
import { PackageRequest, useCreatePackageMutation } from '@/redux/features/clients/packageApi';
import { toast } from 'react-toastify';

const NewPackage: React.FC = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [platform, setPlatform] = useState('');
  const [description, setDescription] = useState('');
  const [estimatedValue, setEstimatedValue] = useState('');
  const [notes, setNotes] = useState('');
  const [priority, setPriority] = useState('Fast delivery');
  const [destination, setDestination] = useState(''); 
  const [selectedAddressId, setSelectedAddressId] = useState(''); 

  const [showPlatformDropdown, setShowPlatformDropdown] = useState(false);
  const [showPriorityDropdown, setShowPriorityDropdown] = useState(false);
  const [showAddressDropdown, setShowAddressDropdown] = useState(false);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [showDestinationDropdown, setShowDestinationDropdown] = useState(false); 

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const platforms = ['Amazon', 'Shein', 'Temu', 'eBay', 'AliExpress', 'Other'];
  const priorities = ['Standard delivery', 'Fast delivery', 'Express delivery'];
  const destinations = ['GUADELOUPE', 'MARTINIQUE', 'MADAGASCAR', 'OTHER']; 

  const [createAddress] = useCreateAddressMutation();
  const [createPackage, { isLoading: isCreating }] = useCreatePackageMutation();
  const { data: addressesData } = useGetAddressesQuery();

  const [address, setAddress] = useState<string>('');
  const [newAddress, setNewAddress] = useState({
    address: '',
    postalCode: '',
    streetNo: '',
    contactPhone: '',
    isDefault: false,
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowAddressDropdown(false);
        setShowPriorityDropdown(false);
        setShowPlatformDropdown(false);
        setShowDestinationDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSaveNewAddress = async () => {
    if (!newAddress.address || !newAddress.postalCode || !newAddress.streetNo || !newAddress.contactPhone) {
      toast.error('Please fill all address fields!');
      return;
    }
    try {
      const savedAddress = await createAddress(newAddress).unwrap();
      setAddress(savedAddress.address);
      setSelectedAddressId(savedAddress.id);
      setNewAddress({ address: '', postalCode: '', streetNo: '', contactPhone: '', isDefault: false });
      setShowNewAddressForm(false);
      toast.success('Address saved!');
    } catch (err) {
      toast.error('Error saving address!');
    }
  };

  const handleSubmit = async () => {
    if (!trackingNumber || !platform || !description || !address || !destination) {
      toast.error('Please fill all required fields!');
      return;
    }

    const newPkgData: PackageRequest = {
      packageCode: `MB-${new Date().getFullYear()}-${Math.floor(Math.random() * 9000 + 1000)}`,
      trackingNumber,
      blNumber: 'Pending',
      description,
      weightKg: '0',
      shippingCost: estimatedValue || '0',
      carrier: 'Pending',
      destination, 
      status: 'PENDING_QUOTE',
      internalNotes: notes,
      ecommerceTrackingNumber: trackingNumber,
      ecommercePlatform: platform,
      estimatedValue: estimatedValue || '0',
      additionalNotes: notes,
      priorityDelivery:
        priority === 'Fast delivery' ? 'HIGH'
        : priority === 'Express delivery' ? 'EXPRESS'
        : 'STANDARD',
      declaredAt: new Date().toISOString(),
      forwardingAddressId: selectedAddressId, 
    };

    try {
      await createPackage(newPkgData).unwrap();
      toast.success('Package declared successfully!');
      navigate('/client/my-packages');
    } catch (err: any) {
      const messages = err?.data?.message;
      if (Array.isArray(messages)) {
        messages.forEach((msg: string) => toast.error(msg));
      } else {
        toast.error(messages || 'Error declaring package!');
      }
    }
  };

  return (
    <div ref={dropdownRef} className="min-h-screen">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8 md:p-10">
        {/* Info Box */}
        <div className="bg-yellow-50 border border-[#FEFCE8] rounded-xl p-4 sm:p-5 md:p-6 mb-9">
          <h3 className="font-normal font-roboto text-sm sm:text-base leading-[150%] text-[#000000] mb-2">
            Why declare your package?
          </h3>
          <p className="text-xs sm:text-sm font-roboto font-normal text-[#364153] leading-[150%]">
            When you order online, enter the e-commerce tracking number here. This helps us identify your package when it arrives at our warehouse and speeds up processing.
          </p>
        </div>

        <div className="space-y-6">
          {/* Tracking Number */}
          <div>
            <label className="block text-[#1C60DF] font-normal font-roboto mb-2 text-sm sm:text-base leading-[150%]">
              E-commerce Tracking Number
              <span className="text-[#1C60DF] font-normal font-roboto mb-2 text-xs leading-[120%]">
                (The tracking number provided by Amazon, Shein, Temu, etc.)
              </span>
            </label>
            <input
              type="text"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              placeholder="e.g., TZ999AA1012345678"
              className="w-full px-4 py-3 bg-blue-50 text-xs font-roboto text-[#80868B] border border-blue-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
            />
          </div>

          {/* Platform */}
          <div className="relative">
            <label className="block text-[#1C60DF] font-normal font-roboto mb-2 text-sm sm:text-base leading-[150%]">
              E-commerce Platform
            </label>
            <div className="relative">
              <input
                type="text"
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                onFocus={() => setShowPlatformDropdown(true)}
                placeholder="e.g., Amazon, Shein, Temu"
                className="w-full px-4 py-3 bg-blue-50 text-xs font-roboto text-[#80868B] border border-blue-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
              />
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
            {showPlatformDropdown && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                {platforms.map((p) => (
                  <button key={p} type="button"
                    onClick={() => { setPlatform(p); setShowPlatformDropdown(false); }}
                    className="w-full text-left px-4 py-2 hover:bg-blue-50 transition-colors"
                  >{p}</button>
                ))}
              </div>
            )}
          </div>

          {/* Package Description */}
          <div>
            <label className="block text-[#1C60DF] font-normal font-roboto mb-2 text-sm sm:text-base leading-[150%]">
              Package Description
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g., Electronics - Headphones and charger"
              className="w-full px-4 py-3 bg-blue-50 text-xs font-roboto text-[#80868B] border border-blue-100 rounded-lg"
            />
          </div>

          {/* Estimated Value */}
          <div>
            <label className="block text-[#1C60DF] font-normal font-roboto mb-2 text-sm sm:text-base leading-[150%]">
              Estimated Value
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">€</span>
              <input
                type="text"
                value={estimatedValue}
                onChange={(e) => setEstimatedValue(e.target.value)}
                placeholder="0.00"
                className="w-full pl-8 pr-4 py-3 bg-blue-50 text-xs font-roboto text-[#80868B] border border-blue-100 rounded-lg"
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-[#1C60DF] font-normal font-roboto mb-2 text-sm sm:text-base leading-[150%]">
              Additional Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              placeholder="Any special instructions or additional information"
              className="w-full px-4 py-3 bg-blue-50 text-xs font-roboto text-[#80868B] border border-blue-100 rounded-lg resize-none"
            />
          </div>

          {/* Priority Delivery */}
          <div className="relative">
            <label className="block text-[#1C60DF] font-normal font-roboto mb-2 text-sm sm:text-base leading-[150%]">
              Priority Delivery
            </label>
            <div className="relative cursor-pointer" onClick={() => setShowPriorityDropdown(!showPriorityDropdown)}>
              <div className="w-full px-4 py-3 bg-blue-50 text-xs font-roboto text-[#80868B] border border-blue-100 rounded-lg flex justify-between items-center">
                <span>{priority}</span>
                <ChevronDown className="w-5 h-5 text-gray-400" />
              </div>
            </div>
            {showPriorityDropdown && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                {priorities.map((p) => (
                  <button key={p} type="button"
                    onClick={() => { setPriority(p); setShowPriorityDropdown(false); }}
                    className="w-full text-left px-4 py-2 hover:bg-blue-50 transition-colors first:rounded-t-lg last:rounded-b-lg"
                  >{p}</button>
                ))}
              </div>
            )}
          </div>

          {/*  Destination Dropdown */}
          <div className="relative">
            <label className="block text-[#1C60DF] font-normal font-roboto mb-2 text-sm sm:text-base leading-[150%]">
              Destination
            </label>
            <div
              onClick={() => setShowDestinationDropdown(!showDestinationDropdown)}
              className="w-full px-4 py-3 bg-blue-50 text-xs font-roboto text-[#80868B] border border-blue-100 rounded-lg flex justify-between items-center cursor-pointer"
            >
              <span>{destination || 'Select destination'}</span>
              <ChevronDown className="w-5 h-5 text-gray-400" />
            </div>
            {showDestinationDropdown && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                {destinations.map((d) => (
                  <button key={d} type="button"
                    onClick={() => { setDestination(d); setShowDestinationDropdown(false); }}
                    className="w-full text-left px-4 py-2 hover:bg-blue-50 transition-colors first:rounded-t-lg last:rounded-b-lg"
                  >{d}</button>
                ))}
              </div>
            )}
          </div>

          {/* Forwarding Address */}
          <div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-2">
              <label className="block text-[#1C60DF] font-normal font-roboto mb-2 text-sm sm:text-base leading-[150%]">
                My forwarding address
              </label>
              <button
                type="button"
                onClick={() => setShowNewAddressForm(!showNewAddressForm)}
                className="flex items-center gap-1 bg-[#155DFC] py-2.5 px-3 text-white cursor-pointer rounded-[10px] hover:bg-blue-700 font-medium text-sm"
              >
                <Plus className="w-4 h-4" />
                Add new address
              </button>
            </div>

            <div className="relative w-full">
              <div
                onClick={() => setShowAddressDropdown(!showAddressDropdown)}
                className="w-full px-4 py-3 bg-blue-50 text-xs font-roboto text-[#80868B] border border-blue-100 rounded-lg flex justify-between items-center cursor-pointer"
              >
                <span>{address || 'Select your forwarding address'}</span>
                <ChevronDown className="w-5 h-5 text-gray-400" />
              </div>

              {showAddressDropdown && (
                <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                  {addressesData?.map((addr: any) => (
                    <button key={addr.id} type="button"
                      onClick={() => {
                        setAddress(`${addr.address}, ${addr.postalCode}, ${addr.streetNo}, ${addr.contactPhone}`);
                        setSelectedAddressId(addr.id); 
                        setShowAddressDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-blue-50 transition-colors"
                    >
                      {addr.address}, {addr.postalCode}, {addr.streetNo}, {addr.contactPhone}
                    </button>
                  ))}
                </div>
              )}

              {/* New Address Form */}
              {showNewAddressForm && (
                <div className="mt-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border border-[#1C60DF] p-5 rounded-md">
                    <div>
                      <label className="block text-[#1C60DF] font-normal font-roboto mb-2 text-sm sm:text-base leading-[150%]">Address</label>
                      <input type="text" value={newAddress.address}
                        onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                        className="w-full px-4 py-3 bg-blue-50 text-xs font-roboto text-[#80868B] border border-blue-100 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-[#1C60DF] font-normal font-roboto mb-2 text-sm sm:text-base leading-[150%]">Postal Code</label>
                      <input type="text" value={newAddress.postalCode}
                        onChange={(e) => setNewAddress({ ...newAddress, postalCode: e.target.value })}
                        className="w-full px-4 py-3 bg-blue-50 text-xs font-roboto text-[#80868B] border border-blue-100 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-[#1C60DF] font-normal font-roboto mb-2 text-sm sm:text-base leading-[150%]">Street No</label>
                      <input type="text" value={newAddress.streetNo}
                        onChange={(e) => setNewAddress({ ...newAddress, streetNo: e.target.value })}
                        className="w-full px-4 py-3 bg-blue-50 text-xs font-roboto text-[#80868B] border border-blue-100 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-[#1C60DF] font-normal font-roboto mb-2 text-sm sm:text-base leading-[150%]">Contact Phone</label>
                      <input type="text" value={newAddress.contactPhone}
                        onChange={(e) => setNewAddress({ ...newAddress, contactPhone: e.target.value })}
                        className="w-full px-4 py-3 bg-blue-50 text-xs font-roboto text-[#80868B] border border-blue-100 rounded-lg"
                      />
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button type="button" onClick={handleSaveNewAddress}
                      className="bg-[#155DFC] hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg cursor-pointer transition-colors shadow-lg shadow-blue-500/20"
                    >
                      Save Address
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={isCreating}
            className="w-full bg-[#155DFC] cursor-pointer hover:bg-blue-700 text-white font-semibold py-4 rounded-lg flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 mt-8"
          >
            <Package className="w-5 h-5" />
            {isCreating ? 'Declaring...' : 'Declare Package'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewPackage;






//  // import React, { useEffect, useRef, useState } from 'react';
// import { Package, Plus, ChevronDown } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import { useCreateAddressMutation, useGetAddressesQuery } from '@/redux/features/clients/addressApi';
// import { PackageRequest, useCreatePackageMutation } from '@/redux/features/clients/packageApi';
// import { toast } from 'react-toastify';
// import { useEffect, useRef, useState } from 'react';



// const NewPackage: React.FC = () => { 
//   const [trackingNumber, setTrackingNumber] = useState('');
//   const [platform, setPlatform] = useState('');
//   const [description, setDescription] = useState('');
//   const [estimatedValue, setEstimatedValue] = useState('');
//   const [notes, setNotes] = useState('');
//   const [priority, setPriority] = useState('Fast delivery');
//   const [showPlatformDropdown, setShowPlatformDropdown] = useState(false);
//   const [showPriorityDropdown, setShowPriorityDropdown] = useState(false);
//   const [showAddressDropdown, setShowAddressDropdown] = useState(false);
//   const [showNewAddressForm, setShowNewAddressForm] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement | null>(null);
//   const navigate = useNavigate();

//   // E-commerce platforms & priorities
//   const platforms = ['Amazon', 'Shein', 'Temu', 'eBay', 'AliExpress', 'Other'];
//   const priorities = ['Standard delivery', 'Fast delivery', 'Express delivery'];


 
//   const [createAddress] = useCreateAddressMutation();
//   const [createPackage, { isLoading: isCreating }] = useCreatePackageMutation();
//   console.log(createPackage)
//   // ধরুন তুমি RTK Query ব্যবহার করছো
// // const { data: addressesResponse } = useGetAddressesQuery();
// // const addressesData = addressesResponse?.data || [];

// const { data: addressesData, isLoading, error } = useGetAddressesQuery();

// console.log(addressesData);
//   const [address, setAddress] = useState<string>("");

//   const [newAddress, setNewAddress] = useState({
//     address: "",
//     postalCode: "",
//     streetNo: "",
//     contactPhone: "",
//     isDefault: false,
//   });

//   useEffect(() => {
//     localStorage.setItem('selectedAddress', address);
//   }, [address]);



//   // Outside click handler
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setShowAddressDropdown(false);
//         setShowPriorityDropdown(false);
//         setShowPlatformDropdown(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   // Save new address
//  const handleSaveNewAddress = async () => {
//     if (!newAddress.address || !newAddress.postalCode || !newAddress.streetNo || !newAddress.contactPhone) {
//       alert("Please fill all fields!");
//       return;
//     }

//     try {
//       const savedAddress = await createAddress(newAddress).unwrap();
//       setAddress(savedAddress.address);
//       // refetch(); // dropdown update
//       setNewAddress({ address: '', postalCode: '', streetNo: '', contactPhone: '', isDefault: false });
//       setShowNewAddressForm(false);
//     } catch (err) {
//       console.error("Failed to save address", err);
//       alert("Error saving address!");
//     }
//   };



//   // Submit package
// const handleSubmit = async () => {
//   if (!trackingNumber || !platform || !description || !address) {
//     toast.error("Please fill all required fields!");
//     return;
//   }

//   // ✅ Selected address থেকে ID নিন
//   const selectedAddr = addressesData?.find((addr: any) => 
//     `${addr.address}, ${addr.postalCode}, ${addr.streetNo}, ${addr.contactPhone}` === address
//   );

//   const newPkgData: PackageRequest = {
//     packageCode: `MB-${new Date().getFullYear()}-${Math.floor(Math.random() * 9000 + 1000)}`,
//     trackingNumber: trackingNumber,
//     blNumber: "Pending",
//     description: description,
//     weightKg: "0",           // ✅ string number দিন
//     shippingCost: estimatedValue || "0",
//     carrier: "Pending",       // ✅ simple string
//     destination: selectedAddr?.address || address,
//     status: "PENDING_QUOTE",  // ✅ backend এর exact value
//     internalNotes: notes,
//     ecommerceTrackingNumber: trackingNumber,
//     ecommercePlatform: platform,
//     estimatedValue: estimatedValue || "0",
//     additionalNotes: notes,
//     priorityDelivery: priority === "Fast delivery" ? "HIGH" 
//       : priority === "Express delivery" ? "EXPRESS" 
//       : "STANDARD",           // ✅ backend এর exact value
//     declaredAt: new Date().toISOString(),
//     forwardingAddressId: selectedAddr?.id, // ✅ address ID পাঠান
//   };

//   console.log("Sending:", newPkgData); // ✅ দেখুন কী যাচ্ছে

//   try {
//     const result = await createPackage(newPkgData).unwrap();
//     console.log("Package created:", result);
//     toast.success("Package declared successfully!");
//     navigate('/client/my-packages');
//   } catch (err: any) {
//     console.log("Error:", err);
//     const messages = err?.data?.message;
//     if (Array.isArray(messages)) {
//       messages.forEach((msg: string) => toast.error(msg));
//     } else {
//       console.log(messages)
//       toast.error(messages || "Error declaring package!");
//     }
//   }
// };

//   return (
//     <div ref={dropdownRef} className="min-h-screen">
//       <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8 md:p-10">
//         {/* Info Box */}
//         <div className="bg-yellow-50 border border-[#FEFCE8] rounded-xl p-4 sm:p-5 md:p-6 mb-9">
//           <h3 className="font-normal font-roboto text-sm sm:text-base leading-[150%] text-[#000000] mb-2">
//             Why declare your package?
//           </h3>
//           <p className="text-xs sm:text-sm font-roboto font-normal text-[#364153] leading-[150%]">
//             When you order online, enter the e-commerce tracking number here. This helps us identify your package when it arrives at our warehouse and speeds up processing.
//           </p>
//         </div>

//         {/* Form Fields */}
//         <div className="space-y-6">
//           {/* Tracking Number */}
//           <div>
//             <label className="block text-[#1C60DF] font-normal font-roboto mb-2 text-sm sm:text-base leading-[150%]">
//               E-commerce Tracking Number
//               <span className="text-[#1C60DF] font-normal font-roboto mb-2 text-xs leading-[120%]">
//                 (The tracking number provided by Amazon, Shein, Temu, etc.)
//               </span>
//             </label>
//             <input
//               type="text"
//               value={trackingNumber}
//               onChange={(e) => setTrackingNumber(e.target.value)}
//               placeholder="e.g., TZ999AA1012345678"
//               className="w-full px-4 py-3 bg-blue-50 text-xs font-roboto text-[#80868B] border border-blue-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
//             />
//           </div>

//           {/* Platform */}
//           <div className="relative">
//             <label className="block text-[#1C60DF] font-normal font-roboto mb-2 text-sm sm:text-base leading-[150%]">
//               E-commerce Platform
//             </label>
//             <div className="relative">
//               <input
//                 type="text"
//                 value={platform}
//                 onChange={(e) => setPlatform(e.target.value)}
//                 onFocus={() => setShowPlatformDropdown(true)}
//                 placeholder="e.g., Amazon, Shein, Temu"
//                 className="w-full px-4 py-3 bg-blue-50 text-xs font-roboto text-[#80868B] border border-blue-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
//               />
//               <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
//             </div>
//             {showPlatformDropdown && (
//               <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
//                 {platforms.map((p) => (
//                   <button
//                     key={p}
//                     type="button"
//                     onClick={() => { setPlatform(p); setShowPlatformDropdown(false); }}
//                     className="w-full text-left px-4 py-2 hover:bg-blue-50 transition-colors"
//                   >
//                     {p}
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Package Description */}
//           <div>
//             <label className="block text-[#1C60DF] font-normal font-roboto mb-2 text-sm sm:text-base leading-[150%]">
//               Package Description
//             </label>
//             <input
//               type="text"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               placeholder="e.g., Electronics - Headphones and charger"
//               className="w-full px-4 py-3 bg-blue-50 text-xs font-roboto text-[#80868B] border border-blue-100 rounded-lg"
//             />
//           </div>

//           {/* Estimated Value */}
//           <div>
//             <label className="block text-[#1C60DF] font-normal font-roboto mb-2 text-sm sm:text-base leading-[150%]">
//               Estimated Value
//             </label>
//             <div className="relative">
//               <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">€</span>
//               <input
//                 type="text"
//                 value={estimatedValue}
//                 onChange={(e) => setEstimatedValue(e.target.value)}
//                 placeholder="0.00"
//                 className="w-full pl-8 pr-4 py-3 bg-blue-50 text-xs font-roboto text-[#80868B] border border-blue-100 rounded-lg"
//               />
//             </div>
//           </div>

//           {/* Notes */}
//           <div>
//             <label className="block text-[#1C60DF] font-normal font-roboto mb-2 text-sm sm:text-base leading-[150%]">
//               Additional Notes
//             </label>
//             <textarea
//               value={notes}
//               onChange={(e) => setNotes(e.target.value)}
//               rows={4}
//               placeholder="Any special instructions or additional information"
//               className="w-full px-4 py-3 bg-blue-50 text-xs font-roboto text-[#80868B] border border-blue-100 rounded-lg resize-none"
//             />
//           </div>

//           {/* Priority Delivery */}
//           <div className="relative">
//             <label className="block text-[#1C60DF] font-normal font-roboto mb-2 text-sm sm:text-base leading-[150%]">
//               Priority Delivery
//             </label>
//             <div className="relative cursor-pointer" onClick={() => setShowPriorityDropdown(!showPriorityDropdown)}>
//               <div className="w-full px-4 py-3 bg-blue-50 text-xs font-roboto text-[#80868B] border border-blue-100 rounded-lg flex justify-between items-center">
//                 <span>{priority}</span>
//                 <ChevronDown className="w-5 h-5 text-gray-400" />
//               </div>
//             </div>
//             {showPriorityDropdown && (
//               <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
//                 {priorities.map((p) => (
//                   <button
//                     key={p}
//                     type="button"
//                     onClick={() => { setPriority(p); setShowPriorityDropdown(false); }}
//                     className="w-full text-left px-4 py-2 hover:bg-blue-50 transition-colors first:rounded-t-lg last:rounded-b-lg"
//                   >
//                     {p}
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Forwarding Address */}
//           <div>
//             <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-2">
//               <label className="block text-[#1C60DF] font-normal font-roboto mb-2 text-sm sm:text-base leading-[150%]">
//                 My forwarding address
//               </label>
//               <button
//                 type="button"
//                 onClick={() => setShowNewAddressForm(!showNewAddressForm)}
//                 className="flex items-center gap-1 bg-[#155DFC] py-2.5 px-3 text-white cursor-pointer rounded-[10px] hover:bg-blue-700 font-medium text-sm"
//               >
//                 <Plus className="w-4 h-4" />
//                 Add new address
//               </button>
//             </div>

//             {/* Address Dropdown */}
//            <div ref={dropdownRef} className="relative w-full">
//              <div
//   onClick={() => setShowAddressDropdown(!showAddressDropdown)}
//   className="w-full px-4 py-3 bg-blue-50 text-xs font-roboto text-[#80868B] border border-blue-100 rounded-lg flex justify-between items-center cursor-pointer"
// >
//   <span>{address || "Select your forwarding address"}</span>
//   <ChevronDown className="w-5 h-5 text-gray-400" />
// </div>

// {showAddressDropdown && (
//   <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
//     {addressesData?.map((addr: any) => (
//       <button
//         key={addr.id}
//         type="button"
//         onClick={() => {
//           setAddress(`${addr.address}, ${addr.postalCode}, ${addr.streetNo}, ${addr.contactPhone}`);
//           setShowAddressDropdown(false);
//         }}
//         className="w-full text-left px-4 py-2 hover:bg-blue-50 transition-colors"
//       >
//         {addr.address}, {addr.postalCode}, {addr.streetNo}, {addr.contactPhone}
//       </button>
//     ))}
//   </div>
// )}

//               {/* New Address Form */}
//               {showNewAddressForm && (
//                 <div className="mt-4">
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border border-[#1C60DF] p-5 rounded-md">
//                     <div>
//                       <label className="block text-[#1C60DF] font-normal font-roboto mb-2 text-sm sm:text-base leading-[150%]">Address</label>
//                       <input
//                         type="text"
//                         value={newAddress.address}
//                         onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
//                         className="w-full px-4 py-3 bg-blue-50 text-xs font-roboto text-[#80868B] border border-blue-100 rounded-lg"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-[#1C60DF] font-normal font-roboto mb-2 text-sm sm:text-base leading-[150%]">Postal Code</label>
//                       <input
//                         type="text"
//                         value={newAddress.postalCode}
//                         onChange={(e) => setNewAddress({ ...newAddress, postalCode: e.target.value })}
//                         className="w-full px-4 py-3 bg-blue-50 text-xs font-roboto text-[#80868B] border border-blue-100 rounded-lg"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-[#1C60DF] font-normal font-roboto mb-2 text-sm sm:text-base leading-[150%]">Street No</label>
//                       <input
//                         type="text"
//                         value={newAddress.streetNo}
//                         onChange={(e) => setNewAddress({ ...newAddress, streetNo: e.target.value })}
//                         className="w-full px-4 py-3 bg-blue-50 text-xs font-roboto text-[#80868B] border border-blue-100 rounded-lg"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-[#1C60DF] font-normal font-roboto mb-2 text-sm sm:text-base leading-[150%]">Contact Phone</label>
//                       <input
//                         type="text"
//                         value={newAddress.contactPhone}
//                         onChange={(e) => setNewAddress({ ...newAddress, contactPhone: e.target.value })}
//                         className="w-full px-4 py-3 bg-blue-50 text-xs font-roboto text-[#80868B] border border-blue-100 rounded-lg"
//                       />
//                     </div>
//                   </div>

//                   <div className="mt-4 flex justify-end">
//                     <button
//                       type="button"
//                       onClick={handleSaveNewAddress}
//                       className="bg-[#155DFC] hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg cursor-pointer transition-colors shadow-lg shadow-blue-500/20"
//                     >
//                       Save Address
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Submit Package */}
//           <button
//             onClick={handleSubmit}
//               disabled={isCreating}
//             className="w-full bg-[#155DFC] cursor-pointer hover:bg-blue-700 text-white font-semibold py-4 rounded-lg flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 mt-8"
//           >
//             <Package className="w-5 h-5" />
//            {isCreating ? 'Declaring...' : 'Declare Package'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NewPackage;
