import { DateRangeModel, EventModel } from "../../types/event";

export const select_events = [
  {
    key: "ONLINE",
    label: "Online Event",
  },
  {
    key: "ONSITE",
    label: "Onsite Event",
  },
];

export const OnlineEventItems = [
  {
    key: "business",
    label: "Business",
  },
  {
    key: "category",
    label: "Category",
  },
  {
    key: "information",
    label: "Information",
  },
  {
    key: "complete",
    label: "Complete",
  },
];

export const OnsiteEventItems = [
  {
    key: "business",
    label: "Business",
  },
  {
    key: "category",
    label: "Category",
  },
  {
    key: "information",
    label: "Information",
  },
  {
    key: "complete",
    label: "Complete",
  },
];

export const listingItems = [
  {
    key: "event",
    label: "Event",
  },
  {
    key: "location",
    label: "Location",
  },
  {
    key: "details",
    label: "Details",
  },
  {
    key: "business",
    label: "Business",
  },
  {
    key: "category",
    label: "Category",
  },
  {
    key: "information",
    label: "Information",
  },
];

export const business_items = [
  {
    key: "INDIVIDUAL",
    label: "Individual",
  },
  {
    key: "BUSINESS",
    label: "Company",
  },
];

export const category_items = [
  {
    key: "BUSINESS",
    label: "Business",
  },
  {
    key: "EXPERIENTIAL",
    label: "Experiential",
  },
];

export const business_checkboxes = [
  {
    key: "seminars / workshops",
    label: "Seminars / Workshops",
  },
  {
    key: "planing / consultation",
    label: "Planing / Consultation",
  },
];

export const experiential_checkboxes = [
  {
    key: "food & beverages",
    label: "Food & Beverage",
  },
  {
    key: "history & heritage",
    label: "History & Heritage",
  },
  {
    key: "guided tours",
    label: "Guided Tours",
  },
  {
    key: "health and wellness",
    label: "Health and Wellness",
  },
  {
    key: "special interest",
    label: "Special Interest",
  },
];

export const category_skills = [
  {
    key: "BEGINNER",
    label: "Beginner - First Time Hosting",
  },
  {
    key: "INTERMEDIATE",
    label: "Intermediate - Informally Hosted Before",
  },
  {
    key: "EXPERT",
    label: "Expert - Formally Hosted Before",
  },
];

export const events_duration = [
  {
    key: "SINGLE",
    label: "Single Day",
  },
  {
    key: "MULTIPLE",
    label: "Multiple Day",
  },
];

export const transfer_service = [
  {
    key: "not included",
    label: "Not included",
  },
  {
    key: "included",
    label: "Included",
  },
  {
    key: "extra",
    label: "Extra (box appears for additional chargesPrice - USD 20)",
  },
];

export const discount = [
  {
    key: "yes",
    label: "Yes",
  },
  {
    key: "no",
    label: "No",
  },
];

export const languages = [
  { value: "english", label: "English" },
  { value: "nepali", label: "Nepali" },
  { value: "hindi", label: "Hindi" },
];

export const currencies = [
  { value: "usd", label: "USD - United States Dollar" },
  { value: "eur", label: "EUR - Euro" },
  { value: "gbp", label: "GBP - British Pound" },
  { value: "jpy", label: "JPY - Japanese Yen" },
  { value: "aud", label: "AUD - Australian Dollar" },
  { value: "cad", label: "CAD - Canadian Dollar" },
  { value: "chf", label: "CHF - Swiss Franc" },
  { value: "cny", label: "CNY - Chinese Yuan" },
  { value: "npr", label: "NPR - Nepalese Rupee" },
  { value: "inr", label: "INR - Indian Rupee" },
  { value: "inr", label: "INR - Indian Rupee" },
];

export const initEventDatePicker: DateRangeModel = {
  date: "",
  startTime: "",
  endTime: "",
};

export const initEventDetailsState: EventModel = {
  id: 1,
  photos: [],
  location: "",
  businessNature: "INDIVIDUAL",
  currency: currencies[0].value,
  individualNbr: "",
  individualTaxIdNbr: "",
  businessRegistrationNbr: "",
  businessTaxIdNbr: "",
  price: 0,
  isPaid: false,
  listingPaidType: "PROMOTED",
  noOfPromotionDays: 1,
  eventType: "ONLINE",
  category: "BUSINESS",
  highlight: "",
  name: "",
  imageUrl: "",
  dateType: "SINGLE",
  nbrOfDays: 1,
  hoursPerDay: 1,
  maxAttendances: 1,
  language: languages[0].value,
  status: "PENDING",
  requirements: [],
  otherInformation: "",
  guestInformation: "",
  hostInformation: "",
  cancellationPolicy: "",
  hostSkillLevel: "BEGINNER",
  isDiscountAvailable: "yes",
  discount: 0,
  business: [],
  experiential: [],
  healthAndWellness: "",
  specialInterest: "",
  onlineEvent: {
    dateRanges: [],
    platform: "",
    link: "",
  },
  onsiteEvent: {
    dateRanges: [],
    extraAmount: 0,
    privateGroupHosting: "NOT_AVAILABLE",
    privateGroupHostingCharge: 0,
    transferService: "NOT_INCLUDED",
    latitude: 0,
    longitude: 0,
  },
  isBoosted: false,
  isVerified: false,
  message: "",
};
