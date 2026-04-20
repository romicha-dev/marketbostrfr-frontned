import { baseAPI } from "@/store/api/baseApi";


export interface Client {
  id: string;
  clientNumber: string;
  fullName: string;
  email: string;
  phone: string;
  deliveryAddress: string;
  registrationDate: string;
  status: string;
  totalSpent: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}


interface GetClientsResponse {
  data: Client[];
  page: number;
  limit: number;
  total: number;
}


export interface UpdateClientData {
  fullName?: string;
  email?: string;
  phone?: string;
  deliveryAddress?: string;
  status?: string;
}

export const clientApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({

    getClients: builder.query<GetClientsResponse, { page?: number; limit?: number }>({
      query: ({ page = 1, limit = 20 }) => ({
        url: `/clients`,
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["Clients"],
    }),

  
    getClient: builder.query<Client, string>({
      query: (id) => ({
        url: `/clients/${id}`,
        method: "GET",
      }),
      providesTags: (_, __, id) => [{ type: "Clients", id }],
    }),

    updateClient: builder.mutation<Client, { id: string; data: UpdateClientData }>({
      query: ({ id, data }) => ({
        url: `/clients/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (_, __, { id }) => [{ type: "Clients", id }],
    }),

    deleteClient: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/clients/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, __, id) => [{ type: "Clients", id }],
    }),
  }),
});

export const {
  useGetClientsQuery,
  useGetClientQuery,
  useUpdateClientMutation,
  useDeleteClientMutation,
} = clientApi;