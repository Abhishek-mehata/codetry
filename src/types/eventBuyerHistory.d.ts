export interface EventBuyerHistoryCreationBody {
  paymentId: string;
  eventId: string;
}

export interface EventBuyerHistoryUpdateBody {
  paymentId: string;
  eventId: string;
  isApproved: boolean;
  isRefunded: boolean;
  verifyBySeller?: "PENDING" | "CONFIRM" | "DECLINED";
}
