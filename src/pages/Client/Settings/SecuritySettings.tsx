import { useChangePasswordMutation } from '@/redux/auth/authApi';
import { Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SecuritySettings: React.FC = () => {
  const [showPassword, setShowPassword] = useState({
  current: false,
  new: false,
  confirm: false,
});
const togglePassword = (field: "current" | "new" | "confirm") => {
  setShowPassword((prev) => ({
    ...prev,
    [field]: !prev[field],
  }));
};

  const [formData, setFormData] = useState({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});
  
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setFormData({
    ...formData,
    [name]: value,
  });
};

const [changePassword, { isLoading }] = useChangePasswordMutation();

 const handleChangePassword = async () => {
  // validation
  if (formData.newPassword !== formData.confirmPassword) {
    toast.error("New password & confirm password must match!");
    return;
  }

  try {
    const res = await changePassword(formData).unwrap();

    toast.success(res?.message || "Password changed successfully!");

    // reset form
    setFormData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

  } catch (err: any) {
    toast.error(err?.data?.message || "Failed to change password!");
  }
};

  return (
    <div className="min-h-screen">
      <div className="space-y-6">

        {/* Security Information Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          <h2 className="text-base sm:text-lg md:text-xl font-semibold font-inter leading-relaxed text-[#0A0A0A] mb-6">
            Security Information
          </h2>
          
          <div className="space-y-5">
            <div className="relative">
              <label className="block text-sm md:text-base font-normal font-inter leading-relaxed text-[#0A0A0A] mb-1.5">
                Current Password
              </label>
              <input 
                type={showPassword.current ? "text" : "password"}
                name="currentPassword"
                 value={formData.currentPassword}
                 onChange={handleChange}
                className="w-full p-3 bg-[#F4F7FF] border-none rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
               <button
    type="button"
    onClick={() => togglePassword("current")}
    className="absolute right-3 top-1/2 mt-4 -translate-y-1/2 text-gray-400 cursor-pointer"
  >
    {showPassword.current ? <EyeOff size={18} /> : <Eye size={18} />}
  </button>
            </div>

            <div className="relative">
              <label className="block text-sm md:text-base font-normal font-inter leading-relaxed text-[#0A0A0A] mb-1.5">
                New Password
              </label>
              <input 
                type={showPassword.new ? "text" : "password"}
                 name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className="w-full p-3 bg-[#F4F7FF] border-none rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
               <button
    type="button"
    onClick={() => togglePassword("new")} 
    className="absolute right-3 top-1/2 mt-4 -translate-y-1/2 text-gray-400 cursor-pointer"
  >
    {showPassword.current ? <EyeOff size={18} /> : <Eye size={18} />}
  </button>
            </div>

            <div className="relative">
              <label className="block text-sm md:text-base font-normal font-inter leading-relaxed text-[#0A0A0A] mb-1.5">
                Confirm Password
              </label>
              <input 
                type={showPassword.confirm ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                className="w-full p-3 bg-[#F4F7FF] border-none rounded-lg focus:ring-2 focus:ring-blue-500 outline-none "
              />
               <button
    type="button"
   onClick={() => togglePassword("confirm")} 
    className="absolute right-3 top-1/2 mt-4 -translate-y-1/2 text-gray-400 cursor-pointer"
  >
    {showPassword.current ? <EyeOff size={18} /> : <Eye size={18} />}
  </button>
            </div>

            <button 
              onClick={handleChangePassword}
               disabled={isLoading}
              className="bg-[#2563EB] hover:bg-blue-700 text-white px-4 py-2 text-sm font-inter cursor-pointer rounded-lg font-medium transition-all  mt-2"
            >
               {isLoading ? "Changing..." : "Change Password"}
            </button>
          </div>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default SecuritySettings;
