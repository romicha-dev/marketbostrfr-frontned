import React from "react";
import { X } from "lucide-react";
import { useGetDropOffByIdQuery } from "@/redux/features/clients/dropOffApi";

interface DropOffModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageId: string | null;

}

const statusOrder = ["UPCOMING", "COMPLETED", "CANCELLED"];

const statusLabel: Record<string, string> = {
  UPCOMING: "Upcoming",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

const DropOffModal: React.FC<DropOffModalProps> = ({
  isOpen,
  onClose,
  packageId,
 
}) => {
  // ✅ FIX: Hook always top + skip condition
  const { data, isLoading } = useGetDropOffByIdQuery(packageId!, {
    skip: !packageId || !isOpen,
  });

  // ✅ FIX: prevent render if modal বন্ধ বা id নাই
  if (!isOpen || !packageId) return null;

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/40">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  const currentStatus = data?.status?.trim() || "UPCOMING";

  const currentIndex = statusOrder.findIndex(
    (s) => s.toLowerCase() === currentStatus.toLowerCase()
  );

  const trackingHistory = statusOrder.map((status, index) => ({
    status: statusLabel[status],
    time: index <= currentIndex ? data?.updatedAt || "N/A" : null,
    completed: index <= currentIndex,
  }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-[500px] rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* HEADER */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">
            Appointment - {data?.appointmentCode}
          </h2>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="p-6 max-h-[80vh] overflow-y-auto">

          {/* APPOINTMENT DETAILS */}
          <div className="bg-[#F8FAFF] rounded-xl p-5 mb-8 border border-blue-50">
            <h3 className="text-sm font-semibold mb-4">Appointment Details</h3>

            <div className="grid grid-cols-2 gap-y-4 text-sm">
              <div>
                <p className="text-gray-500">Type</p>
                <p className="font-medium">
                  {data?.type === "DROP_OFF" ? "Drop Off" : "Pick Up"}
                </p>
              </div>

              <div>
                <p className="text-gray-500">Date</p>
                <p className="font-medium">
                  {data?.appointmentDate
                    ? new Date(data.appointmentDate).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>

              <div>
                <p className="text-gray-500">Time Slot</p>
                <p className="font-medium">{data?.timeSlot}</p>
              </div>

              <div>
                <p className="text-gray-500">Package Count</p>
                <p className="font-medium">{data?.packageCount}</p>
              </div>

              <div>
                <p className="text-gray-500">Priority</p>
                <p className="font-medium capitalize">
                  {data?.priorityDelivery?.toLowerCase()}
                </p>
              </div>

              <div>
                <p className="text-gray-500">Payment</p>
                <p
                  className={`font-medium ${
                    data?.isPaid ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {data?.isPaid ? "Paid" : "Unpaid"}
                </p>
              </div>

              <div>
                <p className="text-gray-500">Contact</p>
                <p className="font-medium">{data?.contactPhone}</p>
              </div>

              <div>
                <p className="text-gray-500">Postal Code</p>
                <p className="font-medium">{data?.postalCode}</p>
              </div>

              <div className="col-span-2">
                <p className="text-gray-500">Address</p>
                <p className="font-medium">{data?.address}</p>
              </div>

              {data?.additionalAddress && (
                <div className="col-span-2">
                  <p className="text-gray-500">Additional Address</p>
                  <p className="font-medium">{data.additionalAddress}</p>
                </div>
              )}

              <div className="col-span-2">
                <p className="text-gray-500">Description</p>
                <p className="font-medium">{data?.description}</p>
              </div>

              {data?.notes && (
                <div className="col-span-2">
                  <p className="text-gray-500">Notes</p>
                  <p className="font-medium">{data.notes}</p>
                </div>
              )}
            </div>
          </div>

          {/* TRACKING HISTORY */}
          <div>
            <h3 className="text-sm font-semibold mb-6">Tracking History</h3>

            <div className="relative ml-3">
              <div className="absolute left-[11px] top-0 bottom-0 w-[2px] bg-blue-100" />

              <div className="space-y-8">
                {trackingHistory.map((item, index) => (
                  <div key={index} className="relative flex items-start gap-4">
                    
                    {/* ICON */}
                    <div className="z-10 bg-white">
                      {item.completed ? (
                        <div className="bg-[#1C60DF] h-8 w-8 rounded-full flex items-center justify-center">
                                                                       <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#clip0_1_12449)">
     <path d="M18.1678 8.33357C18.5484 10.2013 18.2772 12.1431 17.3994 13.8351C16.5216 15.527 15.0902 16.8669 13.3441 17.6313C11.5979 18.3957 9.64252 18.5384 7.80391 18.0355C5.9653 17.5327 4.35465 16.4147 3.24056 14.8681C2.12646 13.3214 1.57626 11.4396 1.68171 9.53639C1.78717 7.63318 2.54189 5.82364 3.82004 4.40954C5.09818 2.99545 6.82248 2.06226 8.70538 1.76561C10.5883 1.46897 12.516 1.82679 14.167 2.7794" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
     <path d="M7.5 9.16634L10 11.6663L18.3333 3.33301" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
   </g>
   <defs>
     <clipPath id="clip0_1_12449">
      <rect width="20" height="20" fill="white"/>
     </clipPath>
   </defs>
 </svg>
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-[#DBEAFE] flex items-center justify-center">
                          <div className="w-3 h-3 rounded-full border border-blue-500" />
                        </div>
                      )}
                    </div>

                    {/* TEXT */}
                    <div>
                      <h4 className={`text-sm font-semibold ${item.completed ? "text-gray-900" : "text-gray-400"}`}>
                        {item.status}
                      </h4>
                      {item.completed && item.time && (
                        <p className="text-xs text-gray-500 mt-1">{item.time}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DropOffModal;