import { baseAPI } from "@/store/api/baseApi";

export type Notification = {
  id: string;
  userId: string;
  title: string;
  message: string;
  isRead: boolean;
  readAt: string | null;
  createdAt: string;
  packageId?: string | null;
};

export type CreateNotificationRequest = {
  userId: string;
  title: string;
  message: string;
  packageId?: string;
};

export type UnreadCountResponse = {
  count: number;
};

export const notificationApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({

  
 getNotifications: builder.query({
  query: () => ({
    url: "/notifications",
    method: "GET",
  }),
}),


    createNotification: builder.mutation<
      Notification,
      CreateNotificationRequest
    >({
      query: (body) => ({
        url: "/notifications",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Notifications"],
    }),


    getUnreadCount: builder.query<UnreadCountResponse, void>({
      query: () => "/notifications/unread-count",
      providesTags: ["Notifications"],
    }),


    readAllNotifications: builder.mutation<void, void>({
      query: () => ({
        url: "/notifications/read-all",
        method: "PATCH",
      }),
      invalidatesTags: ["Notifications"],
    }),

    readNotification: builder.mutation<void, string>({
      query: (id) => ({
        url: `/notifications/${id}/read`,
        method: "PATCH",
      }),
      invalidatesTags: ["Notifications"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetNotificationsQuery,
  useCreateNotificationMutation,
  useGetUnreadCountQuery,
  useReadAllNotificationsMutation,
  useReadNotificationMutation,
} = notificationApi;