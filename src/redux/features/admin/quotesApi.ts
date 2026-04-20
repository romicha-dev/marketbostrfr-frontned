import { baseAPI } from "@/store/api/baseApi";

export interface Quote {
  id: string;
  quoteNumber: string;
  status: string;
  amount: string;
  baseRate: string;
  weightCharge: string;
  fuelSurcharge: string;
  totalCost: string;
  shippingMethod: string;
  currency: string;
  notes: string;
  generatedAt: string;
  sentAt: string;
  validUntil: string;
  approvedAt: string;
  createdAt: string;
  updatedAt: string;
  packageId: string;
  dropoffAppointmentId: string | null;
}

interface GetQuotesResponse {
  data: Quote[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export const quoteApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
     
    createQuote: builder.mutation({
  query: (body) => ({
    url: "/quotes",
    method: "POST",
    body,
  }),
  invalidatesTags: ["Quotes"],
}),

    getQuotes: builder.query<GetQuotesResponse, { page?: number; limit?: number }>({
      query: ({ page = 1, limit = 20 }) => ({
        url: "/quotes",
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["Quotes"],
    }),

   
    getQuote: builder.query<Quote, string>({
      query: (id) => ({
        url: `/quotes/${id}`,
        method: "GET",
      }),
      providesTags: (_, __, id) => [{ type: "Quotes", id }],
    }),

    updateQuote: builder.mutation<Quote, { id: string; data: Partial<Quote> }>({
      query: ({ id, data }) => ({
        url: `/quotes/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (_, __, { id }) => [{ type: "Quotes", id }],
    }),


    deleteQuote: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/quotes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, __, id) => [{ type: "Quotes", id }],
    }),
  }),
});

export const {
  useCreateQuoteMutation,
  useGetQuotesQuery,
  useGetQuoteQuery,
  useUpdateQuoteMutation,
  useDeleteQuoteMutation,
} = quoteApi;