import SectionTitle from "@/components/reuseable/SectionTitle"

import titleIcon from "/images/home/sectionTitleIcon.png";
import { useState } from "react";
import OrderOnline from "./OrderOnline";
import PhysicalDrop from "./PhysicalDrop";


const Order = () => {
       const [activeTab, setActiveTab] = useState<'order-online' | 'physical-drop' >('order-online');

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
    <div className="max-w-[1312px] mx-auto">
               <SectionTitle
          icon={titleIcon}
          label="onder online"
          title="Your Gateway to Worldwide Shopping"
          subtitle="Shop from international e-commerce platforms and ship to your KayLeo mailbox 
Online Purchase +  KayLeo Delivery"
        />

                   <div className="flex bg-white border border-gray-200 justify-center items-center rounded-full w-fit p-1 mb-8 mx-auto">
        <button
          onClick={() => setActiveTab('order-online')}
          className={`px-4 py-2 rounded-full text-sm font-semibold font-inter cursor-pointer leading-[150%] transition-all ${
            activeTab === 'order-online' 
            ? 'bg-[#1C60DF] text-white shadow-md' 
            : 'text-gray-500 hover:bg-gray-50'
          }`}
        >
          Order Online
        </button>
        <button
          onClick={() => setActiveTab('physical-drop')}
          className={`px-6 py-2 rounded-full text-sm font-semibold font-inter leading-[150%]  cursor-pointer transition-all ${
            activeTab === 'physical-drop' 
            ? 'bg-[#1C60DF] text-white shadow-md' 
            : 'text-gray-500 hover:bg-gray-50'
          }`}
        >
      Physical Drop-off
        </button>



      </div>

{activeTab === 'order-online' && (
  <div>
    <OrderOnline/>
  </div>
)}

{activeTab === 'physical-drop' && (
  <div>
    <PhysicalDrop/>
  </div>
)}

    </div>
    </div>
  )
}

export default Order
