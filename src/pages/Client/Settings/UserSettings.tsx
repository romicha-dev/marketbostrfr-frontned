
import { useState } from "react";
import { ProfileSettings } from "./Profilesettings";
import SecuritySettings from "./SecuritySettings";
import GenaralSettings from "./GenarelSettings";


export const UserSettings = () => {
      const [activeTab, setActiveTab] = useState<'profile-settings' | 'security-settings' | 'genarel-settings'>('profile-settings');
  return (
    <div>
 
         <div className="mb-8 mt-8">
          <h1 className="text-base sm:text-lg md:text-xl font-arima font-semibold text-[#0A0A0A] leading-[150%] mb-2">Settings</h1>
          <p className="text-[#4A5565] text-sm sm:text-base font-normal font-roboto leading-[150%] ">Manage your vendor profile and preferences</p>
        </div>

           <div className="flex bg-white border border-gray-200 rounded-full w-fit p-1 mb-8">
        <button
          onClick={() => setActiveTab('profile-settings')}
          className={`px-4 py-2 rounded-full text-sm font-semibold font-inter cursor-pointer leading-[150%] transition-all ${
            activeTab === 'profile-settings' 
            ? 'bg-[#155DFC]  text-white shadow-md' 
            : 'text-gray-500 hover:bg-gray-50'
          }`}
        >
        Profile settings
        </button>
        <button
          onClick={() => setActiveTab('security-settings')}
          className={`px-6 py-2 rounded-full text-sm font-semibold font-inter leading-[150%]  cursor-pointer transition-all ${
            activeTab === 'security-settings' 
            ? 'bg-[#155DFC]  text-white shadow-md' 
            : 'text-gray-500 hover:bg-gray-50'
          }`}
        >
         Security Settings
        </button>

         
  <button
    onClick={() => setActiveTab('genarel-settings')}
    className={`px-6 py-2 rounded-full text-sm font-semibold font-inter leading-[150%] cursor-pointer transition-all ${
      activeTab === 'genarel-settings'
        ? 'bg-[#155DFC]  text-white shadow-md'
        : 'text-gray-500 hover:bg-gray-50'
    }`}
  >
    Genarel Settings
  </button>

      </div>


        {activeTab === 'profile-settings' && (
  <div>
   <ProfileSettings/>
  </div>
)}

{activeTab === 'security-settings' && (
  <div>
    <SecuritySettings/>
  </div>
)}

{activeTab === 'genarel-settings' && (
  <div>
    <GenaralSettings/>
  </div>
)}
 
    </div>
  )
}
