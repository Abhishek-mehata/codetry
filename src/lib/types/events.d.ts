export interface EventTypes {
  photos?: string[];
  location: string;
  businessNature: string;
  currency: string;
  individualNbr?: string;
  individualTaxIdNbr?: string;
  businessRegistrationNbr?: string;
  businessTaxIdNbr?: string;
  price?: number;
  isPaid: boolean;
  listingPaidType: string;
  noOfPromotionDays: number;
  eventType: "ONLINE" | "ONSITE";
  onsiteEvent?: onsiteEventTypes;
  onlineEvent?: onlineEventTypes;
}

export interface onlineEventTypes {
  category: string;
  highlight: string;
  name: string;
  imageUrl: string;
  dateType: string;
  dateRanges: string[];
  nbrOfDays: number;
  hoursPerDay: number;
  maxAttendances: number;
  language: string;
  price: number;
  status: string;
  requirements: string[];
  otherInformation: string;
  guestInformation: string;
  hostInformation: string;
  cancellationPolicy: string;
  hostSkillLevel: string;
  isDiscountAvailable: boolean;
  discount: number;
  platform: string;
  link: string;
  business: string[];
  experiential: string[];
  healthAndWellness: string;
  specialInterest: string;
}

export interface onsiteEventTypes {
  category: string;
  name: string;
  highlight: string;
  imageUrl: string;
  dateType: string;
  dateRanges: string[];
  nbrOfDays: number;
  hoursPerDay: number;
  maxAttendances: number;
  language: string;
  price: number;
  extraAmount: number;
  status: string;
  requirements: string[];
  otherInformation: string;
  guestInformation: string;
  hostInformation: string;
  cancellationPolicy: string;
  hostSkillLevel: string;
  isDiscountAvailable: boolean;
  discount: number;
  privateGroupHosting: string;
  privateGroupHostingCharge: number;
  transferService: string;
  business: string[];
  experiential: string[];
  healthAndWellness: string;
  specialInterest: string;
}
