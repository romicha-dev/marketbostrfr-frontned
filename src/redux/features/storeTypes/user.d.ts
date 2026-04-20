export type TUser = {
    id: string;
    userId:string
    firstName: string;
    lastName: string;
    phone:number;
    photo: string | null;
    email: string;
    doctorId: string;
    role: string;
    isVerified: boolean;
    profile_type: string;
    authType: string;
    lastOTP: string;
    isSubscribed: boolean;
    createdAt: string;
    updatedAt: string;
    profile_id: string;
  } ;