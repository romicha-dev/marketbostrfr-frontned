import CommonWrapper from "@/common/CommonWrapper"


const AirFreightService = () => {
  return (
    <div className="py-12">
       <div className="text-center mb-[56px]">
                <h1 className="flex items-center justify-center gap-1 text-[#164DB2] text-sm sm:text-base md:text-lg font-normal leading-7 mb-4">
                  <svg width="22" height="12" viewBox="0 0 22 12" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M6 0H10L4 12H0L6 0Z" fill="#1C60DF"/>
  <path d="M12 0H16L10 12H6L12 0Z" fill="#1C60DF"/>
  <path d="M18 0H22L16 12H12L18 0Z" fill="#1C60DF"/>
</svg>
                  Services</h1>
                <p className="text-base sm:text-lg md:text-xl font-arima font-semibold leading-[150%]">KayLeo: Bringing France Closer to the Overseas Territories</p>
              </div>
       <CommonWrapper>
        <div className="flex flex-col md:flex-row gap-2 md:gap-6 xl:gap-[177px]">
            <div>
             
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <div className="relative w-full">
  <div className="w-full max-w-full lg:max-w-[520px] h-[350px] sm:h-[400px] lg:h-[580px] overflow-hidden rounded-lg shadow-lg">
    <img
      src="/images/services/airFreight.png"
      alt="Main image"
      className="w-full h-full object-cover"
    />
  </div>

  <div className="absolute left-8 top-10">
    <h2 className="text-white text-xl sm:text-2xl md:text-[34px] font-arima font-semibold leading-[150%] mb-1.5">
      Air Freight
    </h2>
    <p className="text-white text-xs sm:text-sm md:text-base font-normal font-roboto leading-[150%]">
      Economical shipping option for larger or non-urgent packages.
    </p>
  </div>
</div>

            </div>
          </div>
          {/* left side */}
          <div className="w-full px-8 md:px-0 md:w-1/2 text-start lg:mr-14">
            <p className="text-sm sm:text-base md:text-xl text-[#000000] font-semibold font-arima mb-4 leading-[150%]">
               Air Freight Service
            </p>
            <h2 className="text-xs sm:text-sm md:text-base font-normal text-[#00000080] font-roboto mb-4">Fast & Reliable Air Freight Delivery</h2>
            <div>
              <p className=" text-[#000000] text-xs sm:text-sm md:text-base font-normal font-roboto mb-4 leading-[150%]">
              When speed matters, KayLeo’s Air Freight Service ensures your packages reach the DOM-TOM quickly and safely.
              </p>

              <p className="text-[#000000] text-xs sm:text-sm md:text-base font-normal font-roboto mb-6 leading-[150%]">
               We handle your shipments from the moment they arrive at our facility in France to final delivery at your destination. Each package is carefully inspected, weighed, and securely prepared for air transport, guaranteeing fast transit times and full traceability
           
              </p>
            
              <h2 className="text-[#000000] text-sm sm:text-base md:text-xl leading-[150%] font-roboto font-normal mb-4">Our air freight solution is ideal for:</h2>

              <ul className="text-sm sm:text-base md:text-lg leading-[150%] font-arima font-semibold list-disc gap-y-2 px-4">
                <li>Express delivery</li>
                <li>2-4 business days</li>
                <li>Full tracking</li>
                <li>Insurance included</li>
              </ul>
            </div>

            {/* <div className="flex flex-col  gap-10 mt-12">
              <div>
                <h4 className="text-xl font-semibold mb-4 text-[#1C1F22]">Real-Time Tracking & Notifications</h4>
                <p className="text-[#424A52] font-normal mb-4">
                  From the moment your package arrives at our warehouse to final delivery, you’ll receive automated email notifications and can follow every movement in your Client Area.
                </p>
                
              </div>
            <div>
  <h4 className="text-xl font-semibold mb-4 text-[#000000]">Status includes:</h4>
  <ul className="grid grid-cols-2 w-80 gap-y-4   text-[#000000] font-normal list-disc list-inside">
    <li>Received</li>
    <li>Weighed</li>
    
    <li>Quote Pending</li>
    <li>Paid</li>
    <li>Shipped</li>
    <li>Deliverd</li>
  </ul>
</div>

            </div> */}
          </div>

          {/* right side */}
          
        </div>
      </CommonWrapper>
    </div>
  )
}

export default AirFreightService
