export interface EventBoosterBuyerHistoryCreationBody {
  paymentId: string;
  eventId: string;
}

export interface EventBoosterBuyerHistoryUpdateBody {
  isApproved: boolean;
  isRefunded: boolean;
}
