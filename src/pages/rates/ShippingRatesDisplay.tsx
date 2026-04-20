import React from 'react';
import { Plane, Ship } from 'lucide-react';
import CommonWrapper from '@/common/CommonWrapper';

interface WeightPrice {
  weight: string;
  price: string;
}

const ShippingRatesDisplay: React.FC = () => {
  const airFreightRates: WeightPrice[] = [
    { weight: '0-1 kg', price: '€15' },
    { weight: '1-5 kg', price: '€12/kg' },
    { weight: '5-10 kg', price: '€10/kg' },
    { weight: '10-20 kg', price: '€8/kg' },
    { weight: '20+ kg', price: '€7/kg' }
  ];

  const includedServices = [
    'Package reception and processing',
    'Weight and volume calculation',
    'Customs documentation',
    'Real-time tracking',
    'Email notifications'
  ];

  return (
   <CommonWrapper>
     <div className="w-full bg-white py-12">
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-base sm:text-lg md:text-xl font-roboto font-semibold text-[#0A0A0A] mb-2">
            Shipping Rates by Weight
          </h2>
          <p className="text-[#4A5565] textsm md:text-base font-roboto">
            Choose between air freight for speed or sea freight for economy
          </p>
        </div>

        {/* Main Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          
          {/* Air Freight Card */}
          <div className="border border-[#B9CEF5] rounded-xl overflow-hidden shadow-sm">
            {/* Blue Header */}
            <div className="bg-[#155DFC] p-6 text-white">
              <div className="flex items-center gap-3 mb-1">
                <Plane className="w-6 h-6" />
                <h3 className="text-sm md:text-lg font-roboto font-medium">Air Freight</h3>
              </div>
              <p className="text-blue-100 font-roboto text-sm">Fast delivery: 5-7 days</p>
            </div>
            
            {/* Table Content */}
            <div className="p-6">
              <div className="flex justify-between pb-3 border-b border-gray-100 mb-4">
                <span className="font-semibold font-roboto text-gray-700">Weight Range</span>
                <span className="font-semibold font-roboto text-gray-700">Price</span>
              </div>
              <div className="space-y-4">
                {airFreightRates.map((rate, index) => (
                  <div key={index} className="flex justify-between font-roboto items-center text-sm sm:text-base">
                    <span className="text-gray-600">{rate.weight}</span>
                    <span className="text-[#155DFC] font-medium">{rate.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sea Freight Card */}
          <div className="border border-[#B9CEF5] rounded-xl overflow-hidden shadow-sm">
            {/* Teal Header */}
            <div className="bg-[#3AA698] p-6 text-white">
              <div className="flex items-center gap-3 mb-1">
                <Ship className="w-6 h-6" />
                <h3 className="text-base md:text-lg font-medium font-roboto">Sea Freight</h3>
              </div>
              <p className="text-teal-50 font-roboto text-sm">Economical: 3-6 weeks</p>
            </div>
            
            {/* Coming Soon Content */}
            <div className="h-[300px] flex flex-col items-center justify-center text-center p-6">
               <div className="flex items-center gap-3 mb-4">
                  <Ship className="w-10 h-10 text-[#155DFC]" />
                  <h3 className="text-xl font-bold font-arima text-gray-800">Sea Freight</h3>
               </div>
              <p className="text-base sm:text-lg md:text-xl font-bold leading-snug md:leading-[150%] text-[#FF3D0C]">Soon !</p>
            </div>
          </div>
        </div>

        {/* What's Included Section */}
        <div className="bg-[#F0F7FF] border border-[#B9CEF5] rounded-xl p-8">
          <h3 className="text-sm sm:text-base font-normal leading-[150%] font-roboto text-[#0A0A0A] mb-6">
            What's Included
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-1 gap-4">
            {includedServices.map((service, index) => (
              <li key={index} className="flex items-center gap-3 text-gray-600">
                <span className="text-[#4A5565]">•</span>
                <span className="text-[#4A5565] text-sm sm:text-base font-normal font-roboto leading-[150%]">{service}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
   </CommonWrapper>
  );
};

export default ShippingRatesDisplay;