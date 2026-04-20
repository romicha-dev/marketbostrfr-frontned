import { baseAPI } from "@/store/api/baseApi";



// Types আলাদা define করুন
type RegisterRequest = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
  postalCode?: string;
  country?: string;
  additionalAddress?: string;
};

// type RegisterResponse = {
//   accessToken: string;
//   user: any;
//   role: "admin" | "client";
// };

type LoginRequest = {
  email: string;
  password: string;
};

export const authApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({

    registerUser: builder.mutation({
      query: (data: RegisterRequest) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

loginUser: builder.mutation({
  query: (data: LoginRequest) => ({
    url: "/auth/login/",
    method: "POST",
    body: data,
  }),
  invalidatesTags: ["User"],
}),
    forgotPassword: builder.mutation<{ message: string }, { email: string }>({
      query: (data) => ({
        url: '/auth/forgot-password',
        method: 'POST',
        body: data,
      }),
    }),

    changePassword: builder.mutation<
  { message: string }, 
  {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }
>({
  query: (body) => ({
    url: "/auth/change-password",
    method: "POST",
    body,
  }),
}),

  }),
  overrideExisting: false,
});

export const { useRegisterUserMutation,useLoginUserMutation,useForgotPasswordMutation, useChangePasswordMutation } = authApi;








// import { baseAPI } from "../api/baseApi";



// export const userAPI = baseAPI.injectEndpoints({
//   endpoints: (build) => ({
//     // Doctor Endpoints
//     login: build.mutation({
//       query: (data: { email: string; password: string }) => ({
//         url: "/auth/login/",
//         method: "POST",
//         body: data,
//       }),
//     }),

//        EmailverifyOTP: build.mutation({
//       query: (data) => ({
//         url: "/auth/verify-otp-login",
//         method: "POST",
//         body: data,
//       }),
//     }),


// registerUser: build.mutation<
//   { accessToken: string; user: any; role: "admin" | "client" }, // Response type
//   {
//     firstName: string;
//     lastName: string;
//     email: string;
//     password: string;
//     phone?: string;
//     address?: string;
//     postalCode?: string;
//     country?: string;
//     additionalAddress?: string;
//     // acceptedTerms: boolean;
//   } 
// >({
//   query: (data) => ({
//     url: "/auth/register/",
//     method: "POST",
//     body: data,
//   }),
//   invalidatesTags: ["User"], // Optional: re-fetch users if needed
  
// }),

     
//      verifyOTP: build.mutation({
//       query: (data) => ({
//         url: "/auth/verified-account",
//         method: "POST",
//         body: data,
//       }),
//     }),

//     resendOTP: build.mutation({
//       query: (data) => ({
//         url: "/auth/new-verification-otp",
//         method: "POST",
//         body: data,
//       }),
//     }),

//         forgotPassword: build.mutation({
//       query: (data) => ({
//         url: "/auth/forgot-password",
//         method: "POST",
//         body: data,
//       }),
//     }),
//         chnagePassword: build.mutation({
//       query: (data) => ({
//         url: "/auth/change-password",
//         method: "POST",
//         body: data,
//       }),
//     }),

//     resetPassword: build.mutation({
//       query: (data) => ({
//         url: "/auth/reset-password",
//         method: "POST",
//         body: data,
//       }),
//     }),

//     // Admin Endpoints
//     adminLogin: build.mutation({
//       query: (data: { email: string; password: string }) => ({
//         url: "/auth/admin/login",
//         method: "POST",
//         body: data,
//       }),
//     }),
//     adminRegister: build.mutation({
//       query: (data: { 
//         email: string; 
//         password: string; 
//         firstName: string; 
//         lastName: string 
//       }) => ({
//         url: "/auth/admin/register",
//         method: "POST",
//         body: data,
//       }),
//       invalidatesTags: [],
//     }),
//   }),
// });

// export const {
//   useLoginMutation,
//   useRegisterUserMutation,
//    useForgotPasswordMutation,
//    useChnagePasswordMutation,
//   useResetPasswordMutation,
//   useVerifyOTPMutation,
//   useEmailverifyOTPMutation,
//   useAdminLoginMutation,
//   useAdminRegisterMutation,
// } = userAPI;
