import { Payment } from "@/redux/features/clients/paymentsApi";
import { X, Clock, CheckCircle, XCircle, Download } from "lucide-react";
import { JSX, useEffect } from "react";


interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  paymentData: Payment | null;
}

const statusConfig: Record<string, { bg: string; icon: JSX.Element; text: string }> = {
  PENDING: {
    bg: "bg-[#FFF7ED]",
    icon: <Clock className="w-5 h-5 text-[#F54900]" />,
    text: "text-[#F54900]",
  },
  PAID: {
    bg: "bg-[#F0FDF4]",
    icon: <CheckCircle className="w-5 h-5 text-green-600" />,
    text: "text-green-600",
  },
  FAILED: {
    bg: "bg-[#FFF1F2]",
    icon: <XCircle className="w-5 h-5 text-red-500" />,
    text: "text-red-500",
  },
  CANCELLED: {
    bg: "bg-[#F9FAFB]",
    icon: <XCircle className="w-5 h-5 text-gray-400" />,
    text: "text-gray-400",
  },
};

const formatDate = (dateStr: string | null | undefined) => {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
};

const PaymentModal = ({ isOpen, onClose, paymentData }: ModalProps) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen || !paymentData) return null;

  const config = statusConfig[paymentData.status] ?? statusConfig.CANCELLED;

  const handleDownload = () => {
    const receipt = `
Payment Receipt
===============
Payment Code  : ${paymentData.paymentCode}
Status        : ${paymentData.status}
Amount        : €${paymentData.amount}
Method        : ${paymentData.method.replace("_", " ")}
Due Date      : ${formatDate(paymentData.dueDate)}
Paid At       : ${formatDate(paymentData.paidAt)}
-----------------
Client ID     : ${paymentData.clientId}
Package ID    : ${paymentData.packageId || "—"}
Dropoff ID    : ${paymentData.dropoffAppointmentId || "—"}
    `.trim();

    const blob = new Blob([receipt], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Receipt_${paymentData.paymentCode}.txt`;
    link.click();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-2xl max-h-[95vh] rounded-xl shadow-2xl overflow-hidden relative flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100 flex-shrink-0">
          <h2 className="text-lg sm:text-xl md:text-2xl font-roboto font-semibold leading-[150%] text-[#0A0A0A]">
            Payment Details — {paymentData.paymentCode}
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">

          {/* Status Banner */}
          <div className={`${config.bg} rounded-lg p-4 flex justify-between items-start`}>
            <div className="flex gap-3">
              <div className="mt-0.5">{config.icon}</div>
              <div>
                <p className={`text-base sm:text-lg font-roboto font-normal leading-[150%] mb-1 ${config.text}`}>
                  {paymentData.status}
                </p>
                <p className="text-sm sm:text-base font-roboto font-normal text-gray-500 leading-[150%]">
                  Due by {formatDate(paymentData.dueDate)}
                </p>
                {paymentData.paidAt && (
                  <p className="text-sm font-roboto text-gray-400 mt-1">
                    Paid at {formatDate(paymentData.paidAt)}
                  </p>
                )}
              </div>
            </div>
            <p className="text-sm md:text-base font-roboto font-semibold text-[#101828]">
              €{paymentData.amount}
            </p>
          </div>

          {/* Payment Info */}
          <div className="bg-[#F9FAFB] rounded-xl p-6">
            <h3 className="text-base sm:text-lg md:text-xl font-normal font-roboto leading-[150%] text-[#0A0A0A] mb-5">
              Payment Information
            </h3>
            <div className="grid grid-cols-2 gap-y-6 gap-x-4">
              <InfoBlock label="Payment Code" value={paymentData.paymentCode} />
              <InfoBlock label="Amount" value={`€${paymentData.amount}`} />
              <InfoBlock
                label="Method"
                value={paymentData.method.replace("_", " ")}
              />
              <InfoBlock label="Due Date" value={formatDate(paymentData.dueDate)} />
              <InfoBlock label="Paid At" value={formatDate(paymentData.paidAt)} />
              {paymentData.reminderSentAt && (
                <InfoBlock
                  label="Reminder Sent"
                  value={formatDate(paymentData.reminderSentAt)}
                />
              )}
            </div>
          </div>

          {/* Reference Info */}
          <div className="bg-[#F9FAFB] rounded-xl p-6">
            <h3 className="text-base sm:text-lg md:text-xl font-normal font-roboto leading-[150%] text-[#0A0A0A] mb-5">
              Reference Information
            </h3>
            <div className="grid grid-cols-2 gap-y-6 gap-x-4">
              <InfoBlock label="Client ID" value={paymentData.clientId} isLink />
              {paymentData.packageId && (
                <InfoBlock label="Package ID" value={paymentData.packageId} isLink />
              )}
              {paymentData.dropoffAppointmentId && (
                <InfoBlock
                  label="Dropoff Appointment ID"
                  value={paymentData.dropoffAppointmentId}
                  isLink
                />
              )}
              {paymentData.receiptUrl && (
                <div className="col-span-2">
                  <InfoBlock label="Receipt URL" value={paymentData.receiptUrl} isLink />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 flex flex-col sm:flex-row gap-3 flex-shrink-0">
          <button
            onClick={handleDownload}
            className="flex-1 bg-[#1C60DF] text-white py-3 rounded-lg font-roboto font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
          >
            <Download className="w-4 h-4" />
            Download Receipt
          </button>
          {paymentData.status === "PENDING" && (
            <button className="flex-1 border border-[#1C60DF] text-[#1C60DF] py-3 rounded-lg font-roboto font-semibold flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors">
              Send Reminder
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const InfoBlock = ({
  label,
  value,
  isLink = false,
}: {
  label: string;
  value: string;
  isLink?: boolean;
}) => (
  <div>
    <p className="font-roboto text-[#6A7282] text-sm md:text-base leading-[150%] font-normal uppercase tracking-wider mb-1">
      {label}
    </p>
    <p
      className={`font-roboto text-sm md:text-base leading-[150%] font-normal break-all ${
        isLink
          ? "text-blue-600 hover:underline cursor-pointer"
          : "text-[#101828]"
      }`}
    >
      {value}
    </p>
  </div>
);

export default PaymentModal;







// import { X, Clock, Download } from "lucide-react";
// import { useEffect } from "react";

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

// interface ModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   paymentData: PaymentData | null; // ✅ must include this
// }

// const PaymentModal = ({ isOpen, onClose, paymentData }: ModalProps) => {
//   // ESC key press close
//   useEffect(() => {
//     const handleEsc = (e: KeyboardEvent) => {
//       if (e.key === "Escape") onClose();
//     };
//     window.addEventListener("keydown", handleEsc);
//     return () => window.removeEventListener("keydown", handleEsc);
//   }, [onClose]);

//   if (!isOpen || !paymentData) return null;

//   const handleDownload = () => {
//     const receipt = `
// Payment ID: ${paymentData.paymentId}
// Package ID: ${paymentData.packageId}
// Client: ${paymentData.clientName}
// Amount: ${paymentData.amount}
// Payment Method: ${paymentData.method}
// Due Date: ${paymentData.dueDate}
// Status: ${paymentData.status}
//     `;
//     const blob = new Blob([receipt], { type: "text/plain;charset=utf-8" });
//     const link = document.createElement("a");
//     link.href = URL.createObjectURL(blob);
//     link.download = "Payment_Receipt.txt";
//     link.click();
//   };

//   return (
//     <div
//       className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200"
//       onClick={onClose}
//     >
//       <div
//         className="bg-white w-full max-w-2xl max-h-[95vh] rounded-xl shadow-2xl overflow-hidden relative flex flex-col animate-in zoom-in-95 duration-200"
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* Header */}
//         <div className="flex justify-between items-center p-6 border-b border-gray-50 flex-shrink-0">
//           <h2 className="text-lg sm:text-xl md:text-2xl font-roboto font-semibold leading-[150%] text-[#0A0A0A]">
//             Payment Details - {paymentData.paymentId}
//           </h2>
//           <button
//             onClick={onClose}
//             className="p-1 hover:bg-gray-100 rounded-full transition-colors"
//           >
//             <X className="w-6 h-6 text-gray-400" />
//           </button>
//         </div>

//         {/* Body */}
//         <div className="p-6 space-y-6 overflow-y-auto flex-1">
//           {/* Status */}
//           <div className={`bg-[#FFF7ED] ${paymentData.status === "Paid" ? "green" : "orange"}-100 rounded-lg p-4 flex justify-between items-start`}>
//             <div className="flex gap-3">
//               <div className="mt-0.5 p-1 rounded-full">
//                 <Clock className={`w-5 h-5 text-[#F54900] ${paymentData.status === "Paid" ? "green" : "orange"}-500`} />
//               </div>
//               <div>
//                 <p className="text-base sm:text-lg font-roboto font-normal text-[#101828] leading-[150%] mb-2.5">
//                   Payment Status: {paymentData.status}
//                 </p>
//                 <p className="text-sm sm:text-base font-roboto font-normal text-gray-500 leading-[150%]">
//                   Due by {paymentData.dueDate}
//                 </p>
//               </div>
//             </div>
//             <p className="text-sm md:text-base font-roboto font-normal text-[#101828] leading-6">
//               {paymentData.amount}
//             </p>
//           </div>

//           {/* Payment Info */}
//           <div className="bg-[#F9FAFB] rounded-xl p-6">
//             <h1 className="text-base sm:text-lg md:text-xl font-normal font-roboto leading-[150%] text-[#0A0A0A] mb-4.5">
//               Payment Information
//             </h1>
//             <div className="grid grid-cols-2 gap-y-6 gap-x-4">
//               <InfoBlock label="Payment ID" value={paymentData.paymentId} />
//               <InfoBlock label="Package ID" value={paymentData.packageId} isLink />
//               <InfoBlock label="Payment Method" value={paymentData.method} />
//               <InfoBlock label="Amount" value={paymentData.amount} />
//               <InfoBlock label="Due Date" value={paymentData.dueDate} />
//             </div>
//           </div>

//           {/* Client Info */}
//           <div className="bg-[#F9FAFB] rounded-xl p-6">
//             <h1 className="text-base sm:text-lg md:text-xl font-normal font-roboto leading-[150%] text-[#0A0A0A] mb-4.5">
//               Client Information
//             </h1>
//             <div className="space-y-6">
//               <div className="grid grid-cols-2 gap-4">
//                 <InfoBlock label="Client Name" value={paymentData.clientName} />
//                 <InfoBlock label="Client Number" value={paymentData.clientNumber} isLink />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="p-6 border-t border-gray-50 flex flex-col sm:flex-row gap-3 flex-shrink-0">
//           <button
//             onClick={handleDownload}
//             className="flex-1 bg-[#1C60DF] text-white py-3 rounded-lg font-roboto font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
//           >
//             <Download className="w-4 h-4" />
//             Download Receipt
//           </button>
//           <button className="flex-1 border border-[#1C60DF] text-[#1C60DF] py-3 rounded-lg font-roboto font-semibold flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors">
//             Send Reminder
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const InfoBlock = ({
//   label,
//   value,
//   isLink = false,
// }: {
//   label: string;
//   value: string;
//   isLink?: boolean;
// }) => (
//   <div>
//     <p className="font-roboto text-[#6A7282] text-sm md:text-base leading-[150%] font-normal uppercase tracking-wider mb-1">
//       {label}
//     </p>
//     <p
//       className={`font-roboto text-sm md:text-base leading-[150%] font-normal ${
//         isLink ? "text-blue-600 hover:underline cursor-pointer" : "text-[#101828]"
//       }`}
//     >
//       {value}
//     </p>
//   </div>
// );

// export default PaymentModal;
