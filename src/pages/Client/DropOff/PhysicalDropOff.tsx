/* eslint-disable @typescript-eslint/no-explicit-any */


import { useState } from 'react';
import { Calendar, ChevronDown, Package,  } from 'lucide-react';
import DropReminders from './Remainders';
import HomePickupReminders from './HomePickupReminders';
import img from '../../../../public/images/clientArea/dropupImg.svg'
import { useNavigate } from 'react-router-dom';
import { useCreateDropOffMutation } from '@/redux/features/clients/dropOffApi';
import { toast } from 'react-toastify';

export default function PackageBookingForm() {
  const [packageType, setPackageType] = useState('drop-off');
  const [formData, setFormData] = useState({
    date: '',
    timeSlot: '',
    packages: '1',
    description: '',
    additionalNotes: '',
    priority: 'Fast delivery',
    // Drop-off Service fields
    fullAddress: '',
    postalCode: '',
    contactPhone: '',
    // Home Pickup fields
    pickupAddress: '',
    pickupPostal: '',
    pickupStreet: '',
    pickupContactPhone: '',
  });

  const packageTypes = [
    { value: 'drop-off', label: 'Drop-off Service' },
    { value: 'home-pickup', label: 'Home Pick-up Service' },

  ];

  const timeSlots = [
    '08:00 AM - 10:00 AM',
    '10:00 AM - 12:00 PM',
    '12:00 PM - 2:00 PM',
    '2:00 PM - 4:00 PM',
    '4:00 PM - 6:00 PM',
  ];

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };



const navigate = useNavigate();
const [createDropOff, { isLoading }] = useCreateDropOffMutation();

const handleSubmit = async () => {
  if (!formData.date || !formData.timeSlot) {
    toast.error("Please select date and time slot");
    return;
  }

  // ✅ Drop-off validation
  if (packageType === 'drop-off' && (!formData.fullAddress || !formData.postalCode || !formData.contactPhone)) {
    toast.error("Please fill all address fields!");
    return;
  }

  // ✅ Home pickup validation
  if (packageType === 'home-pickup' && (!formData.pickupAddress || !formData.pickupPostal || !formData.pickupContactPhone)) {
    toast.error("Please fill all pickup address fields!");
    return;
  }

  const payload = {
    type: packageType === 'drop-off' ? 'DROP_OFF' as const : 'PICK_UP' as const,
    appointmentDate: new Date(formData.date).toISOString(),
    timeSlot: formData.timeSlot,
    packageCount: Number(formData.packages),
    description: formData.description || (packageType === 'drop-off' ? 'Drop-off Appointment' : 'Home Pickup'),
    notes: formData.additionalNotes || undefined,
    priorityDelivery: formData.priority === 'Fast delivery' ? 'FAST' as const
      : formData.priority === 'Standard delivery' ? 'STANDARD' as const
      : 'EXPRESS' as const,

    // ✅ Drop-off address
    address: packageType === 'drop-off' ? formData.fullAddress : formData.pickupAddress,
    postalCode: packageType === 'drop-off' ? formData.postalCode : formData.pickupPostal,
    additionalAddress: packageType === 'drop-off' ? undefined : formData.pickupStreet,
    contactPhone: packageType === 'drop-off' ? formData.contactPhone : formData.pickupContactPhone,
  };

  try {
    await createDropOff(payload).unwrap();
    toast.success("Appointment booked successfully!");
    navigate('/client/drop-off');
  } catch (err: any) {
    const messages = err?.data?.message;
    if (Array.isArray(messages)) {
      messages.forEach((msg: string) => toast.error(msg));
    } else {
      toast.error(messages || "Booking failed!");
    }
  }
};

  return (
    <div className="min-h-screen">

         <div className="mb-8">
          <h1 className="text-base sm:text-lg md:text-xl font-arima font-semibold text-[#0A0A0A] leading-[150%] mb-2">Physical Drop-off or Pick Up Appointments</h1>
          <p className="text-[#4A5565] text-sm sm:text-base font-normal font-roboto leading-[150%]">TSchedule a time to drop off your packages at our facility</p>
        </div>
      <div className=" grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Section - Form */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6 space-y-6">
          
          {/* Important Notice */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
            <p className="text-sm text-yellow-800 font-medium mb-1">Important</p>
            <p className="text-xs text-yellow-700">
              Please arrive within your selected time slot {packageType === 'drop-off' ? 'during your drop-off' : 'during your home pickup'} and bring a valid ID matching your Kiyo.ai account and your confirmation email.
            </p>
          </div>

          {/* Package Type Dropdown */}
          <div className="relative">
  <label className="block text-sm text-[#1C60DF] font-normal font-roboto leading-[150%] mb-2">
    Package Type
  </label>

  <select
    value={packageType}
    onChange={(e) => setPackageType(e.target.value)}
    className="w-full px-4 py-3 bg-blue-50 rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 outline-none appearance-none pr-10"
  >
    
    {packageTypes.map(type => (
      <option key={type.value} value={type.value}>
        {type.label}
      </option>
    ))}
  </select>

  {/* Custom dropdown arrow */}
  <ChevronDown
    className="absolute right-3 top-1/2 mt-4 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
  />
</div>


          {/* Show form only when package type is selected */}
          {packageType && (
            <>
              {/* Select Date */}
              <div>
                <label className="block text-sm text-[#1C60DF] font-normal font-roboto leading-[150%]   mb-2">
                  Select Date <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-blue-50 border-none rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Pick a date"
                  />
                  <Calendar className="absolute right-4 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Time Slot */}
             <div className="relative">
  <label className="block text-sm text-[#1C60DF] font-normal font-roboto leading-[150%] mb-2">
    Time Slot
  </label>

  <select
    name="timeSlot"
    value={formData.timeSlot}
    onChange={handleInputChange}
    className="w-full px-4 py-3 bg-blue-50 rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 outline-none appearance-none pr-10"
  >
    <option value="">08:11 am</option>
    {timeSlots.map((slot, idx) => (
      <option key={idx} value={slot}>{slot}</option>
    ))}
  </select>

  {/* Custom dropdown arrow */}
  <ChevronDown
    className="absolute right-3 top-1/2 mt-4 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
  />
</div>


              {/* DROP-OFF SERVICE FORM */}
              {packageType === 'drop-off' && (
                <>
                  {/* Number of Packages */}
                <div className="relative">
  <label className="block text-sm text-[#1C60DF] font-normal font-roboto leading-[150%] mb-2">
    Number of Packages <span className="text-red-500">*</span>
  </label>

  <select
    name="packages"
    value={formData.packages}
    onChange={handleInputChange}
    className="w-full px-4 py-3 bg-blue-50 rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 outline-none appearance-none pr-10"
  >
    {[1,2,3,4,5,6,7,8,9,10].map(num => (
      <option key={num} value={num}>{num}</option>
    ))}
  </select>

  {/* Custom Icon */}
  <ChevronDown 
    className="absolute right-3 top-1/2 mt-4 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
  />
</div>


                  {/* Package Description */}
                  <div>
                    <label className="block text-sm text-[#1C60DF] font-normal font-roboto leading-[150%]   mb-2">
                      Package Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="e.g., Electronics - Headphones and charger"
                      className="w-full px-4 py-3 bg-blue-50 border-none rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                      rows={3}
                    />
                  </div>

                  {/* Additional Notes */}
                  <div>
                    <label className="block text-sm text-[#1C60DF] font-normal font-roboto leading-[150%]   mb-2">
                      Additional Notes (Optional)
                    </label>
                    <textarea
                      name="additionalNotes"
                      value={formData.additionalNotes}
                      onChange={handleInputChange}
                      placeholder="This section is optional for additional information"
                      className="w-full px-4 py-3 bg-blue-50 border-none rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                      rows={3}
                    />
                  </div>

                  {/* Priority Delivery */}
               <div className="relative">
  <label className="block text-sm text-[#1C60DF] font-normal font-roboto leading-[150%] mb-2">
    Priority Delivery
  </label>

  <select
    name="priority"
    value={formData.priority}
    onChange={handleInputChange}
    className="w-full px-4 py-3 bg-blue-50 rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 outline-none appearance-none pr-10"
  >
    <option>Fast delivery</option>
    <option>Standard delivery</option>
    <option>Economy delivery</option>
  </select>

  {/* Custom Icon */}
  <ChevronDown 
    className="absolute right-3 top-1/2 mt-4  -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
  />
</div>


                  {/* Delivery Address */}
                  <div>
                    <label className="block text-sm text-[#1C60DF] font-normal font-roboto leading-[150%]   mb-2">
                      Delivery Address
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="fullAddress"
                        value={formData.fullAddress}
                        onChange={handleInputChange}
                        placeholder="Enter Address"
                        className="px-4 py-3 bg-blue-50 border-none rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                      <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        placeholder="Enter your postal code"
                        className="px-4 py-3 bg-blue-50 border-none rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                      <input
                        type="text"
                        placeholder="Enter your additional address"
                        className="px-4 py-3 bg-blue-50 border-none rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 outline-none md:col-span-2"
                      />
                      <input
                        type="tel"
                        name="contactPhone"
                        value={formData.contactPhone}
                        onChange={handleInputChange}
                        placeholder="+33 12 34 56 78"
                        className="px-4 py-3 bg-blue-50 border-none rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 outline-none md:col-span-2"
                      />
                    </div>
                  </div>

                  {/* Declare Package Button */}
                  <button 
                    onClick={handleSubmit}
                    className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
                  >
                    <Package className="w-5 h-5" />
                    {isLoading ? 'Booking...' : 'Declare Package'}
                  </button>
                </>
              )}

              {/* HOME PICKUP SERVICE FORM */}
              {packageType === 'home-pickup' && (
                <>
                  {/* Pick-up Address */}
                  <div>
                    <label className="block text-sm text-[#1C60DF] font-normal font-roboto leading-[150%]   mb-2">
                      Pick-up Address
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="pickupAddress"
                        value={formData.pickupAddress}
                        onChange={handleInputChange}
                        placeholder="Enter Address"
                        className="px-4 py-3 bg-blue-50 border-none rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                      <input
                        type="text"
                        name="pickupPostal"
                        value={formData.pickupPostal}
                        onChange={handleInputChange}
                        placeholder="Enter your postal code"
                        className="px-4 py-3 bg-blue-50 border-none rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                      <input
                        type="text"
                        name="pickupStreet"
                        value={formData.pickupStreet}
                        onChange={handleInputChange}
                        placeholder="Enter your additional address"
                        className="px-4 py-3 bg-blue-50 border-none rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 outline-none md:col-span-2"
                      />
                      <div className="md:col-span-2">
                        <label className="block text-xs text-gray-600 mb-1">
                          Contact Phone (To contact you on the day of pickup)
                        </label>
                        <input
                          type="tel"
                          name="pickupContactPhone"
                          value={formData.pickupContactPhone}
                          onChange={handleInputChange}
                          placeholder="+33 12 34 56 78"
                          className="w-full px-4 py-3 bg-blue-50 border-none rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Number of Packages */}
            <div className="relative">
  <label className="block text-sm text-[#1C60DF] font-normal font-roboto leading-[150%] mb-2">
    Number of Packages <span className="text-red-500">*</span>
  </label>

  <select
    name="packages"
    value={formData.packages}
    onChange={handleInputChange}
    className="w-full px-4 py-3 bg-blue-50 rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 outline-none appearance-none pr-10"
  >
    {[1,2,3,4,5,6,7,8,9,10].map(num => (
      <option key={num} value={num}>{num}</option>
    ))}
  </select>

  {/* Custom Icon */}
  <ChevronDown 
    className="absolute right-3 top-1/2 mt-4 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
  />
</div>


                  {/* Package Description */}
                  <div>
                    <label className="block text-sm text-[#1C60DF] font-normal font-roboto leading-[150%]   mb-2">
                      Package Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="e.g., Electronics - Headphones and charger"
                      className="w-full px-4 py-3 bg-blue-50 border-none rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                      rows={3}
                    />
                  </div>

                  {/* Confirm Pick-up Button */}
                  <button 
                    onClick={handleSubmit}
                    className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
                  >
                    <Package className="w-5 h-5" />
                     {isLoading ? 'Booking...' : 'Confirm Pick-up (10€)'}
                  </button>
                </>
              )}
            </>
          )}
        </div>

        {/* Right Section - Info Cards */}
        <div className="space-y-4">
          {/* Important Reminders */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex flex-col items-center text-center mb-4">
              <div className=" mb-3">
    <img src={img} alt="" />
              </div>
              <h3 className="font-semibold text-gray-800">Important Reminders</h3>
            </div>

            {packageType === 'drop-off' && (
             <DropReminders/>
            )}

            {packageType === 'home-pickup' && (
              <HomePickupReminders/>
            )}
          </div>

       
      

          
        </div>
      </div>
    </div>
  );
}




// import { ChevronDown, Package, Plus } from 'lucide-react';
// import React, { useEffect, useRef, useState } from 'react'
// import { useNavigate } from 'react-router-dom';
// import DropReminders from './Remainders';

// const PhysicalDropOff = () => {

//       const [trackingNumber, setTrackingNumber] = useState('');
//   const [platform, setPlatform] = useState('');
//   const [description, setDescription] = useState('');
//   const [estimatedValue, setEstimatedValue] = useState('');
//   const [notes, setNotes] = useState('');
//   const [priority, setPriority] = useState('Fast delivery');
//   const [address, setAddress] = useState('21,downtown Franch');
//   const [showPlatformDropdown, setShowPlatformDropdown] = useState(false);
//   const [showPriorityDropdown, setShowPriorityDropdown] = useState(false);
//   const [showAddressDropdown, setShowAddressDropdown] = useState(false);
//    const dropdownRef = useRef<HTMLDivElement | null>(null);


//   const packageTypes = ['Drop-off Service', 'Home Pick-up Service'];
//   const priorities = ['Standard delivery', 'Fast delivery', 'Express delivery'];
//   const addresses = ['21,downtown Franch', '15,uptown Paris', '8,suburb Lyon'];
//   const navigate = useNavigate()

//   const handleSubmit = () => {
//     navigate('/client/my-packages')
//   };

//   const [showNewAddressForm, setShowNewAddressForm] = useState(false);

// const [newAddress, setNewAddress] = useState({
//   address: "",
//   postalCode: "",
//   street: "",
//   designation: "",
// });



//       // 👉 outside click handler
// useEffect(() => {
//   const handleClickOutside = (event: MouseEvent) => {
//     if (
//       dropdownRef.current &&
//       !dropdownRef.current.contains(event.target as Node)
//     ) {
//       setShowAddressDropdown(false);
//       setShowPriorityDropdown(false);
//       setShowPlatformDropdown(false); // ✅ ADD THIS
//     }
//   };

//   document.addEventListener("mousedown", handleClickOutside);
//   return () => {
//     document.removeEventListener("mousedown", handleClickOutside);
//   };
// }, []);
//   return (
//     <div>
//        <div className="mb-8">
//           <h1 className="text-base sm:text-lg md:text-xl font-arima font-semibold text-[#0A0A0A] leading-[150%] mb-2">Physical Drop-off or Pick Up Appointments</h1>
//           <p className="text-[#4A5565] text-sm sm:text-base font-normal font-roboto leading-[150%]">chedule a time to drop off your packages at our facility</p>
//         </div>


//       <div className='flex flex-col lg:flex-row gap-6'>
//               <div  ref={dropdownRef} className="min-h-screen flex-1">
//       <div className="">
     

//         {/* Form Container */}
//         <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8 md:p-10">
//           {/* Info Box */}
//           <div className="bg-yellow-50 border border-[#F0B100] rounded-xl p-4 sm:p-5 md:p-6 mb-9">
//             <h3 className="font-normal font-roboto text-sm sm:text-base leading-[150%] text-[#000000] mb-2">
//              Important
//             </h3>
//             <p className="text-xs sm:text-sm font-roboto font-normal text-[#364153] leading-[150%]">
//              Please arrive within your selected time slot.Bring a valid ID matching your KayLeo account and your confirmation email.
//             </p>
//           </div>

//           {/* Form Fields */}
//           <div className="space-y-6">
          

//             {/* E-commerce Platform */}
//             <div className="relative">
//               <label className="block text-[#1C60DF] font-normal font-roboto mb-2 text-sm sm:text-base leading-[150%]">
//              Package Type
//               </label>
//               <div className="relative">
//                 <input
//                   type="text"
//                   value={platform}
//                   onChange={(e) => setPlatform(e.target.value)}
//                   onFocus={() => setShowPlatformDropdown(true)}
//                   onBlur={() => setTimeout(() => setShowPlatformDropdown(false), 200)}
//                   placeholder="Drop-off Service"
//                   className="w-full px-4 py-3 bg-blue-50  text-xs font-roboto font-normal leading-[150%] text-[#80868B] border border-blue-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all  placeholder-gray-400 pr-10"
//                 />
//                 <ChevronDown 
//                   className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
//                 />
//               </div>
//               {showPlatformDropdown && (
//                 <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
//                   {packageTypes.map((p) => (
//                     <button
//                       key={p}
//                       type="button"
//                       onClick={() => {
//                         setPlatform(p);
//                         setShowPlatformDropdown(false);
//                       }}
//                       className="w-full text-left px-4 py-2 hover:bg-blue-50  transition-colors"
//                     >
//                       {p}
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>
//             {/* <div className="relative">
//               <label className="block text-[#1C60DF] font-normal font-roboto mb-2 text-sm sm:text-base leading-[150%]">
//                 E-commerce Platform
//               </label>
//               <div className="relative">
//                 <input
//                   type="text"
//                   value={platform}
//                   onChange={(e) => setPlatform(e.target.value)}
//                   onFocus={() => setShowPlatformDropdown(true)}
//                   onBlur={() => setTimeout(() => setShowPlatformDropdown(false), 200)}
//                   placeholder="Drop-off Service"
//                   className="w-full px-4 py-3 bg-blue-50  text-xs font-roboto font-normal leading-[150%] text-[#80868B] border border-blue-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all  placeholder-gray-400 pr-10"
//                 />
//                 <ChevronDown 
//                   className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
//                 />
//               </div>
//               {showPlatformDropdown && (
//                 <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
//                   {packageTypes.map((p) => (
//                     <button
//                       key={p}
//                       type="button"
//                       onClick={() => {
//                         setPlatform(p);
//                         setShowPlatformDropdown(false);
//                       }}
//                       className="w-full text-left px-4 py-2 hover:bg-blue-50  transition-colors"
//                     >
//                       {p}
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div> */}

//             {/* Package Description */}
//             <div>
//               <label className="block text-[#1C60DF] font-normal font-roboto mb-2 text-sm sm:text-base leading-[150%]">
//                 Package Description
//               </label>
//               <input
//                 type="text"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 placeholder="e.g., Electronics - Headphones and charger"
//                 className="w-full px-4 py-3 bg-blue-50  text-xs font-roboto font-normal leading-[150%] text-[#80868B] border border-blue-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all  placeholder-gray-400"
//               />
//             </div>

//             {/* Estimated Value */}
//             <div>
//               <label className="block text-[#1C60DF] font-normal font-roboto mb-2 text-sm sm:text-base leading-[150%]">
//                 Estimated Value{' '}
//                 <span className="text-[#1C60DF] font-normal font-roboto mb-2 text-xs leading-[120%]">
//                   (Approximate value for insurance and customs purposes.)
//                 </span>
//               </label>
//               <div className="relative">
//                 <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
//                   €
//                 </span>
//                 <input
//                   type="text"
//                   value={estimatedValue}
//                   onChange={(e) => setEstimatedValue(e.target.value)}
//                   placeholder="0.00"
//                   className="w-full pl-8 pr-4 py-3 bg-blue-50  text-xs font-roboto font-normal leading-[150%] text-[#80868B] border border-blue-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all  placeholder-gray-400"
//                 />
//               </div>
//             </div>

//             {/* Additional Notes */}
//             <div>
//               <label className="block text-[#1C60DF] font-normal font-roboto mb-2 text-sm sm:text-base leading-[150%]">
//                 Additional Notes{' '}
//                 <span className="text-[#1C60DF] font-normal font-roboto ">(Optional)</span>
//               </label>
//               <textarea
//                 value={notes}
//                 onChange={(e) => setNotes(e.target.value)}
//                 placeholder="Any special instructions or additional information"
//                 rows={4}
//                 className="w-full px-4 py-3 bg-blue-50  text-xs font-roboto font-normal leading-[150%] text-[#80868B] border border-blue-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all  placeholder-gray-400 resize-none"
//               />
//             </div>

//             {/* Priority Delivery */}
//             <div className="relative">
//               <label className="block text-[#1C60DF] font-normal font-roboto mb-2 text-sm sm:text-base leading-[150%]">
//                 Priority Delivery
//               </label>
//               <div 
//                 className="relative cursor-pointer"
//                 onClick={() => setShowPriorityDropdown(!showPriorityDropdown)}
//               >
//                 <div className="w-full px-4 py-3 bg-blue-50  text-xs font-roboto font-normal leading-[150%] text-[#80868B] border border-blue-100 rounded-lg  flex justify-between items-center">
//                   <span>{priority}</span>
//                   <ChevronDown className="w-5 h-5 text-gray-400" />
//                 </div>
//               </div>
//               {showPriorityDropdown && (
//                 <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
//                   {priorities.map((p) => (
//                     <button
//                       key={p}
//                       type="button"
//                       onClick={() => {
//                         setPriority(p);
//                         setShowPriorityDropdown(false);
//                       }}
//                       className="w-full text-left px-4 py-2 hover:bg-blue-50  transition-colors first:rounded-t-lg last:rounded-b-lg"
//                     >
//                       {p}
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* My forwarding address */}
//             <div>
//               <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-2">
//                 <label className="block text-[#1C60DF] font-normal font-roboto mb-2 text-sm sm:text-base leading-[150%]">
//                   My forwarding address
//                 </label>
//               <button
//   type="button"
//   onClick={() => setShowNewAddressForm(!showNewAddressForm)}
//   className="flex items-center gap-1 bg-[#155DFC] py-2.5 px-3 text-white cursor-pointer rounded-[10px] hover:bg-blue-700 font-medium text-sm self-start sm:self-auto"
// >
//   <Plus className="w-4 h-4" />
//   Add new address
// </button>

//               </div>
//               <div className="relative">
//                 <div 
//                   className="relative cursor-pointer"
//                   onClick={() => setShowAddressDropdown(!showAddressDropdown)}
//                 >
//                   <div className="w-full px-4 py-3 bg-blue-50  text-xs font-roboto font-normal leading-[150%] text-[#80868B] border border-blue-100 rounded-lg  flex justify-between items-center">
//                     <span>{address}</span>
//                     <ChevronDown className="w-5 h-5 text-gray-400" />
//                   </div>
//                 </div>
//                 {showAddressDropdown && (
//                   <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
//                     {addresses.map((addr) => (
//                       <button
//                         key={addr}
//                         type="button"
//                         onClick={() => {
//                           setAddress(addr);
//                           setShowAddressDropdown(false);
//                         }}
//                         className="w-full text-left px-4 py-2 hover:bg-blue-50  transition-colors first:rounded-t-lg last:rounded-b-lg"
//                       >
//                         {addr}
//                       </button>
//                     ))}
//                   </div>
//                 )}

//                 {showNewAddressForm && (
//   <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
    
//     {/* Address */}
// <div >
//   <label className="block text-[#1C60DF] font-normal font-roboto mb-2 text-sm sm:text-base leading-[150%]"> Address</label>
//     <input
//       type="text"
//       placeholder="Address"
//       value={newAddress.address}
//       onChange={(e) =>
//         setNewAddress({ ...newAddress, address: e.target.value })
//       }
//       className="w-full px-4 py-3 bg-blue-50 text-xs font-roboto text-[#80868B] border border-blue-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//     />
// </div>

//     {/* Postal Code */}
//     <div>
//        <label className="block text-[#1C60DF] font-normal font-roboto mb-2 text-sm sm:text-base leading-[150%]"> Postal</label>
 
//     <input
//       type="text"
//       placeholder="Postal Code"
//       value={newAddress.postalCode}
//       onChange={(e) =>
//         setNewAddress({ ...newAddress, postalCode: e.target.value })
//       }
//       className="w-full px-4 py-3 bg-blue-50 text-xs font-roboto text-[#80868B] border border-blue-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//     />
//        </div>

//     {/* Street */}
//     <div>
//          <label className="block text-[#1C60DF] font-normal font-roboto mb-2 text-sm sm:text-base leading-[150%]"> Street No</label>

//     <input
//       type="text"
//       placeholder="Street"
//       value={newAddress.street}
//       onChange={(e) =>
//         setNewAddress({ ...newAddress, street: e.target.value })
//       }
//       className="w-full px-4 py-3 bg-blue-50 text-xs font-roboto text-[#80868B] border border-blue-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//     />
//    </div>
//     {/* Designation */}
//     <div> <label className="block text-[#1C60DF] font-normal font-roboto mb-2 text-sm sm:text-base leading-[150%]"> Designation</label>
//     <input
//       type="text"
//       placeholder="Designation"
//       value={newAddress.designation}
//       onChange={(e) =>
//         setNewAddress({ ...newAddress, designation: e.target.value })
//       }
//       className="w-full px-4 py-3 bg-blue-50 text-xs font-roboto text-[#80868B] border border-blue-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//     />
//     </div>
//   </div>
// )}

//               </div>
//             </div>

//             {/* Submit Button */}
//             <button
//               onClick={handleSubmit}
//               className="w-full bg-[#155DFC] cursor-pointer hover:bg-blue-700 text-white font-semibold py-4 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 mt-8"
//             >
//               <Package className="w-5 h-5" />
//               Declare Package
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//     <div className='w-full lg:w-lg'>
//         <DropReminders/>
//     </div>
//       </div>

//     </div>
//   )
// }

// export default PhysicalDropOff
