import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

import {
  notificationApi,
  useGetNotificationsQuery,
  useReadAllNotificationsMutation,
  useReadNotificationMutation,

} from '@/redux/features/admin/notificationApi';
import { socket } from '@/lib/soket';
import { useAppDispatch } from '@/store/hook';


interface Notification {
  id: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminNotificationModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const { data } = useGetNotificationsQuery(undefined);
  const [readAllNotifications] = useReadAllNotificationsMutation();
  const [readNotification] = useReadNotificationMutation();

  const notifications: Notification[] = data || [];
  const unreadCount = notifications.filter((n) => !n.isRead).length;
  console.log(notifications)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // ESC close
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // 🔥 SOCKET LIVE UPDATE
  useEffect(() => {
    const handler = (newNotif: any) => {
      dispatch(
        notificationApi.util.updateQueryData(
          'getNotifications',
          undefined,
          (draft: any) => {
            draft.notifications.unshift(newNotif);
          }
        )
      );
    };

    socket.on('new-notification', handler);

    return () => {
      socket.off('new-notification', handler);
    };
  }, [dispatch]);

  // ✅ MARK SINGLE
  const handleRead = async (id: string) => {
    try {
      await readNotification(id).unwrap();

      dispatch(
        notificationApi.util.updateQueryData(
          'getNotifications',
          undefined,
          (draft: any) => {
            const item = draft.notifications.find((n: any) => n.id === id);
            if (item) item.isRead = true;
          }
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ MARK ALL
  const handleMarkAll = async () => {
    try {
      await readAllNotifications().unwrap();

      dispatch(
        notificationApi.util.updateQueryData(
          'getNotifications',
          undefined,
          (draft: any) => {
            draft.notifications.forEach((n: any) => {
              n.isRead = true;
            });
          }
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-start justify-end pt-20 px-4 animate-fadeIn">
      <div
        ref={modalRef}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col animate-slideDown"
      >
        {/* HEADER */}
        <div className="px-6 py-5 border-b flex justify-between items-center bg-gradient-to-r from-blue-50 to-white rounded-t-2xl">
          <div>
            <h3 className="font-semibold text-lg">Notifications</h3>
            {unreadCount > 0 && (
              <p className="text-xs text-gray-500">
                {unreadCount} unread
              </p>
            )}
          </div>

          <div className="flex gap-2">
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAll}
                className="text-sm text-blue-600 hover:text-blue-700 px-3 py-1 rounded-lg hover:bg-blue-50"
              >
                Mark all as read
              </button>
            )}
            <button onClick={onClose}>
              <X />
            </button>
          </div>
        </div>

        {/* BODY */}
        <div className="flex-1 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              No notifications
            </div>
          ) : (
            <div className="divide-y">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => handleRead(notif.id)}
                  className={`p-5 cursor-pointer transition ${
                    !notif.isRead
                      ? 'bg-blue-50 hover:bg-blue-100 border-l-4 border-blue-500'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <h4 className="font-semibold flex items-center gap-2">
                    {notif.title}
                    {!notif.isRead && (
                      <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
                    )}
                  </h4>

                  <p className="text-sm text-gray-600 mt-1">
                    {notif.message}
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(notif.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* FOOTER */}
        {notifications.length > 0 && (
          <div className="px-6 py-4 border-t bg-gray-50">
            <button className="w-full text-sm text-blue-600 hover:text-blue-700">
              View all notifications
            </button>
          </div>
        )}
      </div>
    </div>
  );
};








// import { useEffect, useRef } from 'react';
// import { X } from 'lucide-react';

// interface Notification {
//   id: number;
//   type: 'info' | 'success' | 'warning' | 'error';
//   title: string;
//   message: string;
//   time: string;
//   read: boolean;
// }

// interface AdminNotificationModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   notifications: Notification[];
//   markAsRead: (id: number) => void;
//   markAllAsRead: () => void;
//   deleteNotification: (id: number) => void;
// }

// export const AdminNotificationModal: React.FC<AdminNotificationModalProps> = ({
//   isOpen,
//   onClose,
//   notifications,
//   markAsRead,
//   markAllAsRead,
//   deleteNotification,
// }) => {
//   const modalRef = useRef<HTMLDivElement>(null);

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

//   // ESC key দিয়ে close
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

//   const getNotificationIcon = (type: string) => {
//     switch (type) {
//       case 'success':
//         return (
//           <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
//             <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//             </svg>
//           </div>
//         );
//       case 'warning':
//         return (
//           <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center shrink-0">
//             <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//             </svg>
//           </div>
//         );
//       case 'error':
//         return (
//           <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
//             <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </div>
//         );
//       default:
//         return (
//           <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
//             <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//             </svg>
//           </div>
//         );
//     }
//   };

//   return (
//     <div className="fixed inset-0  bg-opacity-50 z-[9999] flex items-start justify-end pt-20 px-4 animate-fadeIn">
//       <div
//         ref={modalRef}
//         className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col animate-slideDown"
//       >
//         {/* Modal Header */}
//         <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-blue-50 to-white rounded-t-2xl">
//           <div className="flex items-center space-x-3">
//             <div className="p-2 bg-blue-100 rounded-lg">
//               <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
//               </svg>
//             </div>
//             <div>
//               <h3 className="font-semibold text-lg text-gray-800 font-roboto">Notifications</h3>
//               {unreadCount > 0 && (
//                 <p className="text-xs text-gray-500 font-roboto">{unreadCount} unread notification{unreadCount > 1 ? 's' : ''}</p>
//               )}
//             </div>
//           </div>
//           <div className="flex items-center space-x-2">
//             {unreadCount > 0 && (
//               <button
//                 onClick={markAllAsRead}
//                 className="text-sm text-blue-600 hover:text-blue-700 font-medium px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors font-roboto"
//               >
//                 Mark all as read
//               </button>
//             )}
//             <button
//               onClick={onClose}
//               className="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-100 transition-colors"
//             >
//               <X className="w-5 h-5" />
//             </button>
//           </div>
//         </div>

//         {/* Modal Body */}
//         <div className="flex-1 overflow-y-auto">
//           {notifications.length === 0 ? (
//             <div className="p-12 text-center">
//               <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
//                 </svg>
//               </div>
//               <p className="text-gray-500 text-lg font-medium font-roboto">No notifications yet</p>
//               <p className="text-gray-400 text-sm mt-2 font-roboto">You'll see updates here when they arrive</p>
//             </div>
//           ) : (
//             <div className="divide-y divide-gray-100">
//               {notifications.map((notif) => (
//                 <div
//                   key={notif.id}
//                   className={`p-5 transition-all duration-200 cursor-pointer ${
//                     !notif.read
//                       ? 'bg-blue-50 hover:bg-blue-100 border-l-4 border-blue-500'
//                       : 'hover:bg-gray-50'
//                   }`}
//                   onClick={() => markAsRead(notif.id)}
//                 >
//                   <div className="flex items-start space-x-4">
//                     {getNotificationIcon(notif.type)}
                    
//                     <div className="flex-1 min-w-0">
//                       <div className="flex items-start justify-between mb-1">
//                         <h4 className={`text-sm font-semibold font-roboto ${!notif.read ? 'text-gray-900' : 'text-gray-700'}`}>
//                           {notif.title}
//                         </h4>
//                         {!notif.read && (
//                           <span className="w-2 h-2 bg-blue-600 rounded-full ml-2 shrink-0 animate-pulse"></span>
//                         )}
//                       </div>
//                       <p className="text-sm text-gray-600 mb-2 font-roboto">{notif.message}</p>
//                       <div className="flex items-center justify-between">
//                         <p className="text-xs text-gray-500 font-roboto">{notif.time}</p>
//                       </div>
//                     </div>

//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         deleteNotification(notif.id);
//                       }}
//                       className="text-gray-400 hover:text-red-500 p-1 rounded transition-colors shrink-0"
//                       title="Delete notification"
//                     >
//                       <X className="w-4 h-4" />
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Modal Footer */}
//         {notifications.length > 0 && (
//           <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
//             <button className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium py-2 rounded-lg hover:bg-blue-50 transition-colors font-roboto">
//               View all notifications
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };