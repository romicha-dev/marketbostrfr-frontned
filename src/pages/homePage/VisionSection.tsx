import SectionTitle from "@/components/reuseable/SectionTitle";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import titleIcon from "/images/home/sectionTitleIcon.png";

export default function VisionSection() {
  return (
    <div className="bg-[#F7FAFF] py-20 px-6 md:px-12 lg:px-20">
      <div className="max-w-screen-xl mx-auto text-center">
        <SectionTitle
          icon={titleIcon}
          label="Clear vision"
          title="What You Must Check Before Using Our Platform"
          subtitle="These core principles guide everything we do at KayLeo"
        />
        {/* Product Weight */}
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
  <div className="w-full bg-white rounded-lg p-4 border border-[#EDF3FF] hover:shadow-lg transition-colors">

            <div className="text-2xl md:text-3xl flex-shrink-0 mb-7 text-white bg-[#1956C9] rounded-lg w-10 h-10 flex items-center justify-center">
              <HiOutlineShoppingBag />
            </div>
            <div className="flex-1 text-start">
              <h4 className="font-semibold font-arima leading-snug md:leading-[150%] text-gray-900 text-sm md:text-xl mb-2">
                Real delivery coverage
              </h4>
              <p className="text-xs md:text-sm font-roboto md:leading-[150%] text-gray-700 leading-relaxed">
                DOM-TOM specifics: Guadeloupe, Martinique, Guyane, La Réunion,
                Mayotte, Polynesia, New Caledonia
              </p>
            </div>
          </div>

          <div className=" w-full bg-white rounded-lg p-4 border border-[#EDF3FF] hover:shadow-lg transition-colors">
            <div className="text-2xl md:text-3xl flex-shrink-0 mb-7 text-white bg-[#1956C9] rounded-lg w-10 h-10 flex items-center justify-center">
              <HiOutlineShoppingBag />
            </div>
            <div className="flex-1 text-start">
              <h4 className="font-semibold font-arima leading-snug md:leading-[150%] text-gray-900 text-sm md:text-xl mb-2">
                Carrier restrictions
              </h4>
              <p className="text-xs md:text-sm font-roboto md:leading-[150%] text-gray-700 leading-relaxed">
                Batteries, liquids, cosmetics, hazardous items
              </p>
            </div>
          </div>

          <div className=" w-full bg-white rounded-lg p-4 border border-[#EDF3FF] hover:shadow-lg transition-colors">
            <div className="text-2xl md:text-3xl flex-shrink-0 mb-7 text-white bg-[#1956C9] rounded-lg w-10 h-10 flex items-center justify-center">
              <HiOutlineShoppingBag />
            </div>
            <div className="flex-1 text-start">
              <h4 className="font-semibold font-arima leading-snug md:leading-[150%] text-gray-900 text-sm md:text-xl mb-2">
                Customs rules and taxes
              </h4>
              <p className="text-xs md:text-sm font-roboto md:leading-[150%] text-gray-700 leading-relaxed">
                Stay informed about duties, fees, and country-specific
                regulations.
              </p>
            </div>
          </div>

          <div className=" w-full bg-white rounded-lg p-4 border border-[#EDF3FF] hover:shadow-lg transition-colors">
            <div className="text-2xl md:text-3xl flex-shrink-0 mb-7 text-white bg-[#1956C9] rounded-lg w-10 h-10 flex items-center justify-center">
              <HiOutlineShoppingBag />
            </div>
            <div className="flex-1 text-start">
              <h4 className="font-semibold font-arima leading-snug md:leading-[150%] text-gray-900 text-sm md:text-xl mb-2">
                Product weight
              </h4>
              <p className="text-xs md:text-sm font-roboto md:leading-[150%] text-gray-700 leading-relaxed">
                Dimensional weight vs. actual weight
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
