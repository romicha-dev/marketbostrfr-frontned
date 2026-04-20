import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import {
  useGetClientProfileQuery,
  useUpdateClientProfileMutation,
} from "@/redux/features/clients/SettingsApi";

export const ProfileSettings: React.FC = () => {
  const { data: profile, isLoading } = useGetClientProfileQuery(undefined, {
    skip: false,
  });

  const [updateProfile, { isLoading: isUpdating }] =
    useUpdateClientProfileMutation();

  const [formData, setFormData] = useState({
    fullName: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");

  // API থেকে data আসলে form fill koro
  useEffect(() => {
    if (profile) {
      const user = profile?.data || profile;
      setFormData({
        fullName: user.fullName || "",
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
      });

      if (user.profileImageUrl) {
        setPreview(user.profileImageUrl);
      }
    }
  }, [profile]);

  // preview memory cleanup
  useEffect(() => {
    return () => {
      if (preview && selectedImage) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview, selectedImage]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Only JPG, PNG, WEBP allowed!");
      return;
    }

    const renamedFile = new File([file], file.name, {
      type: file.type || "image/jpeg",
    });

    setSelectedImage(renamedFile);
    setPreview(URL.createObjectURL(renamedFile));
  };

  const handleSave = async () => {
    try {
      const form = new FormData();
      form.append("fullName", formData.fullName);
      form.append("firstName", formData.firstName);
      form.append("lastName", formData.lastName);
      form.append("email", formData.email);
      form.append("phone", formData.phone);

      if (selectedImage) {
        form.append("profileImage", selectedImage, selectedImage.name);
      }

      const res = await updateProfile(form).unwrap();
      console.log("UPDATE RESPONSE:", res);
      toast.success("Profile updated successfully!");

    } catch (err: any) {
      console.error(err);
      toast.error(err?.data?.message || "Update failed!");
    }
  };

  if (isLoading) return <p className="p-6 text-gray-500">Loading profile...</p>;

  return (
    <div className="min-h-screen space-y-6 p-4">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
        <h2 className="text-lg font-semibold mb-5 text-[#0A0A0A]">
          Profile Information
        </h2>

        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>

          {/* Profile Image Preview */}
          <div className="flex items-center gap-4 mb-2">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#1D61E7] shrink-0">
              {preview ? (
                <img
                  src={preview}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-[#E3EBFB] flex items-center justify-center text-2xl font-bold text-[#1D61E7]">
                  {formData.firstName?.[0]?.toUpperCase() || "U"}
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Profile Image
              </label>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleImageChange}
                className="text-sm text-gray-500 file:mr-3 file:py-1.5 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-[#1D61E7] file:text-white hover:file:bg-blue-700 cursor-pointer"
              />
              <p className="text-xs text-gray-400 mt-1">JPG, PNG, WEBP allowed</p>
            </div>
          </div>

          {/* Full Name */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full p-3 bg-[#F4F7FF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D61E7]"
            />
          </div>

          {/* First Name */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full p-3 bg-[#F4F7FF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D61E7]"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full p-3 bg-[#F4F7FF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D61E7]"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 bg-[#F4F7FF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D61E7]"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 bg-[#F4F7FF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D61E7]"
            />
          </div>

          {/* Save Button */}
          <div className="pt-4">
            <button
              type="button"
              onClick={handleSave}
              disabled={isUpdating}
              className="bg-[#1D61E7] hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
            >
              {isUpdating ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};






// // import { useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useState, useEffect } from "react";
// import { useGetClientProfileQuery, useUpdateClientProfileMutation } from "@/redux/features/clients/SettingsApi";


// export const ProfileSettings: React.FC = () => {
//   // const navigate = useNavigate();
//  const { data: profile, isLoading } = useGetClientProfileQuery(undefined, {
//   skip: false,
// });
// console.log(profile)
//   const [updateProfile, { isLoading: isUpdating }] = useUpdateClientProfileMutation();
//   // const [deleteAccount, { isLoading: isDeleting }] = useDeleteClientAccountMutation();

//   const [formData, setFormData] = useState({
//     fullName: "",
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     profileImageUrl: "",
//   });

//   useEffect(() => {
//     if (profile) {
//       setFormData({
//         fullName: profile.fullName || "",
//         firstName: profile.firstName || "",
//         lastName: profile.lastName || "",
//         email: profile.email || "",
//         phone: profile.phone || "",
//         profileImageUrl: profile.profileImageUrl || "",
//       });
//     }
//   }, [profile]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSave = async () => {
//     try {
//       await updateProfile(formData).unwrap();
//       toast.success("Profile updated successfully!", { position: "top-right", autoClose: 3000 });
//     } catch (err: any) {
//       console.error(err);
//       toast.error(err?.data?.message || "Failed to update profile.", { position: "top-right", autoClose: 3000 });
//     }
//   };

//   // const handleDelete = async () => {
//   //   try {
//   //     await deleteAccount().unwrap();
//   //     toast.success("Account deleted successfully!", { position: "top-right", autoClose: 3000 });
//   //     setTimeout(() => navigate("/"), 1500);
//   //   } catch (err: any) {
//   //     console.error(err);
//   //     toast.error(err?.data?.message || "Failed to delete account.", { position: "top-right", autoClose: 3000 });
//   //   }
//   // };

//   if (isLoading) return <p>Loading profile...</p>;

//   return (
//     <div className="min-h-screen space-y-6 p-4">
//       {/* Profile Information */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
//         <h2 className="text-base sm:text-lg md:text-xl font-semibold mb-5 text-[#0A0A0A]">Profile Information</h2>

//         <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
//           {/* Full Name */}
//           <div>
//             <label className="block text-sm md:text-base mb-2 text-[#0A0A0A]">Full Name</label>
//             <input
//               type="text"
//               name="fullName"
//               value={formData.fullName}
//               onChange={handleChange}
//               className="w-full p-3 bg-[#F4F7FF] rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black text-xs md:text-sm transition-all"
//             />
//           </div>

//           {/* First Name */}
//           <div>
//             <label className="block text-sm md:text-base mb-2 text-[#0A0A0A]">First Name</label>
//             <input
//               type="text"
//               name="firstName"
//               value={formData.firstName}
//               onChange={handleChange}
//               className="w-full p-3 bg-[#F4F7FF] rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black text-xs md:text-sm transition-all"
//             />
//           </div>

//           {/* Last Name */}
//           <div>
//             <label className="block text-sm md:text-base mb-2 text-[#0A0A0A]">Last Name</label>
//             <input
//               type="text"
//               name="lastName"
//               value={formData.lastName}
//               onChange={handleChange}
//               className="w-full p-3 bg-[#F4F7FF] rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black text-xs md:text-sm transition-all"
//             />
//           </div>

//           {/* Email */}
//           <div>
//             <label className="block text-sm md:text-base mb-2 text-[#0A0A0A]">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full p-3 bg-[#F4F7FF] rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black text-xs md:text-sm transition-all"
//             />
//           </div>

//           {/* Phone */}
//           <div>
//             <label className="block text-sm md:text-base mb-2 text-[#0A0A0A]">Phone</label>
//             <input
//               type="tel"
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               className="w-full p-3 bg-[#F4F7FF] rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black text-xs md:text-sm transition-all"
//             />
//           </div>

//           {/* Profile Image URL */}
//           <div>
//             <label className="block text-sm md:text-base mb-2 text-[#0A0A0A]">Profile Image URL</label>
//             <input
//               type="text"
//               name="profileImageUrl"
//               value={formData.profileImageUrl}
//               onChange={handleChange}
//               className="w-full p-3 bg-[#F4F7FF] rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black text-xs md:text-sm transition-all"
//             />
//           </div>

//           {/* Save */}
//           <div className="pt-4">
//             <button
//               type="button"
//               onClick={handleSave}
//               disabled={isUpdating}
//               className="bg-[#1D61E7] hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium shadow-md transition-all"
//             >
//               {isUpdating ? "Saving..." : "Save Changes"}
//             </button>
//           </div>
//         </form>
//       </div>

//       {/* Delete Account */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
//         <h2 className="text-sm md:text-base font-semibold mb-2 text-[#0A0A0A]">Delete Account</h2>
//         <div className="text-[#717182] text-sm md:text-base space-y-1">
//           <p>Permanently delete your account and all data.</p>
//           <p>Once you delete your account, there is no going back. Please be certain.</p>
//         </div>
//         <div className="pt-2">
//           <button
//             // onClick={handleDelete}
//             // disabled={isDeleting}
//             className="bg-[#E10000] hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium shadow-md transition-all"
//           >
//             {/* {isDeleting ? "Deleting..." : "Delete Account"} */}
//             Delete Account
//           </button>
//         </div>
//       </div>

//       <ToastContainer />
//     </div>
//   );
// };









// import { Paperclip } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


// export const ProfileSettings: React.FC = () => {
//   const navigate = useNavigate();

//   const handleSave = () => {
 
//     toast.success("Profile updated successfully!", {
//       position: "top-right",
//       autoClose: 3000,
//     });
//   };

//   const handleDelete = () => {
//     // Delete action বা API call
//     toast.success("Account deleted successfully!", {
//       position: "top-right",
//       autoClose: 3000,
//     });

//     // Optional: redirect user after delete
//     setTimeout(() => navigate('/'), 1500);
//   };

//   return (
//     <div className="min-h-screen">
//       <div className="space-y-6">
//         {/* Profile Information Section */}
//         <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
//           <h2 className="text-base sm:text-lg md:text-xl font-semibold font-inter leading-relaxed text-[#0A0A0A] mb-5">
//             Profile Information
//           </h2>
          
//           <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
//             {/* Name Input */}
//             <div>
//               <label className="block text-sm md:text-base font-normal font-inter leading-relaxed text-[#0A0A0A] mb-2">
//                 Name
//               </label>
//               <input 
//                 type="text" 
//                 defaultValue="PropLink Vendor"
//                 className="w-full p-3 bg-[#F4F7FF] border-none rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black text-xs md:text-sm transition-all"
//               />
//             </div>

//             {/* Email Input */}
//             <div>
//               <label className="block text-sm md:text-base font-normal font-inter leading-relaxed text-[#0A0A0A] mb-2">
//                 Email
//               </label>
//               <input 
//                 type="email" 
//                 defaultValue="vendor@gmail.com"
//                 className="w-full p-3 bg-[#F4F7FF] border-none rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black text-xs md:text-sm transition-all"
//               />
//             </div>

//             {/* Phone Number Input */}
//             <div>
//               <label className="block text-sm md:text-base font-normal font-inter leading-relaxed text-[#0A0A0A] mb-2">
//                 Phone Number
//               </label>
//               <input 
//                 type="tel" 
//                 defaultValue="+44 7700 900000"
//                 className="w-full p-3 bg-[#F4F7FF] border-none rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black text-xs md:text-sm transition-all"
//               />
//             </div>

//             {/* Profile Picture Upload */}
//             <div>
//               <label className="block text-sm md:text-base font-normal font-inter leading-relaxed text-[#0A0A0A] mb-2">
//                 Profile Picture
//               </label>
//               <div className="relative cursor-pointer group">
//                 <input type="file" className="hidden" id="photo-upload" />
//                 <label 
//                   htmlFor="photo-upload"
//                   className="flex items-center gap-2 w-full p-3 bg-[#F4F7FF] border-none rounded-lg text-gray-400 text-sm group-hover:bg-blue-50 transition-colors cursor-pointer"
//                 >
//                   <Paperclip size={16} />
//                   <span>Upload photo</span>
//                 </label>
//               </div>
//             </div>

//             {/* Save Button */}
//             <div className="pt-4">
//               <button
//                 type="button"
//                 onClick={handleSave}
//                 className="bg-[#1D61E7] hover:bg-blue-700 text-white px-4 py-2 font-inter text-sm cursor-pointer rounded-lg font-medium transition-all shadow-md"
//               >
//                 Save Changes
//               </button>
//             </div>
//           </form>
//         </div>

//         {/* Delete Account Section */}
//         <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
//           <h2 className="text-sm md:text-base font-semibold font-inter leading-relaxed text-[#0A0A0A] mb-2">
//             Delete Account
//           </h2>
//           <div className="space-y-4">
//             <div className="text-[#717182] text-sm md:text-base font-normal font-inter leading-[150%] ">
//               <p>Permanently delete your account and all data</p>
//               <p className="mt-1">Once you delete your account, there is no going back. Please be certain.</p>
//             </div>
            
//             <div className="pt-2">
//               <button
//                 onClick={handleDelete}
//                 className="bg-[#E10000] hover:bg-red-700 text-white px-4 py-2 text-sm font-inter cursor-pointer rounded-lg font-medium transition-all shadow-md"
//               >
//                 Delete Account
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Toast Container */}
//       <ToastContainer />
//     </div>
//   );
// };
