import React, { useEffect, useState } from "react";
import { DollarSign, Calculator } from "lucide-react";

import { toast } from "react-toastify";
import { ShippingRate, useCreateShippingRateMutation, useGetAllShippingRatesQuery, useUpdateShippingRateMutation } from "@/redux/features/admin/settings/shippingApi";

const ShippingRates: React.FC = () => {
  const { data: rates, isLoading } = useGetAllShippingRatesQuery();
  const [createShippingRate] = useCreateShippingRateMutation();
  const [updateShippingRate] = useUpdateShippingRateMutation();

  // State for form inputs
  const [weightRate1, setWeightRate1] = useState<string>("5");
  const [weightRate2, setWeightRate2] = useState<string>("5");
  const [fuelSurcharge, setFuelSurcharge] = useState<string>("2.5");
  const [rateId, setRateId] = useState<string | null>(null);

  // Load existing rate if available
  useEffect(() => {
    if (rates && rates.length > 0) {
      const rate = rates[0]; // first rate
      setWeightRate1(rate.weightRateKg);
      setWeightRate2(rate.weightRateKg);
      setFuelSurcharge(rate.fuelSurchargePct);
      setRateId(rate.id || null);
    }
  }, [rates]);

  const handleSave = async () => {
    try {
      const payload: ShippingRate = {
        shippingMethod: "Air Freight",
        weightRateKg: weightRate1,
        fuelSurchargePct: fuelSurcharge,
      };

      if (rateId) {
        // Update existing rate
        await updateShippingRate({ id: rateId, data: payload }).unwrap();
        toast.success("Shipping rate updated successfully");
      } else {
        // Create new rate
        await createShippingRate(payload).unwrap();
        toast.success("Shipping rate created successfully");
      }
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to save shipping rate");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="w-10 h-10 border-4 border-blue-400 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-start">
      <div className="w-full bg-white rounded-lg shadow-sm p-7.5">
        {/* Header */}
        <div className="flex items-start gap-4 mb-8">
          <div className="bg-blue-50 p-3 rounded-xl">
            <DollarSign className="w-6 h-6 text-blue-500" />
          </div>
          <div className="mb-5">
            <h2 className="text-base sm:text-lg md:text-xl font-normal font-roboto leading-[150%] text-[#101828]">
              Air Freight Rates
            </h2>
            <p className="text-[#101828] text-sm sm:text-base font-normal font-roboto leading-[150%]">
              Configure rates for air freight shipping
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="space-y-3">
            <label className="block text-sm md:text-base text-[#0A0A0A] font-normal font-roboto leading-[150%]">
              Weight Rate (€/kg)
            </label>
            <input
              type="number"
              value={weightRate1}
              onChange={(e) => setWeightRate1(e.target.value)}
              className="w-full bg-[#EBF2FF] border-none rounded-md px-4 py-4 text-xs text-slate-700 focus:ring-2 focus:ring-blue-400 outline-none transition-all"
            />
          </div>
          <div className="space-y-3">
            <label className="block text-sm md:text-base text-[#0A0A0A] font-normal font-roboto leading-[150%]">
              Weight Rate (€/kg)
            </label>
            <input
              type="number"
              value={weightRate2}
              onChange={(e) => setWeightRate2(e.target.value)}
              className="w-full bg-[#EBF2FF] border-none rounded-md px-4 py-4 text-xs text-slate-700 focus:ring-2 focus:ring-blue-400 outline-none transition-all"
            />
          </div>
          <div className="space-y-3">
            <label className="block text-sm md:text-base text-[#0A0A0A] font-normal font-roboto leading-[150%]">
              Fuel Surcharge (%)
            </label>
            <input
              type="number"
              value={fuelSurcharge}
              onChange={(e) => setFuelSurcharge(e.target.value)}
              className="w-full bg-[#EBF2FF] border-none rounded-md px-4 py-4 text-xs text-slate-700 focus:ring-2 focus:ring-blue-400 outline-none transition-all"
            />
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-[#1D61F2] hover:bg-blue-700 text-white px-5 py-2.5 rounded-md font-medium text-sm cursor-pointer transition-colors shadow-sm"
        >
          <Calculator className="w-5 h-5" />
          Save rate Change
        </button>
      </div>
    </div>
  );
};

export default ShippingRates;






// import React, { useState } from 'react';
// import { DollarSign, Calculator } from 'lucide-react';

// const ShippingRates: React.FC = () => {
//   // State for the form inputs
//   const [weightRate1, setWeightRate1] = useState<string>('5');
//   const [weightRate2, setWeightRate2] = useState<string>('5');
//   const [fuelSurcharge, setFuelSurcharge] = useState<string>('2.5');

//   return (
//     <div className=" flex justify-center items-start">
//       {/* Main Card Container */}
//       <div className="w-full  bg-white rounded-lg  shadow-sm p-7.5">
        
//         {/* Header Section */}
//         <div className="flex items-start gap-4 mb-8">
//           <div className="bg-blue-50 p-3 rounded-xl">
//             <DollarSign className="w-6 h-6 text-blue-500" />
//           </div>
//           <div className='mb-5'>
//             <h2 className="text-base sm:text-lg md:text-xl font-normal font-roboto leading-[150%] text-[#101828]">Air Freight Rates</h2>
//             <p className="text-[#101828] text-sm sm:text-base font-normal font-roboto leading-[150%]">Configure rates for air freight shipping</p>
//           </div>
//         </div>

//         {/* Form Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          
//           {/* Input 1: Weight Rate */}
//           <div className="space-y-3">
//             <label className="block    text-sm md:text-base   text-[#0A0A0A] font-normal font-roboto leading-[150%]  ">
//               Weight Rate (€/kg)
//             </label>
//             <input
//               type="number"
//               value={weightRate1}
//               onChange={(e) => setWeightRate1(e.target.value)}
//               className="w-full bg-[#EBF2FF] border-none rounded-md px-4 py-4 text-xs text-slate-700 focus:ring-2 focus:ring-blue-400 outline-none transition-all"
//             />
//           </div>

//           {/* Input 2: Weight Rate (Duplicate as per image) */}
//           <div className="space-y-3">
//             <label className="block    text-sm md:text-base   text-[#0A0A0A] font-normal font-roboto leading-[150%]  ">
//               Weight Rate (€/kg)
//             </label>
//             <input
//               type="number"
//               value={weightRate2}
//               onChange={(e) => setWeightRate2(e.target.value)}
//               className="w-full bg-[#EBF2FF] border-none rounded-md px-4 py-4 text-xs text-slate-700 focus:ring-2 focus:ring-blue-400 outline-none transition-all"
//             />
//           </div>

//           {/* Input 3: Fuel Surcharge */}
//           <div className="space-y-3">
//             <label className="block    text-sm md:text-base   text-[#0A0A0A] font-normal font-roboto leading-[150%]  ">
//               Fuel Surcharge (%)
//             </label>
//             <input
//               type="number"
//               value={fuelSurcharge}
//               onChange={(e) => setFuelSurcharge(e.target.value)}
//               className="w-full bg-[#EBF2FF] border-none rounded-md px-4 py-4 text-xs text-slate-700 focus:ring-2 focus:ring-blue-400 outline-none transition-all"
//             />
//           </div>
//         </div>

//         {/* Action Button */}
//         <button className="flex items-center gap-2 bg-[#1D61F2] hover:bg-blue-700 text-white px-5 py-2.5 rounded-md font-medium text-sm cursor-pointer transition-colors shadow-sm">
//           <Calculator className="w-5 h-5" />
//           Save rate Change
//         </button>

//       </div>
//     </div>
//   );
// };

// export default ShippingRates;