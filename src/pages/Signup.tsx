import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useRegisterUserMutation } from '@/redux/auth/authApi';
import { toast } from 'react-toastify';
 // Optional: for notifications

const RegistrationPage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
     postalCode: '',
    additionalAddress: '',
    country: 'France',
    password: '',
    // acceptedTerms: true, // Add this if your API requires
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // RTK Query mutation
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Registration handler
  const handleRegister = async () => {
    try {
      const response = await registerUser(formData).unwrap(); // unwrap gives the resolved response or throws an error
      console.log('User registered:', response);

      toast.success('Registration successful!'); // Optional: toast
      navigate('/login');
    } catch (err: any) {
      console.error('Registration failed:', err);
      toast.error(err?.data?.message || 'Registration failed'); // Optional: toast
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] flex items-center justify-center p-4 py-12">
      <div className=" w-full ">
        <div className="flex flex-col lg:flex-row items-stretch justify-center gap-8 lg:gap-16">
          <div className="w-full lg:w-1/2 flex items-center">
            <img
              src="/images/login/signup.jpg"
              alt="Registration Illustration"
              className="w-full h-full max-h-[750px] hidden md:block rounded-[32px] object-cover shadow-sm"
            />
          </div>

          <div className="w-full lg:w-1/2 flex items-stretch lg:items-end gap-2">
            <div className="bg-white w-full lg:max-w-[682px] border border-gray-100 rounded-[32px] p-8 sm:p-10 xl:px-10 xl:py-10 shadow-[0_10px_50px_rgba(0,0,0,0.04)] relative z-10">
              <div className="text-center  mb-8">
                <h2 className="textxl sm:text-2xl md:text-3xl font-arima font-bold text-gray-900 mb-2">Registration</h2>
                <p className="text-sm text-gray-400 font-roboto">Start shipping with KayLeo today</p>
              </div>

              <form className="space-y-4">
                {/* Name Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs sm:text-sm md:text-base leading-[150%] font-normal font-roboto text-[#155DFC]">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="Enter your name"
                      className="w-full px-4 py-2.5 bg-white border border-[#1C60DF] rounded-[6px] font-roboto focus:ring-1 focus:ring-[#155DFC] outline-none text-sm"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="sm:text-sm md:text-base leading-[150%] font-normal font-roboto text-[#155DFC]">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Enter your name"
                      className="w-full px-4 py-2.5 bg-white border border-[#1C60DF] rounded-[6px] focus:ring-1 focus:ring-[#155DFC] outline-none text-sm"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Contact Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="sm:text-sm md:text-base leading-[150%] font-normal font-roboto text-[#155DFC]">Email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your e-mail"
                      className="w-full px-4 py-2.5 bg-white border border-[#1C60DF] rounded-[6px] focus:ring-1 focus:ring-[#155DFC] outline-none text-sm"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="sm:text-sm md:text-base leading-[150%] font-normal font-roboto text-[#155DFC]">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Enter your phone"
                      className="w-full px-4 py-2.5 bg-white border border-[#1C60DF] rounded-[6px] focus:ring-1 focus:ring-[#155DFC] outline-none text-sm"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Address Section */}
                <div className="p-4 border border-[#155DFC]/30 rounded-2xl space-y-4">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
                    <span className="sm:text-sm md:text-base leading-[150%] font-normal font-roboto text-[#155DFC]">My forwarding address</span>
                    <span className="text-xs text-[#1C60DF] leading-[120%]">is only for French overseas departments and territories</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="sm:text-sm md:text-base leading-[150%] font-normal font-roboto text-[#155DFC]">Address</label>
                      <input
                        type="text"
                        name="address"
                        placeholder="Enter Address"
                        className="w-full px-4 py-2.5 bg-white border border-[#1C60DF] rounded-[6px] focus:ring-1 focus:ring-[#155DFC] outline-none text-sm"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="sm:text-sm md:text-base leading-[150%] font-normal font-roboto text-[#155DFC]">Postal</label>
                      <input
                        type="text"
                        name="postalCode"
                        placeholder="Enter your postal code"
                        className="w-full px-4 py-2.5 bg-white border border-[#1C60DF] rounded-[6px] focus:ring-1 focus:ring-[#155DFC] outline-none text-sm"
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="sm:text-sm md:text-base leading-[150%] font-normal font-roboto text-[#155DFC]">Additional Address</label>
                      <input
                        type="text"
                        name="additionalAddress"
                        placeholder="Enter your additional address"
                        className="w-full px-4 py-2.5 bg-white border border-[#1C60DF] rounded-[6px] focus:ring-1 focus:ring-[#155DFC] outline-none text-sm"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="sm:text-sm md:text-base leading-[150%] font-normal font-roboto text-[#155DFC]">Country</label>
                      <select
                        name="country"
                        className="w-full px-4 py-2.5 bg-white border border-[#1C60DF] rounded-[6px] focus:ring-1 focus:ring-[#155DFC] outline-none text-sm appearance-none"
                        onChange={handleChange}
                      >
                        <option>France</option>
                        <option>Bangladesh</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                  <label className="sm:text-sm md:text-base leading-[150%] font-normal font-roboto text-[#155DFC]">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      placeholder="••••••••"
                      className="w-full px-4 py-2.5 bg-white border border-[#1C60DF] rounded-[6px] focus:ring-1 focus:ring-[#155DFC] outline-none text-sm"
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Register Button */}
                <button
                  type="button"
                  onClick={handleRegister}
                  disabled={isLoading} // disable button during API call
                  className="w-full py-3.5 bg-[#155DFC] text-white font-medium font-inter rounded-xl shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all mt-4"
                >
                  {isLoading ? 'Registering...' : 'Registration'}
                </button>

                {/* Footer Link */}
                <p className="text-center text-xs sm:text-base text-[#000000] font-normal font-roboto pt-2">
                  Already have an account?{' '}
                  <a onClick={() => navigate('/login')} className=" underline cursor-pointer">Log In</a>
                </p>
              </form>
            </div>

            <div className="hidden xl:block z-0">
              <img
                src="/images/login/signup2.jpg"
                alt="Character"
                className="w-[280px] h-auto object-contain opacity-90"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;







// import React, { useState } from 'react';
// import { Eye, EyeOff } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

// const RegistrationPage: React.FC = () => {
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     address: '',
//     postal: '',
//     additionalAddress: '',
//     country: 'France',
//     password: ''
//   });
//   const [showPassword, setShowPassword] = useState(false);
//    const navigate = useNavigate()
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   // 1. handle registration
// const handleRegister = () => {
//   // ekhane backend call korte paro, ekhane amra just frontend simulation dicchi
//   console.log("User registered:", formData);

//   // Registration complete hole login page e navigate
//   navigate('/login');
// };


//   return (
//     <div className="min-h-screen bg-[#FFFFFF] flex items-center justify-center p-4 py-12">
//       <div className=" w-full ">
//         <div className="flex flex-col lg:flex-row items-stretch justify-center gap-8 lg:gap-16">
          
//           {/* Left Side - Image (Figma Style) */}
//           <div className="w-full lg:w-1/2 flex items-center">
//             <img
//               src="/images/login/signup.jpg" 
//               alt="Registration Illustration"
//               className="w-full h-full max-h-[750px] hidden md:block rounded-[32px] object-cover shadow-sm"
//             />
//           </div>

//           {/* Right Side - Form Container */}
//          <div className="w-full lg:w-1/2 flex items-stretch lg:items-end gap-2">
            
//             {/* Registration Card */}
//             <div className="bg-white w-full lg:max-w-[682px] border border-gray-100 rounded-[32px] p-8 sm:p-10 xl:px-10 xl:py-10 shadow-[0_10px_50px_rgba(0,0,0,0.04)] relative z-10">
              
//               <div className="text-center  mb-8">
//                 <h2 className="textxl sm:text-2xl md:text-3xl font-arima font-bold text-gray-900 mb-2">Registration</h2>
//                 <p className="text-sm text-gray-400 font-roboto">Start shipping with KayLeo today</p>
//               </div>

//               <form className="space-y-4">
//                 {/* Name Row */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div className="space-y-1.5">
//                     <label className="text-xs sm:text-sm md:text-base leading-[150%] font-normal font-roboto  font-robotofont-roboto  text-[#155DFC]">First Name</label>
//                     <input
//                       type="text"
//                       name="firstName"
//                       placeholder="Enter your name"
//                       className="w-full px-4 py-2.5 bg-white border border-[#1C60DF] rounded-[6px] font-roboto focus:ring-1 focus:ring-[#155DFC] outline-none text-sm"
//                       onChange={handleChange}
//                     />
//                   </div>
//                   <div className="space-y-1.5">
//                     <label className="sm:text-sm md:text-base leading-[150%] font-normal font-roboto  font-roboto text-[#155DFC]">Last Name</label>
//                     <input
//                       type="text"
//                       name="lastName"
//                       placeholder="Enter your name"
//                       className="w-full px-4 py-2.5 bg-white border border-[#1C60DF] rounded-[6px] focus:ring-1 focus:ring-[#155DFC] outline-none text-sm"
//                       onChange={handleChange}
//                     />
//                   </div>
//                 </div>

//                 {/* Contact Row */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div className="space-y-1.5">
//                     <label className="sm:text-sm md:text-base leading-[150%] font-normal font-roboto  font-roboto text-[#155DFC]">Email</label>
//                     <input
//                       type="email"
//                       name="email"
//                       placeholder="Enter your e-mail"
//                       className="w-full px-4 py-2.5 bg-white border border-[#1C60DF] rounded-[6px] focus:ring-1 focus:ring-[#155DFC] outline-none text-sm"
//                       onChange={handleChange}
//                     />
//                   </div>
//                   <div className="space-y-1.5">
//                     <label className="sm:text-sm md:text-base leading-[150%] font-normal font-roboto  font-roboto text-[#155DFC]">Phone</label>
//                     <input
//                       type="tel"
//                       name="phone"
//                       placeholder="Enter your phone"
//                       className="w-full px-4 py-2.5 bg-white border border-[#1C60DF] rounded-[6px] focus:ring-1 focus:ring-[#155DFC] outline-none text-sm"
//                       onChange={handleChange}
//                     />
//                   </div>
//                 </div>

//                 {/* Forwarding Address Box (Figma Blue Box) */}
//                 <div className="p-4 border border-[#155DFC]/30 rounded-2xl space-y-4">
//                   <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
//                     <span className="sm:text-sm md:text-base leading-[150%] font-normal font-roboto  font-roboto text-[#155DFC]">My forwarding address</span>
//                     <span className="text-xs text-[#1C60DF] leading-[120%]">is only for French overseas departments and territories</span>
//                   </div>
                  
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div className="space-y-1.5">
//                       <label className="sm:text-sm md:text-base leading-[150%] font-normal font-roboto  font-roboto text-[#155DFC]">Address</label>
//                       <input
//                         type="text"
//                         name="address"
//                         placeholder="Enter Address"
//                         className="w-full px-4 py-2.5 bg-white border border-[#1C60DF] rounded-[6px] focus:ring-1 focus:ring-[#155DFC] outline-none text-sm"
//                         onChange={handleChange}
//                       />
//                     </div>
//                     <div className="space-y-1.5">
//                       <label className="sm:text-sm md:text-base leading-[150%] font-normal font-roboto  font-roboto text-[#155DFC]">Postal</label>
//                       <input
//                         type="text"
//                         name="postal"
//                         placeholder="Enter your postal code"
//                         className="w-full px-4 py-2.5 bg-white border border-[#1C60DF] rounded-[6px] focus:ring-1 focus:ring-[#155DFC] outline-none text-sm"
//                         onChange={handleChange}
//                       />
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div className="space-y-1.5">
//                       <label className="sm:text-sm md:text-base leading-[150%] font-normal font-roboto  font-roboto text-[#155DFC]">Additional Address</label>
//                       <input
//                         type="text"
//                         name="additionalAddress"
//                         placeholder="Enter your additional address"
//                         className="w-full px-4 py-2.5 bg-white border border-[#1C60DF] rounded-[6px] focus:ring-1 focus:ring-[#155DFC] outline-none text-sm"
//                         onChange={handleChange}
//                       />
//                     </div>
//                     <div className="space-y-1.5">
//                       <label className="sm:text-sm md:text-base leading-[150%] font-normal font-roboto  font-roboto text-[#155DFC]">Country</label>
//                       <select
//                         name="country"
//                         className="w-full px-4 py-2.5 bg-white border border-[#1C60DF] rounded-[6px] focus:ring-1 focus:ring-[#155DFC] outline-none text-sm appearance-none"
//                         onChange={handleChange}
//                       >
//                         <option>France</option>
//                         <option>Bangladesh</option>
//                       </select>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Password */}
//                 <div className="space-y-1.5">
//                   <label className="sm:text-sm md:text-base leading-[150%] font-normal font-roboto  font-roboto text-[#155DFC]">Password</label>
//                   <div className="relative">
//                     <input
//                       type={showPassword ? 'text' : 'password'}
//                       name="password"
//                       placeholder="••••••••"
//                       className="w-full px-4 py-2.5 bg-white border border-[#1C60DF] rounded-[6px] focus:ring-1 focus:ring-[#155DFC] outline-none text-sm"
//                       onChange={handleChange}
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowPassword(!showPassword)}
//                       className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
//                     >
//                       {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                     </button>
//                   </div>
//                 </div>

//                 {/* Register Button */}
//                 <button
//                   type="button"
//                     onClick={handleRegister}
//                   className="w-full py-3.5 bg-[#155DFC] text-white font-medium font-inter rounded-xl shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all mt-4"
//                 >
//                   Registration
//                 </button>

//                 {/* Footer Link */}
//                 <p className="text-center text-xs sm:text-base text-[#000000] font-normal font-roboto  font-robotoleading-[150%] pt-2">
//                   Already have an account?{' '}
//                   <a onClick={()=> navigate('/login')} className=" underline cursor-pointer">Log In</a>
//                 </p>
//               </form>

          
//             </div>
                 
//             <div className=" hidden xl:block z-0">
//               <img
//                 src="/images/login/signup2.jpg" 
//                 alt="Character"
//                 className="w-[280px] h-auto object-contain opacity-90"
//               />
//             </div>

        
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default RegistrationPage;






// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { CiSquarePlus } from "react-icons/ci";
// import { useNavigate } from "react-router-dom";

// const signupSchema = z.object({
//   name: z.string().min(2, "Name must be at least 2 characters"),
//   email: z.string().email("Invalid email format"),
//   password: z.string().min(6, "Password must be at least 6 characters"),
//   image: z
//     .any()
//     .refine((file) => file, "Image is required")
//     .optional(),
// });

// type SignupFormInputs = z.infer<typeof signupSchema>;

// const Signup = () => {
//   const [preview, setPreview] = useState<string | null>(null);
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//   } = useForm<SignupFormInputs>({
//     resolver: zodResolver(signupSchema),
//   });

//   const navigate = useNavigate();

//   const onSubmit = (data: SignupFormInputs) => {
//     const formData = new FormData();
//     formData.append("name", data.name);
//     formData.append("email", data.email);
//     formData.append("password", data.password);
//     if (selectedFile) formData.append("image", selectedFile);

//     console.log("Signup Data:", Object.fromEntries(formData));
//     navigate("/login");
//   };

//   const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       setPreview(URL.createObjectURL(file));
//       setSelectedFile(file);
//       setValue("image", file, { shouldValidate: true });
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-200">
//       <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
//         <h2 className="text-2xl font-semibold text-center">Signup</h2>
//         <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
//           {/* Name Field */}
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">
//               Name
//             </label>
//             <input
//               type="text"
//               {...register("name")}
//               className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             {errors.name && (
//               <p className="text-red-500 text-sm">{errors.name.message}</p>
//             )}
//           </div>

//           {/* Email Field */}
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">
//               Email
//             </label>
//             <input
//               type="email"
//               {...register("email")}
//               className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             {errors.email && (
//               <p className="text-red-500 text-sm">{errors.email.message}</p>
//             )}
//           </div>

//           {/* Password Field */}
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">
//               Password
//             </label>
//             <input
//               type="password"
//               {...register("password")}
//               className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             {errors.password && (
//               <p className="text-red-500 text-sm">{errors.password.message}</p>
//             )}
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">
//               Profile Picture
//             </label>
//             {/* input box  */}
//             <div
//               className="relative w-full h-36 border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center cursor-pointer hover:border-blue-500 transition"
//               onClick={() => document.getElementById("fileInput")?.click()}
//             >
//               {preview ? (
//                 <img
//                   src={preview}
//                   alt="Preview"
//                   className="absolute inset-0 w-full h-full object-cover rounded-lg"
//                 />
//               ) : (
//                 <div className="flex flex-col items-center text-gray-500">
//                   <CiSquarePlus className="h-12 w-12" />
//                   <p className="text-sm">Click to upload</p>
//                 </div>
//               )}
//             </div>
//             <input
//               type="file"
//               accept="image/*"
//               id="fileInput"
//               className="hidden"
//               onChange={handleImageChange}
//             />
//             {errors.image?.message &&
//               typeof errors.image.message === "string" && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {errors.image.message}
//                 </p>
//               )}
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
//           >
//             Signup
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Signup;
