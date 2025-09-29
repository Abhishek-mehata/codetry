export type HostSkillLevelType = "BEGINNER" | "INTERMEDIATE" | "EXPERT";

export interface DateRangeModel {
  date: string;
  startTime: string;
  endTime: string;
}

export interface EventModel {
  id: number;
  photos: File[];
  location: string;
  businessNature: "INDIVIDUAL" | "BUSINESS";
  currency: string;
  individualNbr: string;
  individualTaxIdNbr: string;
  businessRegistrationNbr: string;
  businessTaxIdNbr: string;
  price: number;
  isBoosted:boolean;
  isPaid: boolean;
  listingPaidType: "PROMOTED" | "FEATURED";
  noOfPromotionDays: number;
  eventType: "ONLINE" | "ONSITE";
  category: BUSINESS | EXPERIENTIAL;
  highlight: string;
  name: string;
  imageUrl: string;
  dateType: "SINGLE" | "MULTIPLE";
  nbrOfDays: number;
  hoursPerDay: number;
  maxAttendances: number;
  language: string;
  status: "PENDING" | "ON_GOING" | "COMPLETED" | "CANCELLED";
  requirements: string[];
  otherInformation: string;
  guestInformation: string;
  hostInformation: string;
  cancellationPolicy: string;
  hostSkillLevel: HostSkillLevelType;
  isDiscountAvailable: "yes" | "no";
  discount: number;
  business: string[];
  experiential: string[];
  healthAndWellness: string;
  specialInterest: string;
  onlineEvent: {
    dateRanges: DateRangeModel[];
    platform: string;
    link: string;
  };
  onsiteEvent: {
    dateRanges: DateRangeModel[];
    extraAmount: number;
    privateGroupHosting: string;
    privateGroupHostingCharge: number;
    transferService: string;
    latitude: number;
    longitude: number;
  };
  OnlineEvent?: {
    dateRanges: DateRangeModel[];
    platform: string;
    link: string;
  };
  OnsiteEvent?: {
    dateRanges: DateRangeModel[];
    extraAmount: number;
    privateGroupHosting: string;
    privateGroupHostingCharge: number;
    transferService: string;
    latitude: number;
    longitude: number;
  };
  isVerified: boolean;
  message: string;
}

export interface EventRequestBody {
  eventListingId: string;
}

export interface EventRequestApprovalBody {
  eventListingId: string;
  eventRequestId: string;
  status: string;
}
