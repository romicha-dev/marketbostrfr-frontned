import React, { useState } from 'react';
import {  DollarSign, Calculator } from 'lucide-react';
import { useCreateNotificationMutation, useGetAllNotificationsQuery, useUpdateNotificationMutation } from '@/redux/features/admin/settings/notificationApi';
import { toast } from 'react-toastify';



interface NotificationState {
  quoteSent: boolean;

  packageActivity:boolean;
   packageCreated:boolean;
newClientRegistration:boolean;
  
  // newClient: boolean;
}

const Toggle = ({ enabled, onChange }: { enabled: boolean; onChange: () => void }) => (
  <button
    onClick={onChange}
    className={`relative inline-flex h-6 w-11 items-center cursor-pointer rounded-full transition-colors mb-3 sm:mb-0 focus:outline-none ${
      enabled ? 'bg-[#0F172A]' : 'bg-gray-200'
    }`}
  >
    <span
      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
        enabled ? 'translate-x-6' : 'translate-x-1'
      }`}
    />
  </button>
);

const Notification: React.FC = () => {
  const { data, isLoading } = useGetAllNotificationsQuery(); // GET request

const notificationsData = data?.[0];
  const [createNotification] = useCreateNotificationMutation(); // POST request
  const [updateNotification] = useUpdateNotificationMutation(); // PATCH request

  // Initialize state from backend if available
const [notifications, setNotifications] = useState<NotificationState>({
  quoteSent: false,
  packageActivity: false,
  packageCreated: false,
  newClientRegistration: false,
});

React.useEffect(() => {
  if (notificationsData) {
    setNotifications({
      quoteSent: notificationsData.quoteSent,
      packageActivity: notificationsData.packageActivity,
      packageCreated: notificationsData.packageCreated,
      newClientRegistration: notificationsData.newClientRegistration,
    });
  }
}, [notificationsData]);

  const toggleNotification = (id: keyof NotificationState) => {
    setNotifications(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

const saveSettings = async () => {
  try {
    if (notificationsData?.id) {
      // Update existing notification
      await updateNotification({
        id: notificationsData.id,
        data: {
          quoteSent: notifications.quoteSent,
          packageActivity: notifications.packageActivity,
          packageCreated: notifications.packageCreated,
          newClientRegistration: notifications.newClientRegistration,
        },
      });
    } else {
      // Create new notification
      await createNotification({
        quoteSent: notifications.quoteSent,
         packageActivity: notifications.packageActivity,
          packageCreated: notifications.packageCreated,
        newClientRegistration: notifications.newClientRegistration,
      });
    }
    toast.success("Notification settings saved successfull");
  } catch (err) {
    console.error(err);
    toast.error("Failed to save settings");
  }
};

 if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
const items = [
  { id: 'quoteSent', label: 'Quote Sent' },
  { id: 'packageActivity', label: 'Package Activity' },
  { id: 'packageCreated', label: 'Package Created' },
  { id: 'newClientRegistration', label: 'New Client Registration' },
];
  
  

  return (
    <div className=" ">
 

      <main className=" ">
      

       

        {/* --- Card Container --- */}
        <div className="bg-white rounded-xlshadow-sm p-3 md:p-8">
          <div className="flex items-start gap-4 mb-10">
            <div className="bg-[#EBF2FF] p-3 rounded-xl">
              <DollarSign className="w-6 h-6 text-[#1D61F2]" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg md:text-xl font-roboto leading-[150%] font-normal text-[#101828]">Company Information</h3>
              <p className="text-[#101828] text-sm sm:text-base font-normal font-roboto leading-[150%]">Update company details and contact information</p>
            </div>
          </div>

       
            <div className="space-y-6 p-3 md:p-8">
              <div className="border border-[#CBD5E1] rounded-xl p-6 ">
                <h4 className="text-base sm:text-lg md:text-xl font-roboto font-medium leading-[150%] mb-7.5">Notification</h4>
                
                {items.map((item) => (
                  <div key={item.id} className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div className='mb-5'>
                      <p className="text-sm md:text-base font-normal font-inter leading-[150%] text-[#000000] mb-1.5">{item.label}</p>
                      {/* <p className="text-xs font-normal font-inter leading-snug md:leading-[150%] text-slate-700">{item.sub}</p> */}
                    </div>
                    <Toggle 
                      enabled={notifications[item.id as keyof NotificationState]} 
                      onChange={() => toggleNotification(item.id as keyof NotificationState)} 
                    />
                  </div>
                ))}
              </div>

              <button  onClick={saveSettings} className="flex items-center cursor-pointer gap-2 bg-[#155DFC] hover:bg-blue-700 text-white px-4.5 py-2.5 rounded-md font-normal text-sm font-roboto transition-all shadow-md active:scale-95">
                <Calculator className="w-5 h-5" />
                Save Notification Settings
              </button>
            </div>
   
        </div>
      </main>
    </div>
  );
};

export default Notification;