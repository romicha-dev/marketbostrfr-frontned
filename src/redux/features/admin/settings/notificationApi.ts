import { baseAPI } from "@/store/api/baseApi";

export interface Notifications {
  id?: string;
   quoteSent: boolean;
  packageActivity: boolean;
  packageCreated: boolean;
  newClientRegistration: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export const notificationsApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    
    
    getAllNotifications: builder.query<Notifications[], void>({
      query: () => ({
        url: "/settings/admin/notifications",
        method: "GET",
      }),
      providesTags: ["Notifications"],
    }),


    getSingleNotification: builder.query<Notifications, string>({
      query: (id) => ({
        url: `/settings/admin/notifications/${id}`,
        method: "GET",
      }),
      providesTags: ["Notifications"],
    }),

   
    createNotification: builder.mutation<Notifications, Notifications>({
      query: (data) => ({
        url: "/settings/admin/notifications",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Notifications"],
    }),

    updateNotification: builder.mutation<
      Notifications,
      { id: string; data: Partial<Notifications> }
    >({
      query: ({ id, data }) => ({
        url: `/settings/admin/notifications/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Notifications"],
    }),


    deleteNotification: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/settings/admin/notifications/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Notifications"],
    }),
  }),
});

export const {
  useGetAllNotificationsQuery,
  useGetSingleNotificationQuery,
  useCreateNotificationMutation,
  useUpdateNotificationMutation,
  useDeleteNotificationMutation,
} = notificationsApi;