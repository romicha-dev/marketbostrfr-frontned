
import { baseAPI } from "@/store/api/baseApi";

export type PackageRequest = {
  packageCode: string;
  trackingNumber: string;
  blNumber: string;
  description: string;
  weightKg: string;
  shippingCost: string;
  carrier: string;
  destination: string;
  status: string;
  isPaid?:boolean;
  internalNotes?: string;
  ecommerceTrackingNumber?: string;
  ecommercePlatform?: string;
  estimatedValue?: string;
  additionalNotes?: string;
  priorityDelivery?: string;
  declaredAt?: string;
  deliveredAt?: string;
  forwardingAddressId?: string;
};

export type PackageResponse = PackageRequest & {
  id: string;
  createdAt: string;
  updatedAt: string;
  clientId: string;
};

export type PackagePaginationResponse = {
  data: PackageResponse[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
};

// Timeline type (example, adjust fields according to backend)
export type PackageTimelineEvent = {
  id: string;
  status: string;
  timestamp: string;
  notes?: string;
};

export const packageApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    // 1. CREATE
    createPackage: builder.mutation<PackageResponse, PackageRequest>({
      query: (body) => ({
        url: "/packages",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Packages","Payments"],
    }),

    // 2. GET ALL with pagination
 getPackages: builder.query<
  PackagePaginationResponse,
  {
    page?: number;
    limit?: number;
    status?: string;
    destination?: string;
    search?: string;
    createdFrom?: string;
    createdTo?: string;
  }
>({
  query: (params) => {
    const query = new URLSearchParams();

    if (params?.page) query.append("page", String(params.page));
    if (params?.limit) query.append("limit", String(params.limit));
    if (params?.status) query.append("status", params.status);
    if (params?.destination) query.append("destination", params.destination);
    if (params?.search) query.append("search", params.search);
    if (params?.createdFrom) query.append("createdFrom", params.createdFrom);
    if (params?.createdTo) query.append("createdTo", params.createdTo);

    return `/packages?${query.toString()}`;
  },

  providesTags: ["Packages","Payments"],
}),

    // clientId diye packages fetch
getPackagesByClient: builder.query<PackagePaginationResponse, { clientId: string; page?: number; limit?: number }>({
  query: ({ clientId, page = 1, limit = 20 }) =>
    `/clients/${clientId}/packages?page=${page}&limit=${limit}`,
  providesTags: (_, __, { clientId }) => [{ type: "Packages", id: `client-${clientId}` }],
}),

    // 3. GET by ID
    getPackageById: builder.query<PackageResponse, string>({
      query: (id) => `/packages/${id}`,
      providesTags: (_, __, id) => [{ type: "Packages", id }],
    }),

    // 4. PATCH / UPDATE by ID
    updatePackage: builder.mutation<PackageResponse, { id: string; body: Partial<PackageRequest> }>({
      query: ({ id, body }) => ({
        url: `/packages/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Packages","Payments"],
    }),

    // 5. DELETE by ID
    deletePackage: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/packages/${id}`,
        method: "DELETE",
      }),
    invalidatesTags: (_, __, id) => [{ type: "Packages", id }]
    }),

    // 6. GET TIMELINE by ID
    getPackageTimeline: builder.query<PackageTimelineEvent[], string>({
      query: (id) => `/packages/${id}/timeline`,
      providesTags: ( _, id) => [{ type: "Packages", id: `timeline-${id}` }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreatePackageMutation,
  useGetPackagesQuery,
  useGetPackagesByClientQuery,
  useGetPackageByIdQuery,
  useUpdatePackageMutation,
  useDeletePackageMutation,
  useGetPackageTimelineQuery,
} = packageApi;    