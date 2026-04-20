import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { useLoginUserMutation } from '@/redux/auth/authApi';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setUser } from '@/store/features/auth/auth.slice';

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
const navigate = useNavigate()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
const [loginUser, { isLoading }] = useLoginUserMutation();
console.log(loginUser)
 const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const res = await loginUser({ email: formData.email, password: formData.password }).unwrap();
        dispatch(setUser({
        accessToken: res.accessToken,
        user: res.user,
      }));

      console.log("Login response:", res); // ✅ Console এ response দেখাবে
      localStorage.setItem('token', res.accessToken);
      console.log(localStorage.getItem('token'));
      localStorage.setItem('user', JSON.stringify(res.user));
     toast.success("Login Successfull ", {position:'top-right'})
      // toast.success(`Welcome ${res.user.firstName}!`, {position:'top-right'}); // ✅ Toast success

      if (res.user.role === "ADMIN") {
        navigate('/admin');
      } else {
        navigate('/client');
      }
    } catch (err: any) {
      console.error("Login error:", err);
      toast.error(err?.data?.message || "Login failed! Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen bg-white  flex items-center justify-center p-4">
      <div className=" w-full xl:px-14">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 xl:gap-[163px]">
          
          {/* Left Side - Image (Figma Style) */}
          <div className="w-full lg:w-1/2">
            <img
              src="/images/login/loginImg.jpg" // Replace with your actual woman-delivery image path
              alt="Delivery Service"
              className="w-full h-auto max-h-[700px] hidden md:block rounded-[32px] object-cover shadow-sm"
            />
          </div>

          {/* Right Side - Form Container */}
          <div className="w-full lg:w-1/2  relative">
            
            {/* Top Greeting */}
            <div className="text-center mb-6">
               <h2 className="text-2xl sm:text-3xl font-bold font-roboto text-[#1A1A1A] flex items-center justify-center gap-2">
                Hello <span className="animate-bounce">👋</span> Welcome Back !
              </h2>
            </div>

            {/* Login Card */}
            <div className="bg-white w-full lg:max-w-[556px] border border-gray-100 rounded-[32px] p-3 xl:px-[130px] py-20 shadow-[0_10px_50px_rgba(0,0,0,0.04)] relative z-10">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold font-arima leading-snug text-gray-900 mb-2">Log In</h3>
                <p className="text-sm font-normal leading-snug font-roboto text-gray-400">Sign in to your Kayleo account</p>
              </div>

              <form className="space-y-5">
                {/* Email */}
                <div className="space-y-2">
                  <label className="sm:text-sm md:text-base font-roboto leading-[150%] font-normal  text-[#155DFC]">E-mail</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50/50 border font-roboto border-gray-200 rounded-xl focus:ring-2 focus:ring-[#155DFC] focus:border-transparent outline-none transition-all placeholder:text-gray-300"
                  />
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <label className="sm:text-sm md:text-base leading-[150%] font-normal font-roboto  text-[#155DFC]">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#155DFC] focus:border-transparent outline-none transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#155DFC]"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {/* Remember & Forgot */}
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      className="w-4 h-4 rounded border-gray-300 text-[#155DFC] focus:ring-[#155DFC]"
                      onChange={handleChange}
                    />
                    <span className="text-xs text-gray-500 font-roboto group-hover:text-gray-700">Remember me</span>
                  </label>
                  <a onClick={()=> navigate('/forgot_password')} className="text-xs font-semibold font-roboto text-red-500 hover:text-red-600 underline cursor-pointer">
                    Forgot Password?
                  </a>
                </div>

                {/* Login Button */}
                {/* <button
                  type="button"
                    onClick={handleLogin}
                  className="w-full py-4 bg-[#155DFC] text-white font-roboto font-medium cursor-pointer rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 hover:shadow-xl active:scale-[0.98] transition-all mt-4"
                >
                  Log In
                </button> */}
                  <button onClick={handleLogin} disabled={isLoading}  className="w-full py-4 bg-[#155DFC] text-white font-roboto font-medium cursor-pointer rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 hover:shadow-xl active:scale-[0.98] transition-all mt-4">
        {isLoading ? "Logging in..." : "Log In"}
      </button>

                {/* Registration Link */}
                <p className="text-center text-sm text-gray-500 font-roboto pt-2">
                  Don't have an account?{' '}
                  <a onClick={()=> navigate('/signup') } className="text-[#155DFC] font-bold hover:underline cursor-pointer">
                    Registration
                  </a>
                </p>
              </form>
            </div>

            {/* Floating Character - Adjusted for Figma look */}
            <div className="absolute -bottom-10 right-16 z-20 hidden xl:block pointer-events-none">
              <img
                src="/images/login/loginImg2.png" // Replace with your actual 3D character image path
                alt="Character"
                className="w-[200px] h-auto drop-shadow-2xl"
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LoginPage;



// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Link, useNavigate } from "react-router-dom";
// import { useAppDispatch } from "@/store/hook";
// import { setUser } from "@/store/features/auth/auth.slice";

// const loginSchema = z.object({
//   email: z.string().email("Invalid email format"),
//   password: z.string().min(6, "Password must be at least 6 characters"),
// });

// type LoginFormInputs = z.infer<typeof loginSchema>;

// const Login = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<LoginFormInputs>({
//     resolver: zodResolver(loginSchema),
//   });

//   const navigate = useNavigate();
//   const dispatch = useAppDispatch();

//   const onSubmit = (data: LoginFormInputs) => {
//     console.log("Login Data:", data);
//     dispatch(setUser(data));
//     navigate("/");
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
//         <h2 className="text-2xl font-semibold text-center">Login</h2>
//         <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
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

//           <div className="mb-3">
//             <p>
//               Already have an account?{" "}
//               <Link to="/signup" className="text-blue-400 ">
//                 Sign up here
//               </Link>
//             </p>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;
