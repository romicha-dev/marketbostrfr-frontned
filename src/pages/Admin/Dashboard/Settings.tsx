import CompanyInfo from "@/components/AdminComponent/Settings/CompanyInfo";
import Notification from "@/components/AdminComponent/Settings/Notification";
import ShippingRates from "@/components/AdminComponent/Settings/ShippingRates";
import AdminTitleHeader from "@/components/reuseable/AdminTitleHeader"
import { useState } from "react";


export const Settings = () => {
    const [activeTab, setActiveTab] = useState<'shipping-rates' | 'company-info' | 'notification'>('shipping-rates');
  return (
    <div className="min-h-screen">
       <div>
      <div>
          <AdminTitleHeader
        title="Settings"
        description="Create and manage shipping quotes"
      />
      </div>
           <div className="flex bg-white border border-gray-200 rounded-full w-fit p-1 mb-8">
        <button
          onClick={() => setActiveTab('shipping-rates')}
          className={`px-4 py-2 rounded-full text-sm font-semibold font-inter cursor-pointer leading-[150%] transition-all ${
            activeTab === 'shipping-rates' 
            ? 'bg-[#0F172A] text-white shadow-md' 
            : 'text-gray-500 hover:bg-gray-50'
          }`}
        >
          Shipping Rates
        </button>
        <button
          onClick={() => setActiveTab('company-info')}
          className={`px-6 py-2 rounded-full text-sm font-semibold font-inter leading-[150%]  cursor-pointer transition-all ${
            activeTab === 'company-info' 
            ? 'bg-[#0F172A] text-white shadow-md' 
            : 'text-gray-500 hover:bg-gray-50'
          }`}
        >
          Company Info
        </button>

         
  <button
    onClick={() => setActiveTab('notification')}
    className={`px-6 py-2 rounded-full text-sm font-semibold font-inter leading-[150%] cursor-pointer transition-all ${
      activeTab === 'notification'
        ? 'bg-[#0F172A] text-white shadow-md'
        : 'text-gray-500 hover:bg-gray-50'
    }`}
  >
    Notification
  </button>

      </div>

{activeTab === 'shipping-rates' && (
  <div>
    <ShippingRates/>
  </div>
)}

{activeTab === 'company-info' && (
  <div>
    <CompanyInfo/>
  </div>
)}

{activeTab === 'notification' && (
  <div>
    <Notification/>
  </div>
)}

    </div>
    </div>
  )
}
