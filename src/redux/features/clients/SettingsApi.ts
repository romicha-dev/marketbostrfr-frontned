import { baseAPI } from "@/store/api/baseApi";
import { setUser } from "@/store/features/auth/auth.slice";

export const settingsApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
     getClientProfile: builder.query({
      query: () => "/settings/client/profile",
      providesTags: ["Profile"],
    }),


    //   updateClientProfile: builder.mutation({
    //   query: (data) => ({
    //     url: "/settings/client/profile",
    //     method: "PATCH",
    //     body: data,
    //     // headers: {
    //     //   "Content-Type": "application/json",
    //     // },
    //   }),
    //   invalidatesTags: ["Profile"],
    // }),


  updateClientProfile: builder.mutation({
      query: (data) => ({
        url: "/settings/client/profile",
        method: "PATCH",
        body: data,
        formData: true,
      }),
      invalidatesTags: ["Profile"],

  async onQueryStarted(_, { dispatch, queryFulfilled }) {
  try {
    const { data } = await queryFulfilled;
    
    // data directly user object — no nesting
    dispatch(setUser({ user: data }));

  } catch (err) {
    console.error("Profile update error:", err);
  }
},
    }),

    
     getClientGeneralSettings: builder.query<any, void>({
      query: () => `/settings/client/general`,
      providesTags: ["Profile"], 
    }),
    updateClientGeneralSettings: builder.mutation({
      query: (body: { emailNotifications: boolean; smsNotifications: boolean; newBidsAlerts: boolean }) => ({
        url: `/settings/client/general`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Profile"],
    }),
  }),
});

export const { useGetClientProfileQuery, useUpdateClientProfileMutation,useGetClientGeneralSettingsQuery,useUpdateClientGeneralSettingsMutation } = settingsApi;