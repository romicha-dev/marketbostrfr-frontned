import { baseAPI } from "@/store/api/baseApi";



export interface CompanySettings {
  id?: string;
  companyName: string;
  companyEmail: string;
  companyPhone: string;
  warehouseAddress: string;
  supportEmail: string;
  createdAt?: string;
  updatedAt?: string;
}

export const adminSettingsApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({


    getAllCompanySettings: builder.query<CompanySettings[], void>({
      query: () => ({
        url: "/settings/admin/company",
        method: "GET",
      }),
      providesTags: ["CompanySettings"],
    }),


    getSingleCompanySettings: builder.query<CompanySettings, string>({
      query: (id) => ({
        url: `/settings/admin/company/${id}`,
        method: "GET",
      }),
      providesTags: ["CompanySettings"],
    }),


    createCompanySettings: builder.mutation<CompanySettings, CompanySettings>({
      query: (data) => ({
        url: "/settings/admin/company",
        method: "POST",
          body: data,
      }),
      invalidatesTags: ["CompanySettings"],
    }),

  
  updateCompanySettings: builder.mutation<
  CompanySettings,
  { id: string } & Partial<CompanySettings>
>({
  query: ({ id, ...body }) => ({
    url: `/settings/admin/company/${id}`,
    method: "PATCH",
    body,
  }),
  invalidatesTags: ["CompanySettings"],
}),


    deleteCompanySettings: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/settings/admin/company/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["CompanySettings"],
    }),

  }),
});

export const {
  useGetAllCompanySettingsQuery,
  useGetSingleCompanySettingsQuery,
  useCreateCompanySettingsMutation,
  useUpdateCompanySettingsMutation,
  useDeleteCompanySettingsMutation,
} = adminSettingsApi;