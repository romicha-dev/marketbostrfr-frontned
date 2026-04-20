import { baseAPI } from "@/store/api/baseApi";



export type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "CANCELLED";
export type PaymentMethod = "CREDIT_CARD" | "DEBIT_CARD" | "BANK_TRANSFER" | "CASH";

export interface Payment {
  id: string;
  paymentCode: string;
  status: PaymentStatus;
  method: PaymentMethod;
  amount: string;
  dueDate: string;
  paidAt: string | null;
  receiptUrl: string | null;
  reminderSentAt: string | null;
  clientId: string;
  packageId: string;
  dropoffAppointmentId: string;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface PaginatedPayments {
  data: Payment[];
  meta: PaginationMeta;
}

export interface CreatePaymentDto {
  paymentCode: string;
  status: PaymentStatus;
  method: PaymentMethod;
  amount: string;
  dueDate: string;
  paidAt?: string;
  receiptUrl?: string;
  reminderSentAt?: string;
  clientId: string;
  packageId: string;
  dropoffAppointmentId: string;
}

export interface UpdatePaymentDto extends Partial<CreatePaymentDto> {}

export interface CreatePaymentIntentDto {
  packageId?: string;
  dropoffAppointmentId?: string;
  dueDate?: string;
}

// ✅ Fixed — matches actual backend response:
// {
//   paymentId: "...",
//   status: "PENDING",
//   amount: "39.90",
//   currency: "EUR",
//   stripe: {
//     clientSecret: "pi_xxx_secret_xxx",
//     paymentIntentId: "pi_xxx"
//   }
// }
export interface PaymentIntentResponse {
  paymentId: string;
  status: string;
  amount: string;
  currency: string;
  stripe: {
    clientSecret: string;
    paymentIntentId: string;
  };
}

// ─── API ──────────────────────────────────────────────────────────────────────

export const paymentApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({

    // 1. CREATE
    createPayment: builder.mutation<Payment, CreatePaymentDto>({
      query: (body) => ({
        url: "/payments",
        method: "POST",
        body,
      }),
     invalidatesTags: ["Payments", "Packages", "DropOff"]
    }),

    // 2. GET ALL with pagination
    getPayments: builder.query<PaginatedPayments, { page?: number; limit?: number }>({
      query: ({ page = 1, limit = 20 }) =>
        `/payments?page=${page}&limit=${limit}`,
      providesTags: ["Payments", "Packages", "DropOff"],
    }),

    // 3. GET BY ID
    getPaymentById: builder.query<Payment, string>({
      query: (id) => `/payments/${id}`,
      providesTags: (_, __, id) => [{ type: "Payments", id }],
    }),

    // 4. UPDATE
    updatePayment: builder.mutation<Payment, { id: string; body: UpdatePaymentDto }>({
      query: ({ id, body }) => ({
        url: `/payments/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_, __, { id }) => [{ type: "Payments", id }, "Payments"],
    }),

    // 5. DELETE
    deletePayment: builder.mutation<void, string>({
      query: (id) => ({
        url: `/payments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Payments", "Packages", "DropOff"],
    }),

    // 6. GET PAYMENT INTENT by payment id
    getPaymentIntent: builder.query<PaymentIntentResponse, string>({
      query: (id) => `/payments/${id}/intent`,
    }),

    // 7. CREATE PAYMENT INTENT ✅ return type fixed
    createPaymentIntent: builder.mutation<PaymentIntentResponse, CreatePaymentIntentDto>({
      query: (body) => ({
        url: "/payments/intent",
        method: "POST",
        body,
      }),
    }),

    // 8. STRIPE WEBHOOK (backend only — not called from frontend directly)
    handleStripeWebhook: builder.mutation<void, { rawBody: string; stripeSignature: string }>({
      query: ({ rawBody, stripeSignature }) => ({
        url: "/payments/webhook/stripe",
        method: "POST",
        body: rawBody,
        headers: {
          "stripe-signature": stripeSignature,
        },
      }),
    }),

  }),
  overrideExisting: false,
});

export const {
  useCreatePaymentMutation,
  useGetPaymentsQuery,
  useGetPaymentByIdQuery,
  useUpdatePaymentMutation,
  useDeletePaymentMutation,
  useGetPaymentIntentQuery,
  useCreatePaymentIntentMutation,
  useHandleStripeWebhookMutation,
} = paymentApi;

// // ─── Types ────────────────────────────────────────────────────────────────────

// import { baseAPI } from "@/store/api/baseApi";

// export type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "CANCELLED";
// export type PaymentMethod = "CREDIT_CARD" | "DEBIT_CARD" | "BANK_TRANSFER" | "CASH";

// export interface Payment {
//   id: string;
//   paymentCode: string;
//   status: PaymentStatus;
//   method: PaymentMethod;
//   amount: string;
//   dueDate: string;
//   paidAt: string | null;
//   receiptUrl: string | null;
//   reminderSentAt: string | null;
//   clientId: string;
//   packageId: string;
//   dropoffAppointmentId: string;
// }

// export interface PaginationMeta {
//   page: number;
//   limit: number;
//   total: number;
//   totalPages: number;
//   hasNextPage: boolean;
//   hasPreviousPage: boolean;
// }

// export interface PaginatedPayments {
//   data: Payment[];
//   meta: PaginationMeta;
// }

// export interface CreatePaymentDto {
//   paymentCode: string;
//   status: PaymentStatus;
//   method: PaymentMethod;
//   amount: string;
//   dueDate: string;
//   paidAt?: string;
//   receiptUrl?: string;
//   reminderSentAt?: string;
//   clientId: string;
//   packageId: string;
//   dropoffAppointmentId: string;
// }

// export interface UpdatePaymentDto extends Partial<CreatePaymentDto> {}

// export interface CreatePaymentIntentDto {
//   packageId: string;
//   dropoffAppointmentId: string;
//   dueDate: string;
// }

// export interface PaymentIntent {
//   clientSecret: string;
//   paymentIntentId: string;
//   amount: number;
//   currency: string;
// }



// export const paymentApi = baseAPI.injectEndpoints({
//   endpoints: (builder) => ({
//     // 1. CREATE
//     createPayment: builder.mutation<Payment, CreatePaymentDto>({
//       query: (body) => ({
//         url: "/payments",
//         method: "POST",
//         body,
//       }),
//       invalidatesTags: ["Payments"],
//     }),

//     // 2. GET ALL with pagination
//     getPayments: builder.query<PaginatedPayments, { page?: number; limit?: number }>({
//       query: ({ page = 1, limit = 20 }) => `/payments?page=${page}&limit=${limit}`,
//       providesTags: ["Payments"],
//     }),

//     // 3. GET BY ID
//     getPaymentById: builder.query<Payment, string>({
//       query: (id) => `/payments/${id}`,
//       providesTags: (_, __, id) => [{ type: "Payments", id }],
//     }),

//     // 4. UPDATE
//     updatePayment: builder.mutation<Payment, { id: string; body: UpdatePaymentDto }>({
//       query: ({ id, body }) => ({
//         url: `/payments/${id}`,
//         method: "PATCH",
//         body,
//       }),
//       invalidatesTags: (_, __, { id }) => [{ type: "Payments", id }, "Payments"],
//     }),

//     // 5. DELETE
//     deletePayment: builder.mutation<void, string>({
//       query: (id) => ({
//         url: `/payments/${id}`,
//         method: "DELETE",
//       }),
//       invalidatesTags: ["Payments"],
//     }),

//     // 6. GET PAYMENT INTENT by payment id
//     getPaymentIntent: builder.query<PaymentIntent, string>({
//       query: (id) => `/payments/${id}/intent`,
//     }),

//     // 7. CREATE PAYMENT INTENT
//     createPaymentIntent: builder.mutation<PaymentIntent, CreatePaymentIntentDto>({
//       query: (body) => ({
//         url: "/payments/intent",
//         method: "POST",
//         body,
//       }),
//     }),

//     // 8. STRIPE WEBHOOK
//     handleStripeWebhook: builder.mutation<void, { rawBody: string; stripeSignature: string }>({
//       query: ({ rawBody, stripeSignature }) => ({
//         url: "/payments/webhook/stripe",
//         method: "POST",
//         body: rawBody,
//         headers: {
//           "stripe-signature": stripeSignature,
//         },
//       }),
//     }),
//   }),
// });


// export const {
//   useCreatePaymentMutation,
//   useGetPaymentsQuery,
//   useGetPaymentByIdQuery,
//   useUpdatePaymentMutation,
//   useDeletePaymentMutation,
//   useGetPaymentIntentQuery,
//   useCreatePaymentIntentMutation,
//   useHandleStripeWebhookMutation,
// } = paymentApi;