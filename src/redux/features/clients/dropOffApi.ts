import { baseAPI } from "@/store/api/baseApi";

export type DropOffAppointment = {
  id: string;
  appointmentCode: string;
  type: "DROP_OFF" | "PICK_UP";
  appointmentDate: string;
  timeSlot: string;
  packageCount: number;
  description: string;
  notes?: string;
  priorityDelivery: "STANDARD" | "FAST" | "EXPRESS";
  address: string;
  postalCode: string;
  additionalAddress?: string;
  contactPhone: string;
  status: "UPCOMING" | "COMPLETED" | "CANCELLED";
  isPaid:boolean;
  createdAt: string;
  updatedAt: string;
  clientId: string;
};

export type DropOffListResponse = {
  data: DropOffAppointment[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
};

export type CreateDropOffRequest = {
  type: "DROP_OFF" | "PICK_UP";
  appointmentDate: string;
  timeSlot: string;
  packageCount: number;
  description: string;
  notes?: string;
  priorityDelivery: "STANDARD" | "FAST" | "EXPRESS";
  address: string;
  postalCode: string;
  additionalAddress?: string;
  contactPhone: string;
};

export type UpdateDropOffRequest = Partial<CreateDropOffRequest>;

export const dropOffApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({

    getDropOffAppointments: builder.query<  
      DropOffListResponse,
      { page?: number; limit?: number }
    >({
      query: ({ page = 1, limit = 20 }) =>
        `/dropoff-appointments?page=${page}&limit=${limit}`,
      providesTags: ["DropOff","Payments"],
    }),

    getDropOffById: builder.query<DropOffAppointment, string>({
      query: (id) => `/dropoff-appointments/${id}`,
      providesTags: (_, __, id) => [{ type: "DropOff", id }],
    }),

    createDropOff: builder.mutation<DropOffAppointment, CreateDropOffRequest>({
      query: (body) => ({
        url: "/dropoff-appointments",
        method: "POST",
        body,
      }),
      invalidatesTags: ["DropOff","Payments"],
    }),

    updateDropOff: builder.mutation<  
      DropOffAppointment,
      { id: string; body: UpdateDropOffRequest }
    >({
      query: ({ id, body }) => ({
        url: `/dropoff-appointments/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_, __, { id }) => [{ type: "DropOff", id }],
    }),

    deleteDropOff: builder.mutation<void, string>({
      query: (id) => ({
        url: `/dropoff-appointments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["DropOff","Payments"],
    }),

  }),  
  overrideExisting: false,
});

export const {
  useGetDropOffAppointmentsQuery,
  useGetDropOffByIdQuery,
  useCreateDropOffMutation,
  useUpdateDropOffMutation,
  useDeleteDropOffMutation,
} = dropOffApi;