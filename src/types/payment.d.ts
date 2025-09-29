export interface PaymentServicePayoutBody {
  toPaypalReceiverId: string;
  amount: number;
  note: string;
  subject: string;
  message: string;
}

export interface PaymentOrderEventBody {
  eventId: string;
}

export interface PaymentOrderBoostingEventBody {
  eventId: string;
}

export interface PaymentOrderPlaceBody {
  placeId: number;
  longOfStay: number;
}

export interface PaymentSettings {
  id?: number;
  platformCharge: number;
  platformCurrency: string;
  platformCountryCode: string;
  domesticTransactionFee: number;
  internationalTransactionFee: number;
  payoutDomesticFee: number;
  payoutInternationalFee: number;
  currencyFixRate: number;
  adminCommission: number;
  paymentSettingType?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UpdatePaymentSettingsBody {
  platformCharge: number;
  adminCommission: number;
}
