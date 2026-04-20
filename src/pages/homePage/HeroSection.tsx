// import ProcessCard from "@/components/homeComponent/ProcessCard";
// // import Image from "next/image";
// import { Button } from "@/components/ui/button";
// // import ProcessCard from "@/components/cards/process-card";

// export default function HeroSection() {
//   return (
//     <section className="w-full bg-white">
//       {/* Main Hero Container */}
//       <div className="py-12 md:py-20">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start lg:items-center">
//           {/* Left Content */}
//           <div className="flex flex-col justify-start pt-4 md:pt-8">
//             <h1 className="text-3xl md:text-4xl lg:text-4xl font-bold text-gray-900 leading-tight text-balance mb-6">
//               Worldwide Shopping. <br /> Fast, Reliable Shipping with KayLeo.
//             </h1>

//             <p className="text-base md:text-lg text-gray-600 mb-8 text-balance">
//              We make international shipping simple, secure, and affordable.Get what you love from any country, delivered straight to your doorstep.
//             </p>

//             {/* CTA Buttons */}
//             <div className="flex flex-col sm:flex-row gap-4 mb-12">
//               <Button
//                 size="lg"
//                 className="bg-blue-600 hover:bg-blue-700 text-white px-6 md:px-8 py-3 md:py-4 font-semibold text-base md:text-lg"
//               >
//                 Order mon compte
//               </Button>
//               <Button
//                 variant="outline"
//                 size="lg"
//                 className="px-6 md:px-8 py-3 md:py-4 font-semibold text-base md:text-lg border-gray-400 text-gray-900 hover:bg-gray-50 bg-transparent"
//               >
//                 Devis rapide
//               </Button>
//             </div>

//             {/* Process Section */}
//             <div>
//               <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-6">
//                 Simple 3-Step Process how it works
//               </h3>
//               <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//                 <ProcessCard
//                   icon="📦"
//                   title="Order Online"
//                   description="Shop from your favorite stores and use your KayLeo mailbox address."
//                 />
//                 <ProcessCard
//                   icon="✓"
//                   title="We Receive & Process"
//                   description="Your package arrives at our warehouse. We weigh it and send you a quote."
//                 />
//                 <ProcessCard
//                   icon="🚚"
//                   title="Pay & Track"
//                   description="Pay online and track your shipment in real-time until delivery."
//                 />
//               </div>
//               <a
//                 href="#"
//                 className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-4 inline-block"
//               >
//                 View Details →
//               </a>
//             </div>
//           </div>

//           {/* Right Images */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-fit">
//             <div className="flex flex-col gap-4">
//               <div className="relative w-full h-80 rounded-lg overflow-hidden bg-gray-200 sm:h-96">
//                 <img
//                   src="/images/image.png"
//                   alt="Delivery workers with packages"
//                   //   fill
//                   className="object-cover"
//                   //   priority
//                 />
//               </div>
//             </div>
//             <div className="flex flex-col gap-4 justify-start pt-0 sm:pt-16">
//               <div className="relative w-full h-80 rounded-lg overflow-hidden bg-gray-200 sm:h-96">
//                 <img
//                   src="/images/image.png"
//                   alt="Woman receiving package"
//                   //   fill
//                   className="object-cover"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

import ProcessCard from "@/components/homeComponent/ProcessCard";
import { Button } from "@/components/ui/button";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import heroImg1 from "/images/home/heroImg1.png";
import heroImg2 from "/images/home/heroImg2.png";
import CommonWrapper from "@/common/CommonWrapper";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate = useNavigate()
  return (
    <CommonWrapper>
      <section className="w-full bg-white">
        <div className="py-20 lg:py-20">
          {/* MAIN WRAPPER */}
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-start">
            
            {/* LEFT CONTENT */}
            <div className="flex flex-col w-full lg:max-w-[52%]">
<h1 className="text-[32px]  md:px-0 sm:text-[40px] md:text-5xl font-bold font-arima  px-3 lg:whitespace-nowrap md:leading-[150%] not-italic text-gray-900 mb-6">
  Worldwide Shopping.
  <span className="block md:whitespace-nowrap">
    Fast, Reliable Shipping with KayLeo.
  </span>
</h1>


              {/* DESCRIPTION */}
              <p
                className="
                  text-gray-600
                  text-sm md:text-base
                  font-normal font-roboto
                  mb-10 
                  xl:whitespace-nowrap
                "
              >
                We make international shipping simple, secure, and affordable.
                Get what you love from any country, delivered straight to your
                doorstep.
              </p>

              {/* CTA BUTTONS */}
              <div className="flex flex-col w-full md:flex-row gap-4 px-3 lg:px-0 mb-20">
                <Button
                onClick={()=> navigate('/signup')}
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white leading-[120%] px-8 py-4 text-base font-medium font-inter cursor-pointer"
                >
                  Créer mon compte
                </Button>
                <Button
                onClick={()=> navigate('/rates')}
                  variant="outline"
                  size="lg"
                  className="px-8 py-4 text-base font-medium font-inter leading-[120%] border-gray-300 hover:bg-gray-50 text-gray-900 cursor-pointer"
                >
                  calculateur d'amour
                </Button>
              </div>

              {/* PROCESS HEADER */}
              <div className="flex w-full items-center justify-between lg:mt-28 mb-6">
               <div className="flex flex-col md:flex-row items-center justify-between w-full ">
                 <h3 className="text-sm sm:text-base md:text-xl font-roboto font-normal leading-[150%] text-gray-900">
                  Simple 3-Step Process how it works
                </h3>
                <a
                  href="#"
                  className="text-blue-600 text-sm font-normal font-roboto leading-[150%] hover:underline"
                >
                  View Details
                </a>
               </div>
              </div>

              {/* PROCESS CARDS */}
              <div className=" w-full grid grid-cols-1  sm:grid-cols-3 gap-4">
                <ProcessCard
                  icon={<HiOutlineShoppingBag />}
                  title="Order Online /Physical drop-off or Pickup"
                  description="Shop from your favorite stores and use your KayLeo mailbox address."
                />
                <ProcessCard
                  icon={<HiOutlineShoppingBag />}
                  title="We Receive & Process"
                  description="Your package arrives at our warehouse. We weigh it and send you a quote."
                />
                <ProcessCard
                  icon={<HiOutlineShoppingBag />}
                  title="Pay & Track"
                  description="Pay online and track your shipment in real-time until delivery."
                />
              </div>
            </div>

            {/* RIGHT IMAGES (UNCHANGED LAYOUT) */}
             <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4 place-items-center w-full lg:self-end">
              
              {/* LEFT IMAGE */}
              <div className="relative w-full h-[280px] sm:h-[410px] md:h-[709px] lg:h-[410px]  rounded-xl overflow-hidden self-end">
                <img
                  src={heroImg1}
                  alt="Courier handing package"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* RIGHT IMAGE */}
              <div className="relative w-full h-[280px] sm:h-[709px] rounded-xl overflow-hidden">
                <img
                  src={heroImg2}
                  alt="Woman unpacking delivery"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>
    </CommonWrapper>
  );
}
