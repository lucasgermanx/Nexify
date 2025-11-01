export type SubscriptionContextType = {
  url_invoice:string | undefined;
  ProviderGetLastInvoice: () => void;
};

export interface Invoice {
  id: number;
  invoice_reference: string;
  payment_id: string;
  subscription_id: string;
  status: string;
  invoiceUrl: string;
  invoiceNumber: string;
  paymentDate: string;
  creditDate: string;
  transactionReceiptUrl: string;
  refundReceiptUrl: string;
  billingType: string;
  creditCardNumber: number;
  creditCardBrand: string;
  createdAt: string;
  updatedAt: string;
}

export interface Subscription {
  id: number;
  customer_id: string;
  store_reference: string;
  subscription_id: string;
  cycle: string;
  status: string;
  value: number;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
  invoices: Invoice[];
}


export interface SubscriptionResponse {
  subscription: Subscription;
  failed: boolean;
  status: number;
  message: string;
}
