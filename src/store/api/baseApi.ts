import { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";
import { setUser, logout } from "../features/auth/auth.slice";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  credentials: "include", 
  prepareHeaders(headers, { getState }) {
    const token = (getState() as RootState).auth.accessToken;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {

  let result = await baseQuery(args, api, extraOptions);

  // 🔥 Access token expire
  if (result?.error?.status === 401) {
    console.log("Access expired → trying refresh...");

   
    const refreshResult = await baseQuery(
      {
        url: "/auth/refresh",
        method: "POST",
      },
      api,
      extraOptions
    );

    if (refreshResult?.data) {
      const data = refreshResult.data as any;

      console.log("Refresh success");


      api.dispatch(
        setUser({
          accessToken: data.accessToken,
          user: data.user,
        })
      );

    
      result = await baseQuery(args, api, extraOptions);

    } else {
      console.log("Refresh failed → logout");
      api.dispatch(logout());
    }
  }

  return result;
};

export const baseAPI = createApi({
  reducerPath: "baseAPI",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "Auth",
    "User",
    "Profile",
    "Overview",
    "userProfile",
    "Packages",
    "DropOff",
    "ShippingRates",
    "CompanySettings",
    "Notifications",
    "Clients",
    "Payments",
    "Dashboard",
    "Quotes",
    "ActivityLogs"
  ],
  endpoints: () => ({}),
});




// import { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";
// import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
// import type { RootState } from "../store";
// import { setUser, logout } from "../features/auth/auth.slice";

// const baseQuery = fetchBaseQuery({
//   baseUrl: import.meta.env.VITE_API_URL,
//   credentials: "include",
//   prepareHeaders(headers, { getState }) {
//     const token = (getState() as RootState).auth.accessToken;
//     if (token) {
//       headers.set("authorization", `Bearer ${token}`);
//     }
//     return headers;
//   },
// });

// const baseQueryWithReauth: BaseQueryFn<
//   string | FetchArgs,
//   unknown,
//   FetchBaseQueryError
// > = async (args, api, extraOptions) => {
//   // Prthome normal request call
//   let result = await baseQuery(args, api, extraOptions);

//   // Jodi Token Expire hoy (401 status)
//   if (result?.error?.status === 401) {
//     const state = api.getState() as RootState;
//     const refreshToken = state.auth.refreshToken;

//     if (refreshToken) {
//       // Refresh token request pathano
//       const refreshResult = await baseQuery(
//         {
//           url: "/auth/refresh",
//           method: "POST",
//           body: { refreshToken }, // Swagger onujayi key
//           // ATTA KHUBI GURUITOPURNO: Expired token remove kora
//           headers: { "authorization": "" } 
//         },
//         api,
//         extraOptions
//       );

//       if (refreshResult?.data) {
//         const refreshData = refreshResult.data as any;

//         // Notun token state-e set kora
//         api.dispatch(
//           setUser({
//             accessToken: refreshData.accessToken,
//             refreshToken: refreshData.refreshToken || refreshToken,
//             user: refreshData.user || state.auth.user,
//           })
//         );

//         // Ager failed query-ta abar kora (Akn notun token bose jabe prepareHeaders-e)
//         result = await baseQuery(args, api, extraOptions);
//       } else {
//         // Jodi refresh-o fail kore (e.g. refresh token-o expire hoye geche)
//         api.dispatch(logout());
//       }
//     } else {
//       api.dispatch(logout());
//     }
//   }

//   return result;
// };

// export const baseAPI = createApi({
//   reducerPath: "baseAPI",
//   baseQuery: baseQueryWithReauth,
//   tagTypes: ["Auth", "User", "Profile", "Overview", "userProfile", "Packages","DropOff", "ShippingRates", "CompanySettings","Notifications","Clients"],
//   endpoints: () => ({}),
// });

// previous code 
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { RootState } from "../store";

// const baseQueryAPI = fetchBaseQuery({
//   baseUrl: import.meta.env.VITE_SERVER_URL,
//   credentials: "include",
//   prepareHeaders(headers, { getState }) {
//     const token = (getState() as RootState).auth.token;

//     if (token) {
//       headers.set("authorization", `Bearer ${token}`);
//     }
//     return headers;
//   },
// });

// export const baseAPI = createApi({
//   reducerPath: "baseAPI",
//   baseQuery: baseQueryAPI,
//   tagTypes: [
//     "category",
//     "content",
//     "privacy-policy",
//     "terms",
//     "faq",
//     "contributor",
//     "users",
//     "ad-management",
//     "plan",
//     "profile",
//   ],
//   endpoints: () => ({}),
// });
