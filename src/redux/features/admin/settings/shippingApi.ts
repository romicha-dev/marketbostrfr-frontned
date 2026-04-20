import { baseAPI } from "@/store/api/baseApi";

export interface ShippingRate {
  id?: string;
  shippingMethod: string;
  weightRateKg: string;
  fuelSurchargePct: string;
  createdAt?: string;
  updatedAt?: string;
}

export const shippingApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({


    getAllShippingRates: builder.query<ShippingRate[], void>({
      query: () => ({
        url: "/settings/admin/shipping-rates",
        method: "GET",
      }),
      providesTags: ["ShippingRates"],
    }),


    getSingleShippingRate: builder.query<ShippingRate, string>({
      query: (id) => ({
        url: `/settings/admin/shipping-rates/${id}`,
        method: "GET",
      }),
      providesTags: ["ShippingRates"],
    }),

    createShippingRate: builder.mutation<ShippingRate, ShippingRate>({
      query: (data) => ({
        url: "/settings/admin/shipping-rates",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ShippingRates"],
    }),

   
    updateShippingRate: builder.mutation<ShippingRate, { id: string; data: Partial<ShippingRate> }>({
      query: ({ id, data }) => ({
        url: `/settings/admin/shipping-rates/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["ShippingRates"],
    }),

  
    deleteShippingRate: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/settings/admin/shipping-rates/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ShippingRates"],
    }),
    
  }),
});

export const {
  useGetAllShippingRatesQuery,
  useGetSingleShippingRateQuery,
  useCreateShippingRateMutation,
  useUpdateShippingRateMutation,
  useDeleteShippingRateMutation,
} = shippingApi;