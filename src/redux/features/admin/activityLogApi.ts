import { baseAPI } from "@/store/api/baseApi";

export interface ActivityLog {
  id: string;
  type: string;
  title: string;
  message: string;
  occurredAt: string;
  createdAt: string;
  clientId: string | null;
  packageId: string | null;
  dropoffAppointmentId: string | null;
}

export interface ActivityLogResponse {
  data: ActivityLog[];
  meta: {
    page: number;
    limit: number;
    total: number;
  };
}

export const activityLogApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({

    // 🔥 GET ALL ACTIVITY LOGS
    getActivityLogs: builder.query<
      ActivityLogResponse,
      { page?: number; limit?: number; clientId?: string }
    >({
      query: ({ page = 1, limit = 20, clientId }) => {
        const params = new URLSearchParams();

        params.append("page", String(page));
        params.append("limit", String(limit));

        if (clientId) {
          params.append("clientId", clientId);
        }

        return `/activity-logs?${params.toString()}`;
      },
      providesTags: ["ActivityLogs"],
    }),

    // 🔥 GET SINGLE LOG BY ID
    getActivityLogById: builder.query<ActivityLog, string>({
      query: (id) => `/activity-logs/${id}`,
      providesTags: (_, __, id) => [{ type: "ActivityLogs", id }],
    }),

    // ❌ DELETE LOG
    deleteActivityLog: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/activity-logs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ActivityLogs"],
    }),

  }),
});

export const {
  useGetActivityLogsQuery,
  useGetActivityLogByIdQuery,
  useDeleteActivityLogMutation,
} = activityLogApi;