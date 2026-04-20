import { useEffect, useRef } from "react";
import { Bell, X } from "lucide-react";
import { useGetNotificationsQuery, useReadAllNotificationsMutation, useReadNotificationMutation } from "@/redux/features/admin/notificationApi";


// interface Notification {
//   id: string;
//   type?: string;
//   message: string;
//   createdAt: string;
//   isRead: boolean;
// }

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // ✅ API HOOKS
  const { data: notifications = [] } = useGetNotificationsQuery(undefined);
  const [readNotification] = useReadNotificationMutation();
  const [readAllNotifications] = useReadAllNotificationsMutation();

  // Close modal on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // ESC close
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const unreadCount = notifications.filter((n:any) => !n.isRead).length;

  const handleMarkAsRead = async (id: string) => {
    await readNotification(id);
  };

  const handleMarkAllAsRead = async () => {
    await readAllNotifications();
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-start justify-end pt-30 px-4 animate-fadeIn">
      <div
        ref={modalRef}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[80vh] flex flex-col animate-slideDown"
      >
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-full">
              <Bell className="w-5 h-5 text-blue-600" />
            </div>

            <div>
              <h3 className="font-semibold text-lg text-slate-800">
                Notifications
              </h3>

              {unreadCount > 0 && (
                <p className="text-xs text-slate-500">
                  {unreadCount} new
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium px-3 py-1 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Mark all as read
              </button>
            )}

            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 p-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-8 sm:p-12 text-center">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="w-10 h-10 text-slate-300" />
              </div>
              <p className="text-slate-500 text-lg font-medium">
                No notifications
              </p>
              <p className="text-slate-400 text-sm mt-2">
                New updates will appear here
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {notifications.map((notif: any) => (
                <div
                  key={notif.id}
                  className={`p-4 sm:p-5 transition-all duration-200 ${
                    !notif.isRead
                      ? "bg-blue-50 hover:bg-blue-100"
                      : "hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-start justify-between space-x-3">
                    <div
                      className="flex-1 cursor-pointer"
                      onClick={() => handleMarkAsRead(notif.id)}
                    >
                      <div className="flex items-center space-x-2 mb-1">
                        {!notif.isRead && (
                          <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
                        )}

                        <p
                          className={`text-sm sm:text-base ${
                            !notif.isRead
                              ? "font-semibold text-slate-800"
                              : "text-slate-600"
                          }`}
                        >
                          {notif.message}
                        </p>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-500 ml-4">
                        {notif.createdAt}
                      </p>
                    </div>

                    <button className="text-slate-400 hover:text-red-500 p-1 rounded transition-colors flex-shrink-0">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};





// import { useEffect, useRef } from 'react';
// import { Bell, X } from 'lucide-react';

// interface Notification {
//   id: number;
//   type: string;
//   message: string;
//   time: string;
//   read: boolean;
// }

// interface NotificationModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   notifications: Notification[];
//   markAsRead: (id: number) => void;
//   markAllAsRead: () => void;
//   deleteNotification: (id: number) => void;
// }

// export const NotificationModal: React.FC<NotificationModalProps> = ({
//   isOpen,
//   onClose,
//   notifications,
//   markAsRead,
//   markAllAsRead,
//   deleteNotification,
// }) => {
//   const modalRef = useRef<HTMLDivElement>(null);

//   // Close modal on outside click
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
//         onClose();
//       }
//     };

//     if (isOpen) {
//       document.addEventListener('mousedown', handleClickOutside);
//       document.body.style.overflow = 'hidden';
//     }

//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//       document.body.style.overflow = 'unset';
//     };
//   }, [isOpen, onClose]);

//   // Close modal on ESC key
//   useEffect(() => {
//     const handleEscape = (event: KeyboardEvent) => {
//       if (event.key === 'Escape' && isOpen) {
//         onClose();
//       }
//     };

//     document.addEventListener('keydown', handleEscape);
//     return () => document.removeEventListener('keydown', handleEscape);
//   }, [isOpen, onClose]);

//   if (!isOpen) return null;

//   const unreadCount = notifications.filter((n) => !n.read).length;

//   return (
//     <div className="fixed inset-0  z-[9999] flex items-start justify-end pt-30 px-4 animate-fadeIn">
//       <div
//         ref={modalRef}
//         className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[80vh] flex flex-col animate-slideDown"
//       >
//         {/* Modal Header */}
//         <div className="p-4 sm:p-6 border-b border-slate-200 flex items-center justify-between">
//           <div className="flex items-center space-x-3">
//             <div className="p-2 bg-blue-100 rounded-full">
//               <Bell className="w-5 h-5 text-blue-600" />
//             </div>
//             <div>
//               <h3 className="font-semibold text-lg text-slate-800">
//                 Notifications
//               </h3>
//               {unreadCount > 0 && (
//                 <p className="text-xs text-slate-500">
//                   {unreadCount} new
//                 </p>
//               )}
//             </div>
//           </div>
//           <div className="flex items-center space-x-2">
//             {unreadCount > 0 && (
//               <button
//                 onClick={markAllAsRead}
//                 className="text-sm text-blue-600 hover:text-blue-700 font-medium px-3 py-1 rounded-lg hover:bg-blue-50 transition-colors"
//               >
//                 Mark all as read
//               </button>
//             )}
//             <button
//               onClick={onClose}
//               className="text-slate-400 hover:text-slate-600 p-2 rounded-lg hover:bg-slate-100 transition-colors"
//             >
//               <X className="w-5 h-5" />
//             </button>
//           </div>
//         </div>

//         {/* Modal Body */}
//         <div className="flex-1 overflow-y-auto">
//           {notifications.length === 0 ? (
//             <div className="p-8 sm:p-12 text-center">
//               <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <Bell className="w-10 h-10 text-slate-300" />
//               </div>
//               <p className="text-slate-500 text-lg font-medium">
//                 No notifications
//               </p>
//               <p className="text-slate-400 text-sm mt-2">
//                 New updates will appear here
//               </p>
//             </div>
//           ) : (
//             <div className="divide-y divide-slate-100">
//               {notifications.map((notif) => (
//                 <div
//                   key={notif.id}
//                   className={`p-4 sm:p-5 transition-all duration-200 ${
//                     !notif.read
//                       ? 'bg-blue-50 hover:bg-blue-100'
//                       : 'hover:bg-slate-50'
//                   }`}
//                 >
//                   <div className="flex items-start justify-between space-x-3">
//                     <div
//                       className="flex-1 cursor-pointer"
//                       onClick={() => markAsRead(notif.id)}
//                     >
//                       <div className="flex items-center space-x-2 mb-1">
//                         {!notif.read && (
//                           <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
//                         )}
//                         <p
//                           className={`text-sm sm:text-base ${
//                             !notif.read
//                               ? 'font-semibold text-slate-800'
//                               : 'text-slate-600'
//                           }`}
//                         >
//                           {notif.message}
//                         </p>
//                       </div>
//                       <p className="text-xs sm:text-sm text-slate-500 ml-4">
//                         {notif.time}
//                       </p>
//                     </div>
//                     <button
//                       onClick={() => deleteNotification(notif.id)}
//                       className="text-slate-400 hover:text-red-500 p-1 rounded transition-colors flex-shrink-0"
//                       title="Delete"
//                     >
//                       <X className="w-4 h-4" />
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };
