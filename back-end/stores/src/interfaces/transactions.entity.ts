export interface Transaction {
    id: number;
    transaction_reference: string;
    buyer: string;
    store_reference: string;
    product_reference: string;
    price_paid: string;
    coupon: string;
    coupon_discount: number;
    coupon_type: string;
    form_of_payments: string;
    status_payment: string;
    order_delivered: boolean;
    collector_id: number;
    variable: string;
    createdAt: string;
    updatedAt: string;
}

export interface TransactionSummary {
    name: string;
    data: { x: string; y: number }[];
}