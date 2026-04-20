import { useState, useEffect } from 'react';
import { AdminNotificationModal } from './AdminNotificationModal';
import { useGetNotificationsQuery } from '@/redux/features/admin/notificationApi';
import { socket } from '@/lib/soket';

const MainHeader = () => {
  const [showNotificationModal, setShowNotificationModal] = useState(false);

  const { data, refetch } = useGetNotificationsQuery(undefined);

  const notifications = data || [];

  //  unread count
  const unreadCount = notifications.filter((n: any) => !n.isRead).length;


  useEffect(() => {
    const handler = () => {
      refetch(); 
    };

    socket.on('new-notification', handler);

    return () => {
      socket.off('new-notification', handler);
    };
  }, [refetch]);

  return (
    <>
      <div>
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="lg:hidden w-12" />

            <div className="hidden md:block">
              <p className="text-xs sm:text-sm md:text-base font-normal leading-snug md:leading-[120%] font-roboto text-black mb-1.5">
                Admin Panel
              </p>
              <h1 className="text-sm sm:text-base font-medium font-roboto leading-[120%] text-[#1C60DF]">
                KayLeo Logistics Management System
              </h1>
            </div>

            <div className="flex items-center gap-3 sm:gap-4">
              {/* Search */}
              <div
                className="flex items-center gap-2 bg-gray-50 rounded-lg px-4 py-2.5 
                   w-full sm:max-w-xs md:max-w-md lg:w-[496px] 
                   border border-gray-200 focus-within:border-blue-500 
                   transition-all duration-200 shadow-sm"
              >
                <input
                  type="text"
                  placeholder="Search type of keywords"
                  className="bg-transparent outline-none text-sm text-gray-700 
                   placeholder-gray-400 w-full font-roboto"
                />

                <button className="flex items-center justify-center hover:scale-110 transition-transform">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>

              {/*  Notification Bell */}
              <button
                onClick={() => setShowNotificationModal(true)}
                className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors group"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 group-hover:text-blue-600 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>

                {/*  Badge */}
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </header>
      </div>

      {/*  Modal (no props now) */}
      <AdminNotificationModal
        isOpen={showNotificationModal}
        onClose={() => setShowNotificationModal(false)}
      />
    </>
  );
};

export default MainHeader;





// import { useState } from 'react';
// import { AdminNotificationModal } from './AdminNotificationModal';


// const MainHeader = () => {
//   const [showNotificationModal, setShowNotificationModal] = useState(false);
  
//   // Notification state
//   const [notifications, setNotifications] = useState([
//     {
//       id: 1,
//       type: 'success' as const,
//       title: 'Package Delivered',
//       message: 'Package #PKG-2024-001 has been successfully delivered to customer',
//       time: '5 minutes ago',
//       read: false,
//     },
//     {
//       id: 2,
//       type: 'warning' as const,
//       title: 'Payment Pending',
//       message: 'Invoice #INV-2024-105 payment is pending from customer John Doe',
//       time: '1 hour ago',
//       read: false,
//     },
//     {
//       id: 3,
//       type: 'info' as const,
//       title: 'New Order Received',
//       message: 'A new order #ORD-2024-234 has been placed by Sarah Smith',
//       time: '3 hours ago',
//       read: false,
//     },
//     {
//       id: 4,
//       type: 'error' as const,
//       title: 'Delivery Failed',
//       message: 'Package #PKG-2024-002 delivery attempt failed. Contact required.',
//       time: '1 day ago',
//       read: true,
//     },
//     {
//       id: 5,
//       type: 'success' as const,
//       title: 'Payment Received',
//       message: 'Payment for Invoice #INV-2024-100 received successfully',
//       time: '2 days ago',
//       read: true,
//     },
//   ]);

//   const unreadCount = notifications.filter((n) => !n.read).length;

//   // Notification functions
//   const markAsRead = (id: number) => {
//     setNotifications(
//       notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
//     );
//   };

//   const markAllAsRead = () => {
//     setNotifications(notifications.map((n) => ({ ...n, read: true })));
//   };

//   const deleteNotification = (id: number) => {
//     setNotifications(notifications.filter((n) => n.id !== id));
//   };

//   return (
//     <>
//       <div>
//         {/* Header */}
//         <header className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
//           <div className="flex items-center justify-between">
//             <div className="lg:hidden w-12" /> {/* Spacer for mobile menu button */}
//             <div className="hidden md:block">
//               <p className="text-xs sm:text-sm md:text-base font-normal leading-snug md:leading-[120%] font-roboto text-black mb-1.5">
//                 Admin Panel
//               </p>
//               <h1 className="text-sm sm:text-base font-medium font-roboto leading-[120%] text-[#1C60DF]">
//                 KayLeo Logistics Management System
//               </h1>
//             </div>
//             <div className="flex items-center gap-3 sm:gap-4">
//               {/* Search Bar */}
//               <div
//                 className="flex items-center gap-2 bg-gray-50 rounded-lg px-4 py-2.5 
//                    w-full sm:max-w-xs md:max-w-md lg:w-[496px] 
//                    border border-gray-200 focus-within:border-blue-500 
//                    transition-all duration-200 shadow-sm"
//               >
//                 {/* Input Field */}
//                 <input
//                   type="text"
//                   placeholder="Search type of keywords"
//                   className="bg-transparent outline-none text-sm text-gray-700 
//                    placeholder-gray-400 w-full font-roboto"
//                 />

//                 {/* Search Icon */}
//                 <button className="flex items-center justify-center hover:scale-110 transition-transform">
//                   <svg
//                     className="w-5 h-5 text-gray-400"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                     />
//                   </svg>
//                 </button>
//               </div>

//               {/* Notification Bell */}
//               <button
//                 onClick={() => setShowNotificationModal(true)}
//                 className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors group"
//               >
//                 <svg
//                   className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 group-hover:text-blue-600 transition-colors"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
//                   />
//                 </svg>
//                 {/* Notification Badge */}
//                 {unreadCount > 0 && (
//                   <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
//                     {unreadCount > 9 ? '9+' : unreadCount}
//                   </span>
//                 )}
//               </button>
//             </div>
//           </div>
//         </header>
//       </div>

//       {/* Notification Modal */}
//       <AdminNotificationModal
//         isOpen={showNotificationModal}
//         onClose={() => setShowNotificationModal(false)}
//         notifications={notifications}
//         markAsRead={markAsRead}
//         markAllAsRead={markAllAsRead}
//         deleteNotification={deleteNotification}
//       />
//     </>
//   );
// };

// export default MainHeader;