import React from 'react';


const DropReminders: React.FC = () => {
  return (
    <div className="  ">
      <div className=" ">
   

        {/* Reminder Section */}
        <div className="bg-[#EFF6FF] border border-blue-100 rounded-xl p-6 mb-6">
          <div className="flex items-start gap-2 mb-6">
            <div className="flex-shrink-0 flex items-center">
     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M9 18.88C9.92 19.28 10.93 19.5 12 19.5C16.14 19.5 19.5 16.14 19.5 12C19.5 10.93 19.28 9.92 18.88 9" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M17.21 6.6C15.86 5.3 14.02 4.5 12 4.5C7.86 4.5 4.5 7.86 4.5 12C4.5 14.01 5.29 15.84 6.58 17.19" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M12 4V2" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M4 12H2" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M12 20V22" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M20 12H22" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M14.12 9.88L9.88 14.12C9.34 13.58 9 12.83 9 12C9 10.34 10.34 9 12 9C12.83 9 13.58 9.34 14.12 9.88Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M22 2L2 22" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
            </div>
            <h3 className="text-sm sm:text-base font-normal font-roboto text-[#000000] leading-[150%] ">Our Locationr</h3>
          </div>
        <h3 className='text-sm font-normal font-roboto leading-snug text-[#4A5565] mb-2'>123 Avenue de la Logistique</h3>
        <p className='text-sm font-normal font-roboto leading-snug text-[#4A5565]'>75001 Paris, France</p>
        
        </div>
        <div className="bg-[#FAEFFF] border border-[#BF32EE] rounded-xl p-6 mb-6">
          <div className="flex items-start gap-2 mb-6">
            <div className="flex-shrink-0 flex items-center">
<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="10.75" cy="10.75" r="10" stroke="black" stroke-width="1.5"/>
  <path d="M8.25 8.25L11.7499 11.7496M14.75 6.75L9.75 11.75" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
            </div>
            <h3 className="text-sm sm:text-base font-normal font-roboto text-[#000000] leading-[150%] ">Operating Hours</h3>
          </div>
        <h3 className='text-sm font-normal font-roboto leading-snug text-[#4A5565] mb-2'>Mon-Fri: 9:00 AM - 6:00 PM</h3>
        <p className='text-sm font-normal font-roboto leading-snug text-[#4A5565] mb-2'>Saturday: 10:00 AM - 2:00 PM</p>
        <p className='text-sm font-normal font-roboto leading-snug text-[#4A5565]'>Sunday :  Closed</p>
        
        </div>

        {/* What's Included Section */}
        <div className="bg-[#FEFCE8] border border-[#FFF085] rounded-xl p-6">
          <h3 className="text-sm sm:text-base font-normal font-roboto text-[#000000] leading-[150%] mb-5.5">
           What to Bring
          </h3>

          <ul className="space-y-4 text-xs sm:text-sm md:text-base leading-[150%] font-normal text-[#4A5565]">
            <li className="flex items-start gap-2">
              <span className=" flex-shrink-0 mt-0.5">•</span>
              <span>List of package contents</span>
            </li>
            <li className="flex items-start gap-2">
              <span className=" flex-shrink-0 mt-0.5">•</span>
              <span>Securely packed packages</span>
            </li>
            <li className="flex items-start gap-2">
              <span className=" flex-shrink-0 mt-0.5">•</span>
              <span>Booking confirmation email</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="flex-shrink-0 mt-0.5">•</span>
              <span>List of package contents</span>
            </li>
         
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DropReminders;