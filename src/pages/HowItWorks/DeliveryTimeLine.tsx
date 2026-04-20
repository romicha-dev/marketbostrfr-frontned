import CommonWrapper from '@/common/CommonWrapper';
import React from 'react';

interface TimelineStep {
  day: string;
  step: string;
  description: string;
}

const DeliveryTimeline: React.FC = () => {
  const timelineSteps: TimelineStep[] = [
    {
      day: "Day 1",
      step: "Step 1",
      description: "Package arrives at KayLeo warehouse"
    },
    {
      day: "Day 2",
      step: "Step 2",
      description: "Package weighed, quote sent to customer"
    },
    {
      day: "Day 2-3",
      step: "Step 3",
      description: "Customer pays invoice"
    },
    {
      day: "Day 4",
      step: "Step 4",
      description: "Package shipped to destination"
    },
    {
      day: "Day 11",
      step: "Step 5",
      description: "Delivery to your address"
    }
  ];

  return (
    <div className="w-full bg-[#F7FAFF] py-17 px-4 sm:px-6 lg:px-8">
     <CommonWrapper>
       <div className="">
           {/* Description Text */}
            <div className="max-w-[600px]">
              <p className="text-[#191818E0] font-roboto text-xl sm:text-2xl md:text-[28px] font-normal leading-[150%] mb-8">
                We provide clear estimated delivery times for every shipping method. Whether you choose air or sea freight, you’ll know exactly when to expect your package.
              </p>
            </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[146px] lg:gap-12 items-start">
          {/* Left Column - Text and Image */}
       
         

            {/* Warehouse Image */}
            <div className="rounded-lg overflow-hidden shadow-md">
              <img
                src="/images/howitWorks/deliveryTimeLine.svg"
                alt="Warehouse worker with packages"
                className="w-full  h-full object-cover"
              />
            </div>
      

          {/* Right Column - Timeline Steps */}
          <div className="">
            <div className="divide-y divide-gray-200">
              {timelineSteps.map((item, index) => (
                <div
                  key={index}
                  className="px-6 sm:px-8 py-5 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    {/* Left Side - Day and Step */}
                    <div className="flex flex-col">
                      <span className="text-[10px] font-roboto text-[#191818E0] font-normal  leading-[120%] tracking-wide mb-1">
                        {item.day}
                      </span>
                      <span className="text-sm sm:text-base font-roboto font-normal text-[#191818E0] leading-[150%] ">
                        {item.step}
                      </span>
                    </div>

                    {/* Right Side - Description */}
                    <div className="flex-1 text-right ml-6">
                      <p className="text-sm sm:text-base font-roboto text-gray-[#191818A3] font-normal leading-[150%]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
     </CommonWrapper>
    </div>
  );
};

export default DeliveryTimeline;