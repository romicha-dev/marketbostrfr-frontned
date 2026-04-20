
import GenarateQuites from "@/components/AdminComponent/Quotes/GenarateQuites";
import PackageAwaitng from "@/components/AdminComponent/Quotes/PackageAwating";
import AdminTitleHeader from "@/components/reuseable/AdminTitleHeader"
import { useState } from "react";


export const Quotes = () => {
   const [activeTab, setActiveTab] = useState<'awaiting' | 'generated'>('awaiting');
  return (
    <div>
      <div>
          <AdminTitleHeader
        title="Quote Management"
        description="Create and manage shipping quotes"
      />
      </div>
           <div className="flex bg-white border border-gray-200 rounded-full w-fit p-1 mb-8">
        <button
          onClick={() => setActiveTab('awaiting')}
          className={`px-4 py-2 rounded-full text-sm font-semibold font-inter leading-[150%] transition-all ${
            activeTab === 'awaiting' 
            ? 'bg-[#0F172A] text-white shadow-md' 
            : 'text-gray-500 hover:bg-gray-50'
          }`}
        >
          Packages Awaiting Quotes
        </button>
        <button
          onClick={() => setActiveTab('generated')}
          className={`px-6 py-2 rounded-full text-sm font-semibold font-inter leading-[150%] transition-all ${
            activeTab === 'generated' 
            ? 'bg-[#0F172A] text-white shadow-md' 
            : 'text-gray-500 hover:bg-gray-50'
          }`}
        >
          Generated Quotes
        </button>
      </div>

         {activeTab === 'awaiting' ? (
         <PackageAwaitng/>
      ) : (
        /* Content for Generated Quotes Tab */
         <GenarateQuites/>
      )}
    </div>
  )
}
