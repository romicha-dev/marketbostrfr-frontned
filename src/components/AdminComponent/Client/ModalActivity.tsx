import { useGetActivityLogsQuery } from "@/redux/features/admin/activityLogApi";
import React from "react";


interface ActivityItemType {
  title: string;
  description: string;
  date: string;
  color: string;
}


const getColor = (type: string) => {
  switch (type) {
    case "QUOTE_GENERATED":
      return "bg-green-500";

    case "PACKAGE_CREATED":
      return "bg-blue-500";

    case "PAYMENT_RECEIVED":
      return "bg-yellow-500";

    case "PACKAGE_UPDATED":
      return "bg-purple-500";

    case "ERROR":
      return "bg-red-500";

    default:
      return "bg-gray-400";
  }
};

const ActivityItem = ({ activity }: { activity: ActivityItemType }) => (
  <div className="flex items-start gap-4 border border-[#DDE7FA] px-4 py-3 rounded-md hover:bg-gray-50 transition">
    <div className="flex-1">
      <div className="text-sm sm:text-base font-normal text-[#101828] mb-1">
        {activity.title}
      </div>

      <div className="text-sm sm:text-base font-normal text-[#6A7282] mb-1">
        {activity.description}
      </div>

      <div className="text-xs sm:text-sm text-[#6A7282]">
        {activity.date}
      </div>
    </div>

    <div className={`w-2 h-2 rounded-full mt-2 ${activity.color}`} />
  </div>
);


const ActivityTab: React.FC<{ clientId?: string }> = ({ clientId }) => {
  const { data, isLoading, isError } = useGetActivityLogsQuery({
    page: 1,
    limit: 20,
    clientId,
  });

  /* map API → UI format */
  const activities: ActivityItemType[] =
    data?.data?.map((log) => ({
      title: log.title,
      description: log.message,
      date: new Date(log.occurredAt).toLocaleString(),
      color: getColor(log.type),
    })) || [];

  if (isLoading) {
    return (
      <div className="text-center py-6 text-gray-400">
        Loading recent activity...
      </div>
    );
  }


  if (isError) {
    return (
      <div className="text-center py-6 text-red-500">
        Failed to load activity logs 
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* TITLE */}
      <h3 className="text-base sm:text-lg md:text-xl font-normal text-[#0A0A0A]">
        Recent Activity
      </h3>

      {/* EMPTY STATE */}
      {activities.length === 0 ? (
        <p className="text-sm text-gray-400">
          No recent activity found.
        </p>
      ) : (
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <ActivityItem key={index} activity={activity} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ActivityTab;







// import React from 'react';

// interface Activity {
//   title: string;
//   description: string;
//   date: string;
//   color: string;
// }

// interface Props {
//   activities: Activity[];
// }

// const ActivityItem: React.FC<{ activity: Activity }> = ({ activity }) => (
//   <div className="flex items-start gap-4 border border-[#DDE7FA] px-4 py-2">
//     <div className="flex-1">
//       <div className="text-sm sm:text-base font-normal font-roboto text-[#101828] mb-1">
//         {activity.title}
//       </div>
//       <div className="text-sm sm:text-base font-normal font-roboto text-[#6A7282] mb-1">
//         {activity.description}
//       </div>
//       <div className="text-sm sm:text-base font-normal font-roboto text-[#6A7282]">
//         {activity.date}
//       </div>
//     </div>
//     <div className={`w-2 h-2 rounded-full mt-9 ${activity.color}`} />
//   </div>
// );

// const ActivityTab: React.FC<Props> = ({ activities }) => (
//   <div className="space-y-4">
//     <h3 className="text-base sm:text-lg md:text-xl font-normal font-roboto leading-[150%] text-[#0A0A0A]">
//       Recent Activity
//     </h3>
//     {activities.length === 0 ? (
//       <p className="text-sm text-gray-400 font-roboto">No recent activity found.</p>
//     ) : (
//       <div className="space-y-6">
//         {activities.map((activity, index) => (
//           <ActivityItem key={index} activity={activity} />
//         ))}
//       </div>
//     )}
//   </div>
// );

// export default ActivityTab;






// import React from 'react';

// interface Activity {
//   title: string;
//   description: string;
//   date: string;
//   color: string;
// }

// interface Props {
//   activities: Activity[];
// }

// const ActivityItem: React.FC<{ activity: Activity }> = ({ activity }) => (
//   <div className="flex items-start gap-4 border border-[#DDE7FA] px-4 py-2">
   
//     <div className="flex-1">
//       <div className="text-sm sm:text-base font-normal font-roboto text-[#101828] mb-1">{activity.title}</div>
//       <div className="text-sm sm:text-base font-normal font-roboto text-[#6A7282] mb-1">{activity.description}</div>
//       <div className="text-sm sm:text-base font-normal font-roboto text-[#6A7282]">{activity.date}</div>
//     </div>
//      <div className={`w-2 h-2 rounded-full mt-9 flex items-center justify-center  ${activity.color}`}></div>
//   </div>
// );

// const ActivityTab: React.FC<Props> = ({ activities }) => (
//   <div className="space-y-4">
//     <h3 className="text-base sm:text-lg md:text-xl  font-normal  font-roboto leading-[150%]  text-[#0A0A0A]">Recent Activity</h3>
//     <div className="space-y-6">
//       {activities.map((activity, index) => (
//         <ActivityItem key={index} activity={activity} />
//       ))}
//     </div>
//   </div>
// );

// export default ActivityTab;
