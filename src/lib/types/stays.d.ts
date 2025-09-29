/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Listing {
  id: number;
  title: string;
  description: string;
  rating: number;
  ratingTotal: number;
  total: number;
  subtotal: number;
  imgSrc: string;
  availableCount?: number;
  review?: Review[];
  listing_status?: ListingStatus;
  address?: Address;
  coords: any;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
}

export interface Review {
  thumbnail: string;
  name: string;
  date: Date;
  content: string;
  rating: number;
}

export interface Place extends Listing {
  rooms: Room[];
}

/* ROOM TYPES */
// export type RoomType = "suite" | "penthouse" | "single" | "double" | "triple";
// export type BedType = "twin" | "full" | "queen" | "king";

// export interface Bed {
//   bed_type: string;
//   amount: number;
// }

// export enum RoomType {
//   SINGLE = "SINGLE",
//   DOUBLE = "DOUBLE",
//   SUITE = "SUITE",
//   DELUXE = "DELUXE",
// }
export type RoomType="SINGLE"|"DOUBLE"|"SUITE"|"DELUXE"
export type BedType = "SINGLE_BED" | "DOUBLE_BED" | "QUEEN_BED" | "KING_BED"|"SOFA_BED";

export interface Room {
  // id: number;
  // name: string;
  // beds: Bed[]; // Use singular "Bed" for consistency
  // price: number;
  // quantity: number;
  // images?: string[]; // Changed to array for multiple images
  // roomType?: RoomType;
  // stock: number;
  // title:string;
  id: number;
  place_id: number;
  title: string;
  price: number;
  stock: number;
  room_type: RoomType;
  beds: Bed[];
  isDiscountAvailable: boolean;
  discount?: number;
  transferService: TransferService;
  extraAmount?: number;
  // images: string[]; 
  // images: (string | File)[]; //  Supports both existing URLs & new uploads
  images: File[]; //  Only store new files here


}

export interface Beds {
  type: BedType;
  count: number;
}

export interface Expierence extends Listing {
  time: string;
}

export interface CreateStayI {
  city: string;
  country: string;
  street: string;
  postal_code: string;
  province: string;
  businessNature: "BUSINESS" | "INDIVIDUAL" | "Select Business Nature";
  individualTaxIdNbr?: string;
  individualNbr?: string;
  businessRegistrationNbr?: string;
  businessTaxIdNbr?: string;
  // isDiscountAvailable?: boolean;
  // discount?: string;
  // transferService: "NOT_INCLUDED" | "INCLUDED" | "EXTRA_COST";
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  files: any;
}

export interface CreatePlace {
  title?: string;
  description?: string;
  listing_status?: "ACTIVE";
  latitude?: 0;
  longitude?: 0;
  businessNature?: string;
  individualNbr?: string;
  individualTaxIdNbr?: string;
  businessRegistrationNbr?: string;
  businessTaxIdNbr?: string;
  street?: string;
  city?: string;
  province?: string;
  postal_code?: string;
  country?: string;
  subtitle?: string;
  place_type?: string;
  booking_policy?: "FLEXIBLE";
  images?: [];
}
interface UpdateRoomArgs {
  roomId: number;
  body: any;  // JSON data for the room
  files: File[];  // This will be the array of files
}

// Define the return type for the thunk (the data returned after the update)
interface UpdateRoomResponse {
  success: boolean;
  data: any;  // This could be more specific if you know the structure of the room data returned
}