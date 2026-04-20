import CommonWrapper from "@/common/CommonWrapper";
import img1 from '../../../public/images/about/storyImg1.jpg'
import img2 from '../../../public/images/about/storyImg2.png'

export default function OurStory() {
  return (
    <section className="py-32">
      <CommonWrapper>
        <div className="flex flex-col md:flex-row gap-5">
          {/* left side */}
          <div className="w-full md:w-1/2 text-start mr-14">
            <p className="text-lg md:text-xl text-[#171A1D] font-semibold font-arima leading-snug md:leading-[150%] border-l-[2px] border-l-[#171A1D] pl-3 mb-4.5">
              About KayLeo
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold font-arima leading-[150%]  mb-4">Our Story</h2>
            <div>
              <p className="text-[#3C434B] font-normal text-sm md:text-base font-roboto mb-8">
                KayLeo was founded with a simple mission: to bridge the gap
                between online shopping in mainland France and delivery to
                French overseas territories. We understand the challenges faced
                by DOM-TOM residents when trying to access products from popular
                e-commerce platforms. <br />

                With over 10 years of experience in international logistics,
                we've built a reliable network and streamlined processes that
                make shipping affordable and hassle-free. Our team works
                tirelessly to ensure every package is handled with care and
                delivered on time. <br />
                Today, we're proud to serve thousands of satisfied customers
                across all DOM-TOM territories, helping them access the products
                they love from France's top e-commerce platforms.
              </p>

              <p className="text-[#3C434B] font-normal text-sm md:text-base font-roboto mb-9">
                Transparency, reliability, and customer satisfaction are at the
                heart of everything we do.A dedicated team of logistics
                professionals passionate about serving our community.
              </p>
            </div>

            <div className="flex items-center gap-10 mt-12">
              <div>
                <h4 className="text-gray-900 text-base sm:text-lg md:text-xl font-arima leading-snug md:leading-[150%] font-semibold mb-4">Our Mission</h4>
                <p className="text-[#424A52] font-roboto text-sm md:text-base leading-snug md:leading-[150%] font-normal">
                  To connect DOM-TOM residents with global e-commerce through
                  reliable, affordable shipping solutions.
                </p>
              </div>
              <div>
                <h4 className="text-gray-900 text-base sm:text-lg md:text-xl font-arima leading-snug md:leading-[150%] font-semibold mb-4">Our Mission</h4>
                <p className="text-[#424A52] font-roboto text-sm md:text-base leading-snug md:leading-[150%] font-normal">
                  To connect DOM-TOM residents with global e-commerce through
                  reliable, affordable shipping solutions.
                </p>
              </div>
            </div>
          </div>

          {/* right side */}
      {/* right side */}
<div className="relative w-full md:w-1/2 flex justify-end items-center">
  {/* Large Image */}
  <div className="w-full h-[350px] sm:h-[400px] lg:h-[580px] overflow-hidden rounded-lg shadow-lg">
    <img
      src={img1}
      alt="Main image"
      className="w-full h-full object-cover"
    />

    {/* Small Image */}
    <div className="absolute      left-1/2 
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
                    bg-white
   ">
      <img
        src={img2}
        alt="Secondary image"
        className="w-full h-full object-cover rounded-[8px]"
      />
    </div>
  </div>
</div>
</div>
</CommonWrapper>
</section>
        
   
  );
}
