// import React, { useEffect, useState } from 'react';
// import { DollarSign, Calculator } from 'lucide-react';
// import { useGetAllCompanySettingsQuery, useUpdateCompanySettingsMutation } from '@/redux/features/admin/settingsApi';
// import { toast } from 'react-toastify';

// const CompanyInfo: React.FC = () => {
//   const { data, isLoading } = useGetAllCompanySettingsQuery();
//   const [updateCompanySettings] = useUpdateCompanySettingsMutation();

//   const company = data?.[0];

//   const [formData, setFormData] = useState({
//     companyName: "",
//     companyEmail: "",
//     companyPhone: "",
//     warehouseAddress: "",
//     supportEmail: "",
//   });

//   useEffect(() => {
//     if (company) {
//       setFormData({
//         companyName: company.companyName || "",
//         companyEmail: company.companyEmail || "",
//         companyPhone: company.companyPhone || "",
//         warehouseAddress: company.warehouseAddress || "",
//         supportEmail: company.supportEmail || "",
//       });
//     }
//   }, [company]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async () => {
//     if (!company?.id) {
//       toast.error("Company ID not found");
//       return;
//     }

//     try {
//       // ✅ Spread formData directly, no extra `data` key
//       await updateCompanySettings({ id: company.id, ...formData }).unwrap();
//       toast.success("Updated Successfully");
//     } catch (error) {
//       console.log(error);
//       toast.error("Update Failed");
//     }
//   };

//   if (isLoading) return <p>Loading...</p>;

//   return (
//     <div className="bg-slate-50 font-sans text-slate-900">
//       <main className="">
//         <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
//           <div className="flex items-start gap-4 mb-8">
//             <div className="bg-blue-50 p-3 rounded-lg">
//               <DollarSign className="w-6 h-6 text-blue-500" />
//             </div>
//             <div>
//               <h3 className="text-base sm:text-lg md:text-xl font-roboto leading-[150%] font-normal text-[#101828]">Company Information</h3>
//               <p className="text-[#101828] text-sm sm:text-base font-normal font-roboto leading-[150%]">Update company details and contact information</p>
//             </div>
//           </div>

//           <div className="space-y-6">
//             {/* Company Name */}
//             <div>
//               <label className="block text-sm md:text-base text-[#0A0A0A] font-normal font-roboto leading-[150%] mb-2">Company Name</label>
//               <input
//                 type="text"
//                 name="companyName"
//                 value={formData.companyName}
//                 onChange={handleChange}
//                 className="w-full bg-[#EBF2FF] border-none rounded-md px-4 py-4 text-xs text-[#0A0A0A] font-normal font-inter leading-[150%] focus:ring-2 focus:ring-blue-400 outline-none transition-all"
//               />
//             </div>

//             {/* Two-column */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm md:text-base text-[#0A0A0A] font-normal font-roboto leading-[150%] mb-2">Company Email</label>
//                 <input
//                   type="email"
//                   name="companyEmail"
//                   value={formData.companyEmail}
//                   onChange={handleChange}
//                   className="w-full bg-[#EBF2FF] border-none rounded-md px-4 py-4 text-xs text-[#0A0A0A] font-normal font-inter leading-[150%] focus:ring-2 focus:ring-blue-400 outline-none transition-all"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm md:text-base text-[#0A0A0A] font-normal font-roboto leading-[150%] mb-2">Company Phone</label>
//                 <input
//                   type="text"
//                   name="companyPhone"
//                   value={formData.companyPhone}
//                   onChange={handleChange}
//                   className="w-full bg-[#EBF2FF] border-none rounded-md px-4 py-4 text-xs text-[#0A0A0A] font-normal font-inter leading-[150%] focus:ring-2 focus:ring-blue-400 outline-none transition-all"
//                 />
//               </div>
//             </div>

//             {/* Warehouse Address */}
//             <div>
//               <label className="block text-sm md:text-base text-[#0A0A0A] font-normal font-roboto leading-[150%] mb-2">Warehouse Address</label>
//               <input
//                 type="text"
//                 name="warehouseAddress"
//                 value={formData.warehouseAddress}
//                 onChange={handleChange}
//                 className="w-full bg-[#EBF2FF] border-none rounded-md px-4 py-4 text-xs text-[#0A0A0A] font-normal font-inter leading-[150%] focus:ring-2 focus:ring-blue-400 outline-none transition-all"
//               />
//             </div>

//             {/* Support Email */}
//             <div>
//               <label className="block text-sm md:text-base text-[#0A0A0A] font-normal font-roboto leading-[150%] mb-2">Support Email</label>
//               <input
//                 type="email"
//                 name="supportEmail"
//                 value={formData.supportEmail}
//                 onChange={handleChange}
//                 className="w-full bg-[#EBF2FF] border-none rounded-md px-4 py-4 text-xs text-[#0A0A0A] font-normal font-inter leading-[150%] focus:ring-2 focus:ring-blue-400 outline-none transition-all"
//               />
//             </div>

//             {/* Submit Button */}
//             <div className="pt-4">
//               <button
//                 onClick={handleSubmit}
//                 className="flex items-center gap-2 bg-[#155DFC] hover:bg-blue-700 text-white px-4.5 py-2.5 rounded-md font-normal text-sm md:text-base cursor-pointer transition-colors"
//               >
//                 <Calculator className="w-5 h-5" />
//                 Save Changes
//               </button>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default CompanyInfo;





import React, { useEffect, useState } from 'react';
import { DollarSign, Calculator } from 'lucide-react';
import { useGetAllCompanySettingsQuery, useUpdateCompanySettingsMutation } from '@/redux/features/admin/settings/companyApi';
import { toast } from 'react-toastify';

const CompanyInfo: React.FC = () => {

  const { data, isLoading } = useGetAllCompanySettingsQuery();
const [updateCompanySettings] = useUpdateCompanySettingsMutation();

const company = data?.[0]; 

const [formData, setFormData] = useState({
  companyName: "",
  companyEmail: "",
  companyPhone: "",
  warehouseAddress: "",
  supportEmail: "",
});

useEffect(() => {
  if (company) {
    setFormData({
      companyName: company.companyName || "",
      companyEmail: company.companyEmail || "",
      companyPhone: company.companyPhone || "",
      warehouseAddress: company.warehouseAddress || "",
      supportEmail: company.supportEmail || "",
    });
  }
}, [company]);

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};

const handleSubmit = async () => {
  if (!company?.id) {
    toast.error("Company ID not found ");
    return;
  }

  try {
await updateCompanySettings({
  id: company.id,
  ...formData,
}).unwrap();

    toast.success("Updated Successfully ");
  } catch (error) {
    console.log(error);
    toast.error("Update Failed ");
  }
};

 if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  return (
    <div className=" bg-slate-50 font-sans text-slate-900">
  

      <main className="">


        {/* --- Company Info Card --- */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
          <div className="flex items-start gap-4 mb-8">
            <div className="bg-blue-50 p-3 rounded-lg">
              <DollarSign className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg md:text-xl font-roboto leading-[150%] font-normal text-[#101828]">Company Information</h3>
              <p className="text-[#101828] text-sm sm:text-base font-normal font-roboto leading-[150%]">Update company details and contact information</p>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            {/* Full Width Field */}
            <div>
              <label className="block text-sm md:text-base text-[#0A0A0A] font-normal font-roboto leading-[150%]   mb-2">Company Name</label>
              <input 
                type="text" 
                name="companyName"  
                value={formData.companyName}
               onChange={handleChange}
                // defaultValue="KayLeo Logistics"
                className="w-full bg-[#EBF2FF] border-none rounded-md px-4 py-4   text-xs  text-[#0A0A0A] font-normal font-inter leading-[150%] focus:ring-2 focus:ring-blue-400  transition-all  outline-none"
              />
            </div>

            {/* Two Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm md:text-base text-[#0A0A0A] font-normal font-roboto leading-[150%]   mb-2">Company Email</label>
                <input 
                  type="email" 
                  name="companyEmail"  
                  value={formData.companyEmail}
                   onChange={handleChange}
                  // defaultValue="contact@kayleo.com"
                  className="w-full bg-[#EBF2FF] border-none rounded-md px-4 py-4   focus:ring-2 focus:ring-blue-400  transition-all  text-xs  text-[#0A0A0A] font-normal font-inter leading-[150%]   outline-none"
                />
              </div>
              <div>
                <label className="block text-sm md:text-base text-[#0A0A0A] font-normal font-roboto leading-[150%]   mb-2">Company Phone</label>
                <input 
                  type="text" 
                  name="companyPhone"
                   value={formData.companyPhone}
                   onChange={handleChange}
                  // defaultValue="+33 1 23 45 67 89"
                  className="w-full bg-[#EBF2FF] border-none rounded-md px-4 py-4  focus:ring-2 focus:ring-blue-400  transition-all text-xs  text-[#0A0A0A] font-normal font-inter leading-[150%]   outline-none"
                />
              </div>
            </div>

            {/* Warehouse Address */}
            <div>
              <label className="block text-sm md:text-base text-[#0A0A0A] font-normal font-roboto leading-[150%]   mb-2">Warehouse Address</label>
              <input 
                type="text" 
                 name="warehouseAddress"
                 value={formData.warehouseAddress}
                   onChange={handleChange}
                // defaultValue="123 Rue de la Logistique, 75001 Paris, France"
                className="w-full bg-[#EBF2FF] border-none rounded-md px-4 py-4 focus:ring-2 focus:ring-blue-400  transition-all  text-xs  text-[#0A0A0A] font-normal font-inter leading-[150%]   outline-none"
              />
            </div>

            {/* Support Email */}
            <div>
              <label className="block text-sm md:text-base text-[#0A0A0A] font-normal font-roboto leading-[150%]   mb-2">Support Email</label>
              <input 
                type="email" 
                 name="supportEmail"
                 value={formData.supportEmail}
                   onChange={handleChange}
                // defaultValue="support@kayleo.com"
                className="w-full bg-[#EBF2FF] border-none rounded-md px-4 py-4  focus:ring-2 focus:ring-blue-400  transition-all text-xs  text-[#0A0A0A] font-normal font-inter leading-[150%]   outline-none"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button onClick={handleSubmit} className="flex items-center gap-2  bg-[#155DFC] hover:bg-blue-700 text-white px-4.5 py-2.5 rounded-md font-normal text-sm md:text-base cursor-pointer transition-colors">
                <Calculator className="w-5 h-5" />
               
                  {isLoading ? "Chnaging..." : " Save rate Change"}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CompanyInfo;