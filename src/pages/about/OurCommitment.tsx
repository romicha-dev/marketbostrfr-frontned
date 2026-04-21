
import { useNavigate } from "react-router-dom";
const bgImg1 = "/images/about/commitmentbgImg1.svg";
const bgImg2 = "/images/about/commitmentBgImg.svg";

export default function OurCommitment() {
  const navigate = useNavigate()
  return (
    <div className="bg-[#1C60DF] pt-14 pb-10 relative">

        {/* Background Image (Optional) */}
        {/* <div
          className="absolute inset-0 bg-cover bg-center opacity-10 z-0"
          style={{ backgroundImage: `url('/image/about/commitmentBgImg')` }}
        ></div> */}
        <div className="flex items-center">
         <div className="hidden md:block">
          <img src={bgImg1} alt="" />
         </div>
       

        <div className="relative w-full z-10 text-center text-white">
          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-arima leading-snug md:leading-[150%] font-bold mb-6">
            Our Commitment
          </h2>

          {/* Description */}
          <p className="text-lg sm:text-xl font-normal max-w-5xl mx-auto font-roboto px-3 md:px-0 mb-16 mt-5">
            At KayLeo, we're committed to providing transparent, reliable
            service. Every package is tracked, every quote is clear, and every
            customer receives the attention they deserve. We don't just ship
            packages—we deliver peace of mind.
          </p>

          {/* Statistics and Contact Button */}
          <div className="max-w-3xl mx-auto grid grid-cols-2  sm:grid-cols-4 md:grid-cols-4 px-3 gap-8 mb-8">
            <div className="flex flex-col items-center">
              <span className="text-2xl sm:text-3xl md:text-4xl leading-snug md:leading-[150%] font-arima font-semibold mb-2">100%</span>
              <span className="text-sm sm:text-base font-normal font-roboto text-[#E4E9F1]">Transparent Pricing</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl sm:text-3xl md:text-4xl leading-snug md:leading-[150%] font-arima font-semibold mb-2">24/7</span>
              <span className="text-sm sm:text-base font-normal font-roboto text-[#E4E9F1]">Package Tracking</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl sm:text-3xl md:text-4xl leading-snug md:leading-[150%] font-arima font-semibold mb-2">10+</span>
              <span className="text-sm sm:text-base font-normal font-roboto text-[#E4E9F1]">Years Experience</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl sm:text-3xl md:text-4xl leading-snug md:leading-[150%] font-arima font-semibold mb-2">2.5K+</span>
              <span className="text-sm sm:text-base font-normal font-roboto text-[#E4E9F1]">Happy Clients</span>
            </div>
          </div>

          {/* Call-to-Action Button */}
          <div>
            <button
              onClick={()=> navigate('/contact')}
              className="inline-block bg-transparent border cursor-pointer font-inter border-white text-white px-6 py-3 mt-10 text-lg md:text-xl font-semibold transition-all hover:bg-blue-600 hover:text-white"
            >
              Contact Us
            </button>
          </div>
        </div>
<div className="relative">
  <img 
  
  src={bgImg2} alt="" className="w-full hidden md:block" />
  <div className="absolute inset-0 bg-[#1C60DF]/50"></div>
</div>


         </div>

    </div>
  );
}
