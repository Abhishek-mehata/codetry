interface PayoutWithPayment {
    payoutTransaction: {
      id: string;
      amount: number;
      createdAt: string;
    },
    payment: {
      id: string;
      context: string;
      payerName: string;
      updatedAt: string;
      totalAmount: number;
      nextPaymentAmount: number;
      refId: string;
      platformCharge: number;
      adminCommission: number;

    }
  }