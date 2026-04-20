
import { baseAPI } from "@/store/api/baseApi";
import { AdminDashboardResponse } from "@/type/type";

export const adminDashboardApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAdminDashboard: builder.query<
      AdminDashboardResponse,
      { year?: number; month?: number } | void
    >({
      query: (params) => {
        const queryString = new URLSearchParams();

        if (params?.year !== undefined) {
          queryString.append("year", String(params.year));
        }

        // 🔥 IMPORTANT FIX
        if (params?.month !== undefined && params.month !== 0) {
          queryString.append("month", String(params.month));
        }

        const query = queryString.toString();

        return {
          url: query ? `/admin/dashboard?${query}` : `/admin/dashboard`,
          method: "GET",
        };
      },
      providesTags: ["Dashboard"],
    }),
  }),
});

export const { useGetAdminDashboardQuery } = adminDashboardApi;

