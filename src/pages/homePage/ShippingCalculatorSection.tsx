
import { useState } from "react";
import shippingBgPattern from "/images/home/ShippingCalculator.png";
import CommonWrapper from "@/common/CommonWrapper";

export default function ShippingCalculatorSection() {
  const [weight, setWeight] = useState("1.8");
  const [destination, setDestination] = useState("Madagascar");
    const [result, setResult] = useState<null | {
      cost:string
      price: string;
      note: string;
    }>(null);
  

    const handleCalculate = () => {
      // fake calculation (frontend demo)
      const calculatedPrice = (Number(weight) * 12).toFixed(2);
  
      setResult({
         cost: `Estimated Cost`,
        price: `€${calculatedPrice}`,
        note: `Estimated shipping cost to ${destination} for ${weight} kg package.`,
      });
    };

  return (
    <section
      style={{
        backgroundImage: `url("${shippingBgPattern}")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className="w-full bg-gray-900 text-white py-16 md:py-40 relative overflow-hidden"
    >
      {/* Background pattern overlay */}
      {/* <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 opacity-60"></div> */}
      {/* Gradient overlay */}
      {/* <div className="absolute inset-0 bg-gradient-to-r from-gray-900/40 to-transparent"></div> */}
 <CommonWrapper>
      <div className="  relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Image */}
          <div className="hidden lg:block relative"></div>

          {/* Right Calculator Form */}
          <div className="flex flex-col gap-6">
            <div className="max-w-md">
              <h2 className="text-3xl md:text-4xl font-semibold font-arima leading-snug md:leading-[150%] text-white mb-3 text-balance">
                Estimate delivery to overseas territories
              </h2>
              <p className="text-gray-300 text-base md:text-lg font-roboto leading-relaxed">
                Transparent, competitive pricing for shipping to all DOM-TOM
                territories. No hidden fees, just honest rates.
              </p>
            </div>

            {/* Calculator Card */}
            <div className="bg-white text-gray-900 rounded-lg p-6 md:p-8 shadow-xl">
              <h3 className="text-lg md:text-xl font-semibold font-roboto leading-snug md:lea[150%] mb-2">
                Live Shipping Calculator
              </h3>
              <p className="text-sm sm:text-base font-roboto font-normal leading-snug md:leading-[150%] text-[#4A5565] mb-6">
                Get an instant estimate for your shipment
              </p>

              {/* Form Fields */}
              <div className="space-y-5">
                {/* Package Weight */}
                <div>
                  <label
                    htmlFor="weight"
                    className="block text-sm font-normal font-roboto leading-snug md:leading-[150%] text-gray-700 mb-2"
                  >
                    Package Weight (kg)
                  </label>
                  <input
                    id="weight"
                    type="text"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                    placeholder="Enter weight"
                  />
                </div>

                {/* Destination */}
                <div>
                  <label
                    htmlFor="destination"
                    className="block text-sm font-normal font-roboto leading-snug md:leading-[150%] mb-2"
                  >
                    Destination
                  </label>
                  <select
                    id="destination"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full px-4 py-3 text-sm md:text-base font-roboto border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition appearance-none cursor-pointer"
                  >
                    <option>Madagascar</option>
                    <option>Reunion</option>
                    <option>Mauritius</option>
                    <option>Guadeloupe</option>
                    <option>Martinique</option>
                  </select>
                </div>

                {/* Calculate Button */}
                <button onClick={handleCalculate} className="w-full  bg-[#155DFC] hover:bg-blue-700 text-white font-normal mb-4 leading-snug md:leading-[150%] py-3 md:py-4 text-base md:text-lg rounded-lg cursor-pointer transition-colors font-inter  mt-2">
                  Calculate Quote
                </button>
              </div>
                 {/* ✅ Result Section */}
          {result && (
            <div className="bg-[#F0FDF4] border border-[#B9F8CF] rounded-xl p-6 text-left animate-fadeIn">
              <h1 className='text-[#4A5565] font-inter font-medium text-sm leading-[150%] mb-2 '>{result.cost}</h1>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#00A63E] mb-2">
                {result.price}
              </h3>
              <p className="text-[#6A7282] text-sm font-roboto font-normal leading-snug">
                {result.note}
              </p>
            </div>
          )}
            </div>
          </div>
        </div>
      </div>
      </CommonWrapper>
    </section>
  );
}
