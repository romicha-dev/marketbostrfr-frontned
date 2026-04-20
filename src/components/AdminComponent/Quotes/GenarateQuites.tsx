import { useState } from "react";
import { DataTable } from "@/components/reuseable/TableData";
import { Eye, ChevronLeft, ChevronRight } from "lucide-react";
import QuoteDetails from "./QuoteDetailsModal";
import { useGetQuotesQuery } from "@/redux/features/admin/quotesApi";


const STATUS_MAP: Record<string, { label: string; className: string }> = {
  GENERATED: { label: "Generated", className: "bg-blue-100 text-blue-700"     },
  PENDING:   { label: "Pending",   className: "bg-orange-100 text-orange-600"  },
  APPROVED:  { label: "Approved",  className: "bg-green-100 text-green-700"    },
  PAID:      { label: "Paid",      className: "bg-emerald-100 text-emerald-700"},
  REJECTED:  { label: "Rejected",  className: "bg-red-100 text-red-600"        },
};

const LIMIT = 10;

const GenarateQuites = () => {
  const [isModalOpen,   setIsModalOpen]   = useState(false);
  const [selectedQuote, setSelectedQuote] = useState<any>(null);
  const [currentPage,   setCurrentPage]   = useState(1);

  const { data, isLoading, isFetching } = useGetQuotesQuery({
    page:  currentPage,
    limit: LIMIT,
  });

  const quotesData = data?.data || [];
  const meta       = data?.meta;


  // so we calculate manually:
  const totalPages   = meta?.totalPages ?? 1;
  const hasPrev      = currentPage > 1;
  const hasNext      = currentPage < totalPages;

  const handleView = (quote: any) => {
    setSelectedQuote(quote);
    setIsModalOpen(true);
  };

  const handlePrev = () => {
    if (hasPrev) setCurrentPage((p) => p - 1);
  };

  const handleNext = () => {
    if (hasNext) setCurrentPage((p) => p + 1);
  };

 
  const formattedData = quotesData.map((item: any) => ({
    paymentId:    item.quoteNumber,
    packageId:    item.packageId,
    clientName:   "N/A",
    clientNumber: "N/A",
    amount:       `${item.currency} ${parseFloat(item.amount).toFixed(2)}`,
    method:       item.shippingMethod,
    dueDate:      item.validUntil?.split("T")[0] ?? "—",
    status:       item.status,   
    original:     item,
  }));

  const columns = [
    { header: "Quote ID",    key: "paymentId" },
    { header: "Package ID",  key: "packageId" },

    {
      header: "Client",
      key: "client",
      render: (item: any) => (
        <div className="flex flex-col leading-tight">
          <span className="text-sm font-medium text-gray-700">{item.clientName}</span>
          <span className="text-xs text-gray-400">{item.clientNumber}</span>
        </div>
      ),
    },

    { header: "Amount",      key: "amount"  },
    { header: "Method",      key: "method"  },
    { header: "Valid Until", key: "dueDate" },

    {
      header: "Status",
      key: "status",
      render: (item: any) => {
        const cfg = STATUS_MAP[item.status] ?? {
          label:     item.status,
          className: "bg-gray-100 text-gray-500",
        };
        return (
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${cfg.className}`}>
            {cfg.label}
          </span>
        );
      },
    },

    {
      header: "Action",
      key: "action",
      render: (item: any) => (
        <button
          onClick={() => handleView(item.original)}
          className="bg-blue-600 text-white px-3 py-1.5 rounded-lg flex items-center gap-1 text-sm hover:bg-blue-700 transition"
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

  return (
    <>
      <div className="mt-6 space-y-4">
        {/* Table */}
        <div className={isFetching ? "opacity-60 pointer-events-none transition-opacity" : "transition-opacity"}>
          <DataTable columns={columns} data={formattedData} itemsPerPage={LIMIT} />
        </div>

       
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-1 pt-2">
            {/* Summary */}
            <p className="text-sm text-gray-500">
              Page <span className="font-medium text-gray-700">{currentPage}</span> of{" "}
              <span className="font-medium text-gray-700">{totalPages}</span>
              {meta?.total ? <> &nbsp;·&nbsp; {meta.total} total</> : null}
            </p>

            {/* Controls */}
            <div className="flex items-center gap-1">
              {/* Prev */}
              <button
                onClick={handlePrev}
                disabled={!hasPrev || isFetching}
                className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50
                  disabled:opacity-30 disabled:cursor-not-allowed transition"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((page) =>
                  page === 1 ||
                  page === totalPages ||
                  Math.abs(page - currentPage) <= 1
                )
                .reduce<(number | "...")[]>((acc, page, idx, arr) => {
                  if (idx > 0 && page - (arr[idx - 1] as number) > 1) acc.push("...");
                  acc.push(page);
                  return acc;
                }, [])
                .map((item, idx) =>
                  item === "..." ? (
                    <span key={`e-${idx}`} className="px-2 text-gray-400 text-sm">…</span>
                  ) : (
                    <button
                      key={item}
                      onClick={() => setCurrentPage(item as number)}
                      disabled={isFetching}
                      className={`w-9 h-9 rounded-lg text-sm font-medium transition
                        ${currentPage === item
                          ? "bg-[#1C60DF] text-white shadow-sm"
                          : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                        } disabled:opacity-40`}
                    >
                      {item}
                    </button>
                  )
                )}

              {/* Next */}
              <button
                onClick={handleNext}
                disabled={!hasNext || isFetching}
                className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50
                  disabled:opacity-30 disabled:cursor-not-allowed transition"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      <QuoteDetails
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        paymentData={selectedQuote}
      />
    </>
  );

  function handleCloseModal() {
    setIsModalOpen(false);
    setSelectedQuote(null);
  }
};

export default GenarateQuites;




// import { useState } from "react";
// import { DataTable } from "@/components/reuseable/TableData";
// import { Eye } from "lucide-react";

// import QuoteDetails from "./QuoteDetailsModal";



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

// const GenarateQuites = () => {
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

//       <QuoteDetails
//         isOpen={isModalOpen}
//         onClose={handleCloseModal}
//         paymentData={selectedPayment}
//       />
//     </>
//   );
// };

// export default GenarateQuites;
