import { baseAPI } from "@/store/api/baseApi";

// ✅ Types
type Client = {
  id: string;
  clientNumber: string;
  fullName: string;
  email: string;
  phone: string;
  deliveryAddress: string;
};

export type shippingAddress = {
  companyName: string;
  warehouseAddress: string;
};
// type ShippingAddress = {
//   id: string;
//   address: string;
//   additionalAddress: string;
//    companyName :string;
//   warehouseAddress:string;
//   country: string;
//   postalCode: string;
//   streetNo: string | null;
//   contactPhone: string;
//   isDefault: boolean;
//   createdAt: string;
//   updatedAt: string;
//   clientId: string;
// };
type PackageType = {
  id: string;
  trackingNumber: string;
  title: string;
  weight: number;
  destination: string;
  price: number;
  status: "DELIVERED" | "PENDING" | "SHIPPED" | string;
};
// type Package = {
//   id: string;
 
// };

type Summary = {
  totalPackagesCombined: number;
  inTransitCombined: number;
  deliveredCombined: number;
  totalSpent: number;
};

type MonthlyChart = {
  monthIndex: number;
  month: string;
  totalDelivered: number;
};

type WeeklyChart = {
  dayIndex: number;
  day: string;
  date: string;
  totalDelivered: number;
};

type TodayChart = {
  label: string;
  date: string;
  totalDelivered: number;
};

type RangeChart = {
  label: string;
  rangeStart: string;
  rangeEnd: string;
  totalDelivered: number;
};

type DeliveredCharts = {
  thisYear: MonthlyChart[];
  thisWeek: WeeklyChart[];
  today: TodayChart;
  thisMonth: RangeChart[];
  lastMonth: RangeChart[];
};

export type DashboardResponse = {
  client: Client;
  shippingAddresses: shippingAddress[];
  recentPackages: PackageType[];
//   recentPackages: Package[];
  summary: Summary;
  deliveredCharts: DeliveredCharts;
};


export const dashboardApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getClientDashboard: builder.query<DashboardResponse, void>({
      query: () => "/clent-dashboard", 
      providesTags: ["Overview"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetClientDashboardQuery } = dashboardApi;