import { useGetClientDashboardQuery } from "@/redux/features/clients/dashboardApi";

export const HeroSection: React.FC = () => {
  const { data, isLoading } = useGetClientDashboardQuery();

  const client = data?.client;
const shippingAddress = (data as any)?.shippingAddress;// ✅ FIXED (no array)

  console.log(client);
  console.log(shippingAddress);

  return (
    <div
      className="text-white p-6 sm:p-8 rounded-2xl shadow-xl bg-cover bg-center"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(0, 102, 219, 0.9), rgba(0, 38, 121, 0.9)), url('/images/clientArea/banerBgImg.svg')"
      }}
    >
      <div className="">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold leading-[150%] font-arima mb-2">
              Welcome Back{client?.fullName ? `, ${client.fullName}!` : '!'}
            </h1>

            <p className="text-white text-xs sm:text-sm md:text-base font-normal font-roboto leading-[150%] mb-16">
              Manage your packages, track shipments, and view your shipping history.
            </p>

            <div className="mt-8">
              <h3 className="text-base sm:text-lg md:text-xl font-normal leading-[150%] font-arima mb-4.5">
                Shipping Address
              </h3>

              {isLoading ? (
                <p className="text-blue-100 text-sm">Loading address...</p>
              ) : (
                <div className="text-blue-50">

                  {/* Client Info */}
                  <p className="font-normal text-sm sm:text-base md:text-lg mb-1">
                    {client?.fullName} - {client?.clientNumber}
                  </p>

                  {/* Company Name */}
                  <p className="font-normal text-sm sm:text-base md:text-lg mb-1">
                    {shippingAddress?.companyName}
                  </p>

                  {/* Warehouse Address */}
                  <p className="font-normal text-sm sm:text-base md:text-lg mb-1">
                    {shippingAddress?.warehouseAddress}
                  </p>

                </div>
              )}

              <p className="font-normal text-sm sm:text-base mt-3 opacity-90">
                Use this address for online shopping
              </p>
            </div>
          </div>

          {/* Client Number */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center min-w-[200px] border border-white/20">
            <p className="text-white text-base sm:text-lg md:text-xl font-semibold mb-1">
              Your Client Number
            </p>
            <p className="text-white text-base sm:text-lg md:text-xl font-normal">
              {isLoading ? "Loading..." : client?.clientNumber}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};






// import { useGetClientDashboardQuery } from "@/redux/features/clients/dashboardApi";


// export const HeroSection: React.FC = () => {
//   const { data, isLoading } = useGetClientDashboardQuery();

//   const client = data?.client;
//   const shippingAddress = data?.shippingAddresses;
//   // const defaultAddress = data?.shippingAddresses?.find(addr => addr.isDefault) 
//   //   || data?.shippingAddresses?.[0];
//     console.log(client)
//     console.log(shippingAddress)

//   return (
//     <div
//       className="text-white p-6 sm:p-8 rounded-2xl shadow-xl bg-cover bg-center"
//       style={{
//         backgroundImage:
//           "linear-gradient(to right, rgba(0, 102, 219, 0.9), rgba(0, 38, 121, 0.9)), url('/images/clientArea/banerBgImg.svg')"
//       }}
//     >
//       <div className="">
//         <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
//           <div className="flex-1">
//             <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold leading-[150%] font-arima mb-2">
//               Welcome Back{client?.fullName ? `, ${client.fullName}!` : '!'}
//             </h1>
//             <p className="text-white text-xs sm:text-sm md:text-base font-normal font-roboto leading-[150%] mb-16">
//               Manage your packages, track shipments, and view your shipping history.
//             </p>

//             <div className="mt-8">
//               <h3 className="text-base sm:text-lg md:text-xl font-normal leading-[150%] font-arima mb-4.5">
//                 Shipping Address
//               </h3>

//               {isLoading ? (
//                 <p className="text-blue-100 text-sm">Loading address...</p>
//               ) : (
//                 <div className="text-blue-50">
//                   {/* ✅ Client নাম ও client number */}
//                   <p className="font-normal text-sm sm:text-base md:text-lg leading-[150%] font-roboto mb-1">
//                     {client?.fullName} - {client?.clientNumber}
//                   </p>

//                   {/* ✅ Address */}
//                   <p className="font-normal text-sm sm:text-base md:text-lg leading-[150%] font-roboto mb-1">
//                      {shippingAddress?.compay}
//                   </p>

//                   {/* ✅ Additional Address */}
//                   {shippingAddress.additionalAddress && (
//                     <p className="font-normal text-sm sm:text-base md:text-lg leading-[150%] font-roboto mb-1">
//                           {shippingAddress?.warehouseAddress}
//                     </p>
//                   )}

//                   {/* ✅ Country & Postal Code */}
//                   {/* <p className="font-normal text-sm sm:text-base md:text-lg leading-[150%] font-roboto mb-1">
//                     {defaultAddress?.country}, {defaultAddress?.postalCode}
//                   </p> */}

//                   {/* ✅ Phone */}
//                   {/* <p className="font-normal text-sm sm:text-base md:text-lg leading-[150%] font-roboto mb-1">
//                     {defaultAddress?.contactPhone}
//                   </p> */}
//                 </div>
//               )}

//               <p className="font-normal text-sm sm:text-base text-left md:text-left font-roboto leading-[150%] mb-1 mt-3 opacity-90">
//                 Use this address for online shopping
//               </p>
//             </div>
//           </div>

//           {/* ✅ Client Number Card */}
//           <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center min-w-[200px] border border-white/20">
//             <p className="text-white text-base sm:text-lg md:text-xl font-semibold leading-[150%] font-arima mb-1">
//               Your Client Number
//             </p>
//             <p className="text-white text-base sm:text-lg md:text-xl font-normal leading-[150%] font-roboto">
//               {isLoading ? "Loading..." : client?.clientNumber}
//             </p>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };






// export const HeroSection: React.FC = () => {
//   return (
//     <div
//       className="text-white p-6 sm:p-8 rounded-2xl shadow-xl bg-cover bg-center"
//       style={{
//         // to right mane holo: left-e thakbe #0066DB ebong right-e thakbe #002679
//         backgroundImage:
//           "linear-gradient(to right, rgba(0, 102, 219, 0.9), rgba(0, 38, 121, 0.9)), url('/images/clientArea/banerBgImg.svg')"
//       }}
//     >
//       <div className="">
//         <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
//           <div className="flex-1">
//             <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold leading-[150%] font-arima mb-2">
//               Welcome Back!
//             </h1>
//             <p className="text-white text-xs sm:text-sm md:text-base font-normal font-roboto leading-[150%] mb-16">
//               Manage your packages, track shipments, and view your shipping history.
//             </p>

//             <div className="mt-8">
//               <h3 className="text-base sm:text-lg md:text-xl font-normal leading-[150%] font-arima mb-4.5">
//                 Shipping Address
//               </h3>
//               <div className="text-blue-50">
//                 <p className="font-normal text-sm sm:text-base md:text-lg leading-[150%] font-roboto mb-1">
//                   Jean Dupont - KYL-2025-000001
//                 </p>
//                 <p className="font-normal text-sm sm:text-base md:text-lg leading-[150%] font-roboto mb-1">
//                   KayLeo Logistics
//                 </p>
//                 <p className="font-normal text-sm sm:text-base md:text-lg leading-[150%] font-roboto mb-1">
//                   123 Rue Example, 75001 Paris
//                 </p>
//               </div>
//               {/* md:text-left use kora hoyeche jeno alignment thik thake */}
//               <p className="font-normal text-sm sm:text-base text-left md:text-left font-roboto leading-[150%] mb-1 mt-3 opacity-90">
//                 Use this address for online shopping
//               </p>
//             </div>
//           </div>

//           <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center min-w-[200px] border border-white/20">
//             <p className="text-white text-base sm:text-lg md:text-xl font-semibold leading-[150%] font-arima mb-1">
//               Your Client Number
//             </p>
//             <p className="text-white text-base sm:text-lg md:text-xl font-normal leading-[150%] font-roboto">
//               KYL-2025-000001
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };