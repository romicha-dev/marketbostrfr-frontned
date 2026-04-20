import React, { useState } from 'react';
import img1 from '../../../public/images/about/storyImg2.png'
import img2 from '../../../public/images/about/storyImg1.jpg'
import img3 from '../../../public/images/contact/minImg.jpg'
import img4 from '../../../public/images/home/heroImg1.png'
import img5 from '../../../public/images/services/servicesBanner.svg'
import CommonWrapper from '@/common/CommonWrapper';
import MapSection from './Map';


interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  contact: string;
  address: string;
  message: string;
}

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    contact: '',
    address: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
  };

  return (
    <CommonWrapper>
    <div className="w-full bg-white py-12 ">
      <div className="">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Side - Images and Contact Info */}
          {/* Image Section */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">

  {/* Column 1 - 2 Images */}
  <div className="flex flex-col items-end gap-4">
    <img
      src={img1}
      alt="Image 1"
      className="w-full md:w-[263px] h-[300px] object-cover rounded-lg"
    />
    <img
      src={img2}
      alt="Image 2"
      className="w-full md:w-[111px] h-[153px] object-cover rounded-lg"
    />
  </div>

  {/* Column 2 - 1 Image */}
  <div className='flex flex-col items-center justify-center'>
    <img
      src={img3}
      alt="Center Image"
      className="w-full md:w-[163px] h-[186px] object-cover rounded-lg"
    />
  </div>

  {/* Column 3 - 2 Images */}
  <div className="flex flex-col items-end justify-center gap-4">
    <img
      src={img4}
      alt="Image 3"
      className="w-full md:w-[199px] h-[227px] object-cover rounded-lg"
    />
    <img
      src={img5}
      alt="Image 4"
      className="w-full md:w-[111px] h-[128px] object-cover rounded-lg"
    />
  </div>

</div>

         

          {/* Right Side - Contact Form */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8">
            <h3 className="font-semibold text-black leading-[150%] text-base sm:text-lg md:text-xl font-arima  mb-2">
              Get In Touch
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-[#1C1F22] font-normal font-roboto leading-[150%] border-b border-[#ECEDEE] pb-4">
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            </p>

            <div className="space-y-4 mt-22">
              {/* First Name and Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block  text-sm font-normal text-[#424A52] font-roboto leading-[150%] mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-100 border-0 rounded-[4px] font-roboto focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-normal font-roboto text-[#424A52] leading-[150%] mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-100 border-0 rounded-[4px] font-roboto focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>
              </div>

              {/* Email and Contact Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-normal font-roboto text-[#424A52] leading-[150%] mb-2">
                    E-mail Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg font-roboto focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-normal font-roboto text-[#424A52] leading-[150%] mb-2">
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-100 border-0 rounded-[4px] font-roboto focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-normal font-roboto text-[#424A52] leading-[150%] mb-2">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-100 border-0 rounded-[4px] font-roboto focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-normal font-roboto text-[#424A52] leading-[150%] mb-2">
                  Your Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg font-roboto focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <div>
                <button
                  onClick={handleSubmit}
                  className="px-7 py-3 bg-[#155DFC] text-white font-inter text-base cursor-pointer rounded-[4px] font-medium  hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>

         {/* <div className='md:py-[126px] relative'>
        <div className='h-full w-full'>
            <img src="/images/contact/map.svg" alt="" />
        </div>
        <div className='absolute  sm:h-[66px] sm:w-[177px] flex top-1/2 left-1/2 
                  -translate-x-1/2 -translate-y-1/2
                  bg-white p-4 rounded-lg shadow-lg items-center justify-center'>
          <img src="/public/footerLogo.png"alt="" />
        </div>
    </div> */}
    <MapSection/>
      </div>
    </div>
    </CommonWrapper>
  );
};

export default ContactSection;