

const HomePickupReminders = () => {
  return (
   <div className="  ">
      <div className=" ">
   

      
       
   
        
        

        {/* What's Included Section */}
        <div className="bg-[#FEFCE8] border border-[#FFF085] rounded-xl p-6 mb-7">
          <h3 className="text-sm sm:text-base font-normal font-roboto text-[#000000] leading-[150%] mb-5.5">
           Home Pick-up Service
          </h3>

          <ul className="space-y-4 text-xs sm:text-sm md:text-base leading-[150%] font-normal text-[#4A5565]">
            <li className="flex items-start gap-2">
              <span className=" flex-shrink-0 mt-0.5">•</span>
              <span> Pick-up directly at your address in France</span>
            </li>
            <li className="flex items-start gap-2">
              <span className=" flex-shrink-0 mt-0.5">•</span>
              <span>Flexible time slots Monday to Saturday</span>
            </li>
            <li className="flex items-start gap-2">
              <span className=" flex-shrink-0 mt-0.5">•</span>
              <span>Service fee: €10 per pickup (regardless of number of packages)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="flex-shrink-0 mt-0.5">•</span>
              <span>Automatic confirmation and 24h reminder</span>
            </li>
         
          </ul>
        </div>
         <div className="bg-[#E8FFF0] border border-[#34ED79] rounded-xl p-6 mb-6">
          <div className="6">
           
            <h3 className="text-sm sm:text-base md:text-xl  font-normal font-roboto text-[#06742F] leading-[150%] mb-4">Service Fee</h3>
              
                
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-normal font-roboto leading-snug text-[#4A5565] mb-2">Pickup fee:</span>
                  <span className="text-sm font-bold text-green-600">10€</span>
                </div>
                <div className="border-t border-green-200 my-2"></div>
                <div className="flex justify-between items-center">
                  <span className="text-sm sm:text-base md:text-xl  font-normal font-roboto text-[#101828] leading-[150%] mb-4">Total Cost</span>
                  <span className="text-xl font-bold text-green-600">10€</span>
                </div>
             
            </div>
          </div>   
      </div>
    </div>
  )
}

export default HomePickupReminders
