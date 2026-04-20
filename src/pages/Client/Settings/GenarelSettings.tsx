import { useGetClientGeneralSettingsQuery, useUpdateClientGeneralSettingsMutation } from '@/redux/features/clients/SettingsApi';
import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const GeneralSettings: React.FC = () => {
  const { data, isLoading, isError } = useGetClientGeneralSettingsQuery();
  const [updateSettings, { isLoading: isUpdating }] = useUpdateClientGeneralSettingsMutation();

  const [notifications, setNotifications] = useState({
    email: true,
    sms: true,
    bids: true
  });

  // API থেকে data load হলে state set করা
  useEffect(() => {
    if (data) {
      setNotifications({
        email: data.emailNotifications,
        sms: data.smsNotifications,
        bids: data.newBidsAlerts
      });
    }
  }, [data]);

  const toggle = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = async () => {
    try {
      await updateSettings({
        emailNotifications: notifications.email,
        smsNotifications: notifications.sms,
        newBidsAlerts: notifications.bids
      }).unwrap();

      toast.success("Settings saved successfully!", { position: "top-right", autoClose: 3000 });
    } catch (err) {
      toast.error("Failed to save settings!", { position: "top-right", autoClose: 3000 });
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading settings!</p>;

  return (
    <div className="min-h-screen">
      <div className="space-y-8">
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          <h2 className="text-base sm:text-lg md:text-xl font-semibold font-inter leading-relaxed text-[#0A0A0A] mb-6">
            Notification
          </h2>

          <div className="space-y-6">
            {[
              { id: 'email', title: 'Email Notification', desc: 'Receive lead alerts via email' },
              { id: 'sms', title: 'SMS Notifications', desc: 'Receive urgent alerts via SMS' },
              { id: 'bids', title: 'New Bids Alerts', desc: 'Get notified immediately when new leads arrive' }
            ].map((item) => (
              <div key={item.id} className="flex items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm md:text-base font-normal font-inter leading-relaxed text-[#0A0A0A]">{item.title}</h4>
                  <p className="text-xs font-normal font-inter leading-snug text-gray-700">{item.desc}</p>
                </div>

                <button 
                  onClick={() => toggle(item.id as keyof typeof notifications)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full cursor-pointer transition-colors focus:outline-none ${
                    notifications[item.id as keyof typeof notifications] ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notifications[item.id as keyof typeof notifications] ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>
            ))}

            {/* Save Button */}
            <div className="pt-4">
              <button
                onClick={handleSave}
                disabled={isUpdating}
                className="bg-[#2563EB] hover:bg-blue-700 text-white px-4 py-2 cursor-pointer font-inter rounded-lg font-medium transition-all text-sm disabled:opacity-50"
              >
                {isUpdating ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </section>
      </div>

      <ToastContainer />
    </div>
  );
};

export default GeneralSettings;




// import React, { useState } from 'react';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const GenaralSettings: React.FC = () => {
//   // Notification toggle states
//   const [notifications, setNotifications] = useState({
//     email: true,
//     sms: true,
//     bids: true
//   });

//   const toggle = (key: keyof typeof notifications) => {
//     setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
//   };

//   const handleSave = () => {
//     // এখানে তুমি API call করতে পারো, এখন শুধু toast দেখাচ্ছি
//     toast.success("Settings saved successfully!", {
//       position: "top-right",
//       autoClose: 3000,
//     });
//   };

//   return (
//     <div className="min-h-screen">
//       <div className="space-y-8">

//         {/* Notification Section */}
//         <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
//           <h2 className="text-base sm:text-lg md:text-xl font-semibold font-inter leading-relaxed text-[#0A0A0A] mb-6">
//             Notification
//           </h2>

//           <div className="space-y-6">
//             {[
//               { id: 'email', title: 'Email Notification', desc: 'Receive lead alerts via email' },
//               { id: 'sms', title: 'SMS Notifications', desc: 'Receive urgent alerts via SMS' },
//               { id: 'bids', title: 'New Bids Alerts', desc: 'Get notified immediately when new leads arrive' }
//             ].map((item) => (
//               <div key={item.id} className="flex items-center justify-between gap-4">
//                 <div>
//                   <h4 className="text-sm md:text-base font-normal font-inter leading-relaxed text-[#0A0A0A]">{item.title}</h4>
//                   <p className="text-xs font-normal font-inter leading-snug text-gray-700">{item.desc}</p>
//                 </div>

//                 <button 
//                   onClick={() => toggle(item.id as keyof typeof notifications)}
//                   className={`relative inline-flex h-6 w-11 items-center rounded-full cursor-pointer transition-colors focus:outline-none ${
//                     notifications[item.id as keyof typeof notifications] ? 'bg-blue-600' : 'bg-gray-200'
//                   }`}
//                 >
//                   <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
//                     notifications[item.id as keyof typeof notifications] ? 'translate-x-6' : 'translate-x-1'
//                   }`} />
//                 </button>
//               </div>
//             ))}

//             <div className="pt-2">
//               <button
//                 onClick={handleSave}
//                 className="bg-[#2563EB] hover:bg-blue-700 text-white px-4 py-2 cursor-pointer font-inter rounded-lg font-medium transition-all text-sm"
//               >
//                 Save Changes
//               </button>
//             </div>
//           </div>
//         </section>

//       </div>

//       {/* Toast Container */}
//       <ToastContainer />
//     </div>
//   );
// };

// export default GenaralSettings;
