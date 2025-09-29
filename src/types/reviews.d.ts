export interface PlaceReviewBody {
  cleanliness: number;
  facilities: number;
  location: number;
  roomComfort: number;
  serviceQuality: number;
  valueForMoney: number;
}

export interface EventOnlineReviewBody {
  eventListingId: string;
  eventId: string;
  eventRequestId: string;
  sellerCommunication: number;
  serviceQuality: number;
  valueForMoney: number;
}

export interface EventOnsiteReviewBody {
  eventListingId: string;
  eventId: string;
  eventRequestId: string;
  facilities: number;
  location: number;
  serviceQuality: number;
  valueForMoney: number;
}
