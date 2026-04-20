import CommonWrapper from "@/common/CommonWrapper";
import { HiOutlineShoppingBag } from "react-icons/hi2";

const coreValues = [
  {
    icon: <HiOutlineShoppingBag />,
    title: "Our Mission",
    description:
      "To provide reliable, affordable shipping solutions connecting France with DOM-TOM territories, making online shopping accessible to everyone.",
  },
  {
    icon: <HiOutlineShoppingBag />,
    title: "Customer First",
    description:
      "We prioritize customer satisfaction with transparent pricing, real-time tracking, and responsive support.",
  },
  {
    icon: <HiOutlineShoppingBag />,
    title: "Quality Service",
    description:
      "Over 10 years of experience in international logistics ensures your packages arrive safely and on time.",
  },
  {
    icon: <HiOutlineShoppingBag />,
    title: "Our Team",
    description:
      "A dedicated team of logistics professionals passionate about serving our community.",
  },
  {
    icon: <HiOutlineShoppingBag />,
    title: "Global Reach",
    description:
      "Comprehensive coverage of all French overseas territories with partnerships with leading carriers.",
  },
];

export default function CoreValues() {
  return (
    <div className="bg-[#F7FAFF] pt-14 pb-10">
      <CommonWrapper>
        <div className="text-center mb-10">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold font-arima leading-snug md:leading-[150%] mb-4">
            Our Core Values
          </h3>
          <p className="text-[#424A52] text-sm md:text-base font-roboto leading-snug md:leading-[150%] font-normal">
            These core principles guide everything we do at KayLeo
          </p>
        </div>

        {/* Fixed Grid - Mobile এ full width */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {coreValues.map((value, index) => (
            <div
              key={index}
              className="w-full bg-white rounded-lg p-4 border border-[#EDF3FF] hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-2xl md:text-3xl flex-shrink-0 mb-7 text-white bg-[#1956C9] rounded-lg w-10 h-10 flex items-center justify-center">
                {value.icon}
              </div>
              <div className="flex-1 text-start">
                <h4 className="font-semibold text-gray-900 text-sm md:text-xl font-arima leading-snug md:leading-[150%] mb-2">
                  {value.title}
                </h4>
                <p className="text-xs md:text-sm text-gray-700 leading-relaxed md:leading-[150%] font-roboto">
                  {value.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CommonWrapper>
    </div>
  );
}