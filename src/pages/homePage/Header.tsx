import SectionTitle from "@/components/reuseable/SectionTitle";
import titleIcon from "/images/home/sectionTitleIcon.png";
import { HiOutlineShoppingBag } from "react-icons/hi2";

const Header = () => {
  return (
    <header className="bg-gray-50 py-10 px-6 md:px-12 lg:px-20">
      <div className="max-w-screen-xl mx-auto text-center">
        <SectionTitle
          icon={titleIcon}
          label="Clear vision"
          title="What You Must Check Before Using Our Platform"
          subtitle="These core principles guide everything we do at KayLeo"
        />
        {/* Product Weight */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="max-w-[300px] bg-white rounded-lg p-4 border border-[#EDF3FF] hover:shadow-lg transition-colors">
            <div className="text-2xl md:text-3xl flex-shrink-0 mb-2 text-white bg-[#1956C9] rounded-full w-10 h-10 flex items-center justify-center">
              <HiOutlineShoppingBag />
            </div>
            <div className="flex-1 text-start">
              <h4 className="font-semibold text-gray-900 text-sm md:text-xl mb-2">
                We Receive & Process
              </h4>
              <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
                Your package arrives at our warehouse. We weigh it and send you
                a quote.
              </p>
            </div>
          </div>

          <div className="max-w-[300px] bg-white rounded-lg p-4 border border-[#EDF3FF] hover:shadow-lg transition-colors">
            <div className="text-2xl md:text-3xl flex-shrink-0 mb-2 text-white bg-[#1956C9] rounded-full w-10 h-10 flex items-center justify-center">
              <HiOutlineShoppingBag />
            </div>
            <div className="flex-1 text-start">
              <h4 className="font-semibold text-gray-900 text-sm md:text-xl mb-2">
                We Receive & Process
              </h4>
              <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
                Your package arrives at our warehouse. We weigh it and send you
                a quote.
              </p>
            </div>
          </div>

          <div className="max-w-[300px] bg-white rounded-lg p-4 border border-[#EDF3FF] hover:shadow-lg transition-colors">
            <div className="text-2xl md:text-3xl flex-shrink-0 mb-2 text-white bg-[#1956C9] rounded-full w-10 h-10 flex items-center justify-center">
              <HiOutlineShoppingBag />
            </div>
            <div className="flex-1 text-start">
              <h4 className="font-semibold text-gray-900 text-sm md:text-xl mb-2">
                We Receive & Process
              </h4>
              <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
                Your package arrives at our warehouse. We weigh it and send you
                a quote.
              </p>
            </div>
          </div>

          <div className="max-w-[300px] bg-white rounded-lg p-4 border border-[#EDF3FF] hover:shadow-lg transition-colors">
            <div className="text-2xl md:text-3xl flex-shrink-0 mb-2 text-white bg-[#1956C9] rounded-full w-10 h-10 flex items-center justify-center">
              <HiOutlineShoppingBag />
            </div>
            <div className="flex-1 text-start">
              <h4 className="font-semibold text-gray-900 text-sm md:text-xl mb-2">
                We Receive & Process
              </h4>
              <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
                Your package arrives at our warehouse. We weigh it and send you
                a quote.
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
