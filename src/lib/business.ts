export type Business = {
  id: string;
  name: string;
  ownerName: string;
  phone: string;
  email?: string;
  district: string;
  address: string;
  station: string;
  totalRooms?: number;
  bizNumber?: string;
  description?: string;
  foreignerFriendly?: boolean;
  womenOnly?: boolean;
  status: "pending" | "approved";
  createdAt: string;
};

export type CreateBusinessInput = {
  name: string;
  ownerName: string;
  phone: string;
  email?: string;
  district: string;
  address: string;
  station: string;
  totalRooms?: number;
  bizNumber?: string;
  description?: string;
  foreignerFriendly?: boolean;
  womenOnly?: boolean;
};
