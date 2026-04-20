import { useState } from "react";
import { DataTable } from "@/components/reuseable/TableData";
import { Eye } from "lucide-react";
import PaymentModal from "./PaymentModal";
import { Payment, useGetPaymentsQuery } from "@/redux/features/clients/paymentsApi";


const statusStyle: Record<string, string> = {
  PAID: "bg-green-600",
  PENDING: "bg-orange-500",
  FAILED: "bg-red-600",
  CANCELLED: "bg-gray-400",
};

const PaymentTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useGetPaymentsQuery({ page, limit: 10 });

  const handleViewPayment = (payment: Payment) => {
    setSelectedPayment(payment);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPayment(null);
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-GB", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  };

  const paymentColumns = [
    {
      header: "Payment Code",
      key: "paymentCode",
      render: (item: Payment) => (
        <span className="text-gray-500 font-normal">{item.paymentCode}</span>
      ),
    },
    {
      header: "Package ID",
      key: "packageId",
      render: (item: Payment) => (
        <span className="text-gray-500 font-normal truncate max-w-[120px] block">
          {item.packageId || "—"}
        </span>
      ),
    },
    {
      header: "Client ID",
      key: "clientId",
      render: (item: Payment) => (
        <span className="text-gray-500 font-normal truncate max-w-[140px] block">
          {item.clientId}
        </span>
      ),
    },
    {
      header: "Amount",
      key: "amount",
      render: (item: Payment) => (
        <span className="text-gray-600 font-normal">€{item.amount}</span>
      ),
    },
    {
      header: "Method",
      key: "method",
      render: (item: Payment) => (
        <span className="text-gray-600 font-normal">
          {item.method.replace("_", " ")}
        </span>
      ),
    },
    {
      header: "Due Date",
      key: "dueDate",
      render: (item: Payment) => (
        <span className="text-gray-600 font-normal">{formatDate(item.dueDate)}</span>
      ),
    },
    {
      header: "Paid At",
      key: "paidAt",
      render: (item: Payment) => (
        <span className="text-gray-600 font-normal">{formatDate(item.paidAt)}</span>
      ),
    },
    {
      header: "Status",
      key: "status",
      render: (item: Payment) => (
        <span
          className={`px-3 py-1 rounded-full text-white text-sm font-semibold ${
            statusStyle[item.status] ?? "bg-gray-400"
          }`}
        >
          {item.status}
        </span>
      ),
    },
    {
      header: "Action",
      key: "action",
      render: (item: Payment) => (
        <button
          onClick={() => handleViewPayment(item)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1"
        >
          <Eye className="w-4 h-4" />
          View
        </button>
      ),
    },
  ];

 if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (isError) {
    return (
      <div className="mt-6 flex justify-center py-12">
        <p className="text-red-500">Failed to load payments. Please try again.</p>
      </div>
    );
  }

  return (
    <>
      <div className="mt-6">
        <DataTable
          columns={paymentColumns}
          data={data?.data ?? []}
          itemsPerPage={10}
        />

        {/* Pagination */}
        {data?.meta && data.meta.totalPages > 1 && (
          <div className="flex items-center justify-end gap-3 mt-4">
            <button
              disabled={!data.meta.hasPreviousPage}
              onClick={() => setPage((p) => p - 1)}
              className="px-4 py-2 text-sm rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="text-sm text-gray-500">
              Page {page} of {data.meta.totalPages}
            </span>
            <button
              disabled={!data.meta.hasNextPage}
              onClick={() => setPage((p) => p + 1)}
              className="px-4 py-2 text-sm rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>

      <PaymentModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        paymentData={selectedPayment}
      />
    </>
  );
};

export default PaymentTable;




// import { useState } from "react";
// import { DataTable } from "@/components/reuseable/TableData";
// import { Eye } from "lucide-react";
// import PaymentModal from "./PaymentModal";


// interface PaymentData {
//   paymentId: string;
//   packageId: string;
//   clientName: string;
//   clientNumber: string;
//   amount: string;
//   method: string;
//   dueDate: string;
//   status: "Pending" | "Paid";
// }

// const PaymentTable = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedPayment, setSelectedPayment] = useState<PaymentData | null>(null);

//   const paymentsData: PaymentData[] = [
//     {
//       paymentId: "PAY-2025-1234",
//       packageId: "PKG",
//       clientName: "Pierre Durand",
//       clientNumber: "KYL-2025-123454",
//       amount: "€845.50",
//       method: "Stripe",
//       dueDate: "2025-12-18",
//       status: "Pending"
//     },
//     {
//       paymentId: "PAY-2025-1234",
//       packageId: "PKG",
//       clientName: "Pierre Durand",
//       clientNumber: "KYL-2025-123454",
//       amount: "€845.50",
//       method: "Stripe",
//       dueDate: "2025-12-18",
//       status: "Pending"
//     },

//     {
//       paymentId: "PAY-2025-1235",
//       packageId: "PKG",
//       clientName: "Pierre Durand",
//       clientNumber: "KYL-2025-123454",
//       amount: "€845.50",
//       method: "Stripe",
//       dueDate: "2025-12-18",
//       status: "Paid"
//     },
//         {
//       paymentId: "PAY-2025-1234",
//       packageId: "PKG",
//       clientName: "Pierre Durand",
//       clientNumber: "KYL-2025-123454",
//       amount: "€845.50",
//       method: "Stripe",
//       dueDate: "2025-12-18",
//       status: "Pending"
//     },
//         {
//       paymentId: "PAY-2025-1234",
//       packageId: "PKG",
//       clientName: "Pierre Durand",
//       clientNumber: "KYL-2025-123454",
//       amount: "€845.50",
//       method: "Stripe",
//       dueDate: "2025-12-18",
//       status: "Pending"
//     },
//   ];

//   const handleViewPayment = (payment: PaymentData) => {
//     setSelectedPayment(payment);
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setSelectedPayment(null);
//   };

//   const paymentColumns = [
//     { header: "Payment ID", key: "paymentId", className: "text-gray-500 font-normal" },
//     { header: "Package ID", key: "packageId", className: "text-gray-500 font-normal" },
//     {
//       header: "Client",
//       key: "client",
//       render: (item: PaymentData) => (
//         <div className="flex flex-col text-gray-500 font-normal">
//           <span>{item.clientName}</span>
//           <span className="text-sm">{item.clientNumber}</span>
//         </div>
//       )
//     },
//     { header: "Amount", key: "amount", className: "text-gray-600 font-normal" },
//     { header: "Method", key: "method", className: "text-gray-600 font-normal" },
//     { header: "Due Date", key: "dueDate", className: "text-gray-600 font-normal" },
//     {
//       header: "Status",
//       key: "status",
//       render: (item: PaymentData) => (
//         <span className={`px-3 py-1 rounded-full text-white text-sm font-semibold ${
//           item.status === "Paid" ? "bg-green-600" : "bg-orange-500"
//         }`}>
//           {item.status}
//         </span>
//       )
//     },
//     {
//       header: "Action",
//       key: "action",
//       render: (item: PaymentData) => (
//         <button
//           onClick={() => handleViewPayment(item)}
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1"
//         >
//           <Eye className="w-4 h-4" />
//           View
//         </button>
//       )
//     },
//   ];

//   return (
//     <>
//       <div className="mt-6">
//         <DataTable columns={paymentColumns} data={paymentsData} itemsPerPage={5} />
//       </div>

//       <PaymentModal
//         isOpen={isModalOpen}
//         onClose={handleCloseModal}
//         paymentData={selectedPayment}
//       />
//     </>
//   );
// };

// export default PaymentTable;
