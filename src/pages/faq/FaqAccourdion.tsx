import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import CommonWrapper from '@/common/CommonWrapper';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const FAQAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqData: FAQItem[] = [
    {
      id: 1,
      question: "Can I order from Amazon/Shein/...?",
      answer: "You can order from any e-commerce platform that ships to France, including Amazon, Shein, Temu, Cdiscount, Zalando, AliExpress, and thousands more."
    },
    {
      id: 2,
      question: "How do customs work in my DOM-TOM region?",
      answer: "Customs procedures vary by DOM-TOM region. We handle all customs documentation and ensure compliance with local regulations. Our team will guide you through the process and keep you informed at every step."
    },
    {
      id: 3,
      question: "Can I consolidate several parcels?",
      answer: "Yes, you can consolidate multiple parcels into one shipment to save on shipping costs. Simply wait for all your packages to arrive at our warehouse, and we'll combine them into a single shipment for you."
    },
    {
      id: 4,
      question: "Which items are prohibited?",
      answer: "Prohibited items include dangerous goods, weapons, illegal substances, counterfeit products, and perishable items. For a complete list of restricted items, please refer to our shipping guidelines or contact our support team."
    },
    {
      id: 5,
      question: "How are fees calculated?",
      answer: "Fees are calculated based on the weight and dimensions of your package, the destination, and the shipping method you choose (air or sea freight). You'll receive a detailed quote before confirming your shipment."
    },
    {
      id: 6,
      question: "How long is free storage?",
      answer: "We offer free storage for up to 30 days from the date your package arrives at our warehouse. After this period, a small daily storage fee will apply. This gives you plenty of time to consolidate multiple orders."
    },
    {
      id: 7,
      question: "Do you handle customs paperwork?",
      answer: "Yes, we handle all customs paperwork on your behalf. Our experienced team prepares all necessary documentation to ensure smooth customs clearance for your shipments to DOM-TOM territories."
    },
    {
      id: 8,
      question: "Where can I find KayLeo on Google Maps?",
      answer: "You can find our warehouse location on Google Maps by searching for 'KayLeo Shipping'. Our address is also available in your account dashboard. We're located in France with easy access for international shipments."
    }
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <CommonWrapper>
    <div className=" min-h-screen ">
      <div className=" bg-[#F7FAFF] py-8 sm:py-12 px-4 sm:px-6 lg:px-8 border border-[#B9CEF5] rounded-2xl md:rounded-4xl">
        <div className="">
          {faqData.map((faq, index) => (
            <div
              key={faq.id}
              className={`${
                index !== faqData.length - 1 ? 'border-b border-[#E8EFFC]' : ''
              }`}
            >
              {/* Question Button */}
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full px-6 sm:px-8 py-5 sm:py-6 flex items-center justify-between gap-4 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start gap-3 sm:gap-4 flex-1">
                  <span className="text-[#353B42] font-roboto font-normal shrink-0 text-sm sm:text-base md:text-xl leading-[150%]">
                    {faq.id}.
                  </span>
                  <span className="text-[#353B42] font-roboto font-normal  text-sm sm:text-base md:text-xl leading-[150%]">
                    {faq.question}
                  </span>
                </div>
                
                {/* Toggle Icon */}
                <div className="flex-shrink-0">
                  {openIndex === index ? (
                    <div className="w-6 h-6 rounded-full border border-[#353B42] flex items-center justify-center cursor-pointer">
                      <Minus className="w-6 h-6 text-[#353B42]" strokeWidth={2.5} />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full border border-[#353B42] flex items-center justify-center cursor-pointer">
                      <Plus className="w-6 h-6 text-[#353B42]" strokeWidth={2.5} />
                    </div>
                  )}
                </div>
              </button>

              {/* Answer Content */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 sm:px-8 pb-5 sm:pb-6">
                  <div className="pl-6 sm:pl-8">
                    <p className="text-[#3B434A] text-sm sm:text-base font-normal leading-[150%]">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </CommonWrapper>
  );
};

export default FAQAccordion;