import React, { useState } from 'react';
import { X } from 'lucide-react';
import InformationTab from './ModalInformation';
import PackagesTab from './Modalpackage';
import ActivityTab from './ModalActivity';
import { Client } from '@/redux/features/admin/clientApi';

// interface Activity {
//   title: string;
//   description: string;
//   date: string;
//   color: string;
// }

interface ClientDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  clientData: Client | null;
}

// const STATIC_ACTIVITIES: Activity[] = [
//   {
//     title: 'New package declared',
//     description: 'Package PKG-847 - Amazon Electronics',
//     date: '2025-12-13',
//     color: 'bg-blue-500',
//   },
//   {
//     title: 'Payment received',
//     description: '€35.00 for PKG-820',
//     date: '2025-12-13 09:30',
//     color: 'bg-green-500',
//   },
//   {
//     title: 'Package delivered',
//     description: 'PKG-810 delivered successfully',
//     date: '2025-12-13',
//     color: 'bg-yellow-500',
//   },
// ];

const TABS = [
  { key: 'information', label: 'Information' },
  { key: 'packages', label: 'Packages' },
  { key: 'activity', label: 'Activity' },
];

const ClientDetailsModal: React.FC<ClientDetailsModalProps> = ({
  isOpen,
  onClose,
  clientData,
}) => {
  const [activeTab, setActiveTab] = useState('information');

  if (!isOpen || !clientData) return null;

  const renderContent = () => {
    switch (activeTab) {
      case 'information':
        return <InformationTab clientData={clientData} />;
      case 'packages':
        return <PackagesTab clientId={clientData.id} />;
      case 'activity':
          return <ActivityTab clientId={clientData.id} />;
      default:
        return null;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-3xl mx-auto max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-4 sm:px-6 py-4 flex items-center justify-between rounded-t-lg">
          <h2 className="text-lg sm:text-xl md:text-2xl font-roboto leading-[150%] font-semibold text-[#0A0A0A]">
            Client Details — {clientData.fullName}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-full transition-colors"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Tabs */}
        <div className="p-4 sm:p-6">
          <div className="flex gap-2 mb-6 border border-[#CBD5E1] p-2.5 rounded-full w-fit">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 rounded-full text-sm font-medium font-inter leading-snug cursor-pointer transition-colors ${
                  activeTab === tab.key
                    ? 'bg-[#1F2937] text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default ClientDetailsModal;



// ClientDetailsModal.tsx
// import React, { useState } from 'react';
// import { X } from 'lucide-react';
// import InformationTab from './ModalInformation';
// import PackagesTab from './Modalpackage';
// import ActivityTab from './ModalActivity';

// // Tab components import


// // Client, PackageItem, Activity interface এবং ClientDetailsModalProps এখানে থাকবে
// // Type definitions
// interface Client {
//   id:string;
//   name: string;
//   email: string;
//   clientNumber: string;
//   contact: string;
//   totalPackages: number;
//   inTransit: number;
//   totalSpent: string;
//   status: 'Active' | 'Inactive';
//   address?: string;
//   registrationDate?: string;
// }

// interface PackageItem {
//   id: string;
//   company: string;
//   date: string;
//   status: string;
// }

// interface Activity {
//   title: string;
//   description: string;
//   date: string;
//   color: string;
// }

// interface ClientDetailsModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   clientData: Client | null;
// }





// const ClientDetailsModal: React.FC<ClientDetailsModalProps> = ({ 
//   isOpen, 
//   onClose, 
//   clientData 
// }) => {
//   const [activeTab, setActiveTab] = useState('information');

//   if (!isOpen || !clientData) return null;

//   // Sample package and activity data

//   const activities: Activity[] = [
//   { title: 'New package declared', description: 'Package PKG-847 - Amazon Electronics', date: '2025-12-13', color: 'bg-blue-500' },
//   { title: 'Payment received', description: '€35.00 for PKG-820', date: '2025-12-13 09:30', color: 'bg-green-500' },
//   { title: 'Package delivered', description: 'PKG-810 delivered successfully', date: '2025-12-13', color: 'bg-yellow-500' },
// ];

//   const renderContent = () => {
//     switch (activeTab) {
//       case 'information':
//         return <InformationTab clientData={clientData} />;
//    case 'packages':
//   return <PackagesTab packages={STATIC_PACKAGES} clientId={clientData.id} />;
//       case 'activity':
//         return <ActivityTab activities={activities} />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div 
//       className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 bg-opacity-50"
//       onClick={onClose}
//     >
//       <div 
//         className="bg-white rounded-lg shadow-xl w-full max-w-3xl mx-auto max-h-[90vh] overflow-y-auto"
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* Header */}
//         <div className="sticky top-0 bg-white border-b border-gray-200 px-4 sm:px-6 py-4 flex items-center justify-between rounded-t-lg">
//           <h2 className="text-lg sm:text-xl md:text-2xl font-roboto leading-[150%] font-semibold text-[#0A0A0A]">{`Client Details - ${clientData.name}`}</h2>
//           <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1 rounded-full">
//             <X className="w-5 h-5 sm:w-6 sm:h-6" />
//           </button>
//         </div>

//         {/* Tabs */}
//         <div className="p-4 sm:p-6">
//           <div className="flex flex-col md:flex-row gap-2 mb-6 md:border md:border-[#CBD5E1]  p-2.5 rounded-full max-w-[342px]">
//             <button
//               className={`px-4 py-2 rounded-full text-sm fon-inter leading-snug font-medium cursor-pointer ${
//                 activeTab === 'information' ? 'bg-[#1F2937] text-white' : 'bg-white text-gray-700 '
//               }`}
//               onClick={() => setActiveTab('information')}
//             >
//               Information
//             </button>
//             <button
//               className={`px-4 py-2 rounded-full text-sm fon-inter leading-snug font-medium cursor-pointer  ${
//                 activeTab === 'packages' ? 'bg-[#1F2937] text-white' : 'bg-white text-gray-700 '
//               }`}
//               onClick={() => setActiveTab('packages')}
//             >
//               Packages
//             </button>
//             <button
//               className={`px-4 py-2 rounded-full text-sm fon-inter leading-snug font-medium cursor-pointer ${
//                 activeTab === 'activity' ? 'bg-[#1F2937] text-white' : 'bg-white text-gray-700 '
//               }`}
//               onClick={() => setActiveTab('activity')}
//             >
//               Activity
//             </button>
//           </div>

//           {/* Tab Content */}
//           {renderContent()}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ClientDetailsModal;
