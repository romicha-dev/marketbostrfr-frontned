import { baseAPI } from "@/store/api/baseApi";

type AddressRequest = {
  address: string;
  postalCode: string;
  streetNo: string;
  contactPhone: string;
  isDefault: boolean;
};

type AddressResponse = {
  id: string;
  address: string;
  postalCode: string;
  streetNo: string;
  contactPhone: string;
  isDefault: boolean;
};

type GetAddressesResponse = {
  data: AddressResponse[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
  };
};

export const addressApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    createAddress: builder.mutation<AddressResponse, AddressRequest>({
      query: (body) => ({
        url: "/client-addresses",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    getAddresses: builder.query<AddressResponse[], void>({
      query: () => ({
        url: "/client-addresses",
        method: "GET",
      }),
      providesTags: ["User"],
      transformResponse: (response: GetAddressesResponse) => response.data, // ✅ data array return
    }),
  }),
  overrideExisting: false,
});

export const { useCreateAddressMutation, useGetAddressesQuery } = addressApi;