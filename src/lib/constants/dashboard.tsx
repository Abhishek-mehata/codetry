export interface StateModal {
  businessType: 1 | 2;
  individualNumber?: number;
  individualTaxNumber?: number;
  companyNumber?: number;
  companyTaxNumber?: number;
  businessOffer: 1 | 2;
  businessEvent: 1 | 1;
  headline: string;
  description: string;
  images: File[];
  pricing: {
    currency: string;
  };
}

export const businessNature = ["individual", "business"];
export const businessOffer = ["accomodation", "experience"];
export const businessEvent = ["online", "onsite"];

export const property_items = [];

export const roomTypes = [
  {
    key: "suite",
    label: "Suite",
  },
  {
    key: "deluxe room",
    label: "Deluxe Room",
  },
  {
    key: "executive room",
    label: "Executive Room",
  },
  {
    key: "family room",
    label: "Family Room",
  },
  {
    key: "presidential suite",
    label: "Presidential Suite",
  },
];

export const bedTypes = [
  {
    key: "single bed",
    label: "Single Bed",
  },
  {
    key: "double bed",
    label: "Double Bed",
  },
  {
    key: "queen bed",
    label: "Queen Bed",
  },
  {
    key: "king bed",
    label: "King Bed",
  },
  {
    key: "twin bed",
    label: "Twin Bed",
  },
  {
    key: "bunk bed",
    label: "Bunk Bed",
  },
  {
    key: "sofa bed",
    label: "Sofa Bed",
  },
  {
    key: "rollaway bed",
    label: "Rollaway Bed",
  },
  {
    key: "murphy bed",
    label: "Murphy Bed",
  },
  {
    key: "trundle bed",
    label: "Trundle Bed",
  },
  {
    key: "day bed",
    label: "Day Bed",
  },
  {
    key: "futon bed",
    label: "Futon Bed",
  },
];

export const initState: StateModal = {
  businessType: 1,
  individualNumber: 0,
  individualTaxNumber: 0,
  companyNumber: 0,
  companyTaxNumber: 0,
  businessOffer: 1,
  businessEvent: 1,
  headline: "",
  description: "",
  images: [],
  pricing: {
    currency: "",
  },
};

export const currencies = [
  {
    key: "USD",
    label: "United States Dollar (United States)",
  },
  {
    key: "EUR",
    label: "Euro (Eurozone countries such as Germany, France, Italy, etc.)",
  },
  {
    key: "GBP",
    label: "British Pound Sterling (United Kingdom)",
  },
  {
    key: "JPY",
    label: "Japanese Yen (Japan)",
  },
  {
    key: "AUD",
    label: "Australian Dollar (Australia)",
  },
];
