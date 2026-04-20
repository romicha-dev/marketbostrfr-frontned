// import SectionTitle from "@/components/reuseable/SectionTitle";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";

// export default function FAQSection() {
//   return (
//     <div>
//       <SectionTitle
//         icon="/images/home/sectionTitleIcon.png"
//         label="FAQ"
//         title="Frequently Asked Questions"
//         subtitle="Got questions about eye treatments, recovery, or appointments? We’ve answered some of the most common patient queries to help you understand what to expect before your visit."
//         subTitleWtidth="max-w-[800px]"
//       />

//       <div>
//         <Accordion type="single" collapsible>
//           <AccordionItem value="item-1">
//             <AccordionTrigger>Is it accessible?</AccordionTrigger>
//             <AccordionContent>
//               Yes. It adheres to the WAI-ARIA design pattern.
//             </AccordionContent>
//           </AccordionItem>
//         </Accordion>
//       </div>
//     </div>
//   );
// }

// import CommonWrapper from "@/common/CommonWrapper";
// import SectionTitle from "@/components/reuseable/SectionTitle";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";

// export default function FAQSection() {
//   return (
//     <div>
//       <CommonWrapper>
//         <SectionTitle
//           icon="/images/home/sectionTitleIcon.png"
//           label="FAQ"
//           title="Frequently Asked Questions"
//           subtitle="Got questions about eye treatments, recovery, or appointments? We’ve answered some of the most common patient queries to help you understand what to expect before your visit."
//           subTitleWtidth="max-w-[800px]"
//         />

//         <div className="space-y-4">
//           <Accordion type="single" collapsible>
//             {[...Array(6)].map((_, index) => (
//               <AccordionItem key={index} value={`item-${index + 1}`}>
//                 <div className="flex items-center">
//                   <span className="font-bold text-xl text-gray-700 mr-4">
//                     {index + 1}.
//                   </span>
//                   <AccordionTrigger className="text-lg font-semibold text-gray-900">
//                     {`FAQ Question ${index + 1}`}
//                   </AccordionTrigger>
//                 </div>
//                 <AccordionContent>
//                   {`Answer to FAQ Question ${
//                     index + 1
//                   }. This is where the answer will go for FAQ item ${
//                     index + 1
//                   }.`}
//                 </AccordionContent>
//               </AccordionItem>
//             ))}
//           </Accordion>
//         </div>
//       </CommonWrapper>
//     </div>
//   );
// }

import CommonWrapper from "@/common/CommonWrapper";
import SectionTitle from "@/components/reuseable/SectionTitle";
import {
  Accordion,

} from "@/components/ui/accordion";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

// Demo array with questions and answers
const faqs = [
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

export default function FAQSection() {
  //const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // const handleToggle = (index: number) => {
  //   setActiveIndex(activeIndex === index ? null : index); // Toggle between active and inactive
    const [openIndex, setOpenIndex] = useState<number | null>(0);
  // };
    const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className=" py-20 ">
      <CommonWrapper>
       <div className="bg-white  max-w-5xl mx-auto">
        <SectionTitle
          icon="/images/home/sectionTitleIcon.png"
          label="FAQ"
          title="Frequently Asked Questions"
          subtitle="Got questions about eye treatments, recovery, or appointments? We’ve answered some of the most common patient queries to help you understand what to expect before your visit."
          subTitleWtidth="max-w-[800px]"
        />

        <div className="space-y-4 ">
          <Accordion type="single" collapsible>
             {faqs.map((faq, index) => (
            <div
              key={faq.id}
              className={`${
                index !== faqs.length - 1 ? 'border-b border-[#14449E]' : ''
              }`}
            >
              {/* Question Button */}
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full px-6 sm:px-8 py-5 sm:py-6 flex items-center justify-between gap-4 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start gap-3 sm:gap-4 flex-1">
                  <span className="text-black font-normal font-roboto shrink-0 text-sm sm:text-base md:text-xl leading-[150%]">
                    {faq.id}.
                  </span>
                  <span className="text-black font-normal font-roboto  text-sm sm:text-base md:text-xl leading-[150%]">
                    {faq.question}
                  </span>
                </div>
                
                {/* Toggle Icon */}
                <div className="flex-shrink-0">
                  {openIndex === index ? (
                    <div className="w-6 h-6 rounded-full border border-[#353B42] flex items-center justify-center cursor-pointer">
                      <Minus className="w-6 h-6 text-black" strokeWidth={2.5} />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full border border-[#353B42] flex items-center justify-center cursor-pointer">
                      <Plus className="w-6 h-6 text-black" strokeWidth={2.5} />
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
          </Accordion>
        </div>
        </div>
      </CommonWrapper>
    </div>
  );
}
