import CommonWrapper from "@/common/CommonWrapper";

const OurService = () => {
  return (
    <div className="py-12">
      <CommonWrapper>
        <div className="flex flex-col md:flex-row gap-8 lg:gap-5">
          {/* left side */}
          <div className="w-full md:w-1/2 text-start md:mr-14">
            <p className="text-xl text-[#171A1D] font-arima font-semibold border-l-[2px] border-l-[#171A1D] pl-3 mb-4">
              Our Services
            </p>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-arima font-semibold mb-4">
              Service we Provide
            </h2>
            <div>
              <p className="text-[#3C434B] font-roboto font-normal mb-4 leading-[150%]">
                KayLeo offers end-to-end logistics solutions designed
                specifically for residents of the French overseas territories
                (DOM-TOM). Our services make it easy, affordable, and secure to
                shop online in mainland France and receive your purchases—no
                matter where you live
              </p>

              <p className="text-[#3C434B] font-roboto font-normal mb-4 leading-[150%]">
                Shop from any e-commerce platform in mainland France—Amazon,
                Shein, Temu, Zalando, Cdiscount, and more—and have your order
                delivered to your KayLeo Mailbox
                <span className="block">Address.</span>
                <span className="block">
                  Once received, we handle everything: weighing, processing,
                  quoting, payment, and shipping.
                </span>
              </p>

              <p className="text-[#3C434B] font-roboto font-normal ">
                A cost-effective solution for heavier or larger shipments.
                Whether you're ordering bulk items, furniture, appliances, or
                multiple packages, sea freight offers unbeatable value.
              </p>
            </div>

            <div className="flex flex-col gap-10 mt-12">
              <div>
                <h4 className="text-xl font-semibold font-arima mb-4 text-[#1C1F22]">
                  Real-Time Tracking & Notifications
                </h4>
                <p className="text-[#424A52] font-roboto font-normal mb-4">
                  From the moment your package arrives at our warehouse to final
                  delivery, you'll receive automated email notifications and can
                  follow every movement in your Client Area.
                </p>
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-4 font-inter text-[#000000]">
                  Status includes:
                </h4>
                <ul className="grid grid-cols-2 max-w-[320px] gap-y-4 font-inter text-[#000000] font-normal list-disc list-inside">
                  <li>Received</li>
                  <li>Weighed</li>
                  <li>Quote Pending</li>
                  <li>Paid</li>
                  <li>Shipped</li>
                  <li>Delivered</li>
                </ul>
              </div>
            </div>
          </div>

          {/* right side - Fixed responsive issues */}
          <div className="w-full md:w-1/2">
            <div className="flex items-center justify-center">
              {/* Container for images */}
              <div className="relative w-full ">
                {/* Large Image - Full width on mobile */}
                <div className="w-full h-[350px] sm:h-[400px] lg:h-[580px] overflow-hidden rounded-lg shadow-lg">
                  <img
                    src="/images/services/ourServiceImg.png"
                    alt="Main image"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Small Image - Responsive positioning */}
                <div
                  className="absolute
                    left-1/2 
                    -translate-x-1/2 
                    -bottom-10
                    md:left-0
                    md:-translate-x-1/4
                    md:bottom-10
                    w-[180px]
                    h-[150px]
                    sm:w-[220px]
                    sm:h-[200px]
                    lg:w-[260px]
                    lg:h-[250px]
                    overflow-hidden
                    rounded-2xl
                    shadow-2xl
                    z-10
                    border-4
                    sm:border-6
                    border-white
                    bg-white"
                >
                  <img
                    src="/images/services/seviceImg2.jpg"
                    alt="Secondary image"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Extra spacing for mobile to accommodate overlapping small image */}
        <div className="h-16 sm:h-0"></div>
      </CommonWrapper>
    </div>
  );
};

export default OurService