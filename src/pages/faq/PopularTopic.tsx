import CommonWrapper from '@/common/CommonWrapper'


const PopularTopic = () => {
  return (
    <div className='py-[145px]'>
        <CommonWrapper>
        <div className="flex flex-col md:flex-row gap-2 md:gap-6 lg:gap-[177px]">
          
          {/* left side */}
            <div className="w-full md:w-1/2 text-start md:mr-14">
            <p className="text-xl text-[#171A1D]  font-arima font-semibold border-l-[2px] border-l-[#171A1D] pl-3 mb-4">
              Frequently asked question
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-arima font-semibold mb-6">Popular Topic</h2>
            <div>
              <p className="text-[#424A52] font-roboto text-sm sm:text-base font-normal mb-6 leading-[150%]">
              Behind every clear vision is a team of dedicated professionals. Our ophthalmologists combine years of clinical experience with a passion for restoring sight delivering advanced care with precision, empathy, and excellence.
              </p>

              <p className="text-[#424A52] font-roboto text-sm sm:text-base font-normal mb-6 leading-[150%]">
           Behind every clear vision is a team of dedicated professionals. Our ophthalmologists combine years of clinical experience with a passion for restoring sight delivering advanced care with precision, empathy, and excellence. 
           
              </p>
            
            
            </div>

          
          </div>

          {/* right side */}
             {/* Large Image */}
              <div className="relative">
                <div className="w-full  lg:w-[520px] h-[350px] sm:h-[400px]  overflow-hidden rounded-lg shadow-lg">
                  <img
                    src="/images/faq/popularTopic.svg"
                    alt="Main image"
                    className="w-full h-full object-cover"
                  />
                </div>

               
              </div>
          
        </div>
      </CommonWrapper>
    </div>
  )
}

export default PopularTopic
