// src/types.ts
export type Status =
  | "Received"
  | "Weighed - Pending Quote"
  | "Quote Sent - Pending Payment"
  | "Payment Received"
  | "In Transit"
  | "Delivered";

export interface PackageData {
  packageId: string;
  name: string;
  clientNumber: string;
  email: string;
  trackingNumber: string;
  blNumber: string;
  description: string;
  weight: string;
  shippingCost: string;
  carrier: string;
  destination: string;
  status: Status;
  internalNotes: string;
}

export interface PaymentData {
  paymentId: string;
  packageId: string;
  clientName: string;
  clientNumber: string;
  amount: string;
  method: string;
  dueDate: string;
  status: "Pending" | "Paid";
}


export interface AdminDashboardResponse {
  generatedAt: string;

  period: {
    month: string;
    label: string;
  };

  overview: {
    totalPackages: {
      value: number;
      changePercent: number;
      trend: "up" | "down" | "flat";
    };
    activeClients: {
      value: number;
      changePercent: number;
      trend: "up" | "down" | "flat";
    };
    monthlyRevenue: {
      value: number;
      changePercent: number;
      trend: "up" | "down" | "flat";
      currency: string;
    };
    inTransit: {
      value: number;
      changePercent: number;
      trend: "up" | "down" | "flat";
    };
  };

  monthlyRevenueAndPackages: {
    month: string;
    revenue: number;
    packages: number;
  }[];

  recentPackages: {
    packageCode: string;
    createdAt: string;
    clientName: string;
    description: string;
    weightKg: number;
    status: string;
  }[];

  packagesByDestination: {
    destination: string;
    count: number;
  }[];

  statusSummary: {
    received: number;
    pendingQuote: number;
    pendingPayment: number;
    inTransit: number;
    delivered: number;
  };
}