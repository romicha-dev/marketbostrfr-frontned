import { baseAPI } from "@/store/api/baseApi";


export type Invoice = {
  id: string;
  invoiceNumber: string;
  status: string;
  description: string;
  issueDate: string;
  dueDate: string;
  weightKg: string;
  destination: string;
  baseShippingRate: string;
  weightSurcharge: string;
  volumeSurcharge: string;
  insuranceCoverage: string;
  totalAmount: string;
  currency: string;
  pdfUrl: string;
  clientId: string;
  packageId: string;
};

export type InvoiceResponse = {
  data: Invoice[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
};


export const invoiceApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({


    getInvoices: builder.query<InvoiceResponse, { page: number; limit: number }>({
      query: ({ page, limit }) => `/invoices?page=${page}&limit=${limit}`,
      providesTags: ["Overview"],
    }),

  
    getInvoiceById: builder.query<Invoice, string>({
      query: (id) => `/invoices/${id}`,
    }),

    
    createInvoice: builder.mutation<Invoice, Partial<Invoice>>({
      query: (data) => ({
        url: `/invoices`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Overview"],  
    }),

  
    updateInvoice: builder.mutation<Invoice, { id: string; data: Partial<Invoice> }>({
      query: ({ id, data }) => ({
        url: `/invoices/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Overview"],
    }),

    
    deleteInvoice: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/invoices/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Overview"],
    }),

  }),
});

export const {
  useGetInvoicesQuery,
  useGetInvoiceByIdQuery,
  useCreateInvoiceMutation,
  useUpdateInvoiceMutation,
  useDeleteInvoiceMutation,
} = invoiceApi;