type Subscription = {
  smartWallet: string;
  amount: number;
  nextChargeAt: number;
  active: boolean;
};

export const subscriptions: Subscription[] = [];
