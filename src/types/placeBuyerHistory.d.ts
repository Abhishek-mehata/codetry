export interface PlaceBuyerHistoryCreationBody {
  paymentId: string;
  placeId: number;
  longOfStay: number;
}

export interface PlaceBuyerHistoryUpdateBody {
  isApproved: boolean;
  isRefunded: boolean;
}
