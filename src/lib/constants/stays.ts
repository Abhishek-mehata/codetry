import { AddPlaceModel, BedModel, RoomModel } from "../../types/places";
import { bedTypes } from "./dashboard";

export const staysItems = [
  {
    key: "location",
    label: "Specify your stay location",
  },
  {
    key: "business",
    label: "Tell us about your business",
  },
  {
    key: "details",
    label: "Provide details about your listing",
  },
  // {
  //   key: "categories",
  //   label: "Set up your rooms categories",
  // },
];

export const continents = [
  {
    title: "Africa",
    coordinates: {
      lat: 1.6508,
      lng: 17.4744,
    },
    disabled: false,
  },
  {
    title: "Asia",
    coordinates: {
      lat: 28.3949,
      lng: 84.124,
    },
    disabled: false,
  },
  {
    title: "Europe",
    coordinates: {
      lat: 54.526,
      lng: 15.2551,
    },
    disabled: false,
  },
  {
    title: "North America",
    coordinates: {
      lat: 54.526,
      lng: -105.2551,
    },
    disabled: false,
  },
  {
    title: "South America",
    coordinates: {
      lat: -8.7832,
      lng: -55.4915,
    },
    disabled: false,
  },
];

export const business_type = [
  {
    key: "individual",
    label: "Individual",
  },
  {
    key: "business",
    label: "Business",
  },
];

export const business_offer = [
  {
    key: "accomodation",
    label: "Accomodation",
  },
  {
    key: "experience",
    label: "Experience",
  },
];

export const business_offer_experience_type = [
  {
    key: "online event",
    label: "Online Event",
  },
  {
    key: "onsite Event",
    label: "Onsite Event",
  },
];

export const breakfast = [
  {
    key: "included",
    label: "Included",
  },
  {
    key: "extra",
    label: "Extra",
  },
];

export const amenities_property = [
  {
    title: `Smoking areas`,
    isChecked: false,
  },
  {
    title: `Shops`,
    isChecked: false,
  },

  {
    title: `Wedding facilities`,
    isChecked: false,
  },
  {
    title: `Library`,
    isChecked: false,
  },
  {
    title: `Gym`,
    isChecked: false,
  },
  {
    title: `Spa`,
    isChecked: false,
  },
  {
    title: `Sauna`,
    isChecked: false,
  },
  {
    title: `Massage`,
    isChecked: false,
  },
  {
    title: `Poolside bar`,
    isChecked: false,
  },
];

export const amenities_facilities = [
  {
    title: `Executive floor`,
    isChecked: false,
  },
  {
    title: `Bussiness center`,
    isChecked: false,
  },

  {
    title: `Meeting facilities`,
    isChecked: false,
  },
  {
    title: `Executive lounge`,
    isChecked: false,
  },
];

export const amenities_foodDrink = [
  {
    title: `Cafe`,
    isChecked: false,
  },
  {
    title: `Restaurant`,
    isChecked: false,
  },

  {
    title: `Bar`,
    isChecked: false,
  },
  {
    title: `Room servicd`,
    isChecked: false,
  },
];

export const initBedState: BedModel = {
  bed_type: bedTypes[0].label,
  amount: 1,
};

export const initRoomState: RoomModel = {
  id: 0,
  place_id: 0,
  title: "",
  price: 10,
  stock: 1,
  room_type: "",
  beds: [
    {
      bed_type: bedTypes[0].label,
      amount: 1,
    },
  ],
  isDiscountAvailable: "yes",
  discount: 10,
  transferService: "NOT_INCLUDED",
  extraAmount: 0,
  images:[],
};

export const placeInitState: AddPlaceModel = {
  title: "",
  description: "",
  listing_status: "ACTIVE",
  latitude: 0,
  longitude: 0,
  businessNature: "",
  individualNbr: "",
  individualTaxIdNbr: "",
  businessRegistrationNbr: "",
  businessTaxIdNbr: "",
  street: "",
  city: "",
  province: "",
  postal_code: "",
  country: "",
  subtitle: "",
  place_type: "WOW",
  booking_policy: "FLEXIBLE",
  images: [],
  amenities: [], // ✅ Ensure this is initialized
  safetyAmenities: [], 
};
