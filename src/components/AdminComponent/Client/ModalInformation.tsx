import React from 'react';
import { PackageCheckIcon, } from 'lucide-react';
import { Client } from '@/redux/features/admin/clientApi';


const StatCard: React.FC<{
  icon: React.ElementType;
  value: string | number;
  label: string;
  bgColor: string;
  iconColor: string;
}> = ({ icon: Icon, value, label, bgColor, iconColor }) => (
  <div className={`${bgColor} rounded-lg p-4 sm:p-6`}>
    <div className={`${iconColor} mb-3`}>
      <Icon className="w-6 h-6 sm:w-8 sm:h-8" />
    </div>
    <div className="text-2xl sm:text-3xl font-semibold text-[#101828] font-roboto mb-1">{value}</div>
    <div className="text-xs sm:text-sm text-gray-600">{label}</div>
  </div>
);

interface Props {
  clientData: Client;
}

const InformationTab: React.FC<Props> = ({ clientData }) => (
  <div className="space-y-4 sm:space-y-6">
    {/* Client Information */}
    <div className="bg-[#EFF6FF] rounded-lg p-4 sm:p-6">
      <h3 className="text-sm sm:text-base font-normal font-roboto leading-[150%] text-gray-900 mb-4">
        Client Information
      </h3>
      <div className="space-y-3">
        {[
          { label: 'Client', value: clientData.fullName, valueColor: 'text-[#364153]' },
          { label: 'Client Number', value: clientData.clientNumber, valueColor: 'text-[#6A7282]' },
          { label: 'Phone Number', value: clientData.phone, valueColor: 'text-[#101828]' },
          { label: 'Email', value: clientData.email, valueColor: 'text-[#364153]' },
        ].map(({ label, value, valueColor }) => (
          <div key={label} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
            <span className="text-sm sm:text-base text-[#6A7282] font-roboto leading-[150%] min-w-[140px]">
              {label}:
            </span>
            <span className={`text-sm sm:text-base font-normal font-roboto leading-[150%] ${valueColor}`}>
              {value || '—'}
            </span>
          </div>
        ))}
      </div>
    </div>

    {/* Delivery Address */}
    <div className="bg-gray-50 rounded-lg p-4 border border-[#BEDBFF] sm:p-6">
      <h3 className="text-sm sm:text-base font-normal font-roboto leading-[150%] text-[#0A0A0A] mb-3">
        Delivery Address
      </h3>
      <p className="text-sm sm:text-base font-normal font-roboto text-[#101828] leading-relaxed">
        {clientData.deliveryAddress || '—'}
      </p>
    </div>

    {/* Statistics Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <StatCard
        icon={PackageCheckIcon}
        value={clientData.totalSpent}
        label="Total Spent"
        bgColor="bg-[#F0FDF4]"
        iconColor="text-[#00A63E]"
      />
    </div>

    {/* Account Details */}
    <div className="bg-gray-50 rounded-lg p-4 border border-[#BEDBFF] sm:p-6">
      <h3 className="text-base sm:text-lg font-normal font-roboto leading-[150%] text-[#0A0A0A] mb-3">
        Account Details
      </h3>
      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
        <span className="text-sm sm:text-base text-[#6A7282] font-roboto leading-[150%]">
          Registration Date:
        </span>
        <span className="text-sm sm:text-base font-normal font-roboto leading-[150%] text-[#101828]">
          {clientData.registrationDate
            ? new Date(clientData.registrationDate).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })
            : '—'}
        </span>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2">
        <span className="text-sm sm:text-base text-[#6A7282] font-roboto leading-[150%]">
          Status:
        </span>
        <span
          className={`text-sm sm:text-base font-medium font-roboto leading-[150%] ${
            clientData.status === 'Active' ? 'text-[#00A63E]' : 'text-gray-400'
          }`}
        >
          {clientData.status}
        </span>
      </div>
    </div>
  </div>
);

export default InformationTab;







// import React from 'react';
// import {  PackageCheckIcon,  } from 'lucide-react';

// interface Client {
//   name: string;
//   email: string;
//   clientNumber: string;
//   contact: string;
//   totalPackages: number;
//   inTransit: number;
//   totalSpent: string;
//   address?: string;
//   registrationDate?: string;
// }

// // Stat Card Component (can be moved to a separate file too if you want)
// const StatCard: React.FC<{
//   icon: React.ElementType;
//   value: string | number;
//   label: string;
//   bgColor: string;
//   iconColor: string;
// }> = ({ icon: Icon, value, label, bgColor, iconColor }) => (
//   <div className={`${bgColor} rounded-lg p-4 sm:p-6`}>
//     <div className={`${iconColor} mb-3`}>
//       <Icon className="w-6 h-6 sm:w-8 sm:h-8" />
//     </div>
//     <div className="text-2xl sm:text-3xl font-semibold text-[#101828] font-roboto mb-1">{value}</div>
//     <div className="text-xs sm:text-sm text-gray-600">{label}</div>
//   </div>
// );

// interface Props {
//   clientData: Client;
// }

// const InformationTab: React.FC<Props> = ({ clientData }) => (
//   <div className="space-y-4 sm:space-y-6">
//     {/* Client Information */}
//     <div className="bg-[#EFF6FF] rounded-lg p-4 sm:p-6">
//       <h3 className="text-sm sm:text-base font-normal   font-roboto leading-[150%]  text-gray-900 mb-4">
//         Client Information
//       </h3>
//       <div className="space-y-3">
//         <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
//           <span className="text-sm sm:text-base AdminCfont-normal  text-[#6A7282]    font-roboto leading-[150%]    min-w-[140px]">
//             Client:
//           </span>
//           <span className="text-sm sm:text-base font-normal  font-roboto leading-[150%]  text-[#364153]">
//             {clientData.name}
//           </span>
//         </div>
//         <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
//           <span className="text-sm sm:text-base AdminCfont-normal  text-[#6A7282]    font-roboto leading-[150%]    min-w-[140px]">
//             Client Number:
//           </span>
//           <span className="text-sm sm:text-base font-normal  font-roboto leading-[150%]  text-[#6A7282]">
//             {clientData.clientNumber}
//           </span>
//         </div>
//         <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
//           <span className="text-sm sm:text-base AdminCfont-normal  text-[#6A7282]    font-roboto leading-[150%]    min-w-[140px]">
//             Phone Number:
//           </span>
//           <span className="text-sm sm:text-base font-normal  font-roboto leading-[150%]  text-[#101828]">
//             {clientData.contact}
//           </span>
//         </div>
//         <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
//           <span className="text-sm sm:text-base AdminCfont-normal  text-[#6A7282]    font-roboto leading-[150%]    min-w-[140px]">
//             Email:
//           </span>
//           <span className="text-sm sm:text-base font-normal  font-roboto leading-[150%]  text-[#364153]">
//             {clientData.email}
//           </span>
//         </div>
//       </div>
//     </div>

//     {/* Delivery Address */}
//     <div className="bg-gray-50 rounded-lg p-4 border border-[#BEDBFF] sm:p-6">
//       <h3 className="text-sm sm:text-base  font-normal  font-roboto leading-[150%]  text-[#0A0A0A] mb-3">
//         Delivery Address
//       </h3>
//       <p className="text-sm sm:text-base font-normal  font-roboto text-[#101828]    leading-relaxed">
//         {clientData.address || '15 Rue des Flamboyants, 97200 Fort-de-France, Martinique'}
//       </p>
//     </div>

//     {/* Statistics Cards */}
//     <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//       <StatCard icon={PackageCheckIcon} value={clientData.totalPackages} label="Total Packages" bgColor="bg-[#DDE9FF]" iconColor="text-[#1C60DF]" />
//       <StatCard icon={PackageCheckIcon} value={clientData.inTransit} label="In Transit" bgColor="bg-[#F0B1001F]" iconColor="text-[#F59E0B]" />
//       <StatCard icon={PackageCheckIcon} value={clientData.totalSpent} label="Total Spent" bgColor="bg-[#F0FDF4]" iconColor="text-[#00A63E]" />
//     </div>

//     {/* Account Details */}
//     <div className="bg-gray-50 rounded-lg p-4 border border-[#BEDBFF] sm:p-6">
//       <h3 className="text-base sm:text-lg font-normal  font-roboto leading-[150%]  text-[#0A0A0A] mb-3">Account Details</h3>
//       <div className="flex flex-col sm:flex-row sm:items-center gap-2">
//         <span className="text-sm sm:text-base AdminCfont-normal  text-[#6A7282]    font-roboto leading-[150%]   ">Registration Date:</span>
//         <span className="text-sm sm:text-base font-normal  font-roboto leading-[150%]  text-[#101828]">{clientData.registrationDate || '2025-01-15'}</span>
//       </div>
//     </div>
//   </div>
// );

// export default InformationTab;
